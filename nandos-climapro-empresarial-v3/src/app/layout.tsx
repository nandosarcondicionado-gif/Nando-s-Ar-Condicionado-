import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Nando\'s ClimaPro - Sistema Profissional',
  description: 'Gestão Completa de Climatização, Orçamentos, OS e Agenda',
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
