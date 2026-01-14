'use client';

import { useCart } from './CartContext';
import Link from 'next/link';

export default function CartSidebarPremium() {
    const { isCartOpen, toggleCart, items, removeFromCart, updateQuantity, total } = useCart();

    if (!isCartOpen) return null;

    return (
        <div className="fixed inset-0 z-[2000] flex justify-end font-sans">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
                onClick={toggleCart}
            ></div>

            {/* Sidebar Container */}
            <div className="relative w-full max-w-[550px] bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300 pointer-events-auto">

                {/* HEADER - Explicit padding and height */}
                <div className="flex-none p-10 border-b border-gray-100 flex justify-between items-center bg-white z-10">
                    <div>
                        <h2 className="text-4xl font-[family-name:var(--font-heading)] text-black leading-none mb-3 uppercase tracking-tight">TU CESTA</h2>
                        <button onClick={toggleCart} className="text-xs text-[#C59D5F] hover:text-black transition-colors font-bold uppercase tracking-[0.2em] flex items-center gap-2 pl-1">
                            <span>←</span> SEGUIR COMPRANDO
                        </button>
                    </div>
                </div>

                {/* ITEMS LIST - Wrapper for padding */}
                <div className="flex-1 overflow-y-auto">
                    <div className="p-10 space-y-10">
                        {items.length === 0 ? (
                            <div className="h-[50vh] flex flex-col items-center justify-center text-gray-400 space-y-6">
                                <div className="w-16 h-16 rounded-full border-2 border-gray-100 flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-gray-300"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" /><path d="M3 6h18" /><path d="M16 10a4 4 0 0 1-8 0" /></svg>
                                </div>
                                <p className="font-light tracking-wide text-sm uppercase">Tu carrito está vacío</p>
                            </div>
                        ) : (
                            items.map(item => (
                                <div key={item.id} className="group flex gap-6 items-start">
                                    {/* Product Info */}
                                    <div className="flex-1">
                                        <div className="flex justify-between items-start mb-2">
                                            <h4 className="font-[family-name:var(--font-heading)] text-2xl text-black leading-none uppercase pr-4">{item.name}</h4>
                                            <button
                                                onClick={() => removeFromCart(item.id)}
                                                className="text-gray-300 hover:text-red-600 transition-colors p-1 -mr-2"
                                                title="Eliminar"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                                            </button>
                                        </div>

                                        <div className="flex items-center justify-between mt-4">
                                            <p className="text-[#C59D5F] text-xl font-[family-name:var(--font-heading)]">{item.price.toFixed(2)}€</p>

                                            {/* Minimal Quantity Selector */}
                                            <div className="flex items-center gap-5 border border-gray-100 rounded-full px-3 py-1">
                                                <button
                                                    onClick={() => updateQuantity(item.id, -1)}
                                                    className="w-5 h-5 flex items-center justify-center text-gray-400 hover:text-black transition-colors text-lg leading-none pb-[2px]"
                                                >
                                                    -
                                                </button>
                                                <span className="text-sm font-medium min-w-[1rem] text-center">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, 1)}
                                                    className="w-5 h-5 flex items-center justify-center text-gray-400 hover:text-black transition-colors text-lg leading-none pb-[2px]"
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* FOOTER */}
                <div className="flex-none p-10 bg-white border-t border-gray-100 z-20 shadow-[0_-10px_40px_rgba(0,0,0,0.03)]">
                    <div className="flex justify-between items-end mb-8">
                        <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-2">Total Estimado</span>
                        <div className="text-right">
                            <span className="block text-5xl font-[family-name:var(--font-heading)] text-black leading-none">{total.toFixed(2)}€</span>
                            <span className="text-[10px] text-gray-400 uppercase tracking-wider block mt-2">Impuestos incluidos</span>
                        </div>
                    </div>

                    <Link
                        href="/web/checkout"
                        onClick={toggleCart} // Close sidebar on nav
                        className={`group w-full flex items-center justify-center gap-4 bg-black text-white py-5 hover:bg-[#C59D5F] transition-all duration-300 ${items.length === 0 ? 'pointer-events-none opacity-50' : ''}`}
                    >
                        <span className="font-bold uppercase tracking-[0.2em] text-sm group-hover:tracking-[0.25em] transition-all">Finalizar Compra</span>
                        <svg className="w-4 h-4 transform group-hover:translate-x-2 transition-transform duration-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                    </Link>
                </div>
            </div>
        </div>
    );
}
