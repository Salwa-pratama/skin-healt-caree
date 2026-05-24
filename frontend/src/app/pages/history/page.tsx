"use client";

import Link from "next/link";
import { useState } from "react";
import Sidebar from "@/app/components/Sidebar";
import DashboardHeader from "@/app/components/DashboardHeader";
import MobileNav from "@/app/components/MobileNav";
import "../dashboard/dashboard.css";

const scanHistory = [
  {
    id: "#DS-88291-LX",
    date: "24 Okt 2023, 14:30",
    status: "Selesai",
    statusClass: "bg-primary-container text-on-primary-container",
    action: "Lihat Laporan",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBtklWabyeg6UZ7zJDybxdTK9DPINBERFp4p5lb8BjIBkXni6HG6CcdN3N-L-NltLk7c1ojvkLvUIiDipDq_EjXclTwZrc2IvqLmcU6nIs2jyJeUmmY3qorNJHg0H07hkVtij2fUVtyUvldXBDaievaYKtysm39wtaUIX21yUSFcKYRTK7tHUc9xw_Mi30IVqNfnfn6STY9uCQkAk7sbvywgYD2I2Pn6RHxTTH9RhTEpOCkLa6SFtxoRAnZ4akYPy7OdsW8uRyH_igj",
  },
  {
    id: "#DS-88245-MK",
    date: "18 Okt 2023, 09:15",
    status: "Perlu Review",
    statusClass: "bg-tertiary-container text-on-tertiary-container",
    action: "Tindak Lanjut",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCsYmLgafek5KBQU4tAj94avChvrh4DgtB9LjVXswEh6U6G6UrtyghnJcv1BegrNLg7lE7iHBTM2EwRux5mXAPbEUJWJAdnMvz6Im--6hiHcj_Fdz809gzsTE99mI4TNj3QsLlRfCNa_fqt1Caq0qBjXtSZT6oVujk3Oj9v9zS1RtF_RyFz4FPPSexGzMD7sOikhxuOQTLaxpCU1hpmTo9AMVIr8EtquzO3yCz6Zj-3kPiO05rLHCNcGt4ODh8yM0I7keNle365vILE",
  },
  {
    id: "#DS-87910-TP",
    date: "12 Okt 2023, 11:45",
    status: "Selesai",
    statusClass: "bg-primary-container text-on-primary-container",
    action: "Lihat Laporan",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCCy_QqpPoHABiemRSk9ZQQcV1SKbL_MvJTmpuEQOsLVCcazmYI5kNLD6EvecbDFn3XUy6qx7SXqmWh2UhH-A43-WIOT4aWVVytUOZuZPM94kAUrBEQGnCZqSXzojPH3ZHtRcx6U9kO5rgVHGfUzaphe25mwAXT0uUWq_FXFW0JDk9L0uZcEB1oaJLuU5SqTpXNHdE4mZE2vlulNdDzqJ_3BOXvie6FFQ0hNQZ7iB5IZf0v8lT_3EmDHP2b3NYNp7I4tzub2zVRq8mX",
  },
  {
    id: "#DS-87442-ZZ",
    date: "05 Okt 2023, 16:20",
    status: "Selesai",
    statusClass: "bg-primary-container text-on-primary-container",
    action: "Lihat Laporan",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBeLAkHvbW2V6EFBUbcMsDTPJslZQSqSAjizYhF7cGujmoE_Ju9f_00YUB8xWj7Ce9ybB-CXSCZ7doc8jtxex1OZSrRt3EQ-lRxwMnVXc46OyiadstZ6WBjI7laEgMda357sFw09FDDDPK0HWej022P2paciq_xuJb8FFFI9TliuusIqqGmcRYAekCmj5oVlOzw_3d5FRj3MkuJ1Q8_wyZhxb8M0u1HRtZvYZEXOnKmrd5IjpW4hHcE2A74EtY-k1N68CVs5f7IItya",
  },
];

