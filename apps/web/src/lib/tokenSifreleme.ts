/**
 * tokenSifreleme.ts — AES-256-GCM Token Şifreleme
 * ─────────────────────────────────────────────────────────────────────────────
 * Refresh token gibi kritik veriler ASLA plaintext saklanmaz.
 * AES-256-GCM: authenticated encryption — hem gizlilik hem bütünlük.
 * 
 * ENV: TOKEN_ENCRYPTION_KEY (64 karakter hex = 32 byte)
 * Oluşturma: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
 * ─────────────────────────────────────────────────────────────────────────────
 */

import crypto from 'crypto'

const ALGORITHM = 'aes-256-gcm'
const IV_LENGTH = 16   // 128-bit IV
const TAG_LENGTH = 16  // 128-bit auth tag

function getKey(): Buffer {
    const hex = process.env.TOKEN_ENCRYPTION_KEY
    if (!hex || hex.length !== 64) {
        throw new Error(
            '[TOKEN_SIFRELEME] TOKEN_ENCRYPTION_KEY eksik veya geçersiz. ' +
            '64 karakter hex bekleniyor. Oluşturmak için: ' +
            'node -e "console.log(require(\'crypto\').randomBytes(32).toString(\'hex\'))"'
        )
    }
    return Buffer.from(hex, 'hex')
}

/**
 * Plaintext'i AES-256-GCM ile şifreler.
 * Çıktı formatı: iv:authTag:encryptedData (hex)
 */
export function tokenSifrele(plaintext: string): string {
    const key = getKey()
    const iv = crypto.randomBytes(IV_LENGTH)
    const cipher = crypto.createCipheriv(ALGORITHM, key, iv)

    let encrypted = cipher.update(plaintext, 'utf8', 'hex')
    encrypted += cipher.final('hex')

    const authTag = cipher.getAuthTag()

    // iv:tag:data formatında birleştir
    return `${iv.toString('hex')}:${authTag.toString('hex')}:${encrypted}`
}

/**
 * AES-256-GCM ile şifrelenmiş metni çözer.
 * Giriş formatı: iv:authTag:encryptedData (hex)
 */
export function tokenCoz(sifreliMetin: string): string {
    const key = getKey()
    const parts = sifreliMetin.split(':')

    if (parts.length !== 3) {
        throw new Error('[TOKEN_SIFRELEME] Geçersiz şifreli metin formatı')
    }

    const iv = Buffer.from(parts[0], 'hex')
    const authTag = Buffer.from(parts[1], 'hex')
    const encrypted = parts[2]

    const decipher = crypto.createDecipheriv(ALGORITHM, key, iv)
    decipher.setAuthTag(authTag)

    let decrypted = decipher.update(encrypted, 'hex', 'utf8')
    decrypted += decipher.final('utf8')

    return decrypted
}

/**
 * Token'ın geçerli olup olmadığını kontrol eder (çözerek).
 * Hata fırlatmaz, boolean döner.
 */
export function tokenGecerliMi(sifreliMetin: string): boolean {
    try {
        tokenCoz(sifreliMetin)
        return true
    } catch {
        return false
    }
}
