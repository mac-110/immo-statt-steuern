"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "#rechner", label: "Rechner" },
  { href: "#wahrheit", label: "Die Wahrheit" },
  { href: "#system", label: "Das System" },
  { href: "#stimmen", label: "Kundenstimmen" },
  { href: "#schritte", label: "So funktionierts" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/80 backdrop-blur-xl border-b border-gray-200/50 shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#" className="font-display text-xl tracking-wide">
          <span className="gold-text">IMMO</span>
          <span className="text-gray-400 mx-1">statt</span>
          <span className="text-gray-700">STEUERN</span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-gray-500 hover:text-gold transition-colors duration-300 tracking-wide uppercase"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#analyse"
            className="px-6 py-2.5 bg-gold/10 border border-gold/30 text-gold text-sm rounded-full hover:bg-gold/20 transition-all duration-300"
          >
            Kostenlose Analyse
          </a>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-gray-600"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white/95 backdrop-blur-xl border-b border-gray-200/50"
          >
            <div className="px-6 py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-gray-600 hover:text-gold transition-colors py-2"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#analyse"
                onClick={() => setMobileOpen(false)}
                className="mt-2 px-6 py-3 bg-gold text-white font-semibold rounded-full text-center"
              >
                Kostenlose Analyse
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
