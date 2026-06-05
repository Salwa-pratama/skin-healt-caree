"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Sidebar from "@/app/components/Sidebar";
import DashboardHeader from "@/app/components/DashboardHeader";
import MobileNav from "@/app/components/MobileNav";
import "../../../dashboard.css";
import { useGetHistoryByIdQuery } from "@/features/history/api/history.api";
import { toJpeg } from "html-to-image";
import jsPDF from "jspdf";

export default function HistoryDetailPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [toast, setToast] = useState<{show: boolean; message: string; type: 'success' | 'error'}>({ show: false, message: '', type: 'success' });
  const params = useParams();
  const router = useRouter();
  const id = Number(params.id);

  const { data: historyRes, isLoading, isError } = useGetHistoryByIdQuery(id);
  const scanData = historyRes?.data;

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return (
        date.toLocaleDateString("id-ID", {
          weekday: "long",
          day: "2-digit",
          month: "long",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }) + " WIB"
      );
    } catch {
      return dateString;
    }
  };

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast(prev => ({ ...prev, show: false })), 4000);
  };

  const playSuccessSound = () => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      
      oscillator.type = 'sine';
      // Pleasant chime sound (C5 to E5)
      oscillator.frequency.setValueAtTime(523.25, audioCtx.currentTime); 
      oscillator.frequency.exponentialRampToValueAtTime(659.25, audioCtx.currentTime + 0.1); 
      
      gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.3, audioCtx.currentTime + 0.05);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.5);
      
      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      
      oscillator.start();
      oscillator.stop(audioCtx.currentTime + 0.5);
    } catch (e) {
      console.log("Audio not supported", e);
    }
  };

  const handleDownloadPDF = async () => {
    // Target the specific formal PDF report layout instead of the dark mode dashboard
    const reportElement = document.getElementById("medical-report-pdf");
    if (!reportElement) return;

    try {
      const btn = document.getElementById("download-btn");
      if (btn) btn.innerHTML = '<span class="material-symbols-outlined text-lg animate-spin">refresh</span> Memproses...';

      // Temporarily bring the element to view behind everything so it gets painted
      reportElement.classList.remove("opacity-0");
      // Small delay to ensure browser paints the element
      await new Promise((resolve) => setTimeout(resolve, 150));

      // Use html-to-image which properly supports modern CSS like oklch/oklab
      const imgData = await toJpeg(reportElement, {
        quality: 1.0,
        backgroundColor: '#ffffff',
        pixelRatio: 2, // High resolution for text clarity
        style: {
          transform: 'scale(1)',
          transformOrigin: 'top left',
        }
      });
      const pdf = new jsPDF("p", "mm", "a4");

      const pdfWidth = pdf.internal.pageSize.getWidth();
      // Calculate height based on A4 proportions to fit exactly
      const pdfHeight = (reportElement.offsetHeight * pdfWidth) / reportElement.offsetWidth;

      pdf.addImage(imgData, "JPEG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`DermaScan_Report_DS-${scanData?.id || 'history'}.pdf`);
      
      if (btn) btn.innerHTML = '<span class="material-symbols-outlined text-lg">download</span> Unduh PDF';
      
      // Hide it again
      reportElement.classList.add("opacity-0");

      playSuccessSound();
      showToast("PDF Laporan Berhasil Diunduh!", "success");
    } catch (error: any) {
      console.error("Error generating PDF:", error);
      showToast("Gagal membuat PDF: " + (error.message || "Pastikan gambar termuat sempurna"), "error");
      const btn = document.getElementById("download-btn");
      if (btn) btn.innerHTML = '<span class="material-symbols-outlined text-lg">download</span> Unduh PDF';
      reportElement.classList.add("opacity-0");
    }
  };

  if (isLoading) {
    return (
      <div className="bg-[var(--dashboard-bg)] text-[var(--dashboard-text)] antialiased min-h-screen transition-colors duration-300">
        <MobileNav activePage="history" />
        <main
          className={`transition-all duration-500 pt-20 px-4 sm:px-6 md:px-10 pb-32 lg:pb-12 min-h-screen ${isSidebarOpen ? "lg:ml-64" : "lg:ml-0"}`}
        >
          <div className="max-w-5xl mx-auto mt-10">
            <div className="animate-pulse space-y-8">
              <div className="h-8 w-1/3 bg-slate-200 dark:bg-slate-800 rounded"></div>
              <div className="h-96 w-full bg-slate-200 dark:bg-slate-800 rounded-[2rem]"></div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (isError || !scanData) {
    return (
      <div className="bg-[var(--dashboard-bg)] text-[var(--dashboard-text)] antialiased min-h-screen transition-colors duration-300">
        <MobileNav activePage="history" />
        <main
          className={`transition-all duration-500 pt-20 px-4 sm:px-6 md:px-10 pb-32 lg:pb-12 min-h-screen ${isSidebarOpen ? "lg:ml-64" : "lg:ml-0"}`}
        >
          <div className="max-w-4xl mx-auto mt-20 text-center bg-[var(--dashboard-card-bg)] border border-[var(--dashboard-border)] rounded-[2.5rem] p-16 shadow-sm">
            <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="material-symbols-outlined text-4xl text-red-500">
                error
              </span>
            </div>
            <h2 className="text-2xl font-extrabold mb-4 text-[var(--dashboard-text)]">
              Laporan Tidak Ditemukan
            </h2>
            <p className="text-[var(--dashboard-text-secondary)] mb-8 max-w-md mx-auto">
              Maaf, laporan yang Anda cari tidak tersedia atau mungkin telah
              dihapus dari sistem.
            </p>
            <button
              onClick={() => router.back()}
              className="signature-gradient text-white px-8 py-3 rounded-full font-extrabold tracking-wide hover:scale-[0.98] active:scale-95 transition-all shadow-lg inline-flex items-center gap-2 text-sm"
            >
              <span className="material-symbols-outlined text-lg">
                arrow_back
              </span>
              Kembali ke Riwayat
            </button>
          </div>
        </main>
      </div>
    );
  }

  const solutions = scanData.acneProblemSolutions?.[0]?.acneSolution;
  const goodIngredients = solutions?.goodIngredient || [];
  const badIngredients = solutions?.badIngredient || [];
  const habits = solutions?.habits || [];
  const treatments = solutions?.treatments || [];
  const predictions = scanData.predictions || [];

  return (
    <div className="bg-[var(--dashboard-bg)] p-4 text-[var(--dashboard-text)] antialiased overflow-x-hidden font-manrope min-h-screen transition-colors duration-300 relative">
      
      {/* Hidden Formal PDF Report Template (A4 Proportions) */}
      <div className="absolute top-0 left-0 w-[800px] bg-white text-slate-900 p-12 font-manrope shadow-2xl -z-50 opacity-0 pointer-events-none" id="medical-report-pdf">
        {/* Medical Report Header */}
        <div className="border-b-4 border-blue-600 pb-6 mb-8 flex justify-between items-end">
          <div>
            <h1 className="text-4xl font-black text-blue-900 tracking-tighter">AETHER MED</h1>
            <p className="text-sm font-bold text-slate-400 uppercase tracking-[0.2em] mt-1">Clinical Precision AI</p>
          </div>
          <div className="text-right">
            <h2 className="text-xl font-extrabold text-slate-800">REKAM MEDIS - ANALISIS KULIT</h2>
            <p className="text-sm text-slate-500 font-medium mt-2">ID Pasien / Scan: <span className="text-slate-800 font-bold">#DS-{scanData.id}</span></p>
            <p className="text-sm text-slate-500 font-medium mt-0.5">Tanggal: <span className="text-slate-800 font-bold">{formatDate(scanData.createdAt)}</span></p>
          </div>
        </div>

        {/* Core Analysis */}
        <div className="flex gap-8 mb-10">
          <div className="w-2/5">
            <div className="relative rounded-2xl overflow-hidden border-2 border-slate-200 shadow-sm aspect-square bg-slate-100">
              <img src={scanData.citra} crossOrigin="anonymous" className="w-full h-full object-cover" alt="Citra Kulit" />
            </div>
            <div className="mt-4 p-5 bg-blue-50 rounded-xl border border-blue-100">
              <p className="text-xs text-blue-600 font-bold uppercase tracking-wider mb-1">Diagnosis Utama AI</p>
              <p className="text-2xl font-black text-blue-950">{scanData.name}</p>
            </div>
          </div>
          <div className="w-3/5">
            <h3 className="text-lg font-bold text-slate-800 border-b-2 border-slate-100 pb-2 mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-blue-600">analytics</span> 
              Rincian Tingkat Deteksi (Confidence Level)
            </h3>
            <div className="space-y-4">
              {predictions.map((pred: any, idx: number) => (
                <div key={idx} className="flex justify-between items-center">
                  <span className={`font-bold ${idx === 0 ? 'text-blue-900 text-base' : 'text-slate-600 text-sm'}`}>{pred.label}</span>
                  <div className="flex items-center gap-4 w-1/2">
                    <div className="flex-1 h-2.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200/50">
                      <div className={`h-full rounded-full ${idx === 0 ? 'bg-blue-500' : 'bg-slate-300'}`} style={{ width: `${parseFloat(pred.persentase)}%` }}></div>
                    </div>
                    <span className={`text-sm font-black w-14 text-right ${idx === 0 ? 'text-blue-600' : 'text-slate-500'}`}>{pred.persentase}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Medical Recommendations */}
        {solutions && (
          <div className="space-y-8">
            <div className="grid grid-cols-2 gap-6">
              <div className="p-6 border-2 border-emerald-100 bg-emerald-50/50 rounded-2xl">
                <h4 className="font-extrabold text-emerald-800 mb-4 flex items-center gap-2 text-lg">
                  <span className="material-symbols-outlined text-emerald-600">verified</span> Disarankan
                </h4>
                <ul className="space-y-2">
                  {goodIngredients.map((ing: any, i: number) => (
                    <li key={i} className="text-sm text-emerald-800 flex gap-2">
                      <span className="mt-1 w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0"></span> {ing.name}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-6 border-2 border-rose-100 bg-rose-50/50 rounded-2xl">
                <h4 className="font-extrabold text-rose-800 mb-4 flex items-center gap-2 text-lg">
                  <span className="material-symbols-outlined text-rose-600">block</span> Dihindari
                </h4>
                <ul className="space-y-2">
                  {badIngredients.map((ing: any, i: number) => (
                    <li key={i} className="text-sm text-rose-800 flex gap-2">
                      <span className="mt-1 w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0"></span> {ing.name}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="p-8 border-2 border-slate-100 rounded-2xl">
              <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined text-blue-600">medical_services</span>
                Protokol Perawatan & Kebiasaan Baik
              </h3>
              <div className="space-y-4">
                {treatments.map((treat: any, i: number) => (
                  <div key={i} className="flex gap-6 border-b border-slate-100 pb-4 last:border-0 last:pb-0">
                    <span className="font-black text-blue-600 w-24 text-sm tracking-wide uppercase mt-0.5">{treat.time}</span>
                    <span className="text-slate-700 text-sm font-medium leading-relaxed">{treat.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Formal Footer */}
        <div className="mt-16 pt-8 border-t-2 border-slate-100 flex justify-between items-center text-xs text-slate-400 font-medium">
          <p>Dicetak secara otomatis oleh sistem AETHER MED AI.</p>
          <p>Dokumen ini adalah referensi awal dan bukan resep medis.</p>
        </div>
      </div>

      {/* Custom Toast Notification */}
      {toast.show && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[9999] animate-in slide-in-from-top-10 fade-in duration-300">
          <div className={`flex items-center gap-3 px-6 py-4 rounded-full shadow-2xl border ${toast.type === 'success' ? 'bg-green-50 dark:bg-green-950/80 border-green-200 dark:border-green-800 text-green-700 dark:text-green-400' : 'bg-red-50 dark:bg-red-950/80 border-red-200 dark:border-red-800 text-red-700 dark:text-red-400'}`}>
            <span className="material-symbols-outlined text-2xl">
              {toast.type === 'success' ? 'check_circle' : 'error'}
            </span>
            <span className="font-extrabold text-sm tracking-wide">{toast.message}</span>
          </div>
        </div>
      )}

      <MobileNav activePage="history" />

      <main id="report-content">
        <div className="max-w-6xl mx-auto">
          {/* Premium Header Area */}
          <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[var(--dashboard-border)] pb-8">
            <div className="flex items-start gap-4">
              <button
                onClick={() => router.back()}
                className="w-12 h-12 flex items-center justify-center bg-[var(--dashboard-card-bg)] border border-[var(--dashboard-border)] rounded-full text-[var(--dashboard-text-secondary)] hover:text-primary hover:border-primary/30 transition-all shadow-sm group shrink-0"
                title="Kembali"
              >
                <span className="material-symbols-outlined text-xl group-hover:-translate-x-1 transition-transform">
                  arrow_back
                </span>
              </button>
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="uppercase tracking-[0.2em] text-primary font-extrabold text-[10px] md:text-xs">
                    DermaScan Report
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider">
                    ID: #DS-{scanData.id}
                  </span>
                </div>
                <h1 className="text-3xl md:text-4xl font-black text-[var(--dashboard-text)] tracking-tight">
                  Detail Analisis Kulit
                </h1>
                <p className="mt-2 text-[var(--dashboard-text-secondary)] text-sm md:text-base flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm">
                    calendar_month
                  </span>
                  {formatDate(scanData.createdAt)}
                </p>
              </div>
            </div>

            <button
              id="download-btn"
              onClick={handleDownloadPDF}
              className="hidden md:flex items-center gap-2 px-6 py-2.5 rounded-full bg-[var(--dashboard-card-bg)] border border-[var(--dashboard-border)] text-[var(--dashboard-text)] hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors text-sm font-bold"
            >
              <span className="material-symbols-outlined text-lg">
                download
              </span>
              Unduh PDF
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
            {/* Left Column - Image & Primary Result */}
            <div className="lg:col-span-4 space-y-8">
              {/* Image Card */}
              <div className="bg-[var(--dashboard-card-bg)] border border-[var(--dashboard-border)] rounded-[2rem] p-4 shadow-sm hover:shadow-md transition-shadow">
                <div className="relative rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-900 aspect-square border border-[var(--dashboard-border)]">
                  <img
                    src={scanData.citra}
                    crossOrigin="anonymous"
                    alt={`Scan ${scanData.name}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                    <div>
                      <p className="text-white/80 text-xs font-medium mb-1">
                        Terdeteksi:
                      </p>
                      <div className="bg-white/20 backdrop-blur-md text-white px-4 py-1.5 rounded-lg text-sm font-bold tracking-wide border border-white/20 inline-block shadow-lg">
                        {scanData.name}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Accuracy/Predictions Card */}
              <div className="bg-[var(--dashboard-card-bg)] border border-[var(--dashboard-border)] rounded-[2rem] p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined text-xl">
                      analytics
                    </span>
                  </div>
                  <h3 className="text-lg font-extrabold text-[var(--dashboard-text)]">
                    Tingkat Akurasi
                  </h3>
                </div>

                <div className="space-y-5">
                  {predictions.map((pred: any, idx: number) => {
                    const percentNum = parseFloat(pred.persentase) || 0;
                    return (
                      <div key={idx} className="relative group">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-bold text-[var(--dashboard-text)] group-hover:text-primary transition-colors">
                            {pred.label}
                          </span>
                          <span
                            className={`text-xs font-extrabold ${idx === 0 ? "text-primary" : "text-[var(--dashboard-text-secondary)]"}`}
                          >
                            {pred.persentase}
                          </span>
                        </div>
                        <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-800/80 rounded-full overflow-hidden border border-[var(--dashboard-border)]/50">
                          <div
                            className={`h-full rounded-full transition-all duration-1000 ease-out relative overflow-hidden ${idx === 0 ? "bg-gradient-to-r from-primary to-emerald-400 shadow-[0_0_10px_rgba(var(--primary),0.5)]" : "bg-slate-400 dark:bg-slate-500"}`}
                            style={{
                              width: `${Math.min(100, Math.max(0, percentNum))}%`,
                            }}
                          >
                            {idx === 0 && (
                              <div className="absolute top-0 bottom-0 left-0 right-0 bg-white/20 animate-pulse"></div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right Column - Comprehensive Details */}
            <div className="lg:col-span-8">
              {!solutions ? (
                <div className="h-full min-h-[400px] flex flex-col items-center justify-center bg-[var(--dashboard-card-bg)] border border-[var(--dashboard-border)] rounded-[2rem] p-10 text-center">
                  <span className="material-symbols-outlined text-6xl text-slate-300 dark:text-slate-600 mb-4">
                    info
                  </span>
                  <h3 className="text-xl font-bold text-[var(--dashboard-text)] mb-2">
                    Belum Ada Rekomendasi
                  </h3>
                  <p className="text-[var(--dashboard-text-secondary)] max-w-sm">
                    Sistem belum dapat memberikan rekomendasi spesifik untuk
                    analisis ini.
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Ingredients Section - 2 Columns */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Good Ingredients */}
                    <div className="bg-[var(--dashboard-card-bg)] border border-green-500/20 rounded-[2rem] p-6 shadow-sm relative overflow-hidden group hover:border-green-500/40 transition-colors">
                      <div className="absolute -right-6 -top-6 w-24 h-24 bg-green-500/5 rounded-full blur-2xl group-hover:bg-green-500/10 transition-colors"></div>
                      <div className="flex items-center gap-3 mb-5 relative z-10">
                        <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center text-green-600 dark:text-green-400">
                          <span className="material-symbols-outlined text-xl">
                            check_circle
                          </span>
                        </div>
                        <h4 className="text-base font-extrabold text-[var(--dashboard-text)]">
                          Kandungan Disarankan
                        </h4>
                      </div>
                      <div className="flex flex-wrap gap-2 relative z-10">
                        {goodIngredients.map((ing: any, i: number) => (
                          <span
                            key={i}
                            className="px-3 py-1.5 bg-green-50 dark:bg-green-500/10 text-green-700 dark:text-green-400 text-xs font-bold rounded-lg border border-green-200 dark:border-green-500/20 shadow-sm"
                          >
                            {ing.name}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Bad Ingredients */}
                    <div className="bg-[var(--dashboard-card-bg)] border border-red-500/20 rounded-[2rem] p-6 shadow-sm relative overflow-hidden group hover:border-red-500/40 transition-colors">
                      <div className="absolute -right-6 -top-6 w-24 h-24 bg-red-500/5 rounded-full blur-2xl group-hover:bg-red-500/10 transition-colors"></div>
                      <div className="flex items-center gap-3 mb-5 relative z-10">
                        <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center text-red-600 dark:text-red-400">
                          <span className="material-symbols-outlined text-xl">
                            cancel
                          </span>
                        </div>
                        <h4 className="text-base font-extrabold text-[var(--dashboard-text)]">
                          Kandungan Dihindari
                        </h4>
                      </div>
                      <div className="flex flex-wrap gap-2 relative z-10">
                        {badIngredients.map((ing: any, i: number) => (
                          <span
                            key={i}
                            className="px-3 py-1.5 bg-red-50 dark:bg-red-500/10 text-red-700 dark:text-red-400 text-xs font-bold rounded-lg border border-red-200 dark:border-red-500/20 shadow-sm"
                          >
                            {ing.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Treatments Timeline */}
                  <div className="bg-[var(--dashboard-card-bg)] border border-[var(--dashboard-border)] rounded-[2rem] p-6 md:p-8 shadow-sm">
                    <div className="flex items-center gap-3 mb-8">
                      <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-blue-400">
                        <span className="material-symbols-outlined text-xl">
                          spa
                        </span>
                      </div>
                      <div>
                        <h3 className="text-lg font-extrabold text-[var(--dashboard-text)]">
                          Rutinitas Perawatan
                        </h3>
                        <p className="text-xs text-[var(--dashboard-text-secondary)] mt-0.5">
                          Langkah-langkah yang direkomendasikan
                        </p>
                      </div>
                    </div>

                    <div className="space-y-6 relative before:absolute before:inset-0 before:ml-[1.4rem] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-[var(--dashboard-border)] before:via-[var(--dashboard-border)] before:to-transparent">
                      {treatments.map((treat: any, i: number) => (
                        <div
                          key={i}
                          className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
                        >
                          <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-[var(--dashboard-card-bg)] bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                            <span className="text-[10px] font-black">
                              {i + 1}
                            </span>
                          </div>
                          <div className="w-[calc(100%-3rem)] md:w-[calc(50%-2.5rem)] bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-[var(--dashboard-border)] shadow-sm group-hover:shadow-md group-hover:border-blue-500/30 transition-all">
                            <span className="inline-block px-2.5 py-1 bg-blue-500/10 text-blue-600 dark:text-blue-400 text-[10px] font-black uppercase tracking-wider rounded-md mb-2">
                              {treat.time}
                            </span>
                            <p className="text-sm font-medium text-[var(--dashboard-text)] leading-relaxed">
                              {treat.name}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Good Habits Grid */}
                  <div className="bg-[var(--dashboard-card-bg)] border border-[var(--dashboard-border)] rounded-[2rem] p-6 md:p-8 shadow-sm">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-600 dark:text-amber-400">
                        <span className="material-symbols-outlined text-xl">
                          self_improvement
                        </span>
                      </div>
                      <div>
                        <h3 className="text-lg font-extrabold text-[var(--dashboard-text)]">
                          Kebiasaan Baik
                        </h3>
                        <p className="text-xs text-[var(--dashboard-text-secondary)] mt-0.5">
                          Gaya hidup yang mendukung kesehatan kulit
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {habits.map((habit: any, i: number) => (
                        <div
                          key={i}
                          className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/30 border border-[var(--dashboard-border)] hover:bg-amber-50 dark:hover:bg-amber-900/10 transition-colors"
                        >
                          <span className="material-symbols-outlined text-amber-500 text-lg shrink-0 mt-0.5">
                            stars
                          </span>
                          <span className="text-sm font-medium text-[var(--dashboard-text)]">
                            {habit.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
