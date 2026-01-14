'use client';

import { useCart } from './CartContext';
import Link from 'next/link';

export default function CartSidebar() {
    const { isCartOpen, toggleCart, items, removeFromCart, updateQuantity, total } = useCart();

    if (!isCartOpen) return null;

    return (
        <div className="fixed inset-0 z-[2000] flex justify-end">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={toggleCart}></div>

            {/* Sidebar */}
            <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col p-6 animate-in slide-in-from-right duration-300 pointer-events-auto">
                {/* HEADER with Minimize/Close */}
                <div className="flex justify-between items-start border-b pb-4 mb-4">
                    <div>
                        <h2 className="text-2xl font-[family-name:var(--font-heading)] uppercase text-black leading-none mb-1">Tu Pedido</h2>
                        <button onClick={toggleCart} className="text-xs text-[#C59D5F] hover:underline font-bold uppercase tracking-wide">
                            ← Seguir Comprando
                        </button>
                    </div>
                    <div className="flex gap-6 items-center">
                        <button onClick={toggleCart} title="Minimizar" className="text-gray-400 hover:text-black text-3xl leading-none -mt-4 font-bold" aria-label="Minimizar">_</button>
                        <button onClick={toggleCart} title="Cerrar" className="text-gray-400 hover:text-black text-2xl leading-none" aria-label="Cerrar">✕</button>
                    </div>
                </div>

                {/* ITEMS LIST */}
                <div className="flex-1 overflow-y-auto">
                    {items.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-gray-400 space-y-4">
                            <p>Tu carrito está vacío.</p>
                            <button onClick={toggleCart} className="text-[#C59D5F] underline font-bold text-sm uppercase">Ir a la tienda</button>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {items.map(item => (
                                <div key={item.id} className="flex gap-4 items-center bg-gray-50 p-3 rounded border border-gray-100">
                                    <div className="flex-1">
                                        <h4 className="font-bold text-sm uppercase text-black">{item.name}</h4>
                                        <p className="text-gray-500 text-xs">{item.price}€ / ud</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button onClick={() => updateQuantity(item.id, -1)} className="w-8 h-8 flex items-center justify-center bg-white border border-gray-200 hover:border-[#C59D5F] rounded text-lg transition-colors">-</button>
                                        <span className="text-sm font-bold w-6 text-center">{item.quantity}</span>
                                        <button onClick={() => updateQuantity(item.id, 1)} className="w-8 h-8 flex items-center justify-center bg-white border border-gray-200 hover:border-[#C59D5F] rounded text-lg transition-colors">+</button>
                                    </div>
                                    <div className="text-right min-w-[70px]">
                                        <p className="font-bold text-black">{(item.price * item.quantity).toFixed(2)}€</p>
                                        <button onClick={() => removeFromCart(item.id)} className="text-[10px] text-red-500 uppercase hover:underline mt-1">Eliminar</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* FOOTER */}
                <div className="border-t pt-4 mt-4 bg-white">
                    <div className="flex justify-between items-center mb-6">
                        <span className="text-lg font-bold uppercase text-gray-700">Total</span>
                        <span className="text-3xl font-[family-name:var(--font-heading)] text-[#C59D5F]">{total.toFixed(2)}€</span>
                    </div>

                    {/* CHECKOUT BUTTON (LINK) */}
                    <Link
                        href="/web/checkout"
                        onClick={toggleCart} // Close sidebar on nav
                        className={`block w-full text-center bg-[#C59D5F] text-white py-4 font-bold uppercase tracking-wider hover:bg-black transition-all transform active:scale-95 ${items.length === 0 ? 'pointer-events-none opacity-50' : ''}`}>
                        Tramitar Pedido
                    </Link>

                    <div className="flex justify-center gap-2 mt-3 opacity-50 grayscale">
                        {/* Simple icons placeholders or text */}
                        <span className="text-[10px] text-gray-400">VISA</span>
                        <span className="text-[10px] text-gray-400">MASTERCARD</span>
                        <span className="text-[10px] text-gray-400">STRIPE</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
