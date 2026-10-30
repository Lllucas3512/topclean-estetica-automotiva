import type { Metadata } from "next";
import "./globals.css";

const title = "TopClean | Estética Automotiva em Tatuí";

const description =
  "Estética automotiva em Tatuí para carros e motos. Lavagens, higienização e cuidados com seu veículo. Agende seu atendimento pelo WhatsApp.";

const siteUrl = "https://topclean-estetica-automotiva.chatgpt.site";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title,
  description,

  applicationName: "TopClean Estética Automotiva",

  alternates: {
    canonical: "/",
  },

  openGraph: {
    title,
    description,
    type: "website",
    locale: "pt_BR",
    images: [
      {
        url: "/og.webp",
        width: 1672,
        height: 941,
        alt: "TopClean Estética Automotiva em Tatuí",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og.webp"],
  },

  icons: {
    icon: "/topclean-icon.png",
    shortcut: "/topclean-icon.png",
    apple: "/topclean-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "AutomotiveBusiness",
    name: "TopClean Estética Automotiva",
    description,
    areaServed: {
      "@type": "City",
      name: "Tatuí",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Tatuí",
      addressRegion: "SP",
      addressCountry: "BR",
    },
    telephone: "+55 15 99775-7798",
    sameAs: ["https://www.instagram.com/topclean.auto"],
    url: siteUrl,
  };

  return (
    <html lang="pt-BR">
      <head>
        <link
          rel="icon"
          type="image/png"
          href="/topclean-icon.png"
        />
        <link
          rel="shortcut icon"
          type="image/png"
          href="/topclean-icon.png"
        />
        <link
          rel="apple-touch-icon"
          href="/topclean-icon.png"
        />
      </head>

      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema),
          }}
        />

        {children}
      </body>
    </html>
  );
}