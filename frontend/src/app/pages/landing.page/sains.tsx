"use client";
import React from 'react';
import Navbar from './Navbar';


export default function SainsPage() {
    return (
        <div className="bg-surface text-on-surface selection:bg-primary-container min-h-screen font-body">
            {/* TopNavBar Implementation */}
            <Navbar />

            <main className="pt-24 md:pt-32">
                {/* Hero Section: Editorial Style */}
                <section className="px-6 md:px-12 mb-20 md:mb-32">
                    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                        <div className="text-center lg:text-left">
                            <span className="text-primary font-extrabold tracking-[0.2em] uppercase mb-4 md:mb-6 block text-[10px] md:text-xs">Ethereal Clinical Precision</span>
                            <h1 className="text-4xl md:text-6xl lg:text-[4.5rem] leading-[1.1] font-extrabold tracking-tighter text-on-background mb-6 md:mb-8">
                                Misi Kami: <span className="text-primary italic">Radiansi</span> Melalui Data.
                            </h1>
                            <p className="text-lg md:text-xl text-on-surface-variant leading-relaxed max-w-xl mx-auto lg:mx-0">
                                Menyatukan presisi algoritma medis dengan pemahaman biologis untuk mendemokratisasi kesehatan kulit profesional melalui kecerdasan artifisial.
                            </p>
                            <div className="flex justify-center lg:justify-start gap-8 md:gap-12 border-t border-surface-container-highest pt-8 md:pt-10">
                                <div>
                                    <div className="text-3xl md:text-4xl font-extrabold text-primary mb-1">99.4%</div>
                                    <div className="text-[10px] md:text-xs uppercase tracking-widest font-bold text-on-surface-variant">Presisi Klinis</div>
                                </div>
                                <div>
                                    <div className="text-3xl md:text-4xl font-extrabold text-primary mb-1">14nm</div>
                                    <div className="text-[10px] md:text-xs uppercase tracking-widest font-bold text-on-surface-variant">Resolusi Optik</div>
                                </div>
                            </div>
                        </div>
                        <div className="relative w-full max-w-xl mx-auto lg:max-w-none">
                            <div className="aspect-square rounded-xl overflow-hidden shadow-2xl">
                                <img alt="Clinical Microscopy" className="w-full h-full object-cover scale-110" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAkqDQ-GHtmHwua9rpQlOx8bGJP8boT45KEgONhh_g2GMMNX7eGs2e2BkIFwbHBUgUoRjYqPdE4xrVhaoU1qTypP4Rs58IbglLMDnulElf44BN1E1EST3yL4JjC4OHhj5GLbUlM348GUccLjqmgVd6NYKlPeEiJN6I7lLqYc0SZdtWkf97ifkWxCR1KFHhUV1I1xNSdfcY8rJ3BfPtGdbYN61gxxLQcgiyVicXdLgvMMo0_p73EuihR-KaJtQS1KAsdwlq5vp2GWr45" />
                            </div>
                            {/* Floating Glass Panel */}
                            <div className="absolute -bottom-4 -left-4 md:-bottom-8 md:-left-8 bg-white/70 backdrop-blur-3xl p-6 md:p-8 rounded-lg shadow-[0_40px_60px_-5px_rgba(25,28,29,0.04)] max-w-[240px] md:max-w-xs border border-white/20">
                                <span className="material-symbols-outlined text-primary mb-3 md:mb-4">biotech</span>
                                <h4 className="font-bold text-base md:text-lg mb-2">Kedalaman Luminous</h4>
                                <p className="text-xs md:text-sm text-on-surface-variant">Pemindaian multi-layer yang menembus lapisan dermis terdalam.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Technical Bento Grid */}
                <section className="px-6 md:px-12 py-20 md:py-32 bg-surface-container-low">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-16 md:mb-20">
                            <span className="text-primary font-extrabold tracking-[0.2em] uppercase block mb-3 md:mb-4 text-[10px] md:text-xs">Arsitektur Inti</span>
                            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">Teknologi Di Balik DermaScan</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
                            {/* Feature 1: Neural Tensor Flow */}
                            <div className="md:col-span-12 lg:col-span-8 bg-surface-container-lowest p-8 md:p-12 rounded-lg shadow-sm border border-transparent hover:shadow-xl transition-shadow group relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-64 h-64 signature-gradient opacity-5 rounded-full -mr-20 -mt-20 group-hover:opacity-10 transition-opacity"></div>
                                <span className="material-symbols-outlined text-3xl md:text-4xl text-primary mb-6 md:mb-8 block">neurology</span>
                                <h3 className="text-2xl md:text-3xl font-extrabold mb-4 md:mb-6">Neural Tensor Flow</h3>
                                <p className="text-sm md:text-base text-on-surface-variant leading-relaxed max-w-2xl mb-6 md:mb-8">
                                    Algoritma eksklusif kami yang memproses ribuan titik data dalam milidetik. Menggunakan pemetaan tensor untuk mengidentifikasi anomali kulit sebelum kasat mata oleh penglihatan manusia.
                                </p>
                                <div className="flex items-center gap-4">
                                    <div className="h-1 flex-1 md:flex-none md:w-48 bg-surface-container rounded-full overflow-hidden">
                                        <div className="h-full signature-gradient glow-accent w-4/5"></div>
                                    </div>
                                    <span className="text-[10px] md:text-xs font-bold tracking-widest uppercase shrink-0">Processing Power</span>
                                </div>
                            </div>
                            {/* Feature 2: Luminous Contrast */}
                            <div className="md:col-span-6 lg:col-span-4 bg-primary text-on-primary p-8 md:p-12 rounded-lg flex flex-col justify-between">
                                <div>
                                    <span className="material-symbols-outlined text-3xl md:text-4xl mb-6 md:mb-8 block">contrast</span>
                                    <h3 className="text-xl md:text-2xl font-extrabold mb-3 md:mb-4">Luminous Contrast</h3>
                                    <p className="text-primary-container leading-relaxed text-xs md:text-sm">
                                        Memanfaatkan spektrum cahaya khusus untuk menonjolkan vaskularisasi dan pigmentasi pada tingkat seluler.
                                    </p>
                                </div>
                                <div className="mt-8 pt-8 border-t border-white/20">
                                    <span className="text-4xl md:text-5xl font-light">4.0x</span>
                                    <p className="text-[10px] md:text-xs uppercase tracking-widest mt-2 opacity-70">Kejelasan Visual</p>
                                </div>
                            </div>
                            {/* Feature 3: Pemetaan Epitelial AI */}
                            <div className="md:col-span-6 lg:col-span-4 bg-surface-container-lowest p-8 md:p-10 rounded-lg shadow-sm border border-transparent">
                                <span className="material-symbols-outlined text-primary text-2xl md:text-3xl mb-4 md:mb-6 block">grid_view</span>
                                <h4 className="text-lg md:text-xl font-extrabold mb-3 md:mb-4">Pemetaan Epitelial AI</h4>
                                <p className="text-xs md:text-sm text-on-surface-variant leading-relaxed">
                                    Analisis topografi kulit 3D yang menghasilkan profil kesehatan kulit yang dipersonalisasi berdasarkan struktur jaringan nyata.
                                </p>
                            </div>
                            <div className="md:col-span-12 lg:col-span-8 relative rounded-lg overflow-hidden h-[240px] md:h-[300px]">
                                <img alt="Laboratory Visual" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDzN3BYVUpuCrF1VnSj9vH1LokMTuoF5-kYwF91U8O5oXaucstQYj1AmtS-3QuFGO0fycOjOIOgSefQaGFx9XIrevurOe8SqTPRkhS_ZgyVD-bJgotCXqN5EfeT6NDjxqH7gNlEZMUgkr9LWX8eNv-ozAHJs5QhjoYaV0gP22bMlgJuNsM497qy0P4Sb5_Z97ravGy_ftpc4PdV1g84cKQuqZIGBvevSHV1bGNritLiGJfn3caHdRXKG9qCVWhP5jpaBkOV4pRHFExU" />
                                <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-transparent flex items-center px-8 md:px-12">
                                    <div className="max-w-xs text-white">
                                        <h4 className="text-xl md:text-2xl font-bold mb-2">Simulasi Real-time</h4>
                                        <p className="text-xs md:text-sm opacity-90">Visualisasi instan kondisi kulit dalam format 14nm ultra-high definition.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Core Science Quote */}
                <section className="py-24 md:py-40 px-6 md:px-12 bg-white">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="w-12 md:w-16 h-1 signature-gradient mx-auto mb-8 md:mb-12"></div>
                        <h2 className="text-2xl md:text-4xl lg:text-5xl font-extrabold italic tracking-tight text-on-background leading-tight">
                            "Kami tidak hanya melihat permukaan; kami menganalisis <span className="text-primary">masa depan kesehatan kulit Anda</span> melalui lensa bio-teknologi paling mutakhir."
                        </h2>
                        <div className="mt-8 md:mt-12">
                            <p className="font-bold text-base md:text-lg">Dr. Adrian Luminous</p>
                            <p className="text-[10px] md:text-sm uppercase tracking-widest text-on-surface-variant">Chief Scientific Officer</p>
                        </div>
                    </div>
                </section>

                {/* Technical Specs / Data Points */}
                <section className="px-6 md:px-12 pb-20 md:pb-32">
                    <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12">
                        <div className="p-4 md:p-8 border-l-2 border-primary-container">
                            <span className="material-symbols-outlined text-primary mb-3 md:mb-4 text-xl md:text-2xl">speed</span>
                            <h5 className="font-bold text-[10px] md:text-sm uppercase tracking-widest mb-1 md:mb-2">Latensi</h5>
                            <p className="text-xl md:text-2xl font-extrabold">0.02s</p>
                            <p className="text-[10px] text-on-surface-variant mt-1 md:mt-2">Waktu Analisis Neural</p>
                        </div>
                        <div className="p-4 md:p-8 border-l-2 border-primary-container">
                            <span className="material-symbols-outlined text-primary mb-3 md:mb-4 text-xl md:text-2xl">database</span>
                            <h5 className="font-bold text-[10px] md:text-sm uppercase tracking-widest mb-1 md:mb-2">Dataset</h5>
                            <p className="text-xl md:text-2xl font-extrabold">2.4M+</p>
                            <p className="text-[10px] text-on-surface-variant mt-1 md:mt-2">Gambar Klinis Terverifikasi</p>
                        </div>
                        <div className="p-4 md:p-8 border-l-2 border-primary-container">
                            <span className="material-symbols-outlined text-primary mb-3 md:mb-4 text-xl md:text-2xl">security</span>
                            <h5 className="font-bold text-[10px] md:text-sm uppercase tracking-widest mb-1 md:mb-2">Security</h5>
                            <p className="text-xl md:text-2xl font-extrabold">AES-256</p>
                            <p className="text-[10px] text-on-surface-variant mt-1 md:mt-2">Enkripsi Data Pasien</p>
                        </div>
                        <div className="p-4 md:p-8 border-l-2 border-primary-container">
                            <span className="material-symbols-outlined text-primary mb-3 md:mb-4 text-xl md:text-2xl">verified</span>
                            <h5 className="font-bold text-[10px] md:text-sm uppercase tracking-widest mb-1 md:mb-2">Sertifikasi</h5>
                            <p className="text-xl md:text-2xl font-extrabold">ISO 13485</p>
                            <p className="text-[10px] text-on-surface-variant mt-1 md:mt-2">Standar Perangkat Medis</p>
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer Implementation */}
            <footer className="bg-zinc-50 py-16 md:py-20 px-6 md:px-12 border-t border-zinc-200">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center text-center md:text-left">
                        <div className="text-center md:text-left">
                            <div className="text-xl font-bold text-on-surface mb-6 font-headline tracking-tight">DermaScan</div>
                            <p className="font-body text-sm leading-relaxed text-on-surface-variant max-w-sm mx-auto md:mx-0">
                                Luminous Laboratory DermaScan adalah platform analitik kesehatan kulit berbasis AI yang berfokus pada deteksi dini dan pemantauan klinis berkelanjutan.
                            </p>
                        </div>
                    <div className="flex flex-wrap justify-center md:justify-end gap-6 md:gap-8">
                        <a className="text-zinc-500 hover:text-green-500 transition-colors text-xs md:text-sm font-headline" href="#">Privasi</a>
                        <a className="text-zinc-500 hover:text-green-500 transition-colors text-xs md:text-sm font-headline" href="#">Syarat & Ketentuan</a>
                        <a className="text-zinc-500 hover:text-green-500 transition-colors text-xs md:text-sm font-headline" href="#">Metodologi</a>
                        <a className="text-zinc-500 hover:text-green-500 transition-colors text-xs md:text-sm font-headline" href="#">Bantuan</a>
                    </div>
                </div>
            </footer>
        </div>
    );
}
