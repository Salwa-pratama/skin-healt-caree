"use client";

import { useState } from "react";
import MobileNav from "@/app/components/MobileNav";
import "../../dashboard.css";

// Dummy data for subscriptions
const DUMMY_SUBSCRIPTIONS = [
  {
    id: "SUB-001",
    userName: "Budi Santoso",
    email: "budi@example.com",
    plan: "Premium",
    status: "Active",
    startDate: "2026-01-15",
    endDate: "2026-07-15",
    amount: "Rp 150.000"
  },
  {
    id: "SUB-002",
    userName: "Siti Aminah",
    email: "siti@example.com",
    plan: "Basic",
    status: "Expired",
    startDate: "2025-12-01",
    endDate: "2026-01-01",
    amount: "Rp 50.000"
  },
  {
    id: "SUB-003",
    userName: "Andi Wijaya",
    email: "andi@example.com",
    plan: "Pro",
    status: "Active",
    startDate: "2026-05-10",
    endDate: "2027-05-10",
    amount: "Rp 500.000"
  },
  {
    id: "SUB-004",
    userName: "Dewi Lestari",
    email: "dewi@example.com",
    plan: "Premium",
    status: "Pending",
    startDate: "2026-06-20",
    endDate: "2026-12-20",
    amount: "Rp 150.000"
  },
  {
    id: "SUB-005",
    userName: "Reza Rahadian",
    email: "reza@example.com",
    plan: "Basic",
    status: "Active",
    startDate: "2026-06-01",
    endDate: "2026-07-01",
    amount: "Rp 50.000"
  }
];

const DUMMY_PACKAGES = [
  { id: "PKG-1", name: "Basic", price: "Rp 50.000", duration: "1 Month", status: "Active", features: ["Basic analysis", "History logs"] },
  { id: "PKG-2", name: "Premium", price: "Rp 150.000", duration: "3 Months", status: "Active", features: ["Advanced analysis", "Priority support", "Download reports"] },
  { id: "PKG-3", name: "Pro", price: "Rp 500.000", duration: "1 Year", status: "Active", features: ["All Premium features", "API Access", "Custom branding"] }
];

