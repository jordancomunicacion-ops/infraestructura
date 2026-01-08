'use client';

import { useState } from 'react';
import { authenticate } from '@/app/lib/actions';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Page() {
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [isPending, setIsPending] = useState(false);
    const router = useRouter();

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setIsPending(true);
        setErrorMessage(null);

        const formData = new FormData(event.currentTarget);

        try {
            // Call Server Action directly
            const result = await authenticate(undefined, formData);

            if (result) {
                // Check for JSON success signal
                if (result.startsWith('{') && result.includes('"success":true')) {
                    try {
                        const parsed = JSON.parse(result);
                        if (parsed.success) {
                            // EXITOSO! Redirigir.
                            window.location.href = parsed.url;
                            return;
                        }
                    } catch (e) {
                        console.error("Error parsing JSON response", e);
                    }
                }

                // Si no es JSON o no es éxito, mostrar mensaje (error)
                console.log(result);
                // Si es el mensaje antiguo de éxito (por si acaso)
                if (result === "LOGIN_EXITOSO_REDIRECCION_DETECTADA") {
                    window.location.href = '/dashboard';
                    return;
                }
                setErrorMessage(result);
                setIsPending(false);
            } else {
                // Success? authenticate usually redirects.
                // If it didn't redirect, maybe we forced a return?
                // But actions.ts redirects on success.
                // Just in case, we can force a refresh or router.push
                // router.push('/dashboard'); 
                // But let's verify actions.ts behavior.
            }
        } catch (e) {
            setErrorMessage("Error de conexión al iniciar sesión");
            setIsPending(false);
        }
    }

    return (
        <div className="flex h-screen items-center justify-center bg-gray-50">
            <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
                <div className="flex justify-center mb-6">
                    {/* Placeholder Icon */}
                    <div className="mx-auto h-24 w-24 bg-green-100 rounded-full flex items-center justify-center mb-6 shadow-inner relative overflow-hidden">
                        {/* Replaced Emoji with Logo */}
                        <img
                            src="/logo-icon.png"
                            alt="Logo Soto del Prior"
                            className="h-16 w-16 object-contain"
                        />
                    </div>
                </div>
                <h1 className="mb-4 text-center text-2xl font-bold text-gray-900">
                    App Ganadera Login
                </h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label
                            className="mb-2 block text-sm font-medium text-gray-700"
                            htmlFor="email"
                        >
                            Email
                        </label>
                        <input
                            className="block w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm"
                            id="email"
                            type="email"
                            name="email"
                            placeholder="usuario@sotodelprior.com"
                            required
                            autoComplete="email"
                        />
                    </div>
                    <div>
                        <label
                            className="mb-2 block text-sm font-medium text-gray-700"
                            htmlFor="password"
                        >
                            Contraseña
                        </label>
                        <input
                            className="block w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm"
                            id="password"
                            type="password"
                            name="password"
                            placeholder="********"
                            required
                            minLength={6}
                            autoComplete="current-password"
                        />
                    </div>

                    <div className="flex items-end space-x-1" aria-live="polite" aria-atomic="true">
                        {errorMessage && (
                            <p className="text-sm text-red-500">{errorMessage}</p>
                        )}
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input
                                id="remember-me"
                                name="remember-me"
                                type="checkbox"
                                className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
                            />
                            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                                Recuérdame
                            </label>
                        </div>
                    </div>

                    <button
                        className="flex w-full justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50"
                        disabled={isPending}
                    >
                        {isPending ? 'Iniciando...' : 'Iniciar Sesión'}
                    </button>

                    <div className="text-center text-sm mt-4">
                        <span className="text-gray-500">¿No tienes cuenta? </span>
                        <Link href="/register" className="font-medium text-green-600 hover:text-green-500">
                            Regístrate
                        </Link>
                    </div>
                    <div className="text-center text-xs mt-2">
                        <Link href="/forgot-password" className="font-medium text-gray-500 hover:text-gray-700">
                            ¿Olvidaste tu contraseña?
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
