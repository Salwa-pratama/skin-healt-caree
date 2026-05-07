"use client";

import Link from "next/link";
import { useState } from "react";
import Sidebar from "@/app/components/Sidebar";
import DashboardHeader from "@/app/components/DashboardHeader";
import MobileNav from "@/app/components/MobileNav";
import "./dashboard.css";

export default function HomeDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="bg-[#f8f9fa] text-[#191c1d] antialiased min-h-screen font-manrope">
      <DashboardHeader 
        isSidebarOpen={isSidebarOpen} 
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} 
      />

      <Sidebar activePage="dashboard" isOpen={isSidebarOpen} />

      {/* Main Content Area - Responsive Bento Grid */}
      <main className={`transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] pt-20 px-4 sm:px-6 md:px-10 dashboard-animate-in ${isSidebarOpen ? "lg:ml-64" : "lg:ml-0"}`}>
        <div className="max-w-7xl mx-auto flex flex-col pb-32 md:pb-8">
          <div className="grid grid-cols-12 gap-4 lg:gap-5">
            {/* Left Column: Health Index & Modules */}
            <div className="col-span-12 lg:col-span-4 flex flex-col gap-4">
              {/* Health Index Card */}
              <div className="bg-white rounded-3xl p-5 shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-[#eff1f2]">
                <span className="uppercase tracking-widest text-[10px] font-extrabold text-slate-400">
                  Health Index
                </span>
                <div className="flex items-baseline gap-1 mt-2">
                  <span className="text-4xl sm:text-5xl font-extrabold text-[#191c1d] tracking-tight">
                    94
                  </span>
                  <span className="text-lg font-bold text-slate-400">/100</span>
                </div>
                <div className="mt-6">
                  <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#84f75e] text-[#135200] rounded-full text-[10px] font-black uppercase tracking-wider">
                    <span className="material-symbols-outlined text-sm">
                      trending_up
                    </span>
                    Luminous Score
                  </span>
                </div>
                <p className="mt-3 text-[#3f4a39] text-[10px] leading-relaxed font-medium">
                  Your skin barrier is operating at peak efficiency. Cellular
                  regeneration is up 12% from last scan.
                </p>
              </div>

              {/* Stacked Metric Cards */}
              <div className="space-y-4">
                {[
                  {
                    icon: "water_drop",
                    label: "Hydration",
                    val: "82%",
                    color: "bg-blue-400",
                  },
                  {
                    icon: "opacity",
                    label: "Oil Level",
                    val: "45%",
                    color: "bg-amber-400",
                  },
                  {
                    icon: "emergency",
                    label: "Acne Severity",
                    val: "8%",
                    color: "bg-rose-400",
                  },
                ].map((m) => (
                  <div
                    key={m.label}
                    className="bg-white rounded-xl p-3 flex items-center justify-between border border-[#eff1f2] hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${m.color.replace("bg-", "bg-")}/10 text-${m.color.replace("bg-", "text-")}`}
                      >
                        <span className="material-symbols-outlined">
                          {m.icon}
                        </span>
                      </div>
                      <div>
                        <h4 className="font-bold text-xs uppercase tracking-tight">
                          {m.label}
                        </h4>
                        <span className="text-[10px] text-slate-500">
                          Optimal ({m.val})
                        </span>
                      </div>
                    </div>
                    <div className="w-16 h-1.5 bg-[#f3f4f5] rounded-full overflow-hidden">
                      <div
                        className={`h-full ${m.color}`}
                        style={{ width: m.val }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Center Column: 3D Mapping */}
            <div className="col-span-12 md:col-span-7 lg:col-span-5">
              <div className="bg-white rounded-3xl min-h-[400px] h-full relative overflow-hidden border border-[#edeeef] shadow-[0_10px_40px_rgba(0,0,0,0.03)] flex flex-col items-center justify-center p-4">
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                  <img
                    alt="abstract structure"
                    className="w-full h-full object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBgdchXZ8soA87R5RhxJim1MSnjpf0830UuO3dlKX3BaS3yji2-VENXs5CV4h-iaeVZVCMCc-agQL0VbDnpSU5phJTmNxQ17cSRPoMmS_BtoB1J_oUIDX3tp2hYjtAPJ51-u6TeUL5sWUcM-IjsK2C2LcHE7FY5fPfHUC5xwxq9QaayJqTFlrsfWoUheXDyQROuxwP0uUW2rbF8b3kCVGuEfSZhGOqvH4utvf0Balt5no2Nj1zyGXKI5JNSCCbOAgDQNyqs9LklsKPr"
                  />
                </div>
                <div className="relative z-10 w-full aspect-square max-w-[280px] flex items-center justify-center">
                  <div className="absolute w-48 h-48 bg-[#84f75e]/10 rounded-full blur-[60px]"></div>
                  <img
                    alt="3d skin map"
                    className="w-full h-full object-contain relative z-10"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAXkK_8J3lLkaIAN5ftmP3B9xd8sBehnVBmvt6RPv6uCWKDzLZIXdfBz8LI34OWXVXk0uWqDDdE73WlJyo2Q_yTUWBz5v8PUFjET8OYXWUconCG6znXzVknD_R7Sqt_6BDu8MeUYotTzAS6IzHvSId6QMTZ2HXNTStQUVYJVZ7O5ZpdOxG49V4vKaK9wpJNdOA-B4RM3lJ2W6zzAxRaLC1BDWLV0JsWE5e7ZVB-4poPJ-IDUxM9P7IwtAhMEFOIUGCAdjvOyJHkROID"
                  />
                  {/* Overlay labels */}
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur p-3 rounded-xl shadow-lg border border-slate-100 flex flex-col">
                    <span className="text-[8px] font-black text-[#1c6d00] uppercase">
                      Zone Alpha
                    </span>
                    <span className="text-[10px] font-extrabold whitespace-nowrap text-[#191c1d]">
                      Active Regeneration
                    </span>
                  </div>
                  <div className="absolute bottom-12 left-0 bg-white/90 backdrop-blur p-3 rounded-xl shadow-lg border border-slate-100 flex flex-col">
                    <span className="text-[8px] font-black text-slate-400 uppercase">
                      Zone Delta
                    </span>
                    <span className="text-[10px] font-extrabold whitespace-nowrap text-[#191c1d]">
                      Pore Refinement 82%
                    </span>
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
            <div className="col-span-12 md:col-span-5 lg:col-span-3 flex flex-col gap-4">
              {/* AI Prescriptive */}
              <div className="bg-white rounded-3xl p-5 shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-[#edeeef]">
                <div className="flex items-center gap-2 mb-6 text-[#1c6d00]">
                  <span className="material-symbols-outlined text-[20px]">
                    auto_awesome
                  </span>
                  <h3 className="font-black text-xs uppercase tracking-widest">
                    AI Prescriptive
                  </h3>
                </div>
                <div className="space-y-6">
                  <div className="relative pl-6">
                    <div className="absolute left-0 top-0 w-1 h-full signature-gradient rounded-full"></div>
                    <p className="text-[9px] font-black text-slate-400 uppercase mb-1">
                      Morning Routine
                    </p>
                    <p className="text-xs font-semibold leading-relaxed text-[#191c1d]">
                      Increase SPF-50 application; UV sensitivity rising.
                    </p>
                  </div>
                  <div className="relative pl-6">
                    <div className="absolute left-0 top-0 w-1 h-full bg-slate-100 rounded-full"></div>
                    <p className="text-[9px] font-black text-slate-400 uppercase mb-1">
                      Evening Treatment
                    </p>
                    <p className="text-xs font-semibold leading-relaxed text-[#191c1d]">
                      Apply Niacinamide serum for pore control.
                    </p>
                  </div>
                </div>
                <button className="mt-4 w-full py-3 text-[9px] font-black uppercase tracking-widest text-[#1c6d00] border-2 border-[#1c6d00] rounded-full hover:bg-[#1c6d00] hover:text-white transition-all">
                  View Routine
                </button>
              </div>

              {/* Weekly Progress */}
              <div className="bg-white rounded-3xl p-5 border border-[#edeeef] shadow-[0_10px_40px_rgba(0,0,0,0.03)] flex flex-col">
                <h3 className="font-black text-xs uppercase tracking-widest text-[#191c1d] mb-6">
                  Weekly Progress
                </h3>
                <div className="flex items-end justify-between gap-1 h-32 md:flex-1">
                  {[60, 45, 80, 70, 95, 85, 98].map((h, i) => (
                    <div
                      key={i}
                      className={`w-full rounded-t-lg transition-all ${i === 6 ? "signature-gradient h-full shadow-[0_-4px_12px_rgba(132,247,94,0.3)]" : "bg-[#84f75e]/20 hover:bg-[#84f75e]"}`}
                      style={{ height: `${h}%` }}
                    ></div>
                  ))}
                </div>
                <div className="flex justify-between mt-4">
                  <span className="text-[8px] font-black text-slate-400">
                    MON
                  </span>
                  <span className="text-[8px] font-black text-[#191c1d]">
                    SUN
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Stats Row - Responsive Grid */}
          <div className="mt-auto py-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 border-t border-[#eff1f2]">
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
                <span className="text-lg font-black text-[#191c1d]">
                  {s.val}
                </span>
                <div className="w-full h-1.5 bg-[#eff1f2] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#1c6d00] transition-all"
                    style={{ width: `${s.progress}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <MobileNav activePage="dashboard" />


    </div>
  );
}
