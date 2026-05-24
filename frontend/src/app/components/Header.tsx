"use client";

import React, { Suspense } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from '@/lib/theme-provider';

function NavbarContent() {
    const pathname = usePathname();
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const { theme, toggleTheme } = useTheme();
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    const isSains = pathname === '/pages/sains' || pathname.startsWith('/pages/sains/');
    const isTentang = pathname === '/pages/tentang' || pathname.startsWith('/pages/tentang/');
    const isFitur = pathname === '/';
    const isAppPage = pathname.startsWith('/pages/dashboard') || 
                      pathname.startsWith('/pages/scan') || 
                      pathname.startsWith('/pages/history') || 
                      pathname.startsWith('/pages/profil') || 
                      pathname.startsWith('/pages/setting') || 
                      pathname.startsWith('/pages/notifikasi');
    if (isAppPage) return null;

    const navLinks = [
        { name: 'Fitur', path: '/', active: isFitur },
        { name: 'Sains', path: '/pages/sains', active: isSains },
        { name: 'Tentang', path: '/pages/tentang', active: isTentang },
    ];
    return (
        <nav className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-2xl border-b border-outline-variant/30 transition-all duration-300">
            <div className="flex justify-between items-center px-6 md:px-8 py-2.5 max-w-6xl mx-auto">
                <div className="flex items-center gap-2 cursor-pointer">
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="w-7 h-7 md:w-8 md:h-8 rounded-lg bg-primary-container flex items-center justify-center transition-transform group-hover:scale-105 duration-300 shadow-sm">
                            <span
                                className="material-symbols-outlined text-on-primary-container text-base md:text-lg"
                                style={{ fontVariationSettings: "'FILL' 1" }}
                            >
                                pulse_alert
                            </span>
                        </div>
                        <span className="text-lg md:text-xl font-black tracking-tight text-on-surface group-hover:text-primary transition-colors duration-300">
                            AETHER MED
                        </span>
                    </Link>
                </div>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.path}
                            className={`text-[13px] lg:text-sm tracking-tight transition-all duration-300 relative py-1 group font-semibold ${link.active
                                ? 'text-primary'
                                : 'text-on-surface-variant hover:text-primary'
                                }`}
                        >
                            {link.name}
                            <span className={`absolute bottom-0 left-0 w-full h-0.5 rounded-full bg-primary transition-transform duration-300 ${link.active ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100 origin-left'}`}></span>
                        </Link>
                    ))}
                </div>

                <div className="flex items-center gap-3">
                    {/* Dark/Light Mode Toggle */}
                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-xl bg-surface-variant text-on-surface-variant hover:bg-primary/10 hover:text-primary transition-all duration-300 flex items-center justify-center shadow-sm cursor-pointer"
                        aria-label="Toggle theme"
                        title={!mounted ? 'Toggle theme' : theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                    >
                        <span className="material-symbols-outlined text-[19px] md:text-xl leading-none">
                            {!mounted ? 'dark_mode' : theme === 'dark' ? 'light_mode' : 'dark_mode'}
                        </span>
                    </button>

                    {/* Desktop Auth Pill */}
                    <div className="hidden md:flex items-center gap-2 bg-surface-container-high border border-outline-variant/30 p-1 rounded-full relative">
                        {/* Sliding Pill Background */}
                        <div
                            className="absolute h-[calc(100%-8px)] top-[4px] transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] bg-primary rounded-full shadow-sm"
                            style={{
                                width: "70px",
                                transform: pathname === "/pages/auth/login" ? "translateX(0px)" : "translateX(74px)",
                            }}
                        />

                        <Link
                            href="/pages/auth/login"
                            className={`text-[11px] font-bold tracking-tight w-[70px] py-1.5 rounded-full flex items-center justify-center transition-colors duration-300 relative z-10 ${pathname === "/pages/auth/login" ? "text-on-primary" : "text-on-surface-variant hover:text-primary"
                                }`}
                        >
                            Masuk
                        </Link>
                        <Link
                            href="/pages/auth/register"
                            className={`text-[11px] font-bold tracking-tight w-[70px] py-1.5 rounded-full flex items-center justify-center transition-colors duration-300 relative z-10 ${pathname === "/pages/auth/register" ? "text-on-primary" : "text-on-surface-variant hover:text-primary"
                                }`}
                        >
                            Daftar
                        </Link>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="md:hidden p-2 rounded-xl bg-surface-variant/50 text-on-surface-variant hover:bg-primary/10 hover:text-primary transition-all duration-300"
                    >
                        <span className="material-symbols-outlined text-2xl leading-none">
                            {isMenuOpen ? 'close' : 'menu'}
                        </span>
                    </button>
                </div>
            </div>

            {/* Mobile Navigation Menu */}
            <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-96 border-t border-outline-variant/20 opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="bg-surface/95 backdrop-blur-xl px-6 py-6 space-y-5 shadow-inner">
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
