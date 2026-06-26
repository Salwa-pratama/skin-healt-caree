"use client";

import Link from "next/link";

export default function Footer({ isOpen = true }: { isOpen?: boolean }) {
    return (
        <footer className={`bg-[var(--dashboard-card-bg)] py-6 px-4 sm:px-12 border-t border-[var(--dashboard-border)] hidden lg:block transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${isOpen ? "lg:ml-64" : "lg:ml-0"}`}>
            <div className="flex justify-between items-center max-w-7xl mx-auto">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface/30">
                    © 2024 Clinical Ethereal MedTech.
                </p>
                <div className="flex gap-8">
                    <Link
                        className="text-on-surface/30 hover:text-on-surface transition-colors text-[10px] font-bold uppercase tracking-[0.2em]"
                        href="#"
                    >
                        Privasi
                    </Link>
                    <Link
                        className="text-on-surface/30 hover:text-on-surface transition-colors text-[10px] font-bold uppercase tracking-[0.2em]"
                        href="#"
                    >
                        Standar
                    </Link>
                </div>
            </div>
        </footer>
    )
}