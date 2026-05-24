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
    <div className="bg-[var(--dashboard-bg)] text-[var(--dashboard-text)] antialiased min-h-screen font-manrope transition-colors duration-300">
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
              <div className="bg-[var(--dashboard-card-bg)] rounded-3xl p-5 shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-[var(--dashboard-border)] transition-colors duration-300">
                <span className="uppercase tracking-widest text-[10px] font-extrabold text-on-surface-variant/70">
                  Health Index
                </span>
                <div className="flex items-baseline gap-1 mt-2">
                  <span className="text-4xl sm:text-5xl font-extrabold text-[var(--dashboard-text)] tracking-tight">
                    94
                  </span>
                  <span className="text-lg font-bold text-on-surface-variant/60">/100</span>
                </div>
                <div className="mt-6">
                  <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary-container text-on-primary-container rounded-full text-[10px] font-black uppercase tracking-wider">
                    <span className="material-symbols-outlined text-sm">
                      trending_up
                    </span>
                    Luminous Score
                  </span>
                </div>
                <p className="mt-3 text-[var(--dashboard-text-secondary)] text-[10px] leading-relaxed font-medium">
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
                    className="bg-[var(--dashboard-card-bg)] rounded-xl p-3 flex items-center justify-between border border-[var(--dashboard-border)] hover:shadow-md transition-all duration-300"
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
                        <h4 className="font-bold text-xs uppercase tracking-tight text-[var(--dashboard-text)]">
                          {m.label}
                        </h4>
                        <span className="text-[10px] text-on-surface-variant/80">
                          Optimal ({m.val})
                        </span>
                      </div>
                    </div>
                    <div className="w-16 h-1.5 bg-[var(--dashboard-bg)] rounded-full overflow-hidden">
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
              <div className="bg-[var(--dashboard-card-bg)] rounded-3xl min-h-[400px] h-full relative overflow-hidden border border-[var(--dashboard-sidebar-border)] shadow-[0_10px_40px_rgba(0,0,0,0.03)] flex flex-col items-center justify-center p-4 transition-colors duration-300">
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                  <img
                    alt="abstract structure"
                    className="w-full h-full object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBgdchXZ8soA87R5RhxJim1MSnjpf0830UuO3dlKX3BaS3yji2-VENXs5CV4h-iaeVZVCMCc-agQL0VbDnpSU5phJTmNxQ17cSRPoMmS_BtoB1J_oUIDX3tp2hYjtAPJ51-u6TeUL5sWUcM-IjsK2C2LcHE7FY5fPfHUC5xwxq9QaayJqTFlrsfWoUheXDyQROuxwP0uUW2rbF8b3kCVGuEfSZhGOqvH4utvf0Balt5no2Nj1zyGXKI5JNSCCbOAgDQNyqs9LklsKPr"
                  />
                </div>
                <div className="relative z-10 w-full aspect-square max-w-[280px] flex items-center justify-center">
                  <div className="absolute w-48 h-48 bg-primary/10 rounded-full blur-[60px]"></div>
                  <img
                    alt="3d skin map"
                    className="w-full h-full object-contain relative z-10"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAXkK_8J3lLkaIAN5ftmP3B9xd8sBehnVBmvt6RPv6uCWKDzLZIXdfBz8LI34OWXVXk0uWqDDdE73WlJyo2Q_yTUWBz5v8PUFjET8OYXWUconCG6znXzVknD_R7Sqt_6BDu8MeUYotTzAS6IzHvSId6QMTZ2HXNTStQUVYJVZ7O5ZpdOxG49V4vKaK9wpJNdOA-B4RM3lJ2W6zzAxRaLC1BDWLV0JsWE5e7ZVB-4poPJ-IDUxM9P7IwtAhMEFOIUGCAdjvOyJHkROID"
                  />
                  {/* Overlay labels */}
                  <div className="absolute top-4 right-4 bg-[var(--dashboard-card-bg)]/90 backdrop-blur p-3 rounded-xl shadow-lg border border-[var(--dashboard-border)] flex flex-col transition-colors">
                    <span className="text-[8px] font-black text-primary uppercase">
                      Zone Alpha
                    </span>
                    <span className="text-[10px] font-extrabold whitespace-nowrap text-[var(--dashboard-text)]">
                      Active Regeneration
                    </span>
                  </div>
                  <div className="absolute bottom-12 left-0 bg-[var(--dashboard-card-bg)]/90 backdrop-blur p-3 rounded-xl shadow-lg border border-[var(--dashboard-border)] flex flex-col transition-colors">
                    <span className="text-[8px] font-black text-on-surface-variant/70 uppercase">
                      Zone Delta
                    </span>
                    <span className="text-[10px] font-extrabold whitespace-nowrap text-[var(--dashboard-text)]">
                      Pore Refinement 82%
                    </span>
                  </div>
                </div>
                <div className="mt-auto relative z-10 text-center">
                  <span className="text-[10px] uppercase tracking-[0.3em] font-black text-on-surface-variant/50">
                    Live 3D Dermal Mapping
                  </span>
                  <div className="flex gap-2 mt-4 justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                    <div className="w-1.5 h-1.5 rounded-full bg-on-surface-variant/20"></div>
                    <div className="w-1.5 h-1.5 rounded-full bg-on-surface-variant/20"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: AI & Progress */}
            <div className="col-span-12 md:col-span-5 lg:col-span-3 flex flex-col gap-4">
              {/* AI Prescriptive */}
              <div className="bg-[var(--dashboard-card-bg)] rounded-3xl p-5 shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-[var(--dashboard-sidebar-border)] transition-colors duration-300">
                <div className="flex items-center gap-2 mb-6 text-primary">
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
                    <p className="text-[9px] font-black text-on-surface-variant/75 uppercase mb-1">
                      Morning Routine
                    </p>
                    <p className="text-xs font-semibold leading-relaxed text-[var(--dashboard-text)]">
                      Increase SPF-50 application; UV sensitivity rising.
                    </p>
                  </div>
                  <div className="relative pl-6">
                    <div className="absolute left-0 top-0 w-1 h-full bg-on-surface-variant/10 rounded-full"></div>
                    <p className="text-[9px] font-black text-on-surface-variant/75 uppercase mb-1">
                      Evening Treatment
                    </p>
                    <p className="text-xs font-semibold leading-relaxed text-[var(--dashboard-text)]">
                      Apply Niacinamide serum for pore control.
                    </p>
                  </div>
                </div>
                <button className="mt-4 w-full py-3 text-[9px] font-black uppercase tracking-widest text-primary border-2 border-primary rounded-full hover:bg-primary hover:text-on-primary transition-all cursor-pointer">
                  View Routine
                </button>
              </div>

              {/* Weekly Progress */}
              <div className="bg-[var(--dashboard-card-bg)] rounded-3xl p-5 border border-[var(--dashboard-sidebar-border)] shadow-[0_10px_40px_rgba(0,0,0,0.03)] flex flex-col transition-colors duration-300">
                <h3 className="font-black text-xs uppercase tracking-widest text-[var(--dashboard-text)] mb-6">
                  Weekly Progress
                </h3>
                <div className="flex items-end justify-between gap-1 h-32 md:flex-1">
                  {[60, 45, 80, 70, 95, 85, 98].map((h, i) => (
                    <div
                      key={i}
                      className={`w-full rounded-t-lg transition-all ${i === 6 ? "signature-gradient h-full shadow-[0_-4px_12px_rgba(132,247,94,0.3)]" : "bg-primary/20 hover:bg-primary"}`}
                      style={{ height: `${h}%` }}
                    ></div>
                  ))}
                </div>
                <div className="flex justify-between mt-4">
                  <span className="text-[8px] font-black text-on-surface-variant/75">
                    MON
                  </span>
                  <span className="text-[8px] font-black text-[var(--dashboard-text)]">
                    SUN
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Stats Row - Responsive Grid */}
          <div className="mt-auto py-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 border-t border-[var(--dashboard-border)] transition-colors">
            {[
              { label: "Active Flora", val: "92.4%", progress: 92 },
              { label: "Cell Turnover", val: "14 Days", progress: 60 },
              { label: "UV Protection", val: "Superior", progress: 88 },
              { label: "Lab Precision", val: "Grade A", progress: 100 },
            ].map((s) => (
              <div key={s.label} className="flex flex-col gap-2">
                <span className="text-[9px] font-black text-on-surface-variant/75 uppercase tracking-widest">
                  {s.label}
                </span>
                <span className="text-lg font-black text-[var(--dashboard-text)]">
                  {s.val}
                </span>
                <div className="w-full h-1.5 bg-[var(--dashboard-border)] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary transition-all"
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
