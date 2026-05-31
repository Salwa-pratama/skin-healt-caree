"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useTheme } from "@/lib/theme-provider";
import { useProfile } from "@/features/auth/api/profile.api";

interface DashboardHeaderProps {
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
}

export default function DashboardHeader({ isSidebarOpen, onToggleSidebar }: DashboardHeaderProps) {
  const { data } = useProfile();
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
          <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-primary hover:scale-105 transition-transform cursor-pointer shadow-sm flex items-center justify-center">
            {data?.avatar ? (
              <img
                alt="Profile"
                src={data.avatar}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-[#E2E8F0] dark:bg-[#334155] flex items-center justify-center text-[#94A3B8] dark:text-[#64748B]">
                <svg
                  className="w-2/3 h-2/3"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
            )}
          </div>
        </Link>
      </div>
    </header>
  );
}
