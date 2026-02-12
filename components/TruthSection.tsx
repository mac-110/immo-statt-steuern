'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

const AnimatedCounter = ({ value, suffix = '', prefix = '' }: { value: number; suffix?: string; prefix?: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      const duration = 2000;
      const steps = 60;
      const increment = value / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <span ref={ref}>
      {prefix}
      {count.toLocaleString('de-DE')}
      {suffix}
    </span>
  );
};

export const TruthSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const stats = [
    { value: 3750, suffix: '€', label: 'pro Monat bei €100k Jahresgehalt', sublabel: 'Gehen direkt ans Finanzamt – ohne dass du davon profitierst' },
    { value: 450, suffix: 'k€', label: 'in 10 Jahren verloren', sublabel: 'Das ist eine abbezahlte Eigentumswohnung – einfach weg' },
    { value: 0, suffix: '%', label: 'Vermögensaufbau-Rate', sublabel: 'Während andere Vermögen aufbauen, stehst du still' },
  ];

  const comparison = [
    { label: 'DU HEUTE', value: '42-45%', sublabel: 'Steuerlast als Top-Verdiener', color: 'from-red-500 to-orange-500' },
    { label: 'MIT SYSTEM', value: '8-15%', sublabel: 'Effektive Steuerlast + Vermögensaufbau', color: 'from-green-500 to-emerald-500' },
  ];

  return (
    <section ref={ref} className="relative py-32 bg-white text-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <span className="inline-block px-4 py-2 bg-red-100 text-red-600 rounded-full font-semibold text-sm">
            Die brutale Wahrheit
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold text-center mb-6"
        >
          Du verlierst jeden Monat
          <br />
          <span className="text-red-600">Tausende Euro</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-xl md:text-2xl text-center text-gray-600 mb-20"
        >
          ...ohne es zu merken. Und das Schlimmste?{' '}
          <span className="font-semibold text-black">Dein Steuerberater sagt dir das nicht.</span>
        </motion.p>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-24">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="p-8 rounded-3xl bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 hover:border-gray-300 transition-all"
            >
              <div className="text-5xl md:text-6xl font-bold text-red-600 mb-4">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-xl font-semibold text-black mb-2">{stat.label}</div>
              <div className="text-gray-600">{stat.sublabel}</div>
            </motion.div>
          ))}
        </div>

        {/* Comparison */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="grid md:grid-cols-2 gap-8 mb-16"
        >
          {comparison.map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="relative p-10 rounded-3xl overflow-hidden"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-10`} />
              <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 hover:opacity-5 transition-opacity`} />
              <div className="relative">
                <div className="text-sm font-semibold text-gray-600 mb-2">{item.label}</div>
                <div className={`text-6xl md:text-7xl font-bold mb-4 bg-gradient-to-r ${item.color} bg-clip-text text-transparent`}>
                  {item.value}
                </div>
                <div className="text-lg text-gray-700">{item.sublabel}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Salary comparison */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1.1 }}
          className="bg-gradient-to-br from-gray-900 to-black text-white p-10 rounded-3xl"
        >
          <h3 className="text-2xl md:text-3xl font-bold mb-8 text-center">
            So verändert sich deine Gehaltsabrechnung
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-6 bg-red-500/10 border border-red-500/20 rounded-2xl">
              <div className="text-sm font-semibold text-red-400 mb-4">VORHER</div>
              <div className="space-y-2 text-gray-300">
                <div>Brutto: €60.000</div>
                <div>Steuer: €18.000</div>
                <div className="text-xl font-bold text-white pt-2">Netto: €42.000</div>
              </div>
            </div>
            <div className="p-6 bg-green-500/10 border border-green-500/20 rounded-2xl">
              <div className="text-sm font-semibold text-green-400 mb-4">NACHHER</div>
              <div className="space-y-2 text-gray-300">
                <div>Brutto: €60.000</div>
                <div>Steuer: €9.000</div>
                <div className="text-xl font-bold text-white pt-2">Netto: €51.000</div>
              </div>
            </div>
          </div>
          <p className="text-center text-sm text-gray-400 mt-6">
            Beispielrechnung bei 60.000 € Jahresgehalt (Steuerklasse 1) mit Immobilieninvestment
          </p>
        </motion.div>
      </div>
    </section>
  );
};
