"use client";

import { Manrope } from "next/font/google";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useLoginMutation } from "@/features/auth/api/auth.api";
import Cookies from "js-cookie";
import "./login.css";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-manrope",
});

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
  
  const loginMutation = useLoginMutation();
  const [modalType, setModalType] = useState<"success" | "error" | null>(null);
  const [redirectCountdown, setRedirectCountdown] = useState(3);

  useEffect(() => {
    if (Cookies.get("access_token")) {
      router.replace("/pages/dashboard");
    }
  }, [router]);

  const showToast = (message: string, type: "success" | "error") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate({ email, password }, {
      onSuccess: () => {
        setModalType("success");
        let count = 3;
        const timer = setInterval(() => {
          count -= 1;
          setRedirectCountdown(count);
          if (count <= 0) {
            clearInterval(timer);
            router.push("/pages/dashboard");
          }
        }, 1000);
      },
      onError: () => {
        setModalType("error");
        setTimeout(() => setModalType(null), 4000);
      }
    });
  };

  return (
    <div
      className={`login-page ${manrope.variable} font-body selection:bg-[#84F75E]/30 selection:text-[#0a3900] h-screen flex flex-col overflow-hidden auth-animate-in`}
    >
      {/* Main Content */}
      <main className="flex-grow flex flex-col lg:flex-row overflow-hidden">
        {/* Left: Login Form */}
        <section className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-12 lg:p-16 bg-white relative overflow-hidden">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#84F75E]/5 rounded-full blur-[100px]"></div>
          <div className="w-full max-w-sm relative z-10 flex flex-col justify-center h-full">
            <div className="mb-6 sm:mb-8">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xl font-black tracking-tighter text-[#1c6d00]">
                  DermaScan
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#1a1c1a] mb-2 tracking-tight leading-tight">
                Vitalitas Digital <br />
                <span className="text-[#386a20]">dalam genggaman Anda.</span>
              </h1>
              <p className="text-xs sm:text-sm text-[#414941] font-medium">
                Masuk untuk mengakses dasbor klinis DermaScan Anda.
              </p>
            </div>

            <form className="space-y-4" onSubmit={handleLogin}>
              <div className="space-y-1.5">
                <label className="block text-[9px] font-black uppercase tracking-widest text-[#414941] ml-1">
                  Alamat Email
                </label>
                <div className="login-input-focus-accent transition-all">
                  <input
                    className="w-full bg-[#f1f5f2] border-none rounded-xl py-3 px-4 text-sm text-[#1a1c1a] placeholder:text-[#c1c9be] focus:ring-0 focus:outline-none font-body"
                    placeholder="dr.smith@dermascan.com"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between items-center px-1">
                  <label className="block text-[9px] font-black uppercase tracking-widest text-[#414941]">
                    Kata Sandi
                  </label>
                  <Link
                    className="text-[9px] font-bold text-[#386a20] hover:underline uppercase tracking-widest"
                    href="#"
                  >
                    Lupa?
                  </Link>
                </div>
                <div className="login-input-focus-accent transition-all relative">
                  <input
                    className="w-full bg-[#f1f5f2] border-none rounded-xl py-3 px-4 pr-11 text-sm text-[#1a1c1a] placeholder:text-[#c1c9be] focus:ring-0 focus:outline-none font-body"
                    placeholder="••••••••"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#386a20] transition-colors focus:outline-none"
                  >
                    <span className="material-symbols-outlined text-lg">
                      {showPassword ? "visibility_off" : "visibility"}
                    </span>
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-2.5 px-1">
                <div className="relative flex items-center">
                  <input
                    className="w-4 h-4 rounded border-[#c1c9be] bg-[#e8eee9] text-[#84F75E] focus:ring-[#84F75E] focus:ring-offset-white"
                    id="remember"
                    type="checkbox"
                  />
                </div>
                <label
                  className="text-xs font-semibold text-[#414941] cursor-pointer"
                  htmlFor="remember"
                >
                  Ingat perangkat ini
                </label>
              </div>

              <button
                className="w-full bg-[#84F75E] text-[#0a3900] py-3.5 rounded-xl font-black text-base shadow-lg shadow-[#84F75E]/20 hover:shadow-[#84F75E]/30 hover:-translate-y-0.5 transition-all mt-2 disabled:opacity-70 disabled:cursor-wait"
                type="submit"
                disabled={loginMutation.isPending}
              >
                {loginMutation.isPending ? "Sedang masuk..." : "Masuk"}
              </button>
            </form>

            <div className="mt-6">
              <div className="relative flex items-center justify-center mb-5">
                <div className="w-full h-px bg-[#edeeef]"></div>
                <span className="absolute px-3 bg-white text-[9px] font-black uppercase tracking-widest text-[#595c5d]">
                  atau
                </span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <button className="flex items-center justify-center gap-2 py-2 rounded-xl border border-[#c1c9be]/50 hover:bg-[#f1f5f2] transition-colors font-bold text-[10px] uppercase tracking-widest text-[#414941]">
                  <span className="material-symbols-outlined text-lg text-[#386a20]">medical_services</span> SSO
                </button>
                <button className="flex items-center justify-center gap-2 py-2 rounded-xl border border-[#c1c9be]/50 hover:bg-[#f1f5f2] transition-colors font-bold text-[10px] uppercase tracking-widest text-[#414941]">
                  <span className="material-symbols-outlined text-lg text-[#386a20]">fingerprint</span> Biometrik
                </button>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-center gap-4 text-xs font-medium text-[#414941]">
              <span>Belum punya akun?</span>
              <Link className="text-[#386a20] font-bold hover:underline" href="/pages/auth/register">Daftar</Link>
            </div>
          </div>
        </section>

        {/* Right: AI Acne Detection Analysis Panel */}
        <section className="hidden lg:flex w-1/2 bg-[#f0f4f2] relative flex-col items-center justify-center overflow-hidden border-l border-[#c1c9be]/30 h-full">
          {/* Background Elements */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(132,247,94,0.08)_0%,transparent_70%)]"></div>
          <div 
            className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none"
            style={{
              backgroundImage: "radial-gradient(#1a1c1a 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          ></div>

          <div className="relative z-10 w-full max-w-xl px-6 flex flex-col gap-4 h-full justify-center">
            <div className="flex items-end justify-between px-1">
              <div>
                <h2 className="text-[9px] font-black uppercase tracking-[0.2em] text-[#414941] mb-0.5">
                  Mode Diagnostik
                </h2>
                <p className="text-lg font-black text-[#1a1c1a]">
                  Deteksi Jerawat AI <span className="text-[#386a20] font-medium text-sm">v4.2</span>
                </p>
              </div>
              <div className="flex items-center gap-1.5 bg-white/60 backdrop-blur-sm px-2 py-0.5 rounded-full border border-white shadow-sm">
                <span className="w-1 h-1 rounded-full bg-[#84F75E] animate-pulse"></span>
                <span className="text-[8px] font-bold uppercase tracking-wider text-[#414941]">Neural Aktif</span>
              </div>
            </div>

            <div className="grid grid-cols-12 gap-3 h-auto max-h-[60%]">
              {/* Main Facial Scan Visual */}
              <div className="col-span-7 login-glass-panel rounded-2xl p-3 border border-white shadow-xl shadow-black/[0.03] relative overflow-hidden flex flex-col">
                <div className="absolute top-3 left-3 z-20 flex flex-col gap-1">
                  <div className="bg-black/70 backdrop-blur-sm text-white text-[8px] font-bold px-2 py-0.5 rounded-md flex items-center gap-2">
                    <span className="w-1 h-1 bg-red-500 rounded-full"></span> PAPULA
                  </div>
                </div>

                <div className="relative rounded-xl overflow-hidden flex-grow aspect-square bg-[#0c120c]">
                  <img
                    alt="Facial skin mapping"
                    className="w-full h-full object-cover opacity-70"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCj8vstHE3kvGuWTr4d4AcvKL9k3I8szQJxsaSZhaiGLHBzMmRidXxNPkSt7pqMxqQO_JMP4d5QjA_25IsCs_eCjB-sFjU785I_1rdtiDdemukClWDj5SXvud6REA-dUsN2S-_Y94n9VM1-b7u_lhCejGCXLrurNRwLBxRyptmf7HmDWhs2iKLL1FJEfQ4Aw96jNQGtlyma8Zr2tzYlsPvsRxKRpSKTDqItNMjJIbkpIftcxwL_IO2MGphVQ9PfLLBdUVHL-njH1gk"
                  />
                  <div className="absolute inset-0 login-scan-overlay opacity-40"></div>
                  <div className="absolute top-1/3 left-1/4 w-3 h-3 border border-red-500 rounded-full animate-ping"></div>
                </div>

                <div className="mt-3 flex justify-between items-center px-1">
                  <div>
                    <p className="text-[8px] font-bold text-[#414941] uppercase tracking-wider">Keyakinan</p>
                    <p className="text-sm font-extrabold text-[#1a1c1a]">98.4%</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[8px] font-bold text-[#414941] uppercase tracking-wider">Waktu</p>
                    <p className="text-sm font-extrabold text-[#1a1c1a]">1.2d</p>
                  </div>
                </div>
              </div>

              {/* Metrics Column */}
              <div className="col-span-5 flex flex-col gap-3">
                <div className="login-glass-panel rounded-2xl p-3 border border-white shadow-lg flex flex-col gap-3">
                  {[
                    { label: "Hidrasi", val: 72, color: "bg-blue-400" },
                    { label: "Minyak", val: 84, color: "bg-yellow-400" },
                    { label: "Inflamasi", val: 38, color: "bg-red-400" },
                  ].map((metric) => (
                    <div key={metric.label}>
                      <div className="flex justify-between items-end mb-1">
                        <span className="text-[8px] font-bold text-[#414941] uppercase">{metric.label}</span>
                        <span className="text-[9px] font-extrabold text-[#1a1c1a]">{metric.val}%</span>
                      </div>
                      <div className="h-1 w-full bg-[#f1f5f2] rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${metric.color}`} style={{ width: `${metric.val}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex-grow login-glass-panel rounded-2xl p-3 border border-white shadow-lg flex flex-col">
                  <p className="text-[8px] font-bold text-[#414941] uppercase mb-2 tracking-wider">Regimen</p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-lg bg-[#84F75E]/15 flex items-center justify-center shrink-0">
                        <span className="material-symbols-outlined text-[#386a20] text-xs">sanitizer</span>
                      </div>
                      <p className="text-[8px] font-bold text-[#1a1c1a]">BHA Cleanser</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-lg bg-[#bc01ec]/10 flex items-center justify-center shrink-0">
                        <span className="material-symbols-outlined text-[#bc01ec] text-xs">science</span>
                      </div>
                      <p className="text-[8px] font-bold text-[#1a1c1a]">Azelaic Acid</p>
                    </div>
                  </div>
                  <button className="mt-auto pt-3 w-full text-[#386a20] text-[8px] font-black uppercase tracking-widest hover:underline">DETAIL LENGKAP</button>
                </div>
              </div>
            </div>

            {/* Bottom Summary */}
            <div className="login-glass-panel rounded-xl p-3 border border-white shadow-lg flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#84F75E] flex items-center justify-center shadow-sm">
                  <span className="material-symbols-outlined text-[#0a3900] text-lg">clinical_notes</span>
                </div>
                <div>
                  <p className="text-[10px] font-black text-[#1a1c1a]">Indeks Kesehatan Kulit</p>
                  <p className="text-[8px] text-[#414941]">Intervensi klinis direkomendasikan.</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xl font-black text-[#386a20] leading-none">64<span className="text-[8px] font-bold text-[#414941] ml-0.5">/100</span></p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Thin Footer */}
      <footer className="w-full bg-[#f1f5f2] py-4 border-t border-[#c1c9be]/30 shrink-0">
        <div className="flex flex-col lg:flex-row justify-between items-center px-6 md:px-12 max-w-[1920px] mx-auto gap-4">
          <p className="text-[7px] font-black uppercase tracking-[0.15em] text-[#414941]">
            © 2024 AETHER MED SYSTEMS. DATA DIAGNOSTIK AES-256 ENCRYPTED.
          </p>
          <div className="flex gap-x-4">
            {["Privasi", "Ketentuan", "Kepatuhan Medis"].map((link) => (
              <Link key={link} className="text-[7px] uppercase tracking-[0.15em] font-black text-[#414941] hover:text-[#386a20]" href="#">{link}</Link>
            ))}
          </div>
        </div>
      </footer>

      {/* Notification Pill */}
      {modalType && (
        <div className="fixed top-[4.4rem] left-1/2 -translate-x-1/2 z-[200] w-full max-w-xs px-4">
          <div className={`notification-pill rounded-full p-1.5 flex items-center gap-3 animate-slide-down overflow-hidden relative ${modalType === "success" ? "border-[#84F75E]/50" : "border-red-200"}`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${modalType === "success" ? "bg-[#84F75E]/20 text-[#386a20]" : "bg-red-50 text-red-500"}`}>
              {modalType === "success" ? (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="4">
                  <path className="success-check-draw" strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <span className="material-symbols-outlined text-xl">error</span>
              )}
            </div>
            <div className="flex-grow pr-4">
              <h3 className="text-[11px] font-black text-[#1a1c1a] leading-tight">
                {modalType === "success" ? "Login Berhasil" : "Akses Ditolak"}
              </h3>
              <p className="text-[#414941] text-[9px] leading-tight font-medium">
                {modalType === "success" 
                  ? `Mengarahkan Anda dalam ${redirectCountdown}s...` 
                  : "Email atau password tidak valid."}
              </p>
            </div>
            {modalType === "success" && (
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#f1f5f2]">
                <div 
                  className="h-full bg-[#84F75E] transition-all duration-1000 ease-linear"
                  style={{ width: `${(redirectCountdown / 3) * 100}%` }}
                ></div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Loading Overlay */}
      {loginMutation.isPending && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center modal-backdrop">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-[#84F75E]/30 border-t-[#84F75E] rounded-full animate-spin"></div>
            <p className="text-white font-bold tracking-widest text-xs uppercase">Mengautentikasi...</p>
          </div>
        </div>
      )}
    </div>
  );
}
