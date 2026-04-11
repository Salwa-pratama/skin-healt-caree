"use client";

import React, { Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams, usePathname } from 'next/navigation';

function NavbarContent() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const tab = searchParams.get('tab');

    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const isSains = tab === 'sains';
    const isTentang = tab === 'tentang';
    const isFitur = !tab || tab === 'fitur';

    const navLinks = [
        { name: 'Fitur', path: '/pages/landing.page', active: isFitur },
        { name: 'Sains', path: '/pages/landing.page?tab=sains', active: isSains },
        { name: 'Tentang', path: '/pages/landing.page?tab=tentang', active: isTentang },
    ];
    return (
        <nav className="fixed top-0 w-full z-50 bg-surface/70 backdrop-blur-xl border-b border-outline-variant/10">
            <div className="flex justify-between items-center px-6 md:px-8 py-4 md:py-5 max-w-7xl mx-auto">
                {/* <Link href="/" className="text-xl md:text-2xl font-extrabold tracking-tight text-on-surface font-headline hover:opacity-80 transition-opacity">
                    DermaScan
                </Link> */}
                
                <div className="flex items-center gap-2 cursor-pointer">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 md:w-9 md:h-9 rounded-lg bg-[#84F75E] flex items-center justify-center">
              <span
                className="material-symbols-outlined text-[#0a3900] text-lg md:text-xl"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                pulse_alert
              </span>
            </div>
            <span className="text-xl font-black tracking-[-0.04em] text-[#2c2f30]">
              AETHER MED
            </span>
          </Link>
        </div>
                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center space-x-10">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.path}
                            className={`text-sm tracking-tight transition-all duration-300 relative py-1 ${
                                link.active
                                ? 'text-primary font-bold after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-primary rounded-full'
                                : 'text-on-surface-variant hover:text-primary font-medium'
                            }`}
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>
                <div className="flex items-center space-x-4 md:space-x-8">
                    <Link
                        href="/pages/auth/login"
                        className="hidden sm:block text-on-surface-variant font-bold text-sm tracking-tight hover:text-on-surface transition-colors"
                    >
                        Masuk
                    </Link>

                    <Link
                        href="/pages/auth/login"
                        className="signature-gradient text-on-primary px-5 md:px-8 py-2 md:py-2.5 rounded-full font-bold text-sm md:text-base hover:opacity-90 transition-all scale-95 active:scale-90 shadow-lg shadow-primary/20 inline-block"
                    >
                        Mulai Pemindaian
                    </Link>

                    {/* Hamburger Menu Icon */}
                    <button
                        className="md:hidden text-on-surface p-1 hover:bg-surface-container rounded-lg transition-colors"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        <span className="material-symbols-outlined text-2xl">
                            {isMenuOpen ? 'close' : 'menu'}
                        </span>
                    </button>
                </div>
            </div>

            {/* Mobile Navigation Menu */}
            {isMenuOpen && (
                <div className="md:hidden bg-surface border-t border-outline-variant/10 px-6 py-8 space-y-6 animate-in fade-in slide-in-from-top-4 duration-300">
                    <div className="flex flex-col space-y-4">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.path}
                                className={`text-xl ${link.active ? 'text-primary font-extrabold' : 'text-on-surface-variant font-semibold'} py-2 transition-colors`}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>
                    <div className="pt-6 border-t border-outline-variant/10 flex flex-col space-y-4">
                        <Link
                            href="/pages/auth/login"
                            className="text-lg text-on-surface-variant font-bold py-2"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Masuk
                        </Link>
                    </div>
                </div>
            )}
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
