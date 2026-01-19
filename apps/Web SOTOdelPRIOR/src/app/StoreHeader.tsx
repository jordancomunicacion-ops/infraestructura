'use client';

import { useCart } from './CartContext';
import { useState } from 'react';

export default function StoreHeader() {
    const { toggleCart, items } = useCart();
    const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="site-header">
            {/* LOGO: Image on Desktop, Text on Mobile */}
            <a href="#" className="logo-link">
                <img
                    src="/web/assets/logo_horizontal.png"
                    alt="SOTO del PRIOR Logo"
                    className="site-logo hidden md:block"
                />
                <span
                    className="md:hidden text-lg tracking-tight font-bold uppercase"
                    style={{ fontFamily: 'var(--font-heading)' }}
                >
                    SOTO DEL PRIOR
                </span>
            </a>

            {/* DESKTOP NAV */}
            <nav className="main-nav hidden md:block">
                <ul className="nav-list">
                    <li><a href="#restaurante">RESTAURANTE</a></li>
                    <li><a href="#eventos">EVENTOS</a></li>
                    <li><a href="#alojamiento">ESTANCIA</a></li>
                    <li><a href="#obrador">OBRADOR</a></li>
                    <li><a href="#origen">ORIGEN</a></li>
                </ul>
            </nav>

            <div className="header-cta flex items-center gap-6">

                {/* 1. CONTACTO (Icono Envelope) */}
                <a href="#contacto" className="p-1 hover:text-[#C59D5F] transition-colors" aria-label="Contacto">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
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

                {/* 3. MOBILE MENU TOGGLE (Animated Cow Head) */}
                <button
                    className="md:hidden p-1 z-50 relative" // z-50 to ensure it stays on top of the menu overlay
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-label="Menu"
                >
                    <div className="relative w-8 h-8 flex items-center justify-center overflow-hidden">
                        {/* ICON: COW HEAD (Visible when Closed) */}
                        <img
                            src="/cow-head-logo.png"
                            alt="Menu"
                            className={`absolute inset-0 w-full h-full object-contain transition-all duration-500 ease-in-out transform ${isMenuOpen ? 'opacity-0 rotate-180 scale-50' : 'opacity-100 rotate-0 scale-100'}`}
                        />

                        {/* ICON: CLOSE X (Visible when Open) */}
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={1.5}
                            className={`absolute inset-0 w-full h-full text-black transition-all duration-500 ease-in-out transform ${isMenuOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-180 scale-50'}`}
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </div>
                </button>

            </div>

            {/* MOBILE TITLE (If requested to be above sections, but header is fixed at top. 
                The 'name only' option is handled by the logo replacement above. 
            */}

            {/* MOBILE MENU OVERLAY */}
            {isMenuOpen && (
                <div className="absolute top-[var(--header-height)] left-0 w-full bg-white shadow-xl border-t border-gray-100 p-6 flex flex-col md:hidden animate-in slide-in-from-top-2">
                    <nav className="flex flex-col gap-4 text-center">
                        <a href="#restaurante" onClick={() => setIsMenuOpen(false)} className="text-xl font-bold uppercase hover:text-[#C59D5F]">RESTAURANTE</a>
                        <a href="#eventos" onClick={() => setIsMenuOpen(false)} className="text-xl font-bold uppercase hover:text-[#C59D5F]">EVENTOS</a>
                        <a href="#alojamiento" onClick={() => setIsMenuOpen(false)} className="text-xl font-bold uppercase hover:text-[#C59D5F]">ESTANCIA</a>
                        <a href="#obrador" onClick={() => setIsMenuOpen(false)} className="text-xl font-bold uppercase hover:text-[#C59D5F]">OBRADOR</a>
                        <a href="#origen" onClick={() => setIsMenuOpen(false)} className="text-xl font-bold uppercase hover:text-[#C59D5F]">ORIGEN</a>
                        <a href="#contacto" onClick={() => setIsMenuOpen(false)} className="text-xl font-bold uppercase hover:text-[#C59D5F]">CONTACTO</a>
                    </nav>
                </div>
            )}
        </header>
    );
}
