import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Nando\'s ClimaPro - Sistema Integrado',
  description: 'Gestão Completa de Climatização, Refrigeração e Assistência Técnica',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className="bg-surface text-slate-900 antialiased">{children}</body>
    </html>
  )
}
