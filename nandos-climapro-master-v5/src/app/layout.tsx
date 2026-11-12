import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Nando\'s ClimaPro - Sistema Empresarial V5',
  description: 'Gestão Completa com Ações Reais de OS, Equipe e Base de Erros Completa',
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
