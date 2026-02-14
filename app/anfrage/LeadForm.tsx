"use client";

import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { ChevronLeft, ChevronRight, Send, CheckCircle2, User, Mail, Phone, Briefcase, PiggyBank, Building2 } from "lucide-react";

type FormData = {
  name: string;
  email: string;
  phone: string;
  employmentType: string;
  employedSince: string;
  grossIncome: string;
  equity: string;
  investmentBudget: string;
  notes: string;
  schufaClean: string;
};

const EMPLOYMENT_TYPES = [
  { value: "angestellt_unbefristet", label: "Angestellt (unbefristet)" },
  { value: "angestellt_befristet", label: "Angestellt (befristet)" },
  { value: "verbeamtet", label: "Verbeamtet" },
  { value: "selbstständig", label: "Selbstständig" },
];

const INCOME_RANGES = [
  { value: "40-60k", label: "40.000 – 60.000 €" },
  { value: "60-80k", label: "60.000 – 80.000 €" },
  { value: "80-100k", label: "80.000 – 100.000 €" },
  { value: "100k+", label: "Über 100.000 €" },
];

const EQUITY_RANGES = [
  { value: "0€", label: "Kein Eigenkapital" },
  { value: "unter 10k", label: "Unter 10.000 €" },
  { value: "10-30k", label: "10.000 – 30.000 €" },
  { value: "30-50k", label: "30.000 – 50.000 €" },
  { value: "50k+", label: "Über 50.000 €" },
];

const EMPLOYED_SINCE = [
  { value: "unter 6 Monate", label: "Unter 6 Monate" },
  { value: "6-12 Monate", label: "6 – 12 Monate" },
  { value: "1-2 Jahre", label: "1 – 2 Jahre" },
  { value: "über 2 Jahre", label: "Über 2 Jahre" },
];

const INVESTMENT_BUDGETS = [
  { value: "100-150k", label: "100.000 – 150.000 €" },
  { value: "150-200k", label: "150.000 – 200.000 €" },
  { value: "200-300k", label: "200.000 – 300.000 €" },
  { value: "300k+", label: "Über 300.000 €" },
  { value: "unsicher", label: "Bin mir noch unsicher" },
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
      className={`w-full text-left px-4 py-3 rounded-xl border transition-all duration-200 text-sm sm:text-base ${
        selected
          ? "border-gold bg-gold/10 text-gold-dark font-medium shadow-sm"
          : "border-navy-300 bg-white/60 text-foreground hover:border-gold-200 hover:bg-gold-50/50"
      }`}
    >
      {children}
    </button>
  );
}

function StepIndicator({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex items-center justify-center gap-2 mb-8">
      {Array.from({ length: total }, (_, i) => (
        <div
          key={i}
          className={`h-1.5 rounded-full transition-all duration-300 ${
            i <= current ? "bg-gold w-8" : "bg-navy-300 w-4"
          }`}
        />
      ))}
    </div>
  );
}

