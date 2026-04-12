"use client";

import React from "react";
import Link from "next/link";

export default function SettingPage() {
  return (
    <div className="bg-surface text-on-surface flex min-h-screen font-manrope">
      {/* Sidebar Navigation - Synchronized with History & Analysis */}
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
            className="flex items-center gap-4 text-[#6f7b67] py-4 px-8 hover:text-[#1c6d00] hover:bg-[#f3fbf0] border-l-4 border-transparent hover:border-[#1c6d00] transition-all"
            href="/pages/scan"
          >
            <span className="material-symbols-outlined text-xl">biotech</span>
            <span className="uppercase tracking-[0.1em] text-[11px] font-extrabold">
              Analysis
            </span>
          </Link>
          <Link
            className="flex items-center gap-4 text-[#6f7b67] py-4 px-8 hover:text-[#1c6d00] hover:bg-[#f3fbf0] border-l-4 border-transparent hover:border-[#1c6d00] transition-all"
            href="/pages/history"
          >
            <span className="material-symbols-outlined text-xl">history</span>
            <span className="uppercase tracking-[0.1em] text-[11px] font-extrabold">
              History
            </span>
          </Link>
          <Link
            className="flex items-center gap-4 text-[#1c6d00] py-4 px-8 bg-[#f3fbf0] border-l-4 border-[#1c6d00] transition-all"
            href="/pages/setting"
          >
            <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>
              settings
            </span>
            <span className="uppercase tracking-[0.1em] text-[11px] font-extrabold">
              Settings
            </span>
          </Link>
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

      {/* Main Content Area */}
      <main className="flex-1 px-4 sm:px-8 lg:px-16 py-12 max-w-7xl mx-auto pb-32 md:pb-12">
        {/* Header */}
        <header className="mb-12">
          <p className="text-[#1c6d00] font-bold uppercase tracking-[0.2em] text-xs mb-3">Manajemen Akun</p>
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tighter text-on-surface mb-4">Pengaturan</h2>
          <p className="text-on-surface-variant text-base sm:text-lg max-w-2xl leading-relaxed">
            Kelola profil klinis Anda, parameter keamanan, dan preferensi privasi data dalam satu pusat kendali yang terenkripsi.
          </p>
        </header>

        {/* Settings Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Column Left: Profile & Clinical */}
          <div className="lg:col-span-12 xl:col-span-7 flex flex-col gap-8">
            {/* Section 1: Profil Pengguna */}
            <section className="bg-surface-container-lowest rounded-xl p-6 sm:p-10 shadow-[0_40px_60px_-5px_rgba(25,28,29,0.04)]">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
                <div className="flex items-center gap-4">
                  <div className="bg-primary-container p-3 rounded-2xl">
                    <span className="material-symbols-outlined text-primary">person</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold tracking-tight">Profil Pengguna</h3>
                </div>
                <button className="text-primary font-bold text-sm hover:underline">Perbarui Foto</button>
              </div>
              <div className="flex flex-col md:flex-row gap-8 items-center mb-10">
                <div className="relative group cursor-pointer">
                  <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-primary-container">
                    <img
                      alt="Profile Edit"
                      className="w-full h-full object-cover"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuASpIs7U2aIxSyaIMtvONfbkT2-D3eO2hifZYSbtM12iOArzKj_0fZkjawcx4xqygnEeFz45ouT79ASyf1EMzsqCVYFO25pAyDShRSVHIrk4V6cDN31pArjVrP_8A3I0NVNycgFHAtT4MEy3LAteBJxfBM4CkygCF2dHgQn1DftN63JJW7C4bTAmMW1znnb-dCfBmnzm7912q5W4v2pPNz1HHlcM4jRo2kUss9TMLFLiZ2CBrlO3Kx5F9crVR83GeC7W6X9SQxUgQMC"
                    />
                  </div>
                  <div className="absolute inset-0 bg-primary/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-full">
                    <span className="material-symbols-outlined text-white">photo_camera</span>
                  </div>
                </div>
                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-extrabold uppercase tracking-widest text-[#3f4a39]">Nama Lengkap</label>
                    <input
                      className="bg-surface-container-low border-none rounded-full px-6 py-3 text-on-surface focus:ring-2 focus:ring-primary transition-all text-sm sm:text-base"
                      type="text"
                      defaultValue="Dr. Sarah Luminous"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-extrabold uppercase tracking-widest text-[#3f4a39]">Alamat Email</label>
                    <input
                      className="bg-surface-container-low border-none rounded-full px-6 py-3 text-on-surface focus:ring-2 focus:ring-primary transition-all text-sm sm:text-base"
                      type="email"
                      defaultValue="sarah.l@dermascan.id"
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* Section 2: Profil Klinis */}
            <section className="bg-surface-container-lowest rounded-xl p-6 sm:p-10 shadow-[0_40px_60px_-5px_rgba(25,28,29,0.04)]">
              <div className="flex items-center gap-4 mb-8">
                <div className="bg-secondary-container p-3 rounded-2xl">
                  <span className="material-symbols-outlined text-secondary">medical_services</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold tracking-tight">Profil Klinis</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="flex flex-col gap-4">
                  <label className="text-[10px] font-extrabold uppercase tracking-widest text-[#3f4a39]">Tipe Kulit</label>
                  <div className="flex flex-wrap gap-2">
                    <button className="px-5 py-2 rounded-full border-2 border-slate-200 text-xs sm:text-sm font-bold hover:border-primary transition-colors bg-white">Kering</button>
                    <button className="px-5 py-2 rounded-full bg-primary-container text-on-primary-container text-xs sm:text-sm font-bold shadow-sm">Berminyak</button>
                    <button className="px-5 py-2 rounded-full border-2 border-slate-200 text-xs sm:text-sm font-bold hover:border-primary transition-colors bg-white">Kombinasi</button>
                  </div>
                </div>
                <div className="flex flex-col gap-4">
                  <label className="text-[10px] font-extrabold uppercase tracking-widest text-[#3f4a39]">Kekhawatiran Utama</label>
                  <div className="flex flex-wrap gap-2">
                    {["Jerawat", "Penuaan"].map((item) => (
                      <button key={item} className="px-4 py-2 rounded-full bg-surface-container-highest text-xs sm:text-sm font-bold flex items-center gap-2">
                        {item} <span className="material-symbols-outlined text-xs">close</span>
                      </button>
                    ))}
                    <button className="px-4 py-2 rounded-full border-2 border-dashed border-slate-300 text-xs sm:text-sm font-bold text-on-surface-variant hover:border-primary transition-colors">
                      + Tambah Baru
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Column Right: Security & Privacy */}
          <div className="lg:col-span-12 xl:col-span-5 flex flex-col gap-8">
            {/* Section 3: Keamanan */}
            <section className="bg-surface-container-lowest rounded-xl p-6 sm:p-10 shadow-[0_40px_60px_-5px_rgba(25,28,29,0.04)]">
              <div className="flex items-center gap-4 mb-8">
                <div className="bg-primary/10 p-3 rounded-2xl">
                  <span className="material-symbols-outlined text-primary">security</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold tracking-tight">Keamanan</h3>
              </div>
              <div className="flex flex-col gap-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-surface-container-low rounded-2xl gap-4">
                  <div className="flex flex-col">
                    <span className="font-bold text-on-surface text-sm sm:text-base">Ubah Kata Sandi</span>
                    <span className="text-[10px] sm:text-xs text-on-surface-variant">Terakhir diubah 3 bulan lalu</span>
                  </div>
                  <button className="w-full sm:w-auto bg-white px-4 py-2 rounded-full text-xs font-bold border border-slate-200 hover:bg-primary-container transition-colors">Ubah</button>
                </div>
                <div className="flex items-center justify-between p-4 bg-surface-container-low rounded-2xl gap-4">
                  <div className="flex flex-col">
                    <span className="font-bold text-on-surface text-sm sm:text-base">Verifikasi Dua Langkah</span>
                    <span className="text-[10px] sm:text-xs text-on-surface-variant">Proteksi ekstra via SMS/Aplikasi</span>
                  </div>
                  <div className="relative inline-flex items-center cursor-pointer">
                    <input defaultChecked className="sr-only peer" type="checkbox" />
                    <div className="w-11 h-6 bg-slate-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 4: Privasi Data */}
            <section className="bg-surface-container-lowest rounded-xl p-6 sm:p-10 shadow-[0_40px_60px_-5px_rgba(25,28,29,0.04)] border-t-8 border-primary-fixed">
              <div className="flex items-center gap-4 mb-8">
                <div className="bg-secondary-container p-3 rounded-2xl">
                  <span className="material-symbols-outlined text-secondary">admin_panel_settings</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold tracking-tight">Privasi Data</h3>
              </div>
              <p className="text-sm text-on-surface-variant mb-8 leading-relaxed">
                Kontrol bagaimana data klinis dan riwayat pemindaian Anda disimpan dan dibagikan dalam sistem DermaScan.
              </p>
              <ul className="flex flex-col gap-4">
                {[
                  { title: "Bagikan dengan Dermatologis", desc: "Izinkan ahli kulit melihat riwayat scan Anda." },
                  { title: "Anonimitas Riset", desc: "Gunakan data scan terenkripsi untuk pengembangan AI." },
                ].map((item) => (
                  <li key={item.title} className="flex items-start gap-4">
                    <span className="material-symbols-outlined text-primary mt-1" style={{ fontVariationSettings: "'FILL' 1" }}>
                      check_circle
                    </span>
                    <div>
                      <h4 className="font-bold text-sm">{item.title}</h4>
                      <p className="text-[11px] text-on-surface-variant">{item.desc}</p>
                    </div>
                  </li>
                ))}
                <li className="mt-4 pt-4 border-t border-slate-100">
                  <button className="w-full py-3 rounded-full text-xs font-bold text-red-600 hover:bg-red-50 transition-colors">Ekspor Semua Data Klinis (.CSV)</button>
                </li>
              </ul>
            </section>

            {/* Help Card */}
            <div className="signature-gradient rounded-xl p-6 sm:p-8 text-white flex flex-col gap-4 relative overflow-hidden">
              <div className="z-10">
                <h4 className="text-xl font-bold tracking-tight mb-2">Butuh Bantuan?</h4>
                <p className="text-sm opacity-90 leading-relaxed mb-4">Tim dukungan klinis kami siap membantu Anda 24/7 untuk masalah teknis.</p>
                <button className="bg-white/20 backdrop-blur-md px-6 py-2 rounded-full text-xs font-bold hover:bg-white/30 transition-all">Hubungi Support</button>
              </div>
              <span className="material-symbols-outlined absolute -right-4 -bottom-4 text-[120px] opacity-10 rotate-12">medical_information</span>
            </div>
          </div>
        </div>

        {/* Sticky Footer Action */}
        <footer className="mt-16 pt-8 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6 pb-24 md:pb-0">
          <div className="flex items-center gap-3 text-on-surface-variant text-center md:text-left">
            <span className="material-symbols-outlined text-primary">verified_user</span>
            <span className="text-[10px] sm:text-xs font-medium">Enkripsi End-to-End diaktifkan untuk semua data profil.</span>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
            <button className="w-full sm:w-auto px-8 py-3 rounded-full text-sm font-bold text-on-surface-variant hover:bg-surface-container transition-colors">Batalkan Perubahan</button>
            <button className="w-full sm:w-auto signature-gradient px-8 sm:px-12 py-3 rounded-full text-sm font-extrabold text-white shadow-lg shadow-green-200 hover:scale-105 transition-all">Simpan Pengaturan</button>
          </div>
        </footer>

        {/* Mobile Bottom Nav - Synchronized and Responsive */}
        <nav className="lg:hidden fixed bottom-6 left-6 right-6 h-16 bg-[#191c1d]/95 backdrop-blur-xl rounded-full flex items-center justify-between px-8 z-50 shadow-2xl border border-white/10">
          <Link href="/pages/dashboard">
            <span className="material-symbols-outlined text-slate-400 active:scale-90 transition-transform">grid_view</span>
          </Link>
          <Link href="/pages/scan">
            <span className="material-symbols-outlined text-slate-400 active:scale-90 transition-transform">biotech</span>
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
            <span className="material-symbols-outlined text-white active:scale-90 transition-transform">settings</span>
          </Link>
        </nav>
      </main>

      <style jsx>{`
        .signature-gradient {
          background: linear-gradient(135deg, #84F75E 0%, #1C6D00 100%);
        }
      `}</style>
    </div>
  );
}
