import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { authConfig } from './auth.config';

function logDebug(msg: string) {
    console.log(`[AUTH DEBUG] ${msg}`);
}

const prisma = new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
});

async function getUser(email: string) {
    const cleanEmail = email.trim().toLowerCase();
    try {
        const user = await prisma.user.findUnique({
            where: { email: cleanEmail },
        });
        return user;
    } catch (error) {
        logDebug(`ERROR in getUser: ${error}`);
        throw new Error('Failed to fetch user.');
    }
}


export const { auth, signIn, signOut, handlers } = NextAuth({
    ...authConfig,
    secret: process.env.AUTH_SECRET,
    trustHost: true,
    useSecureCookies: true, // Force secure cookies behind proxy
    providers: [
        Credentials({
            async authorize(credentials) {
                console.log('[AUTH] Authorize called with:', { email: credentials?.email });
                try {
                    const parsedCredentials = z
                        .object({ email: z.string().email(), password: z.string().min(6) })
                        .safeParse(credentials);

                    if (parsedCredentials.success) {
                        const { email, password } = parsedCredentials.data;
                        console.log('[AUTH] Looking for user:', email);

                        const user = await getUser(email);
                        if (!user) {
                            console.log('[AUTH] User NOT found');
                            return null;
                        }

                        console.log('[AUTH] User found, comparing password...');
                        const passwordsMatch = await bcrypt.compare(password, user.password);
                        if (passwordsMatch) {
                            console.log('[AUTH] Password matched!');
                            // CRITICAL FIX: Return only serializable fields. 
                            // Prisma returns Date objects which can crash NextAuth serialization boundary.
                            return {
                                id: user.id,
                                email: user.email,
                                name: user.name,
                                role: user.role,
                            };
                        } else {
                            console.log('[AUTH] Password mismatch');
                        }
                    } else {
                        console.log('[AUTH] Invalid verification format');
                    }
                    return null;
                } catch (error) {
                    console.error('[AUTH CRITICAL ERROR]', error);
                    // Return null to indicate auth failure instead of crashing
                    return null;
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            console.log('[AUTH CALLBACK] JWT Called');
            // En login inicial, 'user' viene de authorize()
            if (user) {
                console.log('[AUTH CALLBACK] JWT - User present, setting token fields');
                token.id = user.id;
                token.email = user.email;
                token.role = user.role;
            }
            return token;
        },
        async session({ session, token }) {
            console.log('[AUTH CALLBACK] Session Called');
            // Persistimos en session lo que guardamos en token
            if (session.user) {
                // @ts-ignore
                session.user.id = token.id as string;
                session.user.email = token.email as string;
                // @ts-ignore
                session.user.role = token.role as string;
            }
            return session;
        },
    },
});
