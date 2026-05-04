"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

interface DashboardHeaderProps {
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
}

export default function DashboardHeader({ isSidebarOpen, onToggleSidebar }: DashboardHeaderProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 right-0 flex justify-between items-center px-4 md:px-8 h-16 z-[60] border-b transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
        isSidebarOpen ? "lg:left-64 left-0" : "left-0"
      } ${
        scrolled 
          ? "bg-white/90 backdrop-blur-xl border-[#edeeef] shadow-sm" 
          : "bg-white border-transparent"
      }`}
    >
      <div className="flex items-center gap-4">
        {/* Hamburger Menu Button - Hidden on Mobile */}
        <button 
          onClick={onToggleSidebar}
          className="hidden lg:flex w-9 h-9 items-center justify-center rounded-lg hover:bg-slate-100 transition-colors group"
        >
          <span className={`material-symbols-outlined transition-all duration-300 ${isSidebarOpen ? "rotate-90 text-[#1c6d00]" : "text-slate-400"}`}>
            {isSidebarOpen ? "close" : "menu"}
          </span>
        </button>

        {/* Logo Section */}
        <div className="flex items-center">
          <div className="flex items-center transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)]">
            <span className="text-[#191c1d] text-lg md:text-xl font-black tracking-tight uppercase whitespace-nowrap">
              Aether Med
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        <div className="relative hidden sm:block">
          <input
            className="bg-[#f3f4f5] border-none rounded-full py-1.5 px-5 text-[11px] w-40 lg:w-56 text-[#191c1d] placeholder-slate-400 focus:ring-2 focus:ring-[#84f75e] transition-all"
            placeholder="Search medical data..."
            type="text"
          />
          <span className="material-symbols-outlined absolute right-3.5 top-1.5 text-slate-400 text-sm">
            search
          </span>
        </div>

        <button className="relative text-[#6f7b67] hover:text-[#1c6d00] transition-colors p-1.5">
          <span className="material-symbols-outlined text-[20px]">notifications</span>
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-red-500 rounded-full border-2 border-white"></span>
        </button>

        <Link href="/pages/profil">
          <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-[#84f75e] hover:scale-105 transition-transform cursor-pointer shadow-sm">
            <img
              alt="Profile"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAEn4HazQ2JPJoF2zKyTSqb9V8Md24ll0JNrzbPnz8Y34Ag94EwJh0y6c3E0zG9cSLOF3pafjfuiziCBtzvgck3_DfbO7D8ydx0r63uuVzQVgWLh0QQICPVLBsE63LTlT-3hPapCkbNE946COlqln_K43fr41a3C96qSk62cLc_G186RPZo6KC7LbT-RV0kgehO7sog0GbIGaoSuS-qLOk94GPnP3NJ-mrGAbjw_GHKm842lRLupT3MVKSsQH4vY4TOBE7MfG_Z-b2Y"
            />
          </div>
        </Link>
      </div>
    </header>
  );
}
