import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Impressum - Immo statt Steuern",
  description: "Impressum von Immo statt Steuern",
};

export default function ImpressumPage() {
  return (
    <div className="min-h-screen bg-[#faf9f6]">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="font-display text-lg">
            <span className="gold-text">IMMO</span>
            <span className="text-gray-400 mx-1">statt</span>
            <span className="text-gray-600">STEUERN</span>
          </Link>
          <Link href="/" className="flex items-center gap-2 text-sm text-gray-400 hover:text-gold transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Zurück
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-3xl mx-auto px-6 py-12">
        <h1 className="font-display text-3xl text-gray-800 mb-8">Impressum</h1>

        <div className="prose prose-gray max-w-none [&_h2]:font-display [&_h2]:text-xl [&_h2]:text-gray-700 [&_h2]:mt-8 [&_h2]:mb-3 [&_p]:text-gray-500 [&_p]:leading-relaxed [&_ul]:text-gray-500 [&_li]:text-gray-500">
          <h2>Angaben gemäss § 5 TMG</h2>
          <p>
            Alexander Schäfer<br />
            Talackerstrasse<br />
            8500 Frauenfeld<br />
            Schweiz
          </p>

          <h2>Kontakt</h2>
          <p>
            E-Mail: info@swissflow.online
          </p>

          <h2>Verantwortlich für den Inhalt</h2>
          <p>
            Alexander Schäfer<br />
            Talackerstrasse<br />
            8500 Frauenfeld
          </p>

          <h2>Haftungsausschluss</h2>
          <p>
            Der Betreiber übernimmt keine Gewähr für die Richtigkeit, Genauigkeit, Aktualität,
            Zuverlässigkeit und Vollständigkeit der Informationen auf dieser Website.
          </p>
          <p>
            Haftungsansprüche gegen den Betreiber wegen Schäden materieller oder immaterieller Art,
            die aus dem Zugriff oder der Nutzung bzw. Nichtnutzung der veröffentlichten
            Informationen entstanden sind, werden ausgeschlossen.
          </p>

          <h2>Hinweis zu Rechenbeispielen</h2>
          <p>
            Die auf dieser Website dargestellten Berechnungen, Steuerersparnisse und Beispiele
            dienen ausschliesslich der Veranschaulichung. Sie stellen <strong>keine Steuerberatung</strong> dar
            und ersetzen nicht die individuelle Beratung durch einen Steuerberater oder
            Finanzberater.
          </p>
          <p>
            Die tatsächliche Steuerersparnis hängt von zahlreichen individuellen Faktoren ab,
            darunter:
          </p>
          <ul>
            <li>Persönlicher Steuersatz und Steuerklasse</li>
            <li>Art und Zustand der Immobilie (Neubau, Altbau, Denkmal)</li>
            <li>Standort und Mietmarkt</li>
            <li>Finanzierungskonditionen</li>
            <li>Familiäre und berufliche Situation</li>
          </ul>
          <h2>Haftung für Links</h2>
          <p>
            Verweise und Links auf Websites Dritter liegen ausserhalb unseres Verantwortungsbereichs.
            Jegliche Verantwortung für solche Websites wird abgelehnt. Der Zugriff und die Nutzung
            solcher Websites erfolgen auf eigene Gefahr des jeweiligen Nutzers.
          </p>

          <h2>Urheberrechte</h2>
          <p>
            Die Urheber- und alle anderen Rechte an Inhalten, Bildern, Fotos oder anderen Dateien
            auf dieser Website gehören ausschliesslich dem Betreiber oder den speziell genannten
            Rechteinhabern. Für die Reproduktion jeglicher Elemente ist die schriftliche Zustimmung
            des Urheberrechtsträgers im Voraus einzuholen.
          </p>
          <p>
            Einige Bilder auf dieser Website wurden mit KI-Bildgeneratoren erstellt und stellen
            keine realen Personen, Gebäude oder Orte dar.
          </p>

          <p className="text-gray-400 text-sm">Stand: Februar 2026</p>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-8 mt-12">
        <div className="max-w-3xl mx-auto px-6 text-center text-sm text-gray-400">
          <div className="flex justify-center gap-6 mb-4">
            <Link href="/datenschutz" className="hover:text-gold transition-colors">Datenschutz</Link>
            <Link href="/impressum" className="hover:text-gold transition-colors">Impressum</Link>
          </div>
          <p>© {new Date().getFullYear()} Alle Rechte vorbehalten</p>
        </div>
      </footer>
    </div>
  );
}
