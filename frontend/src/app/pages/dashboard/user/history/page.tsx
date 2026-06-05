"use client";

import Link from "next/link";
import { useState } from "react";
import MobileNav from "@/app/components/MobileNav";

import { useGetHistoryQuery, useDeleteHistoryMutation } from "@/features/history/api/history.api";

const SkeletonCard = () => (
  <div className="bg-[var(--dashboard-card-bg)] rounded-[2rem] p-6 md:p-8 border border-[var(--dashboard-border)] animate-pulse space-y-6">
    <div className="flex justify-between items-start">
      <div className="w-20 h-20 rounded-xl bg-slate-200 dark:bg-slate-800"></div>
      <div className="w-20 h-6 rounded-full bg-slate-200 dark:bg-slate-800"></div>
    </div>
    <div className="space-y-4">
      <div className="h-4 w-1/3 bg-slate-200 dark:bg-slate-800 rounded"></div>
      <div className="h-6 w-2/3 bg-slate-200 dark:bg-slate-800 rounded"></div>
      <div className="h-4 w-1/2 bg-slate-200 dark:bg-slate-800 rounded"></div>
    </div>
    <div className="pt-6 border-t border-[var(--dashboard-border)] flex justify-between items-center">
      <div className="h-4 w-20 bg-slate-200 dark:bg-slate-800 rounded"></div>
      <div className="h-6 w-6 bg-slate-200 dark:bg-slate-800 rounded-full"></div>
    </div>
  </div>
);

