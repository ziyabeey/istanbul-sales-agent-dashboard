/**
 * WebAuthn Biometric Auth API
 * POST /api/v1/auth/webauthn — Register & authenticate
 */
import { NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebaseAdmin'
import { oturumDogrulaServer } from '@/lib/sessionManager'
import { randomBytes } from 'crypto'

export async function POST(request: Request) {
  try {
    const body = await request.json()

    switch (body.action) {
      case 'register_options': {
        // Step 1: Generate registration options
        const esnafId = await oturumDogrulaServer()
        if (!esnafId) return NextResponse.json({ error: 'Önce giriş yapın' }, { status: 401 })

        const esnafDoc = await adminDb.collection('esnaflar').doc(esnafId).get()
        const esnaf = esnafDoc.data() || {}
        const challenge = randomBytes(32).toString('base64url')

        // Store challenge for verification
        await adminDb.collection('esnaflar').doc(esnafId).collection('settings').doc('webauthn_challenge').set({
          challenge, createdAt: new Date().toISOString(), expiresAt: new Date(Date.now() + 60000).toISOString(),
        })

        return NextResponse.json({
          ok: true,
          publicKey: {
            challenge,
            rp: { name: 'kepenk.ai', id: 'kepenk.ai' },
            user: {
              id: Buffer.from(esnafId).toString('base64url'),
              name: esnaf.email || esnaf.isletmeAdi || esnafId,
              displayName: esnaf.isletmeAdi || 'kepenk.ai Kullanıcı',
            },
            pubKeyCredParams: [
              { alg: -7, type: 'public-key' },   // ES256
              { alg: -257, type: 'public-key' },  // RS256
            ],
            timeout: 60000,
            authenticatorSelection: {
              authenticatorAttachment: 'platform', // Device biometric only
              userVerification: 'required',
              residentKey: 'preferred',
            },
            attestation: 'none', // For privacy — no device attestation
          },
        })
      }

      case 'register_verify': {
        // Step 2: Verify registration and store credential
        const esnafId = await oturumDogrulaServer()
        if (!esnafId) return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 })

        const { credential } = body
        if (!credential?.id || !credential?.response) return NextResponse.json({ error: 'credential gerekli' }, { status: 400 })

        // Verify challenge
        const challengeDoc = await adminDb.collection('esnaflar').doc(esnafId).collection('settings').doc('webauthn_challenge').get()
        if (!challengeDoc.exists) return NextResponse.json({ error: 'Challenge süresi dolmuş' }, { status: 400 })
        const challengeData = challengeDoc.data()!
        if (new Date(challengeData.expiresAt) < new Date()) return NextResponse.json({ error: 'Challenge süresi dolmuş' }, { status: 400 })

        // Store credential (in production: verify attestation, extract public key)
        await adminDb.collection('esnaflar').doc(esnafId).collection('webauthn_credentials').doc(credential.id).set({
          credentialId: credential.id,
          publicKey: credential.response.publicKey || credential.response.attestationObject,
          counter: 0,
          deviceName: body.deviceName || 'Cihaz',
          registeredAt: new Date().toISOString(),
          lastUsed: null,
        })

        // Delete challenge
        await challengeDoc.ref.delete()

        return NextResponse.json({ ok: true, mesaj: 'Biyometrik giriş aktif edildi 🎉', credentialId: credential.id })
      }

      case 'authenticate_options': {
        // Step 1: Generate authentication challenge (no session required)
        const { email } = body
        if (!email) return NextResponse.json({ error: 'email gerekli' }, { status: 400 })

        // Find esnaf by email
        const esnafSnap = await adminDb.collection('esnaflar').where('email', '==', email).limit(1).get()
        if (esnafSnap.empty) return NextResponse.json({ error: 'Kullanıcı bulunamadı' }, { status: 404 })
        const esnafId = esnafSnap.docs[0].id

        // Get registered credentials
        const credsSnap = await adminDb.collection('esnaflar').doc(esnafId).collection('webauthn_credentials').get()
        if (credsSnap.empty) return NextResponse.json({ error: 'Biyometrik kayıt bulunamadı. Önce kayıt olun.' }, { status: 404 })

        const challenge = randomBytes(32).toString('base64url')
        await adminDb.collection('esnaflar').doc(esnafId).collection('settings').doc('webauthn_challenge').set({
          challenge, createdAt: new Date().toISOString(), expiresAt: new Date(Date.now() + 60000).toISOString(),
        })

        return NextResponse.json({
          ok: true,
          publicKey: {
            challenge, rpId: 'kepenk.ai', timeout: 60000, userVerification: 'required',
            allowCredentials: credsSnap.docs.map((d: any) => ({
              id: d.data().credentialId, type: 'public-key', transports: ['internal'],
            })),
          },
          esnafId, // For authenticate_verify
        })
      }

      case 'authenticate_verify': {
        // Step 2: Verify authentication
        const { esnafId, credential } = body
        if (!esnafId || !credential?.id) return NextResponse.json({ error: 'esnafId ve credential gerekli' }, { status: 400 })

        // Verify challenge exists
        const challengeDoc = await adminDb.collection('esnaflar').doc(esnafId).collection('settings').doc('webauthn_challenge').get()
        if (!challengeDoc.exists || new Date(challengeDoc.data()!.expiresAt) < new Date()) {
          return NextResponse.json({ error: 'Challenge süresi dolmuş' }, { status: 400 })
        }

        // Verify credential exists
        const credDoc = await adminDb.collection('esnaflar').doc(esnafId).collection('webauthn_credentials').doc(credential.id).get()
        if (!credDoc.exists) return NextResponse.json({ error: 'Bilinmeyen cihaz' }, { status: 403 })

        // In production: verify signature with stored public key, check counter
        await credDoc.ref.update({ lastUsed: new Date().toISOString(), counter: (credDoc.data()!.counter || 0) + 1 })
        await challengeDoc.ref.delete()

        // Create session
        const sessionToken = randomBytes(32).toString('hex')
        await adminDb.collection('sessions').doc(sessionToken).set({
          esnafId, createdAt: new Date().toISOString(), expiresAt: new Date(Date.now() + 7 * 86400000).toISOString(),
          authMethod: 'webauthn', deviceId: credential.id,
        })

        return NextResponse.json({ ok: true, sessionToken, expiresIn: 7 * 86400, mesaj: 'Biyometrik giriş başarılı ✓' })
      }

      case 'list_credentials': {
        const esnafId = await oturumDogrulaServer()
        if (!esnafId) return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 })
        const snap = await adminDb.collection('esnaflar').doc(esnafId).collection('webauthn_credentials').get()
        return NextResponse.json({
          ok: true, credentials: snap.docs.map((d: any) => ({
            id: d.id, deviceName: d.data().deviceName, registeredAt: d.data().registeredAt, lastUsed: d.data().lastUsed,
          })),
        })
      }

      case 'remove_credential': {
        const esnafId = await oturumDogrulaServer()
        if (!esnafId) return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 })
        await adminDb.collection('esnaflar').doc(esnafId).collection('webauthn_credentials').doc(body.credentialId).delete()
        return NextResponse.json({ ok: true, mesaj: 'Biyometrik cihaz kaldırıldı' })
      }

      default:
        return NextResponse.json({ error: 'action: register_options, register_verify, authenticate_options, authenticate_verify, list_credentials, remove_credential' }, { status: 400 })
    }
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
