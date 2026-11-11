import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Nando\'s ClimaPro - Sistema Empresarial Completo',
  description: 'Gestão de Climatização, Permissões por Cargo, Mensalidades e OS Dupla',
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
