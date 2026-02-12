"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Phone, Search, FileCheck, PartyPopper } from "lucide-react";

const steps = [
  {
    icon: Phone,
    title: "Kostenlose Steuer-Analyse",
    description: "In 30 Minuten analysieren wir deine Situation und zeigen dir dein Sparpotenzial.",
    detail: "100% kostenlos",
  },
  {
    icon: Search,
    title: "Passende Immobilie finden",
    description: "Unser Full-Service-Team findet die perfekte Immobilie mit Mietgarantie für dich.",
    detail: "Full-Service",
  },
  {
    icon: FileCheck,
    title: "Finanzierung & Setup",
    description: "110% Bankfinanzierung — du brauchst 0€ Eigenkapital. Wir kümmern uns um alles.",
    detail: "0€ Eigenkapital",
  },
  {
    icon: PartyPopper,
    title: "Erfolgreicher Abschluss",
    description: "Ab sofort sparst du Steuern und baust Vermögen auf. Mit 24/7 Support an deiner Seite.",
    detail: "24/7 Support",
  },
];

export default function StepsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="schritte" ref={ref} className="relative py-32 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

      <div className="relative max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gold/20 bg-gold/5 mb-6">
            <span className="text-gold text-sm tracking-widest uppercase">So funktioniert&apos;s</span>
          </div>
          <h2 className="font-display text-3xl md:text-5xl text-gray-800">
            In 4 Schritten zur <span className="gold-text">Steuerfreiheit</span>
          </h2>
        </motion.div>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-gold/30 via-gold/10 to-transparent md:-translate-x-px" />

          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.2 }}
              className={`relative flex items-center mb-16 last:mb-0 ${
                i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              {/* Number circle */}
              <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-16 h-16 rounded-full bg-white border-2 border-gold/30 flex items-center justify-center z-10 shadow-sm">
                <span className="font-display text-gold text-xl">{i + 1}</span>
              </div>

              {/* Content */}
              <div className={`ml-24 md:ml-0 md:w-1/2 ${i % 2 === 0 ? "md:pr-16 md:text-right" : "md:pl-16"}`}>
                <div className="glass-card p-6 group hover:border-gold/20 transition-all duration-500 hover:-translate-y-1">
                  <step.icon size={24} className="text-gold mb-3 md:inline-block" />
                  <h3 className="font-display text-xl text-gray-800 mb-2">{step.title}</h3>
                  <p className="text-gray-500 mb-3 leading-relaxed">{step.description}</p>
                  <span className="inline-block px-3 py-1 rounded-full text-xs bg-gold/10 text-gold border border-gold/20">
                    {step.detail}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
