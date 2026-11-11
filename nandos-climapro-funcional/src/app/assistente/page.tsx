'use client'

import { useState } from 'react'
import { ArrowLeft, HelpCircle, Search, AlertCircle, CheckCircle2, Home, Wrench, Users, FileText } from 'lucide-react'

export default function AssistentePage() {
  const [busca, setBusca] = useState('')

  const codigosErros = [
    {
      marca: 'Fujitsu Inverter',
      codigo: 'E6 / 00',
      descricao: 'Erro de Comunicação entre Unidade Interna e Externa',
      solucao: 'Verificar tensão no terminal interligação (L/N), testar continuidade dos cabos de sinal e placa da condensadora.'
    },
    {
      marca: 'Elgin Eco Logic',
      codigo: 'E1',
      descricao: 'Falha no Sensor de Temperatura Ambiente Interno',
      solucao: 'Medir resistência ômica do sensor (esperado ~10kΩ a 25°C). Substituir o sensor de degelo/ambiente.'
    },
    {
      marca: 'Midea / Carrier',
      codigo: 'EC',
      descricao: 'Detecção de Vazamento de Fluido Refrigerante',
      solucao: 'Verificar pressão com manifold no campo. Procurar marcas de óleo nas flanges e realizar teste de estanqueidade com Nitrogênio.'
    }
  ]

  const errosFiltrados = codigosErros.filter(item => 
    item.marca.toLowerCase().includes(busca.toLowerCase()) || 
    item.codigo.toLowerCase().includes(busca.toLowerCase()) ||
    item.descricao.toLowerCase().includes(busca.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-surface flex flex-col md:flex-row">
      <aside className="bg-navy text-white w-full md:w-64 p-6 hidden md:flex flex-col justify-between">
        <div className="space-y-8">
          <div className="flex items-center space-x-3">
            <div className="bg-turquoise p-2 rounded-lg">
              <Wrench className="w-6 h-6 text-navy" />
            </div>
            <span className="text-xl font-bold tracking-tight">Nando's <span className="text-turquoise">ClimaPro</span></span>
          </div>

          <nav className="space-y-1">
            <button onClick={() => window.location.href = '/'} className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-slate-300 hover:bg-navy-light hover:text-white transition-colors text-left">
              <Home className="w-5 h-5 text-turquoise" />
              <span>Início</span>
            </button>
            <button onClick={() => window.location.href = '/dashboard'} className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-slate-300 hover:bg-navy-light hover:text-white transition-colors text-left">
              <Wrench className="w-5 h-5" />
              <span>Painel Geral</span>
            </button>
            <button onClick={() => window.location.href = '/clientes'} className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-slate-300 hover:bg-navy-light hover:text-white transition-colors text-left">
              <Users className="w-5 h-5" />
              <span>Clientes & Equip.</span>
            </button>
            <button onClick={() => window.location.href = '/orcamentos'} className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-slate-300 hover:bg-navy-light hover:text-white transition-colors text-left">
              <FileText className="w-5 h-5" />
              <span>Orçamentos</span>
            </button>
            <button onClick={() => window.location.href = '/assistente'} className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg bg-turquoise/10 text-turquoise font-semibold text-left">
              <HelpCircle className="w-5 h-5 text-turquoise" />
              <span>Assistente Técnico</span>
            </button>
          </nav>
        </div>
      </aside>

      <main className="flex-1 p-6 md:p-8 space-y-6 max-w-7xl mx-auto overflow-y-auto">
        <div className="flex justify-between items-center border-b border-slate-200 pb-4">
          <div className="flex items-center space-x-3">
            <button onClick={() => window.location.href = '/dashboard'} className="p-2 bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-700 cursor-pointer">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-navy">Módulo 11: Assistente Técnico Inteligente</h1>
              <p className="text-xs text-slate-500">Guia rápido para diagnóstico de campo, códigos de erro e esquemas elétricos</p>
            </div>
          </div>
        </div>

        <div className="bg-navy p-6 rounded-2xl text-white space-y-4 shadow-xl">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-turquoise/20 rounded-xl">
              <HelpCircle className="w-8 h-8 text-turquoise" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Diagnóstico & Códigos de Erro Instantâneos</h2>
              <p className="text-xs text-slate-300">Pesquise por marca (Fujitsu, Elgin, Midea) ou pelo código exibido no display do aparelho.</p>
            </div>
          </div>

          <div className="relative">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-3.5" />
            <input 
              type="text"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              placeholder="Digite o código (ex: E6, E1, EC) ou fabricante..."
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-navy-light border border-navy-light text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-turquoise text-sm"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {errosFiltrados.map((item, idx) => (
            <div key={idx} className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-4 hover:border-turquoise transition-all">
              <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{item.marca}</span>
                <span className="bg-rose-100 text-rose-800 font-mono font-black text-sm px-2.5 py-0.5 rounded">
                  {item.codigo}
                </span>
              </div>

              <div>
                <h4 className="font-bold text-navy text-base flex items-start space-x-2">
                  <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                  <span>{item.descricao}</span>
                </h4>
              </div>

              <div className="bg-slate-50 p-3 rounded-lg text-xs space-y-1 border border-slate-100">
                <p className="font-bold text-emerald-700 flex items-center">
                  <CheckCircle2 className="w-4 h-4 mr-1 text-emerald-600" />
                  Procedimento Recomendado:
                </p>
                <p className="text-slate-600 leading-relaxed">{item.solucao}</p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