export default function LeadForm() {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const createLead = useMutation(api.leads.createLead);

  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
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
    setErrors((e) => ({ ...e, [field]: "" }));
  };

  const validateStep = (s: number): boolean => {
    const newErrors: Record<string, string> = {};
    if (s === 0) {
      if (!form.name.trim()) newErrors.name = "Bitte gib deinen Namen ein.";
      if (!form.email.trim() && !form.phone.trim())
        newErrors.contact = "Bitte gib eine E-Mail oder Telefonnummer an.";
    }
    if (s === 1) {
      if (!form.employmentType) newErrors.employmentType = "Bitte wähle dein Beschäftigungsverhältnis.";
      if (!form.grossIncome) newErrors.grossIncome = "Bitte wähle dein Bruttoeinkommen.";
    }
    if (s === 2) {
      if (!form.schufaClean) newErrors.schufaClean = "Bitte beantworte die SCHUFA-Frage.";
      if (!form.equity) newErrors.equity = "Bitte wähle dein verfügbares Eigenkapital.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const next = () => {
    if (validateStep(step)) setStep((s) => s + 1);
  };
  const back = () => setStep((s) => s - 1);

  const submit = async () => {
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
      });
      setSubmitted(true);
    } catch {
      setErrors({ submit: "Etwas ist schiefgelaufen. Bitte versuche es erneut." });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-12">
        <div className="glass-card p-8 sm:p-12 max-w-md w-full text-center">
          <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-8 h-8 text-gold" />
          </div>
          <h1 className="font-display text-2xl sm:text-3xl text-foreground mb-4">
            Vielen Dank!
          </h1>
          <p className="text-foreground/70 leading-relaxed">
            Deine Anfrage ist bei uns eingegangen. Wir melden uns innerhalb von 24 Stunden bei dir — per E-Mail oder Telefon.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg">
        <div className="text-center mb-8">
          <h1 className="font-display text-2xl sm:text-3xl text-foreground mb-2">
            Kostenlose Ersteinschätzung
          </h1>
          <p className="text-foreground/60 text-sm sm:text-base">
            In 2 Minuten ausgefüllt — unverbindlich und diskret.
          </p>
        </div>

        <div className="glass-card p-6 sm:p-8">
          <StepIndicator current={step} total={4} />

          {/* Step 0: Contact */}
          {step === 0 && (
            <div className="space-y-5">
              <div className="flex items-center gap-2 mb-1">
                <User className="w-4 h-4 text-gold" />
                <span className="text-sm font-medium text-foreground/80">Kontaktdaten</span>
              </div>

              <div>
                <label className="block text-sm text-foreground/70 mb-1.5">Name *</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => update("name", e.target.value)}
                  placeholder="Vor- und Nachname"
                  className="w-full px-4 py-3 rounded-xl border border-navy-300 bg-white/60 text-foreground placeholder:text-foreground/30 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/30 transition-all text-sm sm:text-base"
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-sm text-foreground/70 mb-1.5">
                  <Mail className="w-3.5 h-3.5 inline mr-1 -mt-0.5" />
                  E-Mail
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  placeholder="deine@email.de"
                  className="w-full px-4 py-3 rounded-xl border border-navy-300 bg-white/60 text-foreground placeholder:text-foreground/30 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/30 transition-all text-sm sm:text-base"
                />
              </div>

              <div>
                <label className="block text-sm text-foreground/70 mb-1.5">
                  <Phone className="w-3.5 h-3.5 inline mr-1 -mt-0.5" />
                  Telefon
                </label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => update("phone", e.target.value)}
                  placeholder="+49 170 1234567"
                  className="w-full px-4 py-3 rounded-xl border border-navy-300 bg-white/60 text-foreground placeholder:text-foreground/30 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/30 transition-all text-sm sm:text-base"
                />
              </div>

              {errors.contact && <p className="text-red-500 text-xs">{errors.contact}</p>}
              <p className="text-foreground/40 text-xs">* E-Mail oder Telefon — mindestens eins davon.</p>
            </div>
          )}

          {/* Step 1: Employment + Income */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Briefcase className="w-4 h-4 text-gold" />
                  <span className="text-sm font-medium text-foreground/80">Beschäftigungsverhältnis *</span>
                </div>
                <div className="space-y-2">
                  {EMPLOYMENT_TYPES.map((opt) => (
                    <OptionButton key={opt.value} selected={form.employmentType === opt.value} onClick={() => update("employmentType", opt.value)}>
                      {opt.label}
                    </OptionButton>
                  ))}
                </div>
                {errors.employmentType && <p className="text-red-500 text-xs mt-1">{errors.employmentType}</p>}
              </div>

              {form.employmentType && form.employmentType !== "selbstständig" && (
                <div>
                  <span className="text-sm font-medium text-foreground/80 mb-3 block">Angestellt seit</span>
                  <div className="space-y-2">
                    {EMPLOYED_SINCE.map((opt) => (
                      <OptionButton key={opt.value} selected={form.employedSince === opt.value} onClick={() => update("employedSince", opt.value)}>
                        {opt.label}
                      </OptionButton>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <span className="text-sm font-medium text-foreground/80 mb-3 block">Bruttojahreseinkommen *</span>
                <div className="space-y-2">
                  {INCOME_RANGES.map((opt) => (
                    <OptionButton key={opt.value} selected={form.grossIncome === opt.value} onClick={() => update("grossIncome", opt.value)}>
                      {opt.label}
                    </OptionButton>
                  ))}
                </div>
                {errors.grossIncome && <p className="text-red-500 text-xs mt-1">{errors.grossIncome}</p>}
              </div>
            </div>
          )}

          {/* Step 2: Equity + Budget */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle2 className="w-4 h-4 text-gold" />
                  <span className="text-sm font-medium text-foreground/80">SCHUFA-Auskunft *</span>
                </div>
                <p className="text-xs text-foreground/50 mb-3">Für eine Immobilienfinanzierung ist eine saubere SCHUFA Voraussetzung.</p>
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
                {errors.schufaClean && <p className="text-red-500 text-xs mt-1">{errors.schufaClean}</p>}
                {form.schufaClean === "nein" && (
                  <div className="mt-3 bg-red-50 border border-red-200 rounded-xl p-4 text-sm text-red-700">
                    <strong>Hinweis:</strong> Mit negativen SCHUFA-Einträgen ist eine Immobilienfinanzierung leider in der Regel nicht möglich. Du kannst die Anfrage trotzdem absenden — wir schauen uns deinen Fall an.
                  </div>
                )}
              </div>

              <div>
                <div className="flex items-center gap-2 mb-3">
                  <PiggyBank className="w-4 h-4 text-gold" />
                  <span className="text-sm font-medium text-foreground/80">Verfügbares Eigenkapital *</span>
                </div>
                <div className="space-y-2">
                  {EQUITY_RANGES.map((opt) => (
                    <OptionButton key={opt.value} selected={form.equity === opt.value} onClick={() => update("equity", opt.value)}>
                      {opt.label}
                    </OptionButton>
                  ))}
                </div>
                {errors.equity && <p className="text-red-500 text-xs mt-1">{errors.equity}</p>}
              </div>

              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Building2 className="w-4 h-4 text-gold" />
                  <span className="text-sm font-medium text-foreground/80">Gewünschter Investitionsrahmen</span>
                </div>
                <div className="space-y-2">
                  {INVESTMENT_BUDGETS.map((opt) => (
                    <OptionButton key={opt.value} selected={form.investmentBudget === opt.value} onClick={() => update("investmentBudget", opt.value)}>
                      {opt.label}
                    </OptionButton>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm text-foreground/70 mb-1.5">Anmerkungen (optional)</label>
                <textarea
                  value={form.notes}
                  onChange={(e) => update("notes", e.target.value)}
                  placeholder="z.B. besondere Wünsche oder Fragen"
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl border border-navy-300 bg-white/60 text-foreground placeholder:text-foreground/30 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/30 transition-all text-sm sm:text-base resize-none"
                />
              </div>
            </div>
          )}

          {/* Step 3: Confirmation */}
          {step === 3 && (
            <div className="space-y-5">
              <h2 className="font-display text-lg text-foreground mb-2">Zusammenfassung</h2>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between py-2 border-b border-navy-200">
                  <span className="text-foreground/60">Name</span>
                  <span className="font-medium">{form.name}</span>
                </div>
                {form.email && (
                  <div className="flex justify-between py-2 border-b border-navy-200">
                    <span className="text-foreground/60">E-Mail</span>
                    <span className="font-medium">{form.email}</span>
                  </div>
                )}
                {form.phone && (
                  <div className="flex justify-between py-2 border-b border-navy-200">
                    <span className="text-foreground/60">Telefon</span>
                    <span className="font-medium">{form.phone}</span>
                  </div>
                )}
                <div className="flex justify-between py-2 border-b border-navy-200">
                  <span className="text-foreground/60">Beschäftigung</span>
                  <span className="font-medium">{EMPLOYMENT_TYPES.find((e) => e.value === form.employmentType)?.label}</span>
                </div>
                {form.employedSince && (
                  <div className="flex justify-between py-2 border-b border-navy-200">
                    <span className="text-foreground/60">Angestellt seit</span>
                    <span className="font-medium">{form.employedSince}</span>
                  </div>
                )}
                <div className="flex justify-between py-2 border-b border-navy-200">
                  <span className="text-foreground/60">Bruttoeinkommen</span>
                  <span className="font-medium">{INCOME_RANGES.find((e) => e.value === form.grossIncome)?.label}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-navy-200">
                  <span className="text-foreground/60">SCHUFA</span>
                  <span className="font-medium">{form.schufaClean === "ja" ? "Sauber" : form.schufaClean === "nein" ? "Negative Einträge" : "Unsicher"}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-navy-200">
                  <span className="text-foreground/60">Eigenkapital</span>
                  <span className="font-medium">{EQUITY_RANGES.find((e) => e.value === form.equity)?.label}</span>
                </div>
                {form.investmentBudget && (
                  <div className="flex justify-between py-2 border-b border-navy-200">
                    <span className="text-foreground/60">Investitionsrahmen</span>
                    <span className="font-medium">{INVESTMENT_BUDGETS.find((e) => e.value === form.investmentBudget)?.label}</span>
                  </div>
                )}
                {form.notes && (
                  <div className="py-2 border-b border-navy-200">
                    <span className="text-foreground/60 block mb-1">Anmerkungen</span>
                    <span className="font-medium">{form.notes}</span>
                  </div>
                )}
              </div>

              <div className="bg-navy-50 rounded-xl p-4 text-xs text-foreground/50 leading-relaxed">
                Mit dem Absenden erklärst du dich damit einverstanden, dass wir deine Angaben zur Kontaktaufnahme und Ersteinschätzung nutzen. Deine Daten werden vertraulich behandelt und nicht an Dritte weitergegeben, es sei denn, du stimmst dem ausdrücklich zu.
              </div>

              {errors.submit && <p className="text-red-500 text-sm">{errors.submit}</p>}
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between mt-8">
            {step > 0 ? (
              <button type="button" onClick={back} className="flex items-center gap-1 text-sm text-foreground/60 hover:text-foreground transition-colors">
                <ChevronLeft className="w-4 h-4" />
                Zurück
              </button>
            ) : (
              <div />
            )}

            {step < 3 ? (
              <button type="button" onClick={next} className="flex items-center gap-1 px-6 py-2.5 bg-gold text-white rounded-xl text-sm font-medium hover:bg-gold-dark transition-colors shadow-sm">
                Weiter
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={submit}
                disabled={isSubmitting}
                className="flex items-center gap-2 px-6 py-2.5 bg-gold text-white rounded-xl text-sm font-medium hover:bg-gold-dark transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Wird gesendet…
                  </>
                ) : (
                  <>
                    Absenden
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            )}
          </div>
        </div>

        <p className="text-center text-foreground/30 text-xs mt-6">
          100% vertraulich · Keine Weitergabe an Dritte · Antwort innerhalb von 24h
        </p>
      </div>
    </div>
  );
}
