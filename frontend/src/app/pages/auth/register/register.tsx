"use client";

import { Manrope } from "next/font/google";
import Link from "next/link";
import { useRouter } from "next/navigation";
import "./register.css";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-manrope",
});

export default function RegisterPage() {
  const router = useRouter();
  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/pages/auth/login");
  };

  return (
    <div className={`register-page ${manrope.variable} font-body selection:bg-[#84F75E]/30 selection:text-[#0a3900] min-h-screen flex flex-col auth-animate-in`}>

      <main className="flex-grow flex flex-col lg:flex-row pt-20">
        {/* Left: Sign Up Form */}
        <section className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-12 lg:p-20 bg-white relative overflow-hidden">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#84F75E]/5 rounded-full blur-[100px]"></div>
          <div className="w-full max-w-md relative z-10">
            <div className="mb-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#84F75E]/10 border border-[#84F75E]/20 mb-4">
                <span className="material-symbols-outlined text-[#386a20] text-xs">
                  verified_user
                </span>
                <span className="text-[10px] font-bold text-[#386a20] uppercase tracking-wider">
                  AI Kelas Klinis
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-[#1a1c1a] mb-3 tracking-tight leading-[1.1]">
                Sistem Deteksi <br />
                <span className="text-[#386a20]">SkinCare AI.</span>
              </h1>
              <p className="text-[#414941] font-medium text-sm leading-relaxed">
                Bergabunglah dengan kami untuk menganalisis kulit Anda dan
                dapatkan rekomendasi perawatan jerawat pribadi yang didukung
                oleh riset dermatologi.
              </p>
            </div>

            <form className="space-y-4" onSubmit={handleRegister}>
              <div className="space-y-1.5">
                <label className="block text-[10px] font-bold uppercase tracking-[0.1em] text-[#414941] ml-1">
                  Nama Lengkap
                </label>
                <div className="register-input-focus-accent transition-all">
                  <input
                    className="w-full bg-[#f1f5f2] border-none rounded-lg py-3.5 px-5 text-[#1a1c1a] placeholder:text-[#c1c9be] focus:ring-0 focus:outline-none font-body text-sm"
                    placeholder="Johnathan Doe"
                    type="text"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-[10px] font-bold uppercase tracking-[0.1em] text-[#414941] ml-1">
                  Alamat Email
                </label>
                <div className="register-input-focus-accent transition-all">
                  <input
                    className="w-full bg-[#f1f5f2] border-none rounded-lg py-3.5 px-5 text-[#1a1c1a] placeholder:text-[#c1c9be] focus:ring-0 focus:outline-none font-body text-sm"
                    placeholder="dr.smith@aethermed.com"
                    type="email"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-[10px] font-bold uppercase tracking-[0.1em] text-[#414941] ml-1">
                    Kata Sandi
                  </label>
                  <div className="register-input-focus-accent transition-all">
                    <input
                      className="w-full bg-[#f1f5f2] border-none rounded-lg py-3.5 px-5 text-[#1a1c1a] placeholder:text-[#c1c9be] focus:ring-0 focus:outline-none font-body text-sm"
                      placeholder="••••••••"
                      type="password"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="block text-[10px] font-bold uppercase tracking-[0.1em] text-[#414941] ml-1">
                    Konfirmasi Kata Sandi
                  </label>
                  <div className="register-input-focus-accent transition-all">
                    <input
                      className="w-full bg-[#f1f5f2] border-none rounded-lg py-3.5 px-5 text-[#1a1c1a] placeholder:text-[#c1c9be] focus:ring-0 focus:outline-none font-body text-sm"
                      placeholder="••••••••"
                      type="password"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 px-1 py-2">
                <div className="relative flex items-center">
                  <input
                    className="w-4 h-4 rounded border-[#c1c9be] bg-[#e8eee9] text-[#84F75E] focus:ring-[#84F75E] focus:ring-offset-white"
                    id="terms"
                    type="checkbox"
                    required
                  />
                </div>
                <label
                  className="text-xs font-medium text-[#414941] cursor-pointer"
                  htmlFor="terms"
                >
                  Saya setuju dengan Protokol Privasi Klinis & Ketentuan
                </label>
              </div>

              <button
                className="w-full bg-[#84F75E] text-[#0a3900] py-4 rounded-xl font-bold text-base shadow-lg shadow-[#84F75E]/20 hover:shadow-[#84F75E]/30 hover:-translate-y-0.5 transition-all mt-4"
                type="submit"
              >
                Buat Akun
              </button>
            </form>

            <div className="mt-8 flex items-center justify-center gap-4 text-xs font-medium text-[#414941]">
              <span>Sudah punya akun?</span>
              <Link
                className="text-[#386a20] font-bold hover:underline"
                href="/pages/auth/login"
              >
                Masuk
              </Link>
            </div>
          </div>
        </section>

        {/* Right: AI Acne Detection Analysis Panel */}
        <section className="hidden lg:flex w-1/2 bg-[#f0f4f2] relative flex-col items-center justify-center overflow-hidden border-l border-[#c1c9be]/30">
          {/* Background Elements */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(132,247,94,0.08)_0%,transparent_70%)]"></div>
          <div
            className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(#1a1c1a 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          ></div>

          <div className="relative z-10 w-full max-w-2xl px-12 flex flex-col gap-6">
            <div className="flex items-end justify-between px-2">
              <div>
                <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#414941] mb-1">
                  Dasbor Diagnostik
                </h2>
                <p className="text-2xl font-extrabold text-[#1a1c1a]">
                  Deteksi AI <span className="text-[#386a20] font-medium">v4.2.0</span>
                </p>
              </div>
              <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full border border-white shadow-sm">
                <span className="w-2 h-2 rounded-full bg-[#84F75E] animate-pulse"></span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#414941]">
                  Mesin Neural Aktif
                </span>
              </div>
            </div>

            <div className="grid grid-cols-12 gap-5">
              {/* Main Facial Scan Visual */}
              <div className="col-span-8 register-glass-panel rounded-2xl p-4 border border-white shadow-xl shadow-black/[0.03] relative overflow-hidden">
                <div className="absolute top-4 left-4 z-20 flex flex-col gap-1.5">
                  <div className="bg-black/70 backdrop-blur-sm text-white text-[9px] font-bold px-2 py-1 rounded-md flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span>{" "}
                    PAPULA TERDETEKSI
                  </div>
                  <div className="bg-black/70 backdrop-blur-sm text-white text-[9px] font-bold px-2 py-1 rounded-md flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full"></span>{" "}
                    PUSTULA (MODERAT)
                  </div>
                </div>

                <div className="relative rounded-xl overflow-hidden aspect-square bg-[#0c120c]">
                  <img
                    alt="Facial skin mapping"
                    className="w-full h-full object-cover opacity-70"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCj8vstHE3kvGuWTr4d4AcvKL9k3I8szQJxsaSZhaiGLHBzMmRidXxNPkSt7pqMxqQO_JMP4d5QjA_25IsCs_eCjB-sFjU785I_1rdtiDdemukClWDj5SXvud6REA-dUsN2S-_Y94n9VM1-b7u_lhCejGCXLrurNRwLBxRyptmf7HmDWhs2iKLL1FJEfQ4Aw96jNQGtlyma8Zr2tzYlsPvsRxKRpSKTDqItNMjJIbkpIftcxwL_IO2MGphVQ9PfLLBdUVHL-njH1gk"
                  />
                  {/* Futuristic Scanning Overlays */}
                  <div className="absolute inset-0 register-scan-overlay opacity-40"></div>

                  {/* Mapping Points */}
                  <div className="absolute top-1/3 left-1/4 w-5 h-5 border border-red-500 rounded-full animate-ping opacity-70"></div>
                  <div className="absolute top-[33.3%] left-[25%] w-2 h-2 bg-red-500 rounded-full shadow-[0_0_8px_rgba(239,68,68,0.8)]"></div>

                  <div className="absolute top-1/2 right-1/3 w-5 h-5 border border-yellow-500 rounded-full animate-ping opacity-70"></div>
                  <div className="absolute top-[50%] right-[33.3%] w-2 h-2 bg-yellow-500 rounded-full shadow-[0_0_8px_rgba(234,179,8,0.8)]"></div>

                  <svg
                    className="absolute inset-0 w-full h-full pointer-events-none opacity-30"
                    viewBox="0 0 100 100"
                  >
                    <path
                      d="M10 10 L25 10 M10 10 L10 25"
                      fill="none"
                      stroke="#84F75E"
                      strokeWidth="0.5"
                    />
                    <path
                      d="M90 10 L75 10 M90 10 L90 25"
                      fill="none"
                      stroke="#84F75E"
                      strokeWidth="0.5"
                    />
                    <path
                      d="M10 90 L25 90 M10 90 L10 75"
                      fill="none"
                      stroke="#84F75E"
                      strokeWidth="0.5"
                    />
                    <path
                      d="M90 90 L75 90 M90 90 L90 75"
                      fill="none"
                      stroke="#84F75E"
                      strokeWidth="0.5"
                    />
                  </svg>
                </div>

                <div className="mt-4 flex justify-between items-center px-1">
                  <div>
                    <p className="text-[9px] font-bold text-[#414941] uppercase tracking-wider">
                      Kepercayaan Deteksi
                    </p>
                    <p className="text-base font-extrabold text-[#1a1c1a]">
                      98.4%
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-[9px] font-bold text-[#414941] uppercase tracking-wider">
                      Waktu Analisis
                    </p>
                    <p className="text-base font-extrabold text-[#1a1c1a]">
                      1.2d
                    </p>
                  </div>
                </div>
              </div>

              {/* Metrics Column */}
              <div className="col-span-4 flex flex-col gap-4">
                {/* Condition Metrics */}
                <div className="register-glass-panel rounded-2xl p-4 border border-white shadow-lg flex flex-col gap-4">
                  <div>
                    <div className="flex justify-between items-end mb-1.5">
                      <span className="text-[10px] font-bold text-[#414941] uppercase">
                        Hidrasi
                      </span>
                      <span className="text-[11px] font-extrabold text-[#1a1c1a]">
                        72%
                      </span>
                    </div>
                    <div className="h-1.5 w-full bg-[#f1f5f2] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-400 rounded-full"
                        style={{ width: "72%" }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-end mb-1.5">
                      <span className="text-[10px] font-bold text-[#414941] uppercase">
                        Kadar Minyak
                      </span>
                      <span className="text-[11px] font-extrabold text-[#1a1c1a]">
                        84%
                      </span>
                    </div>
                    <div className="h-1.5 w-full bg-[#f1f5f2] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-yellow-400 rounded-full"
                        style={{ width: "84%" }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-end mb-1.5">
                      <span className="text-[10px] font-bold text-[#414941] uppercase">
                        Inflamasi
                      </span>
                      <span className="text-[11px] font-extrabold text-[#1a1c1a]">
                        38%
                      </span>
                    </div>
                    <div className="h-1.5 w-full bg-[#f1f5f2] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-red-400 rounded-full"
                        style={{ width: "38%" }}
                      ></div>
                    </div>
                  </div>
                </div>

                {/* Recommended Regimen */}
                <div className="flex-grow register-glass-panel rounded-2xl p-4 border border-white shadow-lg flex flex-col">
                  <p className="text-[10px] font-bold text-[#414941] uppercase mb-4 tracking-wider">
                    Regimen yang Direkomendasikan
                  </p>
                  <div className="space-y-3.5">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-[#84F75E]/15 flex items-center justify-center">
                        <span className="material-symbols-outlined text-[#386a20] text-lg">
                          sanitizer
                        </span>
                      </div>
                      <div>
                        <p className="text-[11px] font-bold text-[#1a1c1a]">
                          Pembersih BHA
                        </p>
                        <p className="text-[9px] text-[#414941]">
                          Pagi / Malam
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-[#bc01ec]/10 flex items-center justify-center">
                        <span className="material-symbols-outlined text-[#bc01ec] text-lg">
                          science
                        </span>
                      </div>
                      <div>
                        <p className="text-[11px] font-bold text-[#1a1c1a]">
                          Azelaic Acid 10%
                        </p>
                        <p className="text-[9px] text-[#414941]">Malam saja</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center">
                        <span className="material-symbols-outlined text-blue-500 text-lg">
                          opacity
                        </span>
                      </div>
                      <div>
                        <p className="text-[11px] font-bold text-[#1a1c1a]">
                          Hidrator Bebas Minyak
                        </p>
                        <p className="text-[9px] text-[#414941]">
                          Sesuai kebutuhan
                        </p>
                      </div>
                    </div>
                  </div>
                  <button className="mt-5 w-full py-2 bg-[#1a1c1a] text-white text-[10px] font-bold rounded-lg hover:bg-[#386a20] transition-colors uppercase tracking-widest">
                    Lihat Analisis
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom Summary Card */}
            <div className="register-glass-panel rounded-2xl p-5 border border-white shadow-lg flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl bg-[#84F75E] flex items-center justify-center shadow-md shadow-[#84F75E]/20">
                  <span className="material-symbols-outlined text-[#0a3900] text-xl">
                    clinical_notes
                  </span>
                </div>
                <div>
                  <p className="text-sm font-extrabold text-[#1a1c1a]">
                    Indeks Kesehatan Keseluruhan
                  </p>
                  <p className="text-[11px] text-[#414941]">
                    Jerawat moderat terdeteksi. Disarankan regimen klinis.
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-3xl font-extrabold text-[#386a20] leading-none">
                  64
                  <span className="text-[10px] font-bold text-[#414941] ml-1">
                    /100
                  </span>
                </p>
                <span className="text-[9px] font-bold bg-yellow-500/15 text-yellow-700 px-2 py-0.5 rounded-full uppercase tracking-tighter mt-1 inline-block">
                  Butuh Tinjauan
                </span>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full bg-[#f1f5f2] py-8 border-t border-[#c1c9be]/30">
        <div className="flex flex-col lg:flex-row justify-between items-center px-6 md:px-12 max-w-[1920px] mx-auto gap-8">
          <p className="text-[9px] md:text-[10px] uppercase tracking-[0.15em] font-bold text-[#414941] text-center lg:text-left order-2 lg:order-1">
            © 2024 AETHER MED SYSTEMS. SEMUA DATA DIAGNOSTIK TERENKRIPSI
            (AES-256).
          </p>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-4 order-1 lg:order-2">
            <Link
              className="text-[9px] md:text-[10px] uppercase tracking-[0.15em] font-bold text-[#414941] hover:text-[#386a20] transition-colors"
              href="#"
            >
              Protokol Privasi
            </Link>
            <Link
              className="text-[9px] md:text-[10px] uppercase tracking-[0.15em] font-bold text-[#414941] hover:text-[#386a20] transition-colors"
              href="#"
            >
              Ketentuan Layanan
            </Link>
            <Link
              className="text-[9px] md:text-[10px] uppercase tracking-[0.15em] font-bold text-[#414941] hover:text-[#386a20] transition-colors"
              href="#"
            >
              Kepatuhan
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
