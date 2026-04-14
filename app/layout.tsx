import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navigation from '@/components/Navigation' // Importar navegación
import FloatingCTA from '@/components/FloatingCTA' // Importación correcta

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Actualizamos los metadatos para tu estudio
export const metadata: Metadata = {
  // El título que aparece en la pestaña del navegador y en Google
  title: {
    default: "Athena Studio | Fine Line & Dark Art Tattoo Puebla",
    template: "%s | Athena Studio"
  },
  description: "Estudio de tatuaje profesional en Puebla. Especialistas en Fine Line, Microrealismo y Dark Art. Arte exclusivo y citas personalizadas.",
  keywords: [
    "Tatuajes Puebla", 
    "Fine Line Puebla", 
    "Tatuaje minimalista Puebla", 
    "Athena Studio Tattoo", 
    "Estudio de tatuajes Puebla Centro",
    "Microrealismo Puebla"
  ],
  authors: [{ name: "Athena Studio" }],
  creator: "Athena Studio",
  
  // Configuración para que se vea bien al compartir en Redes Sociales (Open Graph)
  openGraph: {
    type: "website",
    locale: "es_MX",
    url: "https://athenastudio.com.mx", // Reemplaza con tu dominio real
    title: "Athena Studio | Fine Line & Dark Art Tattoo",
    description: "Trazos finos y arte oscuro en el corazón de Puebla. Agenda tu sesión hoy.",
    siteName: "Athena Studio",
    images: [
      {
        url: "/og-image.jpg", // Debes poner una foto de tu estudio o logo en la carpeta public
        width: 1200,
        height: 630,
        alt: "Athena Studio Tattoo Puebla",
      },
    ],
  },

  // Configuración para Twitter/X
  twitter: {
    card: "summary_large_image",
    title: "Athena Studio | Fine Line Tattoo",
    description: "Especialistas en tatuaje de línea fina y arte oscuro en Puebla.",
    images: ["/og-image.jpg"],
  },

  // Iconos
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es" // Cambiado a español
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-black">
        <Navigation />
        {/* El contenido de todas tus páginas */}
        {children}

        {/* El botón flotante aparecerá encima de todo */}
        <FloatingCTA />
      </body>
    </html>
  );
}

