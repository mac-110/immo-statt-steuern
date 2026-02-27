import type { Metadata } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import ConvexClientProvider from "@/components/ConvexClientProvider";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Immo statt Steuern — Vermögen aufbauen statt Steuern zahlen",
  description:
    "Reduziere deine Steuerlast durch intelligente Immobilieninvestments. 100% legal, bankgeprüft — mit realistischen Rechenbeispielen.",
  openGraph: {
    title: "Immo statt Steuern",
    description: "Zahlst du noch Steuern? Oder baust du bereits Vermögen auf?",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de" className={`${playfair.variable} ${jakarta.variable}`}>
      <body className="font-body antialiased">
        <div className="grain-overlay" />
        <ConvexClientProvider>{children}</ConvexClientProvider>
      </body>
    </html>
  );
}
