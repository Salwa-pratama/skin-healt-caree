"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Cookies from "js-cookie";

export default function AuthListener() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Daftar halaman terproteksi yang membutuhkan token valid
    const protectedRoutes = [
      "/pages/dashboard",
      "/pages/scan",
      "/pages/history",
      "/pages/setting",
      "/pages/profil",
      "/pages/notifikasi"
    ];

    const isProtectedRoute = protectedRoutes.some((route) =>
      pathname?.startsWith(route)
    );

    const checkToken = () => {
      const token = Cookies.get("access_token");
      
      if (isProtectedRoute) {
        const isSessionActive = sessionStorage.getItem("session_active");
        if (!isSessionActive) {
          console.warn("🔒 AuthListener: Sesi baru terdeteksi (sessionStorage kosong). Menghapus token...");
          Cookies.remove("access_token", { path: "/" });
          window.location.href = "/pages/auth/login";
          return;
        }
      }

      if (isProtectedRoute && !token) {
        console.warn("🔒 AuthListener: Token tidak ditemukan di halaman terproteksi. Mengarahkan ke halaman login...");
        window.location.href = "/pages/auth/login";
      }
    };

    // Pengecekan awal saat render/pindah halaman
    checkToken();

    // 1. Mendengarkan event storage untuk sinkronisasi logout antar tab
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "logout-event") {
        console.log("🔔 AuthListener: Menerima sinyal logout dari tab lain. Mengeluarkan sesi...");
        window.location.href = "/pages/auth/login";
      }
    };
    window.addEventListener("storage", handleStorageChange);

    // 2. Melakukan pengecekan berkala terhadap cookie (setiap 2 detik)
    const interval = setInterval(checkToken, 2000);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      clearInterval(interval);
    };
  }, [pathname, router]);

  return null;
}
