"use client";

import React, { Suspense } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

function NavbarContent() {
    const pathname = usePathname();
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    const isSains = pathname === '/pages/sains' || pathname.startsWith('/pages/sains/');
    const isTentang = pathname === '/pages/tentang' || pathname.startsWith('/pages/tentang/');
    const isFitur = pathname === '/';

    const navLinks = [
        { name: 'Fitur', path: '/', active: isFitur },
        { name: 'Sains', path: '/pages/sains', active: isSains },
        { name: 'Tentang', path: '/pages/tentang', active: isTentang },
    ];
    return (
        <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-2xl border-b border-outline-variant/30 transition-all duration-300">
            <div className="flex justify-between items-center px-6 md:px-8 py-4 max-w-7xl mx-auto">
                <div className="flex items-center gap-2 cursor-pointer">
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-primary-container flex items-center justify-center transition-transform group-hover:scale-105 duration-300 shadow-sm">
                            <span
                                className="material-symbols-outlined text-on-primary-container text-xl md:text-2xl"
                                style={{ fontVariationSettings: "'FILL' 1" }}
                            >
                                pulse_alert
                            </span>
                        </div>
                        <span className="text-xl md:text-2xl font-black tracking-tight text-on-surface group-hover:text-primary transition-colors duration-300">
                            AETHER MED
                        </span>
                    </Link>
                </div>
                
                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center space-x-8 lg:space-x-12">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.path}
                            className={`text-sm lg:text-base tracking-tight transition-all duration-300 relative py-1 group font-semibold ${
                                link.active
                                ? 'text-primary'
                                : 'text-on-surface-variant hover:text-primary'
                            }`}
                        >
                            {link.name}
                            <span className={`absolute bottom-0 left-0 w-full h-0.5 rounded-full bg-primary transition-transform duration-300 ${link.active ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100 origin-left'}`}></span>
                        </Link>
                    ))}
                </div>

                <div className="flex items-center space-x-3 md:space-x-6">
                    <Link
                        href="/pages/auth/login"
                        className="hidden sm:block text-on-surface font-bold text-sm tracking-tight hover:text-primary transition-colors"
                    >
                        Masuk
                    </Link>

                    <Link
                        href="/pages/auth/register"
                        className="group flex items-center gap-2 signature-gradient text-on-primary px-5 md:px-7 py-2.5 rounded-full font-bold text-sm md:text-base hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 active:scale-95"
                    >
                        <span>Daftar</span>
                        <span className="material-symbols-outlined text-sm md:text-base transition-transform group-hover:translate-x-1">
                            arrow_forward
                        </span>
                    </Link>

                    {/* Hamburger Menu Icon */}
                    <button
                        className="md:hidden text-on-surface p-2 hover:bg-surface-variant rounded-full transition-colors focus:outline-none"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        <span className="material-symbols-outlined text-2xl">
                            {isMenuOpen ? 'close' : 'menu'}
                        </span>
                    </button>
                </div>
            </div>

            {/* Mobile Navigation Menu */}
            <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-96 border-t border-outline-variant/20 opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="bg-white/95 backdrop-blur-xl px-6 py-6 space-y-5 shadow-inner">
                    <div className="flex flex-col space-y-4">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.path}
                                className={`text-lg font-bold flex items-center justify-between p-3 rounded-xl transition-colors ${link.active ? 'text-primary bg-primary/5' : 'text-on-surface-variant hover:text-primary hover:bg-surface-variant'}`}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {link.name}
                                {link.active && <span className="material-symbols-outlined text-sm">chevron_right</span>}
                            </Link>
                        ))}
                    </div>
                    <div className="pt-5 border-t border-outline-variant/20 flex flex-col space-y-3">
                        <Link
                            href="/pages/auth/login"
                            className="flex items-center justify-center w-full bg-surface-variant text-on-surface font-bold py-3 rounded-xl hover:bg-surface-container-high transition-colors"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Masuk
                        </Link>
                        <Link
                            href="/pages/auth/register"
                            className="flex items-center justify-center w-full signature-gradient text-on-primary font-bold py-3 rounded-xl hover:opacity-90 transition-opacity"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Daftar Sekarang
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default function Navbar() {
    return (
        <Suspense fallback={<div className="h-20 bg-surface/70 w-full fixed top-0 z-50 animate-pulse" />}>
            <NavbarContent />
        </Suspense>
    );
}
