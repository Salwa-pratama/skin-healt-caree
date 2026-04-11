"use client";

import Link from "next/link";
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
  return (
    <div className="bg-surface text-on-surface antialiased overflow-x-hidden font-manrope min-h-screen">
      {/* TopNavBar */}
      <header className="fixed top-0 w-full flex justify-between items-center px-4 md:px-8 h-20 bg-white/80 backdrop-blur-xl z-50 border-b border-[#edeeef] shadow-[0_2px_20px_rgba(0,0,0,0.02)]">
        <div className="flex items-center gap-2 text-[#1c6d00]">
          <Link href="/pages/dashboard">
            <span className="text-xl md:text-2xl font-extrabold tracking-tighter hover:opacity-80 transition-opacity cursor-pointer">
              DermaScan
            </span>
          </Link>
        </div>
        <div className="flex items-center gap-3 md:gap-6">
          <div className="relative hidden sm:block">
            <input
              className="bg-[#f3f4f5] border-none rounded-full py-2 px-6 text-sm w-48 lg:w-64 text-[#191c1d] placeholder-slate-400 focus:ring-2 focus:ring-[#84f75e]"
              placeholder="Cari data..."
              type="text"
            />
            <span className="material-symbols-outlined absolute right-4 top-2 text-slate-400">
              search
            </span>
          </div>
          <button className="text-[#6f7b67] hover:text-[#1c6d00] transition-colors duration-200">
            <span className="material-symbols-outlined">notifications</span>
          </button>
          <Link href="/pages/profil">
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full overflow-hidden border-2 border-[#84f75e] cursor-pointer hover:opacity-80 transition-opacity">
              <img
                alt="Profil Medis Pengguna"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAEn4HazQ2JPJoF2zKyTSqb9V8Md24ll0JNrzbPnz8Y34Ag94EwJh0y6c3E0zG9cSLOF3pafjfuiziCBtzvgck3_DfbO7D8ydx0r63uuVzQVgWLh0QQICPVLBsE63LTlT-3hPapCkbNE946COlqln_K43fr41a3C96qSk62cLc_G186RPZo6KC7LbT-RV0kgehO7sog0GbIGaoSuS-qLOk94GPnP3NJ-mrGAbjw_GHKm842lRLupT3MVKSsQH4vY4TOBE7MfG_Z-b2Y"
              />
            </div>
          </Link>
        </div>
      </header>

      {/* Sidebar Navigation - Synchronized with Analisis */}
      <aside className="hidden lg:flex flex-col h-screen py-10 bg-white w-72 fixed left-0 top-0 border-r border-[#edeeef] z-40">
        <div className="px-8 mb-12 mt-20">
          <div className="flex flex-col">
            <span className="uppercase tracking-[0.1em] text-[10px] font-extrabold text-[#6f7b67]">
              Clinical Precision
            </span>
            <span className="text-[#1c6d00] font-extrabold text-xl tracking-tight">
              Luminous Lab
            </span>
          </div>
        </div>
        <nav className="flex-1 space-y-1">
          <Link
            className="flex items-center gap-4 text-[#6f7b67] py-4 px-8 hover:text-[#1c6d00] hover:bg-[#f3fbf0] border-l-4 border-transparent hover:border-[#1c6d00] transition-all"
            href="/pages/dashboard"
          >
            <span className="material-symbols-outlined text-xl">dashboard</span>
            <span className="uppercase tracking-[0.1em] text-[11px] font-extrabold">
              Dashboard
            </span>
          </Link>
          <Link
            className="flex items-center gap-4 text-[#6f7b67] py-4 px-8 hover:text-[#1c6d00] hover:bg-[#f3fbf0] border-l-4 border-transparent hover:border-[#1c6d00] transition-all"
            href="/pages/scan"
          >
            <span className="material-symbols-outlined text-xl">biotech</span>
            <span className="uppercase tracking-[0.1em] text-[11px] font-extrabold">
              Analysis
            </span>
          </Link>
          <Link
            className="flex items-center gap-4 text-[#1c6d00] py-4 px-8 bg-[#f3fbf0] border-l-4 border-[#1c6d00] transition-all"
            href="/pages/history"
          >
            <span className="material-symbols-outlined text-xl">history</span>
            <span className="uppercase tracking-[0.1em] text-[11px] font-extrabold">
              History
            </span>
          </Link>
          <Link
            className="flex items-center gap-4 text-[#6f7b67] py-4 px-8 hover:text-[#1c6d00] hover:bg-[#f3fbf0] border-l-4 border-transparent hover:border-[#1c6d00] transition-all"
            href="/pages/dashboard"
          >
            <span className="material-symbols-outlined text-xl">settings</span>
            <span className="uppercase tracking-[0.1em] text-[11px] font-extrabold">
              Settings
            </span>
          </Link>
        </nav>
        <div className="px-8 mt-auto">
          <Link href="/pages/scan">
            <button className="w-full signature-gradient text-white font-bold py-4 px-6 rounded-full shadow-md hover:shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2">
              <span className="material-symbols-outlined">add_circle</span>
              <span className="text-sm">New Scan</span>
            </button>
          </Link>
          <div className="mt-8 flex items-center gap-4 text-[#6f7b67] py-4 cursor-pointer hover:text-[#1c6d00]">
            <span className="material-symbols-outlined">help</span>
            <span className="uppercase tracking-[0.1em] text-[11px] font-extrabold">
              Support
            </span>
          </div>
        </div>
      </aside>

      {/* Mobile Bottom Nav */}
      <nav className="lg:hidden fixed bottom-6 left-6 right-6 h-16 bg-[#191c1d]/95 backdrop-blur-xl rounded-full flex items-center justify-between px-8 z-50 shadow-2xl border border-white/10">
        <Link href="/pages/dashboard">
          <span className="material-symbols-outlined text-slate-400 active:scale-90 transition-transform">grid_view</span>
        </Link>
        <div className="relative -top-6">
          <div className="p-1 bg-white rounded-full shadow-xl">
            <Link href="/pages/scan">
              <div className="w-12 h-12 signature-gradient rounded-full flex items-center justify-center active:scale-90 transition-transform">
                <span className="material-symbols-outlined text-white font-bold">add</span>
              </div>
            </Link>
          </div>
        </div>
        <Link href="/pages/history">
          <span className="material-symbols-outlined text-white active:scale-90 transition-transform">history</span>
        </Link>
      </nav>

      {/* Main Content */}
      <main className="lg:ml-72 pt-28 px-4 sm:px-6 md:px-10 pb-32 lg:pb-12 min-h-screen dashboard-animate-in">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="mb-8 md:mb-12">
            <span className="uppercase tracking-[0.2em] text-[#1c6d00] font-extrabold text-[10px] md:text-xs">
              DermaScan Intelligence
            </span>
            <h1 className="text-3xl md:text-5xl font-extrabold text-[#191c1d] mt-2 tracking-tight">
              Riwayat <span className="text-[#1c6d00]">Pemindaian</span>
            </h1>
            <p className="mt-4 text-[#6f7b67] max-w-2xl leading-relaxed text-sm md:text-base">
              Kelola dan tinjau hasil analisis dermatologi 3D Anda secara mendalam dengan akurasi klinis tinggi.
            </p>
          </div>

          {/* Search & Actions Bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-8 md:mb-10">
            <div className="flex-grow max-w-md bg-[#f3f4f5] rounded-full px-6 py-3 flex items-center gap-4 focus-within:ring-2 focus-within:ring-[#1c6d00] transition-all">
              <span className="material-symbols-outlined text-slate-400">search</span>
              <input
                className="bg-transparent border-none focus:ring-0 w-full text-sm text-[#191c1d] placeholder:text-slate-400"
                placeholder="Cari ID atau tanggal..."
                type="text"
              />
            </div>
            <div className="flex gap-3">
              <button className="flex-1 sm:flex-none bg-[#f3f4f5] text-[#191c1d] px-6 py-3 rounded-full font-bold hover:bg-[#e7e8e9] transition-colors flex items-center justify-center gap-2 text-sm border border-[#becab4]/30">
                <span className="material-symbols-outlined text-lg">filter_list</span>
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
                className="bg-white rounded-[2rem] p-6 md:p-8 shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-[#edeeef] group transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="w-20 h-20 rounded-xl overflow-hidden bg-[#f3f4f5] border-2 border-white shadow-sm">
                    <img
                      alt={`Analisis ${scan.id}`}
                      className="w-full h-full object-cover"
                      src={scan.img}
                    />
                  </div>
                  <span className={`${scan.statusClass} px-3 py-1 rounded-full text-[10px] font-extrabold tracking-widest uppercase`}>
                    {scan.status}
                  </span>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-[10px] font-extrabold tracking-widest uppercase text-slate-400 mb-1">
                      ID Pemindaian
                    </p>
                    <p className="text-lg font-bold text-[#191c1d]">{scan.id}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-extrabold tracking-widest uppercase text-slate-400 mb-1">
                      Tanggal Analisis
                    </p>
                    <p className="text-sm font-medium text-[#6f7b67]">{scan.date}</p>
                  </div>
                </div>
                <div className="mt-8 pt-6 border-t border-[#edeeef] flex items-center justify-between">
                  <Link href="/pages/scan" className="text-[#1c6d00] font-extrabold text-[10px] md:text-xs uppercase tracking-widest hover:translate-x-1 transition-transform flex items-center gap-2">
                    {scan.action}
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </Link>
                  <span className="material-symbols-outlined text-slate-400 cursor-pointer hover:text-[#1c6d00] transition-colors">
                    more_horiz
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Load More Button */}
          <div className="mt-12 md:mt-16 flex justify-center">
            <button className="w-full sm:w-auto px-10 py-4 border-2 border-[#1c6d00] text-[#1c6d00] rounded-full font-extrabold uppercase tracking-widest text-[10px] md:text-xs hover:bg-[#1c6d00] hover:text-white transition-all duration-300">
              Muat Lebih Banyak
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
