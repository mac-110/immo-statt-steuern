"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Calculator as CalcIcon, TrendingUp } from "lucide-react";

function AnimatedNumber({ value, prefix = "", suffix = "" }: { value: number; prefix?: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [display, setDisplay] = useState(0);
  const prevValue = useRef(value);
  const animating = useRef(false);

  if (isInView && prevValue.current !== value && !animating.current) {
    animating.current = true;
    const startVal = display;
    const endVal = value;
    const duration = 600;
    const startTime = Date.now();
    prevValue.current = value;
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(startVal + (endVal - startVal) * eased));
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        animating.current = false;
      }
    };
    requestAnimationFrame(animate);
  } else if (isInView && display === 0 && value > 0 && !animating.current) {
    animating.current = true;
    prevValue.current = value;
    const duration = 1200;
    const startTime = Date.now();
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * value));
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        animating.current = false;
      }
    };
    requestAnimationFrame(animate);
  }

  return (
    <span ref={ref}>
      {prefix}{display.toLocaleString("de-DE")}{suffix}
    </span>
  );
}

export default function CalculatorSection() {
  const [income, setIncome] = useState(5000);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Simplified calculation
  const annualGross = income * 12 / 0.58; // rough net-to-gross
  const taxRate = annualGross > 120000 ? 0.45 : annualGross > 60000 ? 0.42 : 0.35;
  const kaufpreis = 250000;
  const zinssatz = 0.045;
  const jahreszinsen = kaufpreis * zinssatz;
  const afa = kaufpreis * 0.04;
  const totalReduction = jahreszinsen + afa;
  const savings = Math.round(totalReduction * taxRate);

  const years = [1, 2, 3, 4, 5];

  return (
    <section id="rechner" ref={ref} className="relative py-32 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
      
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gold/20 bg-gold/5 mb-6">
            <CalcIcon size={16} className="text-gold" />
            <span className="text-gold/80 text-sm tracking-widest uppercase">Schnellrechner</span>
          </div>
          <h2 className="font-display text-3xl md:text-5xl text-white mb-4">
            Berechne deine <span className="gold-text">Steuerersparnis</span>
          </h2>
          <p className="text-white/40 max-w-xl mx-auto">
            Bewege den Slider und sieh sofort, wie viel du jährlich sparen kannst.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Slider side */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="glass-card p-8"
          >
            <label className="block text-white/60 mb-2 text-sm uppercase tracking-wider">
              Monatliches Netto-Einkommen
            </label>
            <div className="text-4xl font-display gold-text mb-6">
              €{income.toLocaleString("de-DE")}
            </div>
            <input
              type="range"
              min={2000}
              max={15000}
              step={250}
              value={income}
              onChange={(e) => setIncome(Number(e.target.value))}
              className="w-full mb-8"
            />
            <div className="flex justify-between text-xs text-white/30 mb-10">
              <span>€2.000</span>
              <span>€15.000</span>
            </div>

            <div className="glass-card-gold p-6">
              <div className="text-sm text-gold/60 uppercase tracking-wider mb-2">
                Geschätzte jährliche Steuerersparnis
              </div>
              <div className="text-5xl font-display gold-text mb-2">
                <AnimatedNumber value={savings} prefix="€" />
              </div>
              <div className="text-white/40 text-sm">
                bei Steuersatz {Math.round(taxRate * 100)}% • Kaufpreis €250.000
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
              <div className="glass-card p-4">
                <div className="text-white/40">Kaufpreis</div>
                <div className="text-white font-semibold">€250.000</div>
              </div>
              <div className="glass-card p-4">
                <div className="text-white/40">Eigenkapital</div>
                <div className="text-gold font-semibold">€0</div>
              </div>
              <div className="glass-card p-4">
                <div className="text-white/40">Zinsen</div>
                <div className="text-white font-semibold">4,5%</div>
              </div>
              <div className="glass-card p-4">
                <div className="text-white/40">Monatsmiete</div>
                <div className="text-white font-semibold">€1.125</div>
              </div>
            </div>
          </motion.div>

          {/* Table side */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="glass-card overflow-hidden"
          >
            <div className="p-6 border-b border-white/5 flex items-center gap-3">
              <TrendingUp size={20} className="text-gold" />
              <h3 className="font-display text-lg text-white">5-Jahres-Projektion</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/5">
                    <th className="px-6 py-4 text-left text-white/40 font-normal">Jahr</th>
                    <th className="px-6 py-4 text-right text-white/40 font-normal">Zinsen</th>
                    <th className="px-6 py-4 text-right text-white/40 font-normal">Reduktion zvE</th>
                    <th className="px-6 py-4 text-right text-white/40 font-normal">Ersparnis</th>
                    <th className="px-6 py-4 text-right text-white/40 font-normal">Gesamt</th>
                  </tr>
                </thead>
                <tbody>
                  {years.map((year, i) => {
                    const factor = 1 - (i * 0.012);
                    const yearZinsen = Math.round(jahreszinsen * factor);
                    const yearReduction = Math.round((yearZinsen + afa));
                    const yearSavings = Math.round(yearReduction * taxRate);
                    const cumulative = Math.round(yearSavings * year * 0.98);
                    return (
                      <motion.tr
                        key={year}
                        initial={{ opacity: 0, x: 20 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.5, delay: 0.6 + i * 0.1 }}
                        className="border-b border-white/5 hover:bg-white/[0.02] transition-colors"
                      >
                        <td className="px-6 py-4 text-white">{year}</td>
                        <td className="px-6 py-4 text-right text-white/70">
                          €{yearZinsen.toLocaleString("de-DE")}
                        </td>
                        <td className="px-6 py-4 text-right text-white/70">
                          €{yearReduction.toLocaleString("de-DE")}
                        </td>
                        <td className="px-6 py-4 text-right text-gold font-semibold">
                          €{yearSavings.toLocaleString("de-DE")}
                        </td>
                        <td className="px-6 py-4 text-right text-gold font-bold">
                          €{cumulative.toLocaleString("de-DE")}
                        </td>
                      </motion.tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="p-6 bg-gold/5 border-t border-gold/10">
              <div className="flex justify-between items-center">
                <span className="text-white/60">5-Jahres-Ersparnis</span>
                <span className="text-2xl font-display gold-text">
                  €{Math.round(savings * 5 * 0.98).toLocaleString("de-DE")}
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
