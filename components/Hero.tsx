"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Shield, Users, Star, Clock, Wallet } from "lucide-react";

const stats = [
  { icon: Users, value: "150+", label: "Kunden" },
  { icon: Star, value: "4.9/5", label: "Bewertung" },
  { icon: Shield, value: "100%", label: "Legal & Bankgeprüft" },
  { icon: Wallet, value: "0€", label: "Eigenkapital nötig" },
  { icon: Clock, value: "24h", label: "Erste Analyse" },
];

const headlineWords = "Zahlst du noch Steuern? Oder baust du bereits Vermögen auf?".split(" ");

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-building.png"
          alt="Luxus-Apartmentgebäude bei Sonnenuntergang"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#faf9f6]/90 via-[#faf9f6]/80 to-[#faf9f6]/95" />
      </div>

      {/* Decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ y: [-20, 20, -20] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-40 right-40 w-2 h-2 bg-gold/40 rounded-full"
        />
        <motion.div
          animate={{ y: [15, -15, 15] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-60 left-20 w-3 h-3 bg-gold/20 rounded-full"
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Overline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gold/20 bg-gold/5 mb-8"
        >
          <div className="w-2 h-2 bg-gold rounded-full animate-pulse" />
          <span className="text-gold text-sm tracking-widest uppercase">
            Exklusive Steuer-Strategie
          </span>
        </motion.div>

        {/* Headline - word by word reveal */}
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight mb-8">
          {headlineWords.map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: 0.3 + i * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className={`inline-block mr-[0.3em] ${
                ["Steuern?", "Vermögen"].includes(word)
                  ? "gold-text"
                  : "text-gray-800"
              }`}
            >
              {word}
            </motion.span>
          ))}
        </h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          Während die meisten Top-Verdiener 42–45% Steuern zahlen, bauen sich
          Insider ein Vermögen mit Immobilien auf.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20"
        >
          <a
            href="#analyse"
            className="group relative px-8 py-4 bg-gold text-white font-bold rounded-full text-lg overflow-hidden transition-all duration-300 hover:shadow-[0_0_40px_rgba(59,125,110,0.3)]"
          >
            <span className="relative z-10 flex items-center gap-2">
              Steuerersparnis Analyse
              <ArrowRight
                size={20}
                className="group-hover:translate-x-1 transition-transform"
              />
            </span>
          </a>
          <a
            href="#rechner"
            className="px-8 py-4 border border-gray-200 text-gray-600 rounded-full hover:border-gold/30 hover:text-gold transition-all duration-300"
          >
            Schnellrechner testen
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.8 }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 md:gap-6"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 2 + i * 0.1 }}
              className="glass-card p-4 text-center group hover:border-gold/20 transition-all duration-500"
            >
              <stat.icon
                size={20}
                className="mx-auto mb-2 text-gold/60 group-hover:text-gold transition-colors"
              />
              <div className="text-xl font-bold text-gray-800">{stat.value}</div>
              <div className="text-xs text-gray-400 mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border border-gray-300 rounded-full flex justify-center pt-2"
        >
          <div className="w-1 h-2 bg-gold/50 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
