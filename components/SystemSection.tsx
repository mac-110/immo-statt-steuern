'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export const SystemSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const principles = [
    {
      icon: 'AfA',
      title: 'Abschreibungen',
      description: 'Hohe jährliche Abschreibungen reduzieren das zu versteuernde Einkommen',
      value: 'Bis zu €40.000+',
      sublabel: 'pro Jahr',
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      icon: '110%',
      title: 'Bankfinanzierung',
      description: 'Investiere mit 0€ Eigenkapital – die Bank finanziert 110% inkl. Nebenkosten',
      value: 'bis zu 100%',
      sublabel: '*Bonität vorausgesetzt',
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      icon: '🏠',
      title: 'Miete zahlt Kreditrate',
      description: 'Mieter zahlen deine Rate an die Bank und dir somit langfristig deine Immobilie ab',
      value: 'bis zu 100%',
      sublabel: 'automatisch abbezahlt',
      gradient: 'from-green-500 to-emerald-500',
    },
    {
      icon: '∞',
      title: 'Langfristiger Vermögensaufbau',
      description: 'Wertsteigerung + Tilgung durch Mieter = Dein automatisches Vermögen',
      value: 'Skalierbar',
      sublabel: '∞',
      gradient: 'from-orange-500 to-red-500',
    },
  ];

  return (
    <section ref={ref} className="relative py-32 bg-black text-white overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900 via-transparent to-transparent" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <span className="inline-block px-4 py-2 bg-purple-500/10 border border-purple-500/30 rounded-full font-semibold text-sm text-purple-400">
            Das Geheim-System
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold text-center mb-6"
        >
          So machen es die{' '}
          <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Vermögenden
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-xl md:text-2xl text-center text-gray-400 mb-20"
        >
          4 simple Prinzipien, die jeder Top-Verdiener kennen sollte
        </motion.p>

        {/* Principles Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {principles.map((principle, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group relative p-8 rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all overflow-hidden"
            >
              {/* Gradient background on hover */}
              <motion.div
                className={`absolute inset-0 bg-gradient-to-br ${principle.gradient} opacity-0 group-hover:opacity-10 transition-opacity`}
                initial={false}
              />

              <div className="relative">
                {/* Icon */}
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${principle.gradient} flex items-center justify-center text-2xl font-bold mb-6`}
                >
                  {principle.icon}
                </motion.div>

                {/* Title */}
                <h3 className="text-2xl font-bold mb-4">{principle.title}</h3>

                {/* Description */}
                <p className="text-gray-400 mb-6 leading-relaxed">
                  {principle.description}
                </p>

                {/* Value */}
                <div className={`text-4xl font-bold bg-gradient-to-r ${principle.gradient} bg-clip-text text-transparent mb-1`}>
                  {principle.value}
                </div>
                <div className="text-sm text-gray-500">{principle.sublabel}</div>
              </div>

              {/* Decorative corner */}
              <div className="absolute top-0 right-0 w-32 h-32 opacity-5">
                <div className={`absolute inset-0 bg-gradient-to-br ${principle.gradient} blur-3xl`} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="text-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full font-semibold text-lg hover:shadow-2xl hover:shadow-purple-500/50 transition-shadow"
          >
            Jetzt persönliche Analyse anfordern
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};
