'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Plus, MessageSquare, FileText, CheckCircle } from 'lucide-react'

export default function OrcamentosPage() {
  const [maoDeObra, setMaoDeObra] = useState<number>(350)
  const [materiais, setMateriais] = useState<number>(130)
  const [desconto, setDesconto] = useState<number>(30)

  const valorTotal = (maoDeObra + materiais) - desconto

  return (
    <div className="min-h-screen bg-surface p-6 md:p-8 space-y-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center border-b border-slate-200 pb-4">
        <div className="flex items-center space-x-3">
          <Link href="/dashboard" className="p-2 bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-700">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-navy">Módulo 2: Orçamentos Inteligentes</h1>
            <p className="text-xs text-slate-500">Gerador automático de orçamentos com calculadora e envio WhatsApp</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="font-bold text-navy text-lg">Compor Novo Orçamento</h3>

          <div className="space-y-4 text-sm">
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">Cliente</label>
              <select className="w-full p-2.5 border rounded-lg bg-white">
                <option>Residencial Silva (Rua das Palmeiras, 142)</option>
                <option>Supermercado Central (Av. Brasil, 450)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">Equipamento Selecionado</label>
              <select className="w-full p-2.5 border rounded-lg bg-white">
                <option>Split Fujitsu 12.000 BTU - Quarto Suíte</option>
              </select>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Mão de Obra (R$)</label>
                <input 
                  type="number" 
                  value={maoDeObra} 
                  onChange={(e) => setMaoDeObra(Number(e.target.value))}
                  className="w-full p-2.5 border rounded-lg font-bold text-navy" 
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Materiais (R$)</label>
                <input 
                  type="number" 
                  value={materiais} 
                  onChange={(e) => setMateriais(Number(e.target.value))}
                  className="w-full p-2.5 border rounded-lg font-bold text-navy" 
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Desconto (R$)</label>
                <input 
                  type="number" 
                  value={desconto} 
                  onChange={(e) => setDesconto(Number(e.target.value))}
                  className="w-full p-2.5 border rounded-lg font-bold text-rose-600" 
                />
              </div>
            </div>

            <div className="bg-navy p-4 rounded-xl text-white flex justify-between items-center">
              <div>
                <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">Valor Final Automático</p>
                <p className="text-3xl font-black text-turquoise">R$ {valorTotal.toFixed(2)}</p>
              </div>
              <span className="text-xs bg-navy-light text-slate-300 px-3 py-1 rounded-full border border-navy-light">
                Validade: 7 Dias
              </span>
            </div>

            <div className="pt-2 flex gap-3">
              <a 
                href={`https://wa.me/5514991689815?text=Ol%C3%A1%21%20Segue%20o%20or%C3%A7amento%20da%20Nando%27s%20ClimaPro%20no%20valor%20total%20de%20R%24%20${valorTotal.toFixed(2)}`}
                target="_blank"
                className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-lg flex items-center justify-center space-x-2 transition-all"
              >
                <MessageSquare className="w-5 h-5" />
                <span>Enviar pelo WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

        <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-md space-y-6 flex flex-col justify-between">
          <div className="space-y-6">
            <div className="flex justify-between items-start border-b border-slate-200 pb-4">
              <div>
                <h2 className="text-xl font-bold text-navy">Nando's <span className="text-turquoise">ClimaPro</span></h2>
                <p className="text-xs text-slate-500">Serviços Especializados de Climatização</p>
                <p className="text-xs text-slate-500">Contato: (14) 99168-9815</p>
              </div>
              <div className="text-right">
                <span className="text-xs font-mono font-bold bg-slate-100 text-navy px-2.5 py-1 rounded">ORÇ-2026-042</span>
                <p className="text-xs text-slate-400 mt-1">Data: 10/11/2026</p>
              </div>
            </div>

            <div className="text-sm space-y-1 bg-slate-50 p-4 rounded-lg">
              <p className="font-bold text-navy">Cliente: Residencial Silva</p>
              <p className="text-slate-600">Equipamento: Split Fujitsu 12.000 BTU</p>
              <p className="text-slate-600">Serviço: Higienização Química Completa + Carga de Gás</p>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between py-1 border-b text-slate-600">
                <span>Mão de Obra Técnica Especializada</span>
                <span className="font-semibold">R$ {maoDeObra.toFixed(2)}</span>
              </div>
              <div className="flex justify-between py-1 border-b text-slate-600">
                <span>Insumos e Fluido Refrigerante R410A</span>
                <span className="font-semibold">R$ {materiais.toFixed(2)}</span>
              </div>
              <div className="flex justify-between py-1 text-rose-600 font-semibold">
                <span>Desconto Especial Concedido</span>
                <span>- R$ {desconto.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-200 pt-4 flex justify-between items-center">
            <div>
              <p className="text-xs text-slate-400">Total do Orçamento:</p>
              <p className="text-2xl font-black text-navy">R$ {valorTotal.toFixed(2)}</p>
            </div>
            <button className="bg-navy text-white hover:bg-navy-light text-xs font-bold px-4 py-2.5 rounded-lg flex items-center space-x-2">
              <FileText className="w-4 h-4 text-turquoise" />
              <span>Imprimir / Gerar PDF</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
