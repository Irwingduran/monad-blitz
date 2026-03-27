import type { Metadata } from 'next'
import { DM_Sans, DM_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const dmSans = DM_Sans({ 
  subsets: ["latin"],
  variable: '--font-sans',
  weight: ["400", "500", "600", "700"],
});
const dmMono = DM_Mono({ 
  subsets: ["latin"],
  variable: '--font-mono',
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: 'OndaMonad | Tu asistente inteligente para CDMX',
  description: 'Navega la Ciudad de Mexico con IA. Rutas de Metro, Metrobus, Uber y pagos cripto en Monad.',
  generator: 'OndaMonad',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className={`${dmSans.variable} ${dmMono.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
