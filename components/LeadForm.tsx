"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useMutation } from "convex/react";
import { api } from "../convex/_generated/api";
import {
  Briefcase,
  Users,
  Shield,
  Building2,
  Euro,
  User,
  Mail,
  Phone,
  ArrowRight,
  ArrowLeft,
  Check,
  CheckCircle2,
  Sparkles,
  PiggyBank,
} from "lucide-react";

type FormData = {
  name: string;
  email: string;
  phone: string;
  source: string;
  sourceDetail: string;
  employmentType: string;
  employedSince: string;
  grossIncome: string;
  equity: string;
  investmentBudget: string;
  notes: string;
  schufaClean: string;
};

const employmentOptions = [
  { value: "angestellt_unbefristet", label: "Angestellt (unbefristet)", icon: Briefcase },
  { value: "angestellt_befristet", label: "Angestellt (befristet)", icon: Briefcase },
  { value: "verbeamtet", label: "Verbeamtet", icon: Shield },
  { value: "selbstständig", label: "Selbstständig", icon: Users },
];

const incomeRanges = [
  { value: "40-60k", label: "40.000 – 60.000 €" },
  { value: "60-80k", label: "60.000 – 80.000 €" },
  { value: "80-100k", label: "80.000 – 100.000 €" },
  { value: "100k+", label: "Über 100.000 €" },
];

const employedSinceOptions = [
  { value: "unter 6 Monate", label: "Unter 6 Monate" },
  { value: "6-12 Monate", label: "6 – 12 Monate" },
  { value: "1-2 Jahre", label: "1 – 2 Jahre" },
  { value: "über 2 Jahre", label: "Über 2 Jahre" },
];

const equityRanges = [
  { value: "0€", label: "Kein Eigenkapital" },
  { value: "unter 10k", label: "Unter 10.000 €" },
  { value: "10-30k", label: "10.000 – 30.000 €" },
  { value: "30-50k", label: "30.000 – 50.000 €" },
  { value: "50k+", label: "Über 50.000 €" },
];

const investmentBudgets = [
  { value: "100-150k", label: "100.000 – 150.000 €" },
  { value: "150-200k", label: "150.000 – 200.000 €" },
  { value: "200-300k", label: "200.000 – 300.000 €" },
  { value: "300k+", label: "Über 300.000 €" },
  { value: "unsicher", label: "Bin mir noch unsicher" },
];

const sourceOptions = [
  { value: "reddit", label: "Reddit" },
  { value: "linkedin", label: "LinkedIn" },
  { value: "google", label: "Google Suche" },
  { value: "empfehlung", label: "Empfehlung / Bekannte" },
  { value: "sonstiges", label: "Sonstiges" },
];

