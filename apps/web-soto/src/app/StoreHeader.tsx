'use client';

import { useCart } from './CartContext';

export default function StoreHeader() {
    const { toggleCart, items } = useCart();
    const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <header className="site-header">
            <a href="#" className="logo-link">
                <img src="/web/assets/logo_horizontal.png" alt="SOTO del PRIOR Logo" className="site-logo" />
            </a>
            <nav className="main-nav">
                <ul className="nav-list">
                    <li><a href="#restaurante">RESTAURANTE</a></li>
                    <li><a href="#eventos">EVENTOS</a></li>
                    <li><a href="#alojamiento">ESTANCIA</a></li>
                    <li><a href="#obrador">OBRADOR</a></li>
                    <li><a href="#origen">ORIGEN</a></li>
                </ul>
            </nav>
            <div className="header-cta flex items-center gap-8">

                {/* 1. CONTACTO (Hover forzado por CSS) */}
                <a href="#contacto" className="header-contact-link text-black font-black text-sm uppercase tracking-widest">
                    CONTACTO
                </a>

                {/* 2. CARRITO (Icono) */}
                <button onClick={toggleCart} className="relative group p-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} className="text-black group-hover:text-[#C59D5F] transition-colors">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                    {itemCount > 0 && (
                        <span className="absolute -top-1 -right-1 bg-[#C59D5F] text-white text-[9px] font-bold h-4 w-4 flex items-center justify-center rounded-full">
                            {itemCount}
                        </span>
                    )}
                </button>

            </div>
        </header>
    );
}
