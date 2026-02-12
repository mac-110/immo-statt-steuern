'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export const StepsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const steps = [
    {
      number: '1',
      title: 'Kostenlose Steuer-Analyse',
      description: 'Wir analysieren deine komplette finanzielle Situation und zeigen dir dein exaktes Einsparungspotenzial in Euro.',
      time: '30 Minuten',
      badge: '100% Kostenlos',
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      number: '2',
      title: 'Passende Immobilie finden',
      description: 'Wir präsentieren dir bankfähige, bereits vermietete Immobilien im Full-Service-Konzept (einschliesslich Hausverwaltung und Mietgarantie) – perfekt auf deine Situation zugeschnitten.',
      time: 'Sofort vermietbar',
      badge: 'Zertifiziert',
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      number: '3',
      title: 'Finanzierung & Setup',
      description: 'Wir übernehmen alles: Bankfinanzierung ohne Eigenkapital, Steuerberater-Koordination und komplettes Vertragsmanagement.',
      time: '110% Finanzierung',
      badge: '0€ Eigenkapital',
      gradient: 'from-green-500 to-emerald-500',
    },
    {
      number: '4',
      title: 'Erfolgreicher Abschluss',
      description: 'Von Kaufvertrag bis Übergabe – du bist nie allein. Dein Vermögensaufbau läuft automatisch.',
      time: '24/7 Support',
      badge: 'Dein Berater',
      gradient: 'from-orange-500 to-red-500',
    },
  ];

  return (
    <section ref={ref} className="relative py-32 bg-black text-white overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:64px_64px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 bg-purple-500/10 border border-purple-500/30 rounded-full font-semibold text-sm text-purple-400 mb-6">
            Dein Weg zum Steuer-Erfolg
          </span>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
            In nur{' '}
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              4 einfachen Schritten
            </span>
          </h2>
          <p className="text-xl text-gray-400">
            Von der ersten Analyse bis zur Steuerersparnis in unter{' '}
            <span className="text-white font-semibold">90 Tagen</span>
          </p>
        </motion.div>

        {/* Steps */}
        <div className="space-y-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              className="relative"
            >
              <motion.div
                whileHover={{ scale: 1.02, y: -5 }}
                className="relative p-8 md:p-12 rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all overflow-hidden group"
              >
                {/* Gradient background on hover */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${step.gradient} opacity-0 group-hover:opacity-10 transition-opacity`}
                  initial={false}
                />

                <div className="relative flex flex-col md:flex-row items-start md:items-center gap-8">
                  {/* Number Circle */}
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className={`flex-shrink-0 w-24 h-24 rounded-full bg-gradient-to-br ${step.gradient} flex items-center justify-center text-4xl font-bold shadow-2xl`}
                  >
                    {step.number}
                  </motion.div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="text-3xl font-bold mb-3">{step.title}</h3>
                    <p className="text-gray-400 text-lg mb-4 leading-relaxed">
                      {step.description}
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <span className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm">
                        ⏱ {step.time}
                      </span>
                      <span className={`px-4 py-2 bg-gradient-to-r ${step.gradient} rounded-full text-sm font-semibold`}>
                        ✓ {step.badge}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Connecting line (except for last item) */}
                {index < steps.length - 1 && (
                  <motion.div
                    initial={{ scaleY: 0 }}
                    animate={isInView ? { scaleY: 1 } : {}}
                    transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                    className={`absolute left-12 md:left-12 bottom-0 w-0.5 h-8 bg-gradient-to-b ${step.gradient} origin-top`}
                  />
                )}
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full font-semibold text-lg hover:shadow-2xl hover:shadow-purple-500/50 transition-shadow"
          >
            Jetzt kostenlose Analyse starten
          </motion.button>
          <p className="text-gray-500 mt-4">
            ⚡ Erste Ergebnisse in 24 Stunden
          </p>
        </motion.div>
      </div>
    </section>
  );
};