export default function AdminSubscriptions() {
  const [subscriptions] = useState(DUMMY_SUBSCRIPTIONS);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState<"users" | "packages">("users");

  const filteredSubscriptions = subscriptions.filter(sub => 
    sub.userName.toLowerCase().includes(searchTerm.toLowerCase()) || 
    sub.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sub.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Active":
        return <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">Active</span>;
      case "Expired":
        return <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400">Expired</span>;
      case "Pending":
        return <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">Pending</span>;
      default:
        return <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-surface-variant text-on-surface-variant">{status}</span>;
    }
  };

  const getPlanBadge = (plan: string) => {
    switch (plan) {
      case "Premium":
        return <span className="px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400 flex items-center gap-1 w-fit"><span className="material-symbols-outlined text-[12px]">workspace_premium</span> {plan}</span>;
      case "Pro":
        return <span className="px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 flex items-center gap-1 w-fit"><span className="material-symbols-outlined text-[12px]">military_tech</span> {plan}</span>;
      default:
        return <span className="px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 flex items-center gap-1 w-fit"><span className="material-symbols-outlined text-[12px]">stars</span> {plan}</span>;
    }
  };

  return (
    <div className="bg-[var(--dashboard-bg)] text-[var(--dashboard-text)] antialiased min-h-screen font-manrope transition-colors duration-300">
      <main>
        <div className="max-w-7xl mx-auto flex flex-col pb-32 md:pb-8">
          
          {/* Header Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-[var(--dashboard-card-bg)] rounded-3xl p-5 shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-[var(--dashboard-border)] flex flex-col">
               <span className="uppercase tracking-widest text-[10px] font-extrabold text-on-surface-variant/70 mb-2">Total Subscriptions</span>
               <span className="text-3xl font-black text-[var(--dashboard-text)]">1,245</span>
               <span className="text-[10px] text-emerald-500 font-bold mt-2 flex items-center gap-1"><span className="material-symbols-outlined text-[12px]">trending_up</span> +12% this month</span>
            </div>
            <div className="bg-[var(--dashboard-card-bg)] rounded-3xl p-5 shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-[var(--dashboard-border)] flex flex-col">
               <span className="uppercase tracking-widest text-[10px] font-extrabold text-on-surface-variant/70 mb-2">Active Users</span>
               <span className="text-3xl font-black text-[var(--dashboard-text)]">982</span>
               <span className="text-[10px] text-emerald-500 font-bold mt-2 flex items-center gap-1"><span className="material-symbols-outlined text-[12px]">trending_up</span> +5% this month</span>
            </div>
            <div className="bg-[var(--dashboard-card-bg)] rounded-3xl p-5 shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-[var(--dashboard-border)] flex flex-col">
               <span className="uppercase tracking-widest text-[10px] font-extrabold text-on-surface-variant/70 mb-2">Monthly Revenue</span>
               <span className="text-3xl font-black text-[var(--dashboard-text)]">Rp 45M</span>
               <span className="text-[10px] text-emerald-500 font-bold mt-2 flex items-center gap-1"><span className="material-symbols-outlined text-[12px]">trending_up</span> +8% this month</span>
            </div>
            <div className="bg-[var(--dashboard-card-bg)] rounded-3xl p-5 shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-[var(--dashboard-border)] flex flex-col">
               <span className="uppercase tracking-widest text-[10px] font-extrabold text-on-surface-variant/70 mb-2">Churn Rate</span>
               <span className="text-3xl font-black text-[var(--dashboard-text)]">2.4%</span>
               <span className="text-[10px] text-rose-500 font-bold mt-2 flex items-center gap-1"><span className="material-symbols-outlined text-[12px]">trending_down</span> -0.5% this month</span>
            </div>
          </div>

          <div className="bg-[var(--dashboard-card-bg)] rounded-3xl p-6 md:p-8 shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-[var(--dashboard-border)] transition-colors duration-300">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
              <div>
                <h1 className="text-2xl font-black tracking-tight uppercase text-[var(--dashboard-text)]">
                  {activeTab === "users" ? "Manage Subscriptions" : "Manage Packages"}
                </h1>
                <p className="text-sm font-medium text-on-surface-variant/70 mt-1">
                  {activeTab === "users" 
                    ? "Pantau dan kelola langganan pengguna Aether Med." 
                    : "Atur paket berlangganan untuk ditawarkan ke pengguna."}
                </p>
              </div>
              
              <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                <div className="flex bg-[var(--dashboard-bg)] p-1 rounded-2xl border border-[var(--dashboard-border)] w-full md:w-auto">
                  <button 
                    onClick={() => setActiveTab("users")}
                    className={`flex-1 md:flex-none px-4 py-2 rounded-xl text-sm font-bold transition-colors ${activeTab === "users" ? "bg-[var(--dashboard-card-bg)] text-[var(--dashboard-text)] shadow-sm" : "text-on-surface-variant/70 hover:text-[var(--dashboard-text)]"}`}
                  >
                    Users
                  </button>
                  <button 
                    onClick={() => setActiveTab("packages")}
                    className={`flex-1 md:flex-none px-4 py-2 rounded-xl text-sm font-bold transition-colors ${activeTab === "packages" ? "bg-[var(--dashboard-card-bg)] text-[var(--dashboard-text)] shadow-sm" : "text-on-surface-variant/70 hover:text-[var(--dashboard-text)]"}`}
                  >
                    Packages
                  </button>
                </div>
                
                <div className="w-full md:w-64 flex justify-end">
                  {activeTab === "users" ? (
                    <div className="relative w-full">
                      <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant/50">search</span>
                      <input 
                        type="text" 
                        placeholder="Cari user atau ID..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-12 pr-4 py-3 bg-[var(--dashboard-bg)] border border-[var(--dashboard-border)] rounded-2xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all w-full text-[var(--dashboard-text)]"
                      />
                    </div>
                  ) : (
                    <button className="flex items-center justify-center gap-2 px-4 py-3 bg-primary text-white rounded-2xl text-sm font-bold hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20 w-full">
                      <span className="material-symbols-outlined text-[20px]">add</span>
                      Tambah Paket
                    </button>
                  )}
                </div>
              </div>
            </div>

            {activeTab === "users" ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[var(--dashboard-border)]">
                    <th className="py-4 px-4 text-xs font-black uppercase tracking-widest text-on-surface-variant/70">
                      ID
                    </th>
                    <th className="py-4 px-4 text-xs font-black uppercase tracking-widest text-on-surface-variant/70">
                      User
                    </th>
                    <th className="py-4 px-4 text-xs font-black uppercase tracking-widest text-on-surface-variant/70">
                      Plan
                    </th>
                    <th className="py-4 px-4 text-xs font-black uppercase tracking-widest text-on-surface-variant/70">
                      Status
                    </th>
                    <th className="py-4 px-4 text-xs font-black uppercase tracking-widest text-on-surface-variant/70">
                      Periode
                    </th>
                    <th className="py-4 px-4 text-xs font-black uppercase tracking-widest text-on-surface-variant/70 text-right">
                      Amount
                    </th>
                    <th className="py-4 px-4 text-xs font-black uppercase tracking-widest text-on-surface-variant/70 text-center">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSubscriptions.map((sub) => (
                    <tr
                      key={sub.id}
                      className="border-b border-[var(--dashboard-border)] hover:bg-[var(--dashboard-bg)] transition-colors group"
                    >
                      <td className="py-5 px-4 text-sm font-extrabold text-[var(--dashboard-text)]">
                        {sub.id}
                      </td>
                      <td className="py-5 px-4">
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-[var(--dashboard-text)]">{sub.userName}</span>
                          <span className="text-[10px] font-semibold text-on-surface-variant/60">{sub.email}</span>
                        </div>
                      </td>
                      <td className="py-5 px-4">
                        {getPlanBadge(sub.plan)}
                      </td>
                      <td className="py-5 px-4">
                        {getStatusBadge(sub.status)}
                      </td>
                      <td className="py-5 px-4">
                        <div className="flex flex-col">
                          <span className="text-[11px] font-bold text-[var(--dashboard-text)]">{sub.startDate}</span>
                          <span className="text-[10px] font-semibold text-on-surface-variant/60">to {sub.endDate}</span>
                        </div>
                      </td>
                      <td className="py-5 px-4 text-right">
                        <span className="text-sm font-black text-[var(--dashboard-text)]">{sub.amount}</span>
                      </td>
                      <td className="py-5 px-4 text-center">
                        <button className="p-2 rounded-xl text-primary hover:bg-primary/10 transition-colors" title="View Details">
                          <span className="material-symbols-outlined text-[20px]">visibility</span>
                        </button>
                        <button className="p-2 rounded-xl text-on-surface-variant hover:bg-surface-variant transition-colors ml-1" title="Edit">
                          <span className="material-symbols-outlined text-[20px]">edit</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filteredSubscriptions.length === 0 && (
                <div className="text-center py-16 flex flex-col items-center justify-center">
                  <div className="w-16 h-16 bg-surface-variant/50 rounded-full flex items-center justify-center text-on-surface-variant mb-4">
                    <span className="material-symbols-outlined text-3xl">search_off</span>
                  </div>
                  <h3 className="text-lg font-bold text-[var(--dashboard-text)] mb-1">Tidak ada data ditemukan</h3>
                  <p className="text-sm font-medium text-on-surface-variant/70">Coba gunakan kata kunci pencarian yang lain.</p>
                </div>
              )}
            </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {DUMMY_PACKAGES.map((pkg) => (
                  <div key={pkg.id} className="bg-[var(--dashboard-bg)] rounded-3xl p-6 border border-[var(--dashboard-border)] hover:border-primary/50 transition-colors group relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                      <button className="p-2 bg-[var(--dashboard-card-bg)] rounded-xl text-on-surface-variant hover:text-primary transition-colors shadow-sm" title="Edit">
                        <span className="material-symbols-outlined text-[18px]">edit</span>
                      </button>
                      <button className="p-2 bg-[var(--dashboard-card-bg)] rounded-xl text-on-surface-variant hover:text-rose-500 transition-colors shadow-sm" title="Delete">
                        <span className="material-symbols-outlined text-[18px]">delete</span>
                      </button>
                    </div>
                    
                    <div className="mb-4">
                      <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 mb-4 inline-block">{pkg.status}</span>
                      <h3 className="text-xl font-black text-[var(--dashboard-text)]">{pkg.name}</h3>
                      <div className="flex items-end gap-1 mt-2">
                        <span className="text-2xl font-black text-[var(--dashboard-text)]">{pkg.price}</span>
                        <span className="text-xs font-bold text-on-surface-variant/70 mb-1">/ {pkg.duration}</span>
                      </div>
                    </div>
                    
                    <div className="space-y-3 mt-6 pt-6 border-t border-[var(--dashboard-border)]">
                      {pkg.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                          <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                            <span className="material-symbols-outlined text-[12px] font-bold">check</span>
                          </div>
                          <span className="text-sm font-medium text-on-surface-variant">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <MobileNav activePage="admin-subscriptions" />
    </div>
  );
}
