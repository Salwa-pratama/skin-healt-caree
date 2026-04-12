"use client";
import Link from 'next/link';
import Navbar from './Navbar';

export default function LandingPage() {
    return (
        <div className="bg-surface font-body text-on-surface antialiased min-h-screen">
            {/* Top Navigation */}
            <Navbar />
            {/* Hero Section */}
            <header className="relative pt-32 pb-16 md:pt-48 md:pb-32 px-6 md:px-8 overflow-hidden bg-surface">
                <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                    <div className="flex-1 text-center lg:text-left">
                        <div className="inline-flex items-center px-4 py-1.5 rounded-lg bg-primary-container text-on-primary-container text-[10px] md:text-xs font-bold tracking-widest uppercase mb-6 md:mb-8">
                            AI Medis Generasi Terbaru
                        </div>
                        <h1 className="text-4xl md:text-6xl lg:text-8xl font-extrabold font-headline leading-[1.1] tracking-tight text-on-surface mb-6 md:mb-8">
                            Kesehatan Kulit Presisi <br /><span className="text-primary">Didukung oleh AI</span>
                        </h1>
                        <p className="text-base md:text-xl text-on-surface-variant max-w-xl mx-auto lg:mx-0 mb-8 md:mb-12 leading-relaxed">
                            Manfaatkan kekuatan jaringan saraf tingkat klinis untuk menganalisis, memantau, dan mengoptimalkan kesehatan kulit Anda dengan akurasi yang tak tertandingi.
                        </p>
                        <div className="flex flex-wrap justify-center lg:justify-start gap-4 md:gap-5">
                            <Link href="/pages/auth/login" className="signature-gradient text-on-primary px-10 py-4 rounded-full font-bold text-lg hover:opacity-90 transition-all scale-95 active:scale-90 shadow-lg shadow-primary/20 inline-block">
                                Mulai Pemindaian
                            </Link>
                            <button className="bg-surface-container-high text-on-surface px-8 md:px-10 py-3 md:py-4 rounded-full font-bold text-base md:text-lg hover:bg-surface-container-highest transition-all scale-95 active:scale-90">
                                Cara Kerja
                            </button>
                        </div>
                    </div>
                    <div className="flex-1 relative w-full max-w-2xl lg:max-w-none">
                        <div className="w-full aspect-[4/5] rounded-3xl bg-secondary-container/20 overflow-hidden ambient-shadow border border-outline-variant/10 relative">
                            <img alt="Close up high quality portrait for skin analysis" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBqr6DLUdgEg7BxUVXave7c8Ej5wTUEcu0OTX-9U--KmesHYY-QspZ4CKBUn8LzWx-c2lyXl2iOyYSaj17N15A2tGWYF2WSTw-vt4_-_9LX9MEPMcI9ZM0D-5loBBJJYjdWxuRCdzinNEcm9RDOSEFSWYfiljdOo92pWKOSKJPRYzZBAbwdpqb4PtKkwEPQEIj4JJUWrWfM3swZ9zP1eEVPpNowgLMNbPDYT35sY7QqSITHirDThvmqS0C6jD7wYU5gVCVa1uRBpbnA" />
                            <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent pointer-events-none"></div>
                            {/* Floating Glass Element */}
                            <div className="absolute bottom-6 right-6 md:bottom-10 md:right-10 glass-panel p-4 md:p-6 rounded-2xl ambient-shadow max-w-[200px] md:max-w-[260px] border border-white/40">
                                <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-4">
                                    <span className="material-symbols-outlined text-primary text-2xl md:text-3xl">biotech</span>
                                    <div className="h-1.5 flex-1 bg-surface-container-high rounded-full overflow-hidden">
                                        <div className="h-full w-4/5 bg-primary-container rounded-full shadow-[0_0_12px_#84f75e]"></div>
                                    </div>
                                </div>
                                <p className="text-[10px] md:text-xs font-extrabold text-on-surface uppercase tracking-tight">Akurasi Epidermal: 99.4%</p>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Science Section */}
            <section className="bg-surface py-16 md:py-32 px-6 md:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
                        <div className="order-2 lg:order-1 relative">
                            <div className="grid grid-cols-2 gap-4 md:gap-6">
                                <div className="aspect-square bg-surface-container rounded-3xl overflow-hidden ambient-shadow">
                                    <img alt="Microscopic view of skin cells" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAsYtzTdXVxolPtyRR4_pWQ3Qjx39-yCDhpf4uuJVUkJZbGcuPn22uQMGCJIb7qWr-p9szDf-rtSqqbGrMqtHOPkIuDr3vyRgipC24SHWrkrkwtpDUrKeyOk_ELtFquKiSA2XUCnfajqr0ydCdJ11ncYr5QX-HYc6Bofv18_iC5pZo_iWD3beydMEyQUJEQMnP8rJUwpdYdoFRyqiB6c_5P6dagA5z-3qKzQ-kLkfbfjJsTxwWxUJS51Hl_EL0VoxZ0dsxXdvonFSaO" />
                                </div>
                                <div className="aspect-square bg-surface-container rounded-3xl overflow-hidden ambient-shadow translate-y-8 md:translate-y-16">
                                    <img alt="Data visualization of cellular structure" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCHdfaJ8tT9MkNgHwxW6xsPoJxnI2reLuTCQIowl_2W2NzGl7Head5ErEoKODQbx_GXc0xg4rpTxBHwBFWNsu5Q5g9qHnEfU8hKGe_rb8aFcJLQ1yomaxtq8LnN8aPqTL6rOLan46rCfCBnm6DhC51xoK38uuyfYE8Z2bawb79hk4uUpKtXNB4vmcTpQbPWrd6rfFrnx_V8xioY1qlKLs0hFIR2KlyTRcH-Ai7oFnejZH0iSY0UICpYuDwFLghiXpnP_lybzoBQ7Vl1" />
                                </div>
                            </div>
                        </div>
                        <div className="order-1 lg:order-2 text-center lg:text-left">
                            <h2 className="text-3xl md:text-5xl font-extrabold font-headline text-on-surface mb-8 md:mb-10 leading-tight">
                                Sains Mendalam. <br /><span className="text-primary">Laboratorium Ethereal.</span>
                            </h2>
                            <div className="space-y-8 md:space-y-12">
                                <div className="relative pl-6 md:pl-10 border-l-2 border-primary/20 text-left">
                                    <div className="absolute -left-[1.5px] top-0 w-[3px] h-8 bg-primary"></div>
                                    <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">Pemetaan Epidermal</h3>
                                    <p className="text-sm md:text-lg text-on-surface-variant leading-relaxed">
                                        AI kami membangun peta topologi multi-lapisan kulit Anda, mengidentifikasi ketidakteraturan di bawah permukaan sebelum terlihat oleh mata telanjang.
                                    </p>
                                </div>
                                <div className="relative pl-6 md:pl-10 border-l-2 border-primary/20 text-left">
                                    <div className="absolute -left-[1.5px] top-0 w-[3px] h-8 bg-primary"></div>
                                    <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">AI Kedalaman Luminous</h3>
                                    <p className="text-sm md:text-lg text-on-surface-variant leading-relaxed">
                                        Menggunakan teknologi analisis spektral, DermaScan mengukur penyerapan dan pemantulan cahaya jaringan kulit untuk menilai hidrasi dan kepadatan kolagen.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Engineering Section */}
            <section className="bg-surface py-16 md:py-32 px-6 md:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16 md:mb-24">
                        <h2 className="text-3xl md:text-5xl font-extrabold font-headline mb-4 md:mb-6">Rekayasa Presisi</h2>
                        <p className="text-base md:text-xl text-on-surface-variant">Standar medis yang diterapkan pada perawatan kulit sehari-hari.</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-6 md:gap-10">
                        <div className="bg-surface-container-lowest p-8 md:p-10 rounded-2xl ambient-shadow border border-outline-variant/10">
                            <div className="w-12 h-12 md:w-16 md:h-16 bg-primary-container rounded-xl flex items-center justify-center mb-6 md:mb-8">
                                <span className="material-symbols-outlined text-on-primary-container text-2xl md:text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>verified_user</span>
                            </div>
                            <h4 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">Akurasi Diagnostik</h4>
                            <p className="text-sm md:text-base text-on-surface-variant leading-relaxed">
                                Divalidasi secara klinis terhadap ahli dermatologi dengan tingkat kesesuaian 98% pada kondisi kulit utama.
                            </p>
                        </div>
                        <div className="bg-surface-container-lowest p-8 md:p-10 rounded-2xl ambient-shadow border border-outline-variant/10">
                            <div className="w-12 h-12 md:w-16 md:h-16 bg-primary-container rounded-xl flex items-center justify-center mb-6 md:mb-8">
                                <span className="material-symbols-outlined text-on-primary-container text-2xl md:text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>pill</span>
                            </div>
                            <h4 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">Protokol Kustom</h4>
                            <p className="text-sm md:text-base text-on-surface-variant leading-relaxed">
                                Bukan rutinitas generik. Rekomendasi produk berbasis AI yang dipetakan khusus untuk biomarker unik kulit Anda.
                            </p>
                        </div>
                        <div className="bg-surface-container-lowest p-8 md:p-10 rounded-2xl ambient-shadow border border-outline-variant/10">
                            <div className="w-12 h-12 md:w-16 md:h-16 bg-primary-container rounded-xl flex items-center justify-center mb-6 md:mb-8">
                                <span className="material-symbols-outlined text-on-primary-container text-2xl md:text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>monitoring</span>
                            </div>
                            <h4 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">Pemantauan 24/7</h4>
                            <p className="text-sm md:text-base text-on-surface-variant leading-relaxed">
                                Pelacakan waktu nyata dari efektivitas perawatan. Lihat transformasi kulit Anda melalui visualisasi data temporal.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Protocol Section */}
            <section className="bg-surface py-16 md:py-32 px-6 md:px-8">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl md:text-5xl font-extrabold font-headline mb-16 md:mb-24 text-center">Protokol Tanpa Hambatan</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                        {/* Step 1 */}
                        <div className="bg-surface-container-lowest p-8 md:p-10 rounded-3xl border border-outline-variant/10 flex flex-col">
                            <div className="mb-8 md:mb-12">
                                <span className="text-5xl md:text-7xl font-black text-outline-variant opacity-20">01</span>
                                <h3 className="text-2xl md:text-3xl font-bold mt-4">Ambil Pemindaian</h3>
                            </div>
                            <div className="mt-auto bg-surface-container-low rounded-2xl p-4 md:p-6 aspect-video overflow-hidden">
                                <img alt="Scanning skin via mobile device" className="w-full h-full object-cover rounded-xl" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA9TdMoaZViQ_3Amfkpr3dirpYaC1Zl4jMchh4YfCAaAM3LhRo-kioeDkYUOp4PCnSkjRGtVjXXCU49j5FqjMG3RqsCGZlnXkpwewj40HEKvMxcMfcnRAWmAmpLUvFFbtVgh67GFx-6BObY0R7tLuP7yMeLNhRge6ODRJsAitlvA6Z9Gj3XBh-zh3MTmhSA8_fv0yMQjyrnHSxPQQApgTwT4XniB9dTFORFCdQgtv2BaHZAW2yBDDb2aohycSzlLV5y8QaF7w8M-4OR" />
                            </div>
                        </div>
                        {/* Step 2 */}
                        <div className="bg-surface-container-lowest p-8 md:p-10 rounded-3xl border border-outline-variant/10 flex flex-col">
                            <div className="mb-8 md:mb-12">
                                <span className="text-5xl md:text-7xl font-black text-outline-variant opacity-20">02</span>
                                <h3 className="text-2xl md:text-3xl font-bold mt-4">Analisis AI</h3>
                            </div>
                            <div className="mt-auto flex items-center justify-center p-6 md:p-8 bg-surface-container-low rounded-2xl aspect-video">
                                <div className="relative w-16 h-16 md:w-24 md:h-24 bg-primary-container rounded-full flex items-center justify-center animate-pulse shadow-[0_0_30px_rgba(132,247,94,0.4)]">
                                    <span className="material-symbols-outlined text-on-primary-container text-2xl md:text-4xl">psychology</span>
                                </div>
                            </div>
                        </div>
                        {/* Step 3 */}
                        <div className="bg-surface-container-lowest p-8 md:p-10 rounded-3xl border border-outline-variant/10 flex flex-col">
                            <div className="mb-8 md:mb-12">
                                <span className="text-5xl md:text-7xl font-black text-outline-variant opacity-20">03</span>
                                <h3 className="text-2xl md:text-3xl font-bold mt-4">Dapatkan Protokol</h3>
                            </div>
                            <div className="mt-auto space-y-3 md:y-4 bg-surface-container-low rounded-2xl p-6 md:p-8 aspect-video flex flex-col justify-center">
                                <div className="bg-white p-2.5 md:p-3 rounded-lg flex items-center gap-3 md:gap-4">
                                    <div className="w-2 md:w-2.5 h-2 md:h-2.5 rounded-full bg-primary"></div>
                                    <div className="h-2 md:h-2.5 w-full bg-outline-variant/20 rounded-full"></div>
                                </div>
                                <div className="bg-white p-2.5 md:p-3 rounded-lg flex items-center gap-3 md:gap-4">
                                    <div className="w-2 md:w-2.5 h-2 md:h-2.5 rounded-full bg-primary"></div>
                                    <div className="h-2 md:h-2.5 w-4/5 bg-outline-variant/20 rounded-full"></div>
                                </div>
                                <div className="bg-white p-2.5 md:p-3 rounded-lg flex items-center gap-3 md:gap-4">
                                    <div className="w-2 md:w-2.5 h-2 md:h-2.5 rounded-full bg-primary"></div>
                                    <div className="h-2 md:h-2.5 w-3/4 bg-outline-variant/20 rounded-full"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="px-6 md:px-8 py-16 md:py-32">
                <div className="max-w-7xl mx-auto rounded-3xl signature-gradient p-10 md:p-20 lg:p-24 text-center text-on-primary relative overflow-hidden ambient-shadow">
                    <div className="absolute inset-0 opacity-10 pointer-events-none">
                        <svg height="100%" preserveAspectRatio="none" viewBox="0 0 100 100" width="100%">
                            <path d="M0 0 L100 100 M100 0 L0 100" stroke="currentColor" strokeWidth="0.2"></path>
                        </svg>
                    </div>
                    <h2 className="text-3xl md:text-5xl lg:text-7xl font-extrabold font-headline mb-8 md:mb-10">Siap untuk Kejelasan <br className="hidden md:block" />Klinis?</h2>
                    <p className="text-lg md:text-xl opacity-90 mb-10 md:mb-14 max-w-2xl mx-auto leading-relaxed font-medium">
                        Bergabunglah dengan 50,000+ pengguna yang telah mentransformasi kesehatan kulit mereka melalui pengobatan presisi berbasis AI.
                    </p>
                    <Link href="/pages/auth/login" className="bg-white text-primary px-14 py-5 rounded-full font-bold text-xl hover:bg-white/95 transition-all scale-95 active:scale-90 shadow-2xl inline-block">
                        Mulai Perjalanan Anda
                    </Link>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-surface-container-low w-full pt-16 md:pt-20 pb-10 md:pb-12 px-6 md:px-8 border-t border-outline-variant/10">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 max-w-7xl mx-auto mb-16">
                    <div className="space-y-4 md:space-y-6">
                        <div className="font-bold text-on-surface text-xl md:text-2xl font-headline tracking-tight">DermaScan</div>
                        <p className="text-xs md:text-sm font-medium text-on-surface-variant leading-relaxed">
                            © 2024 DermaScan. AI Tingkat Klinis. <br />
                            Standar Medis ISO 13485.
                        </p>
                    </div>
                    <div>
                        <h5 className="font-bold text-on-surface mb-4 md:mb-6 uppercase tracking-widest text-[10px] md:text-xs">Produk</h5>
                        <ul className="space-y-3 md:space-y-4">
                            <li><a className="text-sm text-on-surface-variant hover:text-primary transition-colors font-medium" href="#">Sains</a></li>
                            <li><a className="text-sm text-on-surface-variant hover:text-primary transition-colors font-medium" href="#">Dokumentasi Klinis</a></li>
                            <li><a className="text-sm text-on-surface-variant hover:text-primary transition-colors font-medium" href="#">Kepatuhan FDA</a></li>
                        </ul>
                    </div>
                    <div>
                        <h5 className="font-bold text-on-surface mb-4 md:mb-6 uppercase tracking-widest text-[10px] md:text-xs">Dukungan</h5>
                        <ul className="space-y-3 md:space-y-4">
                            <li><a className="text-sm text-on-surface-variant hover:text-primary transition-colors font-medium" href="#">Kebijakan Privasi</a></li>
                            <li><a className="text-sm text-on-surface-variant hover:text-primary transition-colors font-medium" href="#">Syarat Layanan</a></li>
                            <li><a className="text-sm text-on-surface-variant hover:text-primary transition-colors font-medium" href="#">Dukungan</a></li>
                        </ul>
                    </div>
                    <div>
                        <h5 className="font-bold text-on-surface mb-4 md:mb-6 uppercase tracking-widest text-[10px] md:text-xs">Buletin</h5>
                        <div className="flex gap-2">
                            <input className="bg-surface-container-highest border-none rounded-full px-5 py-2.5 md:py-3 text-sm w-full focus:ring-2 focus:ring-primary/50 transition-all outline-none" placeholder="Masukkan email Anda" type="email" />
                            <button className="bg-primary text-on-primary w-10 md:w-11 h-10 md:h-11 shrink-0 rounded-full flex items-center justify-center hover:opacity-90 transition-all">
                                <span className="material-symbols-outlined text-base md:text-lg">arrow_forward</span>
                            </button>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
