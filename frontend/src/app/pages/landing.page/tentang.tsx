"use client";
import React from 'react';
import Navbar from './Navbar';

export default function TentangPage() {
    return (
        <div className="bg-surface font-body text-on-surface antialiased overflow-x-hidden min-h-screen">
            {/* Top Navigation */}
            <Navbar />
            <main className="pt-24 md:pt-32">
                {/* Hero Section */}
                <section className="px-6 md:px-12 mb-20 md:mb-32">
                    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                        <div className="text-center lg:text-left">
                            <span className="text-xs font-extrabold tracking-[0.2em] text-primary uppercase mb-6 block">Eksplorasi Kedalaman Kulit</span>
                            <h1 className="text-4xl md:text-6xl lg:text-[4.5rem] leading-[1.1] font-extrabold tracking-tighter mb-8 text-on-surface">
                                Misi Kami: <span className="text-primary italic">Radiansi</span> Melalui Data.
                            </h1>
                            <p className="text-lg md:text-xl text-on-surface-variant leading-relaxed max-w-xl mx-auto lg:mx-0">
                                Menyatukan presisi algoritma medis dengan pemahaman biologis untuk mendemokratisasi kesehatan kulit profesional melalui kecerdasan artifisial.
                            </p>
                        </div>
                        <div className="relative mt-12 lg:mt-0">
                            <div className="w-full h-[400px] md:h-[600px] rounded-xl overflow-hidden ambient-shadow">
                                <img 
                                    className="w-full h-full object-cover" 
                                    alt="Modern laboratory interior with clean white surfaces" 
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuC50WO2_dQECw23l_EaxUf5VDNCJsyb_nYu2CcGCEZNDTINZDZ-U39l6-xKv9gOq6d-w82suYO2R6ArhPt09oJMjk8BuGBASrrE81u6b-uHvPqiIODe7PCElC9dZCemjoWS9mgNacmRyAIBsxuO5nl32TVrwP0Yzn1-c0XLW8b190s-2W65kH-OL6axv4r7XsHqO-wxMa44RftJv05aaiifTNXX3Ol_XrUKzhf8iuAVbsgFlfW_b5xlwX_6vmSBavw78w6Wy_rMMY9h" 
                                />
                            </div>
                            {/* Overlapping Glass Card */}
                            <div className="absolute -bottom-6 md:-bottom-12 -left-4 md:-left-12 glass-panel p-6 md:p-10 rounded-lg ambient-shadow max-w-[240px] md:max-w-xs border border-outline-variant/10">
                                <span className="material-symbols-outlined text-primary text-3xl md:text-4xl mb-4">clinical_notes</span>
                                <h3 className="text-lg md:text-xl font-bold mb-2">Presisi Klinis</h3>
                                <p className="text-xs md:text-sm text-on-surface-variant">Akurasi deteksi 99.4% divalidasi oleh dewan dermatologi internasional.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Compliance & Standards Bento */}
                <section className="px-6 md:px-12 py-20 md:py-32 bg-surface-container-low">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex flex-col items-center text-center mb-16 md:mb-20">
                            <span className="text-xs font-extrabold tracking-[0.2em] text-primary uppercase mb-4">Integritas Medis</span>
                            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-6">Standar Tanpa Kompromi</h2>
                            <p className="text-base md:text-lg text-on-surface-variant max-w-2xl px-4">Kami beroperasi di bawah protokol kesehatan paling ketat di dunia untuk memastikan keamanan data dan validitas hasil.</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                            {/* Card 1 */}
                            <div className="bg-surface-container-lowest p-8 md:p-12 rounded-lg ambient-shadow group hover:bg-primary-container transition-all duration-500">
                                <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-primary-container group-hover:bg-white flex items-center justify-center mb-6 md:mb-8 transition-colors">
                                    <span className="material-symbols-outlined text-primary text-2xl md:text-3xl">verified_user</span>
                                </div>
                                <h4 className="text-xl md:text-2xl font-extrabold mb-4">ISO 13485</h4>
                                <p className="text-sm md:text-base text-on-surface-variant leading-relaxed">Sertifikasi internasional untuk sistem manajemen mutu perangkat medis yang menjamin keamanan produk unggulan.</p>
                            </div>
                            {/* Card 2 */}
                            <div className="bg-surface-container-lowest p-8 md:p-12 rounded-lg ambient-shadow group hover:bg-primary-container transition-all duration-500">
                                <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-primary-container group-hover:bg-white flex items-center justify-center mb-6 md:mb-8 transition-colors">
                                    <span className="material-symbols-outlined text-primary text-2xl md:text-3xl">lock</span>
                                </div>
                                <h4 className="text-xl md:text-2xl font-extrabold mb-4">HIPAA Compliant</h4>
                                <p className="text-sm md:text-base text-on-surface-variant leading-relaxed">Data kesehatan Anda dilindungi dengan enkripsi tingkat militer sesuai dengan standar kerahasiaan medis global.</p>
                            </div>
                            {/* Card 3 */}
                            <div className="bg-surface-container-lowest p-8 md:p-12 rounded-lg ambient-shadow group hover:bg-primary-container transition-all duration-500">
                                <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-primary-container group-hover:bg-white flex items-center justify-center mb-6 md:mb-8 transition-colors">
                                    <span className="material-symbols-outlined text-primary text-2xl md:text-3xl">science</span>
                                </div>
                                <h4 className="text-xl md:text-2xl font-extrabold mb-4">Uji Klinis</h4>
                                <p className="text-sm md:text-base text-on-surface-variant leading-relaxed">Telah melewati lebih dari 50.000 dataset klinis dari berbagai etnis untuk memastikan inklusivitas diagnostik.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Lab & Team Section */}
                <section className="px-6 md:px-12 py-20 md:py-32 overflow-hidden">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                            <div className="lg:col-span-5 text-center lg:text-left">
                                <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-8 md:mb-10 leading-tight">Sinergi Laboratorium & Kecerdasan Buatan</h2>
                                <div className="space-y-6 md:space-y-8 text-left">
                                    <div className="flex gap-5 md:gap-6">
                                        <div className="shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-primary flex items-center justify-center">
                                            <span className="font-bold text-primary text-sm md:text-base">01</span>
                                        </div>
                                        <div>
                                            <h5 className="text-lg md:text-xl font-bold mb-1 md:mb-2">Luminous Laboratory NYC</h5>
                                            <p className="text-sm md:text-base text-on-surface-variant">Pusat pengembangan algoritma visi komputer yang memenangkan penghargaan inovasi teknologi kesehatan.</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-5 md:gap-6">
                                        <div className="shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-primary flex items-center justify-center">
                                            <span className="font-bold text-primary text-sm md:text-base">02</span>
                                        </div>
                                        <div>
                                            <h5 className="text-lg md:text-xl font-bold mb-1 md:mb-2">Kolaborasi Universitas</h5>
                                            <p className="text-sm md:text-base text-on-surface-variant">Bekerja sama dengan peneliti dari Departemen Dermatologi terkemuka untuk pembaruan basis data patologi.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="lg:col-span-7 grid grid-cols-2 gap-4 mt-8 lg:mt-0">
                                <div className="rounded-xl overflow-hidden h-64 md:h-80 shadow-lg">
                                    <img 
                                        className="w-full h-full object-cover" 
                                        alt="Scientist in lab coat" 
                                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuC0gGbN099NYLqG8agaS-tUNTkqWA1MQXTMW_Y7rPC2WNgwONvhXjXfiHbO8Yg5fujXlH63t500q8c-fwcbrF5Wvn4AFxFXGmF1v2E4oguE1eccckDzf_xgfUfC-EQxfwN2V46KciJOTukGLEfItKeZzBMPx9XlD8fmOlRa5oeVGpGjrmy4NW-ee_y0iiVLFFWWH9i8C4eWhW0E63-q31WibkWOVHB3mWRe9WZeEUdnYJAynf9NTVypozSrrpAreokML4bA_HRVkYiK" 
                                    />
                                </div>
                                <div className="rounded-xl overflow-hidden h-72 md:h-96 -mt-8 md:-mt-16 shadow-lg">
                                    <img 
                                        className="w-full h-full object-cover" 
                                        alt="Microscopic skin structure" 
                                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuB6_8AfGf2q4dImnQa3hdfbS0B-1f4pgESL6u74yhV1PBmQe1VKvh2eFExAAPHFiinQyLqqQrwehLkRMxr5mz0R7r4N3VwYhbJrnamnb4jU1nm1hctoEwtmK-Dee2-Q3GhuZQ8xu-j9DViXPiYTeiS7UyWmqTUQ23Jl5rqVxPhMQBVuPfMZRpFnu-Du32V9dGOzMzbkGyG6ybZGZ_E1zreOWXf78tHeREAajYuVWvJq98sRo0PyIoPfneLF0UaUyvFVBAsyjUS6VY_Z" 
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Values CTA */}
                <section className="px-6 md:px-12 py-16 md:py-24">
                    <div className="max-w-7xl mx-auto rounded-xl md:rounded-3xl signature-gradient p-10 md:p-20 text-center relative overflow-hidden shadow-2xl">
                        <div className="relative z-10">
                            <h2 className="text-3xl md:text-5xl font-extrabold text-on-primary mb-6 md:mb-8 tracking-tighter">Masa Depan Kulit Anda Dimulai Di Sini.</h2>
                            <p className="text-on-primary/80 text-lg md:text-xl max-w-2xl mx-auto mb-10 md:mb-12">
                                Bergabunglah dengan ribuan pengguna yang telah mempercayakan kesehatan kulit mereka pada teknologi paling presisi di industri ini.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center items-center">
                                <button className="w-full sm:w-auto bg-white text-primary px-10 py-4 rounded-full font-extrabold hover:scale-105 transition-transform shadow-lg">Dapatkan Akses Sekarang</button>
                                <button className="w-full sm:w-auto bg-black/20 text-white border border-white/30 backdrop-blur-md px-10 py-4 rounded-full font-extrabold hover:bg-black/30 transition-all">Lihat Metodologi</button>
                            </div>
                        </div>
                        {/* Abstract Decorative Shapes */}
                        <div className="absolute top-0 right-0 w-64 md:w-96 h-64 md:h-96 bg-white/10 rounded-full blur-[80px] md:blur-[100px] -mr-32 md:-mr-48 -mt-32 md:-mt-48 pointer-events-none"></div>
                        <div className="absolute bottom-0 left-0 w-48 md:w-64 h-48 md:h-64 bg-primary-container/20 rounded-full blur-[60px] md:blur-[80px] -ml-24 md:-ml-32 -mb-24 md:-mb-32 pointer-events-none"></div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="w-full py-16 md:py-20 px-6 md:px-12 bg-surface-container-low border-t border-outline-variant/10">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-start mb-16">
                        <div className="text-center md:text-left">
                            <div className="text-xl font-bold text-on-surface mb-6 font-headline tracking-tight">DermaScan</div>
                            <p className="font-body text-sm leading-relaxed text-on-surface-variant max-w-sm mx-auto md:mx-0">
                                Luminous Laboratory DermaScan adalah platform analitik kesehatan kulit berbasis AI yang berfokus pada deteksi dini dan pemantauan klinis berkelanjutan.
                            </p>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-8">
                            <div className="flex flex-col space-y-4">
                                <span className="text-on-surface font-bold text-xs md:text-sm uppercase tracking-widest">Produk</span>
                                <a className="text-on-surface-variant text-sm hover:text-primary transition-colors" href="#">Sains</a>
                                <a className="text-on-surface-variant text-sm hover:text-primary transition-colors" href="#">Teknologi</a>
                            </div>
                            <div className="flex flex-col space-y-4">
                                <span className="text-on-surface font-bold text-xs md:text-sm uppercase tracking-widest">Legal</span>
                                <a className="text-on-surface-variant text-sm hover:text-primary transition-colors" href="#">Privasi</a>
                                <a className="text-on-surface-variant text-sm hover:text-primary transition-colors" href="#">Syarat</a>
                            </div>
                            <div className="flex flex-col space-y-4">
                                <span className="text-on-surface font-bold text-xs md:text-sm uppercase tracking-widest">Dukungan</span>
                                <a className="text-on-surface-variant text-sm hover:text-primary transition-colors" href="#">Bantuan</a>
                                <a className="text-on-surface-variant text-sm hover:text-primary transition-colors" href="#">Metodologi</a>
                            </div>
                            <div className="flex flex-col space-y-4">
                                <span className="text-on-surface font-bold text-xs md:text-sm uppercase tracking-widest">Sosial</span>
                                <a className="text-on-surface-variant text-sm hover:text-primary transition-colors" href="#">Instagram</a>
                                <a className="text-on-surface-variant text-sm hover:text-primary transition-colors" href="#">LinkedIn</a>
                            </div>
                        </div>
                    </div>
                    <div className="pt-8 border-t border-outline-variant/10 flex flex-col md:flex-row justify-between items-center gap-6">
                        <p className="font-body text-xs md:text-sm leading-relaxed text-on-surface-variant text-center md:text-left">
                            © 2024 Luminous Laboratory DermaScan. Presisi Klinis untuk Kesehatan Kulit.
                        </p>
                        <div className="flex items-center gap-3">
                            <span className="material-symbols-outlined text-on-surface-variant text-xl md:text-2xl">language</span>
                            <span className="text-xs md:text-sm font-bold text-on-surface uppercase tracking-wider">ID / Bahasa Indonesia</span>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
