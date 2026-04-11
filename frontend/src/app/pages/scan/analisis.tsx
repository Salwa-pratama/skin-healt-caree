"use client";

import React, { useState } from "react";
import Link from "next/link";
import "./scan.css";
import "../dashboard/dashboard.css";

export default function Analisis() {
  const [activeTab, setActiveTab] = useState<"live" | "upload">("live");

  return (
    <div className="bg-surface text-on-surface antialiased overflow-x-hidden font-manrope min-h-screen">
      {/* TopNavBar - Synchronized with Dashboard */}
      <header className="fixed top-0 w-full flex justify-between items-center px-4 md:px-8 h-20 bg-white/80 backdrop-blur-xl z-50 border-b border-[#edeeef] shadow-[0_2px_20px_rgba(0,0,0,0.02)]">
        <div className="flex items-center gap-2 text-[#1c6d00]">
          <span className="text-xl md:text-2xl font-extrabold tracking-tighter hover:opacity-80 transition-opacity cursor-pointer">
            DermaScan
          </span>
        </div>
        <div className="flex items-center gap-3 md:gap-6">
          <div className="relative hidden sm:block">
            <input
              className="bg-[#f3f4f5] border-none rounded-full py-2 px-6 text-sm w-48 lg:w-64 text-[#191c1d] placeholder-slate-400 focus:ring-2 focus:ring-[#84f75e]"
              placeholder="Search data..."
              type="text"
            />
            <span className="material-symbols-outlined absolute right-4 top-2 text-slate-400">
              search
            </span>
          </div>
          <button className="text-[#6f7b67] hover:text-[#1c6d00] transition-colors duration-200">
            <span className="material-symbols-outlined">notifications</span>
          </button>
          <div className="w-8 h-8 md:w-10 md:h-10 rounded-full overflow-hidden border-2 border-[#84f75e]">
            <img
              alt="User Medical Profile"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAEn4HazQ2JPJoF2zKyTSqb9V8Md24ll0JNrzbPnz8Y34Ag94EwJh0y6c3E0zG9cSLOF3pafjfuiziCBtzvgck3_DfbO7D8ydx0r63uuVzQVgWLh0QQICPVLBsE63LTlT-3hPapCkbNE946COlqln_K43fr41a3C96qSk62cLc_G186RPZo6KC7LbT-RV0kgehO7sog0GbIGaoSuS-qLOk94GPnP3NJ-mrGAbjw_GHKm842lRLupT3MVKSsQH4vY4TOBE7MfG_Z-b2Y"
            />
          </div>
        </div>
      </header>

      {/* Sidebar Navigation - Synchronized with Dashboard */}
      <aside className="hidden lg:flex flex-col h-screen py-10 bg-white w-72 fixed left-0 top-0 border-r border-[#edeeef] z-40">
        <div className="px-8 mb-12 mt-20">
          <div className="flex flex-col">
            <span className="uppercase tracking-[0.1em] text-[10px] font-extrabold text-[#6f7b67]">
              Clinical Precision
            </span>
            <span className="text-[#1c6d00] font-extrabold text-xl tracking-tight">
              Luminous Lab
            </span>
          </div>
        </div>
        <nav className="flex-1 space-y-1">
          <Link
            className="flex items-center gap-4 text-[#6f7b67] py-4 px-8 hover:text-[#1c6d00] hover:bg-[#f3fbf0] border-l-4 border-transparent hover:border-[#1c6d00] transition-all"
            href="/pages/dashboard"
          >
            <span className="material-symbols-outlined text-xl">dashboard</span>
            <span className="uppercase tracking-[0.1em] text-[11px] font-extrabold">
              Dashboard
            </span>
          </Link>
          <Link
            className="flex items-center gap-4 text-[#1c6d00] py-4 px-8 bg-[#f3fbf0] border-l-4 border-[#1c6d00] transition-all"
            href="/pages/scan"
          >
            <span className="material-symbols-outlined text-xl">biotech</span>
            <span className="uppercase tracking-[0.1em] text-[11px] font-extrabold">
              Analysis
            </span>
          </Link>
          {[
            { icon: "history", label: "History", href: "/pages/history" },
            { icon: "settings", label: "Settings", href: "/pages/setting" },
          ].map((item) => (
            <Link
              key={item.label}
              className="flex items-center gap-4 text-[#6f7b67] py-4 px-8 hover:text-[#1c6d00] hover:bg-[#f3fbf0] border-l-4 border-transparent hover:border-[#1c6d00] transition-all"
              href={item.href}
            >
              <span className="material-symbols-outlined text-xl">{item.icon}</span>
              <span className="uppercase tracking-[0.1em] text-[11px] font-extrabold">
                {item.label}
              </span>
            </Link>
          ))}
        </nav>
        <div className="px-8 mt-auto">
          <Link href="/pages/scan">
            <button className="w-full signature-gradient text-white font-bold py-4 px-6 rounded-full shadow-md hover:shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2">
              <span className="material-symbols-outlined">add_circle</span>
              <span className="text-sm">New Scan</span>
            </button>
          </Link>
          <div className="mt-8 flex items-center gap-4 text-[#6f7b67] py-4 cursor-pointer hover:text-[#1c6d00]">
            <span className="material-symbols-outlined">help</span>
            <span className="uppercase tracking-[0.1em] text-[11px] font-extrabold">
              Support
            </span>
          </div>
        </div>
      </aside>

      {/* Mobile Bottom Nav - Synchronized and Responsive */}
      <nav className="lg:hidden fixed bottom-6 left-6 right-6 h-16 bg-[#191c1d]/95 backdrop-blur-xl rounded-full flex items-center justify-between px-8 z-50 shadow-2xl border border-white/10">
        <Link href="/pages/dashboard">
          <span className="material-symbols-outlined text-slate-400 active:scale-90 transition-transform">grid_view</span>
        </Link>
        <Link href="/pages/scan">
          <span className="material-symbols-outlined text-white active:scale-90 transition-transform">biotech</span>
        </Link>
        <div className="relative -top-6">
          <div className="p-1 bg-white rounded-full shadow-xl">
            <Link href="/pages/scan">
              <div className="w-12 h-12 signature-gradient rounded-full flex items-center justify-center active:scale-90 transition-transform">
                <span className="material-symbols-outlined text-white font-bold">add</span>
              </div>
            </Link>
          </div>
        </div>
        <Link href="/pages/history">
          <span className="material-symbols-outlined text-slate-400 active:scale-90 transition-transform">history</span>
        </Link>
        <Link href="/pages/setting">
          <span className="material-symbols-outlined text-slate-400 active:scale-90 transition-transform">settings</span>
        </Link>
      </nav>

      {/* Main Content */}
      <main className="lg:ml-72 pt-28 px-6 md:px-10 pb-32 lg:pb-12 min-h-screen">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="mb-8 md:mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <span className="label-small uppercase tracking-[0.2em] text-primary font-extrabold text-[10px] md:text-xs">
                Ringkasan Analisis Pasien
              </span>
              <h1 className="text-3xl md:text-5xl font-extrabold text-on-background mt-2 tracking-tight">
                Aliran <span className="text-primary">Diagnostik</span>
              </h1>
            </div>
            {/* Mode Segmented Control */}
            <div className="bg-surface-container-high p-1 rounded-2xl flex w-fit">
              <button
                className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all duration-300 flex items-center gap-2 ${
                  activeTab === "live"
                    ? "tab-active"
                    : "text-on-surface/50 hover:text-on-surface"
                }`}
                onClick={() => setActiveTab("live")}
              >
                <span className="material-symbols-outlined text-sm">
                  videocam
                </span>
                Scan Langsung
              </button>
              <button
                className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all duration-300 flex items-center gap-2 ${
                  activeTab === "upload"
                    ? "tab-active"
                    : "text-on-surface/50 hover:text-on-surface"
                }`}
                onClick={() => setActiveTab("upload")}
              >
                <span className="material-symbols-outlined text-sm">
                  cloud_upload
                </span>
                Unggah Foto
              </button>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-6 md:gap-8">
            {/* Left Column: Skin Analysis Content */}
            <div className="col-span-12 lg:col-span-8 flex flex-col gap-6 md:gap-8">
              {/* Main Container */}
              <div className="bg-surface-container-lowest rounded-lg overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.03)] relative min-h-[500px] flex flex-col border border-slate-100">
                {/* Live Scan View */}
                {activeTab === "live" && (
                  <div className="relative flex-grow block">
                    <img
                      alt="Feed analisis kulit medis"
                      className="w-full h-[400px] object-cover mix-blend-luminosity opacity-90"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDqtUpcA0f2iI_O1zdpnI3m-sH3LWUWS3dQhTZSyijmbOmZWLQUih4prer-ux3_IpGg6lBObSyDUGHxOq7kXt4PgsEXWTc7EcHkLNUdG9-XIge0_1UgL6VWcI4J92sjMHVd1hGRExfG3GWbRdPQZ--Lm6PLG6BszM5hoeksJdZmtZP9lB_MZKfaq7ad1Lbr6SaRF5--agY761XYuTGXc51txZNM2Qo-3QRwJvt7RttIhqwPLJ025GxVms05eQ0Sb_htex9D3DD-DTBo"
                    />
                    {/* HUD Overlays */}
                    <div className="absolute inset-0 flex flex-col pointer-events-none">
                      <div className="scanning-line absolute w-full top-0 z-10 opacity-40"></div>
                      {/* Tracking Points */}
                      <div className="absolute top-1/3 left-1/4 flex flex-col items-start">
                        <div className="w-4 h-4 bg-primary rounded-full status-pulse ring-4 ring-white/20"></div>
                        <div className="bg-black/60 backdrop-blur-xl px-3 py-1.5 rounded-lg text-[10px] text-primary mt-3 font-mono font-bold">
                          POS_L_PIPI: 44.2%
                        </div>
                      </div>
                      <div className="absolute bottom-1/4 right-1/3 flex flex-col items-end">
                        <div className="w-4 h-4 bg-primary rounded-full status-pulse ring-4 ring-white/20"></div>
                        <div className="bg-black/60 backdrop-blur-xl px-3 py-1.5 rounded-lg text-[10px] text-primary mt-3 font-mono font-bold">
                          SAT_UV: KRITIS
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Upload View */}
                {activeTab === "upload" && (
                  <div className="relative flex-grow bg-slate-50 flex flex-col items-center justify-center p-12 min-h-[400px]">
                    <div className="w-full max-w-md aspect-video glass-panel rounded-3xl border-2 border-dashed border-primary/30 flex flex-col items-center justify-center p-8 cursor-pointer group hover:border-primary/60 transition-all">
                      <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                        <span className="material-symbols-outlined text-4xl text-primary">
                          add_a_photo
                        </span>
                      </div>
                      <h3 className="text-xl font-extrabold text-on-surface mb-2">
                        Unggah Foto Pasien
                      </h3>
                      <p className="text-sm text-on-surface/50 text-center font-medium">
                        Tarik dan lepas file di sini atau{" "}
                        <span className="text-primary font-bold">
                          cari file
                        </span>{" "}
                        untuk memulai analisis.
                      </p>
                      <div className="mt-8 flex gap-3 text-[10px] font-black uppercase tracking-widest text-on-surface/30">
                        <span>JPG</span>
                        <span className="w-1 h-1 bg-on-surface/20 rounded-full self-center"></span>
                        <span>PNG</span>
                        <span className="w-1 h-1 bg-on-surface/20 rounded-full self-center"></span>
                        <span>Maks 10MB</span>
                      </div>
                    </div>
                    <p className="mt-8 text-[10px] font-bold text-on-surface/40 uppercase tracking-[0.2em] flex items-center gap-2">
                      <span className="material-symbols-outlined text-xs">
                        verified_user
                      </span>
                      Data terenkripsi dan aman
                    </p>
                  </div>
                )}

                {/* Footer HUD */}
                <div className="p-8 bg-black/5 backdrop-blur-md flex justify-between items-end border-t border-slate-100">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <span className="w-2.5 h-2.5 rounded-full bg-primary status-pulse"></span>
                      <span className="text-[10px] font-black uppercase tracking-[0.3em] text-on-surface/50">
                        Fase Bio-Analisis 3
                      </span>
                    </div>
                    <h3 className="text-2xl font-black tracking-tight text-on-surface">
                      PETA_EPIDERMAL_V2
                    </h3>
                  </div>
                  <div className="flex flex-col items-end gap-3">
                    <div className="flex gap-1.5 h-6 items-end">
                      <span className="w-1.5 h-3 bg-primary/30 rounded-full"></span>
                      <span className="w-1.5 h-6 bg-primary rounded-full"></span>
                      <span className="w-1.5 h-4 bg-primary/60 rounded-full"></span>
                      <span className="w-1.5 h-5 bg-primary rounded-full"></span>
                    </div>
                    <div className="text-[10px] font-mono font-bold text-on-surface/40 uppercase">
                      INDEKS_LUM: 0.884
                    </div>
                  </div>
                </div>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-surface-container-low rounded-lg p-6 flex flex-col gap-4">
                  <div className="flex justify-between items-center">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface/30">
                      Profil Komposisi
                    </p>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="bg-white/50 p-3 rounded-xl text-center">
                      <p className="text-[10px] font-bold text-on-surface/40 mb-2">
                        Kering
                      </p>
                      <div className="h-1 bg-slate-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary/40"
                          style={{ width: "33%" }}
                        ></div>
                      </div>
                    </div>
                    <div className="bg-primary/10 p-3 rounded-xl text-center">
                      <p className="text-[10px] font-bold text-on-surface mb-2">
                        Berjerawat
                      </p>
                      <div className="h-1 bg-slate-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary"
                          style={{ width: "88%" }}
                        ></div>
                      </div>
                    </div>
                    <div className="bg-white/50 p-3 rounded-xl text-center">
                      <p className="text-[10px] font-bold text-on-surface/40 mb-2">
                        Berminyak
                      </p>
                      <div className="h-1 bg-slate-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary/40"
                          style={{ width: "50%" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-surface-container-low rounded-lg p-6 flex items-center justify-between">
                  <div className="flex flex-col">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface/30 mb-2">
                      Tingkat Hidrasi
                    </p>
                    <p className="text-4xl font-black text-on-background">
                      84<span className="text-primary text-xl ml-1">%</span>
                    </p>
                  </div>
                  <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center text-primary shadow-sm hover:scale-105 transition-transform cursor-pointer">
                    <span className="material-symbols-outlined text-3xl font-black">
                      water_drop
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Sidebar Analysis */}
            <div className="col-span-12 lg:col-span-4 flex flex-col gap-6 md:gap-8">
              {/* Live Biometrics List */}
              <div className="bg-surface-container-lowest rounded-lg p-6 md:p-8 shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-slate-100">
                <div className="flex items-center gap-3 mb-6">
                  <span className="w-2 h-2 rounded-full bg-primary status-pulse"></span>
                  <h3 className="font-extrabold text-xs md:text-sm uppercase tracking-widest">
                    Biometrik Langsung
                  </h3>
                </div>
                <div className="space-y-4">
                  <div className="p-4 bg-surface-container-low rounded-xl">
                    <p className="text-[10px] font-black text-on-surface/30 uppercase tracking-widest mb-1">
                      Keparahan Jerawat
                    </p>
                    <p className="text-lg font-black text-primary">
                      Sedang{" "}
                      <span className="text-[10px] font-medium text-on-surface/40">
                        (Moderate)
                      </span>
                    </p>
                  </div>
                  <div className="p-4 bg-surface-container-low rounded-xl">
                    <p className="text-[10px] font-black text-on-surface/30 uppercase tracking-widest mb-1">
                      Deteksi Bopeng
                    </p>
                    <p className="text-lg font-black text-on-surface">
                      Minimal
                    </p>
                  </div>
                  <div className="p-4 bg-surface-container-low rounded-xl">
                    <div className="flex justify-between items-center mb-2">
                      <p className="text-[10px] font-black text-on-surface/30 uppercase tracking-widest">
                        Kulit Kusam
                      </p>
                      <p className="text-[10px] font-bold text-primary">
                        RISIKO RENDAH
                      </p>
                    </div>
                    <div className="w-full bg-white h-2 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary"
                        style={{ width: "15%" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Concerns List */}
              <div className="bg-surface-container-low rounded-lg p-6 md:p-8">
                <h3 className="font-extrabold text-xs md:text-sm uppercase tracking-widest mb-6">
                  Masalah Terdeteksi
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 bg-white/60 rounded-xl hover:bg-white transition-all cursor-pointer group">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                      <span className="material-symbols-outlined">
                        wb_sunny
                      </span>
                    </div>
                    <div className="flex-grow">
                      <p className="text-xs font-black">Hiperpigmentasi</p>
                      <p className="text-[10px] text-slate-500">
                        Zona A: Fokus sub-dermal
                      </p>
                    </div>
                    <span className="material-symbols-outlined text-slate-300">
                      chevron_right
                    </span>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-white/60 rounded-xl hover:bg-white transition-all cursor-pointer group">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                      <span className="material-symbols-outlined">shield</span>
                    </div>
                    <div className="flex-grow">
                      <p className="text-xs font-black">Penipisan Barrier</p>
                      <p className="text-[10px] text-slate-500">
                        Area periorbital menipis
                      </p>
                    </div>
                    <span className="material-symbols-outlined text-slate-300">
                      chevron_right
                    </span>
                  </div>
                </div>
              </div>

              {/* Final CTA */}
              <button className="w-full signature-gradient text-white py-6 rounded-3xl font-black text-lg tracking-tight shadow-xl hover:-translate-y-1 active:scale-95 transition-all flex items-center justify-center gap-3">
                BUAT LAPORAN
                <span className="material-symbols-outlined font-black">
                  arrow_forward
                </span>
              </button>
              <div className="flex items-center justify-center gap-2 mt-4">
                <span className="w-1.5 h-1.5 rounded-full bg-primary status-pulse"></span>
                <p className="text-[10px] text-on-surface/40 uppercase tracking-[0.2em] font-bold">
                  Neural Engine v4.2 Aktif
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="lg:ml-72 bg-white py-6 px-12 border-t border-slate-100 hidden lg:block">
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
    </div>
  );
}
