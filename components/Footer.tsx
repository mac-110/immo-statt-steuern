'use client';

import { motion } from 'framer-motion';

export const Footer = () => {
  return (
    <footer className="relative py-16 bg-gradient-to-b from-black to-gray-900 text-white border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Immo statt Steuern
            </h3>
            <p className="text-gray-400 leading-relaxed">
              Dein Partner für legale Steueroptimierung durch Immobilieninvestments. 
              Über 150 zufriedene Kunden vertrauen uns.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {['Steuer-Analyse', 'Über uns', 'Kundenstimmen', 'Kontakt'].map((link, index) => (
                <li key={index}>
                  <motion.a
                    href="#"
                    whileHover={{ x: 5 }}
                    className="text-gray-400 hover:text-white transition-colors inline-block"
                  >
                    {link}
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="text-lg font-semibold mb-4">Kontakt</h4>
            <ul className="space-y-2 text-gray-400">
              <li>📧 info@immo-statt-steuern.de</li>
              <li>📞 +49 (0) 123 456 789</li>
              <li>📍 Deutschland, bundesweit</li>
            </ul>
            <div className="flex gap-4 mt-6">
              {['Facebook', 'LinkedIn', 'Instagram'].map((social, index) => (
                <motion.a
                  key={index}
                  href="#"
                  whileHover={{ scale: 1.1, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 hover:border-purple-500/50 flex items-center justify-center transition-colors"
                >
                  <span className="text-sm">{social[0]}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="pt-8 border-t border-white/10"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
            <p>© 2026 Immo statt Steuern. Alle Rechte vorbehalten.</p>
            <div className="flex gap-6">
              <motion.a href="#" whileHover={{ x: 3 }} className="hover:text-white transition-colors">
                Impressum
              </motion.a>
              <motion.a href="#" whileHover={{ x: 3 }} className="hover:text-white transition-colors">
                Datenschutz
              </motion.a>
              <motion.a href="#" whileHover={{ x: 3 }} className="hover:text-white transition-colors">
                AGB
              </motion.a>
            </div>
          </div>
        </motion.div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 pt-8 border-t border-white/10"
        >
          <div className="flex flex-wrap justify-center gap-8 items-center opacity-50">
            <div className="text-xs text-center">
              <div className="font-semibold mb-1">100% Legal</div>
              <div className="text-gray-600">Bankgeprüft</div>
            </div>
            <div className="text-xs text-center">
              <div className="font-semibold mb-1">0€ Eigenkapital</div>
              <div className="text-gray-600">110% Finanzierung</div>
            </div>
            <div className="text-xs text-center">
              <div className="font-semibold mb-1">150+ Kunden</div>
              <div className="text-gray-600">Zufrieden</div>
            </div>
            <div className="text-xs text-center">
              <div className="font-semibold mb-1">4.9/5</div>
              <div className="text-gray-600">★★★★★</div>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};
