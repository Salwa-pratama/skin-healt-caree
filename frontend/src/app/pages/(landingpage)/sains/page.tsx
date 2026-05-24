"use client";
import React from 'react';



export default function SainsPage() {
    return (
        <div className="bg-surface text-on-surface selection:bg-primary-container min-h-screen font-body">

            <main className="pt-16 md:pt-24">
                {/* Hero Section: Editorial Style */}
                <section className="px-6 md:px-12 mb-12 md:mb-20">
                    <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                        <div className="text-center lg:text-left">
                            <span className="text-primary font-extrabold tracking-[0.2em] uppercase mb-3 md:mb-4 block text-[10px]">Ethereal Clinical Precision</span>
                            <h1 className="text-3xl md:text-5xl lg:text-[4rem] leading-[1.1] font-extrabold tracking-tighter text-on-background mb-4 md:mb-6">
                                Misi Kami: <span className="text-primary italic">Radiansi</span> Melalui Data.
                            </h1>
                            <p className="text-base md:text-lg text-on-surface-variant leading-relaxed max-w-lg mx-auto lg:mx-0">
                                Menyatukan presisi algoritma medis dengan pemahaman biologis untuk mendemokratisasi kesehatan kulit profesional melalui kecerdasan artifisial.
                            </p>
                            <div className="flex justify-center lg:justify-start gap-6 md:gap-10 border-t border-surface-container-highest pt-6 md:pt-8 mt-6 md:mt-8">
                                <div>
                                    <div className="text-2xl md:text-3xl font-extrabold text-primary mb-1">99.4%</div>
                                    <div className="text-[10px] uppercase tracking-widest font-bold text-on-surface-variant">Presisi Klinis</div>
                                </div>
                                <div>
                                    <div className="text-2xl md:text-3xl font-extrabold text-primary mb-1">14nm</div>
                                    <div className="text-[10px] uppercase tracking-widest font-bold text-on-surface-variant">Resolusi Optik</div>
                                </div>
                            </div>
                        </div>
                        {/* Right: Image + Floating Card */}
                        <div className="relative w-full max-w-[260px] md:max-w-[320px] lg:max-w-sm mx-auto mt-10 lg:mt-0">
                            <div className="aspect-square rounded-[2rem] overflow-hidden shadow-2xl">
                                <img alt="Clinical Microscopy" className="w-full h-full object-cover scale-110" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAkqDQ-GHtmHwua9rpQlOx8bGJP8boT45KEgONhh_g2GMMNX7eGs2e2BkIFwbHBUgUoRjYqPdE4xrVhaoU1qTypP4Rs58IbglLMDnulElf44BN1E1EST3yL4JjC4OHhj5GLbUlM348GUccLjqmgVd6NYKlPeEiJN6I7lLqYc0SZdtWkf97ifkWxCR1KFHhUV1I1xNSdfcY8rJ3BfPtGdbYN61gxxLQcgiyVicXdLgvMMo0_p73EuihR-KaJtQS1KAsdwlq5vp2GWr45" />
                            </div>
                            {/* Floating Glass Panel */}
                            <div className="absolute -bottom-4 -left-4 md:-bottom-6 md:-left-6 glass-panel ambient-shadow p-4 md:p-5 rounded-2xl max-w-[180px] md:max-w-[220px] border border-white/40">
                                <span className="material-symbols-outlined text-primary mb-2 text-xl md:text-2xl">biotech</span>
                                <h4 className="font-bold text-xs md:text-sm mb-1">Kedalaman Luminous</h4>
                                <p className="text-[10px] leading-tight text-on-surface-variant">Pemindaian multi-layer yang menembus dermis terdalam.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Technical Bento Grid */}
                <section className="px-6 md:px-12 py-12 md:py-20 bg-surface-container-low">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-10 md:mb-16">
                            <span className="text-primary font-extrabold tracking-[0.2em] uppercase block mb-2 md:mb-3 text-[10px]">Arsitektur Inti</span>
                            <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight">Teknologi Di Balik DermaScan</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6">
                            {/* Feature 1: Neural Tensor Flow */}
                            <div className="md:col-span-12 lg:col-span-8 bg-surface-container-lowest p-6 md:p-8 rounded-2xl shadow-sm border border-transparent hover:shadow-xl transition-shadow group relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-48 h-48 signature-gradient opacity-5 rounded-full -mr-16 -mt-16 group-hover:opacity-10 transition-opacity"></div>
                                <span className="material-symbols-outlined text-2xl md:text-3xl text-primary mb-4 md:mb-6 block">neurology</span>
                                <h3 className="text-xl md:text-2xl font-extrabold mb-3 md:mb-4">Neural Tensor Flow</h3>
                                <p className="text-xs md:text-sm text-on-surface-variant leading-relaxed max-w-2xl mb-5 md:mb-6">
                                    Algoritma eksklusif kami yang memproses ribuan titik data dalam milidetik. Menggunakan pemetaan tensor untuk mengidentifikasi anomali kulit sebelum kasat mata oleh penglihatan manusia.
                                </p>
                                <div className="flex items-center gap-3">
                                    <div className="h-1 flex-1 md:flex-none md:w-40 bg-surface-container rounded-full overflow-hidden">
                                        <div className="h-full signature-gradient glow-accent w-4/5"></div>
                                    </div>
                                    <span className="text-[10px] font-bold tracking-widest uppercase shrink-0">Processing Power</span>
                                </div>
                            </div>
                            {/* Feature 2: Luminous Contrast */}
                            <div className="md:col-span-6 lg:col-span-4 bg-primary text-on-primary p-6 md:p-8 rounded-2xl flex flex-col justify-between">
                                <div>
                                    <span className="material-symbols-outlined text-2xl md:text-3xl mb-4 md:mb-6 block">contrast</span>
                                    <h3 className="text-lg md:text-xl font-extrabold mb-2 md:mb-3">Luminous Contrast</h3>
                                    <p className="text-primary-container leading-relaxed text-[10px] md:text-xs">
                                        Memanfaatkan spektrum cahaya khusus untuk menonjolkan vaskularisasi dan pigmentasi pada tingkat seluler.
                                    </p>
                                </div>
                                <div className="mt-6 pt-6 border-t border-white/20">
                                    <span className="text-3xl md:text-4xl font-light">4.0x</span>
                                    <p className="text-[10px] uppercase tracking-widest mt-1.5 opacity-70">Kejelasan Visual</p>
                                </div>
                            </div>
                            {/* Feature 3: Pemetaan Epitelial AI */}
                            <div className="md:col-span-6 lg:col-span-4 bg-surface-container-lowest p-6 md:p-8 rounded-2xl shadow-sm border border-transparent">
                                <span className="material-symbols-outlined text-primary text-xl md:text-2xl mb-3 md:mb-4 block">grid_view</span>
                                <h4 className="text-base md:text-lg font-extrabold mb-2 md:mb-3">Pemetaan Epitelial AI</h4>
                                <p className="text-[10px] md:text-xs text-on-surface-variant leading-relaxed">
                                    Analisis topografi kulit 3D yang menghasilkan profil kesehatan kulit yang dipersonalisasi berdasarkan struktur jaringan nyata.
                                </p>
                            </div>
                            <div className="md:col-span-12 lg:col-span-8 relative rounded-2xl overflow-hidden h-[200px] md:h-[240px]">
                                <img alt="Laboratory Visual" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDzN3BYVUpuCrF1VnSj9vH1LokMTuoF5-kYwF91U8O5oXaucstQYj1AmtS-3QuFGO0fycOjOIOgSefQaGFx9XIrevurOe8SqTPRkhS_ZgyVD-bJgotCXqN5EfeT6NDjxqH7gNlEZMUgkr9LWX8eNv-ozAHJs5QhjoYaV0gP22bMlgJuNsM497qy0P4Sb5_Z97ravGy_ftpc4PdV1g84cKQuqZIGBvevSHV1bGNritLiGJfn3caHdRXKG9qCVWhP5jpaBkOV4pRHFExU" />
                                <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-transparent flex items-center px-6 md:px-8">
                                    <div className="max-w-xs text-white">
                                        <h4 className="text-lg md:text-xl font-bold mb-1.5">Simulasi Real-time</h4>
                                        <p className="text-[10px] md:text-xs opacity-90">Visualisasi instan kondisi kulit dalam format 14nm ultra-high definition.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Core Science Quote */}
                <section className="py-16 md:py-24 px-6 md:px-12 bg-surface">
                    <div className="max-w-3xl mx-auto text-center">
                        <div className="w-8 md:w-12 h-1 signature-gradient mx-auto mb-6 md:mb-8"></div>
                        <h2 className="text-xl md:text-3xl lg:text-4xl font-extrabold italic tracking-tight text-on-background leading-tight">
                            "Kami tidak hanya melihat permukaan; kami menganalisis <span className="text-primary">masa depan kesehatan kulit Anda</span> melalui lensa bio-teknologi paling mutakhir."
                        </h2>
                        <div className="mt-6 md:mt-8">
                            <p className="font-bold text-sm md:text-base">Dr. Adrian Luminous</p>
                            <p className="text-[10px] md:text-xs uppercase tracking-widest text-on-surface-variant mt-1">Chief Scientific Officer</p>
                        </div>
                    </div>
                </section>

                {/* Technical Specs / Data Points */}
                <section className="px-6 md:px-12 pb-12 md:pb-20">
                    <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
                        <div className="p-4 md:p-6 border-l-2 border-primary-container">
                            <span className="material-symbols-outlined text-primary mb-2 md:mb-3 text-lg md:text-xl">speed</span>
                            <h5 className="font-bold text-[10px] uppercase tracking-widest mb-1">Latensi</h5>
                            <p className="text-lg md:text-xl font-extrabold">0.02s</p>
                            <p className="text-[10px] text-on-surface-variant mt-1">Waktu Analisis Neural</p>
                        </div>
                        <div className="p-4 md:p-6 border-l-2 border-primary-container">
                            <span className="material-symbols-outlined text-primary mb-2 md:mb-3 text-lg md:text-xl">database</span>
                            <h5 className="font-bold text-[10px] uppercase tracking-widest mb-1">Dataset</h5>
                            <p className="text-lg md:text-xl font-extrabold">2.4M+</p>
                            <p className="text-[10px] text-on-surface-variant mt-1">Gambar Klinis Terverifikasi</p>
                        </div>
                        <div className="p-4 md:p-6 border-l-2 border-primary-container">
                            <span className="material-symbols-outlined text-primary mb-2 md:mb-3 text-lg md:text-xl">security</span>
                            <h5 className="font-bold text-[10px] uppercase tracking-widest mb-1">Security</h5>
                            <p className="text-lg md:text-xl font-extrabold">AES-256</p>
                            <p className="text-[10px] text-on-surface-variant mt-1">Enkripsi Data Pasien</p>
                        </div>
                        <div className="p-4 md:p-6 border-l-2 border-primary-container">
                            <span className="material-symbols-outlined text-primary mb-2 md:mb-3 text-lg md:text-xl">verified</span>
                            <h5 className="font-bold text-[10px] uppercase tracking-widest mb-1">Sertifikasi</h5>
                            <p className="text-lg md:text-xl font-extrabold">ISO 13485</p>
                            <p className="text-[10px] text-on-surface-variant mt-1">Standar Perangkat Medis</p>
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer Implementation */}
            <footer className="bg-surface-container-low py-10 md:py-14 px-6 md:px-12 border-t border-outline-variant/20">
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 items-center text-center md:text-left">
                    <div className="text-center md:text-left">
                        <div className="text-lg font-bold text-on-surface mb-4 font-headline tracking-tight">DermaScan</div>
                        <p className="font-body text-xs md:text-sm leading-relaxed text-on-surface-variant max-w-sm mx-auto md:mx-0">
                            Luminous Laboratory DermaScan adalah platform analitik kesehatan kulit berbasis AI yang berfokus pada deteksi dini dan pemantauan klinis berkelanjutan.
                        </p>
                    </div>
                    <div className="flex flex-wrap justify-center md:justify-end gap-5 md:gap-6">
                        <a className="text-on-surface-variant hover:text-primary transition-colors text-[10px] md:text-xs font-headline" href="#">Privasi</a>
                        <a className="text-on-surface-variant hover:text-primary transition-colors text-[10px] md:text-xs font-headline" href="#">Syarat &amp; Ketentuan</a>
                        <a className="text-on-surface-variant hover:text-primary transition-colors text-[10px] md:text-xs font-headline" href="#">Metodologi</a>
                        <a className="text-on-surface-variant hover:text-primary transition-colors text-[10px] md:text-xs font-headline" href="#">Bantuan</a>
                    </div>
                </div>
            </footer>
        </div>
    );
}
