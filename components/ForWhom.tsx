"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Check, X, ArrowRight } from "lucide-react";

const forYou = [
  "Angestellte & Führungskräfte",
  "Unternehmer & Selbstständige",
  "Ärzte, Ingenieure & Berater",
  "Hohe Steuerlast (42%+)",
  "Auch ohne Eigenkapital",
];

const notForYou = [
  "\"Schnell reich werden\"-Mentalität",
  "Kein Interesse an langfristigem Aufbau",
  "Suche nach unseriösen Methoden",
];

export default function ForWhom() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="analyse" ref={ref} className="relative py-32 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-gold/3 rounded-full blur-3xl" />

      <div className="relative max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-5xl text-white mb-4">
            Ist das <span className="gold-text">richtig für dich?</span>
          </h2>
          <p className="text-white/40 max-w-xl mx-auto">
            Dieses System ist nicht für jeden. Prüfe, ob du dazu gehörst.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* For you */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass-card-gold p-8"
          >
            <h3 className="font-display text-2xl text-white mb-6">Perfekt für dich ✓</h3>
            <div className="space-y-4">
              {forYou.map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.4 + i * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center">
                    <Check size={16} className="text-green-400" />
                  </div>
                  <span className="text-white/70">{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Not for you */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="glass-card p-8"
          >
            <h3 className="font-display text-2xl text-white mb-6">Nicht für dich ✗</h3>
            <div className="space-y-4">
              {notForYou.map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-red-500/10 flex items-center justify-center">
                    <X size={16} className="text-red-400" />
                  </div>
                  <span className="text-white/40">{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Final CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="glass-card-gold p-10 md:p-14 text-center"
        >
          <h3 className="font-display text-3xl md:text-4xl text-white mb-4">
            Bereit für deine <span className="gold-text">Steuer-Analyse?</span>
          </h3>
          <p className="text-white/40 max-w-lg mx-auto mb-8">
            In 30 Minuten zeigen wir dir, wie viel du sparen kannst. 100% kostenlos, unverbindlich.
          </p>
          <a
            href="https://immo-statt-steuern.de"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 px-10 py-5 bg-gold text-navy font-bold rounded-full text-lg transition-all duration-300 hover:shadow-[0_0_60px_rgba(212,168,83,0.4)] hover:scale-105"
          >
            Kostenlose Steuer-Analyse starten
            <ArrowRight
              size={20}
              className="group-hover:translate-x-1 transition-transform"
            />
          </a>
          <div className="flex items-center justify-center gap-6 mt-6 text-sm text-white/30">
            <span>✓ 30 Min Gespräch</span>
            <span>✓ 100% kostenlos</span>
            <span>✓ Unverbindlich</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
