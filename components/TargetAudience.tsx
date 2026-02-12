'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export const TargetAudience = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const suitable = [
    'Angestellte & Führungskräfte mit hohem Einkommen',
    'Unternehmer & Selbstständige',
    'Ärzte, Ingenieure, Berater',
    'Personen mit hoher Steuerlast',
    'Auch ohne Eigenkapital möglich',
  ];

  const notSuitable = [
    'Du kurzfristig reich werden willst',
    'Du kein Interesse an langfristigem Vermögensaufbau hast',
    'Du nach schnellen Gewinnen ohne Strategie suchst',
    'Du keine seriöse, legale Beratung möchtest',
  ];

  return (
    <section ref={ref} className="relative py-32 bg-white text-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
            Für wen ist{' '}
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              „Immo statt Steuern"
            </span>
            <br />
            geeignet?
          </h2>
        </motion.div>

        {/* Two columns */}
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Suitable For */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative p-10 rounded-3xl bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 overflow-hidden"
          >
            {/* Decorative gradient */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-green-400 to-emerald-400 opacity-10 blur-3xl" />

            <div className="relative">
              <div className="text-5xl mb-6">✓</div>
              <h3 className="text-2xl font-bold mb-6 text-green-700">
                Perfekt geeignet für:
              </h3>
              <ul className="space-y-4">
                {suitable.map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-white text-sm mt-1">
                      ✓
                    </span>
                    <span className="text-lg text-gray-700">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Not Suitable For */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative p-10 rounded-3xl bg-gradient-to-br from-red-50 to-orange-50 border-2 border-red-200 overflow-hidden"
          >
            {/* Decorative gradient */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-red-400 to-orange-400 opacity-10 blur-3xl" />

            <div className="relative">
              <div className="text-5xl mb-6">✗</div>
              <h3 className="text-2xl font-bold mb-6 text-red-700">
                Nicht geeignet, wenn:
              </h3>
              <ul className="space-y-4">
                {notSuitable.map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-red-500 flex items-center justify-center text-white text-sm mt-1">
                      ✗
                    </span>
                    <span className="text-lg text-gray-700">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <div className="inline-block p-10 rounded-3xl bg-gradient-to-br from-black to-gray-900 text-white">
            <p className="text-2xl font-bold mb-6">
              Bereit, deine Steuerlast zu optimieren?
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full font-semibold text-lg hover:shadow-2xl hover:shadow-purple-500/50 transition-shadow"
            >
              Ja, ich will mehr erfahren
            </motion.button>
            <p className="text-gray-400 mt-4 text-sm">
              Kostenlose Erstanalyse • Keine Verpflichtungen • 100% Legal
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
