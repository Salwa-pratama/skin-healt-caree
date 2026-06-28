"use client";

import { useState } from "react";
import MobileNav from "@/app/components/MobileNav";
import "../../dashboard.css";

import { useAdminSubscriptions, useAdminPackages, useUpdateUserSubscriptionMutation, useCreatePackageMutation, useUpdatePackageMutation, useDeletePackageMutation } from "@/features/admin/api/subscription.api";

export default function AdminSubscriptions() {
  const { data: subscriptionsData, isLoading: isLoadingSubs } = useAdminSubscriptions();
  const { data: packagesData, isLoading: isLoadingPkgs } = useAdminPackages();
  
  const updateUserSub = useUpdateUserSubscriptionMutation();
  const createPkg = useCreatePackageMutation();
  const updatePkg = useUpdatePackageMutation();
  const deletePkg = useDeletePackageMutation();

  const subscriptions = subscriptionsData || [];
  const packages = packagesData || [];

  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState<"users" | "packages">("users");

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"view" | "edit">("view");
  const [selectedSub, setSelectedSub] = useState<any>(null);
  
  // Form state for edit
  const [editForm, setEditForm] = useState<any>(null);

  const handleOpenModal = (sub: any, mode: "view" | "edit") => {
    setSelectedSub(sub);
    setModalMode(mode);
    setEditForm({ ...sub });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedSub(null);
    setEditForm(null);
  };

  const handleSaveEdit = async () => {
    if (editForm) {
      await updateUserSub.mutateAsync({
        id: editForm.id,
        data: {
          status: editForm.status,
          planName: editForm.plan?.planName || editForm.plan
        }
      });
    }
    handleCloseModal();
  };


  // Package Modal states
  const [isPkgModalOpen, setIsPkgModalOpen] = useState(false);
  const [pkgModalMode, setPkgModalMode] = useState<"add" | "edit">("add");
  const [selectedPkg, setSelectedPkg] = useState<any>(null);
  const [pkgForm, setPkgForm] = useState<any>({ name: "", price: "", duration: "", status: "Active", features: "" });

  const handleOpenPkgModal = (pkg: any = null, mode: "add" | "edit" = "add") => {
    setSelectedPkg(pkg);
    setPkgModalMode(mode);
    if (mode === "edit" && pkg) {
      setPkgForm({ ...pkg, features: pkg.features.join("\n") });
    } else {
      setPkgForm({ name: "", price: "", duration: "", status: "Active", features: "" });
    }
    setIsPkgModalOpen(true);
  };

  const handleClosePkgModal = () => {
    setIsPkgModalOpen(false);
    setSelectedPkg(null);
  };

  const handleSavePkg = async () => {
    const featuresList = pkgForm.features.split("\n").filter((f: string) => f.trim() !== "");
    const payload = {
      planName: pkgForm.planName,
      price: Number(pkgForm.price),
      durationMonths: Number(pkgForm.durationMonths),
      status: pkgForm.status
    };
    
    if (pkgModalMode === "add") {
      await createPkg.mutateAsync(payload);
    } else {
      await updatePkg.mutateAsync({ id: editForm.id || pkgForm.id, data: payload });
    }
    handleClosePkgModal();
  };

  const handleDeletePkg = async (id: number) => {
    if (confirm("Apakah Anda yakin ingin menghapus paket ini?")) {
      await deletePkg.mutateAsync(id);
    }
  };

  const filteredSubscriptions = subscriptions.filter((sub: any) => {
    const searchLower = searchTerm.toLowerCase();
    const nameMatch = sub.user?.name?.toLowerCase().includes(searchLower) || false;
    const emailMatch = sub.user?.email?.toLowerCase().includes(searchLower) || false;
    const idMatch = String(sub.id).includes(searchLower);
    return nameMatch || emailMatch || idMatch;
  });

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
                    <button onClick={() => handleOpenPkgModal(null, "add")} className="flex items-center justify-center gap-2 px-4 py-3 bg-primary text-white rounded-2xl text-sm font-bold hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20 w-full">
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
                  {filteredSubscriptions.map((sub: any) => (
                    <tr
                      key={sub.id}
                      className="border-b border-[var(--dashboard-border)] hover:bg-[var(--dashboard-bg)] transition-colors group"
                    >
                      <td className="py-5 px-4 text-sm font-extrabold text-[var(--dashboard-text)]">
                        SUB-{sub.id}
                      </td>
                      <td className="py-5 px-4">
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-[var(--dashboard-text)]">{sub.user?.name || "Unknown"}</span>
                          <span className="text-[10px] font-semibold text-on-surface-variant/60">{sub.user?.email || "-"}</span>
                        </div>
                      </td>
                      <td className="py-5 px-4">
                        {getPlanBadge(sub.plan?.planName || "-")}
                      </td>
                      <td className="py-5 px-4">
                        {getStatusBadge(sub.status || "active")}
                      </td>
                      <td className="py-5 px-4">
                        <div className="flex flex-col">
                          <span className="text-[11px] font-bold text-[var(--dashboard-text)]">{new Date(sub.startDate).toLocaleDateString()}</span>
                          <span className="text-[10px] font-semibold text-on-surface-variant/60">to {new Date(sub.dueDate).toLocaleDateString()}</span>
                        </div>
                      </td>
                      <td className="py-5 px-4 text-right">
                        <span className="text-sm font-black text-[var(--dashboard-text)]">Rp {sub.plan?.price?.toLocaleString() || 0}</span>
                      </td>
                      <td className="py-5 px-4 text-center">
                        <button 
                          onClick={() => handleOpenModal(sub, "view")}
                          className="p-2 rounded-xl text-primary hover:bg-primary/10 transition-colors" 
                          title="View Details"
                        >
                          <span className="material-symbols-outlined text-[20px]">visibility</span>
                        </button>
                        <button 
                          onClick={() => handleOpenModal(sub, "edit")}
                          className="p-2 rounded-xl text-on-surface-variant hover:bg-surface-variant transition-colors ml-1" 
                          title="Edit"
                        >
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
                {packages.map((pkg: any) => (
                  <div key={pkg.id} className="bg-[var(--dashboard-bg)] rounded-3xl p-6 border border-[var(--dashboard-border)] hover:border-primary/50 transition-colors group relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                      <button onClick={() => handleOpenPkgModal(pkg, "edit")} className="p-2 bg-[var(--dashboard-card-bg)] rounded-xl text-on-surface-variant hover:text-primary transition-colors shadow-sm" title="Edit">
                        <span className="material-symbols-outlined text-[18px]">edit</span>
                      </button>
                      <button onClick={() => handleDeletePkg(pkg.id)} className="p-2 bg-[var(--dashboard-card-bg)] rounded-xl text-on-surface-variant hover:text-rose-500 transition-colors shadow-sm" title="Delete">
                        <span className="material-symbols-outlined text-[18px]">delete</span>
                      </button>
                    </div>
                    
                    <div className="mb-4">
                      <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 mb-4 inline-block">{pkg.status || "active"}</span>
                      <h3 className="text-xl font-black text-[var(--dashboard-text)] uppercase">{pkg.planName}</h3>
                      <div className="flex items-end gap-1 mt-2">
                        <span className="text-2xl font-black text-[var(--dashboard-text)]">Rp {pkg.price?.toLocaleString()}</span>
                        <span className="text-xs font-bold text-on-surface-variant/70 mb-1">/ {pkg.durationMonths} Bulan</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* Modal */}
          {isModalOpen && selectedSub && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
              <div className="bg-[var(--dashboard-card-bg)] rounded-3xl p-6 md:p-8 shadow-2xl w-full max-w-md border border-[var(--dashboard-border)]">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-black text-[var(--dashboard-text)] uppercase tracking-tight">
                    {modalMode === "view" ? "Detail Langganan" : "Edit Langganan"}
                  </h2>
                  <button onClick={handleCloseModal} className="text-on-surface-variant hover:text-[var(--dashboard-text)] transition-colors">
                    <span className="material-symbols-outlined">close</span>
                  </button>
                </div>
                
                {modalMode === "view" ? (
                  <div className="space-y-4">
                    <div>
                      <label className="text-[10px] font-extrabold uppercase tracking-widest text-on-surface-variant/70">ID</label>
                      <p className="font-bold text-[var(--dashboard-text)]">{selectedSub.id}</p>
                    </div>
                    <div>
                      <label className="text-[10px] font-extrabold uppercase tracking-widest text-on-surface-variant/70">User</label>
                      <p className="font-bold text-[var(--dashboard-text)]">{selectedSub.userName}</p>
                      <p className="text-xs text-on-surface-variant">{selectedSub.email}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-[10px] font-extrabold uppercase tracking-widest text-on-surface-variant/70 mb-1 block">Plan</label>
                        {getPlanBadge(selectedSub.plan)}
                      </div>
                      <div>
                        <label className="text-[10px] font-extrabold uppercase tracking-widest text-on-surface-variant/70 mb-1 block">Status</label>
                        {getStatusBadge(selectedSub.status)}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-[10px] font-extrabold uppercase tracking-widest text-on-surface-variant/70">Start Date</label>
                        <p className="font-bold text-[var(--dashboard-text)]">{selectedSub.startDate}</p>
                      </div>
                      <div>
                        <label className="text-[10px] font-extrabold uppercase tracking-widest text-on-surface-variant/70">End Date</label>
                        <p className="font-bold text-[var(--dashboard-text)]">{selectedSub.endDate}</p>
                      </div>
                    </div>
                    <div>
                      <label className="text-[10px] font-extrabold uppercase tracking-widest text-on-surface-variant/70">Amount</label>
                      <p className="font-black text-xl text-[var(--dashboard-text)]">{selectedSub.amount}</p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <label className="text-xs font-bold text-on-surface-variant mb-1 block">Plan Name</label>
                      <select 
                        value={editForm.plan?.planName || editForm.plan}
                        onChange={(e) => setEditForm({...editForm, plan: e.target.value})}
                        className="w-full p-3 bg-[var(--dashboard-bg)] border border-[var(--dashboard-border)] rounded-xl text-sm font-semibold text-[var(--dashboard-text)] focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        <option value="pasien">Pasien</option>
                        <option value="dokter">Dokter</option>
                        <option value="peneliti">Peneliti</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs font-bold text-on-surface-variant mb-1 block">Status</label>
                      <select 
                        value={editForm.status}
                        onChange={(e) => setEditForm({...editForm, status: e.target.value})}
                        className="w-full p-3 bg-[var(--dashboard-bg)] border border-[var(--dashboard-border)] rounded-xl text-sm font-semibold text-[var(--dashboard-text)] focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        <option value="Active">Active</option>
                        <option value="Pending">Pending</option>
                        <option value="Expired">Expired</option>
                      </select>
                    </div>

                    <div className="flex justify-end gap-3 mt-6">
                      <button onClick={handleCloseModal} className="px-4 py-2 rounded-xl text-sm font-bold text-on-surface-variant hover:bg-surface-variant transition-colors">
                        Batal
                      </button>
                      <button onClick={handleSaveEdit} className="px-4 py-2 bg-primary text-white rounded-xl text-sm font-bold hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20">
                        Simpan
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Package Modal */}
          {isPkgModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
              <div className="bg-[var(--dashboard-card-bg)] rounded-3xl p-6 md:p-8 shadow-2xl w-full max-w-md border border-[var(--dashboard-border)]">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-black text-[var(--dashboard-text)] uppercase tracking-tight">
                    {pkgModalMode === "add" ? "Tambah Paket Baru" : "Edit Paket"}
                  </h2>
                  <button onClick={handleClosePkgModal} className="text-on-surface-variant hover:text-[var(--dashboard-text)] transition-colors">
                    <span className="material-symbols-outlined">close</span>
                  </button>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-bold text-on-surface-variant mb-1 block">Nama Paket</label>
                    <input 
                      type="text"
                      value={pkgForm.planName}
                      onChange={(e) => setPkgForm({...pkgForm, planName: e.target.value})}
                      placeholder="e.g. Pasien, Dokter"
                      className="w-full p-3 bg-[var(--dashboard-bg)] border border-[var(--dashboard-border)] rounded-xl text-sm font-semibold text-[var(--dashboard-text)] focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-on-surface-variant mb-1 block">Harga (Rp)</label>
                      <input 
                        type="number"
                        value={pkgForm.price}
                        onChange={(e) => setPkgForm({...pkgForm, price: e.target.value})}
                        placeholder="e.g. 50000"
                        className="w-full p-3 bg-[var(--dashboard-bg)] border border-[var(--dashboard-border)] rounded-xl text-sm font-semibold text-[var(--dashboard-text)] focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-on-surface-variant mb-1 block">Durasi (Bulan)</label>
                      <input 
                        type="number"
                        value={pkgForm.durationMonths}
                        onChange={(e) => setPkgForm({...pkgForm, durationMonths: e.target.value})}
                        placeholder="e.g. 1"
                        className="w-full p-3 bg-[var(--dashboard-bg)] border border-[var(--dashboard-border)] rounded-xl text-sm font-semibold text-[var(--dashboard-text)] focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-on-surface-variant mb-1 block">Status</label>
                    <select 
                      value={pkgForm.status}
                      onChange={(e) => setPkgForm({...pkgForm, status: e.target.value})}
                      className="w-full p-3 bg-[var(--dashboard-bg)] border border-[var(--dashboard-border)] rounded-xl text-sm font-semibold text-[var(--dashboard-text)] focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>
                  <div className="flex justify-end gap-3 mt-6">
                    <button onClick={handleClosePkgModal} className="px-4 py-2 rounded-xl text-sm font-bold text-on-surface-variant hover:bg-surface-variant transition-colors">
                      Batal
                    </button>
                    <button onClick={handleSavePkg} className="px-4 py-2 bg-primary text-white rounded-xl text-sm font-bold hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20">
                      Simpan
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <MobileNav activePage="admin-subscriptions" />
    </div>
  );
}