export default function HistoryPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
  return (
    <div className="bg-[var(--dashboard-bg)] text-[var(--dashboard-text)] antialiased overflow-x-hidden font-manrope min-h-screen transition-colors duration-300">
      <DashboardHeader 
        isSidebarOpen={isSidebarOpen} 
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} 
      />

      <Sidebar activePage="history" isOpen={isSidebarOpen} />

      <MobileNav activePage="history" />

      {/* Main Content */}
      <main className={`transition-all duration-500 pt-20 px-4 sm:px-6 md:px-10 pb-32 lg:pb-12 min-h-screen ${isSidebarOpen ? "lg:ml-64" : "lg:ml-0"} dashboard-animate-in`}>
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
                placeholder="Cari ID atau tanggal..."
                type="text"
              />
            </div>
            <div className="flex gap-3">
              <button className="flex-1 sm:flex-none bg-[var(--dashboard-card-bg)] text-[var(--dashboard-text)] px-6 py-3 rounded-full font-bold hover:bg-[var(--dashboard-border)] transition-colors flex items-center justify-center gap-2 text-sm border border-[var(--dashboard-border)]">
                <span className="material-symbols-outlined text-lg">
                  filter_list
                </span>
                Filter
              </button>
              <Link href="/pages/scan">
                <button className="signature-gradient text-white px-8 py-3 rounded-full font-extrabold tracking-wide hover:scale-[0.98] active:scale-95 transition-all shadow-lg flex items-center justify-center gap-2 text-sm">
                  <span className="material-symbols-outlined text-lg">add</span>
                  Baru
                </button>
              </Link>
            </div>
          </div>

          {/* History Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
            {scanHistory.map((scan) => (
              <div
                key={scan.id}
                className="bg-[var(--dashboard-card-bg)] rounded-[2rem] p-6 md:p-8 shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-[var(--dashboard-border)] group transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="w-20 h-20 rounded-xl overflow-hidden bg-[var(--dashboard-bg)] border-2 border-[var(--dashboard-border)] shadow-sm">
                    <img
                      alt={`Analisis ${scan.id}`}
                      className="w-full h-full object-cover"
                      src={scan.img}
                    />
                  </div>
                  <span
                    className={`${scan.statusClass} px-3 py-1 rounded-full text-[10px] font-extrabold tracking-widest uppercase`}
                  >
                    {scan.status}
                  </span>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-[10px] font-extrabold tracking-widest uppercase text-on-surface-variant mb-1">
                      ID Pemindaian
                    </p>
                    <p className="text-lg font-bold text-[var(--dashboard-text)]">
                      {scan.id}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] font-extrabold tracking-widest uppercase text-on-surface-variant mb-1">
                      Tanggal Analisis
                    </p>
                    <p className="text-sm font-medium text-[var(--dashboard-text-secondary)]">
                      {scan.date}
                    </p>
                  </div>
                </div>
                <div className="mt-8 pt-6 border-t border-[var(--dashboard-border)] flex items-center justify-between">
                  <Link
                    href="/pages/scan"
                    className="text-primary font-extrabold text-[10px] md:text-xs uppercase tracking-widest hover:translate-x-1 transition-transform flex items-center gap-2"
                  >
                    {scan.action}
                    <span className="material-symbols-outlined text-sm">
                      arrow_forward
                    </span>
                  </Link>
                  <span className="material-symbols-outlined text-on-surface-variant cursor-pointer hover:text-primary transition-colors">
                    more_horiz
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Load More Button */}
          <div className="mt-12 md:mt-16 flex justify-center">
            <button className="w-full sm:w-auto px-10 py-4 border-2 border-primary text-primary rounded-full font-extrabold uppercase tracking-widest text-[10px] md:text-xs hover:bg-primary hover:text-on-primary transition-all duration-300">
              Muat Lebih Banyak
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
