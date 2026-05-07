"use client";
import Link from 'next/link';





export default function LandingPage() {
    return (
        <div className="bg-surface font-body text-on-surface antialiased min-h-screen">
            {/* Hero Section */}
            <header className="relative pt-24 pb-12 md:pt-32 md:pb-20 px-6 md:px-8 overflow-hidden bg-surface">
                <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
                    <div className="flex-1 text-center lg:text-left">
                        <div className="inline-flex items-center px-3 py-1.5 rounded-lg bg-primary-container text-on-primary-container text-[10px] md:text-xs font-bold tracking-widest uppercase mb-4 md:mb-6">
                            AI Medis Generasi Terbaru
                        </div>
                        <h1 className="text-3xl md:text-5xl lg:text-[4rem] font-extrabold font-headline leading-[1.1] tracking-tight text-on-surface mb-4 md:mb-6">
                            Kesehatan Kulit Presisi <br /><span className="text-primary">Didukung oleh AI</span>
                        </h1>
                        <p className="text-sm md:text-lg text-on-surface-variant max-w-lg mx-auto lg:mx-0 mb-6 md:mb-10 leading-relaxed">
                            Manfaatkan kekuatan jaringan saraf tingkat klinis untuk menganalisis, memantau, dan mengoptimalkan kesehatan kulit Anda dengan akurasi yang tak tertandingi.
                        </p>
                        <div className="flex flex-wrap justify-center lg:justify-start gap-3 md:gap-4">
                            <Link href="/pages/auth/login" className="signature-gradient text-on-primary px-8 py-3.5 rounded-full font-bold text-base hover:opacity-90 transition-all scale-95 active:scale-90 shadow-lg shadow-primary/20 inline-block">
                                Mulai Pemindaian
                            </Link>
                            <button className="bg-surface-container-high text-on-surface px-6 md:px-8 py-3.5 rounded-full font-bold text-sm md:text-base hover:bg-surface-container-highest transition-all scale-95 active:scale-90">
                                Cara Kerja
                            </button>
                        </div>
                    </div>
                    <div className="flex-1 relative w-full max-w-[280px] md:max-w-md lg:max-w-[400px] mx-auto mt-10 lg:mt-0">
                        <div className="w-full aspect-[4/5] rounded-[2rem] bg-secondary-container/20 overflow-hidden ambient-shadow border border-outline-variant/10 relative">
                            <img alt="Close up high quality portrait for skin analysis" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBqr6DLUdgEg7BxUVXave7c8Ej5wTUEcu0OTX-9U--KmesHYY-QspZ4CKBUn8LzWx-c2lyXl2iOyYSaj17N15A2tGWYF2WSTw-vt4_-_9LX9MEPMcI9ZM0D-5loBBJJYjdWxuRCdzinNEcm9RDOSEFSWYfiljdOo92pWKOSKJPRYzZBAbwdpqb4PtKkwEPQEIj4JJUWrWfM3swZ9zP1eEVPpNowgLMNbPDYT35sY7QqSITHirDThvmqS0C6jD7wYU5gVCVa1uRBpbnA" />
                            <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent pointer-events-none"></div>
                            {/* Floating Glass Element */}
                            <div className="absolute bottom-4 right-4 md:bottom-6 md:right-6 glass-panel p-3 md:p-5 rounded-2xl ambient-shadow max-w-[180px] md:max-w-[220px] border border-white/40">
                                <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-3">
                                    <span className="material-symbols-outlined text-primary text-xl md:text-2xl">biotech</span>
                                    <div className="h-1.5 flex-1 bg-surface-container-high rounded-full overflow-hidden">
                                        <div className="h-full w-4/5 bg-primary-container rounded-full shadow-[0_0_12px_#84f75e]"></div>
                                    </div>
                                </div>
                                <p className="text-[9px] md:text-[10px] font-extrabold text-on-surface uppercase tracking-tight">Akurasi Epidermal: 99.4%</p>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Science Section */}
            <section className="bg-surface py-12 md:py-20 px-6 md:px-8">
                <div className="max-w-6xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
                        <div className="order-2 lg:order-1 relative">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="aspect-square bg-surface-container rounded-3xl overflow-hidden ambient-shadow">
                                    <img alt="Microscopic view of skin cells" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAsYtzTdXVxolPtyRR4_pWQ3Qjx39-yCDhpf4uuJVUkJZbGcuPn22uQMGCJIb7qWr-p9szDf-rtSqqbGrMqtHOPkIuDr3vyRgipC24SHWrkrkwtpDUrKeyOk_ELtFquKiSA2XUCnfajqr0ydCdJ11ncYr5QX-HYc6Bofv18_iC5pZo_iWD3beydMEyQUJEQMnP8rJUwpdYdoFRyqiB6c_5P6dagA5z-3qKzQ-kLkfbfjJsTxwWxUJS51Hl_EL0VoxZ0dsxXdvonFSaO" />
                                </div>
                                <div className="aspect-square bg-surface-container rounded-3xl overflow-hidden ambient-shadow translate-y-6 md:translate-y-12">
                                    <img alt="Data visualization of cellular structure" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCHdfaJ8tT9MkNgHwxW6xsPoJxnI2reLuTCQIowl_2W2NzGl7Head5ErEoKODQbx_GXc0xg4rpTxBHwBFWNsu5Q5g9qHnEfU8hKGe_rb8aFcJLQ1yomaxtq8LnN8aPqTL6rOLan46rCfCBnm6DhC51xoK38uuyfYE8Z2bawb79hk4uUpKtXNB4vmcTpQbPWrd6rfFrnx_V8xioY1qlKLs0hFIR2KlyTRcH-Ai7oFnejZH0iSY0UICpYuDwFLghiXpnP_lybzoBQ7Vl1" />
                                </div>
                            </div>
                        </div>
                        <div className="order-1 lg:order-2 text-center lg:text-left">
                            <h2 className="text-2xl md:text-4xl lg:text-5xl font-extrabold font-headline text-on-surface mb-6 md:mb-8 leading-tight">
                                Sains Mendalam. <br /><span className="text-primary">Laboratorium Ethereal.</span>
                            </h2>
                            <div className="space-y-6 md:space-y-10">
                                <div className="relative pl-5 md:pl-8 border-l-2 border-primary/20 text-left">
                                    <div className="absolute -left-[1.5px] top-0 w-[3px] h-6 bg-primary"></div>
                                    <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3">Pemetaan Epidermal</h3>
                                    <p className="text-xs md:text-base text-on-surface-variant leading-relaxed">
                                        AI kami membangun peta topologi multi-lapisan kulit Anda, mengidentifikasi ketidakteraturan di bawah permukaan sebelum terlihat oleh mata telanjang.
                                    </p>
                                </div>
                                <div className="relative pl-5 md:pl-8 border-l-2 border-primary/20 text-left">
                                    <div className="absolute -left-[1.5px] top-0 w-[3px] h-6 bg-primary"></div>
                                    <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3">AI Kedalaman Luminous</h3>
                                    <p className="text-xs md:text-base text-on-surface-variant leading-relaxed">
                                        Menggunakan teknologi analisis spektral, DermaScan mengukur penyerapan dan pemantulan cahaya jaringan kulit untuk menilai hidrasi dan kepadatan kolagen.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Engineering Section */}
            <section className="bg-surface py-12 md:py-20 px-6 md:px-8">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-12 md:mb-16">
                        <h2 className="text-2xl md:text-4xl lg:text-5xl font-extrabold font-headline mb-3 md:mb-4">Rekayasa Presisi</h2>
                        <p className="text-sm md:text-lg text-on-surface-variant">Standar medis yang diterapkan pada perawatan kulit sehari-hari.</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-5 md:gap-8">
                        <div className="bg-surface-container-lowest p-6 md:p-8 rounded-2xl ambient-shadow border border-outline-variant/10">
                            <div className="w-10 h-10 md:w-14 md:h-14 bg-primary-container rounded-xl flex items-center justify-center mb-5 md:mb-6">
                                <span className="material-symbols-outlined text-on-primary-container text-xl md:text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>verified_user</span>
                            </div>
                            <h4 className="text-lg md:text-xl font-bold mb-2 md:mb-3">Akurasi Diagnostik</h4>
                            <p className="text-xs md:text-sm text-on-surface-variant leading-relaxed">
                                Divalidasi secara klinis terhadap ahli dermatologi dengan tingkat kesesuaian 98% pada kondisi kulit utama.
                            </p>
                        </div>
                        <div className="bg-surface-container-lowest p-6 md:p-8 rounded-2xl ambient-shadow border border-outline-variant/10">
                            <div className="w-10 h-10 md:w-14 md:h-14 bg-primary-container rounded-xl flex items-center justify-center mb-5 md:mb-6">
                                <span className="material-symbols-outlined text-on-primary-container text-xl md:text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>pill</span>
                            </div>
                            <h4 className="text-lg md:text-xl font-bold mb-2 md:mb-3">Protokol Kustom</h4>
                            <p className="text-xs md:text-sm text-on-surface-variant leading-relaxed">
                                Bukan rutinitas generik. Rekomendasi produk berbasis AI yang dipetakan khusus untuk biomarker unik kulit Anda.
                            </p>
                        </div>
                        <div className="bg-surface-container-lowest p-6 md:p-8 rounded-2xl ambient-shadow border border-outline-variant/10">
                            <div className="w-10 h-10 md:w-14 md:h-14 bg-primary-container rounded-xl flex items-center justify-center mb-5 md:mb-6">
                                <span className="material-symbols-outlined text-on-primary-container text-xl md:text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>monitoring</span>
                            </div>
                            <h4 className="text-lg md:text-xl font-bold mb-2 md:mb-3">Pemantauan 24/7</h4>
                            <p className="text-xs md:text-sm text-on-surface-variant leading-relaxed">
                                Pelacakan waktu nyata dari efektivitas perawatan. Lihat transformasi kulit Anda melalui visualisasi data temporal.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Protocol Section */}
            <section className="bg-surface py-12 md:py-20 px-6 md:px-8">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-2xl md:text-4xl lg:text-5xl font-extrabold font-headline mb-10 md:mb-16 text-center">Protokol Tanpa Hambatan</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                        {/* Step 1 */}
                        <div className="bg-surface-container-lowest p-6 md:p-8 rounded-[2rem] border border-outline-variant/10 flex flex-col hover:shadow-lg transition-all duration-300 group">
                            <div className="mb-6 md:mb-10">
                                <span className="text-5xl md:text-7xl font-black text-outline-variant opacity-40 group-hover:opacity-60 transition-opacity">01</span>
                                <h3 className="text-xl md:text-2xl font-bold mt-2">Ambil Pemindaian</h3>
                            </div>
                            <div className="mt-auto bg-surface-container-low rounded-2xl overflow-hidden aspect-[4/3] md:aspect-video border border-surface-container-highest relative">
                                <img alt="Scanning skin via mobile device" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA9TdMoaZViQ_3Amfkpr3dirpYaC1Zl4jMchh4YfCAaAM3LhRo-kioeDkYUOp4PCnSkjRGtVjXXCU49j5FqjMG3RqsCGZlnXkpwewj40HEKvMxcMfcnRAWmAmpLUvFFbtVgh67GFx-6BObY0R7tLuP7yMeLNhRge6ODRJsAitlvA6Z9Gj3XBh-zh3MTmhSA8_fv0yMQjyrnHSxPQQApgTwT4XniB9dTFORFCdQgtv2BaHZAW2yBDDb2aohycSzlLV5y8QaF7w8M-4OR" />
                            </div>
                        </div>
                        {/* Step 2 */}
                        <div className="bg-surface-container-lowest p-6 md:p-8 rounded-[2rem] border border-outline-variant/10 flex flex-col hover:shadow-lg transition-all duration-300 group">
                            <div className="mb-6 md:mb-10">
                                <span className="text-5xl md:text-7xl font-black text-outline-variant opacity-40 group-hover:opacity-60 transition-opacity">02</span>
                                <h3 className="text-xl md:text-2xl font-bold mt-2">Analisis AI</h3>
                            </div>
                            <div className="mt-auto flex items-center justify-center bg-surface-container-low rounded-2xl aspect-[4/3] md:aspect-video border border-surface-container-highest">
                                <div className="relative w-14 h-14 md:w-20 md:h-20 bg-primary-container rounded-full flex items-center justify-center animate-pulse shadow-[0_0_20px_rgba(132,247,94,0.4)] group-hover:shadow-[0_0_30px_rgba(132,247,94,0.6)] transition-shadow">
                                    <span className="material-symbols-outlined text-on-primary-container text-2xl md:text-4xl">psychology</span>
                                </div>
                            </div>
                        </div>
                        {/* Step 3 */}
                        <div className="bg-surface-container-lowest p-6 md:p-8 rounded-[2rem] border border-outline-variant/10 flex flex-col hover:shadow-lg transition-all duration-300 group">
                            <div className="mb-6 md:mb-10">
                                <span className="text-5xl md:text-7xl font-black text-outline-variant opacity-40 group-hover:opacity-60 transition-opacity">03</span>
                                <h3 className="text-xl md:text-2xl font-bold mt-2">Dapatkan Protokol</h3>
                            </div>
                            <div className="mt-auto space-y-3 md:space-y-4 bg-surface-container-low rounded-2xl p-6 md:p-8 aspect-[4/3] md:aspect-video flex flex-col justify-center border border-surface-container-highest">
                                <div className="bg-white p-3 md:p-4 rounded-xl flex items-center gap-3 md:gap-4 shadow-sm">
                                    <div className="w-2 h-2 rounded-full bg-primary shrink-0"></div>
                                    <div className="h-2 w-full bg-surface-container-highest rounded-full"></div>
                                </div>
                                <div className="bg-white p-3 md:p-4 rounded-xl flex items-center gap-3 md:gap-4 shadow-sm">
                                    <div className="w-2 h-2 rounded-full bg-primary shrink-0"></div>
                                    <div className="h-2 w-4/5 bg-surface-container-highest rounded-full"></div>
                                </div>
                                <div className="bg-white p-3 md:p-4 rounded-xl flex items-center gap-3 md:gap-4 shadow-sm">
                                    <div className="w-2 h-2 rounded-full bg-primary shrink-0"></div>
                                    <div className="h-2 w-3/4 bg-surface-container-highest rounded-full"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="px-6 md:px-8 py-12 md:py-20">
                <div className="max-w-5xl mx-auto rounded-[2rem] md:rounded-[2.5rem] signature-gradient p-8 md:p-14 lg:p-16 text-center text-on-primary relative overflow-hidden ambient-shadow">
                    <div className="absolute inset-0 opacity-10 pointer-events-none">
                        <svg height="100%" preserveAspectRatio="none" viewBox="0 0 100 100" width="100%">
                            <path d="M0 0 L100 100 M100 0 L0 100" stroke="currentColor" strokeWidth="0.2"></path>
                        </svg>
                    </div>
                    <h2 className="text-2xl md:text-4xl lg:text-6xl font-extrabold font-headline mb-6 md:mb-8">Siap untuk Kejelasan <br className="hidden md:block" />Klinis?</h2>
                    <p className="text-base md:text-lg opacity-90 mb-8 md:mb-10 max-w-xl mx-auto leading-relaxed font-medium">
                        Bergabunglah dengan 50,000+ pengguna yang telah mentransformasi kesehatan kulit mereka melalui pengobatan presisi berbasis AI.
                    </p>
                    <Link href="/pages/auth/login" className="bg-white text-primary px-10 py-4 rounded-full font-bold text-lg hover:bg-white/95 transition-all scale-95 active:scale-90 shadow-2xl inline-block">
                        Mulai Perjalanan Anda
                    </Link>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-surface-container-low w-full pt-12 md:pt-16 pb-8 md:pb-10 px-6 md:px-8 border-t border-outline-variant/10">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 max-w-6xl mx-auto mb-12">
                    <div className="space-y-3 md:space-y-4">
                        <div className="font-bold text-on-surface text-lg md:text-xl font-headline tracking-tight">DermaScan</div>
                        <p className="text-xs md:text-sm font-medium text-on-surface-variant leading-relaxed">
                            © 2024 DermaScan. AI Tingkat Klinis. <br />
                            Standar Medis ISO 13485.
                        </p>
                    </div>
                    <div>
                        <h5 className="font-bold text-on-surface mb-3 md:mb-4 uppercase tracking-widest text-[10px] md:text-xs">Produk</h5>
                        <ul className="space-y-2 md:space-y-3">
                            <li><a className="text-sm text-on-surface-variant hover:text-primary transition-colors font-medium" href="#">Sains</a></li>
                            <li><a className="text-sm text-on-surface-variant hover:text-primary transition-colors font-medium" href="#">Dokumentasi Klinis</a></li>
                            <li><a className="text-sm text-on-surface-variant hover:text-primary transition-colors font-medium" href="#">Kepatuhan FDA</a></li>
                        </ul>
                    </div>
                    <div>
                        <h5 className="font-bold text-on-surface mb-3 md:mb-4 uppercase tracking-widest text-[10px] md:text-xs">Dukungan</h5>
                        <ul className="space-y-2 md:space-y-3">
                            <li><a className="text-sm text-on-surface-variant hover:text-primary transition-colors font-medium" href="#">Kebijakan Privasi</a></li>
                            <li><a className="text-sm text-on-surface-variant hover:text-primary transition-colors font-medium" href="#">Syarat Layanan</a></li>
                            <li><a className="text-sm text-on-surface-variant hover:text-primary transition-colors font-medium" href="#">Dukungan</a></li>
                        </ul>
                    </div>
                    <div>
                        <h5 className="font-bold text-on-surface mb-3 md:mb-4 uppercase tracking-widest text-[10px] md:text-xs">Buletin</h5>
                        <div className="flex gap-2">
                            <input className="bg-surface-container-highest border-none rounded-full px-4 py-2 md:py-2.5 text-sm w-full focus:ring-2 focus:ring-primary/50 transition-all outline-none" placeholder="Masukkan email Anda" type="email" />
                            <button className="bg-primary text-on-primary w-10 md:w-12 h-10 md:h-12 shrink-0 rounded-full flex items-center justify-center hover:opacity-90 transition-all">
                                <span className="material-symbols-outlined text-base md:text-lg">arrow_forward</span>
                            </button>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
