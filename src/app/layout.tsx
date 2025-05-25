import type { Metadata } from "next";
import { Inter, Playfair_Display, Dancing_Script } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

const dancing = Dancing_Script({
  subsets: ["latin"],
  variable: "--font-dancing",
});

export const metadata: Metadata = {
  title: "Nuestra Boda - Alexandra y Fabian",
  description: "Te invitamos a celebrar nuestro día especial. Confirma tu asistencia y obtén toda la información sobre nuestra boda.",
  keywords: ["boda", "invitación", "matrimonio", "celebración"],
  authors: [{ name: "Página de Boda Elegante" }],
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${inter.variable} ${playfair.variable} ${dancing.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#284730" />
      </head>
      <body className={`${inter.className} antialiased bg-white text-wedding-green`}>
        {children}
      </body>
    </html>
  );
}
