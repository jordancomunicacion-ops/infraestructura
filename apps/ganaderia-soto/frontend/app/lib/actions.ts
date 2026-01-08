'use server';

import { signIn, signOut } from '@/auth';
import { AuthError } from 'next-auth';
import { CreateUserSchema, UserFormState } from './definitions';
import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';
import { redirect } from 'next/navigation';
import { isRedirectError } from 'next/dist/client/components/redirect';

const prisma = new PrismaClient();

export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
) {
    console.log('[ACTION] Authenticate called - SPLIT MODE (Redirect: False)');
    try {
        // Step 1: Attempt Auth without auto-redirect
        // Note: signIn with redirect:false returns void in some versions or throws on error.
        // In NextAuth v5 beta, checking behavior:
        await signIn('credentials', {
            email: formData.get('email'),
            password: formData.get('password'),
            redirect: false
        });

        console.log('[ACTION] SignIn completed without throw. Auth success?');
        // If we get here, no error was thrown. We can assume success.
    } catch (error) {
        console.error('[ACTION ERROR during signIn]', error);
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return 'Credenciales inválidas.';
                default:
                    return 'Algo salió mal en el login.';
            }
        }
        // If it's NOT an AuthError, it might be a real crash.
        // But if it is a RedirectError (shouldn't happen with redirect:false), we catch it.
        if (isRedirectError(error)) {
            console.log('[ACTION] RedirectError caught even with redirect:false?');
            throw error;
        }
        return `Error Crítico en SignIn: ${String(error)}`;
    }

    // Step 2: Return Success Signal (Client-Side Redirect)
    // If we reached here, Auth was successful.
    console.log('[ACTION] Auth Success. Returning instruction to client.');

    // Instead of throwing redirect() which crashes, we return a success signal.
    return JSON.stringify({ success: true, url: '/dashboard' });

    /* 
    try {
        redirect('/dashboard');
    } catch(err) {
        if (isRedirectError(err)) {
            throw err;
        }
        return `Error al redirigir: ${String(err)}`;
    }
    */
}

export async function signOutAction() {
    await signOut();
}

export async function registerUser(prevState: UserFormState | undefined, formData: FormData): Promise<UserFormState> {
    const validatedFields = CreateUserSchema.safeParse({
        name: formData.get('name'),
        email: formData.get('email'),
        password: formData.get('password'),
        role: 'USER', // Default role
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Faltan campos obligatorios.',
        };
    }

    const { name, email, password, role } = validatedFields.data;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword, // CORRECTED FIELD NAME
                role: role as 'USER' | 'ADMIN',
            },
        });
    } catch (error) {
        // @ts-ignore
        if (error.code === 'P2002') {
            return {
                message: 'El email ya está en uso.',
            };
        }
        return {
            message: 'Error de base de datos.',
        };
    }

    redirect('/login');
}
