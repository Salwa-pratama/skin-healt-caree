"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function ProfilePage() {
  const [is2FAEnabled, setIs2FAEnabled] = useState(true);

  return (
    <div className="bg-[#f8f9fa] text-[#191c1d] antialiased min-h-screen font-sans selection:bg-[#84F75E]/30 selection:text-[#1c6d00]">
      {/* Top Navigation - Responsive */}
      <nav className="sticky top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-zinc-200/50 px-4 sm:px-8 py-3 sm:py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/pages/dashboard" className="flex items-center gap-3">
            <div className="flex flex-col">
              <h1 className="text-lg sm:text-xl font-extrabold text-zinc-900 tracking-tight">Luminous Lab</h1>
              <p className="hidden xs:block text-[9px] sm:text-[10px] uppercase tracking-widest text-zinc-500 font-bold">Clinical Portal</p>
            </div>
          </Link>
          <div className="flex items-center gap-1 sm:gap-6">
            <Link className="p-2 text-zinc-500 hover:text-[#1c6d00] transition-colors" href="/pages/dashboard">
              <span className="material-symbols-outlined text-xl sm:text-2xl">dashboard</span>
            </Link>
            <Link className="hidden sm:block p-2 text-zinc-500 hover:text-[#1c6d00] transition-colors" href="/pages/scan">
              <span className="material-symbols-outlined">biotech</span>
            </Link>
            <Link className="hidden sm:block p-2 text-zinc-500 hover:text-[#1c6d00] transition-colors" href="/pages/history">
              <span className="material-symbols-outlined">history</span>
            </Link>
            <Link className="p-2 text-[#1c6d00] bg-[#84f75e]/30 rounded-full" href="/pages/profil">
              <span className="material-symbols-outlined text-xl sm:text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>settings</span>
            </Link>
            <div className="h-6 w-px bg-zinc-200 mx-1 sm:mx-2"></div>
            <Link className="p-2 text-zinc-500 hover:text-red-500 transition-colors" href="/pages/auth/login">
              <span className="material-symbols-outlined text-xl sm:text-2xl">logout</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content Canvas */}
      <main className="min-h-screen pb-40 md:pb-52">
        <div className="max-w-5xl mx-auto">
          {/* Header Section */}
          <header className="px-6 sm:px-10 lg:px-0 pt-10 sm:pt-16 pb-10 sm:pb-16 text-center md:text-left">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#191c1d] mb-4">Edit Profil</h2>
            <p className="text-base sm:text-lg text-[#3f4a39] max-w-2xl mx-auto md:mx-0 leading-relaxed">
              Perbarui informasi akun dan preferensi klinis Anda untuk hasil analisis kulit yang lebih akurat.
            </p>
          </header>

          <div className="px-5 sm:px-10 lg:px-0 space-y-8 sm:space-y-12">
            {/* Section 1: Profil Pengguna (Glassmorphism Card) */}
            <section className="bg-white/70 backdrop-blur-[30px] rounded-[1.5rem] sm:rounded-[2rem] p-6 sm:p-10 shadow-[0_40px_60px_-5px_rgba(25,28,29,0.04)] border border-white/50">
              <div className="flex flex-col md:flex-row gap-8 sm:gap-12 items-center md:items-start">
                <div className="relative group flex-shrink-0">
                  <div className="w-32 h-32 sm:w-48 sm:h-48 rounded-full overflow-hidden border-4 border-[#84f75e] shadow-lg">
                    <img
                      alt="User profile avatar"
                      className="w-full h-full object-cover"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuASpIs7U2aIxSyaIMtvONfbkT2-D3eO2hifZYSbtM12iOArzKj_0fZkjawcx4xqygnEeFz45ouT79ASyf1EMzsqCVYFO25pAyDShRSVHIrk4V6cDN31pArjVrP_8A3I0NVNycgFHAtT4MEy3LAteBJxfBM4CkygCF2dHgQn1DftN63JJW7C4bTAmMW1znnb-dCfBmnzm7912q5W4v2pPNz1HHlcM4jRo2kUss9TMLFLiZ2CBrlO3Kx5F9crVR83GeC7W6X9SQxUgQMC"
                    />
                  </div>
                  <button className="absolute bottom-1 right-1 sm:bottom-2 sm:right-2 bg-[#1c6d00] text-white p-2 sm:p-3 rounded-full shadow-lg hover:scale-105 active:scale-90 transition-transform">
                    <span className="material-symbols-outlined text-lg sm:text-base">photo_camera</span>
                  </button>
                </div>
                <div className="flex-1 w-full grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8">
                  <div className="space-y-1 sm:space-y-2">
                    <label className="text-[9px] sm:text-[10px] font-extrabold uppercase tracking-widest text-[#3f4a39] px-1">Nama Lengkap</label>
                    <input
                      className="w-full bg-[#f3f4f5] border-none rounded-xl sm:rounded-2xl px-5 py-3 sm:py-4 focus:ring-2 focus:ring-[#1c6d00] transition-all outline-none text-[#191c1d] font-medium text-sm sm:text-base"
                      type="text"
                      defaultValue="Dr. Sarah Luminous"
                    />
                  </div>
                  <div className="space-y-1 sm:space-y-2">
                    <label className="text-[9px] sm:text-[10px] font-extrabold uppercase tracking-widest text-[#3f4a39] px-1">Alamat Email</label>
                    <input
                      className="w-full bg-[#edeeef] border-none rounded-xl sm:rounded-2xl px-5 py-3 sm:py-4 text-[#3f4a39] font-medium cursor-not-allowed opacity-70 text-sm sm:text-base"
                      readOnly
                      type="email"
                      defaultValue="sarah.luminous@dermascan.com"
                    />
                  </div>
                  <div className="space-y-1 sm:space-y-2 sm:col-span-2">
                    <label className="text-[9px] sm:text-[10px] font-extrabold uppercase tracking-widest text-[#3f4a39] px-1">Nomor Telepon</label>
                    <input
                      className="w-full bg-[#f3f4f5] border-none rounded-xl sm:rounded-2xl px-5 py-3 sm:py-4 focus:ring-2 focus:ring-[#1c6d00] transition-all outline-none text-[#191c1d] font-medium text-sm sm:text-base"
                      type="tel"
                      defaultValue="+62 812 3456 7890"
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* Section 2: Informasi Klinis */}
            <section className="bg-[#f3f4f5] rounded-[1.5rem] sm:rounded-[2rem] p-6 sm:p-10 space-y-8 sm:space-y-10">
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[#1c6d00]">science</span>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#191c1d]">Informasi Klinis</h3>
                </div>
                <div className="space-y-4">
                  <label className="text-[9px] sm:text-[10px] font-extrabold uppercase tracking-widest text-[#3f4a39] px-1">Tipe Kulit</label>
                  <div className="flex flex-wrap gap-2 sm:gap-3">
                    {["Kering", "Berminyak", "Kombinasi", "Normal"].map((type) => (
                      <button
                        key={type}
                        className={`flex-1 min-w-[100px] sm:flex-none px-4 sm:px-8 py-2.5 sm:py-3 rounded-full border-2 transition-all hover:scale-95 font-bold text-xs sm:text-sm ${
                          type === "Kering"
                            ? "border-[#84f75e] bg-[#84f75e] text-[#1d7000]"
                            : "border-transparent bg-white text-[#3f4a39] hover:border-[#84f75e]"
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="space-y-4">
                  <label className="text-[9px] sm:text-[10px] font-extrabold uppercase tracking-widest text-[#3f4a39] px-1">Masalah Utama</label>
                  <div className="flex flex-wrap gap-2 sm:gap-3">
                    {["Jerawat", "Penuaan", "Kusam", "Tekstur"].map((problem) => (
                      <button
                        key={problem}
                        className={`flex-1 min-w-[100px] sm:flex-none px-4 sm:px-8 py-2.5 sm:py-3 rounded-full border-2 transition-all hover:scale-95 font-bold text-xs sm:text-sm ${
                          ["Jerawat", "Penuaan"].includes(problem)
                            ? "border-[#84f75e] bg-[#84f75e] text-[#1d7000]"
                            : "border-transparent bg-white text-[#3f4a39] hover:border-[#84f75e]"
                        }`}
                      >
                        {problem}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Section 3: Keamanan */}
            <section className="bg-white/70 backdrop-blur-[30px] rounded-[1.5rem] sm:rounded-[2rem] p-6 sm:p-10 shadow-[0_40px_60px_-5px_rgba(25,28,29,0.04)] border border-white/50">
              <div className="flex items-center gap-3 mb-6 sm:mb-8">
                <span className="material-symbols-outlined text-[#1c6d00]">shield</span>
                <h3 className="text-xl sm:text-2xl font-bold text-[#191c1d]">Keamanan</h3>
              </div>
              <div className="space-y-3 sm:space-y-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-5 sm:p-6 bg-[#edeeef] rounded-xl sm:rounded-2xl group hover:bg-[#e7e8e9] transition-colors gap-4">
                  <div className="flex items-center gap-4">
                    <span className="material-symbols-outlined text-[#3f4a39]">lock_reset</span>
                    <div>
                      <p className="font-bold text-[#191c1d] text-sm sm:text-base">Ubah Kata Sandi</p>
                      <p className="text-[11px] sm:text-sm text-[#3f4a39]">Terakhir diperbarui 3 bulan yang lalu</p>
                    </div>
                  </div>
                  <button className="w-full sm:w-auto text-[#1c6d00] font-bold hover:underline transition-all text-sm sm:text-base text-left sm:text-right">Ubah</button>
                </div>
                <div className="flex items-center justify-between p-5 sm:p-6 bg-[#edeeef] rounded-xl sm:rounded-2xl gap-4">
                  <div className="flex items-center gap-4">
                    <span className="material-symbols-outlined text-[#3f4a39]">vibration</span>
                    <div>
                      <p className="font-bold text-[#191c1d] text-sm sm:text-base">2-Step Verification</p>
                      <p className="text-[11px] sm:text-sm text-[#3f4a39]">Amankan akun Anda via SMS</p>
                    </div>
                  </div>
                  <div
                    className={`relative inline-flex items-center cursor-pointer w-12 sm:w-14 h-6 sm:h-8 rounded-full p-1 transition-colors flex-shrink-0 ${
                      is2FAEnabled ? "bg-[#1c6d00]" : "bg-[#cbd5e1]"
                    }`}
                    onClick={() => setIs2FAEnabled(!is2FAEnabled)}
                  >
                    <div
                      className={`bg-white w-4 sm:w-6 h-4 sm:h-6 rounded-full shadow-sm transition-transform ${
                        is2FAEnabled ? "translate-x-6" : "translate-x-0"
                      }`}
                    />
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* Sticky Footer */}
        <footer className="fixed bottom-0 right-0 left-0 bg-white/90 backdrop-blur-3xl px-4 sm:px-16 py-4 sm:py-6 border-t border-zinc-200/50 z-30">
          <div className="max-w-5xl mx-auto flex flex-col-reverse sm:flex-row justify-end items-center gap-2 sm:gap-4">
            <button className="w-full sm:w-auto px-6 sm:px-10 py-3 sm:py-4 rounded-full text-[#3f4a39] font-bold hover:bg-[#edeeef] transition-colors active:scale-95 duration-200 text-sm sm:text-base">
              Batal
            </button>
            <button className="w-full sm:w-auto signature-gradient px-8 sm:px-12 py-3 sm:py-4 rounded-full text-white font-black text-base sm:text-lg shadow-lg hover:scale-[1.02] active:scale-95 transition-all duration-200">
              Simpan Perubahan
            </button>
          </div>
        </footer>
      </main>

      <style jsx>{`
        .signature-gradient {
          background: linear-gradient(135deg, #84F75E 0%, #1C6D00 100%);
        }
        @media (max-width: 640px) {
          .material-symbols-outlined { font-size: 20px; }
        }
      `}</style>
    </div>
  );
}
