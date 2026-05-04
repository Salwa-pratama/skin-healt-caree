"use client";
import React from 'react';


export default function TentangPage() {
    return (
        <div className="bg-surface font-body text-on-surface antialiased overflow-x-hidden min-h-screen">
            {/* Top Navigation */}
            <main className="pt-15">
                {/* Hero Section */}
                <section className="relative px-6 md:px-12 pt-8 pb-12 md:pb-20 overflow-hidden">
                    {/* Background glows */}
                    <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[80px] -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
                    <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#84f75e]/5 rounded-full blur-[100px] translate-x-1/3 translate-y-1/3 pointer-events-none"></div>

                    <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center relative z-10">
                        <div className="text-center lg:text-left">
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary font-bold text-[10px] md:text-xs tracking-widest uppercase mb-6 border border-primary/20 shadow-sm">
                                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
                                Eksplorasi Kedalaman Kulit
                            </div>
                            <h1 className="text-4xl md:text-5xl lg:text-[4rem] leading-[1.05] font-black tracking-tight mb-6 text-on-surface">
                                Misi Kami: <br className="hidden md:block" />
                                <span className="bg-gradient-to-r from-primary via-[#45b021] to-[#84f75e] bg-clip-text text-transparent italic pr-2">Radiansi</span><br className="hidden md:block" /> Melalui Data.
                            </h1>
                            <p className="text-base md:text-lg text-on-surface-variant leading-relaxed max-w-lg mx-auto lg:mx-0 font-medium">
                                Menyatukan presisi algoritma medis dengan pemahaman biologis untuk mendemokratisasi kesehatan kulit profesional melalui kecerdasan artifisial.
                            </p>
                        </div>
                        <div className="relative mt-10 lg:mt-0">
                            <div className="w-full h-[250px] md:h-[350px] lg:h-[400px] rounded-[2rem] overflow-hidden shadow-2xl relative group">
                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10"></div>
                                <img
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    alt="Modern laboratory interior with clean white surfaces"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuC50WO2_dQECw23l_EaxUf5VDNCJsyb_nYu2CcGCEZNDTINZDZ-U39l6-xKv9gOq6d-w82suYO2R6ArhPt09oJMjk8BuGBASrrE81u6b-uHvPqiIODe7PCElC9dZCemjoWS9mgNacmRyAIBsxuO5nl32TVrwP0Yzn1-c0XLW8b190s-2W65kH-OL6axv4r7XsHqO-wxMa44RftJv05aaiifTNXX3Ol_XrUKzhf8iuAVbsgFlfW_b5xlwX_6vmSBavw78w6Wy_rMMY9h"
                                />
                            </div>
                            {/* Overlapping Glass Card */}
                            <div className="absolute -bottom-6 md:-bottom-8 -left-4 md:-left-8 bg-white/90 backdrop-blur-2xl p-4 md:p-6 rounded-2xl shadow-xl shadow-black/10 max-w-[220px] md:max-w-[280px] border border-white z-20 hover:-translate-y-2 transition-transform duration-300">
                                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
                                    <span className="material-symbols-outlined text-primary text-xl md:text-2xl">clinical_notes</span>
                                </div>
                                <h3 className="text-lg md:text-xl font-extrabold mb-2 text-on-surface">Presisi Klinis</h3>
                                <p className="text-xs md:text-sm text-on-surface-variant font-medium leading-relaxed">Akurasi deteksi 99.4% divalidasi oleh dewan dermatologi internasional.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Compliance & Standards Bento */}
                <section className="px-6 md:px-12 py-16 md:py-24 bg-surface-container-low relative border-y border-outline-variant/20">
                    <div className="absolute inset-0 dot-grid opacity-30"></div>
                    <div className="max-w-6xl mx-auto relative z-10">
                        <div className="flex flex-col items-center text-center mb-10 md:mb-16">
                            <span className="text-xs md:text-sm font-extrabold tracking-[0.2em] text-primary uppercase mb-3">Integritas Medis</span>
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4">Standar Tanpa Kompromi</h2>
                            <p className="text-base md:text-lg text-on-surface-variant max-w-2xl px-4 font-medium leading-relaxed">Kami beroperasi di bawah protokol kesehatan paling ketat di dunia untuk memastikan keamanan data dan validitas hasil analitik Anda.</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                            {/* Card 1 */}
                            <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm hover:shadow-xl border border-outline-variant/30 group hover:-translate-y-2 transition-all duration-300">
                                <div className="w-12 h-12 rounded-2xl bg-surface-variant group-hover:bg-primary flex items-center justify-center mb-6 transition-colors duration-300">
                                    <span className="material-symbols-outlined text-primary group-hover:text-white text-2xl transition-colors duration-300">verified_user</span>
                                </div>
                                <h4 className="text-xl md:text-2xl font-extrabold mb-3 text-on-surface">ISO 13485</h4>
                                <p className="text-sm md:text-base text-on-surface-variant leading-relaxed font-medium">Sertifikasi internasional untuk sistem manajemen mutu perangkat medis yang menjamin keamanan produk unggulan.</p>
                            </div>
                            {/* Card 2 */}
                            <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm hover:shadow-xl border border-outline-variant/30 group hover:-translate-y-2 transition-all duration-300">
                                <div className="w-12 h-12 rounded-2xl bg-surface-variant group-hover:bg-primary flex items-center justify-center mb-6 transition-colors duration-300">
                                    <span className="material-symbols-outlined text-primary group-hover:text-white text-2xl transition-colors duration-300">lock</span>
                                </div>
                                <h4 className="text-xl md:text-2xl font-extrabold mb-3 text-on-surface">HIPAA Compliant</h4>
                                <p className="text-sm md:text-base text-on-surface-variant leading-relaxed font-medium">Data kesehatan Anda dilindungi dengan enkripsi tingkat militer sesuai dengan standar kerahasiaan medis global.</p>
                            </div>
                            {/* Card 3 */}
                            <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm hover:shadow-xl border border-outline-variant/30 group hover:-translate-y-2 transition-all duration-300">
                                <div className="w-12 h-12 rounded-2xl bg-surface-variant group-hover:bg-primary flex items-center justify-center mb-6 transition-colors duration-300">
                                    <span className="material-symbols-outlined text-primary group-hover:text-white text-2xl transition-colors duration-300">science</span>
                                </div>
                                <h4 className="text-xl md:text-2xl font-extrabold mb-3 text-on-surface">Uji Klinis</h4>
                                <p className="text-sm md:text-base text-on-surface-variant leading-relaxed font-medium">Telah melewati lebih dari 50.000 dataset klinis dari berbagai etnis untuk memastikan inklusivitas diagnostik.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Lab & Team Section */}
                <section className="px-6 md:px-12 py-16 md:py-24 overflow-hidden bg-surface">
                    <div className="max-w-6xl mx-auto">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                            <div className="lg:col-span-5 text-center lg:text-left order-2 lg:order-1">
                                <span className="text-xs md:text-sm font-extrabold tracking-[0.2em] text-primary uppercase mb-3 block">Riset Berkelanjutan</span>
                                <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight mb-8 leading-[1.1] text-on-surface">Sinergi <span className="text-primary italic">Laboratorium</span> & AI</h2>
                                <div className="space-y-8 text-left">
                                    <div className="flex gap-4 md:gap-6 group">
                                        <div className="shrink-0 w-12 h-12 rounded-2xl bg-primary/10 group-hover:bg-primary flex items-center justify-center transition-colors duration-300">
                                            <span className="font-extrabold text-primary group-hover:text-white text-base transition-colors duration-300">01</span>
                                        </div>
                                        <div>
                                            <h5 className="text-lg md:text-xl font-extrabold mb-2 text-on-surface">Luminous Laboratory NYC</h5>
                                            <p className="text-sm md:text-base text-on-surface-variant leading-relaxed font-medium">Pusat pengembangan algoritma visi komputer yang memenangkan penghargaan inovasi teknologi kesehatan.</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4 md:gap-6 group">
                                        <div className="shrink-0 w-12 h-12 rounded-2xl bg-primary/10 group-hover:bg-primary flex items-center justify-center transition-colors duration-300">
                                            <span className="font-extrabold text-primary group-hover:text-white text-base transition-colors duration-300">02</span>
                                        </div>
                                        <div>
                                            <h5 className="text-lg md:text-xl font-extrabold mb-2 text-on-surface">Kolaborasi Universitas</h5>
                                            <p className="text-sm md:text-base text-on-surface-variant leading-relaxed font-medium">Bekerja sama dengan peneliti dari Departemen Dermatologi terkemuka untuk pembaruan basis data patologi.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="lg:col-span-7 grid grid-cols-2 gap-4 mt-6 lg:mt-0 order-1 lg:order-2">
                                <div className="rounded-[2rem] overflow-hidden h-48 md:h-60 lg:h-72 shadow-xl relative group">
                                    <div className="absolute inset-0 bg-primary/20 group-hover:opacity-0 transition-opacity duration-500 z-10"></div>
                                    <img
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        alt="Scientist in lab coat"
                                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuC0gGbN099NYLqG8agaS-tUNTkqWA1MQXTMW_Y7rPC2WNgwONvhXjXfiHbO8Yg5fujXlH63t500q8c-fwcbrF5Wvn4AFxFXGmF1v2E4oguE1eccckDzf_xgfUfC-EQxfwN2V46KciJOTukGLEfItKeZzBMPx9XlD8fmOlRa5oeVGpGjrmy4NW-ee_y0iiVLFFWWH9i8C4eWhW0E63-q31WibkWOVHB3mWRe9WZeEUdnYJAynf9NTVypozSrrpAreokML4bA_HRVkYiK"
                                    />
                                </div>
                                <div className="rounded-[2rem] overflow-hidden h-56 md:h-64 lg:h-80 mt-8 md:mt-16 shadow-xl relative group">
                                    <div className="absolute inset-0 bg-primary/10 group-hover:opacity-0 transition-opacity duration-500 z-10"></div>
                                    <img
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        alt="Microscopic skin structure"
                                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuB6_8AfGf2q4dImnQa3hdfbS0B-1f4pgESL6u74yhV1PBmQe1VKvh2eFExAAPHFiinQyLqqQrwehLkRMxr5mz0R7r4N3VwYhbJrnamnb4jU1nm1hctoEwtmK-Dee2-Q3GhuZQ8xu-j9DViXPiYTeiS7UyWmqTUQ23Jl5rqVxPhMQBVuPfMZRpFnu-Du32V9dGOzMzbkGyG6ybZGZ_E1zreOWXf78tHeREAajYuVWvJq98sRo0PyIoPfneLF0UaUyvFVBAsyjUS6VY_Z"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Values CTA */}
                <section className="px-6 md:px-12 py-12 md:py-20 bg-surface">
                    <div className="max-w-6xl mx-auto rounded-[2rem] md:rounded-[2.5rem] signature-gradient p-8 md:p-16 text-center relative overflow-hidden shadow-2xl shadow-primary/20">
                        <div className="relative z-10">
                            <h2 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tighter leading-[1.1]">Masa Depan Kulit Anda<br className="hidden md:block" /> Dimulai Di Sini.</h2>
                            <p className="text-white/90 text-base md:text-xl max-w-xl mx-auto mb-8 font-medium">
                                Bergabunglah dengan ribuan pengguna yang telah mempercayakan kesehatan kulit mereka pada teknologi paling presisi di industri ini.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 md:gap-5 justify-center items-center">
                                <button className="w-full sm:w-auto bg-white text-primary px-8 py-3.5 rounded-full font-extrabold text-base hover:scale-105 transition-transform shadow-xl shadow-black/10 flex items-center justify-center gap-2">
                                    Dapatkan Akses Sekarang
                                    <span className="material-symbols-outlined text-lg">arrow_forward</span>
                                </button>
                                <button className="w-full sm:w-auto bg-black/20 text-white border border-white/30 backdrop-blur-md px-8 py-3.5 rounded-full font-extrabold text-base hover:bg-black/40 transition-all flex items-center justify-center gap-2">
                                    Lihat Metodologi
                                    <span className="material-symbols-outlined text-lg">menu_book</span>
                                </button>
                            </div>
                        </div>
                        {/* Abstract Decorative Shapes */}
                        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/20 rounded-full blur-[80px] -mr-32 -mt-32 pointer-events-none"></div>
                        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#84f75e]/30 rounded-full blur-[80px] -ml-24 -mb-24 pointer-events-none"></div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="w-full py-10 md:py-14 px-6 md:px-12 bg-surface-container-low border-t border-outline-variant/10">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 items-start mb-10">
                        <div className="text-center md:text-left">
                            <div className="text-lg font-bold text-on-surface mb-4 font-headline tracking-tight">DermaScan</div>
                            <p className="font-body text-xs md:text-sm leading-relaxed text-on-surface-variant max-w-xs mx-auto md:mx-0">
                                Luminous Laboratory DermaScan adalah platform analitik kesehatan kulit berbasis AI yang berfokus pada deteksi dini dan pemantauan klinis berkelanjutan.
                            </p>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6">
                            <div className="flex flex-col space-y-3">
                                <span className="text-on-surface font-bold text-xs uppercase tracking-widest">Produk</span>
                                <a className="text-on-surface-variant text-xs md:text-sm hover:text-primary transition-colors" href="#">Sains</a>
                                <a className="text-on-surface-variant text-xs md:text-sm hover:text-primary transition-colors" href="#">Teknologi</a>
                            </div>
                            <div className="flex flex-col space-y-3">
                                <span className="text-on-surface font-bold text-xs uppercase tracking-widest">Legal</span>
                                <a className="text-on-surface-variant text-xs md:text-sm hover:text-primary transition-colors" href="#">Privasi</a>
                                <a className="text-on-surface-variant text-xs md:text-sm hover:text-primary transition-colors" href="#">Syarat</a>
                            </div>
                            <div className="flex flex-col space-y-3">
                                <span className="text-on-surface font-bold text-xs uppercase tracking-widest">Dukungan</span>
                                <a className="text-on-surface-variant text-xs md:text-sm hover:text-primary transition-colors" href="#">Bantuan</a>
                                <a className="text-on-surface-variant text-xs md:text-sm hover:text-primary transition-colors" href="#">Metodologi</a>
                            </div>
                            <div className="flex flex-col space-y-3">
                                <span className="text-on-surface font-bold text-xs uppercase tracking-widest">Sosial</span>
                                <a className="text-on-surface-variant text-xs md:text-sm hover:text-primary transition-colors" href="#">Instagram</a>
                                <a className="text-on-surface-variant text-xs md:text-sm hover:text-primary transition-colors" href="#">LinkedIn</a>
                            </div>
                        </div>
                    </div>
                    <div className="pt-6 border-t border-outline-variant/10 flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="font-body text-xs leading-relaxed text-on-surface-variant text-center md:text-left">
                            © 2024 Luminous Laboratory DermaScan. Presisi Klinis untuk Kesehatan kulit.
                        </p>
                        <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-on-surface-variant text-lg md:text-xl">language</span>
                            <span className="text-xs font-bold text-on-surface uppercase tracking-wider">ID / Bahasa Indonesia</span>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
