"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Briefcase,
  Users,
  Building2,
  Shield,
  Euro,
  User,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  ArrowLeft,
  Check,
  Sparkles,
} from "lucide-react";

type FormData = {
  employmentType: string;
  income: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city: string;
};

const employmentOptions = [
  { value: "angestellt", label: "Angestellt", icon: Briefcase },
  { value: "selbststaendig", label: "Selbstständig", icon: Users },
  { value: "beamter", label: "Beamter", icon: Shield },
  { value: "sonstiges", label: "Sonstiges", icon: Building2 },
];

const incomeRanges = [
  { value: "50k-80k", label: "50.000 – 80.000 €" },
  { value: "80k-120k", label: "80.000 – 120.000 €" },
  { value: "120k-200k", label: "120.000 – 200.000 €" },
  { value: "200k+", label: "200.000 € und mehr" },
];

export default function LeadForm() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    employmentType: "",
    income: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    city: "",
  });

  const updateField = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      setStep(3);
    } catch (error) {
      console.error("Lead submission failed:", error);
      alert("Ein Fehler ist aufgetreten. Bitte versuche es erneut.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const canProceedStep1 = formData.employmentType && formData.income;
  const canProceedStep2 =
    formData.firstName && formData.lastName && formData.email && formData.city;

  return (
    <section id="analyse" className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-72 h-72 bg-gold/3 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gold/20 bg-gold/5 mb-6">
            <Sparkles size={16} className="text-gold" />
            <span className="text-gold/80 text-sm tracking-widest uppercase">
              Kostenlose Analyse
            </span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl text-white mb-4">
            Deine <span className="gold-text">Steuerersparnis</span> berechnen
          </h2>
          <p className="text-white/50 text-lg">
            In nur 2 Minuten zu deiner persönlichen Strategie
          </p>
        </motion.div>

        {/* Progress Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-2">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`flex items-center ${s < 3 ? "flex-1" : ""}`}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-500 ${
                    step >= s
                      ? "border-gold bg-gold/20 text-gold"
                      : "border-white/10 text-white/30"
                  }`}
                >
                  {step > s ? <Check size={20} /> : s}
                </div>
                {s < 3 && (
                  <div
                    className={`h-0.5 flex-1 mx-2 transition-all duration-500 ${
                      step > s ? "bg-gold" : "bg-white/10"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between text-xs text-white/40 px-2">
            <span>Situation</span>
            <span>Kontakt</span>
            <span>Fertig</span>
          </div>
        </motion.div>

        {/* Form Card */}
        <motion.div
          layout
          className="glass-card p-8 md:p-12 relative overflow-hidden"
        >
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-2xl font-bold text-white mb-6">
                  Deine berufliche Situation
                </h3>

                {/* Employment Type */}
                <div className="mb-8">
                  <label className="block text-white/70 mb-4">
                    Beschäftigungsverhältnis
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {employmentOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() =>
                          updateField("employmentType", option.value)
                        }
                        className={`p-4 rounded-xl border-2 transition-all duration-300 flex flex-col items-center gap-2 ${
                          formData.employmentType === option.value
                            ? "border-gold bg-gold/10 text-gold"
                            : "border-white/10 text-white/50 hover:border-white/20"
                        }`}
                      >
                        <option.icon size={24} />
                        <span className="font-medium">{option.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Income Range */}
                <div className="mb-8">
                  <label className="block text-white/70 mb-4 flex items-center gap-2">
                    <Euro size={20} />
                    Jahresbruttoeinkommen
                  </label>
                  <div className="space-y-3">
                    {incomeRanges.map((range) => (
                      <button
                        key={range.value}
                        onClick={() => updateField("income", range.value)}
                        className={`w-full p-4 rounded-xl border-2 transition-all duration-300 text-left ${
                          formData.income === range.value
                            ? "border-gold bg-gold/10 text-gold"
                            : "border-white/10 text-white/50 hover:border-white/20"
                        }`}
                      >
                        {range.label}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => setStep(2)}
                  disabled={!canProceedStep1}
                  className={`w-full py-4 rounded-full font-bold text-lg flex items-center justify-center gap-2 transition-all duration-300 ${
                    canProceedStep1
                      ? "bg-gold text-navy hover:shadow-[0_0_40px_rgba(212,168,83,0.4)]"
                      : "bg-white/10 text-white/30 cursor-not-allowed"
                  }`}
                >
                  Weiter
                  <ArrowRight size={20} />
                </button>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-2xl font-bold text-white mb-6">
                  Deine Kontaktdaten
                </h3>

                <div className="space-y-4 mb-8">
                  {/* Name Row */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-white/70 mb-2 text-sm">
                        Vorname *
                      </label>
                      <div className="relative">
                        <User
                          size={18}
                          className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30"
                        />
                        <input
                          type="text"
                          value={formData.firstName}
                          onChange={(e) =>
                            updateField("firstName", e.target.value)
                          }
                          className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:border-gold focus:outline-none transition-colors"
                          placeholder="Max"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-white/70 mb-2 text-sm">
                        Nachname *
                      </label>
                      <div className="relative">
                        <User
                          size={18}
                          className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30"
                        />
                        <input
                          type="text"
                          value={formData.lastName}
                          onChange={(e) =>
                            updateField("lastName", e.target.value)
                          }
                          className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:border-gold focus:outline-none transition-colors"
                          placeholder="Mustermann"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-white/70 mb-2 text-sm">
                      E-Mail *
                    </label>
                    <div className="relative">
                      <Mail
                        size={18}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30"
                      />
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => updateField("email", e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:border-gold focus:outline-none transition-colors"
                        placeholder="max@beispiel.de"
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-white/70 mb-2 text-sm">
                      Telefon (optional)
                    </label>
                    <div className="relative">
                      <Phone
                        size={18}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30"
                      />
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => updateField("phone", e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:border-gold focus:outline-none transition-colors"
                        placeholder="+49 123 456789"
                      />
                    </div>
                  </div>

                  {/* City */}
                  <div>
                    <label className="block text-white/70 mb-2 text-sm">
                      Stadt/Region *
                    </label>
                    <div className="relative">
                      <MapPin
                        size={18}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30"
                      />
                      <input
                        type="text"
                        value={formData.city}
                        onChange={(e) => updateField("city", e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:border-gold focus:outline-none transition-colors"
                        placeholder="München"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={() => setStep(1)}
                    className="px-6 py-4 rounded-full border border-white/10 text-white/70 hover:border-gold/30 hover:text-gold transition-all duration-300 flex items-center gap-2"
                  >
                    <ArrowLeft size={20} />
                    Zurück
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={!canProceedStep2 || isSubmitting}
                    className={`flex-1 py-4 rounded-full font-bold text-lg flex items-center justify-center gap-2 transition-all duration-300 ${
                      canProceedStep2 && !isSubmitting
                        ? "bg-gold text-navy hover:shadow-[0_0_40px_rgba(212,168,83,0.4)]"
                        : "bg-white/10 text-white/30 cursor-not-allowed"
                    }`}
                  >
                    {isSubmitting ? "Wird gesendet..." : "Analyse anfordern"}
                    <ArrowRight size={20} />
                  </button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center py-12"
              >
                {/* Checkmark Animation */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    delay: 0.2,
                    type: "spring",
                    stiffness: 200,
                    damping: 15,
                  }}
                  className="w-24 h-24 mx-auto mb-8 rounded-full bg-gold/20 border-2 border-gold flex items-center justify-center"
                >
                  <Check size={48} className="text-gold" />
                </motion.div>

                {/* Confetti Effect */}
                {[...Array(20)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{
                      opacity: 1,
                      x: 0,
                      y: 0,
                      scale: 1,
                    }}
                    animate={{
                      opacity: 0,
                      x: (Math.random() - 0.5) * 400,
                      y: Math.random() * -300,
                      scale: 0,
                    }}
                    transition={{
                      duration: 1.5,
                      delay: i * 0.05,
                      ease: "easeOut",
                    }}
                    className="absolute top-1/2 left-1/2 w-2 h-2 rounded-full"
                    style={{
                      backgroundColor:
                        i % 2 === 0 ? "#d4a853" : "rgba(212, 168, 83, 0.3)",
                    }}
                  />
                ))}

                <motion.h3
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-3xl font-bold text-white mb-4"
                >
                  Vielen Dank, {formData.firstName}!
                </motion.h3>

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="text-white/70 text-lg mb-8"
                >
                  Wir melden uns innerhalb von <span className="text-gold font-bold">24 Stunden</span> bei
                  dir mit deiner persönlichen Steuerersparnis-Analyse.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="flex items-center justify-center gap-2 text-white/50 text-sm"
                >
                  <Shield size={16} />
                  <span>Deine Daten werden vertraulich behandelt</span>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Trust Indicators */}
        {step < 3 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap items-center justify-center gap-6 mt-8 text-white/40 text-sm"
          >
            <div className="flex items-center gap-2">
              <Shield size={16} />
              <span>100% vertraulich</span>
            </div>
            <div className="flex items-center gap-2">
              <Check size={16} />
              <span>Keine versteckten Kosten</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles size={16} />
              <span>Kostenlose Erstberatung</span>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
