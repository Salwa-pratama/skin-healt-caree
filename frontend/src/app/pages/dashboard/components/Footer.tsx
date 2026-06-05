"use client";

import Link from "next/link";

export default function Footer() {
    return (
        <footer className="lg:ml-72 bg-[var(--dashboard-card-bg)] py-6 px-12 border-t border-[var(--dashboard-border)] hidden lg:block transition-colors duration-300">
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