import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

// Secret from Env or fallback for local dev
const secret = process.env.AUTH_SECRET || "kepenk-ai-super-secret-key-12345";

export const { handlers, signIn, signOut, auth } = NextAuth({
    secret,
    session: { strategy: 'jwt' },
    providers: [
        Credentials({
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Şifre", type: "password" }
            },
            async authorize(credentials) {
                // MOCK LOGIN - Prod'da veritabanından çekilecek
                if (
                    credentials?.email === 'admin@kepenk.ai' && 
                    credentials?.password === '123456'
                ) {
                    return {
                        id: 'merchant_123',
                        name: 'Ahmet Berber',
                        email: 'admin@kepenk.ai',
                        role: 'admin' // İstenirse role tabanlı yetki için
                    };
                }
                
                return null;
            }
        })
    ],
    pages: {
        signIn: '/login', // Özel login sayfamızın rotası
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
