'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export const Testimonials = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const testimonials = [
    {
      quote: 'Ich war skeptisch, ob das wirklich funktioniert. Aber nach der Beratung war alles klar – jetzt spare ich jährlich über €12.000 Steuern und baue nebenbei Vermögen auf. Absolut empfehlenswert!',
      name: 'Thomas K.',
      role: 'IT-Projektleiter, München',
      savings: '€12.400 / Jahr gespart',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      quote: 'Als Ärztin zahle ich normalerweise sehr hohe Steuern. Dank der Beratung konnte ich meine erste Immobilie ohne Eigenkapital kaufen. Der Service war professionell und unkompliziert.',
      name: 'Dr. Sarah M.',
      role: 'Fachärztin, Hamburg',
      savings: '€18.200 / Jahr gespart',
      color: 'from-purple-500 to-pink-500',
    },
    {
      quote: 'Endlich jemand, der versteht wie Steueroptimierung wirklich funktioniert! Innerhalb von 8 Wochen hatte ich meine erste Kapitalanlage – komplett finanziert und bereits vermietet.',
      name: 'Markus W.',
      role: 'Unternehmensberater, Frankfurt',
      savings: '€15.800 / Jahr gespart',
      color: 'from-green-500 to-emerald-500',
    },
    {
      quote: 'Ich dachte, so etwas funktioniert nur für Millionäre. Aber mit einem normalen Gehalt konnte ich jetzt zwei Wohnungen kaufen – und zahle trotzdem weniger Steuern als vorher!',
      name: 'Lisa B.',
      role: 'Teamleiterin, Köln',
      savings: '€9.600 / Jahr gespart',
      color: 'from-orange-500 to-red-500',
    },
    {
      quote: 'Die Beratung war extrem transparent – keine versteckten Kosten, keine leeren Versprechungen. Mein Steuerberater war beeindruckt von der Qualität der Unterlagen.',
      name: 'Anika P.',
      role: 'Wirtschaftsprüferin, Berlin',
      savings: '€21.500 / Jahr gespart',
      color: 'from-pink-500 to-rose-500',
    },
    {
      quote: 'Nach 20 Jahren im Beruf endlich eine Strategie gefunden, die funktioniert. Vermögensaufbau statt Steuerzahlung – genau das, was ich gesucht habe!',
      name: 'Christine H.',
      role: 'Abteilungsleiterin, Stuttgart',
      savings: '€14.300 / Jahr gespart',
      color: 'from-indigo-500 to-purple-500',
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0 },
  };

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
          <span className="inline-block px-4 py-2 bg-green-100 text-green-600 rounded-full font-semibold text-sm mb-6">
            Kundenstimmen
          </span>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
            Das sagen unsere Kunden
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Über 150 zufriedene Kunden haben bereits ihre Steuerlast optimiert
          </p>
          <div className="text-5xl font-bold">
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              4.9
            </span>
            <span className="text-2xl text-gray-400"> von 5 Sternen</span>
          </div>
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          animate={isInView ? 'show' : 'hidden'}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              variants={item}
              whileHover={{ y: -10, scale: 1.02 }}
              className="relative p-8 rounded-3xl bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 hover:border-gray-300 transition-all overflow-hidden group"
            >
              {/* Decorative gradient */}
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${testimonial.color} opacity-0 group-hover:opacity-10 blur-3xl transition-opacity`} />

              <div className="relative">
                {/* Stars */}
                <div className="text-2xl mb-4">★★★★★</div>

                {/* Quote */}
                <p className="text-gray-700 mb-6 leading-relaxed italic">
                  "{testimonial.quote}"
                </p>

                {/* Author */}
                <div className="mb-4">
                  <div className="font-bold text-lg">{testimonial.name}</div>
                  <div className="text-gray-600 text-sm">{testimonial.role}</div>
                </div>

                {/* Savings */}
                <div className={`inline-block px-4 py-2 rounded-full bg-gradient-to-r ${testimonial.color} bg-opacity-10 border border-current`}>
                  <span className={`font-bold bg-gradient-to-r ${testimonial.color} bg-clip-text text-transparent`}>
                    {testimonial.savings}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center"
        >
          <div className="inline-block p-10 rounded-3xl bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200">
            <p className="text-2xl font-bold mb-4">
              Werde Teil von über{' '}
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                150+ zufriedenen Kunden
              </span>
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-semibold text-lg hover:shadow-2xl hover:shadow-purple-500/50 transition-shadow"
            >
              Jetzt Beratungsgespräch vereinbaren
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
