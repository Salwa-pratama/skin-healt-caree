"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  useProfile,
  useUpdateProfileMutation,
} from "@/features/auth/api/profile.api";
import { useTheme } from "@/lib/theme-provider";

export default function ProfilePage() {
  const router = useRouter();
  const [is2FAEnabled, setIs2FAEnabled] = useState(true);
  const { data, isLoading, error } = useProfile();
  const { theme, toggleTheme } = useTheme();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("Nomor belum diupdate");
  const [gender, setGender] = useState("male");
  const [avatar, setAvatar] = useState("");
  const [skintype, setSkintype] = useState("Normal");
  const updateProfileMutation = useUpdateProfileMutation();

  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const skintypeMap: Record<string, string> = {
    Kering: "dry",
    Berminyak: "oily",
    Kombinasi: "combination",
    Normal: "normal",
  };

  const reverseSkintypeMap: Record<string, string> = {
    dry: "Kering",
    oily: "Berminyak",
    combination: "Kombinasi",
    normal: "Normal",
  };

  const defaultAvatar =
    gender === "female"
      ? "/assets/profile/female.png"
      : "/assets/profile/male.png";
  const avatarUrl = data?.avatar || defaultAvatar;

  useEffect(() => {
    if (data) {
      setName(data?.name || "");
      setPhone(data?.phone || "Nomor belum diupdate bro");
      setGender(data?.gender || "male");

      setSkintype(reverseSkintypeMap[data?.skintype] || "Normal");
    }
  }, [data]);

  const handleSave = () => {
    updateProfileMutation.mutate(
      {
        name,
        phone,
        skintype: skintypeMap[skintype] || "normal",
      },
      {
        onSuccess: () => {
          setShowSuccessPopup(true);
        },
        onError: (err: any) => {
          setErrorMessage(err?.response?.data?.message || err.message);
          setShowErrorPopup(true);
        },
      },
    );
  };

  console.log("Profile Data:", data);

  if (isLoading) {
    return (
      <div
        className="flex items-center justify-center min-h-screen"
        style={{ background: "var(--dashboard-bg)" }}
      >
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-[#1c6d00] dark:border-[#84f75e] border-t-transparent rounded-full animate-spin" />
          <p className="text-sm font-bold text-[#1c6d00] dark:text-[#84f75e] animate-pulse">
            Memuat Profil...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="flex items-center justify-center min-h-screen"
        style={{ background: "var(--dashboard-bg)" }}
      >
        <div className="flex flex-col items-center gap-4">
          <p
            className="text-sm font-bold"
            style={{ color: "var(--dashboard-sidebar-active-text)" }}
          >
            Error memuat profil
          </p>
          <p
            className="text-xs"
            style={{ color: "var(--dashboard-text-secondary)" }}
          >
            {error?.message}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="antialiased min-h-screen font-sans transition-colors duration-300"
      style={{
        background: "var(--dashboard-bg)",
        color: "var(--dashboard-text)",
      }}
    >
      {/* ── Top Navigation ── */}
      <nav
        className="sticky top-0 w-full backdrop-blur-md z-50 border-b px-4 sm:px-8 py-3 sm:py-4 transition-colors duration-300"
        style={{
          background: "var(--dashboard-header-scrolled-bg)",
          borderColor: "var(--dashboard-border)",
        }}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link
            href="/pages/dashboard/user"
            className="flex items-center gap-3"
          >
            <div className="flex flex-col">
              <h1
                className="text-lg sm:text-xl font-extrabold tracking-tight"
                style={{ color: "var(--dashboard-text)" }}
              >
                Luminous Lab
              </h1>
              <p
                className="hidden xs:block text-[9px] sm:text-[10px] uppercase tracking-widest font-bold"
                style={{ color: "var(--dashboard-text-secondary)" }}
              >
                Clinical Portal
              </p>
            </div>
          </Link>

          <div className="flex items-center gap-1 sm:gap-2">
            <Link
              className="p-2 transition-colors"
              style={{ color: "var(--dashboard-text-secondary)" }}
              href="/pages/dashboard/user"
            >
              <span className="material-symbols-outlined text-xl sm:text-2xl">
                dashboard
              </span>
            </Link>
            <Link
              className="hidden sm:block p-2 transition-colors"
              style={{ color: "var(--dashboard-text-secondary)" }}
              href="/pages/dashboar/user/scan"
            >
              <span className="material-symbols-outlined">biotech</span>
            </Link>
            <Link
              className="hidden sm:block p-2 transition-colors"
              style={{ color: "var(--dashboard-text-secondary)" }}
              href="/pages/dashboard/user/history"
            >
              <span className="material-symbols-outlined">history</span>
            </Link>
            <Link
              className="p-2 rounded-full"
              style={{
                color: "var(--dashboard-sidebar-active-text)",
                background: "var(--dashboard-sidebar-active-bg)",
              }}
              href="/pages/dashboard/user/profil"
            >
              <span
                className="material-symbols-outlined text-xl sm:text-2xl"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                settings
              </span>
            </Link>

            {/* ── Theme Toggle ── */}
            <button
              id="profil-theme-toggle"
              onClick={toggleTheme}
              aria-label="Toggle dark/light mode"
              className="p-2 rounded-full transition-all duration-200 hover:scale-110 active:scale-95"
              style={{
                color: "var(--dashboard-sidebar-active-text)",
                background: "var(--dashboard-sidebar-active-bg)",
              }}
            >
              <span className="material-symbols-outlined text-xl sm:text-2xl">
                {theme === "dark" ? "light_mode" : "dark_mode"}
              </span>
            </button>

            <div
              className="h-6 w-px mx-1 sm:mx-2"
              style={{ background: "var(--dashboard-border)" }}
            />
            <Link
              className="p-2 transition-colors hover:text-red-500"
              style={{ color: "var(--dashboard-text-secondary)" }}
              href="/pages/auth/login"
            >
              <span className="material-symbols-outlined text-xl sm:text-2xl">
                logout
              </span>
            </Link>
          </div>
        </div>
      </nav>

      {/* ── Main Content ── */}
      <main className="min-h-screen pb-28">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <header className="px-6 sm:px-10 lg:px-0 pt-10 sm:pt-16 pb-10 sm:pb-16 text-center md:text-left">
            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4"
              style={{ color: "var(--dashboard-text)" }}
            >
              Edit Profil
            </h2>
            <p
              className="text-base sm:text-lg max-w-2xl mx-auto md:mx-0 leading-relaxed"
              style={{ color: "var(--dashboard-text-secondary)" }}
            >
              Perbarui informasi akun dan preferensi klinis Anda untuk hasil
              analisis kulit yang lebih akurat.
            </p>
          </header>

          <div className="px-5 sm:px-10 lg:px-0 space-y-8 sm:space-y-12">
            {/* ── Section 1: Profil Pengguna ── */}
            <section
              className="rounded-[1.5rem] sm:rounded-[2rem] p-6 sm:p-10 border transition-colors duration-300"
              style={{
                background: "var(--glass-bg)",
                backdropFilter: "blur(30px)",
                WebkitBackdropFilter: "blur(30px)",
                borderColor: "var(--dashboard-border)",
                boxShadow: "0 40px 60px -5px rgba(0,0,0,0.06)",
              }}
            >
              <div className="flex flex-col md:flex-row gap-8 sm:gap-12 items-center md:items-start">
                {/* Avatar */}
                <div className="relative group flex-shrink-0">
                  <div
                    className="w-32 h-32 sm:w-48 sm:h-48 rounded-full overflow-hidden border-4 shadow-lg animate-none"
                    style={{
                      borderColor: "var(--dashboard-sidebar-active-text)",
                    }}
                  >
          
                    <img
                      alt="User profile avatar"
                      className="w-full h-full object-cover"
                      src={avatarUrl}
                    />
                  </div>
                  <button
                    className="absolute bottom-1 right-1 sm:bottom-2 sm:right-2 p-2 sm:p-3 rounded-full shadow-lg hover:scale-105 active:scale-90 transition-transform"
                    style={{
                      background: "var(--dashboard-sidebar-active-text)",
                      color: theme === "dark" ? "#042100" : "#ffffff",
                    }}
                  >
                    <span className="material-symbols-outlined text-lg sm:text-base">
                      photo_camera
                    </span>
                  </button>
                </div>

                {/* Form Fields */}
                <div className="flex-1 w-full grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8">
                  <div className="space-y-1 sm:space-y-2">
                    <label
                      className="text-[9px] sm:text-[10px] font-extrabold uppercase tracking-widest px-1"
                      style={{ color: "var(--dashboard-text-secondary)" }}
                    >
                      Nama Lengkap
                    </label>
                    <input
                      className="w-full border-none rounded-xl sm:rounded-2xl px-5 py-3 sm:py-4 focus:ring-2 transition-all outline-none font-medium text-sm sm:text-base"
                      style={{
                        background: "var(--dashboard-sidebar-active-bg)",
                        color: "var(--dashboard-text)",
                      }}
                      type="text"
                      placeholder={name}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="space-y-1 sm:space-y-2">
                    <label
                      className="text-[9px] sm:text-[10px] font-extrabold uppercase tracking-widest px-1"
                      style={{ color: "var(--dashboard-text-secondary)" }}
                    >
                      Alamat Email
                    </label>
                    <input
                      className="w-full border-none rounded-xl sm:rounded-2xl px-5 py-3 sm:py-4 font-medium cursor-not-allowed opacity-60 text-sm sm:text-base"
                      style={{
                        background: "var(--dashboard-border)",
                        color: "var(--dashboard-text-secondary)",
                      }}
                      readOnly
                      type="email"
                      value={data?.email || "data kosong"}
                    />
                  </div>
                  <div className="space-y-1 sm:space-y-2 sm:col-span-2">
                    <label
                      className="text-[9px] sm:text-[10px] font-extrabold uppercase tracking-widest px-1"
                      style={{ color: "var(--dashboard-text-secondary)" }}
                    >
                      Nomor HP
                    </label>
                    <input
                      className="w-full text-white border-none rounded-xl sm:rounded-2xl px-5 py-3 sm:py-4 focus:ring-2 transition-all outline-none font-medium text-sm sm:text-base"
                      style={{
                        background: "var(--dashboard-sidebar-active-bg)",
                        color: "var(--dashboard-text)",
                      }}
                      type="text"
                      // placeholder="Masukkan nomor HP Anda"
                      placeholder={phone}
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* ── Section 2: Informasi Klinis ── */}
            <section
              className="rounded-[1.5rem] sm:rounded-[2rem] p-6 sm:p-10 space-y-8 sm:space-y-10 transition-colors duration-300"
              style={{ background: "var(--dashboard-sidebar-active-bg)" }}
            >
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <span
                    className="material-symbols-outlined"
                    style={{ color: "var(--dashboard-sidebar-active-text)" }}
                  >
                    science
                  </span>
                  <h3
                    className="text-xl sm:text-2xl font-bold"
                    style={{ color: "var(--dashboard-text)" }}
                  >
                    Informasi Klinis
                  </h3>
                </div>

                {/* Tipe Kulit */}
                <div className="space-y-4">
                  <label
                    className="text-[9px] sm:text-[10px] font-extrabold uppercase tracking-widest px-1"
                    style={{ color: "var(--dashboard-text-secondary)" }}
                  >
                    Tipe Kulit
                  </label>
                  <div className="flex flex-wrap gap-2 sm:gap-3">
                    {["Kering", "Berminyak", "Kombinasi", "Normal"].map(
                      (type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => setSkintype(type)}
                          className="flex-1 min-w-[100px] sm:flex-none px-4 sm:px-8 py-2.5 sm:py-3 rounded-full border-2 transition-all hover:scale-95 font-bold text-xs sm:text-sm"
                          style={
                            type === skintype
                              ? {
                                  borderColor:
                                    "var(--dashboard-sidebar-active-text)",
                                  background:
                                    "var(--dashboard-sidebar-active-text)",
                                  color:
                                    theme === "dark" ? "#042100" : "#ffffff",
                                }
                              : {
                                  borderColor: "transparent",
                                  background: "var(--dashboard-card-bg)",
                                  color: "var(--dashboard-text-secondary)",
                                }
                          }
                        >
                          {type}
                        </button>
                      ),
                    )}
                  </div>
                </div>

                {/* Masalah Utama */}
                <div className="space-y-4">
                  <label
                    className="text-[9px] sm:text-[10px] font-extrabold uppercase tracking-widest px-1"
                    style={{ color: "var(--dashboard-text-secondary)" }}
                  >
                    Masalah Utama
                  </label>
                  <div className="flex flex-wrap gap-2 sm:gap-3">
                    {["Jerawat"].map((problem) => (
                      <button
                        key={problem}
                        className="flex-1 min-w-[100px] sm:flex-none px-4 sm:px-8 py-2.5 sm:py-3 rounded-full border-2 transition-all hover:scale-95 font-bold text-xs sm:text-sm"
                        style={
                          ["Jerawat", "Penuaan"].includes(problem)
                            ? {
                                borderColor:
                                  "var(--dashboard-sidebar-active-text)",
                                background:
                                  "var(--dashboard-sidebar-active-text)",
                                color: theme === "dark" ? "#042100" : "#ffffff",
                              }
                            : {
                                borderColor: "transparent",
                                background: "var(--dashboard-card-bg)",
                                color: "var(--dashboard-text-secondary)",
                              }
                        }
                      >
                        {problem}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* ── Section 3: Keamanan ── */}
            <section
              className="rounded-[1.5rem] sm:rounded-[2rem] p-6 sm:p-10 border transition-colors duration-300"
              style={{
                background: "var(--glass-bg)",
                backdropFilter: "blur(30px)",
                WebkitBackdropFilter: "blur(30px)",
                borderColor: "var(--dashboard-border)",
                boxShadow: "0 40px 60px -5px rgba(0,0,0,0.06)",
              }}
            >
              <div className="flex items-center gap-3 mb-6 sm:mb-8">
                <span
                  className="material-symbols-outlined"
                  style={{ color: "var(--dashboard-sidebar-active-text)" }}
                >
                  shield
                </span>
                <h3
                  className="text-xl sm:text-2xl font-bold"
                  style={{ color: "var(--dashboard-text)" }}
                >
                  Keamanan
                </h3>
              </div>
              <div className="space-y-3 sm:space-y-4">
                {/* Ubah Kata Sandi */}
                <div
                  className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-5 sm:p-6 rounded-xl sm:rounded-2xl gap-4 transition-colors duration-200 cursor-pointer"
                  style={{ background: "var(--dashboard-sidebar-active-bg)" }}
                >
                  <div className="flex items-center gap-4">
                    <span
                      className="material-symbols-outlined"
                      style={{ color: "var(--dashboard-text-secondary)" }}
                    >
                      lock_reset
                    </span>
                    <div>
                      <p
                        className="font-bold text-sm sm:text-base"
                        style={{ color: "var(--dashboard-text)" }}
                      >
                        Ubah Kata Sandi
                      </p>
                      <p
                        className="text-[11px] sm:text-sm"
                        style={{ color: "var(--dashboard-text-secondary)" }}
                      >
                        Terakhir diperbarui 3 bulan yang lalu
                      </p>
                    </div>
                  </div>
                  <button
                    className="w-full sm:w-auto font-bold hover:underline transition-all text-sm sm:text-base text-left sm:text-right"
                    style={{ color: "var(--dashboard-sidebar-active-text)" }}
                  >
                    Ubah
                  </button>
                </div>

                {/* 2FA Toggle */}
                <div
                  className="flex items-center justify-between p-5 sm:p-6 rounded-xl sm:rounded-2xl gap-4 transition-colors duration-200"
                  style={{ background: "var(--dashboard-sidebar-active-bg)" }}
                >
                  <div className="flex items-center gap-4">
                    <span
                      className="material-symbols-outlined"
                      style={{ color: "var(--dashboard-text-secondary)" }}
                    >
                      vibration
                    </span>
                    <div>
                      <p
                        className="font-bold text-sm sm:text-base"
                        style={{ color: "var(--dashboard-text)" }}
                      >
                        2-Step Verification
                      </p>
                      <p
                        className="text-[11px] sm:text-sm"
                        style={{ color: "var(--dashboard-text-secondary)" }}
                      >
                        Amankan akun Anda via SMS
                      </p>
                    </div>
                  </div>
                  <div
                    className="relative inline-flex items-center cursor-pointer w-12 sm:w-14 h-6 sm:h-8 rounded-full p-1 transition-colors flex-shrink-0"
                    style={{
                      background: is2FAEnabled
                        ? "var(--dashboard-sidebar-active-text)"
                        : "var(--dashboard-border)",
                    }}
                    onClick={() => setIs2FAEnabled(!is2FAEnabled)}
                  >
                    <div
                      className="w-4 sm:w-6 h-4 sm:h-6 rounded-full shadow-sm transition-transform"
                      style={{
                        background: "var(--dashboard-card-bg)",
                        transform: is2FAEnabled
                          ? "translateX(1.5rem)"
                          : "translateX(0)",
                      }}
                    />
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* ── Sticky Footer — Minimal Save/Cancel ── */}
        <footer
          className="fixed bottom-0 right-0 left-0 backdrop-blur-3xl border-t z-30 transition-colors duration-300"
          style={{
            background: "var(--dashboard-header-scrolled-bg)",
            borderColor: "var(--dashboard-border)",
          }}
        >
          <div className="max-w-5xl mx-auto px-4 sm:px-10 py-3 flex justify-end items-center gap-2">
            {/* Batal — ghost/text button */}
            <button
              id="profil-batal-btn"
              type="button"
              onClick={() => {
                router.push("/pages/dashboard");
              }}
              className="px-5 py-2 rounded-full text-xs font-semibold transition-all duration-200 hover:opacity-80 active:scale-95"
              style={{ color: "var(--dashboard-text-secondary)" }}
            >
              Batal
            </button>
            {/* Simpan Perubahan — compact accent pill */}
            <button
              id="profil-simpan-btn"
              type="button"
              onClick={handleSave}
              disabled={updateProfileMutation.isPending}
              className="px-6 py-2 rounded-full text-xs font-black tracking-wide shadow-md hover:scale-[1.03] active:scale-95 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
              style={{
                background: "linear-gradient(135deg, #84F75E 0%, #1C6D00 100%)",
                color: "#ffffff",
              }}
            >
              {updateProfileMutation.isPending ? "Menyimpan..." : "Simpan"}
            </button>
          </div>
        </footer>

        {/* ── Success Modal Popup ── */}
        {showSuccessPopup && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 cursor-pointer"
              onClick={() => setShowSuccessPopup(false)}
            />
            {/* Modal Content */}
            <div
              className="relative bg-[var(--dashboard-card-bg)] border border-[var(--dashboard-border)] rounded-[2rem] p-8 max-w-sm w-full shadow-2xl flex flex-col items-center text-center transition-all"
              style={{
                color: "var(--dashboard-text)",
                animation:
                  "popupEntrance 0.35s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
              }}
            >
              {/* Animated Icon Container */}
              <div className="w-20 h-20 rounded-full flex items-center justify-center mb-6 relative">
                {/* Outer pulsing ring */}
                <div className="absolute inset-0 rounded-full bg-[#84F75E]/20 animate-ping duration-1000" />
                {/* Inner gradient circle */}
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center relative shadow-inner"
                  style={{
                    background:
                      "linear-gradient(135deg, #84F75E 0%, #1C6D00 100%)",
                  }}
                >
                  <span className="material-symbols-outlined text-white text-3xl font-black">
                    check
                  </span>
                </div>
              </div>

              {/* Typography */}
              <h3 className="text-xl font-extrabold tracking-tight mb-2">
                Profil Diperbarui
              </h3>
              <p
                className="text-xs leading-relaxed mb-6"
                style={{ color: "var(--dashboard-text-secondary)" }}
              >
                Perubahan profil Anda telah berhasil disimpan dengan aman ke
                dalam sistem klinis kami.
              </p>

              {/* Action Button */}
              <button
                onClick={() => setShowSuccessPopup(false)}
                className="w-full py-3 rounded-full text-xs font-black tracking-wide shadow-md hover:scale-[1.02] active:scale-95 transition-all duration-200"
                style={{
                  background:
                    "linear-gradient(135deg, #84F75E 0%, #1C6D00 100%)",
                  color: "#ffffff",
                }}
              >
                Simpan
              </button>
            </div>
          </div>
        )}

        {/* ── Error Modal Popup ── */}
        {showErrorPopup && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 cursor-pointer"
              onClick={() => setShowErrorPopup(false)}
            />
            {/* Modal Content */}
            <div
              className="relative bg-[var(--dashboard-card-bg)] border border-[var(--dashboard-border)] rounded-[2rem] p-8 max-w-sm w-full shadow-2xl flex flex-col items-center text-center transition-all"
              style={{
                color: "var(--dashboard-text)",
                animation:
                  "popupEntrance 0.35s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
              }}
            >
              {/* Animated Icon Container */}
              <div className="w-20 h-20 rounded-full flex items-center justify-center mb-6 relative">
                {/* Outer pulsing ring */}
                <div className="absolute inset-0 rounded-full bg-red-500/20 animate-ping duration-1000" />
                {/* Inner gradient circle */}
                <div className="w-16 h-16 rounded-full flex items-center justify-center relative shadow-inner bg-gradient-to-br from-red-400 to-red-600 animate-none">
                  <span className="material-symbols-outlined text-white text-3xl font-black">
                    close
                  </span>
                </div>
              </div>

              {/* Typography */}
              <h3 className="text-xl font-extrabold tracking-tight mb-2">
                Gagal Menyimpan
              </h3>
              <p
                className="text-xs leading-relaxed mb-6"
                style={{ color: "var(--dashboard-text-secondary)" }}
              >
                {errorMessage ||
                  "Terjadi kesalahan sistem saat mencoba memperbarui profil klinis Anda."}
              </p>

              {/* Action Button */}
              <button
                onClick={() => setShowErrorPopup(false)}
                className="w-full py-3 rounded-full text-xs font-black tracking-wide shadow-md hover:scale-[1.02] active:scale-95 transition-all duration-200 bg-gradient-to-r from-red-500 to-red-600 text-white"
              >
                Tutup
              </button>
            </div>
          </div>
        )}

        <style jsx>{`
          @keyframes popupEntrance {
            from {
              opacity: 0;
              transform: scale(0.9) translateY(15px);
            }
            to {
              opacity: 1;
              transform: scale(1) translateY(0);
            }
          }
        `}</style>
      </main>
    </div>
  );
}
