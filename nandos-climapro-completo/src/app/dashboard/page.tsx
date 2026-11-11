'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Calendar, 
  Clock, 
  AlertTriangle, 
  Package, 
  Search, 
  Plus, 
  Wrench, 
  Users, 
  FileText, 
  ShieldCheck, 
  HelpCircle,
  Menu,
  X,
  MapPin,
  CheckCircle,
  MessageSquare
} from 'lucide-react'

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<'ADMIN' | 'TECH'>('ADMIN')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-surface flex flex-col md:flex-row">
      <div className="md:hidden bg-navy text-white p-4 flex justify-between items-center border-b border-navy-light">
        <div className="flex items-center space-x-2">
          <Wrench className="w-6 h-6 text-turquoise" />
          <span className="font-bold text-lg">Nando's <span className="text-turquoise">ClimaPro</span></span>
        </div>
        <button onClick={() => setSidebarOpen(!sidebarOpen)}>
          {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      <aside className={`bg-navy text-white w-full md:w-64 p-6 flex flex-col justify-between ${sidebarOpen ? 'block' : 'hidden'} md:block`}>
        <div className="space-y-8">
          <div className="hidden md:flex items-center space-x-3">
            <div className="bg-turquoise p-2 rounded-lg">
              <Wrench className="w-6 h-6 text-navy" />
            </div>
            <span className="text-xl font-bold tracking-tight">Nando's <span className="text-turquoise">ClimaPro</span></span>
          </div>

          <div className="bg-navy-light p-1 rounded-xl flex">
            <button
              onClick={() => setActiveTab('ADMIN')}
              className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${
                activeTab === 'ADMIN' ? 'bg-turquoise text-navy' : 'text-slate-400 hover:text-white'
              }`}
            >
              Visão ADM
            </button>
            <button
              onClick={() => setActiveTab('TECH')}
              className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${
                activeTab === 'TECH' ? 'bg-turquoise text-navy' : 'text-slate-400 hover:text-white'
              }`}
            >
              Visão Técnico
            </button>
          </div>

          <nav className="space-y-1">
            <Link href="/dashboard" className="flex items-center space-x-3 px-4 py-3 rounded-lg bg-turquoise/10 text-turquoise font-semibold">
              <TrendingUp className="w-5 h-5" />
              <span>Painel Geral</span>
            </Link>
            <Link href="/clientes" className="flex items-center space-x-3 px-4 py-3 rounded-lg text-slate-300 hover:bg-navy-light hover:text-white transition-colors">
              <Users className="w-5 h-5" />
              <span>Clientes & Equip.</span>
            </Link>
            <Link href="/orcamentos" className="flex items-center space-x-3 px-4 py-3 rounded-lg text-slate-300 hover:bg-navy-light hover:text-white transition-colors">
              <FileText className="w-5 h-5" />
              <span>Orçamentos</span>
            </Link>
            <Link href="/ordens-servico" className="flex items-center space-x-3 px-4 py-3 rounded-lg text-slate-300 hover:bg-navy-light hover:text-white transition-colors">
              <ShieldCheck className="w-5 h-5" />
              <span>Ordens de Serviço</span>
            </Link>
            <Link href="/agenda" className="flex items-center space-x-3 px-4 py-3 rounded-lg text-slate-300 hover:bg-navy-light hover:text-white transition-colors">
              <Calendar className="w-5 h-5" />
              <span>Agenda</span>
            </Link>
            <Link href="/estoque" className="flex items-center space-x-3 px-4 py-3 rounded-lg text-slate-300 hover:bg-navy-light hover:text-white transition-colors">
              <Package className="w-5 h-5" />
              <span>Almoxarifado</span>
            </Link>
            <Link href="/financeiro" className="flex items-center space-x-3 px-4 py-3 rounded-lg text-slate-300 hover:bg-navy-light hover:text-white transition-colors">
              <DollarSign className="w-5 h-5" />
              <span>Financeiro</span>
            </Link>
            <Link href="/assistente" className="flex items-center space-x-3 px-4 py-3 rounded-lg text-slate-300 hover:bg-navy-light hover:text-white transition-colors">
              <HelpCircle className="w-5 h-5 text-turquoise" />
              <span>Assistente Técnico</span>
            </Link>
          </nav>
        </div>

        <div className="pt-6 border-t border-navy-light">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-turquoise text-navy flex items-center justify-center font-bold">
              NC
            </div>
            <div>
              <p className="text-sm font-semibold">Nando Climatização</p>
              <p className="text-xs text-slate-400">{activeTab === 'ADMIN' ? 'Perfil Administrador' : 'Perfil Técnico'}</p>
            </div>
          </div>
        </div>
      </aside>

      <main className="flex-1 p-6 md:p-8 space-y-8 overflow-y-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-200 pb-5">
          <div>
            <h1 className="text-2xl font-extrabold text-navy">
              {activeTab === 'ADMIN' ? 'Painel Executivo & Caixa' : 'Minhas Ordens de Serviço (Campo)'}
            </h1>
            <p className="text-sm text-slate-500">
              {activeTab === 'ADMIN' ? 'Visão consolidada do fluxo operacional e financeiro da empresa.' : 'Visualização restrita apenas a detalhes operacionais de atendimento.'}
            </p>
          </div>

          <div className="flex items-center space-x-3 w-full sm:w-auto">
            <div className="relative flex-1 sm:flex-initial">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input 
                type="text"
                placeholder="Buscar cliente, OS ou equipamento..."
                className="pl-9 pr-4 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-turquoise w-full"
              />
            </div>
            {activeTab === 'ADMIN' && (
              <Link href="/ordens-servico" className="bg-turquoise hover:bg-turquoise-hover text-navy font-bold px-4 py-2 rounded-lg text-sm flex items-center space-x-2 transition-all">
                <Plus className="w-4 h-4" />
                <span>Nova OS</span>
              </Link>
            )}
          </div>
        </div>

        {activeTab === 'ADMIN' && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-2">
                <div className="flex justify-between items-center text-slate-500 text-xs font-bold uppercase tracking-wider">
                  <span>Entrada Hoje</span>
                  <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                </div>
                <p className="text-2xl font-black text-navy">R$ 2.450,00</p>
                <p className="text-xs text-emerald-600 font-semibold">+18% em relação a ontem</p>
              </div>

              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-2">
                <div className="flex justify-between items-center text-slate-500 text-xs font-bold uppercase tracking-wider">
                  <span>Saídas & Insumos</span>
                  <div className="p-2 bg-rose-50 rounded-lg text-rose-600">
                    <TrendingDown className="w-4 h-4" />
                  </div>
                </div>
                <p className="text-2xl font-black text-navy">R$ 680,00</p>
                <p className="text-xs text-slate-400">Combustível e materiais</p>
              </div>

              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-2">
                <div className="flex justify-between items-center text-slate-500 text-xs font-bold uppercase tracking-wider">
                  <span>Lucro Real Estimado</span>
                  <div className="p-2 bg-sky-50 rounded-lg text-sky-600">
                    <DollarSign className="w-4 h-4" />
                  </div>
                </div>
                <p className="text-2xl font-black text-emerald-600">R$ 1.770,00</p>
                <p className="text-xs text-slate-400">Margem real apurada</p>
              </div>

              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-2">
                <div className="flex justify-between items-center text-slate-500 text-xs font-bold uppercase tracking-wider">
                  <span>Estoque Crítico</span>
                  <div className="p-2 bg-amber-50 rounded-lg text-amber-600">
                    <AlertTriangle className="w-4 h-4" />
                  </div>
                </div>
                <p className="text-2xl font-black text-amber-600">3 Itens</p>
                <p className="text-xs text-slate-400">Fluido R410A abaixo do mínimo</p>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden space-y-4 p-6">
              <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                <div>
                  <h3 className="font-bold text-navy text-lg">Ordens de Serviço do Dia (Visão ADM)</h3>
                  <p className="text-xs text-slate-400">Exibição de valores, insumos e margem por atendimento</p>
                </div>
                <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full">
                  3 Serviços Ativos
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-50 text-slate-500 uppercase text-xs">
                    <tr>
                      <th className="p-3">Código</th>
                      <th className="p-3">Cliente</th>
                      <th className="p-3">Equipamento</th>
                      <th className="p-3">Serviço</th>
                      <th className="p-3">Valor Total</th>
                      <th className="p-3">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr className="hover:bg-slate-50 transition-colors">
                      <td className="p-3 font-mono font-bold text-navy">OS-2026-089</td>
                      <td className="p-3 font-semibold">Residencial Silva</td>
                      <td className="p-3 text-slate-600">Split Fujitsu 12.000 BTU</td>
                      <td className="p-3 text-slate-600">Higienização + Carga de Gás</td>
                      <td className="p-3 font-bold text-emerald-600">R$ 480,00</td>
                      <td className="p-3 flex space-x-2">
                        <a 
                          href="https://wa.me/5514991689815?text=Ol%C3%A1%21%20Seu%20or%C3%A7amento%2FOS%20n%C2%BA%20OS-2026-089%20da%20Nando%27s%20ClimaPro%20est%C3%A1%20pronto." 
                          target="_blank" 
                          className="bg-emerald-600 hover:bg-emerald-700 text-white p-1.5 rounded flex items-center space-x-1 text-xs font-bold"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                          <span>WhatsApp</span>
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {activeTab === 'TECH' && (
          <div className="space-y-6">
            <div className="bg-amber-50 border border-amber-200 text-amber-900 p-4 rounded-xl text-sm flex items-center space-x-3">
              <ShieldCheck className="w-6 h-6 text-amber-600 flex-shrink-0" />
              <div>
                <strong className="font-bold">Modo de Campo Ativo:</strong> Tela estritamente operacional para técnicos. Nenhum valor financeiro ou cobrança é exibido.
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-4">
                <div className="flex justify-between items-start border-b border-slate-100 pb-3">
                  <div>
                    <span className="text-xs font-mono font-bold text-turquoise bg-navy px-2 py-0.5 rounded">OS-2026-089</span>
                    <h3 className="font-bold text-navy text-lg mt-1">Residencial Silva</h3>
                    <p className="text-xs text-slate-500 flex items-center mt-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 mr-1" />
                      Rua das Palmeiras, 142 - Bairro Centro
                    </p>
                  </div>
                  <span className="bg-sky-100 text-sky-800 text-xs font-bold px-2.5 py-1 rounded-full">
                    Hoje às 14:00
                  </span>
                </div>

                <div className="space-y-2 text-sm">
                  <p><strong className="text-slate-700">Equipamento:</strong> Split Fujitsu 12.000 BTU (Quarto Suíte)</p>
                  <p><strong className="text-slate-700">Defeito Relatado:</strong> Aparelho vazando água internamente e não gela.</p>
                  <p><strong className="text-slate-700">Procedimento:</strong> Limpeza química com bolsa coletora e recarga parcial R410A.</p>
                </div>

                <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 space-y-1 text-xs">
                  <p className="font-bold text-slate-700">Lista de Insumos & Ferramentas OBRIGATÓRIAS:</p>
                  <ul className="list-disc list-inside text-slate-600 space-y-0.5">
                    <li>Bolsa Coletora para Split Inverter</li>
                    <li>Bomba de Lavagem de Alta Pressão</li>
                    <li>Fluido Refrigerante R410A + Manifold Digital</li>
                  </ul>
                </div>

                <div className="pt-2 flex gap-3">
                  <button className="flex-1 bg-turquoise hover:bg-turquoise-hover text-navy font-bold py-2.5 rounded-lg text-sm transition-all">
                    Iniciar Serviço no Celular
                  </button>
                  <a 
                    href="https://maps.google.com/?q=Rua+das+Palmeiras+142" 
                    target="_blank" 
                    className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-4 py-2.5 rounded-lg text-sm transition-all flex items-center justify-center"
                  >
                    Abrir Rota
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
