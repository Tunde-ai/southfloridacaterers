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
    process.env.NEXT_PUBLIC_SITE_URL || "https://sflcaterers.com"
  ),
  title: "South Florida Caterers | Southern Comfort Catering in Miami",
  description:
    "Southern comfort food with a flavor twist. Over 30 years of kitchen experience serving South Florida since 2013. Weddings, corporate events, private gatherings, and more.",
  keywords: [
    "catering",
    "South Florida",
    "Miami",
    "Broward",
    "Miami Gardens",
    "wedding catering",
    "corporate catering",
    "southern comfort food",
    "event catering",
    "soul food catering",
  ],
  openGraph: {
    title: "South Florida Caterers | Southern Comfort Catering in Miami",
    description:
      "Southern comfort food with a flavor twist. Over 30 years of kitchen experience serving South Florida since 2013.",
    type: "website",
    locale: "en_US",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FoodEstablishment",
  name: "South Florida Caterers",
  description:
    "Southern comfort food catering with a flavor twist. Over 30 years of kitchen experience serving South Florida since 2013.",
  url: "https://sflcaterers.com",
  telephone: "+1-786-698-3455",
  email: "southfloridacaterers@gmail.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Miami Gardens",
    addressRegion: "FL",
    postalCode: "33169",
    addressCountry: "US",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 25.9412,
    longitude: -80.2456,
  },
  areaServed: [
    { "@type": "AdministrativeArea", name: "Miami-Dade County" },
    { "@type": "AdministrativeArea", name: "Broward County" },
  ],
  servesCuisine: ["Southern", "American", "Soul Food"],
  priceRange: "$$",
  foundingDate: "2013",
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "19:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Saturday",
      opens: "10:00",
      closes: "18:00",
    },
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Catering Services",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Pickup Catering" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Drop-Off Delivery Catering" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Full-Service Event Catering" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Full Event + DJ Package" } },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${dmSans.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-body antialiased">{children}</body>
    </html>
  );
}
