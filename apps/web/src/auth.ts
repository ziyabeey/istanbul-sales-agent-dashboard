import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { adminDb } from '@/lib/firebaseAdmin';
import crypto from 'crypto';

// AUTH_SECRET: build sırasında yoksa geçici değer kullanılır,
// runtime'da (authorize çağrısında) kontrol edilir
const authSecret = process.env.AUTH_SECRET || 'build-time-placeholder'

export const { handlers, signIn, signOut, auth } = NextAuth({
    secret: authSecret as string,
    session: { strategy: 'jwt' },
    providers: [
        Credentials({
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Şifre", type: "password" }
            },
            async authorize(credentials) {
                if (!process.env.AUTH_SECRET) {
                    console.error('AUTH_SECRET ortam değişkeni tanımlanmamış');
                    return null;
                }
                if (!credentials?.email || !credentials?.password) return null;

                // Firestore'dan admin kullanıcı doğrulama
                const snap = await adminDb
                    .collection('admin_users')
                    .where('email', '==', credentials.email)
                    .limit(1)
                    .get();

                if (snap.empty) return null;

                const user = snap.docs[0].data();
                const hash = crypto
                    .createHash('sha256')
                    .update(String(credentials.password))
                    .digest('hex');

                // Timing-safe karşılaştırma
                const expected = Buffer.from(user.passwordHash || '', 'utf8');
                const actual = Buffer.from(hash, 'utf8');
                if (expected.length !== actual.length || !crypto.timingSafeEqual(expected, actual)) {
                    return null;
                }

                return {
                    id: snap.docs[0].id,
                    name: user.name || user.email,
                    email: user.email,
                    role: user.role || 'admin'
                };
            }
        })
    ],
    pages: {
        signIn: '/giris',
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.role = (user as any).role;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id as string;
                (session.user as any).role = token.role;
            }
            return session;
        }
    }
});
