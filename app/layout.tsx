import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { tema } from "@/ui/theme/tema";
import { URL_SITIO } from "@/infrastructure/seo/configuracionSitio";
import "./globals.css";
import { ThemeProvider, CssBaseline } from '@mui/material';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { MetaPixel } from "@/ui/componentes/metaPixel/MetaPixel";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  // Base para resolver las URLs absolutas que necesitan Open Graph y el sitemap.
  metadataBase: new URL(URL_SITIO),
  // Valores por defecto: cada página que define los suyos los reemplaza.
  title: "Escalania | Agentes de IA para spas y centros estéticos",
  description:
    "Agentes de Inteligencia Artificial que conversan con tus clientes, resuelven dudas y agendan citas por WhatsApp.",
  // Verificación del dominio en Meta Business Manager (Seguridad de la marca → Dominios).
  verification: {
    other: {
      "facebook-domain-verification": "eu9horfqbz15ohozj361krmk184nfg",
    },
  },
};

interface PropsRootLayout {
  children: React.ReactNode;
}

export default function RootLayout({ children }: Readonly<PropsRootLayout>) {
  return (
    <html lang="es">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <AppRouterCacheProvider>
          <ThemeProvider theme={tema}>
            <CssBaseline />
            {children}
          </ThemeProvider>
        </AppRouterCacheProvider>
        <MetaPixel />
      </body>
    </html>
  );
}
