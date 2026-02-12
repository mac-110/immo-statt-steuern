'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export const QuickCalculator = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const incomes = [
    { value: 3000, label: '€3.000' },
    { value: 5000, label: '€5.000' },
    { value: 7000, label: '€7.000' },
    { value: 10000, label: '€10.000' },
    { value: 15000, label: '€15.000+' },
  ];

  return (
    <section ref={ref} className="relative py-32 bg-gray-50 text-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 bg-gold/10 border border-gold/20 rounded-full font-semibold text-sm text-gold mb-6">
            Schnellrechner
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-800">
            Steuerersparnis berechnen
          </h2>
          <p className="text-xl text-gray-500">
            Wähle dein Einkommen und sieh sofort deine Ersparnis
          </p>
        </motion.div>

        {/* Income Cards */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-5 gap-4 max-w-5xl mx-auto mb-16"
        >
          {incomes.map((income, index) => (
            <motion.button
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
              whileHover={{ scale: 1.1, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className="p-6 rounded-2xl bg-white backdrop-blur-sm border border-gray-200 hover:border-gold/50 hover:bg-gold/5 transition-all group shadow-sm"
            >
              <div className="text-3xl font-bold text-gold group-hover:text-gold-dark transition-colors">
                {income.label}
              </div>
              <div className="text-sm text-gray-400 mt-2">Monatlich</div>
            </motion.button>
          ))}
        </motion.div>

        {/* Info Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="max-w-3xl mx-auto text-center"
        >
          <div className="p-8 rounded-3xl bg-white border border-gold/10 shadow-sm">
            <p className="text-lg text-gray-600 mb-6">
              Die Zinsen sinken jährlich durch die 1% Tilgung. AfA (10.000 €) und Nebenkosten (2.250 €) bleiben konstant.
            </p>
            <p className="text-sm text-gray-400">
              Wähle oben dein Einkommen, um deine Ersparnis zu berechnen
            </p>
          </div>
        </motion.div>

        {/* Deadline Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 1 }}
          className="max-w-4xl mx-auto mt-16"
        >
          <div className="p-8 rounded-3xl bg-gradient-to-r from-orange-50 to-red-50 border-2 border-orange-200 shadow-sm">
            <div className="flex items-center justify-center gap-4">
              <span className="text-4xl">⏰</span>
              <div>
                <div className="text-2xl font-bold mb-1 text-gray-800">
                  Steuerdeadline 2026: Jetzt noch optimieren
                </div>
                <div className="text-gray-500">
                  Sichere dir deine Steuerersparnis für dieses Jahr
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
