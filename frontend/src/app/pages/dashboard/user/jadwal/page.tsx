"use client";

import { useState, useEffect } from "react";
import Sidebar from "@/app/components/Sidebar";
import DashboardHeader from "@/app/components/DashboardHeader";
import MobileNav from "@/app/components/MobileNav";
import {
  useGetTreatmentsQuery,
  useCreateTreatmentMutation,
  useUpdateTreatmentMutation,
  useDeleteTreatmentMutation,
  useGetHabitsQuery,
  useCreateHabitMutation,
  useUpdateHabitMutation,
  useDeleteHabitMutation,
} from "@/features/jadwal/api/jadwal.api";
import { useProfile } from "@/features/auth/api/profile.api";
import { JadwalTreatment, JadwalHabit } from "@/features/jadwal/types";
import { format, parseISO } from "date-fns";
import { id as localeID } from "date-fns/locale";

export default function JadwalPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState<"treatment" | "habit">("treatment");

  // Queries
  const { data: profile } = useProfile();
  const { data: treatments = [], isLoading: loadingTreatments } = useGetTreatmentsQuery();
  const { data: habits = [], isLoading: loadingHabits } = useGetHabitsQuery();

  const activeSub = profile?.userSubscriptions?.[0];
  const maxTodoCards = activeSub?.plan?.maxTodoCards ?? '∞';
  const currentTotalTodos = treatments.length + habits.length;
  const isLimitReached = typeof maxTodoCards === 'number' && currentTotalTodos >= maxTodoCards;

  // Mutations
  const createTreatment = useCreateTreatmentMutation();
  const updateTreatment = useUpdateTreatmentMutation();
  const deleteTreatment = useDeleteTreatmentMutation();

  const createHabit = useCreateHabitMutation();
  const updateHabit = useUpdateHabitMutation();
  const deleteHabit = useDeleteHabitMutation();

  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<"treatment" | "habit">("treatment");
  const [editId, setEditId] = useState<string | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<{ id: string; type: "treatment" | "habit" } | null>(null);

  // Toast State
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => setToastMessage(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  // Form State
  const [formData, setFormData] = useState({
    nama: "",
    tempat: "",
    hari: "",
    jam: "",
    pengingat: "",
  });

  const handleOpenModal = (type: "treatment" | "habit", item?: any) => {
    setModalType(type);
    if (item) {
      setEditId(item.id);
      if (type === "treatment") {
        setFormData({
          nama: item.nama,
          tempat: item.tempat,
          hari: item.hari ? new Date(item.hari).toISOString().slice(0, 16) : "",
          jam: "",
          pengingat: item.pengingat ? new Date(item.pengingat).toISOString().slice(0, 16) : "",
        });
      } else {
        setFormData({
          nama: item.nama,
          tempat: "",
          hari: item.hari,
          jam: item.jam,
          pengingat: item.pengingat,
        });
      }
    } else {
      setEditId(null);
      setFormData({ nama: "", tempat: "", hari: "", jam: "", pengingat: "" });
    }
    setShowModal(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (modalType === "treatment") {
      const payload = {
        nama: formData.nama,
        tempat: formData.tempat,
        hari: new Date(formData.hari).toISOString(),
        pengingat: formData.pengingat ? new Date(formData.pengingat).toISOString() : undefined,
      };
      if (editId) {
        updateTreatment.mutate({ id: editId, data: payload }, { onSuccess: () => setShowModal(false) });
      } else {
        createTreatment.mutate(payload as any, { onSuccess: () => setShowModal(false) });
      }
    } else {
      const payload = {
        nama: formData.nama,
        hari: formData.hari,
        jam: formData.jam,
        pengingat: formData.pengingat || undefined,
      };
      if (editId) {
        updateHabit.mutate({ id: editId, data: payload }, { onSuccess: () => setShowModal(false) });
      } else {
        createHabit.mutate(payload, { onSuccess: () => setShowModal(false) });
      }
    }
  };

  const handleDelete = (id: string, type: "treatment" | "habit") => {
    setItemToDelete({ id, type });
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (itemToDelete) {
      if (itemToDelete.type === "treatment") {
        deleteTreatment.mutate(itemToDelete.id, {
          onSuccess: () => {
            setShowDeleteModal(false);
            setToastMessage("Jadwal treatment berhasil dihapus!");
          }
        });
      } else {
        deleteHabit.mutate(itemToDelete.id, {
          onSuccess: () => {
            setShowDeleteModal(false);
            setToastMessage("Jadwal habit berhasil dihapus!");
          }
        });
      }
    }
  };

  return (
    <div className="bg-[var(--dashboard-bg)] text-[var(--dashboard-text)] antialiased min-h-screen font-manrope transition-colors duration-300">

      <main >
        <div className="max-w-5xl mx-auto flex flex-col gap-8">

          {/* Header & Tabs */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mt-4">
            <div>
              <h1 className="text-3xl font-black tracking-tight text-[var(--dashboard-text)]">Jadwal Perawatan</h1>
              <p className="text-on-surface-variant font-medium mt-1 text-sm">Kelola jadwal treatment klinik dan habit skincare Anda.</p>
            </div>

            <div className="flex bg-[var(--dashboard-card-bg)] p-1 rounded-xl border border-[var(--dashboard-border)] shadow-sm self-start">
              <button
                onClick={() => setActiveTab("treatment")}
                className={`px-6 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${activeTab === "treatment"
                  ? "bg-primary text-on-primary shadow-md"
                  : "text-on-surface-variant hover:bg-surface-variant"
                  }`}
              >
                Treatment
              </button>
              <button
                onClick={() => setActiveTab("habit")}
                className={`px-6 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${activeTab === "habit"
                  ? "bg-primary text-on-primary shadow-md"
                  : "text-on-surface-variant hover:bg-surface-variant"
                  }`}
              >
                Habit
              </button>
            </div>
          </div>

          {/* Action Button & Limit Info */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 self-start">
            <button
              onClick={() => {
                if (isLimitReached) {
                  setToastMessage(`Batas maksimal kartu Jadwal (${maxTodoCards}) telah tercapai.`);
                  return;
                }
                handleOpenModal(activeTab);
              }}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold shadow-lg transition-all transform cursor-pointer ${
                isLimitReached 
                  ? "bg-surface-variant text-on-surface-variant/50 cursor-not-allowed hover:shadow-none" 
                  : "bg-primary text-on-primary shadow-[0_8px_20px_rgba(var(--primary-rgb),0.3)] hover:shadow-[0_10px_25px_rgba(var(--primary-rgb),0.4)] hover:-translate-y-0.5"
              }`}
            >
              <span className="material-symbols-outlined text-sm">add</span>
              Tambah {activeTab === "treatment" ? "Treatment" : "Habit"}
            </button>
            
            <div className="flex items-center gap-2 bg-[var(--dashboard-card-bg)] px-4 py-2.5 rounded-full border border-[var(--dashboard-border)] shadow-sm">
              <span className="material-symbols-outlined text-primary text-sm">analytics</span>
              <span className="text-xs font-bold text-on-surface-variant tracking-wider uppercase">
                Penggunaan Kartu: <span className={`ml-1 font-black ${isLimitReached ? 'text-red-500' : 'text-[var(--dashboard-text)]'}`}>{currentTotalTodos}</span> / {maxTodoCards > 1000 ? 'Unlimited' : maxTodoCards}
              </span>
            </div>
          </div>

          {/* Content Area */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activeTab === "treatment" ? (
              loadingTreatments ? (
                <div className="col-span-full py-10 text-center text-on-surface-variant font-bold">Memuat data...</div>
              ) : treatments.length === 0 ? (
                <div className="col-span-full bg-[var(--dashboard-card-bg)] rounded-2xl p-10 text-center border border-dashed border-[var(--dashboard-border)]">
                  <span className="material-symbols-outlined text-4xl text-on-surface-variant/50 mb-3">calendar_month</span>
                  <p className="text-on-surface-variant font-bold">Belum ada jadwal treatment.</p>
                </div>
              ) : (
                treatments.map((t: JadwalTreatment) => (
                  <div key={t.id} className="bg-[var(--dashboard-card-bg)] border border-[var(--dashboard-border)] p-5 rounded-2xl shadow-sm hover:shadow-md transition-shadow relative group">
                    <div className="absolute top-4 right-4 flex opacity-0 group-hover:opacity-100 transition-opacity bg-[var(--dashboard-bg)] rounded-lg shadow-sm overflow-hidden">
                      <button onClick={() => handleOpenModal("treatment", t)} className="p-2 text-primary hover:bg-primary/10 transition-colors">
                        <span className="material-symbols-outlined text-[18px]">edit</span>
                      </button>
                      <button onClick={() => handleDelete(t.id, "treatment")} className="p-2 text-red-500 hover:bg-red-500/10 transition-colors">
                        <span className="material-symbols-outlined text-[18px]">delete</span>
                      </button>
                    </div>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500">
                        <span className="material-symbols-outlined">vaccines</span>
                      </div>
                      <div>
                        <h3 className="font-extrabold text-[var(--dashboard-text)]">{t.nama}</h3>
                        <p className="text-xs text-on-surface-variant font-semibold">{t.tempat}</p>
                      </div>
                    </div>
                    <div className="bg-[var(--dashboard-bg)] p-3 rounded-xl mt-4">
                      <div className="flex items-center gap-2 text-sm font-semibold text-[var(--dashboard-text)]">
                        <span className="material-symbols-outlined text-[16px] text-primary">event</span>
                        {format(parseISO(t.hari), "dd MMMM yyyy, HH:mm", { locale: localeID })}
                      </div>
                      {t.pengingat && (
                        <div className="flex items-center gap-2 text-xs font-medium text-on-surface-variant mt-2">
                          <span className="material-symbols-outlined text-[14px]">notifications</span>
                          Pengingat: {format(parseISO(t.pengingat), "dd MMM yyyy, HH:mm", { locale: localeID })}
                        </div>
                      )}
                    </div>
                  </div>
                ))
              )
            ) : (
              loadingHabits ? (
                <div className="col-span-full py-10 text-center text-on-surface-variant font-bold">Memuat data...</div>
              ) : habits.length === 0 ? (
                <div className="col-span-full bg-[var(--dashboard-card-bg)] rounded-2xl p-10 text-center border border-dashed border-[var(--dashboard-border)]">
                  <span className="material-symbols-outlined text-4xl text-on-surface-variant/50 mb-3">routine</span>
                  <p className="text-on-surface-variant font-bold">Belum ada jadwal habit.</p>
                </div>
              ) : (
                habits.map((h: JadwalHabit) => (
                  <div key={h.id} className="bg-[var(--dashboard-card-bg)] border border-[var(--dashboard-border)] p-5 rounded-2xl shadow-sm hover:shadow-md transition-shadow relative group">
                    <div className="absolute top-4 right-4 flex opacity-0 group-hover:opacity-100 transition-opacity bg-[var(--dashboard-bg)] rounded-lg shadow-sm overflow-hidden">
                      <button onClick={() => handleOpenModal("habit", h)} className="p-2 text-primary hover:bg-primary/10 transition-colors">
                        <span className="material-symbols-outlined text-[18px]">edit</span>
                      </button>
                      <button onClick={() => handleDelete(h.id, "habit")} className="p-2 text-red-500 hover:bg-red-500/10 transition-colors">
                        <span className="material-symbols-outlined text-[18px]">delete</span>
                      </button>
                    </div>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                        <span className="material-symbols-outlined">spa</span>
                      </div>
                      <div>
                        <h3 className="font-extrabold text-[var(--dashboard-text)]">{h.nama}</h3>
                        <p className="text-xs text-on-surface-variant font-semibold uppercase tracking-widest">{h.hari}</p>
                      </div>
                    </div>
                    <div className="bg-[var(--dashboard-bg)] p-3 rounded-xl mt-4 flex gap-6">
                      <div className="flex items-center gap-2 text-sm font-semibold text-[var(--dashboard-text)]">
                        <span className="material-symbols-outlined text-[16px] text-primary">schedule</span>
                        {h.jam}
                      </div>
                      {h.pengingat && (
                        <div className="flex items-center gap-2 text-xs font-medium text-on-surface-variant">
                          <span className="material-symbols-outlined text-[14px]">notifications</span>
                          {h.pengingat}
                        </div>
                      )}
                    </div>
                  </div>
                ))
              )
            )}
          </div>
        </div>
      </main>

      <MobileNav activePage="jadwal" />

      {/* Modal CRUD */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[var(--dashboard-card-bg)] border border-[var(--dashboard-border)] rounded-3xl p-6 md:p-8 max-w-md w-full mx-4 shadow-2xl flex flex-col animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-extrabold text-[var(--dashboard-text)] tracking-tight">
                {editId ? "Edit" : "Tambah"} {modalType === "treatment" ? "Treatment" : "Habit"}
              </h3>
              <button onClick={() => setShowModal(false)} className="text-on-surface-variant hover:text-[var(--dashboard-text)] cursor-pointer">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {modalType === "treatment" ? (
                <>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Nama Treatment</label>
                    <input required type="text" value={formData.nama} onChange={(e) => setFormData({ ...formData, nama: e.target.value })} placeholder="Contoh: Facial Peeling" className="bg-[var(--dashboard-bg)] border border-[var(--dashboard-border)] rounded-xl px-4 py-3 text-sm text-[var(--dashboard-text)] focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Tempat</label>
                    <input required type="text" value={formData.tempat} onChange={(e) => setFormData({ ...formData, tempat: e.target.value })} placeholder="Contoh: Klinik Estetika" className="bg-[var(--dashboard-bg)] border border-[var(--dashboard-border)] rounded-xl px-4 py-3 text-sm text-[var(--dashboard-text)] focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Tanggal & Waktu</label>
                    <input required type="datetime-local" style={{ colorScheme: "dark" }} value={formData.hari} onChange={(e) => setFormData({ ...formData, hari: e.target.value })} className="bg-[var(--dashboard-bg)] border border-[var(--dashboard-border)] rounded-xl px-4 py-3 text-sm text-[var(--dashboard-text)] focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Pengingat</label>
                    <input type="datetime-local" style={{ colorScheme: "dark" }} value={formData.pengingat} onChange={(e) => setFormData({ ...formData, pengingat: e.target.value })} className="bg-[var(--dashboard-bg)] border border-[var(--dashboard-border)] rounded-xl px-4 py-3 text-sm text-[var(--dashboard-text)] focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" />
                    <span className="text-[10px] text-on-surface-variant/70">Kosongkan untuk pengingat otomatis (1 hari sebelum)</span>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Nama Habit</label>
                    <input required type="text" value={formData.nama} onChange={(e) => setFormData({ ...formData, nama: e.target.value })} placeholder="Contoh: Cuci Muka Malam" className="bg-[var(--dashboard-bg)] border border-[var(--dashboard-border)] rounded-xl px-4 py-3 text-sm text-[var(--dashboard-text)] focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Hari</label>
                    <input required type="text" value={formData.hari} onChange={(e) => setFormData({ ...formData, hari: e.target.value })} placeholder="Contoh: Senin / Setiap Hari" className="bg-[var(--dashboard-bg)] border border-[var(--dashboard-border)] rounded-xl px-4 py-3 text-sm text-[var(--dashboard-text)] focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Jam Pelaksanaan</label>
                    <input required type="time" style={{ colorScheme: "dark" }} value={formData.jam} onChange={(e) => setFormData({ ...formData, jam: e.target.value })} className="bg-[var(--dashboard-bg)] border border-[var(--dashboard-border)] rounded-xl px-4 py-3 text-sm text-[var(--dashboard-text)] focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Jam Pengingat</label>
                    <input type="time" style={{ colorScheme: "dark" }} value={formData.pengingat} onChange={(e) => setFormData({ ...formData, pengingat: e.target.value })} className="bg-[var(--dashboard-bg)] border border-[var(--dashboard-border)] rounded-xl px-4 py-3 text-sm text-[var(--dashboard-text)] focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" />
                    <span className="text-[10px] text-on-surface-variant/70">Kosongkan untuk pengingat otomatis (1 jam sebelum)</span>
                  </div>
                </>
              )}

              <div className="flex gap-3 mt-4 pt-4 border-t border-[var(--dashboard-border)]">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 py-3 rounded-xl font-bold bg-surface-variant text-on-surface hover:bg-surface-container-high transition-colors cursor-pointer">
                  Batal
                </button>
                <button type="submit" disabled={createTreatment.isPending || updateTreatment.isPending || createHabit.isPending || updateHabit.isPending} className="flex-1 py-3 rounded-xl font-bold bg-primary text-on-primary hover:bg-primary/90 shadow-md transition-all disabled:opacity-50 cursor-pointer">
                  Simpan Data
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Modal Hapus */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[var(--dashboard-card-bg)] border border-[var(--dashboard-sidebar-border)] rounded-3xl p-8 max-w-sm w-full mx-4 shadow-2xl flex flex-col items-center text-center animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 bg-red-100/10 rounded-full flex items-center justify-center text-red-500 mb-6">
              <span className="material-symbols-outlined text-3xl">delete_forever</span>
            </div>
            <h3 className="text-xl font-extrabold text-[var(--dashboard-text)] mb-2 tracking-tight">
              Hapus Jadwal?
            </h3>
            <p className="text-sm font-medium text-on-surface-variant/80 mb-8">
              Apakah Anda yakin ingin menghapus jadwal ini? Tindakan ini tidak dapat dibatalkan.
            </p>
            <div className="w-full grid grid-cols-2 gap-4">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="py-3 rounded-2xl font-bold bg-surface-variant text-on-surface hover:bg-surface-container-high transition-colors cursor-pointer"
                disabled={deleteTreatment.isPending || deleteHabit.isPending}
              >
                Batal
              </button>
              <button
                onClick={confirmDelete}
                className="py-3 rounded-2xl font-bold bg-red-500 text-white hover:bg-red-600 transition-colors disabled:opacity-50 cursor-pointer"
                disabled={deleteTreatment.isPending || deleteHabit.isPending}
              >
                {(deleteTreatment.isPending || deleteHabit.isPending) ? "Menghapus..." : "Ya, Hapus"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-[200] animate-in slide-in-from-bottom-5 fade-in duration-300">
          <div className="bg-emerald-500 text-white px-6 py-4 rounded-2xl shadow-xl flex items-center gap-3 font-bold text-sm border border-emerald-400">
            <span className="material-symbols-outlined">check_circle</span>
            {toastMessage}
          </div>
        </div>
      )}
    </div>
  );
}
