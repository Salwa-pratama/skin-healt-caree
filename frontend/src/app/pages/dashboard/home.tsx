"use client";

import React from "react";
import Link from "next/link";
import "./dashboard.css";

export default function HomeDashboard() {
  return (
    <div className="bg-[#f8f9fa] text-[#191c1d] antialiased overflow-x-hidden min-h-screen font-manrope">
      {/* TopNavBar - Synchronized & Responsive */}
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

      {/* Sidebar Navigation - Light Theme as per Image 2 */}
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
            className="flex items-center gap-4 text-[#1c6d00] py-4 px-8 bg-[#f3fbf0] border-l-4 border-[#1c6d00] transition-all"
            href="/pages/dashboard"
          >
            <span className="material-symbols-outlined text-xl">dashboard</span>
            <span className="uppercase tracking-[0.1em] text-[11px] font-extrabold">
              Dashboard
            </span>
          </Link>
          {[
            { icon: "biotech", label: "Analysis", href: "/pages/scan" },
            { icon: "history", label: "History", href: "#" },
            { icon: "settings", label: "Settings", href: "#" },
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

      {/* Main Content Area - Responsive Bento Grid */}
      <main className="lg:ml-72 pt-28 px-4 sm:px-6 md:px-10 pb-32 lg:pb-12 min-h-screen dashboard-animate-in">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-12 gap-6 lg:gap-8">
            {/* Left Column: Health Index & Modules */}
            <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
              {/* Health Index Card */}
              <div className="bg-white rounded-[2rem] p-6 sm:p-8 shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-[#eff1f2]">
                <span className="uppercase tracking-widest text-[10px] font-extrabold text-slate-400">
                  Health Index
                </span>
                <div className="flex items-baseline gap-1 mt-2">
                  <span className="text-5xl sm:text-7xl font-extrabold text-[#191c1d] tracking-tight">
                    94
                  </span>
                  <span className="text-xl font-bold text-slate-400">/100</span>
                </div>
                <div className="mt-6">
                  <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#84f75e] text-[#135200] rounded-full text-[10px] font-black uppercase tracking-wider">
                    <span className="material-symbols-outlined text-sm">trending_up</span>
                    Luminous Score
                  </span>
                </div>
                <p className="mt-6 text-[#3f4a39] text-sm leading-relaxed font-medium">
                  Your skin barrier is operating at peak efficiency. Cellular
                  regeneration is up 12% from last scan.
                </p>
              </div>

              {/* Stacked Metric Cards */}
              <div className="space-y-4">
                {[
                  { icon: "water_drop", label: "Hydration", val: "82%", color: "bg-blue-400" },
                  { icon: "opacity", label: "Oil Level", val: "45%", color: "bg-amber-400" },
                  { icon: "emergency", label: "Acne Severity", val: "8%", color: "bg-rose-400" },
                ].map((m) => (
                  <div key={m.label} className="bg-white rounded-2xl p-5 flex items-center justify-between border border-[#eff1f2] hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${m.color.replace('bg-', 'bg-')}/10 text-${m.color.replace('bg-', 'text-')}`}>
                        <span className="material-symbols-outlined">{m.icon}</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-xs uppercase tracking-tight">{m.label}</h4>
                        <span className="text-[10px] text-slate-500">Optimal ({m.val})</span>
                      </div>
                    </div>
                    <div className="w-16 h-1.5 bg-[#f3f4f5] rounded-full overflow-hidden">
                      <div className={`h-full ${m.color}`} style={{ width: m.val }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Center Column: 3D Mapping */}
            <div className="col-span-12 md:col-span-7 lg:col-span-5">
              <div className="bg-white rounded-[2rem] min-h-[400px] sm:min-h-[500px] lg:h-full relative overflow-hidden border border-[#edeeef] shadow-[0_10px_40px_rgba(0,0,0,0.03)] flex flex-col items-center justify-center p-6 sm:p-8">
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                  <img
                    alt="abstract structure"
                    className="w-full h-full object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBgdchXZ8soA87R5RhxJim1MSnjpf0830UuO3dlKX3BaS3yji2-VENXs5CV4h-iaeVZVCMCc-agQL0VbDnpSU5phJTmNxQ17cSRPoMmS_BtoB1J_oUIDX3tp2hYjtAPJ51-u6TeUL5sWUcM-IjsK2C2LcHE7FY5fPfHUC5xwxq9QaayJqTFlrsfWoUheXDyQROuxwP0uUW2rbF8b3kCVGuEfSZhGOqvH4utvf0Balt5no2Nj1zyGXKI5JNSCCbOAgDQNyqs9LklsKPr"
                  />
                </div>
                <div className="relative z-10 w-full aspect-square max-w-sm flex items-center justify-center">
                  <div className="absolute w-64 h-64 bg-[#84f75e]/10 rounded-full blur-[80px]"></div>
                  <img
                    alt="3d skin map"
                    className="w-full h-full object-contain relative z-10"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAXkK_8J3lLkaIAN5ftmP3B9xd8sBehnVBmvt6RPv6uCWKDzLZIXdfBz8LI34OWXVXk0uWqDDdE73WlJyo2Q_yTUWBz5v8PUFjET8OYXWUconCG6znXzVknD_R7Sqt_6BDu8MeUYotTzAS6IzHvSId6QMTZ2HXNTStQUVYJVZ7O5ZpdOxG49V4vKaK9wpJNdOA-B4RM3lJ2W6zzAxRaLC1BDWLV0JsWE5e7ZVB-4poPJ-IDUxM9P7IwtAhMEFOIUGCAdjvOyJHkROID"
                  />
                  {/* Overlay labels */}
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur p-3 rounded-xl shadow-lg border border-slate-100 flex flex-col">
                    <span className="text-[8px] font-black text-[#1c6d00] uppercase">Zone Alpha</span>
                    <span className="text-[10px] font-extrabold whitespace-nowrap text-[#191c1d]">Active Regeneration</span>
                  </div>
                  <div className="absolute bottom-12 left-0 bg-white/90 backdrop-blur p-3 rounded-xl shadow-lg border border-slate-100 flex flex-col">
                    <span className="text-[8px] font-black text-slate-400 uppercase">Zone Delta</span>
                    <span className="text-[10px] font-extrabold whitespace-nowrap text-[#191c1d]">Pore Refinement 82%</span>
                  </div>
                </div>
                <div className="mt-auto relative z-10 text-center">
                  <span className="text-[10px] uppercase tracking-[0.3em] font-black text-slate-300">
                    Live 3D Dermal Mapping
                  </span>
                  <div className="flex gap-2 mt-4 justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#1c6d00]"></div>
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-200"></div>
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-200"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: AI & Progress */}
            <div className="col-span-12 md:col-span-5 lg:col-span-3 flex flex-col gap-6">
              {/* AI Prescriptive */}
              <div className="bg-white rounded-[2rem] p-6 sm:p-8 shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-[#edeeef]">
                <div className="flex items-center gap-2 mb-6 text-[#1c6d00]">
                  <span className="material-symbols-outlined text-[20px]">auto_awesome</span>
                  <h3 className="font-black text-xs uppercase tracking-widest">AI Prescriptive</h3>
                </div>
                <div className="space-y-6">
                  <div className="relative pl-6">
                    <div className="absolute left-0 top-0 w-1 h-full signature-gradient rounded-full"></div>
                    <p className="text-[9px] font-black text-slate-400 uppercase mb-1">Morning Routine</p>
                    <p className="text-xs font-semibold leading-relaxed text-[#191c1d]">
                      Increase SPF-50 application; UV sensitivity rising.
                    </p>
                  </div>
                  <div className="relative pl-6">
                    <div className="absolute left-0 top-0 w-1 h-full bg-slate-100 rounded-full"></div>
                    <p className="text-[9px] font-black text-slate-400 uppercase mb-1">Evening Treatment</p>
                    <p className="text-xs font-semibold leading-relaxed text-[#191c1d]">
                      Apply Niacinamide serum for pore control.
                    </p>
                  </div>
                </div>
                <button className="mt-8 w-full py-4 text-[10px] font-black uppercase tracking-widest text-[#1c6d00] border-2 border-[#1c6d00] rounded-full hover:bg-[#1c6d00] hover:text-white transition-all">
                  View Routine
                </button>
              </div>

              {/* Weekly Progress */}
              <div className="bg-white rounded-[2rem] p-6 sm:p-8 border border-[#edeeef] shadow-[0_10px_40px_rgba(0,0,0,0.03)] flex flex-col h-full">
                <h3 className="font-black text-xs uppercase tracking-widest text-[#191c1d] mb-6">Weekly Progress</h3>
                <div className="flex-1 flex items-end justify-between gap-1.5 min-h-[120px]">
                  {[60, 45, 80, 70, 95, 85, 98].map((h, i) => (
                    <div
                      key={i}
                      className={`w-full rounded-t-lg transition-all ${i === 6 ? 'signature-gradient h-full shadow-[0_-4px_12px_rgba(132,247,94,0.3)]' : 'bg-[#84f75e]/20 hover:bg-[#84f75e]'}`}
                      style={{ height: `${h}%` }}
                    ></div>
                  ))}
                </div>
                <div className="flex justify-between mt-4">
                  <span className="text-[8px] font-black text-slate-400">MON</span>
                  <span className="text-[8px] font-black text-[#191c1d]">SUN</span>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Stats Row - Responsive Grid */}
          <div className="mt-8 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {[
              { label: "Active Flora", val: "92.4%", progress: 92 },
              { label: "Cell Turnover", val: "14 Days", progress: 60 },
              { label: "UV Protection", val: "Superior", progress: 88 },
              { label: "Lab Precision", val: "Grade A", progress: 100 },
            ].map((s) => (
              <div key={s.label} className="flex flex-col gap-2">
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
                  {s.label}
                </span>
                <span className="text-2xl font-black text-[#191c1d]">
                  {s.val}
                </span>
                <div className="w-full h-1.5 bg-[#eff1f2] rounded-full overflow-hidden">
                  <div className="h-full bg-[#1c6d00] transition-all" style={{ width: `${s.progress}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Mobile Bottom Nav - Synchronized and Responsive */}
      <nav className="lg:hidden fixed bottom-6 left-6 right-6 h-16 bg-[#191c1d]/95 backdrop-blur-xl rounded-full flex items-center justify-between px-8 z-50 shadow-2xl border border-white/10">
        <Link href="/pages/dashboard">
          <span className="material-symbols-outlined text-white active:scale-90 transition-transform">grid_view</span>
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

        <Link href="/pages/scan">
          <span className="material-symbols-outlined text-slate-400 active:scale-90 transition-transform">biotech</span>
        </Link>
      </nav>
    </div>
  );
}
