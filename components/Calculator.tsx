'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';

export const Calculator = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [income, setIncome] = useState(5000);

  // Simple calculation
  const calculateSavings = (monthlyIncome: number) => {
    const yearlyIncome = monthlyIncome * 12;
    const taxRate = yearlyIncome > 80000 ? 0.42 : yearlyIncome > 60000 ? 0.38 : 0.30;
    const reduction = 10000; // Simplified: AfA + costs
    const yearlySavings = reduction * taxRate;
    return {
      monthly: Math.round(yearlySavings / 12),
      yearly: Math.round(yearlySavings),
      tenYears: Math.round(yearlySavings * 10),
      taxRate: Math.round(taxRate * 100),
    };
  };

  const savings = calculateSavings(income);

  return (
    <section ref={ref} className="relative py-32 bg-gradient-to-br from-purple-900 via-black to-blue-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 bg-purple-500/20 border border-purple-500/30 rounded-full font-semibold text-sm text-purple-300 mb-6">
            Steuerersparnis Analyse
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Finde heraus, wie viel du sparen kannst
          </h2>
          <p className="text-xl text-gray-300">
            Beantworte 6 kurze Fragen für deine persönliche Analyse
          </p>
        </motion.div>

        {/* Calculator Box */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-4xl mx-auto p-10 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20"
        >
          {/* Income Slider */}
          <div className="mb-12">
            <label className="block text-lg font-semibold mb-4">
              Dein monatliches Netto-Einkommen:
            </label>
            <div className="flex items-center gap-6">
              <input
                type="range"
                min="2000"
                max="20000"
                step="500"
                value={income}
                onChange={(e) => setIncome(Number(e.target.value))}
                className="flex-1 h-3 bg-white/20 rounded-full appearance-none cursor-pointer
                  [&::-webkit-slider-thumb]:appearance-none
                  [&::-webkit-slider-thumb]:w-6
                  [&::-webkit-slider-thumb]:h-6
                  [&::-webkit-slider-thumb]:rounded-full
                  [&::-webkit-slider-thumb]:bg-gradient-to-r
                  [&::-webkit-slider-thumb]:from-purple-500
                  [&::-webkit-slider-thumb]:to-pink-500
                  [&::-webkit-slider-thumb]:cursor-pointer
                  [&::-webkit-slider-thumb]:shadow-lg"
              />
              <span className="text-3xl font-bold text-purple-400 min-w-[150px]">
                €{income.toLocaleString('de-DE')}
              </span>
            </div>
          </div>

          {/* Results Grid */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              className="p-6 rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30"
            >
              <div className="text-sm text-purple-300 mb-2">Jährliche Ersparnis</div>
              <div className="text-4xl font-bold text-white mb-1">
                €{savings.yearly.toLocaleString('de-DE')}
              </div>
              <div className="text-sm text-gray-400">Dein Steuersatz: {savings.taxRate}%</div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              className="p-6 rounded-2xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30"
            >
              <div className="text-sm text-blue-300 mb-2">Monatlich</div>
              <div className="text-4xl font-bold text-white">
                €{savings.monthly.toLocaleString('de-DE')}
              </div>
              <div className="text-sm text-gray-400">Mehr in der Tasche</div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              className="p-6 rounded-2xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/30"
            >
              <div className="text-sm text-green-300 mb-2">In 10 Jahren</div>
              <div className="text-4xl font-bold text-white">
                €{savings.tenYears.toLocaleString('de-DE')}
              </div>
              <div className="text-sm text-gray-400">Gesamtersparnis</div>
            </motion.div>
          </div>

          {/* Example Property Info */}
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 mb-8">
            <h3 className="text-lg font-semibold mb-4">Beispiel-Immobilie (feste Parameter)</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <div className="text-gray-400">Kaufpreis</div>
                <div className="font-semibold">250.000 €</div>
              </div>
              <div>
                <div className="text-gray-400">Eigenkapital</div>
                <div className="font-semibold">0 €</div>
              </div>
              <div>
                <div className="text-gray-400">Zinssatz</div>
                <div className="font-semibold">4,5%</div>
              </div>
              <div>
                <div className="text-gray-400">Tilgung</div>
                <div className="font-semibold">1,0%</div>
              </div>
              <div>
                <div className="text-gray-400">Monatliche Miete</div>
                <div className="font-semibold">1.125 €</div>
              </div>
              <div>
                <div className="text-gray-400">AfA</div>
                <div className="font-semibold">4,0%</div>
              </div>
              <div>
                <div className="text-gray-400">Reduktion zvE/Jahr</div>
                <div className="font-semibold text-purple-400">-€10.000</div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full font-semibold text-lg hover:shadow-2xl hover:shadow-purple-500/50 transition-shadow"
            >
              Interessiert? Fordere jetzt deine persönliche Analyse an
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
