"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useTheme } from "@/lib/theme-provider";

interface DashboardHeaderProps {
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
}

export default function DashboardHeader({ isSidebarOpen, onToggleSidebar }: DashboardHeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
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
          ? "bg-[var(--dashboard-header-scrolled-bg)] backdrop-blur-xl border-[var(--dashboard-sidebar-border)] shadow-sm" 
          : "bg-[var(--dashboard-header-bg)] border-transparent"
      }`}
    >
      <div className="flex items-center gap-4">
        {/* Hamburger Menu Button - Hidden on Mobile */}
        <button 
          onClick={onToggleSidebar}
          className="hidden lg:flex w-9 h-9 items-center justify-center rounded-lg hover:bg-surface-variant/50 transition-colors group cursor-pointer"
        >
          <span className={`material-symbols-outlined transition-all duration-300 ${isSidebarOpen ? "rotate-90 text-primary" : "text-on-surface-variant"}`}>
            {isSidebarOpen ? "close" : "menu"}
          </span>
        </button>

        {/* Logo Section */}
        <div className="flex items-center">
          <div className="flex items-center transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)]">
            <span className="text-[var(--dashboard-text)] text-lg md:text-xl font-black tracking-tight uppercase whitespace-nowrap">
              Aether Med
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        <div className="relative hidden sm:block">
          <input
            className="bg-[var(--dashboard-bg)] border-none rounded-full py-1.5 px-5 text-[11px] w-40 lg:w-56 text-[var(--dashboard-text)] placeholder-on-surface-variant/50 focus:ring-2 focus:ring-primary transition-all outline-none"
            placeholder="Search medical data..."
            type="text"
          />
          <span className="material-symbols-outlined absolute right-3.5 top-1.5 text-on-surface-variant text-sm">
            search
          </span>
        </div>

        {/* Theme Toggle Button */}
        <button 
          onClick={toggleTheme}
          className="text-on-surface-variant hover:text-primary transition-colors p-1.5 cursor-pointer flex items-center justify-center"
          title={!mounted ? "Toggle theme" : theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
        >
          <span className="material-symbols-outlined text-[20px]">
            {!mounted ? "dark_mode" : theme === "dark" ? "light_mode" : "dark_mode"}
          </span>
        </button>

        <button className="relative text-on-surface-variant hover:text-primary transition-colors p-1.5 cursor-pointer">
          <span className="material-symbols-outlined text-[20px]">notifications</span>
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-red-500 rounded-full border-2 border-[var(--dashboard-header-bg)]"></span>
        </button>

        <Link href="/pages/profil">
          <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-primary hover:scale-105 transition-transform cursor-pointer shadow-sm">
            <img
              alt="Profile"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuEn4HazQ2JPJoF2zKyTSqb9V8Md24ll0JNrzbPnz8Y34Ag94EwJh0y6c3E0zG9cSLOF3pafjfuiziCBtzvgck3_DfbO7D8ydx0r63uuVzQVgWLh0QQICPVLBsE63LTlT-3hPapCkbNE946COlqln_K43fr41a3C96qSk62cLc_G186RPZo6KC7LbT-RV0kgehO7sog0GbIGaoSuS-qLOk94GPnP3NJ-mrGAbjw_GHKm842lRLupT3MVKSsQH4vY4TOBE7MfG_Z-b2Y"
            />
          </div>
        </Link>
      </div>
    </header>
  );
}
