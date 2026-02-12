'use client';

import Image from 'next/image';
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
      gradient: 'from-teal-500 to-emerald-500',
    },
    {
      number: '2',
      title: 'Passende Immobilie finden',
      description: 'Wir präsentieren dir bankfähige, bereits vermietete Immobilien im Full-Service-Konzept (einschliesslich Hausverwaltung und Mietgarantie) – perfekt auf deine Situation zugeschnitten.',
      time: 'Sofort vermietbar',
      badge: 'Zertifiziert',
      gradient: 'from-blue-400 to-cyan-400',
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
      gradient: 'from-amber-500 to-orange-500',
    },
  ];

  return (
    <section ref={ref} className="relative py-32 bg-gray-50 text-gray-800 overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#d1d5db2e_1px,transparent_1px),linear-gradient(to_bottom,#d1d5db2e_1px,transparent_1px)] bg-[size:64px_64px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 bg-gold/10 border border-gold/20 rounded-full font-semibold text-sm text-gold mb-6">
            Dein Weg zum Steuer-Erfolg
          </span>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-gray-800">
            In nur{' '}
            <span className="gold-text">
              4 einfachen Schritten
            </span>
          </h2>
          <p className="text-xl text-gray-500">
            Von der ersten Analyse bis zur Steuerersparnis in unter{' '}
            <span className="text-gray-800 font-semibold">90 Tagen</span>
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left: Steps */}
          <div className="space-y-6">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -60 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                className="relative"
              >
                <motion.div
                  whileHover={{ scale: 1.02, y: -3 }}
                  className="relative p-6 md:p-8 rounded-3xl bg-white backdrop-blur-sm border border-gray-200 hover:border-gray-300 transition-all overflow-hidden group shadow-sm"
                >
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${step.gradient} opacity-0 group-hover:opacity-5 transition-opacity`}
                    initial={false}
                  />

                  <div className="relative flex items-start gap-6">
                    {/* Number Circle */}
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                      className={`flex-shrink-0 w-16 h-16 rounded-full bg-gradient-to-br ${step.gradient} flex items-center justify-center text-2xl font-bold text-white shadow-lg`}
                    >
                      {step.number}
                    </motion.div>

                    {/* Content */}
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2 text-gray-800">{step.title}</h3>
                      <p className="text-gray-500 text-sm mb-3 leading-relaxed">
                        {step.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 bg-gray-50 border border-gray-200 rounded-full text-xs text-gray-600">
                          ⏱ {step.time}
                        </span>
                        <span className={`px-3 py-1 bg-gradient-to-r ${step.gradient} rounded-full text-xs font-semibold text-white`}>
                          ✓ {step.badge}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Right: Image */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="sticky top-32"
          >
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/images/neighborhood-aerial.png"
                alt="Luftaufnahme einer deutschen Wohngegend"
                width={700}
                height={600}
                className="object-cover w-full h-auto"
              />
            </div>
            <div className="absolute -inset-4 bg-gold/8 rounded-3xl blur-3xl -z-10" />
          </motion.div>
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
            className="px-8 py-4 bg-gold rounded-full font-semibold text-lg text-white hover:shadow-[0_0_40px_rgba(59,125,110,0.3)] transition-shadow"
          >
            Jetzt kostenlose Analyse starten
          </motion.button>
          <p className="text-gray-400 mt-4">
            ⚡ Erste Ergebnisse in 24 Stunden
          </p>
        </motion.div>
      </div>
    </section>
  );
};
