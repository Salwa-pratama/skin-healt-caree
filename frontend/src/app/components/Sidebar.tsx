"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useLogoutMutation } from "@/features/auth/api/auth.api";
import { useProfile } from "@/features/auth/api/profile.api";

type ActivePage = string;

interface SidebarProps {
  activePage: ActivePage;
  isOpen?: boolean;
}

const userNavItems = [
  { icon: "dashboard", label: "Dashboard", href: "/pages/dashboard_user", key: "dashboard" },
  { icon: "calendar_month", label: "Jadwal", href: "/pages/dashboard_user/jadwal", key: "jadwal" },
  { icon: "biotech", label: "Analysis", href: "/pages/dashboard_user/scan", key: "scan" },
  { icon: "history", label: "History", href: "/pages/dashboard_user/history", key: "history" },
  { icon: "settings", label: "Settings", href: "/pages/dashboard_user/setting", key: "setting" },
];

const adminNavItems = [
  { icon: "dashboard", label: "Dashboard", href: "/pages/admin-dashboard", key: "admin-dashboard" },
  { icon: "group", label: "Users", href: "/pages/admin-users", key: "admin-users" },
  { icon: "medical_services", label: "Acne Solutions", href: "/pages/admin-acne-solutions", key: "admin-acne-solutions" },
  { icon: "settings", label: "Settings", href: "/pages/dashboard_user/setting", key: "setting" },
];

export default function Sidebar({ activePage, isOpen = true }: SidebarProps) {
  const pathname = usePathname();
  const { data: user } = useProfile();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const logoutMutation = useLogoutMutation();

  const navItems = user?.role === "admin" ? adminNavItems : userNavItems;

  const handleLogoutConfirm = () => {
    logoutMutation.mutate();
    setShowLogoutModal(false);
  };

  return (
    <>
      <aside
        className={`hidden lg:flex flex-col h-screen pt-6 pb-10 bg-[var(--dashboard-sidebar-bg)] fixed left-0 top-0 border-r border-[var(--dashboard-sidebar-border)] z-40 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${isOpen ? "w-64 translate-x-0 opacity-100" : "w-0 -translate-x-full opacity-0 pointer-events-none"
          }`}
      >
        {/* Brand */}
        <div className={`px-8 mb-12 mt-4 transition-opacity duration-300 ${!isOpen ? "lg:opacity-0" : "opacity-100"}`}>
          <div className="flex flex-col">
            <span className="uppercase tracking-[0.1em] text-[10px] font-extrabold text-on-surface-variant/70">
              Clinical Precision
            </span>
            <span className="text-[var(--dashboard-text)] font-black text-xl tracking-tight uppercase">
              Aether Med
            </span>
          </div>
        </div>

        <nav className="flex-1 space-y-1 relative">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.key}
                href={item.href}
                className={`relative flex items-center gap-4 py-4 px-8 border-l-4 transition-colors duration-300 z-10 ${isActive
                    ? "text-[var(--dashboard-sidebar-active-text)] border-transparent"
                    : "text-on-surface-variant border-transparent hover:text-[var(--dashboard-sidebar-active-text)]"
                  } ${!isOpen ? "justify-center px-0 border-l-0 border-r-4" : ""}`}
              >
                {isActive && (
                  <motion.div
                    layoutId="sidebar-active-indicator"
                    className={`absolute inset-y-0 bg-[var(--dashboard-sidebar-active-bg)] z-[-1] ${isOpen
                        ? "left-[-4px] right-0 border-l-4 border-[var(--dashboard-sidebar-active-text)]"
                        : "left-0 right-[-4px] border-r-4 border-[var(--dashboard-sidebar-active-text)]"
                      }`}
                    initial={false}
                    transition={{
                      type: "spring",
                      stiffness: 350,
                      damping: 30,
                    }}
                  />
                )}
                <span className="material-symbols-outlined text-xl">{item.icon}</span>
                {isOpen && (
                  <span className="uppercase tracking-[0.1em] text-[11px] font-extrabold">
                    {item.label}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom Section */}
        <div className={`px-8 mt-auto transition-all duration-300 ${!isOpen ? "px-2" : ""}`}>
          <div className="mt-8 flex flex-col gap-2">
            <div className={`flex items-center gap-4 text-on-surface-variant py-4 cursor-pointer hover:text-[var(--dashboard-sidebar-active-text)] ${!isOpen ? "justify-center px-0" : ""}`}>
              <span className="material-symbols-outlined">help</span>
              {isOpen && (
                <span className="uppercase tracking-[0.1em] text-[11px] font-extrabold">
                  Support
                </span>
              )}
            </div>
            <button
              onClick={() => setShowLogoutModal(true)}
              disabled={logoutMutation.isPending}
              className={`w-full flex items-center gap-4 text-red-400 py-4 hover:text-red-600 transition-colors disabled:opacity-50 ${!isOpen ? "justify-center px-0" : ""}`}
            >
              <span className="material-symbols-outlined">logout</span>
              {isOpen && (
                <span className="uppercase tracking-[0.1em] text-[11px] font-extrabold">
                  {logoutMutation.isPending ? "Logging out..." : "Logout Session"}
                </span>
              )}
            </button>
          </div>
        </div>
      </aside>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[var(--dashboard-card-bg)] border border-[var(--dashboard-sidebar-border)] rounded-3xl p-8 max-w-sm w-full mx-4 shadow-2xl flex flex-col items-center text-center animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 bg-red-100/10 rounded-full flex items-center justify-center text-red-500 mb-6">
              <span className="material-symbols-outlined text-3xl">logout</span>
            </div>
            <h3 className="text-xl font-extrabold text-[var(--dashboard-text)] mb-2 tracking-tight">
              Keluar Sesi?
            </h3>
            <p className="text-sm font-medium text-on-surface-variant/80 mb-8">
              Apakah Anda yakin ingin keluar dari DermaScan? Anda harus masuk
              kembali untuk melanjutkan analisis.
            </p>
            <div className="w-full grid grid-cols-2 gap-4">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="py-3 rounded-2xl font-bold bg-surface-variant text-on-surface hover:bg-surface-container-high transition-colors cursor-pointer"
                disabled={logoutMutation.isPending}
              >
                Batal
              </button>
              <button
                onClick={handleLogoutConfirm}
                className="py-3 rounded-2xl font-bold bg-red-500 text-white hover:bg-red-600 transition-colors disabled:opacity-50 cursor-pointer"
                disabled={logoutMutation.isPending}
              >
                {logoutMutation.isPending ? "Keluar..." : "Ya, Keluar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
