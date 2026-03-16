import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://southfloridacaterers.com"
  ),
  title: "South Florida Caterers | Le Cordon Bleu Trained Catering",
  description:
    "Elevating every occasion with culinary excellence. Le Cordon Bleu trained chef serving South Florida since 2013. Weddings, corporate events, private gatherings.",
  keywords: [
    "catering",
    "South Florida",
    "Miami",
    "Broward",
    "wedding catering",
    "corporate catering",
    "Le Cordon Bleu",
    "Caribbean cuisine",
    "event catering",
  ],
  openGraph: {
    title: "South Florida Caterers | Le Cordon Bleu Trained Catering",
    description:
      "Elevating every occasion with culinary excellence. Le Cordon Bleu trained chef serving South Florida since 2013.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${dmSans.variable}`}>
      <body className="font-body antialiased">{children}</body>
    </html>
  );
}
