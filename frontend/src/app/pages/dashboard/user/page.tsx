"use client";


import MobileNav from "@/app/components/MobileNav";
import { useGetTreatmentsQuery, useGetHabitsQuery } from "@/features/jadwal/api/jadwal.api";
import { useGetHistoryQuery } from "@/features/history/api/history.api";
import { useProfile } from "@/features/auth/api/profile.api";
import Link from "next/link";


export default function HomeDashboard() {
    const { data: treatments = [], isLoading: isLoadingTreatments } = useGetTreatmentsQuery();
    const { data: habits = [], isLoading: isLoadingHabits } = useGetHabitsQuery();
    const { data: historyRes, isLoading: isLoadingHistory } = useGetHistoryQuery();
    const history = historyRes?.data || [];

    const { data: profile, isLoading: isLoadingProfile } = useProfile();
    const activeSub = profile?.userSubscriptions?.[0];
    const maxHistorySaved = activeSub?.plan?.maxHistorySaved ?? '∞';
    const currentHistorySaved = history.length;
    const isLimitReached = typeof maxHistorySaved === 'number' && maxHistorySaved !== -1 && currentHistorySaved >= maxHistorySaved;
    const planName = activeSub?.plan?.name || "Gratis";
    const skinType = profile?.skin_type || profile?.skinType || profile?.skintype || "Belum diatur";
    const name = profile?.name || "Pengguna";
    const photo = profile?.avatar || profile?.foto_profil || "";

    return (
        <>

            {/* Main Content Area - Responsive Bento Grid */}
            <MobileNav activePage="dashboard" />

            <div className="max-w-7xl mx-auto flex flex-col pb-4 w-full flex-1">
                <div className="flex flex-col lg:flex-row gap-4 lg:gap-5 items-stretch flex-1">
                    {/* Left Column: Profile & Subscription */}
                    <div className="w-full lg:w-4/12 flex flex-col gap-4">
                        {/* Profile Card */}
                        <div className="bg-[var(--dashboard-card-bg)] rounded-3xl p-6 shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-[var(--dashboard-border)] transition-colors duration-300 flex-1 flex flex-col">
                            {isLoadingProfile ? (
                                <div className="animate-pulse flex items-center gap-4">
                                    <div className="w-16 h-16 rounded-full bg-slate-200 dark:bg-slate-800 flex-shrink-0"></div>
                                    <div className="flex-1 space-y-2">
                                        <div className="h-6 w-1/2 bg-slate-200 dark:bg-slate-800 rounded"></div>
                                        <div className="h-4 w-1/3 bg-slate-200 dark:bg-slate-800 rounded"></div>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <div className="flex items-center gap-5">
                                        <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-primary/20 bg-slate-100 flex-shrink-0 relative flex items-center justify-center">
                                            <span className="material-symbols-outlined text-4xl text-slate-400 absolute z-0">person</span>
                                            {photo && (
                                                <img 
                                                    src={photo.startsWith('http') ? photo : `https://skin-healt-caree.vercel.app${photo.startsWith('/') ? '' : '/'}${photo}`} 
                                                    alt={name} 
                                                    className="w-full h-full object-cover relative z-10"
                                                    onError={(e) => {
                                                        e.currentTarget.style.display = 'none';
                                                    }}
                                                />
                                            )}
                                        </div>
                                        <div className="min-w-0">
                                            <p className="text-[10px] uppercase tracking-widest font-extrabold text-on-surface-variant/70 mb-1">
                                                Selamat Datang
                                            </p>
                                            <h2 className="text-2xl font-extrabold text-[var(--dashboard-text)] tracking-tight leading-tight truncate" title={name}>
                                                Halo, {name.split(' ')[0]}!
                                            </h2>
                                        </div>
                                    </div>
                                    <div className="mt-6 pt-5 border-t border-[var(--dashboard-border)]/50">
                                        <h3 className="text-[14px] sm:text-[15px] font-bold flex items-center gap-2 mb-4 text-[var(--dashboard-text)]">
                                            <span className="material-symbols-outlined text-primary text-[18px]">science</span>
                                            Informasi Klinis
                                        </h3>
                                        
                                        <div className="flex flex-wrap gap-4 sm:gap-6">
                                            <div className="flex flex-col gap-2">
                                                <p className="text-[9px] font-extrabold uppercase tracking-widest text-on-surface-variant/70">
                                                    Tipe Kulit
                                                </p>
                                                <span className="inline-block px-5 py-1.5 bg-primary text-[#042100] rounded-full text-xs font-bold shadow-sm capitalize">
                                                    {skinType === "Belum diatur" ? "Kering" : skinType}
                                                </span>
                                            </div>
                                            
                                            <div className="flex flex-col gap-2">
                                                <p className="text-[9px] font-extrabold uppercase tracking-widest text-on-surface-variant/70">
                                                    Masalah Utama
                                                </p>
                                                <span className="inline-block px-5 py-1.5 bg-primary text-[#042100] rounded-full text-xs font-bold shadow-sm capitalize">
                                                    {profile?.masalahUtama || profile?.masalah_utama || "Jerawat"}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-auto pt-6">
                                        <Link href="/pages/dashboard/user/profil" className="w-full flex items-center justify-between p-3 rounded-xl bg-[var(--dashboard-bg)] hover:bg-[var(--dashboard-border)] border border-[var(--dashboard-border)] transition-all group shadow-sm">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                                                    <span className="material-symbols-outlined text-[16px]">manage_accounts</span>
                                                </div>
                                                <div className="flex flex-col text-left">
                                                    <span className="text-[10px] font-black uppercase tracking-widest text-[var(--dashboard-text)]">Profil Pengguna</span>
                                                    <span className="text-[9px] font-medium text-on-surface-variant/60">Lihat & Kelola Akun</span>
                                                </div>
                                            </div>
                                            <span className="material-symbols-outlined text-on-surface-variant/40 group-hover:text-primary group-hover:translate-x-1 transition-all">arrow_forward</span>
                                        </Link>
                                    </div>
                                </>
                            )}
                        </div>

                        {/* Subscription Card */}
                        <div className="bg-[var(--dashboard-card-bg)] rounded-3xl p-5 shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-[var(--dashboard-border)] transition-colors duration-300">
                            <div className="flex justify-between items-center mb-4">
                                <span className="uppercase tracking-widest text-[10px] font-extrabold text-on-surface-variant/70">
                                    Paket Langganan
                                </span>
                                <span className="text-[10px] font-black uppercase text-primary tracking-widest bg-primary/10 px-2 py-1 rounded-md">
                                    {planName}
                                </span>
                            </div>
                            
                            <div className="mb-2 flex justify-between items-end">
                                <h4 className="font-bold text-xs uppercase tracking-tight text-[var(--dashboard-text)]">
                                    Kuota History
                                </h4>
                                <span className="text-xs font-black text-[var(--dashboard-text)]">
                                    {currentHistorySaved} <span className="text-on-surface-variant/50 text-[10px]">/ {maxHistorySaved === -1 || maxHistorySaved > 1000 ? '∞' : maxHistorySaved}</span>
                                </span>
                            </div>
                            <div className="w-full h-2 bg-[var(--dashboard-bg)] rounded-full overflow-hidden">
                                <div
                                    className={`h-full ${isLimitReached ? 'bg-red-500' : 'bg-primary'}`}
                                    style={{ width: maxHistorySaved === -1 ? '100%' : (typeof maxHistorySaved === 'number' && maxHistorySaved > 0 ? `${Math.min((currentHistorySaved / maxHistorySaved) * 100, 100)}%` : '10%') }}
                                ></div>
                            </div>
                            {isLimitReached && (
                                <p className="text-[9px] mt-2 text-red-500 font-bold uppercase tracking-wide">
                                    Batas kuota riwayat tercapai.
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Center Column: Scan CTA */}
                    <div className="w-full lg:w-5/12 flex flex-col">
                        <div className="bg-[var(--dashboard-card-bg)] rounded-3xl w-full flex-1 min-h-[300px] relative overflow-hidden border border-[var(--dashboard-sidebar-border)] shadow-[0_10px_40px_rgba(0,0,0,0.03)] flex flex-col items-center justify-center p-8 transition-colors duration-300 group hover:border-primary/30">
                            {/* Decorative Background Elements */}
                            <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.07] pointer-events-none bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary via-transparent to-transparent"></div>
                            
                            <div className="relative z-10 w-full flex flex-col items-center text-center">
                                <div className="w-24 h-24 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 ease-out">
                                    <span className="material-symbols-outlined text-5xl">face_retouching_natural</span>
                                </div>
                                <span className="text-[10px] uppercase tracking-[0.3em] font-black text-primary mb-2">
                                    AI Derma Mapping
                                </span>
                                <h2 className="text-3xl sm:text-4xl font-black text-[var(--dashboard-text)] mb-4 tracking-tight">
                                    Mulai Analisis <br/>Wajah 3D
                                </h2>
                                <p className="text-xs text-on-surface-variant/70 max-w-[250px] mb-8 leading-relaxed font-medium">
                                    Pindai wajah Anda untuk mendapatkan prediksi kondisi jerawat dan panduan perawatan akurat.
                                </p>
                                
                                <Link href="/pages/dashboard/user/scan" className="w-full flex justify-center">
                                    <button className="w-full max-w-[200px] py-4 bg-primary text-on-primary rounded-full font-black text-xs uppercase tracking-widest shadow-[0_10px_30px_rgba(132,247,94,0.3)] hover:shadow-[0_15px_40px_rgba(132,247,94,0.4)] hover:-translate-y-1 transition-all duration-300">
                                        Scan Sekarang
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: AI & Progress */}
                    <div className="w-full lg:w-3/12 flex flex-col gap-4">
                        {/* Jadwal & Habit */}
                        <div className="bg-[var(--dashboard-card-bg)] rounded-3xl p-5 shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-[var(--dashboard-sidebar-border)] transition-colors duration-300 flex flex-col flex-1 overflow-hidden min-h-[220px]">
                            <div className="flex justify-between items-center mb-4">
                                <div className="flex items-center gap-2 text-primary">
                                    <span className="material-symbols-outlined text-[20px]">
                                        event_note
                                    </span>
                                    <h3 className="font-black text-xs uppercase tracking-widest">
                                        Jadwal & Habit
                                    </h3>
                                </div>
                                <Link href="/pages/dashboard/user/jadwal" className="text-[9px] font-black text-on-surface-variant hover:text-primary transition-colors uppercase tracking-widest">
                                    Lihat Semua
                                </Link>
                            </div>
                            
                            <div className="space-y-4 overflow-y-auto custom-scrollbar pr-2 flex-grow">
                                {isLoadingTreatments || isLoadingHabits ? (
                                    <div className="animate-pulse space-y-4">
                                        <div className="h-12 bg-slate-100 dark:bg-slate-800 rounded-xl"></div>
                                        <div className="h-12 bg-slate-100 dark:bg-slate-800 rounded-xl"></div>
                                    </div>
                                ) : treatments.length === 0 && habits.length === 0 ? (
                                    <div className="text-center py-4 flex flex-col items-center justify-center h-full">
                                        <span className="material-symbols-outlined text-3xl text-on-surface-variant/40 mb-2">event_busy</span>
                                        <p className="text-xs text-on-surface-variant/70">Belum ada jadwal aktif.</p>
                                    </div>
                                ) : (
                                    <>
                                        {treatments.slice(0, 2).map((t: any) => (
                                            <div key={`t-${t.id}`} className="relative pl-4 border-l-2 border-primary/50">
                                                <p className="text-[9px] font-black text-on-surface-variant/75 uppercase mb-1">
                                                    {t.hari} • Treatment
                                                </p>
                                                <p className="text-xs font-semibold text-[var(--dashboard-text)] truncate" title={`${t.nama} di ${t.tempat}`}>
                                                    {t.nama}
                                                </p>
                                            </div>
                                        ))}
                                        {habits.slice(0, 2).map((h: any) => (
                                            <div key={`h-${h.id}`} className="relative pl-4 border-l-2 border-amber-400/50">
                                                <p className="text-[9px] font-black text-on-surface-variant/75 uppercase mb-1">
                                                    {h.hari} • Habit ({h.jam})
                                                </p>
                                                <p className="text-xs font-semibold text-[var(--dashboard-text)] truncate" title={h.nama}>
                                                    {h.nama}
                                                </p>
                                            </div>
                                        ))}
                                    </>
                                )}
                            </div>
                        </div>

                        {/* History Scan */}
                        <div className="bg-[var(--dashboard-card-bg)] rounded-3xl p-5 border border-[var(--dashboard-sidebar-border)] shadow-[0_10px_40px_rgba(0,0,0,0.03)] flex flex-col transition-colors duration-300 flex-1 overflow-hidden min-h-[220px]">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="font-black text-xs uppercase tracking-widest text-[var(--dashboard-text)]">
                                    Riwayat Terakhir
                                </h3>
                                <Link href="/pages/dashboard/user/history" className="text-[9px] font-black text-on-surface-variant hover:text-primary transition-colors uppercase tracking-widest">
                                    Detail
                                </Link>
                            </div>
                            <div className="space-y-3 overflow-y-auto custom-scrollbar pr-1 flex-grow">
                                {isLoadingHistory ? (
                                    <div className="animate-pulse space-y-3">
                                        <div className="h-14 bg-slate-100 dark:bg-slate-800 rounded-xl"></div>
                                        <div className="h-14 bg-slate-100 dark:bg-slate-800 rounded-xl"></div>
                                        <div className="h-14 bg-slate-100 dark:bg-slate-800 rounded-xl"></div>
                                    </div>
                                ) : history.length === 0 ? (
                                    <div className="text-center py-6 flex flex-col items-center justify-center h-full">
                                        <span className="material-symbols-outlined text-3xl text-on-surface-variant/40 mb-2">history</span>
                                        <p className="text-xs text-on-surface-variant/70">Belum ada riwayat scan.</p>
                                    </div>
                                ) : (
                                    history.slice(0, 3).map((scan: any) => (
                                        <Link key={scan.id} href={`/pages/dashboard/user/history/${scan.id}`} className="flex items-center gap-3 p-2 hover:bg-[var(--dashboard-bg)] rounded-xl transition-colors border border-transparent hover:border-[var(--dashboard-border)] group">
                                            <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 bg-slate-200">
                                                <img src={scan.citra} alt={scan.name} className="w-full h-full object-cover" />
                                            </div>
                                            <div className="overflow-hidden flex-grow">
                                                <p className="text-[10px] font-extrabold uppercase tracking-widest text-[var(--dashboard-text)] truncate group-hover:text-primary transition-colors">
                                                    {scan.name}
                                                </p>
                                                <p className="text-[9px] text-on-surface-variant/70 truncate">
                                                    {new Date(scan.createdAt).toLocaleDateString('id-ID', { day: '2-digit', month: 'short' })}
                                                </p>
                                            </div>
                                            <span className="material-symbols-outlined text-sm text-on-surface-variant/30 group-hover:text-primary transition-colors">chevron_right</span>
                                        </Link>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                </div>

            </div>





        </ >
    );
}
