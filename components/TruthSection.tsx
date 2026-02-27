"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { AlertTriangle, TrendingDown, ArrowRight } from "lucide-react";

function CountUp({ end, prefix = "", suffix = "", decimals = 0 }: { end: number; prefix?: string; suffix?: string; decimals?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [value, setValue] = useState(0);
  const hasAnimated = useRef(false);

  const animate = useCallback(() => {
    if (hasAnimated.current) return;
    hasAnimated.current = true;
    const duration = 2000;
    const start = Date.now();
    const tick = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      setValue(eased * end);
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [end]);

  useEffect(() => {
    if (isInView) animate();
  }, [isInView, animate]);

  const formatted = decimals > 0
    ? value.toFixed(decimals)
    : Math.round(value).toLocaleString("de-DE");

  return <span ref={ref}>{prefix}{formatted}{suffix}</span>;
}

export default function TruthSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="wahrheit" ref={ref} className="relative py-32 overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/images/neighborhood-aerial.png"
          alt="Luftaufnahme einer deutschen Wohngegend"
          fill
          className="object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#faf9f6]/70 via-red-50/60 to-[#faf9f6]/70" />
      </div>
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-300/20 to-transparent" />

      <div className="relative max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-red-200 bg-red-50 mb-6">
            <AlertTriangle size={16} className="text-red-500" />
            <span className="text-red-500 text-sm tracking-widest uppercase">Die brutale Wahrheit</span>
          </div>
          <h2 className="font-display text-3xl md:text-5xl text-gray-800 mb-4">
            So viel verlierst du <span className="text-red-500">jeden Monat</span>
          </h2>
        </motion.div>

        {/* Big stats */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {[
            { value: 2800, prefix: "€", suffix: "/Monat", label: "gehen ans Finanzamt", sub: "bei 100k Jahresgehalt (Stkl. 1)" },
            { value: 336000, prefix: "€", suffix: "", label: "in 10 Jahren verloren", sub: "unwiederbringlich" },
            { value: 0, prefix: "", suffix: "%", label: "Vermögensaufbau-Rate", sub: "kein Vermögen entsteht" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.15 }}
              className="glass-card p-8 text-center group hover:border-red-200 transition-all duration-500"
            >
              <TrendingDown size={24} className="mx-auto mb-4 text-red-400" />
              <div className="text-4xl md:text-5xl font-display text-red-500 mb-2">
                <CountUp end={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
              </div>
              <div className="text-gray-600 font-medium mb-1">{stat.label}</div>
              <div className="text-gray-400 text-sm">{stat.sub}</div>
            </motion.div>
          ))}
        </div>

        {/* Comparison */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid md:grid-cols-2 gap-6"
        >
          {/* Current */}
          <div className="glass-card p-8 border-red-100 hover:border-red-200 transition-all duration-500">
            <div className="text-red-500 text-sm uppercase tracking-widest mb-4 font-semibold">
              Du heute
            </div>
            <div className="text-6xl font-display text-red-500 mb-2">42–45%</div>
            <div className="text-gray-500 mb-6">Steuerlast auf dein Einkommen</div>
            <div className="space-y-3">
              {["Kein Vermögensaufbau", "Steuern steigen weiter", "Inflation frisst Erspartes"].map(
                (item) => (
                  <div key={item} className="flex items-center gap-3 text-gray-400">
                    <div className="w-1.5 h-1.5 bg-red-300 rounded-full" />
                    {item}
                  </div>
                )
              )}
            </div>
          </div>

          {/* With system */}
          <div className="glass-card-gold p-8 hover:border-gold/30 transition-all duration-500 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 rounded-full blur-2xl" />
            <div className="relative">
              <div className="text-gold text-sm uppercase tracking-widest mb-4 font-semibold">
                Mit System
              </div>
              <div className="text-6xl font-display gold-text mb-2">8–15%</div>
              <div className="text-gray-500 mb-6">Effektive Steuerlast + Vermögensaufbau</div>
              <div className="space-y-3 mb-8">
                {["Aktiver Vermögensaufbau", "Steuerersparnis ab Tag 1", "Inflationsschutz durch Immobilien"].map(
                  (item) => (
                    <div key={item} className="flex items-center gap-3 text-gray-600">
                      <div className="w-1.5 h-1.5 bg-gold rounded-full" />
                      {item}
                    </div>
                  )
                )}
              </div>
              <a
                href="#analyse"
                className="inline-flex items-center gap-2 text-gold hover:text-gold-light transition-colors font-semibold"
              >
                Jetzt wechseln <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
