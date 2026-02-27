import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Datenschutz - Immo statt Steuern",
  description: "Datenschutzerklärung von Immo statt Steuern",
};

export default function DatenschutzPage() {
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
        <h1 className="font-display text-3xl text-gray-800 mb-8">Datenschutzerklärung</h1>

        <div className="prose prose-gray max-w-none [&_h2]:font-display [&_h2]:text-xl [&_h2]:text-gray-700 [&_h2]:mt-8 [&_h2]:mb-3 [&_p]:text-gray-500 [&_p]:leading-relaxed [&_ul]:text-gray-500 [&_li]:text-gray-500 [&_a]:text-gold [&_a:hover]:underline">
          <h2>1. Verantwortliche Stelle</h2>
          <p>
            Alexander Schäfer<br />
            Talackerstrasse<br />
            8500 Frauenfeld<br />
            Schweiz<br />
            E-Mail: info@swissflow.online
          </p>

          <h2>2. Allgemeines</h2>
          <p>
            Wir nehmen den Schutz Ihrer persönlichen Daten sehr ernst und behandeln Ihre
            personenbezogenen Daten vertraulich und entsprechend der gesetzlichen
            Datenschutzvorschriften (Schweizer Datenschutzgesetz DSG, EU-DSGVO) sowie dieser
            Datenschutzerklärung.
          </p>
          <p>
            Die Nutzung unserer Website ist grundsätzlich ohne Angabe personenbezogener Daten
            möglich. Soweit auf unseren Seiten personenbezogene Daten erhoben werden, erfolgt
            dies stets auf freiwilliger Basis.
          </p>

          <h2>3. Hosting</h2>
          <p>
            Diese Website wird auf <strong>Vercel Inc.</strong> (340 S Lemon Ave #4133,
            Walnut, CA 91789, USA) gehostet. Beim Aufruf unserer Website werden automatisch
            Informationen (Server-Logfiles) erfasst:
          </p>
          <ul>
            <li>IP-Adresse des anfragenden Rechners</li>
            <li>Datum und Uhrzeit des Zugriffs</li>
            <li>Name und URL der abgerufenen Datei</li>
            <li>Übertragene Datenmenge</li>
            <li>Referrer-URL (zuvor besuchte Seite)</li>
            <li>Verwendeter Browser und Betriebssystem</li>
          </ul>
          <p>
            Diese Daten werden für den technischen Betrieb der Website benötigt und nach
            kurzer Zeit automatisch gelöscht. Weitere Informationen finden Sie in der{" "}
            <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer">
              Datenschutzerklärung von Vercel
            </a>.
          </p>

          <h2>4. Kontaktformular / Lead-Formular</h2>
          <p>
            Wenn Sie unser Kontaktformular nutzen, werden folgende Daten erhoben:
          </p>
          <ul>
            <li>Name</li>
            <li>E-Mail-Adresse</li>
            <li>Telefonnummer (optional)</li>
            <li>Angaben zu Einkommen und beruflicher Situation</li>
          </ul>
          <p>
            Diese Daten werden ausschliesslich zur Bearbeitung Ihrer Anfrage und zur
            Kontaktaufnahme verwendet. Die Daten werden in einer Datenbank (<strong>Convex</strong>)
            gespeichert und nicht an Dritte weitergegeben, es sei denn, dies ist zur
            Vertragserfüllung erforderlich oder Sie haben ausdrücklich eingewilligt.
          </p>
          <p>
            <strong>Rechtsgrundlage:</strong> Die Verarbeitung erfolgt auf Grundlage Ihrer
            Einwilligung (Art. 6 Abs. 1 lit. a DSGVO) bzw. zur Durchführung vorvertraglicher
            Massnahmen (Art. 6 Abs. 1 lit. b DSGVO).
          </p>

          <h2>5. Datenbank (Convex)</h2>
          <p>
            Für die Speicherung von Anfragen nutzen wir <strong>Convex</strong> (Convex Inc., USA).
            Es werden nur die im Kontaktformular angegebenen Daten gespeichert. Convex
            verarbeitet Daten auf Servern in den USA. Weitere Informationen:{" "}
            <a href="https://www.convex.dev/legal/privacy" target="_blank" rel="noopener noreferrer">
              Convex Datenschutzerklärung
            </a>.
          </p>

          <h2>6. Cookies</h2>
          <p>
            Diese Website verwendet <strong>keine Marketing- oder Tracking-Cookies</strong>.
            Es werden ausschliesslich technisch notwendige Cookies eingesetzt, die für den
            Betrieb der Website erforderlich sind.
          </p>

          <h2>7. SSL/TLS-Verschlüsselung</h2>
          <p>
            Diese Website nutzt aus Sicherheitsgründen SSL/TLS-Verschlüsselung für die
            Übertragung von Daten. Eine verschlüsselte Verbindung erkennen Sie daran,
            dass die Adresszeile des Browsers von &quot;http://&quot; auf &quot;https://&quot; wechselt
            und am Schloss-Symbol in Ihrer Browserzeile.
          </p>

          <h2>8. Ihre Rechte</h2>
          <p>Sie haben gemäss DSG und DSGVO das Recht auf:</p>
          <ul>
            <li><strong>Auskunft</strong> über Ihre bei uns gespeicherten Daten</li>
            <li><strong>Berichtigung</strong> unrichtiger Daten</li>
            <li><strong>Löschung</strong> Ihrer Daten</li>
            <li><strong>Einschränkung</strong> der Datenverarbeitung</li>
            <li><strong>Datenübertragbarkeit</strong></li>
            <li><strong>Widerspruch</strong> gegen die Verarbeitung</li>
            <li><strong>Widerruf</strong> einer erteilten Einwilligung (ohne Auswirkung auf die
              Rechtmässigkeit der bis zum Widerruf erfolgten Verarbeitung)</li>
          </ul>
          <p>
            Zur Ausübung Ihrer Rechte wenden Sie sich bitte an: info@swissflow.online
          </p>

          <h2>9. Datenlöschung</h2>
          <p>
            Sie können jederzeit die Löschung Ihrer bei uns gespeicherten Daten verlangen.
            Kontaktieren Sie uns unter info@swissflow.online. Wir löschen Ihre Daten
            unverzüglich, sofern dem keine gesetzlichen Aufbewahrungspflichten entgegenstehen.
          </p>

          <h2>10. Drittanbieter und Datenübermittlung in Drittländer</h2>
          <p>
            Einige der von uns genutzten Dienste (Vercel, Convex) haben ihren Sitz in den USA.
            Die Datenübermittlung in die USA erfolgt auf Grundlage des EU-US Data Privacy
            Framework bzw. Standardvertragsklauseln der EU-Kommission.
          </p>

          <h2>11. Änderungen</h2>
          <p>
            Wir behalten uns vor, diese Datenschutzerklärung bei Bedarf anzupassen.
            Die aktuelle Version ist stets auf unserer Website verfügbar.
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
