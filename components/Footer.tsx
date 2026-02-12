"use client";

export default function Footer() {
  return (
    <footer className="relative py-12 border-t border-white/5">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="font-display text-lg">
            <span className="gold-text">IMMO</span>
            <span className="text-white/40 mx-1">statt</span>
            <span className="text-white/60">STEUERN</span>
          </div>
          <div className="flex items-center gap-8 text-sm text-white/30">
            <a href="https://immo-statt-steuern.de" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors">
              Impressum
            </a>
            <a href="https://immo-statt-steuern.de" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors">
              Datenschutz
            </a>
          </div>
          <div className="text-sm text-white/20">
            © {new Date().getFullYear()} Alle Rechte vorbehalten
          </div>
        </div>
      </div>
    </footer>
  );
}
