"use client";

import { useState } from "react";
import Sidebar from "@/app/components/Sidebar";
import DashboardHeader from "@/app/components/DashboardHeader";
import MobileNav from "@/app/components/MobileNav";
import "../../dashboard.css";
import {
  useAdminAcneSolutions,
  useDeleteAcneSolutionMutation,
} from "@/features/admin/api/admin.api";
import SolutionFormModal from "./SolutionFormModal";

export default function AdminAcneSolutions() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingData, setEditingData] = useState<any>(null);

  const { data: solutions, isLoading } = useAdminAcneSolutions();
  const deleteMutation = useDeleteAcneSolutionMutation();

  const handleAddNew = () => {
    setEditingData(null);
    setIsModalOpen(true);
  };

  const handleEdit = (solution: any) => {
    setEditingData(solution);
    setIsModalOpen(true);
  };

  const handleDelete = (id: number, type: string) => {
    if (
      confirm(
        `Apakah Anda yakin ingin menghapus rekomendasi jerawat "${type}"?`,
      )
    ) {
      deleteMutation.mutate(id);
    }
  };

  return (
    <div className="bg-[var(--dashboard-bg)] text-[var(--dashboard-text)] antialiased min-h-screen font-manrope transition-colors duration-300">
      <main>
        <div className="max-w-7xl mx-auto flex flex-col pb-32 md:pb-8">
          <div className="bg-[var(--dashboard-card-bg)] rounded-3xl p-6 md:p-8 shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-[var(--dashboard-border)] transition-colors duration-300">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
              <div>
                <h1 className="text-2xl font-black tracking-tight uppercase text-[var(--dashboard-text)]">
                  Master Data: Rekomendasi
                </h1>
                <p className="text-sm font-medium text-on-surface-variant/70 mt-1">
                  Kelola data Acne Solutions yang akan disarankan pada pengguna.
                </p>
              </div>
              <button
                onClick={handleAddNew}
                className="bg-primary text-on-primary font-bold px-6 py-3 rounded-xl hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-[20px]">
                  add
                </span>
                Tambah Data
              </button>
            </div>

            {isLoading ? (
              <div className="animate-pulse flex flex-col gap-4">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="h-24 bg-[var(--dashboard-border)] rounded-xl"
                  ></div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {solutions?.map((solution: any) => (
                  <div
                    key={solution.id}
                    className="bg-[var(--dashboard-bg)] border border-[var(--dashboard-border)] rounded-2xl p-5 hover:shadow-lg transition-all duration-300 group"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="w-12 h-12 rounded-xl bg-primary-container text-on-primary-container flex items-center justify-center">
                        <span className="material-symbols-outlined text-[24px]">
                          medical_services
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(solution)}
                          className="w-8 h-8 rounded-full bg-[var(--dashboard-border)] flex items-center justify-center text-on-surface-variant hover:text-blue-500 transition-colors"
                        >
                          <span className="material-symbols-outlined text-[16px]">
                            edit
                          </span>
                        </button>
                        <button
                          onClick={() =>
                            handleDelete(solution.id, solution.type)
                          }
                          disabled={deleteMutation.isPending}
                          className="w-8 h-8 rounded-full bg-[var(--dashboard-border)] flex items-center justify-center text-on-surface-variant hover:text-red-500 transition-colors disabled:opacity-50"
                        >
                          <span className="material-symbols-outlined text-[16px]">
                            delete
                          </span>
                        </button>
                      </div>
                    </div>
                    <h3 className="text-lg font-extrabold text-[var(--dashboard-text)] mb-2 capitalize">
                      {solution.type}
                    </h3>
                    <p className="text-xs text-[var(--dashboard-text-secondary)] line-clamp-3 mb-4 leading-relaxed">
                      {solution.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      <span className="px-2.5 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 rounded-md text-[9px] font-black uppercase tracking-wider">
                        {solution.goodIngredients?.length || 0} Good
                      </span>
                      <span className="px-2.5 py-1 bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-400 rounded-md text-[9px] font-black uppercase tracking-wider">
                        {solution.badIngredients?.length || 0} Bad
                      </span>
                      <span className="px-2.5 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-md text-[9px] font-black uppercase tracking-wider">
                        {solution.treatments?.length || 0} Actions
                      </span>
                    </div>
                  </div>
                ))}

                {(!solutions || solutions.length === 0) && (
                  <div className="col-span-full text-center py-12 text-on-surface-variant font-medium">
                    Tidak ada data Rekomendasi/Acne Solution.
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>

      <MobileNav activePage="admin-acne-solutions" />

      <SolutionFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        editingData={editingData}
      />
    </div>
  );
}
