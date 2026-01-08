import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
    // Explicitly fallback for runtime robustness if env fails
    secret: process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET || 'fallback_secret_key_fixed',
    debug: true,
    trustHost: true,
    cookies: {
        sessionToken: {
            name: `__Secure-next-auth.session-token`,
            options: {
                httpOnly: true,
                sameSite: 'lax',
                path: '/',
                secure: true,
            },
        },
    },
    pages: {
        signIn: '/login',
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            console.log('[MIDDLEWARE] Authorized called. Path:', nextUrl.pathname, 'User:', auth?.user?.email);

            // Exclude public paths
            const isPublic =
                nextUrl.pathname === '/login' ||
                nextUrl.pathname === '/register' ||
                nextUrl.pathname.startsWith('/_next') ||
                nextUrl.pathname.startsWith('/api') ||
                nextUrl.pathname.includes('favicon.ico');

            if (isPublic) {
                if (isLoggedIn && (nextUrl.pathname === '/login' || nextUrl.pathname === '/register')) {
                    return Response.redirect(new URL('/dashboard', nextUrl));
                }
                return true;
            }

            if (!isLoggedIn) {
                console.log('[MIDDLEWARE] Redirecting to login (No session)');
                return false; // Redirect to login
            }

            console.log('[MIDDLEWARE] Access granted');
            return true;
        },
    },
    providers: [], // Add providers in auth.ts to avoid Edge Runtime issues with Prisma/Bcrypt
} satisfies NextAuthConfig;
