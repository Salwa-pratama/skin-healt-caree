"use client";

import React, { useState } from "react";
import Link from "next/link";
import Sidebar from "@/app/components/Sidebar";
import DashboardHeader from "@/app/components/DashboardHeader";
import MobileNav from "@/app/components/MobileNav";
import { useProfile } from "@/features/auth/api/profile.api";

export default function SettingPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { data, isLoading, error } = useProfile();
  console.log("Profile Data:", data);
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[var(--dashboard-bg)] transition-colors duration-300">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <p className="text-sm font-bold text-primary animate-pulse">Memuat Profil...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[var(--dashboard-bg)] transition-colors duration-300">
        <div className="flex flex-col items-center gap-4">
          <p className="text-sm font-bold text-primary">Error memuat profil</p>
          <p className="text-xs text-primary">{error?.message}</p>
        </div>
      </div>
    );
  }


  return (
    <div className="bg-[var(--dashboard-bg)] text-[var(--dashboard-text)] antialiased overflow-x-hidden min-h-screen font-manrope transition-colors duration-300">
      {/* TopNavBar - Synchronized with Dashboard */}
      <DashboardHeader
        isSidebarOpen={isSidebarOpen}
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      <Sidebar activePage="setting" isOpen={isSidebarOpen} />

      {/* Main Content Area */}
      {/* Main Content Area - Fixed Sidebar Overlap */}
      <main className={`transition-all duration-500 pt-20 px-4 sm:px-8 lg:px-12 pb-32 md:pb-12 min-h-screen dashboard-animate-in ${isSidebarOpen ? "lg:ml-64" : "lg:ml-0"}`}>
        <div className="max-w-7xl mx-auto">

          {/* Header */}
          {/* Header Section */}
          <header className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="max-w-xl">
              <p className="text-primary font-bold uppercase tracking-[0.2em] text-[10px] mb-1">Manajemen Akun</p>
              <h2 className="text-3xl font-black tracking-tighter text-[var(--dashboard-text)] mb-2">Pengaturan</h2>
              <p className="text-[var(--dashboard-text-secondary)] text-sm leading-relaxed">
                Kelola profil klinis, keamanan, dan preferensi privasi data dalam satu pusat kendali terenkripsi.
              </p>
            </div>
            <div className="flex items-center gap-2 bg-[var(--dashboard-card-bg)] px-4 py-2 rounded-xl border border-[var(--dashboard-border)] shadow-sm w-fit">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">System Cloud Sync: Active</span>
            </div>
          </header>


          {/* Settings Bento Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Column Left: Profile & Clinical */}
            <div className="lg:col-span-12 xl:col-span-7 flex flex-col gap-8">
              {/* Section 1: Profil Pengguna */}
              <section className="bg-[var(--dashboard-card-bg)] rounded-2xl p-6 shadow-[0_8px_30px_rgba(0,0,0,0.02)] border border-[var(--dashboard-border)] card-hover">
                <div className="flex items-center justify-between mb-6 gap-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 p-2 rounded-xl">
                      <span className="material-symbols-outlined text-primary text-xl">person</span>
                    </div>
                    <h3 className="text-lg font-black tracking-tight text-[var(--dashboard-text)]">Profil Pengguna</h3>
                  </div>
                  <button className="text-primary font-black text-[9px] uppercase tracking-widest hover:bg-primary hover:text-on-primary px-3 py-1.5 bg-primary/10 rounded-lg transition-all border border-primary/20">Perbarui Foto</button>
                </div>
                <div className="flex flex-col sm:flex-row gap-6 items-center">
                  <div className="relative group cursor-pointer">
                    <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-primary shadow-sm transition-transform group-hover:scale-105">
                      {data?.avatar ? (
                        <img
                          alt="Profile Edit"
                          className="w-full h-full object-cover"
                          src={data.avatar}
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
                    <div className="absolute inset-0 bg-primary/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-full backdrop-blur-[1px]">
                      <span className="material-symbols-outlined text-white text-lg">photo_camera</span>
                    </div>
                  </div>
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[9px] font-black uppercase tracking-widest text-[var(--dashboard-text-secondary)]">Nama Lengkap</label>
                      <input
                        className="bg-[var(--dashboard-bg)] border-none rounded-xl px-4 py-3 text-[var(--dashboard-text)] font-semibold focus:ring-2 focus:ring-primary transition-all text-xs outline-none"
                        type="text"
                        value={data?.name}
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[9px] font-black uppercase tracking-widest text-on-surface-variant">Alamat Email</label>
                      <input
                        className="bg-[var(--dashboard-bg)] border-none rounded-xl px-4 py-3 text-[var(--dashboard-text)] font-semibold focus:ring-2 focus:ring-primary transition-all text-xs outline-none"
                        type="email"
                        value={data?.email}
                      />
                    </div>
                  </div>
                </div>
              </section>


              {/* Section 2: Profil Klinis */}
              <section className="bg-[var(--dashboard-card-bg)] rounded-2xl p-6 shadow-[0_8px_30px_rgba(0,0,0,0.02)] border border-[var(--dashboard-border)] card-hover">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-primary/10 p-2 rounded-xl">
                    <span className="material-symbols-outlined text-primary text-xl">medical_services</span>
                  </div>
                  <h3 className="text-lg font-black tracking-tight text-[var(--dashboard-text)]">Profil Klinis</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-3">
                    <label className="text-[9px] font-black uppercase tracking-widest text-[var(--dashboard-text-secondary)]">Tipe Kulit</label>
                    <div className="flex flex-wrap gap-1.5">
                      {["Kering", "Berminyak", "Kombinasi"].map((type) => (
                        <button
                          key={type}
                          className={`px-4 py-2 rounded-lg text-[10px] font-bold transition-all ${type === "Berminyak" ? "bg-primary text-on-primary shadow-sm" : "border border-[var(--dashboard-border)] hover:border-primary bg-[var(--dashboard-card-bg)] text-[var(--dashboard-text)]"}`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col gap-3">
                    <label className="text-[9px] font-black uppercase tracking-widest text-[var(--dashboard-text-secondary)]">Kekhawatiran Utama</label>
                    <div className="flex flex-wrap gap-1.5">
                      {["Jerawat", "Penuaan"].map((item) => (
                        <button key={item} className="px-3 py-1.5 rounded-lg bg-[var(--dashboard-bg)] text-[var(--dashboard-text)] text-[10px] font-bold flex items-center gap-2 hover:bg-[var(--dashboard-border)] transition-colors">
                          {item} <span className="material-symbols-outlined text-[12px]">close</span>
                        </button>
                      ))}
                      <button className="px-3 py-1.5 rounded-lg border border-dashed border-[var(--dashboard-border)] text-[10px] font-bold text-[var(--dashboard-text-secondary)] hover:border-primary hover:text-primary transition-all">
                        + Tambah
                      </button>
                    </div>
                  </div>
                </div>
              </section>

              {/* Help Card - Moved here for better space utilization */}
              <div className="signature-gradient rounded-xl p-6 text-white flex flex-col gap-3 relative overflow-hidden card-hover">
                <div className="z-10">
                  <h4 className="text-lg font-bold tracking-tight mb-1">Butuh Bantuan?</h4>
                  <p className="text-xs opacity-90 leading-relaxed mb-3">Tim dukungan klinis kami siap membantu Anda 24/7 untuk masalah teknis.</p>
                  <button className="bg-white/20 backdrop-blur-md px-5 py-1.5 rounded-full text-[10px] font-bold hover:bg-white/30 transition-all border border-white/10">Hubungi Support</button>
                </div>
                <span className="material-symbols-outlined absolute -right-3 -bottom-3 text-[100px] opacity-10 rotate-12">medical_information</span>
              </div>
            </div>

            {/* Column Right: Security & Privacy */}
            <div className="lg:col-span-12 xl:col-span-5 flex flex-col gap-8">
              {/* Section 3: Keamanan */}
              <section className="bg-[var(--dashboard-card-bg)] rounded-2xl p-6 shadow-[0_8px_30px_rgba(0,0,0,0.02)] border border-[var(--dashboard-border)] card-hover">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-primary/10 p-2 rounded-xl">
                    <span className="material-symbols-outlined text-primary text-xl">security</span>
                  </div>
                  <h3 className="text-lg font-black tracking-tight text-[var(--dashboard-text)]">Keamanan</h3>
                </div>
                <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between p-4 bg-[var(--dashboard-bg)] rounded-xl gap-4 hover:bg-[var(--dashboard-border)] transition-colors">
                    <div className="flex flex-col">
                        <span className="font-bold text-[var(--dashboard-text)] text-xs">Ubah Kata Sandi</span>
                        <span className="text-[9px] text-on-surface-variant font-bold uppercase tracking-wider mt-0.5">3 bulan lalu</span>
                      </div>
                      <button className="bg-[var(--dashboard-card-bg)] px-4 py-1.5 rounded-lg text-[9px] font-black text-primary border border-primary/20 hover:bg-primary hover:text-on-primary transition-all uppercase tracking-widest">Ubah</button>
                  </div>
                    <div className="flex items-center justify-between p-4 bg-[var(--dashboard-bg)] rounded-xl gap-4 hover:bg-[var(--dashboard-border)] transition-colors">
                    <div className="flex flex-col">
                        <span className="font-bold text-[var(--dashboard-text)] text-xs">Verifikasi 2 Langkah</span>
                        <span className="text-[9px] text-on-surface-variant font-bold uppercase tracking-wider mt-0.5">Proteksi SMS/App</span>
                    </div>
                    <div className="relative inline-flex items-center cursor-pointer scale-90">
                      <input defaultChecked className="sr-only peer" type="checkbox" />
                      <div className="w-10 h-5 bg-slate-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
                    </div>
                  </div>
                </div>
              </section>


              {/* Section 4: Privasi Data */}
              <section className="bg-[var(--dashboard-card-bg)] rounded-2xl p-6 shadow-[0_8px_30px_rgba(0,0,0,0.02)] border border-[var(--dashboard-border)] card-hover">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-primary/10 p-2 rounded-xl">
                    <span className="material-symbols-outlined text-primary text-xl">admin_panel_settings</span>
                  </div>
                  <h3 className="text-lg font-black tracking-tight text-[var(--dashboard-text)]">Privasi Data</h3>
                </div>
                <p className="text-xs text-[var(--dashboard-text-secondary)] mb-6 leading-relaxed font-medium">
                  Kontrol data klinis dan riwayat pemindaian Anda dalam sistem DermaScan.
                </p>
                <ul className="flex flex-col gap-4">
                  {[
                    { title: "Bagikan dengan Dermatologis", desc: "Izinkan ahli kulit melihat riwayat scan." },
                    { title: "Anonimitas Riset", desc: "Gunakan data untuk pengembangan AI." },
                  ].map((item) => (
                    <li key={item.title} className="flex items-start gap-3 group">
                      <span className="material-symbols-outlined text-primary mt-0.5 text-lg transition-transform group-hover:scale-110" style={{ fontVariationSettings: "'FILL' 1" }}>
                        check_circle
                      </span>
                      <div>
                        <h4 className="font-bold text-xs text-[var(--dashboard-text)]">{item.title}</h4>
                        <p className="text-[10px] text-[var(--dashboard-text-secondary)]/80 font-bold tracking-tight">{item.desc}</p>
                      </div>
                    </li>
                  ))}
                  <li className="mt-2 pt-4 border-t border-[var(--dashboard-border)]">
                    <button className="w-full py-3 rounded-xl text-[10px] font-black uppercase tracking-widest text-red-500 bg-red-500/10 hover:bg-red-500/20 transition-all">Ekspor Data (.CSV)</button>
                  </li>
                </ul>
              </section>
            </div>
          </div>

          {/* Sticky Footer Action */}
          <footer className="mt-12 pt-8 border-t border-[var(--dashboard-border)] flex flex-col md:flex-row items-center justify-between gap-6 pb-32 lg:pb-12">
            <div className="flex items-center gap-3 text-[var(--dashboard-text-secondary)] bg-[var(--dashboard-bg)] px-4 py-2 rounded-xl group hover:bg-[var(--dashboard-border)] transition-colors">
              <span className="material-symbols-outlined text-primary text-lg transition-transform group-hover:rotate-12">verified_user</span>
              <span className="text-[9px] font-bold uppercase tracking-widest leading-none">Enkripsi End-to-End diaktifkan</span>
            </div>
            <div className="flex items-center gap-3 w-full md:w-auto">
              <button className="flex-1 md:flex-none px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest text-[var(--dashboard-text-secondary)] hover:bg-[var(--dashboard-border)] transition-all active:scale-95">Batal</button>
              <button className="flex-1 md:flex-none signature-gradient px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest text-white shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all">Simpan Pengaturan</button>
            </div>
          </footer>
        </div>


      </main>

      <style jsx>{`
        .signature-gradient {
          background: linear-gradient(135deg, #84F75E 0%, #1c6d00 100%);
        }
        .dashboard-animate-in {
          animation: slide-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .card-hover {
          transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.4s ease;
        }
        .card-hover:hover {
          transform: translateY(-8px);
          box-shadow: 0 30px 60px rgba(0, 0, 0, 0.08);
        }
        @keyframes slide-up {
          from { 
            transform: translateY(30px); 
            opacity: 0; 
          }
          to { 
            transform: translateY(0); 
            opacity: 1; 
          }
        }
      `}</style>

      <MobileNav activePage="setting" />
    </div>
  );
}
