"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Sidebar from "@/app/components/Sidebar";
import DashboardHeader from "@/app/components/DashboardHeader";
import MobileNav from "@/app/components/MobileNav";
import "../../dashboard/dashboard.css";
import { useGetHistoryByIdQuery } from "@/features/history/api/history.api";

export default function HistoryDetailPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const params = useParams();
  const router = useRouter();
  const id = Number(params.id);

  const { data: historyRes, isLoading, isError } = useGetHistoryByIdQuery(id);
  const scanData = historyRes?.data;

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("id-ID", {
        weekday: "long",
        day: "2-digit",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      }) + " WIB";
    } catch {
      return dateString;
    }
  };

  if (isLoading) {
    return (
      <div className="bg-[var(--dashboard-bg)] text-[var(--dashboard-text)] antialiased min-h-screen transition-colors duration-300">
        <DashboardHeader isSidebarOpen={isSidebarOpen} onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
        <Sidebar activePage="history" isOpen={isSidebarOpen} />
        <MobileNav activePage="history" />
        <main className={`transition-all duration-500 pt-20 px-4 sm:px-6 md:px-10 pb-32 lg:pb-12 min-h-screen ${isSidebarOpen ? "lg:ml-64" : "lg:ml-0"}`}>
          <div className="max-w-5xl mx-auto mt-10">
            <div className="animate-pulse space-y-8">
              <div className="h-8 w-1/3 bg-slate-200 dark:bg-slate-800 rounded"></div>
              <div className="h-64 w-full bg-slate-200 dark:bg-slate-800 rounded-2xl"></div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (isError || !scanData) {
    return (
      <div className="bg-[var(--dashboard-bg)] text-[var(--dashboard-text)] antialiased min-h-screen transition-colors duration-300">
        <DashboardHeader isSidebarOpen={isSidebarOpen} onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
        <Sidebar activePage="history" isOpen={isSidebarOpen} />
        <MobileNav activePage="history" />
        <main className={`transition-all duration-500 pt-20 px-4 sm:px-6 md:px-10 pb-32 lg:pb-12 min-h-screen ${isSidebarOpen ? "lg:ml-64" : "lg:ml-0"}`}>
          <div className="max-w-4xl mx-auto mt-10 text-center">
            <h2 className="text-xl font-medium mb-4">Laporan Tidak Ditemukan</h2>
            <button onClick={() => router.back()} className="text-primary hover:underline">
              Kembali ke Riwayat
            </button>
          </div>
        </main>
      </div>
    );
  }

  // Extract solutions safely
  const solutions = scanData.acneProblemSolutions?.[0]?.acneSolution;
  const goodIngredients = solutions?.goodIngredient || [];
  const badIngredients = solutions?.badIngredient || [];
  const habits = solutions?.habits || [];
  const treatments = solutions?.treatments || [];
  const predictions = scanData.predictions || [];

  return (
    <div className="bg-[var(--dashboard-bg)] text-[var(--dashboard-text)] antialiased overflow-x-hidden font-manrope min-h-screen transition-colors duration-300">
      <DashboardHeader 
        isSidebarOpen={isSidebarOpen} 
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} 
      />
      <Sidebar activePage="history" isOpen={isSidebarOpen} />
      <MobileNav activePage="history" />

      <main className={`transition-all duration-500 pt-20 px-4 sm:px-6 md:px-10 pb-32 lg:pb-12 min-h-screen ${isSidebarOpen ? "lg:ml-64" : "lg:ml-0"} dashboard-animate-in`}>
        <div className="max-w-5xl mx-auto">
          
          {/* Minimalist Header */}
          <div className="mb-10 flex items-center gap-4">
            <button 
              onClick={() => router.back()}
              className="w-10 h-10 flex items-center justify-center text-[var(--dashboard-text-secondary)] hover:text-[var(--dashboard-text)] transition-colors"
            >
              <span className="material-symbols-outlined text-xl">arrow_back</span>
            </button>
            <div>
              <p className="text-xs text-[var(--dashboard-text-secondary)] mb-1">
                {formatDate(scanData.createdAt)}
              </p>
              <h1 className="text-2xl font-bold text-[var(--dashboard-text)] tracking-tight">
                Laporan #{scanData.id}
              </h1>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
            
            {/* Left Column - Image & Primary Result */}
            <div className="lg:col-span-5 space-y-8">
              
              <div className="relative rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-900 aspect-[4/5]">
                <img
                  src={scanData.citra}
                  alt={`Scan ${scanData.name}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm text-white px-3 py-1 rounded-md text-xs font-medium tracking-wide">
                  {scanData.name}
                </div>
              </div>

              {/* Minimalist Predictions */}
              <div>
                <h3 className="text-lg font-semibold mb-4 text-[var(--dashboard-text)]">Hasil Analisis</h3>
                <div className="space-y-4">
                  {predictions.map((pred: any, idx: number) => {
                    const percentNum = parseFloat(pred.persentase) || 0;
                    return (
                      <div key={idx} className="relative">
                        <div className="flex justify-between items-center mb-1.5">
                          <span className="text-sm text-[var(--dashboard-text)]">{pred.label}</span>
                          <span className="text-xs font-medium text-[var(--dashboard-text-secondary)]">
                            {pred.persentase}
                          </span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full transition-all duration-1000 ${idx === 0 ? 'bg-primary' : 'bg-slate-400 dark:bg-slate-600'}`}
                            style={{ width: `${Math.min(100, Math.max(0, percentNum))}%` }}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* Right Column - Details */}
            <div className="lg:col-span-7">
              {!solutions ? (
                <div className="py-12 text-center">
                  <p className="text-[var(--dashboard-text-secondary)] text-sm">Tidak ada rekomendasi spesifik untuk analisis ini.</p>
                </div>
              ) : (
                <div className="space-y-12">
                  
                  {/* Ingredients */}
                  <section>
                    <h3 className="text-lg font-semibold text-[var(--dashboard-text)] border-b border-[var(--dashboard-border)] pb-3 mb-6">
                      Kandungan Skincare
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <h4 className="flex items-center gap-2 text-sm font-medium text-green-600 dark:text-green-400 mb-4">
                          <span className="material-symbols-outlined text-sm">check</span>
                          Disarankan
                        </h4>
                        <ul className="space-y-3">
                          {goodIngredients.map((ing: any, i: number) => (
                            <li key={i} className="text-sm text-[var(--dashboard-text-secondary)] pl-6 relative">
                              <span className="absolute left-0 top-1.5 w-1.5 h-1.5 rounded-full bg-green-500/50"></span>
                              {ing.name}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="flex items-center gap-2 text-sm font-medium text-red-600 dark:text-red-400 mb-4">
                          <span className="material-symbols-outlined text-sm">close</span>
                          Dihindari
                        </h4>
                        <ul className="space-y-3">
                          {badIngredients.map((ing: any, i: number) => (
                            <li key={i} className="text-sm text-[var(--dashboard-text-secondary)] pl-6 relative">
                              <span className="absolute left-0 top-1.5 w-1.5 h-1.5 rounded-full bg-red-500/50"></span>
                              {ing.name}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </section>

                  {/* Treatments */}
                  <section>
                    <h3 className="text-lg font-semibold text-[var(--dashboard-text)] border-b border-[var(--dashboard-border)] pb-3 mb-6">
                      Rutinitas Perawatan
                    </h3>
                    <div className="space-y-6">
                      {treatments.map((treat: any, i: number) => (
                        <div key={i} className="flex gap-4">
                          <div className="shrink-0 w-20 text-xs font-medium text-[var(--dashboard-text-secondary)] pt-0.5">
                            {treat.time}
                          </div>
                          <p className="text-sm text-[var(--dashboard-text)] leading-relaxed">
                            {treat.name}
                          </p>
                        </div>
                      ))}
                    </div>
                  </section>

                  {/* Habits */}
                  <section>
                    <h3 className="text-lg font-semibold text-[var(--dashboard-text)] border-b border-[var(--dashboard-border)] pb-3 mb-6">
                      Kebiasaan Baik
                    </h3>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {habits.map((habit: any, i: number) => (
                        <li key={i} className="text-sm text-[var(--dashboard-text-secondary)] flex gap-3">
                          <span className="material-symbols-outlined text-sm text-[var(--dashboard-text-secondary)]/50 mt-0.5">fiber_manual_record</span>
                          <span>{habit.name}</span>
                        </li>
                      ))}
                    </ul>
                  </section>

                </div>
              )}
            </div>
            
          </div>
        </div>
      </main>
    </div>
  );
}
