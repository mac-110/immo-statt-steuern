"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FileText, Landmark, Home, TrendingUp } from "lucide-react";

const principles = [
  {
    icon: FileText,
    title: "AfA / Abschreibungen",
    highlight: "bis zu €40k+/Jahr",
    description:
      "Immobilien-Abschreibungen reduzieren dein zu versteuerndes Einkommen massiv. Gebäude, Sanierung, Möbel — alles absetzbar.",
  },
  {
    icon: Landmark,
    title: "110% Bankfinanzierung",
    highlight: "0€ Eigenkapital",
    description:
      "Die Bank finanziert alles — Kaufpreis plus Nebenkosten. Du startest ohne einen Cent eigenes Kapital.",
  },
  {
    icon: Home,
    title: "Miete zahlt Kreditrate",
    highlight: "Selbsttragend",
    description:
      "Der Mieter übernimmt die monatliche Belastung. Dein Cashflow bleibt neutral oder sogar positiv.",
  },
  {
    icon: TrendingUp,
    title: "Langfristiger Vermögensaufbau",
    highlight: "Skalierbar",
    description:
      "Starte mit einer Immobilie und skaliere. Jede weitere multipliziert deinen Steuervorteil und dein Vermögen.",
  },
];

export default function SystemSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="system" ref={ref} className="relative py-32 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-gold/3 rounded-full blur-3xl -translate-y-1/2" />

      <div className="relative max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gold/20 bg-gold/5 mb-6">
            <span className="text-gold text-sm tracking-widest uppercase">Das Geheim-System</span>
          </div>
          <h2 className="font-display text-3xl md:text-5xl text-gray-800 mb-4">
            4 Prinzipien, die <span className="gold-text">alles verändern</span>
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Kein Geheimnis — aber ein System, das die wenigsten konsequent umsetzen.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {principles.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.15 }}
              className="glass-card p-8 group hover:border-gold/20 hover:-translate-y-1 hover:shadow-[0_20px_60px_-15px_rgba(59,125,110,0.1)] transition-all duration-500"
            >
              <div className="flex items-start gap-5">
                <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-gold/10 flex items-center justify-center group-hover:bg-gold/20 transition-colors">
                  <p.icon size={24} className="text-gold" />
                </div>
                <div>
                  <div className="text-gold/80 text-sm font-semibold tracking-wider uppercase mb-1">
                    Prinzip {i + 1}
                  </div>
                  <h3 className="font-display text-xl text-gray-800 mb-1">{p.title}</h3>
                  <div className="text-gold font-semibold text-sm mb-3">{p.highlight}</div>
                  <p className="text-gray-500 leading-relaxed">{p.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
