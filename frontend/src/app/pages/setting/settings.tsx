"use client";

import React from "react";
import Link from "next/link";

export default function SettingPage() {
  return (
    <div className="bg-[#f8f9fa] text-[#191c1d] antialiased overflow-x-hidden min-h-screen font-manrope">
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
              placeholder="Search settings..."
              type="text"
            />
            <span className="material-symbols-outlined absolute right-4 top-2 text-slate-400">
              search
            </span>
          </div>
          <Link href="/pages/notifikasi">
            <button className="text-[#6f7b67] hover:text-[#1c6d00] transition-colors duration-200">
              <span className="material-symbols-outlined">notifications</span>
            </button>
          </Link>
          <Link href="/pages/profil">
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full overflow-hidden border-2 border-[#84f75e] cursor-pointer hover:opacity-80 transition-opacity">
              <img
                alt="User Profile"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuASpIs7U2aIxSyaIMtvONfbkT2-D3eO2hifZYSbtM12iOArzKj_0fZkjawcx4xqygnEeFz45ouT79ASyf1EMzsqCVYFO25pAyDShRSVHIrk4V6cDN31pArjVrP_8A3I0NVNycgFHAtT4MEy3LAteBJxfBM4CkygCF2dHgQn1DftN63JJW7C4bTAmMW1znnb-dCfBmnzm7912q5W4v2pPNz1HHlcM4jRo2kUss9TMLFLiZ2CBrlO3Kx5F9crVR83GeC7W6X9SQxUgQMC"
              />
            </div>
          </Link>
        </div>
      </header>

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
      {/* Main Content Area - Fixed Sidebar Overlap */}
      <main className="lg:ml-72 pt-28 px-4 sm:px-8 lg:px-12 pb-32 md:pb-12 min-h-screen dashboard-animate-in">
        <div className="max-w-7xl mx-auto">

        {/* Header */}
        {/* Header Section */}
        <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="text-[#1c6d00] font-bold uppercase tracking-[0.2em] text-xs mb-3">Manajemen Akun</p>
            <h2 className="text-4xl sm:text-5xl font-black tracking-tighter text-[#191c1d] mb-4">Pengaturan</h2>
            <p className="text-slate-500 text-base sm:text-lg leading-relaxed">
              Kelola profil klinis Anda, parameter keamanan, dan preferensi privasi data dalam satu pusat kendali yang terenkripsi.
            </p>
          </div>
          <div className="flex items-center gap-2 bg-white px-5 py-3 rounded-2xl border border-[#eff1f2] shadow-sm">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">System Cloud Sync: Active</span>
          </div>
        </header>


        {/* Settings Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Column Left: Profile & Clinical */}
          <div className="lg:col-span-12 xl:col-span-7 flex flex-col gap-8">
            {/* Section 1: Profil Pengguna */}
            <section className="bg-white rounded-3xl p-6 sm:p-10 shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-[#eff1f2] card-hover">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
                <div className="flex items-center gap-4">
                  <div className="bg-[#f3fbf0] p-3 rounded-2xl">
                    <span className="material-symbols-outlined text-[#1c6d00]">person</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black tracking-tight text-[#191c1d]">Profil Pengguna</h3>
                </div>
                <button className="text-[#1c6d00] font-black text-[10px] uppercase tracking-widest hover:underline px-4 py-2 bg-[#f3fbf0] rounded-full transition-all">Perbarui Foto</button>
              </div>
              <div className="flex flex-col md:flex-row gap-8 items-center mb-6">
                <div className="relative group cursor-pointer">
                  <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-[#84f75e] shadow-md transition-transform group-hover:scale-105">
                    <img
                      alt="Profile Edit"
                      className="w-full h-full object-cover"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuASpIs7U2aIxSyaIMtvONfbkT2-D3eO2hifZYSbtM12iOArzKj_0fZkjawcx4xqygnEeFz45ouT79ASyf1EMzsqCVYFO25pAyDShRSVHIrk4V6cDN31pArjVrP_8A3I0NVNycgFHAtT4MEy3LAteBJxfBM4CkygCF2dHgQn1DftN63JJW7C4bTAmMW1znnb-dCfBmnzm7912q5W4v2pPNz1HHlcM4jRo2kUss9TMLFLiZ2CBrlO3Kx5F9crVR83GeC7W6X9SQxUgQMC"
                    />
                  </div>
                  <div className="absolute inset-0 bg-[#1c6d00]/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-full backdrop-blur-[2px]">
                    <span className="material-symbols-outlined text-white">photo_camera</span>
                  </div>
                </div>
                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Nama Lengkap</label>
                    <input
                      className="bg-[#f3f4f5] border-none rounded-2xl px-6 py-4 text-[#191c1d] font-semibold focus:ring-2 focus:ring-[#84f75e] transition-all text-sm sm:text-base outline-none"
                      type="text"
                      defaultValue="Dr. Sarah Luminous"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Alamat Email</label>
                    <input
                      className="bg-[#f3f4f5] border-none rounded-2xl px-6 py-4 text-[#191c1d] font-semibold focus:ring-2 focus:ring-[#84f75e] transition-all text-sm sm:text-base outline-none"
                      type="email"
                      defaultValue="sarah.l@dermascan.id"
                    />
                  </div>
                </div>
              </div>
            </section>


            {/* Section 2: Profil Klinis */}
            <section className="bg-white rounded-3xl p-6 sm:p-10 shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-[#eff1f2] card-hover">
              <div className="flex items-center gap-4 mb-8">
                <div className="bg-[#f3fbf0] p-3 rounded-2xl">
                  <span className="material-symbols-outlined text-[#1c6d00]">medical_services</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black tracking-tight text-[#191c1d]">Profil Klinis</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="flex flex-col gap-4">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Tipe Kulit</label>
                  <div className="flex flex-wrap gap-2">
                    <button className="px-6 py-3 rounded-xl border-2 border-slate-100 text-xs sm:text-sm font-bold hover:border-[#1c6d00] hover:bg-[#f3fbf0] transition-all bg-white text-[#3f4a39]">Kering</button>
                    <button className="px-6 py-3 rounded-xl bg-[#84f75e] text-[#135200] text-xs sm:text-sm font-black shadow-sm scale-110 z-10">Berminyak</button>
                    <button className="px-6 py-3 rounded-xl border-2 border-slate-100 text-xs sm:text-sm font-bold hover:border-[#1c6d00] hover:bg-[#f3fbf0] transition-all bg-white text-[#3f4a39]">Kombinasi</button>
                  </div>
                </div>
                <div className="flex flex-col gap-4">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Kekhawatiran Utama</label>
                  <div className="flex flex-wrap gap-2">
                    {["Jerawat", "Penuaan"].map((item) => (
                      <button key={item} className="px-5 py-3 rounded-xl bg-slate-100 text-[#191c1d] text-xs sm:text-sm font-bold flex items-center gap-3 hover:bg-slate-200 transition-colors">
                        {item} <span className="material-symbols-outlined text-[14px]">close</span>
                      </button>
                    ))}
                    <button className="px-5 py-3 rounded-xl border-2 border-dashed border-slate-200 text-xs sm:text-sm font-bold text-slate-400 hover:border-[#1c6d00] hover:text-[#1c6d00] transition-all">
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
            <section className="bg-white rounded-3xl p-6 sm:p-10 shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-[#eff1f2] card-hover">
              <div className="flex items-center gap-4 mb-8">
                <div className="bg-[#f3fbf0] p-3 rounded-2xl">
                  <span className="material-symbols-outlined text-[#1c6d00]">security</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black tracking-tight text-[#191c1d]">Keamanan</h3>
              </div>
              <div className="flex flex-col gap-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-5 bg-[#f3f4f5] rounded-2xl gap-4 hover:bg-[#edeeef] transition-colors">
                  <div className="flex flex-col">
                    <span className="font-bold text-[#191c1d] text-sm sm:text-base">Ubah Kata Sandi</span>
                    <span className="text-[10px] sm:text-xs text-slate-400 font-bold uppercase tracking-wider mt-1">Terakhir diubah 3 bulan lalu</span>
                  </div>
                  <button className="w-full sm:w-auto bg-white px-6 py-2 rounded-xl text-xs font-black text-[#1c6d00] border-2 border-slate-100 hover:border-[#1c6d00] transition-all uppercase tracking-widest">Ubah</button>
                </div>
                <div className="flex items-center justify-between p-5 bg-[#f3f4f5] rounded-2xl gap-4 hover:bg-[#edeeef] transition-colors">
                  <div className="flex flex-col">
                    <span className="font-bold text-[#191c1d] text-sm sm:text-base">Verifikasi Dua Langkah</span>
                    <span className="text-[10px] sm:text-xs text-slate-400 font-bold uppercase tracking-wider mt-1">Proteksi via SMS/Aplikasi</span>
                  </div>
                  <div className="relative inline-flex items-center cursor-pointer">
                    <input defaultChecked className="sr-only peer" type="checkbox" />
                    <div className="w-12 h-6 bg-slate-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#1c6d00]"></div>
                  </div>
                </div>
              </div>
            </section>


            {/* Section 4: Privasi Data */}
            <section className="bg-white rounded-3xl p-6 sm:p-10 shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-[#eff1f2] border-t-8 border-[#84f75e] card-hover">
              <div className="flex items-center gap-4 mb-8">
                <div className="bg-[#f3fbf0] p-3 rounded-2xl">
                  <span className="material-symbols-outlined text-[#1c6d00]">admin_panel_settings</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black tracking-tight text-[#191c1d]">Privasi Data</h3>
              </div>
              <p className="text-sm text-slate-500 mb-8 leading-relaxed font-medium">
                Kontrol bagaimana data klinis dan riwayat pemindaian Anda disimpan dan dibagikan dalam sistem DermaScan.
              </p>
              <ul className="flex flex-col gap-6">
                {[
                  { title: "Bagikan dengan Dermatologis", desc: "Izinkan ahli kulit melihat riwayat scan Anda." },
                  { title: "Anonimitas Riset", desc: "Gunakan data scan terenkripsi untuk pengembangan AI." },
                ].map((item) => (
                  <li key={item.title} className="flex items-start gap-4 group">
                    <span className="material-symbols-outlined text-[#1c6d00] mt-1 transition-transform group-hover:scale-125" style={{ fontVariationSettings: "'FILL' 1" }}>
                      check_circle
                    </span>
                    <div>
                      <h4 className="font-bold text-sm text-[#191c1d]">{item.title}</h4>
                      <p className="text-[11px] text-slate-400 font-bold tracking-tight mt-1">{item.desc}</p>
                    </div>
                  </li>
                ))}
                <li className="mt-4 pt-6 border-t border-slate-50">
                  <button className="w-full py-4 rounded-2xl text-xs font-black uppercase tracking-widest text-red-500 bg-red-50 hover:bg-red-100 transition-all">Ekspor Semua Data Klinis (.CSV)</button>
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
        <footer className="mt-20 pt-10 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-8 pb-32 lg:pb-12">
          <div className="flex items-center gap-4 text-slate-400 bg-slate-50 px-6 py-3 rounded-2xl group hover:bg-slate-100 transition-colors">
            <span className="material-symbols-outlined text-[#1c6d00] transition-transform group-hover:rotate-12">verified_user</span>
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest leading-none">Enkripsi End-to-End diaktifkan</span>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
            <button className="w-full sm:w-auto px-10 py-4 rounded-2xl text-xs font-black uppercase tracking-widest text-slate-400 hover:bg-slate-100 transition-all active:scale-95">Batalkan Perubahan</button>
            <button className="w-full sm:w-auto signature-gradient px-12 py-4 rounded-2xl text-xs font-black uppercase tracking-widest text-white shadow-[0_10px_30px_rgba(28,109,0,0.2)] hover:shadow-[0_15px_40px_rgba(28,109,0,0.3)] hover:scale-105 active:scale-95 transition-all">Simpan Pengaturan</button>
          </div>
        </footer>
      </div>


      </main>

      {/* Mobile Bottom Nav - Synchronized with History */}
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

    </div>
  );
}
