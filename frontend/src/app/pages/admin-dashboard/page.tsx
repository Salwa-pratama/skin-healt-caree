"use client";

import { useState } from "react";
import Sidebar from "@/app/components/Sidebar";
import DashboardHeader from "@/app/components/DashboardHeader";
import MobileNav from "@/app/components/MobileNav";
import "../dashboard_user/dashboard.css";
import { useAdminStats } from "@/features/admin/api/admin.api";

export default function AdminDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { data: stats, isLoading } = useAdminStats();

  return (
    <div className="bg-[var(--dashboard-bg)] text-[var(--dashboard-text)] antialiased min-h-screen font-manrope transition-colors duration-300">
      <DashboardHeader
        isSidebarOpen={isSidebarOpen}
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      <Sidebar activePage="admin-dashboard" isOpen={isSidebarOpen} />

      {/* Main Content Area - Responsive Bento Grid */}
      <main className={`transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] pt-20 px-4 sm:px-6 md:px-10 dashboard-animate-in ${isSidebarOpen ? "lg:ml-64" : "lg:ml-0"}`}>
        <div className="max-w-7xl mx-auto flex flex-col pb-32 md:pb-8">
          <div className="grid grid-cols-12 gap-4 lg:gap-5">
            {/* Left Column: System Health */}
            <div className="col-span-12 lg:col-span-4 flex flex-col gap-4">
              <div className="bg-[var(--dashboard-card-bg)] rounded-3xl p-5 shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-[var(--dashboard-border)] transition-colors duration-300">
                <span className="uppercase tracking-widest text-[10px] font-extrabold text-on-surface-variant/70">
                  System Status
                </span>
                <div className="flex items-baseline gap-1 mt-2">
                  <span className="text-4xl sm:text-5xl font-extrabold text-[var(--dashboard-text)] tracking-tight">
                    100
                  </span>
                  <span className="text-lg font-bold text-on-surface-variant/60">%</span>
                </div>
                <div className="mt-6">
                  <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary-container text-on-primary-container rounded-full text-[10px] font-black uppercase tracking-wider">
                    <span className="material-symbols-outlined text-sm">
                      check_circle
                    </span>
                    All Systems Operational
                  </span>
                </div>
                <p className="mt-3 text-[var(--dashboard-text-secondary)] text-[10px] leading-relaxed font-medium">
                  Server load is currently at 12%. Database latency is under 5ms. No active incidents.
                </p>
              </div>

              {/* Stacked Metric Cards */}
              <div className="space-y-4">
                {[
                  { icon: "dns", label: "Server Load", val: "12%", color: "bg-blue-400" },
                  { icon: "database", label: "DB Latency", val: "5ms", color: "bg-amber-400" },
                  { icon: "memory", label: "Memory Usage", val: "48%", color: "bg-rose-400" },
                ].map((m) => (
                  <div key={m.label} className="bg-[var(--dashboard-card-bg)] rounded-xl p-3 flex items-center justify-between border border-[var(--dashboard-border)] hover:shadow-md transition-all duration-300">
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${m.color.replace("bg-", "bg-")}/10 text-${m.color.replace("bg-", "text-")}`}>
                        <span className="material-symbols-outlined">{m.icon}</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-xs uppercase tracking-tight text-[var(--dashboard-text)]">{m.label}</h4>
                        <span className="text-[10px] text-on-surface-variant/80">Optimal ({m.val})</span>
                      </div>
                    </div>
                    <div className="w-16 h-1.5 bg-[var(--dashboard-bg)] rounded-full overflow-hidden">
                      <div className={`h-full ${m.color}`} style={{ width: m.val.replace("ms", "%") }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Center Column: Database Metrics */}
            <div className="col-span-12 md:col-span-7 lg:col-span-5">
              <div className="bg-[var(--dashboard-card-bg)] rounded-3xl min-h-[400px] h-full relative overflow-hidden border border-[var(--dashboard-sidebar-border)] shadow-[0_10px_40px_rgba(0,0,0,0.03)] flex flex-col p-6 transition-colors duration-300">
                <h3 className="font-black text-xs uppercase tracking-widest text-[var(--dashboard-text)] mb-6">
                  Platform Statistics
                </h3>

                <div className="grid grid-cols-2 gap-4 flex-1">
                  {[
                    { label: "Total Users", val: isLoading ? "..." : (stats?.totalUsers || 0), icon: "group", color: "text-blue-500" },
                    { label: "Active Scans", val: isLoading ? "..." : (stats?.totalScans || 0), icon: "biotech", color: "text-emerald-500" },
                    { label: "Acne Solutions", val: isLoading ? "..." : (stats?.totalSolutions || 0), icon: "medical_services", color: "text-amber-500" },
                    { label: "Active Habits", val: isLoading ? "..." : (stats?.totalHabits || 0), icon: "calendar_month", color: "text-purple-500" },
                  ].map((stat) => (
                    <div key={stat.label} className="bg-[var(--dashboard-bg)] rounded-2xl p-4 flex flex-col justify-between hover:shadow-md transition-shadow">
                      <div className={`w-10 h-10 rounded-full bg-[var(--dashboard-card-bg)] shadow-sm flex items-center justify-center ${stat.color}`}>
                        <span className="material-symbols-outlined text-[20px]">{stat.icon}</span>
                      </div>
                      <div className="mt-4">
                        <span className="text-[10px] uppercase font-bold text-on-surface-variant/70">{stat.label}</span>
                        <div className="text-2xl font-black text-[var(--dashboard-text)] mt-1">{stat.val}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Activity Logs */}
            <div className="col-span-12 md:col-span-5 lg:col-span-3 flex flex-col gap-4">
              <div className="bg-[var(--dashboard-card-bg)] rounded-3xl p-5 shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-[var(--dashboard-sidebar-border)] transition-colors duration-300 flex-1">
                <div className="flex items-center gap-2 mb-6 text-primary">
                  <span className="material-symbols-outlined text-[20px]">manage_search</span>
                  <h3 className="font-black text-xs uppercase tracking-widest">Recent Logs</h3>
                </div>
                <div className="space-y-6">
                  {[
                    { time: "2 mins ago", event: "New user registration", detail: "ID: #9942", type: "success" },
                    { time: "15 mins ago", event: "Scan completed", detail: "Confidence: 94%", type: "info" },
                    { time: "1 hour ago", event: "Master Data Updated", detail: "By Admin", type: "warning" },
                    { time: "3 hours ago", event: "System Backup", detail: "1.2GB saved", type: "success" },
                  ].map((log, i) => (
                    <div key={i} className="relative pl-6">
                      <div className={`absolute left-0 top-0 w-1 h-full rounded-full ${log.type === "success" ? "signature-gradient" :
                        log.type === "info" ? "bg-blue-400" : "bg-amber-400"
                        }`}></div>
                      <p className="text-[9px] font-black text-on-surface-variant/75 uppercase mb-1">{log.time}</p>
                      <p className="text-xs font-semibold leading-relaxed text-[var(--dashboard-text)]">{log.event}</p>
                      <p className="text-[10px] text-on-surface-variant/60">{log.detail}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Footer Stats Row */}
          <div className="mt-auto py-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 border-t border-[var(--dashboard-border)] transition-colors">
            {[
              { label: "API Requests", val: "4.2M", progress: 65 },
              { label: "Avg Response", val: "120ms", progress: 80 },
              { label: "Error Rate", val: "0.01%", progress: 5 },
              { label: "Storage Used", val: "45%", progress: 45 },
            ].map((s) => (
              <div key={s.label} className="flex flex-col gap-2">
                <span className="text-[9px] font-black text-on-surface-variant/75 uppercase tracking-widest">{s.label}</span>
                <span className="text-lg font-black text-[var(--dashboard-text)]">{s.val}</span>
                <div className="w-full h-1.5 bg-[var(--dashboard-border)] rounded-full overflow-hidden">
                  <div className="h-full bg-primary transition-all" style={{ width: `${s.progress}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <MobileNav activePage="admin-dashboard" />
    </div>
  );
}
