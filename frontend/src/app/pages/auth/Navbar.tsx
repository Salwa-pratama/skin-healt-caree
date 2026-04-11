"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AuthNavbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 bg-[#f8faf9]/80 backdrop-blur-md border-b border-[#e1e4e6]/50">
      <div className="flex justify-between items-center w-full px-8 md:px-12 py-4 md:py-5 max-w-[1920px] mx-auto">
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
        <div className="hidden md:flex items-center gap-8">
          <Link
            className="text-sm font-medium tracking-tight text-[#595c5d] hover:text-[#2c2f30] transition-colors"
            href="/pages/landing.page"
          >
            Fitur
          </Link>
          <Link
            className="text-sm font-medium tracking-tight text-[#595c5d] hover:text-[#2c2f30] transition-colors"
            href="/pages/landing.page?tab=sains"
          >
            Sains
          </Link>
          <Link
            className="text-sm font-medium tracking-tight text-[#595c5d] hover:text-[#2c2f30] transition-colors"
            href="/pages/landing.page?tab=tentang"
          >
            Tentang
          </Link>
          <div className="flex items-center gap-2 bg-[#eff1f2] p-1.5 rounded-full relative">
            {/* Sliding Pill Background */}
            <div 
              className="absolute h-[calc(100%-12px)] top-[6px] transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] bg-[#84F75E] rounded-full shadow-sm"
              style={{
                width: "80px",
                transform: pathname === "/pages/auth/login" ? "translateX(0px)" : "translateX(84px)",
              }}
            />
            
            <Link 
              href="/pages/auth/login" 
              className={`text-xs font-bold tracking-tight w-20 py-2 rounded-full flex items-center justify-center transition-colors duration-300 relative z-10 ${
                pathname === "/pages/auth/login" ? "text-[#0a3900]" : "text-[#595c5d]"
              }`}
            >
              Masuk
            </Link>
            <Link
              href="/pages/auth/register"
              className={`text-xs font-bold tracking-tight w-20 py-2 rounded-full flex items-center justify-center transition-colors duration-300 relative z-10 ${
                pathname === "/pages/auth/register" ? "text-[#0a3900]" : "text-[#595c5d]"
              }`}
            >
              Daftar
            </Link>
          </div>
        </div>

        {/* Mobile Menu Icon */}
        <button 
          className="md:hidden text-[#2c2f30] p-1"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span className="material-symbols-outlined text-2xl">
            {isMenuOpen ? "close" : "menu"}
          </span>
        </button>
      </div>

      {/* Mobile Navigation Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden bg-[#f8faf9] border-t border-[#e1e4e6]/50 px-8 py-8 space-y-6 animate-in fade-in slide-in-from-top-4 duration-300 shadow-xl">
          <div className="flex flex-col space-y-5">
            <Link
              className="text-lg font-bold text-[#595c5d] hover:text-[#2c2f30]"
              href="/pages/landing.page"
              onClick={() => setIsMenuOpen(false)}
            >
              Fitur
            </Link>
            <Link
              className="text-lg font-bold text-[#595c5d] hover:text-[#2c2f30]"
              href="/pages/landing.page?tab=sains"
              onClick={() => setIsMenuOpen(false)}
            >
              Sains
            </Link>
            <Link
              className="text-lg font-bold text-[#595c5d] hover:text-[#2c2f30]"
              href="/pages/landing.page?tab=tentang"
              onClick={() => setIsMenuOpen(false)}
            >
              Tentang
            </Link>
          </div>
          <div className="pt-6 border-t border-[#e1e4e6]/50 flex flex-col gap-4">
            <Link
              className={`w-full py-4 rounded-xl flex items-center justify-center font-bold text-sm ${
                pathname === "/pages/auth/login" ? "bg-[#84F75E] text-[#0a3900]" : "bg-[#eff1f2] text-[#595c5d]"
              }`}
              href="/pages/auth/login"
              onClick={() => setIsMenuOpen(false)}
            >
              Masuk
            </Link>
            <Link
              className={`w-full py-4 rounded-xl flex items-center justify-center font-bold text-sm ${
                pathname === "/pages/auth/register" ? "bg-[#84F75E] text-[#0a3900]" : "bg-[#eff1f2] text-[#595c5d]"
              }`}
              href="/pages/auth/register"
              onClick={() => setIsMenuOpen(false)}
            >
              Daftar
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
