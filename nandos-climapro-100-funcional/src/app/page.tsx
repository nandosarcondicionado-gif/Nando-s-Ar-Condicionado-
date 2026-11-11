'use client'

import { Wrench, ShieldCheck, DollarSign, ArrowRight, Zap } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen bg-navy text-white flex flex-col justify-between">
      <header className="border-b border-navy-light px-6 py-4 flex justify-between items-center max-w-7xl mx-auto w-full">
        <div className="flex items-center space-x-3">
          <div className="bg-turquoise p-2 rounded-lg">
            <Wrench className="w-6 h-6 text-navy" />
          </div>
          <span className="text-xl font-bold tracking-tight">Nando's <span className="text-turquoise">ClimaPro</span></span>
        </div>
        <button 
          onClick={() => window.location.href = '/dashboard'}
          className="bg-turquoise hover:bg-turquoise-hover text-navy font-semibold px-5 py-2 rounded-lg transition-colors duration-200 cursor-pointer"
        >
          Entrar no Sistema
        </button>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-16 flex-1 flex flex-col justify-center">
        <div className="text-center max-w-3xl mx-auto space-y-6">
          <span className="bg-navy-light text-turquoise text-sm font-semibold px-4 py-1.5 rounded-full inline-block border border-turquoise/20">
            Sistema 100% Integrado & Funcional
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
            Gestão inteligente para sua empresa de climatização
          </h1>
          <p className="text-lg text-slate-300">
            Orçamentos instantâneos com cálculo dinâmico, OS dupla segura (ADM vs Técnico), ViaCEP automático e Assistente Inteligente de Erros.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row justify-center gap-4">
            <button 
              onClick={() => window.location.href = '/dashboard'}
              className="bg-turquoise hover:bg-turquoise-hover text-navy font-bold px-8 py-3.5 rounded-lg flex items-center justify-center space-x-2 transition-all shadow-lg shadow-turquoise/20 cursor-pointer w-full sm:w-auto"
            >
              <span>Abrir Painel de Controle</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-20">
          <div className="bg-navy-light/60 p-6 rounded-xl border border-navy-light space-y-3">
            <ShieldCheck className="w-8 h-8 text-turquoise" />
            <h3 className="font-bold text-lg">OS Dupla Segura</h3>
            <p className="text-sm text-slate-400">O técnico visualiza apenas tarefas e checklist no campo. Valores financeiros ficam protegidos na visão ADM.</p>
          </div>

          <div className="bg-navy-light/60 p-6 rounded-xl border border-navy-light space-y-3">
            <Zap className="w-8 h-8 text-turquoise" />
            <h3 className="font-bold text-lg">CEP & Orçamentos</h3>
            <p className="text-sm text-slate-400">Preenchimento automático via ViaCEP e cálculo dinâmico de materiais e mão de obra em tempo real.</p>
          </div>

          <div className="bg-navy-light/60 p-6 rounded-xl border border-navy-light space-y-3">
            <DollarSign className="w-8 h-8 text-turquoise" />
            <h3 className="font-bold text-lg">Lucro Real & Caixa</h3>
            <p className="text-sm text-slate-400">Apuramento de entradas, saídas e margem líquida real de cada atendimento realizado.</p>
          </div>

          <div className="bg-navy-light/60 p-6 rounded-xl border border-navy-light space-y-3">
            <Wrench className="w-8 h-8 text-turquoise" />
            <h3 className="font-bold text-lg">Assistente Técnico</h3>
            <p className="text-sm text-slate-400">Consulta interativa de códigos de erro de ar-condicionado com filtro instantâneo por marca e sintoma.</p>
          </div>
        </div>
      </main>

      <footer className="border-t border-navy-light py-6 text-center text-sm text-slate-400">
        Nando's ClimaPro © {new Date().getFullYear()} — Todos os direitos reservados.
      </footer>
    </div>
  )
}
