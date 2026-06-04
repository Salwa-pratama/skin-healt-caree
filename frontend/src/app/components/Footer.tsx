import { memo } from "react";

const Footer = () => {
  return (
    <footer className="w-full py-10 md:py-14 px-6 md:px-12 bg-surface-container-low border-t border-outline-variant/10">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 items-start mb-10">
          <div className="text-center md:text-left">
            <div className="text-lg font-bold text-on-surface mb-4 font-headline tracking-tight">
              DermaScan
            </div>
            <p className="font-body text-xs md:text-sm leading-relaxed text-on-surface-variant max-w-xs mx-auto md:mx-0">
              Luminous Laboratory DermaScan adalah platform analitik kesehatan
              kulit berbasis AI yang berfokus pada deteksi dini dan pemantauan
              klinis berkelanjutan.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex flex-col space-y-3">
              <span className="text-on-surface font-bold text-xs uppercase tracking-widest">
                Produk
              </span>
              <a
                className="text-on-surface-variant text-xs md:text-sm hover:text-primary transition-colors"
                href="#"
              >
                Sains
              </a>
              <a
                className="text-on-surface-variant text-xs md:text-sm hover:text-primary transition-colors"
                href="#"
              >
                Teknologi
              </a>
            </div>
            <div className="flex flex-col space-y-3">
              <span className="text-on-surface font-bold text-xs uppercase tracking-widest">
                Legal
              </span>
              <a
                className="text-on-surface-variant text-xs md:text-sm hover:text-primary transition-colors"
                href="#"
              >
                Privasi
              </a>
              <a
                className="text-on-surface-variant text-xs md:text-sm hover:text-primary transition-colors"
                href="#"
              >
                Syarat
              </a>
            </div>
            <div className="flex flex-col space-y-3">
              <span className="text-on-surface font-bold text-xs uppercase tracking-widest">
                Dukungan
              </span>
              <a
                className="text-on-surface-variant text-xs md:text-sm hover:text-primary transition-colors"
                href="#"
              >
                Bantuan
              </a>
              <a
                className="text-on-surface-variant text-xs md:text-sm hover:text-primary transition-colors"
                href="#"
              >
                Metodologi
              </a>
            </div>
            <div className="flex flex-col space-y-3">
              <span className="text-on-surface font-bold text-xs uppercase tracking-widest">
                Sosial
              </span>
              <a
                className="text-on-surface-variant text-xs md:text-sm hover:text-primary transition-colors"
                href="#"
              >
                Instagram
              </a>
              <a
                className="text-on-surface-variant text-xs md:text-sm hover:text-primary transition-colors"
                href="#"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>
        <div className="pt-6 border-t border-outline-variant/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-body text-xs leading-relaxed text-on-surface-variant text-center md:text-left">
            © 2024 Luminous Laboratory DermaScan. Presisi Klinis untuk Kesehatan
            kulit.
          </p>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-on-surface-variant text-lg md:text-xl">
              language
            </span>
            <span className="text-xs font-bold text-on-surface uppercase tracking-wider">
              ID / Bahasa Indonesia
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default memo(Footer);