function OptionButton({
  selected,
  onClick,
  children,
}: {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full text-left px-5 py-3.5 rounded-xl border-2 transition-all duration-300 text-sm sm:text-base ${
        selected
          ? "border-gold bg-gold/10 text-gold font-medium shadow-sm"
          : "border-gray-200 bg-gray-50 text-gray-600 hover:border-gray-300"
      }`}
    >
      {children}
    </button>
  );
}

export default function LeadForm() {
  const [step, setStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const createLead = useMutation(api.leads.createLead);

  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    source: "",
    sourceDetail: "",
    employmentType: "",
    employedSince: "",
    grossIncome: "",
    equity: "",
    investmentBudget: "",
    notes: "",
    schufaClean: "",
  });

  const update = (field: keyof FormData, value: string) => {
    setForm((f) => ({ ...f, [field]: value }));
    setErrors((e) => ({ ...e, [field]: "", contact: "" }));
  };

  const validateStep = (s: number): boolean => {
    const newErrors: Record<string, string> = {};
    if (s === 0) {
      if (!form.employmentType) newErrors.employmentType = "Bitte wähle dein Beschäftigungsverhältnis.";
      if (!form.grossIncome) newErrors.grossIncome = "Bitte wähle dein Bruttoeinkommen.";
    }
    if (s === 1) {
      if (!form.schufaClean) newErrors.schufaClean = "Bitte beantworte die SCHUFA-Frage.";
      if (!form.equity) newErrors.equity = "Bitte wähle dein verfügbares Eigenkapital.";
    }
    if (s === 2) {
      if (!form.name.trim()) newErrors.name = "Bitte gib deinen Namen ein.";
      if (!form.email.trim() && !form.phone.trim())
        newErrors.contact = "Bitte gib eine E-Mail oder Telefonnummer an.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const next = () => {
    if (validateStep(step)) setStep((s) => s + 1);
  };
  const back = () => setStep((s) => s - 1);

  const submit = async () => {
    if (!validateStep(2)) return;
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      await createLead({
        name: form.name.trim(),
        email: form.email.trim() || undefined,
        phone: form.phone.trim() || undefined,
        grossIncome: form.grossIncome,
        equity: form.equity,
        employmentType: form.employmentType,
        employedSince: form.employedSince || undefined,
        investmentBudget: form.investmentBudget || undefined,
        notes: form.notes.trim() || undefined,
        schufaClean: form.schufaClean || undefined,
        source: form.source || undefined,
        sourceDetail: form.source === "sonstiges" ? (form.sourceDetail.trim() || undefined) : undefined,
      });
      setStep(4); // success
    } catch {
      setErrors({ submit: "Etwas ist schiefgelaufen. Bitte versuche es erneut." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const totalSteps = 4;
  const stepLabels = ["Beruf", "Finanzen", "Kontakt", "Fertig"];

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
            <span className="text-gold text-sm tracking-widest uppercase">
              Kostenlose Analyse
            </span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl text-gray-800 mb-4">
            Deine <span className="gold-text">Steuerersparnis</span> berechnen
          </h2>
          <p className="text-gray-500 text-lg">
            In nur 2 Minuten zu deiner persönlichen Strategie
          </p>
        </motion.div>

        {/* Progress Bar */}
        {step < 4 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-8">
            <div className="flex items-center justify-between mb-2">
              {[0, 1, 2, 3].map((s) => (
                <div key={s} className={`flex items-center ${s < 3 ? "flex-1" : ""}`}>
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-500 ${
                      step >= s
                        ? "border-gold bg-gold/20 text-gold"
                        : "border-gray-200 text-gray-300"
                    }`}
                  >
                    {step > s ? <Check size={20} /> : s + 1}
                  </div>
                  {s < 3 && (
                    <div
                      className={`h-0.5 flex-1 mx-2 transition-all duration-500 ${
                        step > s ? "bg-gold" : "bg-gray-200"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-between text-xs text-gray-400 px-2">
              {stepLabels.map((l) => (
                <span key={l}>{l}</span>
              ))}
            </div>
          </motion.div>
        )}

        {/* Form Card */}
        <motion.div layout className="glass-card p-8 md:p-12 relative overflow-hidden">
          <AnimatePresence mode="wait">
            {/* Step 0: Employment + Income */}
            {step === 0 && (
              <motion.div
                key="step0"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-2xl font-bold text-gray-800 mb-6">
                  Deine berufliche Situation
                </h3>

                <div className="mb-8">
                  <label className="block text-gray-600 mb-4">Beschäftigungsverhältnis *</label>
                  <div className="grid grid-cols-2 gap-3">
                    {employmentOptions.map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => update("employmentType", opt.value)}
                        className={`p-4 rounded-xl border-2 transition-all duration-300 flex flex-col items-center gap-2 ${
                          form.employmentType === opt.value
                            ? "border-gold bg-gold/10 text-gold"
                            : "border-gray-200 text-gray-500 hover:border-gray-300"
                        }`}
                      >
                        <opt.icon size={24} />
                        <span className="font-medium text-sm">{opt.label}</span>
                      </button>
                    ))}
                  </div>
                  {errors.employmentType && <p className="text-red-500 text-xs mt-2">{errors.employmentType}</p>}
                </div>

                {form.employmentType && form.employmentType !== "selbstständig" && (
                  <div className="mb-8">
                    <label className="block text-gray-600 mb-4">Angestellt seit</label>
                    <div className="space-y-2">
                      {employedSinceOptions.map((opt) => (
                        <OptionButton key={opt.value} selected={form.employedSince === opt.value} onClick={() => update("employedSince", opt.value)}>
                          {opt.label}
                        </OptionButton>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mb-8">
                  <label className="block text-gray-600 mb-4 flex items-center gap-2">
                    <Euro size={20} />
                    Bruttojahreseinkommen *
                  </label>
                  <div className="space-y-2">
                    {incomeRanges.map((range) => (
                      <OptionButton key={range.value} selected={form.grossIncome === range.value} onClick={() => update("grossIncome", range.value)}>
                        {range.label}
                      </OptionButton>
                    ))}
                  </div>
                  {errors.grossIncome && <p className="text-red-500 text-xs mt-2">{errors.grossIncome}</p>}
                </div>

                <button
                  onClick={next}
                  className="w-full py-4 rounded-full bg-gold text-white font-bold text-lg flex items-center justify-center gap-2 hover:shadow-[0_0_40px_rgba(59,125,110,0.3)] transition-all duration-300"
                >
                  Weiter
                  <ArrowRight size={20} />
                </button>
              </motion.div>
            )}

            {/* Step 1: SCHUFA + Equity + Budget */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-2xl font-bold text-gray-800 mb-6">
                  Finanzielle Situation
                </h3>

                <div className="mb-8">
                  <div className="flex items-center gap-2 mb-4">
                    <CheckCircle2 size={20} className="text-gold" />
                    <label className="text-gray-600">SCHUFA-Auskunft *</label>
                  </div>
                  <p className="text-xs text-gray-400 mb-3">Für eine Immobilienfinanzierung ist eine saubere SCHUFA Voraussetzung.</p>
                  <div className="space-y-2">
                    <OptionButton selected={form.schufaClean === "ja"} onClick={() => update("schufaClean", "ja")}>
                      Ja, meine SCHUFA ist sauber (keine negativen Einträge)
                    </OptionButton>
                    <OptionButton selected={form.schufaClean === "nein"} onClick={() => update("schufaClean", "nein")}>
                      Nein, ich habe negative SCHUFA-Einträge
                    </OptionButton>
                    <OptionButton selected={form.schufaClean === "unsicher"} onClick={() => update("schufaClean", "unsicher")}>
                      Bin mir nicht sicher
                    </OptionButton>
                  </div>
                  {errors.schufaClean && <p className="text-red-500 text-xs mt-2">{errors.schufaClean}</p>}
                  {form.schufaClean === "nein" && (
                    <div className="mt-3 bg-red-50 border border-red-200 rounded-xl p-4 text-sm text-red-700">
                      <strong>Hinweis:</strong> Mit negativen SCHUFA-Einträgen ist eine Immobilienfinanzierung leider in der Regel nicht möglich. Du kannst die Anfrage trotzdem absenden — wir schauen uns deinen Fall an.
                    </div>
                  )}
                </div>

                <div className="mb-8">
                  <div className="flex items-center gap-2 mb-4">
                    <PiggyBank size={20} className="text-gold" />
                    <label className="text-gray-600">Verfügbares Eigenkapital *</label>
                  </div>
                  <div className="space-y-2">
                    {equityRanges.map((opt) => (
                      <OptionButton key={opt.value} selected={form.equity === opt.value} onClick={() => update("equity", opt.value)}>
                        {opt.label}
                      </OptionButton>
                    ))}
                  </div>
                  {errors.equity && <p className="text-red-500 text-xs mt-2">{errors.equity}</p>}
                </div>

                <div className="mb-8">
                  <div className="flex items-center gap-2 mb-4">
                    <Building2 size={20} className="text-gold" />
                    <label className="text-gray-600">Gewünschter Investitionsrahmen</label>
                  </div>
                  <div className="space-y-2">
                    {investmentBudgets.map((opt) => (
                      <OptionButton key={opt.value} selected={form.investmentBudget === opt.value} onClick={() => update("investmentBudget", opt.value)}>
                        {opt.label}
                      </OptionButton>
                    ))}
                  </div>
                </div>

                <div className="mb-8">
                  <label className="block text-gray-600 mb-2 text-sm">Anmerkungen (optional)</label>
                  <textarea
                    value={form.notes}
                    onChange={(e) => update("notes", e.target.value)}
                    placeholder="z.B. besondere Wünsche oder Fragen"
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-800 placeholder:text-gray-300 focus:border-gold focus:outline-none transition-colors resize-none"
                  />
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={back}
                    className="px-6 py-4 rounded-full border border-gray-200 text-gray-600 hover:border-gold/30 hover:text-gold transition-all duration-300 flex items-center gap-2"
                  >
                    <ArrowLeft size={20} />
                    Zurück
                  </button>
                  <button
                    onClick={next}
                    className="flex-1 py-4 rounded-full bg-gold text-white font-bold text-lg flex items-center justify-center gap-2 hover:shadow-[0_0_40px_rgba(59,125,110,0.3)] transition-all duration-300"
                  >
                    Weiter
                    <ArrowRight size={20} />
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 2: Contact + Source */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-2xl font-bold text-gray-800 mb-6">
                  Deine Kontaktdaten
                </h3>

                <div className="space-y-4 mb-8">
                  <div>
                    <label className="block text-gray-600 mb-2 text-sm">Name *</label>
                    <div className="relative">
                      <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />
                      <input
                        type="text"
                        value={form.name}
                        onChange={(e) => update("name", e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 placeholder:text-gray-300 focus:border-gold focus:outline-none transition-colors"
                        placeholder="Vor- und Nachname"
                      />
                    </div>
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                  </div>

                  <div>
                    <label className="block text-gray-600 mb-2 text-sm">E-Mail</label>
                    <div className="relative">
                      <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />
                      <input
                        type="email"
                        value={form.email}
                        onChange={(e) => update("email", e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 placeholder:text-gray-300 focus:border-gold focus:outline-none transition-colors"
                        placeholder="deine@email.de"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-600 mb-2 text-sm">Telefon</label>
                    <div className="relative">
                      <Phone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={(e) => update("phone", e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 placeholder:text-gray-300 focus:border-gold focus:outline-none transition-colors"
                        placeholder="+49 170 1234567"
                      />
                    </div>
                  </div>

                  {errors.contact && <p className="text-red-500 text-xs">{errors.contact}</p>}
                  <p className="text-gray-400 text-xs">* E-Mail oder Telefon — mindestens eins davon.</p>
                </div>

                <div className="mb-8">
                  <label className="block text-gray-600 mb-4 text-sm">Wie bist du auf uns aufmerksam geworden?</label>
                  <div className="space-y-2">
                    {sourceOptions.map((opt) => (
                      <OptionButton key={opt.value} selected={form.source === opt.value} onClick={() => update("source", opt.value)}>
                        {opt.label}
                      </OptionButton>
                    ))}
                  </div>
                  {form.source === "sonstiges" && (
                    <input
                      type="text"
                      value={form.sourceDetail}
                      onChange={(e) => update("sourceDetail", e.target.value)}
                      placeholder="Woher genau?"
                      className="w-full mt-2 px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-800 placeholder:text-gray-300 focus:border-gold focus:outline-none transition-colors"
                    />
                  )}
                </div>

                {/* Summary */}
                <div className="mb-8 p-5 rounded-xl bg-gray-50 border border-gray-100">
                  <h4 className="text-sm font-semibold text-gray-700 mb-3">Zusammenfassung</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Beschäftigung</span>
                      <span className="text-gray-700 font-medium">{employmentOptions.find((e) => e.value === form.employmentType)?.label}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Einkommen</span>
                      <span className="text-gray-700 font-medium">{incomeRanges.find((e) => e.value === form.grossIncome)?.label}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">SCHUFA</span>
                      <span className="text-gray-700 font-medium">{form.schufaClean === "ja" ? "Sauber" : form.schufaClean === "nein" ? "Negative Einträge" : "Unsicher"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Eigenkapital</span>
                      <span className="text-gray-700 font-medium">{equityRanges.find((e) => e.value === form.equity)?.label}</span>
                    </div>
                    {form.investmentBudget && (
                      <div className="flex justify-between">
                        <span className="text-gray-400">Budget</span>
                        <span className="text-gray-700 font-medium">{investmentBudgets.find((e) => e.value === form.investmentBudget)?.label}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="mb-6 text-xs text-gray-400 leading-relaxed">
                  Mit dem Absenden erklärst du dich damit einverstanden, dass wir deine Angaben zur Kontaktaufnahme und Ersteinschätzung nutzen. Deine Daten werden vertraulich behandelt und nicht an Dritte weitergegeben.
                </div>

                {errors.submit && <p className="text-red-500 text-sm mb-4">{errors.submit}</p>}

                <div className="flex gap-4">
                  <button
                    onClick={back}
                    className="px-6 py-4 rounded-full border border-gray-200 text-gray-600 hover:border-gold/30 hover:text-gold transition-all duration-300 flex items-center gap-2"
                  >
                    <ArrowLeft size={20} />
                    Zurück
                  </button>
                  <button
                    onClick={submit}
                    disabled={isSubmitting}
                    className={`flex-1 py-4 rounded-full font-bold text-lg flex items-center justify-center gap-2 transition-all duration-300 ${
                      !isSubmitting
                        ? "bg-gold text-white hover:shadow-[0_0_40px_rgba(59,125,110,0.3)]"
                        : "bg-gray-100 text-gray-300 cursor-not-allowed"
                    }`}
                  >
                    {isSubmitting ? "Wird gesendet..." : "Analyse anfordern"}
                    <ArrowRight size={20} />
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 4: Success */}
            {step === 4 && (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center py-12"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 15 }}
                  className="w-24 h-24 mx-auto mb-8 rounded-full bg-gold/20 border-2 border-gold flex items-center justify-center"
                >
                  <Check size={48} className="text-gold" />
                </motion.div>

                {/* Confetti */}
                {[...Array(20)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                    animate={{
                      opacity: 0,
                      x: (Math.random() - 0.5) * 400,
                      y: Math.random() * -300,
                      scale: 0,
                    }}
                    transition={{ duration: 1.5, delay: i * 0.05, ease: "easeOut" }}
                    className="absolute top-1/2 left-1/2 w-2 h-2 rounded-full"
                    style={{ backgroundColor: i % 2 === 0 ? "#3b7d6e" : "rgba(59, 125, 110, 0.3)" }}
                  />
                ))}

                <motion.h3
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-3xl font-bold text-gray-800 mb-4"
                >
                  Vielen Dank{form.name ? `, ${form.name.split(" ")[0]}` : ""}!
                </motion.h3>

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="text-gray-600 text-lg mb-8"
                >
                  Wir melden uns innerhalb von <span className="text-gold font-bold">24 Stunden</span> bei
                  dir mit deiner persönlichen Steuerersparnis-Analyse.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="flex items-center justify-center gap-2 text-gray-400 text-sm"
                >
                  <Shield size={16} />
                  <span>Deine Daten werden vertraulich behandelt</span>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Trust Indicators */}
        {step < 4 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap items-center justify-center gap-6 mt-8 text-gray-400 text-sm"
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
