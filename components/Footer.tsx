"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative py-12 border-t border-gray-200">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="font-display text-lg">
            <span className="gold-text">IMMO</span>
            <span className="text-gray-400 mx-1">statt</span>
            <span className="text-gray-600">STEUERN</span>
          </div>
          <div className="flex items-center gap-8 text-sm text-gray-400">
            <Link href="/impressum" className="hover:text-gold transition-colors">
              Impressum
            </Link>
            <Link href="/datenschutz" className="hover:text-gold transition-colors">
              Datenschutz
            </Link>
          </div>
          <div className="text-sm text-gray-300">
            © {new Date().getFullYear()} Alle Rechte vorbehalten
          </div>
        </div>
        <div className="mt-6 text-center text-xs text-gray-300">
          Alle Berechnungen und Beispiele dienen der Veranschaulichung und stellen keine Steuerberatung dar.
        </div>
      </div>
    </footer>
  );
}
