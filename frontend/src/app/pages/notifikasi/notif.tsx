"use client";

import React from "react";
import Link from "next/link";

export default function NotifPage() {
  return (
    <div className="bg-surface-container-lowest text-on-surface min-h-screen relative overflow-hidden font-manrope">
      {/* Mock Main Dashboard Content (Dimmed to focus on overlay) */}
      <div className="fixed inset-0 opacity-20 pointer-events-none select-none overflow-hidden">
        <header className="p-12 flex justify-between">
          <h1 className="text-4xl font-black">LUMINOUS LAB</h1>
          <div className="flex gap-4">
            <div className="w-12 h-12 rounded-full bg-zinc-200"></div>
            <div className="w-12 h-12 rounded-full bg-zinc-200"></div>
          </div>
        </header>
        <main className="px-12 pt-20 grid grid-cols-3 gap-8">
          <div className="h-64 rounded-xl bg-zinc-100"></div>
          <div className="h-64 rounded-xl bg-zinc-100"></div>
          <div className="h-64 rounded-xl bg-zinc-100"></div>
          <div className="col-span-3 h-96 rounded-xl bg-zinc-100"></div>
        </main>
      </div>

      {/* Overlay Background Blur/Dim */}
      <div className="fixed inset-0 bg-white/20 backdrop-blur-sm z-40"></div>

      {/* Care Reminders Popover (Floating Clinical Instrument Panel) */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-2xl px-4 sm:px-0">
        <div className="glass-panel clinical-shadow rounded-[2.5rem] overflow-hidden border border-white/40 flex flex-col max-h-[90vh]">
          {/* Header Section */}
          <div className="p-8 pb-4 flex justify-between items-start border-b border-black/5">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full neon-accent status-pulse"></span>
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">System Perawatan Aktif</span>
              </div>
              <h2 className="text-3xl font-black tracking-tight text-on-surface">Protokol Pemulihan</h2>
              <p className="text-sm text-on-surface-variant/80 mt-1">4 Tugas krusial menunggu konfirmasi klinis.</p>
            </div>
            <Link href="/pages/dashboard">
              <button className="w-10 h-10 rounded-full bg-white/50 flex items-center justify-center hover:bg-white transition-colors">
                <span className="material-symbols-outlined text-zinc-400">close</span>
              </button>
            </Link>
          </div>

          {/* Scrollable Tasks Container */}
          <div className="p-6 overflow-y-auto space-y-4">
            {/* Task 1: Cuci Muka */}
            <div className="bg-white/40 hover:bg-white/60 transition-all p-5 rounded-[2rem] flex items-center gap-6 group cursor-pointer border border-transparent hover:border-primary/10">
              <div className="w-16 h-16 rounded-full neon-accent flex items-center justify-center text-on-primary-container shrink-0">
                <span className="material-symbols-outlined text-2xl fill-icon">face</span>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-[9px] font-extrabold px-2 py-0.5 bg-primary/10 text-primary rounded-full uppercase tracking-widest">Krusial</span>
                  <span className="text-[11px] font-bold text-zinc-400">Jadwal: 20:00</span>
                </div>
                <h3 className="font-extrabold text-lg leading-tight">Cuci Muka & Double Cleanse</h3>
                <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">Hapus residu polusi & sebum teroksidasi untuk mencegah mikro-komedo.</p>
              </div>
              <button className="px-6 py-3 rounded-full bg-white text-xs font-black uppercase tracking-widest text-zinc-800 shadow-sm hover:bg-primary hover:text-white transition-all">Selesai</button>
            </div>

            {/* Task 2: Skincare steps */}
            <div className="bg-white/40 hover:bg-white/60 transition-all p-5 rounded-[2rem] flex items-center gap-6 group cursor-pointer border border-transparent hover:border-primary/10">
              <div className="w-16 h-16 rounded-2xl bg-primary-container/30 flex items-center justify-center text-primary shrink-0">
                <span className="material-symbols-outlined text-2xl fill-icon">science</span>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-[9px] font-extrabold px-2 py-0.5 bg-zinc-200 text-zinc-600 rounded-full uppercase tracking-widest">Rutin</span>
                  <span className="text-[11px] font-bold text-zinc-400">4 Langkah Tersisa</span>
                </div>
                <h3 className="font-extrabold text-lg leading-tight">Aplikasi Serum & Moisturizer</h3>
                <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">Gunakan Retinol (Malam) sesuai instruksi dermatologis untuk regenerasi.</p>
              </div>
              <button className="px-6 py-3 rounded-full bg-white text-xs font-black uppercase tracking-widest text-zinc-800 shadow-sm hover:bg-primary hover:text-white transition-all">Detail</button>
            </div>

            {/* Task 3: Drink Water */}
            <div className="bg-white/40 hover:bg-white/60 transition-all p-5 rounded-[2rem] flex items-center gap-6 group cursor-pointer border border-transparent hover:border-primary/10">
              <div className="w-16 h-16 rounded-full border-2 border-primary/20 flex items-center justify-center text-primary shrink-0">
                <span className="material-symbols-outlined text-2xl fill-icon">local_drink</span>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-[9px] font-extrabold px-2 py-0.5 bg-orange-100 text-orange-600 rounded-full uppercase tracking-widest">Mendesak</span>
                  <span className="text-[11px] font-bold text-zinc-400">Terakhir: 3 Jam Lalu</span>
                </div>
                <h3 className="font-extrabold text-lg leading-tight">Asupan Cairan Berkala</h3>
                <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">Target harian 2.5L. Kurang 700ml untuk mencapai keseimbangan hidrasi.</p>
              </div>
              <button className="px-6 py-3 rounded-full neon-accent text-xs font-black uppercase tracking-widest text-on-primary-container shadow-sm hover:scale-105 transition-all">+250ml</button>
            </div>

            {/* Task 4: Pillow case */}
            <div className="bg-white/40 hover:bg-white/60 transition-all p-5 rounded-[2rem] flex items-center gap-6 group cursor-pointer border border-transparent hover:border-primary/10">
              <div className="w-16 h-16 rounded-2xl bg-zinc-100 flex items-center justify-center text-zinc-400 shrink-0">
                <span className="material-symbols-outlined text-2xl fill-icon">bed</span>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-[9px] font-extrabold px-2 py-0.5 bg-zinc-200 text-zinc-600 rounded-full uppercase tracking-widest">Higiene</span>
                  <span className="text-[11px] font-bold text-zinc-400">Jadwal Mingguan</span>
                </div>
                <h3 className="font-extrabold text-lg leading-tight">Ganti Sarung Bantal</h3>
                <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">Eliminasi akumulasi bakteri P. acnes dari permukaan tekstil.</p>
              </div>
              <button className="px-6 py-3 rounded-full bg-white text-xs font-black uppercase tracking-widest text-zinc-800 shadow-sm hover:bg-primary hover:text-white transition-all">Konfirmasi</button>
            </div>
          </div>

          {/* Footer Stats Section */}
          <div className="p-8 bg-primary/5 grid grid-cols-2 gap-4">
            <div className="bg-white/50 p-4 rounded-2xl flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-xl">water_drop</span>
              </div>
              <div>
                <p className="text-[10px] font-black uppercase text-zinc-400 tracking-widest">Hidrasi</p>
                <p className="font-black text-lg">1.8 / 2.5L</p>
              </div>
            </div>
            <div className="bg-white/50 p-4 rounded-2xl flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-xl">verified</span>
              </div>
              <div>
                <p className="text-[10px] font-black uppercase text-zinc-400 tracking-widest">Compliance</p>
                <p className="font-black text-lg">82%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Floating Navigation Indicator (Menu Context) */}
        <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 flex gap-4">
          <Link href="/pages/dashboard">
            <button className="w-12 h-12 rounded-full glass-panel flex items-center justify-center text-zinc-400 hover:text-primary transition-colors">
              <span className="material-symbols-outlined">dashboard</span>
            </button>
          </Link>
          <button className="w-12 h-12 rounded-full neon-accent flex items-center justify-center text-on-primary-container shadow-lg">
            <span className="material-symbols-outlined fill-icon">notifications_active</span>
          </button>
          <Link href="/pages/history">
            <button className="w-12 h-12 rounded-full glass-panel flex items-center justify-center text-zinc-400 hover:text-primary transition-colors">
              <span className="material-symbols-outlined">history</span>
            </button>
          </Link>
        </div>
      </div>

      <style jsx>{`
        .glass-panel {
          background: rgba(255, 255, 255, 0.6);
          backdrop-filter: blur(40px);
          -webkit-backdrop-filter: blur(40px);
        }
        .clinical-shadow {
          box-shadow: 0 30px 60px -12px rgba(0, 0, 0, 0.08), 0 18px 36px -18px rgba(0, 0, 0, 0.05);
        }
        .neon-accent {
          background-color: #84F75E;
          box-shadow: 0 0 15px rgba(132, 247, 94, 0.4);
        }
        .status-pulse {
          animation: pulse 2s infinite;
        }
        @keyframes pulse {
          0% { box-shadow: 0 0 0 0 rgba(132, 247, 94, 0.4); }
          70% { box-shadow: 0 0 0 10px rgba(132, 247, 94, 0); }
          100% { box-shadow: 0 0 0 0 rgba(132, 247, 94, 0); }
        }
        .material-symbols-outlined {
          font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
        .fill-icon {
          font-variation-settings: 'FILL' 1;
        }
      `}</style>
    </div>
  );
}
