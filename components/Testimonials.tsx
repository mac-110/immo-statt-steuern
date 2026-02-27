"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Quote, ChevronLeft, ChevronRight, Star } from "lucide-react";

const testimonials = [
  {
    name: "Beispiel: IT-Angestellter",
    role: "85k Brutto, 1 Immobilie",
    savings: "~€6.300",
    text: "Als Angestellter mit Spitzensteuersatz können Zinsen und AfA das zu versteuernde Einkommen deutlich senken. Hier: €250k Objekt, 4% Zinsen, 3% AfA auf 75% Gebäudeanteil.",
  },
  {
    name: "Beispiel: Fachärztin",
    role: "180k Brutto, 2 Immobilien",
    savings: "~€11.400",
    text: "Bei höherem Einkommen und Spitzensteuersatz (42%) wirken sich die Abzüge stärker aus. Zwei Objekte à €250k verdoppeln den Effekt auf die Steuerlast.",
  },
  {
    name: "Beispiel: Berater",
    role: "120k Brutto, 1 Immobilie (Altbau)",
    savings: "~€7.800",
    text: "Sanierte Altbauten bieten oft höhere AfA-Sätze (bis 2,5% + Sonder-AfA für Sanierung). In Kombination mit dem Steuersatz ergibt sich eine solide Ersparnis.",
  },
  {
    name: "Beispiel: Teamleiterin",
    role: "70k Brutto, 1 Immobilie",
    savings: "~€5.300",
    text: "Auch bei mittlerem Einkommen ab Steuersatz 35% funktioniert das Prinzip. Wichtig: Die Immobilie muss sich selbst tragen — Miete deckt Kreditrate.",
  },
  {
    name: "Beispiel: Unternehmer",
    role: "250k+ Brutto, 3 Immobilien",
    savings: "~€16.800",
    text: "Mit mehreren Objekten und Höchststeuersatz (45%) skaliert die Ersparnis deutlich. Voraussetzung: professionelle Verwaltung und solide Standortwahl.",
  },
  {
    name: "Beispiel: Ingenieurin",
    role: "95k Brutto, 1 Neubau",
    savings: "~€6.700",
    text: "Neubauten ab 2023 profitieren von 3% AfA (statt 2%). In Kombination mit Zinsen ergibt sich eine jährliche Steuerersparnis im vierstelligen Bereich.",
  },
];

export default function Testimonials() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((c) => (c + 1) % testimonials.length);
  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);

  return (
    <section id="stimmen" ref={ref} className="relative py-32 overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/images/consultation.png"
          alt="Beratungsgespräch im Büro"
          fill
          className="object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#faf9f6]/60 to-[#faf9f6]/70" />
      </div>
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

      <div className="relative max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gold/20 bg-gold/5 mb-6">
            <span className="text-gold text-sm tracking-widest uppercase">Rechenbeispiele</span>
          </div>
          <h2 className="font-display text-3xl md:text-5xl text-gray-800">
            So rechnet sich <span className="gold-text">das System</span>
          </h2>
        </motion.div>

        {/* Featured testimonial */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="glass-card-gold p-10 md:p-14 mb-12 relative"
        >
          <Quote size={48} className="text-gold/10 absolute top-8 left-8" />
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="relative"
            >
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={18} className="text-gold fill-gold" />
                ))}
              </div>
              <p className="text-xl md:text-2xl text-gray-600 leading-relaxed mb-8 font-light">
                &ldquo;{testimonials[current].text}&rdquo;
              </p>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-gray-800 font-semibold text-lg">
                    {testimonials[current].name}
                  </div>
                  <div className="text-gray-400">{testimonials[current].role}</div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-display gold-text">
                    {testimonials[current].savings}
                  </div>
                  <div className="text-gray-400 text-sm">Ersparnis/Jahr</div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:border-gold/30 hover:text-gold transition-all text-gray-400"
            >
              <ChevronLeft size={18} />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    i === current ? "bg-gold w-6" : "bg-gray-300 hover:bg-gray-400"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:border-gold/30 hover:text-gold transition-all text-gray-400"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </motion.div>

        {/* Small cards grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {testimonials.map((t, i) => (
            <motion.button
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.4 + i * 0.08 }}
              onClick={() => setCurrent(i)}
              className={`glass-card p-5 text-left transition-all duration-300 ${
                i === current
                  ? "border-gold/30 bg-gold/5"
                  : "hover:border-gray-200"
              }`}
            >
              <div className="text-gray-800 font-semibold text-sm">{t.name}</div>
              <div className="text-gray-400 text-xs mb-2">{t.role}</div>
              <div className="text-gold font-display text-lg">{t.savings}</div>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}