export default function HistoryPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  // Custom Modal configuration state
  const [modalConfig, setModalConfig] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    type: "success" | "error" | "info" | "confirm";
    onConfirm?: () => void;
  }>({
    isOpen: false,
    title: "",
    message: "",
    type: "info"
  });

  // Real-time API query
  const { data: historyRes, isLoading, isError } = useGetHistoryQuery();
  const deleteMutation = useDeleteHistoryMutation();

  const listHistory = historyRes?.data || [];

  // Filter list by acne name or ID
  const filteredHistory = listHistory.filter((scan: any) => {
    const nameMatch = scan.name?.toLowerCase().includes(searchQuery.toLowerCase());
    const idMatch = `#DS-${scan.id}`.includes(searchQuery);
    return nameMatch || idMatch;
  });

  const handleDelete = (id: number) => {
    setModalConfig({
      isOpen: true,
      title: "Hapus Riwayat?",
      message: "Apakah Anda yakin ingin menghapus riwayat pemindaian ini? Tindakan ini tidak dapat dibatalkan.",
      type: "confirm",
      onConfirm: async () => {
        // Close confirm modal and process mutation
        setModalConfig(prev => ({ ...prev, isOpen: false }));
        try {
          await deleteMutation.mutateAsync(id);
          setModalConfig({
            isOpen: true,
            title: "Berhasil Dihapus",
            message: "Riwayat pemindaian telah berhasil dihapus secara permanen.",
            type: "success"
          });
        } catch (err) {
          console.error("Gagal menghapus riwayat:", err);
          setModalConfig({
            isOpen: true,
            title: "Gagal Menghapus",
            message: "Maaf, terjadi kesalahan saat mencoba menghapus riwayat pemindaian.",
            type: "error"
          });
        }
      }
    });
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      }) + " WIB";
    } catch {
      return dateString;
    }
  };

  return (
    <div >
      <MobileNav activePage="history" />

      {/* Main Content */}

      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8 md:mb-12">
          <span className="uppercase tracking-[0.2em] text-primary font-extrabold text-[10px] md:text-xs">
            DermaScan Intelligence
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-[var(--dashboard-text)] mt-2 tracking-tight">
            Riwayat <span className="text-primary">Pemindaian</span>
          </h1>
          <p className="mt-4 text-[var(--dashboard-text-secondary)] max-w-2xl leading-relaxed text-sm md:text-base">
            Kelola dan tinjau hasil analisis dermatologi 3D Anda secara
            mendalam dengan akurasi klinis tinggi.
          </p>
        </div>

        {/* Search & Actions Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-8 md:mb-10">
          <div className="flex-grow max-w-md bg-[var(--dashboard-card-bg)] border border-[var(--dashboard-border)] rounded-full px-6 py-3 flex items-center gap-4 focus-within:ring-2 focus-within:ring-primary transition-all">
            <span className="material-symbols-outlined text-on-surface-variant">
              search
            </span>
            <input
              className="bg-transparent border-none focus:ring-0 w-full text-sm text-[var(--dashboard-text)] placeholder:text-on-surface-variant/50"
              placeholder="Cari ID atau nama jerawat..."
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-3">
            <Link href="/pages/scan">
              <button className="signature-gradient text-white px-8 py-3 rounded-full font-extrabold tracking-wide hover:scale-[0.98] active:scale-95 transition-all shadow-lg flex items-center justify-center gap-2 text-sm">
                <span className="material-symbols-outlined text-lg">add</span>
                Baru
              </button>
            </Link>
          </div>
        </div>

        {/* Error State */}
        {isError && (
          <div className="p-8 text-center bg-red-500/10 border border-red-500/20 text-red-500 rounded-3xl mb-8">
            <span className="material-symbols-outlined text-4xl mb-2">error</span>
            <p className="font-bold">Gagal memuat data riwayat pemindaian.</p>
            <p className="text-sm opacity-80 mt-1">Pastikan server backend Anda sedang berjalan.</p>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !isError && filteredHistory.length === 0 && (
          <div className="p-16 text-center bg-[var(--dashboard-card-bg)] border border-[var(--dashboard-border)] rounded-[2.5rem] flex flex-col items-center justify-center">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6">
              <span className="material-symbols-outlined text-4xl text-primary">history</span>
            </div>
            <h3 className="text-xl font-extrabold text-[var(--dashboard-text)] mb-2">Belum Ada Riwayat</h3>
            <p className="text-sm text-[var(--dashboard-text-secondary)] max-w-sm mb-8 leading-relaxed">
              Anda belum pernah melakukan pemindaian kulit atau pencarian tidak mencocokkan apa pun. Mulai pemindaian pertama Anda sekarang!
            </p>
            <Link href="/pages/scan">
              <button className="signature-gradient text-white px-8 py-3 rounded-full font-extrabold tracking-wide hover:scale-[0.98] active:scale-95 transition-all shadow-lg flex items-center justify-center gap-2 text-sm">
                Mulai Scan Baru
              </button>
            </Link>
          </div>
        )}

        {/* History Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
          {isLoading ? (
            // Skeleton Loading Grid
            Array.from({ length: 6 }).map((_, idx) => <SkeletonCard key={idx} />)
          ) : (
            // Dynamic History Cards
            filteredHistory.map((scan: any) => (
              <div
                key={scan.id}
                className="bg-[var(--dashboard-card-bg)] rounded-[2rem] p-6 md:p-8 shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-[var(--dashboard-border)] group transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-20 h-20 rounded-xl overflow-hidden bg-[var(--dashboard-bg)] border-2 border-[var(--dashboard-border)] shadow-sm">
                      <img
                        alt={`Analisis ${scan.name}`}
                        className="w-full h-full object-cover"
                        src={scan.citra}
                      />
                    </div>
                    <span className="bg-primary-container text-on-primary-container px-3 py-1 rounded-full text-[10px] font-extrabold tracking-widest uppercase">
                      {scan.name}
                    </span>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <p className="text-[10px] font-extrabold tracking-widest uppercase text-on-surface-variant mb-1">
                        ID Pemindaian
                      </p>
                      <p className="text-lg font-bold text-[var(--dashboard-text)]">
                        #DS-{scan.id}
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] font-extrabold tracking-widest uppercase text-on-surface-variant mb-1">
                        Tanggal Analisis
                      </p>
                      <p className="text-sm font-medium text-[var(--dashboard-text-secondary)]">
                        {formatDate(scan.createdAt)}
                      </p>
                    </div>
                  </div>

                  {/* Predictions Detailed Breakdown */}
                  {scan.predictions && Array.isArray(scan.predictions) && scan.predictions.length > 0 && (
                    <div className="mt-6 pt-4 border-t border-[var(--dashboard-border)]/50">
                      <p className="text-[10px] font-extrabold tracking-widest uppercase text-on-surface-variant mb-2">
                        Analisis Tingkat Akurasi
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {scan.predictions.slice(0, 3).map((pred: any, idx: number) => (
                          <span
                            key={idx}
                            className="px-2.5 py-1 bg-primary/10 text-primary text-[9px] font-bold rounded-lg border border-primary/20 uppercase tracking-wider"
                          >
                            {pred.label}: {pred.persentase}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-8 pt-6 border-t border-[var(--dashboard-border)] flex items-center justify-between">
                  <Link
                    href="/pages/scan"
                    className="text-primary font-extrabold text-[10px] md:text-xs uppercase tracking-widest hover:translate-x-1 transition-transform flex items-center gap-2"
                  >
                    Lihat Laporan
                    <span className="material-symbols-outlined text-sm">
                      arrow_forward
                    </span>
                  </Link>

                  {/* Delete Action Button */}
                  <button
                    onClick={() => handleDelete(scan.id)}
                    className="text-red-500 hover:text-red-700 transition-colors p-1.5 rounded-full hover:bg-red-50 dark:hover:bg-red-950/20"
                    title="Hapus Riwayat"
                  >
                    <span className="material-symbols-outlined text-lg">
                      delete
                    </span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>


      {/* Premium Custom Modal Popup */}
      {modalConfig.isOpen && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-[var(--dashboard-card-bg)] rounded-[32px] shadow-2xl max-w-md w-full overflow-hidden animate-in zoom-in-95 duration-300 border border-[var(--dashboard-border)]">
            <div className="p-8 flex flex-col items-center text-center">
              {/* Animated Icon based on modal type */}
              <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-6 ${modalConfig.type === "success" ? "bg-green-100 dark:bg-green-950/30 text-green-600 dark:text-green-400" :
                modalConfig.type === "error" ? "bg-red-100 dark:bg-red-950/30 text-red-600 dark:text-red-400" :
                  modalConfig.type === "confirm" ? "bg-amber-100 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400" :
                    "bg-blue-100 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400"
                }`}>
                <span className="material-symbols-outlined text-4xl">
                  {modalConfig.type === "success" ? "check_circle" :
                    modalConfig.type === "error" ? "error" :
                      modalConfig.type === "confirm" ? "help" : "info"}
                </span>
              </div>

              <h3 className="text-2xl font-black text-[var(--dashboard-text)] mb-2 tracking-tight">
                {modalConfig.title}
              </h3>

              <p className="text-sm text-[var(--dashboard-text-secondary)] font-medium leading-relaxed mb-8 px-4">
                {modalConfig.message}
              </p>

              {/* Interactive buttons based on type */}
              {modalConfig.type === "confirm" ? (
                <div className="flex gap-4 w-full">
                  <button
                    onClick={() => setModalConfig({ ...modalConfig, isOpen: false })}
                    className="flex-1 py-4 bg-slate-100 dark:bg-slate-800 text-[var(--dashboard-text-secondary)] rounded-2xl font-black text-sm hover:bg-slate-200 dark:hover:bg-slate-700 active:scale-95 transition-all uppercase tracking-widest"
                  >
                    Batal
                  </button>
                  <button
                    onClick={modalConfig.onConfirm}
                    disabled={deleteMutation.isPending}
                    className="flex-1 py-4 bg-red-500 text-white rounded-2xl font-black text-sm shadow-lg shadow-red-500/20 hover:bg-red-600 active:scale-95 transition-all uppercase tracking-widest"
                  >
                    Hapus
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setModalConfig({ ...modalConfig, isOpen: false })}
                  className={`w-full py-4 rounded-2xl font-black text-sm tracking-widest uppercase transition-all active:scale-95 ${modalConfig.type === "success" ? "bg-primary text-white shadow-lg shadow-primary/20 hover:bg-[#1c6d00]" :
                    modalConfig.type === "error" ? "bg-red-500 text-white shadow-lg shadow-red-500/20 hover:bg-red-600" :
                      "bg-slate-800 dark:bg-slate-700 text-white shadow-lg hover:bg-slate-900"
                    }`}
                >
                  Mengerti
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
