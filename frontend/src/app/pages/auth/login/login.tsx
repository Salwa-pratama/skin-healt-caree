"use client";

import { Manrope } from "next/font/google";
import Link from "next/link";
import { useRouter } from "next/navigation";
import "./login.css";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-manrope",
});

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/pages/dashboard");
  };

  return (
    <div
      className={`login-page ${manrope.variable} font-manrope selection:bg-[#84F75E]/30 selection:text-[#1c6d00] min-h-screen flex flex-col auth-animate-in`}
    >
      {/* Main Content */}
      <main className="flex-grow flex flex-col lg:flex-row pt-20 lg:pt-0">
        {/* Left: Login Form */}
        <section className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-12 lg:p-24 bg-white relative overflow-hidden">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#84F75E]/10 rounded-full blur-[100px]"></div>
          <div className="w-full max-w-md relative z-10">
            <div className="mb-10 sm:mb-12">
              <div className="flex items-center gap-2 mb-8">
                <span className="text-2xl font-black tracking-tighter text-[#1c6d00]">
                  DermaScan
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#191c1d] mb-4 tracking-tight leading-tight">
                Vitalitas Digital <br />
                <span className="text-[#1c6d00]">dalam genggaman Anda.</span>
              </h1>
              <p className="text-[#595c5d] font-medium">
                Silakan masuk untuk mengakses dasbor klinis DermaScan Anda.
              </p>
            </div>

            <form className="space-y-6" onSubmit={handleLogin}>
              <div className="space-y-2">
                <label className="block text-[10px] font-black uppercase tracking-widest text-[#595c5d] ml-1">
                  Alamat Email
                </label>
                <div className="login-input-focus-accent transition-all">
                  <input
                    className="w-full bg-[#f3f4f5] border-none rounded-2xl py-4 px-5 text-[#191c1d] placeholder:text-slate-400 focus:ring-2 focus:ring-[#84f75e] focus:outline-none font-medium"
                    placeholder="dr.smith@dermascan.com"
                    type="email"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center px-1">
                  <label className="block text-[10px] font-black uppercase tracking-widest text-[#595c5d]">
                    Kata Sandi
                  </label>
                  <Link
                    className="text-[10px] font-bold text-[#1c6d00] hover:underline uppercase tracking-widest"
                    href="#"
                  >
                    Lupa Kata Sandi?
                  </Link>
                </div>
                <div className="login-input-focus-accent transition-all">
                  <input
                    className="w-full bg-[#f3f4f5] border-none rounded-2xl py-4 px-5 text-[#191c1d] placeholder:text-slate-400 focus:ring-2 focus:ring-[#84f75e] focus:outline-none font-medium"
                    placeholder="••••••••"
                    type="password"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3 px-1">
                <div className="relative flex items-center">
                  <input
                    className="w-5 h-5 rounded border-[#becab4] bg-[#edeeef] text-[#1c6d00] focus:ring-[#1c6d00] focus:ring-offset-white"
                    id="remember"
                    type="checkbox"
                  />
                </div>
                <label
                  className="text-sm font-semibold text-[#595c5d] cursor-pointer"
                  htmlFor="remember"
                >
                  Ingat perangkat ini
                </label>
              </div>

              <button
                className="w-full login-signature-gradient text-white py-4 rounded-2xl font-black text-lg shadow-lg shadow-[#1c6d00]/20 hover:shadow-[#1c6d00]/40 transition-all hover:-translate-y-0.5 active:scale-95"
                type="submit"
              >
                Masuk
              </button>
            </form>

            <div className="mt-10">
              <div className="relative flex items-center justify-center mb-8">
                <div className="w-full h-px bg-[#edeeef]"></div>
                <span className="absolute px-4 bg-white text-[10px] font-black uppercase tracking-widest text-[#595c5d]">
                  atau lanjutkan dengan
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <button className="flex items-center justify-center gap-3 py-3 rounded-2xl border border-[#edeeef] hover:bg-[#f3f4f5] transition-colors font-bold text-xs uppercase tracking-widest text-[#595c5d]">
                  <span className="material-symbols-outlined text-xl">
                    medical_services
                  </span>
                  SSO
                </button>
                <button className="flex items-center justify-center gap-3 py-3 rounded-2xl border border-[#edeeef] hover:bg-[#f3f4f5] transition-colors font-bold text-xs uppercase tracking-widest text-[#595c5d]">
                  <span className="material-symbols-outlined text-xl">
                    fingerprint
                  </span>
                  Biometrik
                </button>
              </div>
            </div>

            <p className="mt-12 text-center text-xs font-bold text-[#595c5d] uppercase tracking-widest">
              Baru di Lab DermaScan?{" "}
              <Link
                className="text-[#1c6d00] font-black hover:underline"
                href="/pages/auth/register"
              >
                Minta Akses Klinis
              </Link>
            </p>
          </div>
        </section>

        {/* Right: AI Acne Detection Analysis Panel */}
        <section className="hidden lg:flex w-1/2 bg-[#f0f4f0] relative flex-col items-center justify-center overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(132,247,94,0.05)_0%,transparent_70%)]"></div>
          <div className="absolute top-0 right-0 w-full h-full opacity-30 pointer-events-none dot-grid"></div>

          <div className="relative z-10 w-full max-w-2xl px-8 flex flex-col gap-6">
            <div className="flex items-end justify-between px-2">
              <div>
                <h2 className="text-xs font-black uppercase tracking-[0.2em] text-on-surface-variant mb-1">
                  Mode Diagnostik
                </h2>
                <p className="text-2xl font-black text-on-surface">
                  Deteksi Jerawat AI{" "}
                  <span className="text-[#1c6d00]">v4.2</span>
                </p>
              </div>
              <div className="flex items-center gap-2 bg-white/50 backdrop-blur px-3 py-1.5 rounded-full border border-white">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                <span className="text-[10px] font-bold uppercase text-on-surface-variant">
                  Mesin Neural Aktif
                </span>
              </div>
            </div>

            <div className="grid grid-cols-12 gap-5">
              {/* Main Facial Scan Visual */}

              <div className="col-span-8 glass-panel rounded-3xl p-5 border border-white shadow-xl shadow-black/5 relative overflow-hidden">
                <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
                  <div className="bg-black/60 backdrop-blur text-white text-[10px] font-bold px-2 py-1 rounded flex items-center gap-2">
                    <span className="w-1 h-1 bg-red-500 rounded-full"></span>{" "}
                    PAPULA TERDETEKSI
                  </div>
                  <div className="bg-black/60 backdrop-blur text-white text-[10px] font-bold px-2 py-1 rounded flex items-center gap-2">
                    <span className="w-1 h-1 bg-yellow-500 rounded-full"></span>{" "}
                    PUSTULA (MODERAT)
                  </div>
                </div>

                <div className="relative rounded-2xl overflow-hidden aspect-square bg-[#0a0f0a]">
                  <img
                    alt="Pemetaan kulit wajah"
                    className="w-full h-full object-cover opacity-80"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCj8vstHE3kvGuWTr4d4AcvKL9k3I8szQJxsaSZhaiGLHBzMmRidXxNPkSt7pqMxqQO_JMP4d5QjA_25IsCs_eCjB-sFjU785I_1rdtiDdemukClWDj5SXvud6REA-dUsN2S-_Y94n9VM1-b7u_lhCejGCXLrurNRwLBxRyptmf7HmDWhs2iKLL1FJEfQ4Aw96jNQGtlyma8Zr2tzYlsPvsRxKRpSKTDqItNMjJIbkpIftcxwL_IO2MGphVQ9PfLLBdUVHL-njH1gk"
                  />
                  {/* Futuristic Scanning Overlays */}
                  <div className="absolute inset-0 scan-overlay opacity-50"></div>
                  <div className="absolute inset-0 border-[0.5px] border-primary/20"></div>

                  {/* Mapping Points */}
                  <div className="absolute top-1/3 left-1/4 w-4 h-4 border border-red-500 rounded-full animate-ping"></div>
                  <div className="absolute top-[40%] left-[28%] w-1.5 h-1.5 bg-red-500 rounded-full"></div>

                  <div className="absolute top-1/2 right-1/3 w-4 h-4 border border-yellow-500 rounded-full animate-ping"></div>
                  <div className="absolute top-[55%] right-[30%] w-1.5 h-1.5 bg-yellow-500 rounded-full"></div>

                  <svg
                    className="absolute inset-0 w-full h-full pointer-events-none opacity-40"
                    viewBox="0 0 100 100"
                  >
                    <path
                      d="M20 20 L30 20 M20 20 L20 30"
                      fill="none"
                      stroke="#84F75E"
                      strokeWidth="0.5"
                    />
                    <path
                      d="M80 20 L70 20 M80 20 L80 30"
                      fill="none"
                      stroke="#84F75E"
                      strokeWidth="0.5"
                    />
                    <path
                      d="M20 80 L30 80 M20 80 L20 70"
                      fill="none"
                      stroke="#84F75E"
                      strokeWidth="0.5"
                    />
                    <path
                      d="M80 80 L70 80 M80 80 L80 70"
                      fill="none"
                      stroke="#84F75E"
                      strokeWidth="0.5"
                    />
                  </svg>
                </div>

                <div className="mt-4 flex justify-between items-center px-1">
                  <div>
                    <p className="text-[10px] font-bold text-on-surface-variant uppercase">
                      Keyakinan Deteksi
                    </p>
                    <p className="text-lg font-black text-on-surface">98.4%</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-bold text-on-surface-variant uppercase">
                      Waktu Analisis
                    </p>
                    <p className="text-lg font-black text-on-surface">1.2d</p>
                  </div>
                </div>
              </div>

              {/* Metrics Column */}
              <div className="col-span-4 flex flex-col gap-4">
                {/* Condition Metrics */}
                <div className="glass-panel rounded-3xl p-5 border border-white shadow-lg flex flex-col gap-4">
                  {[
                    { label: "Hidrasi", val: 72, color: "bg-blue-400" },
                    { label: "Kadar Minyak", val: 84, color: "bg-yellow-400" },
                    { label: "Inflamasi", val: 38, color: "bg-red-400" },
                  ].map((metric) => (
                    <div key={metric.label}>
                      <div className="flex justify-between items-end mb-1.5">
                        <span className="text-[10px] font-bold text-on-surface-variant uppercase">
                          {metric.label}
                        </span>
                        <span className="text-xs font-black text-on-surface">
                          {metric.val}%
                        </span>
                      </div>
                      <div className="h-1.5 w-full bg-surface-container rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${metric.color}`}
                          style={{ width: `${metric.val}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Recommended Regimen */}

                <div className="flex-grow glass-panel rounded-3xl p-5 border border-white shadow-lg flex flex-col">
                  <p className="text-[10px] font-bold text-on-surface-variant uppercase mb-4">
                    Regimen Direkomendasikan
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                        <span className="material-symbols-outlined text-tertiary text-lg">
                          sanitizer
                        </span>
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-on-surface">
                          Pembersih BHA
                        </p>
                        <p className="text-[9px] text-on-surface-variant">
                          Pagi / Malam
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center">
                        <span className="material-symbols-outlined text-secondary text-lg">
                          science
                        </span>
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-on-surface">
                          Asam Azelaic 10%
                        </p>
                        <p className="text-[9px] text-on-surface-variant">
                          Malam saja
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                        <span className="material-symbols-outlined text-blue-600 text-lg">
                          opacity
                        </span>
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-on-surface">
                          Hidrator Bebas Minyak
                        </p>
                        <p className="text-[9px] text-on-surface-variant">
                          Sesuai kebutuhan
                        </p>
                      </div>
                    </div>
                  </div>
                  <button className="mt-auto w-full py-2 bg-on-surface text-white text-[10px] font-bold rounded-xl hover:bg-tertiary transition-colors">
                    LIHAT RENCANA LENGKAP
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom Summary */}

            <div className="glass-panel rounded-3xl p-6 border border-white shadow-lg flex items-center justify-between">
              <div className="flex items-center gap-5">
                <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
                  <span className="material-symbols-outlined text-on-primary">
                    clinical_notes
                  </span>
                </div>
                <div>
                  <p className="text-sm font-black text-on-surface">
                    Indeks Kesehatan Kulit Keseluruhan
                  </p>
                  <p className="text-xs text-on-surface-variant">
                    Jerawat moderat terdeteksi. Intervensi klinis
                    direkomendasikan.
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-3xl font-black text-tertiary leading-none">
                  64
                  <span className="text-xs font-bold text-on-surface-variant ml-1">
                    /100
                  </span>
                </p>
                <span className="text-[9px] font-bold bg-yellow-500/10 text-yellow-700 px-2 py-0.5 rounded-full uppercase">
                  Perlu Tindakan
                </span>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full bg-[#f3f4f5] py-10 border-t border-[#edeeef]">
        <div className="flex flex-col lg:flex-row justify-between items-center px-6 md:px-12 max-w-[1920px] mx-auto gap-8">
          <p className="text-[9px] font-black uppercase tracking-[0.2em] text-[#595c5d] text-center lg:text-left order-2 lg:order-1">
            © 2024 DERMASCAN CLINICAL TECH. DATA DIAGNOSTIK TERENKRIPSI AES-256.
          </p>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 order-1 lg:order-2">
            {[
              "Protokol Privasi",
              "Ketentuan Layanan",
              "Kepatuhan Medis",
              "Lab Keamanan",
            ].map((link) => (
              <Link
                key={link}
                className="text-[9px] uppercase tracking-[0.2em] font-black text-[#595c5d] hover:text-[#1c6d00] transition-colors"
                href="#"
              >
                {link}
              </Link>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
