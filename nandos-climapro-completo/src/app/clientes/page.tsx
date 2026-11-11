'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Search, Plus, MapPin, Phone, Mail, Wrench, ArrowLeft } from 'lucide-react'

export default function ClientesPage() {
  const [cep, setCep] = useState('')
  const [rua, setRua] = useState('')
  const [bairro, setBairro] = useState('')
  const [cidade, setCidade] = useState('')
  const [uf, setUf] = useState('')
  const [loadingCep, setLoadingCep] = useState(false)

  const handleBuscarCep = async (valorCep: string) => {
    const cepLimpo = valorCep.replace(/\D/g, '')
    setCep(cepLimpo)

    if (cepLimpo.length === 8) {
      setLoadingCep(true)
      try {
        const res = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`)
        const data = await res.json()
        if (!data.erro) {
          setRua(data.logradouro || '')
          setBairro(data.bairro || '')
          setCidade(data.localidade || '')
          setUf(data.uf || '')
        }
      } catch (err) {
        console.error("Erro ao buscar CEP", err)
      } finally {
        setLoadingCep(false)
      }
    }
  }

  return (
    <div className="min-h-screen bg-surface p-6 md:p-8 space-y-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center border-b border-slate-200 pb-4">
        <div className="flex items-center space-x-3">
          <Link href="/dashboard" className="p-2 bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-700">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-navy">Módulo 1: Clientes & Equipamentos</h1>
            <p className="text-xs text-slate-500">Cadastro completo com ViaCEP automático e múltiplos aparelhos</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4 lg:col-span-1">
          <h3 className="font-bold text-navy text-lg flex items-center space-x-2">
            <Plus className="w-5 h-5 text-turquoise" />
            <span>Novo Cliente</span>
          </h3>

          <div className="space-y-3 text-sm">
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">Nome Completo / Razão Social</label>
              <input type="text" placeholder="Ex: Mercado Silva ME" className="w-full p-2.5 border rounded-lg" />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">Telefone / WhatsApp</label>
              <input type="text" placeholder="(14) 99168-9815" className="w-full p-2.5 border rounded-lg" />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">CEP (Busca Automática)</label>
              <input 
                type="text" 
                maxLength={8}
                value={cep}
                onChange={(e) => handleBuscarCep(e.target.value)}
                placeholder="Ex: 17000000" 
                className="w-full p-2.5 border rounded-lg font-mono"
              />
              {loadingCep && <span className="text-xs text-turquoise mt-1 block">Buscando endereço via ViaCEP...</span>}
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">Logradouro / Rua</label>
              <input type="text" value={rua} onChange={(e) => setRua(e.target.value)} className="w-full p-2.5 border rounded-lg bg-slate-50" />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Bairro</label>
                <input type="text" value={bairro} onChange={(e) => setBairro(e.target.value)} className="w-full p-2.5 border rounded-lg bg-slate-50" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Cidade / UF</label>
                <input type="text" value={`${cidade} ${uf}`} readOnly className="w-full p-2.5 border rounded-lg bg-slate-50" />
              </div>
            </div>

            <button className="w-full bg-turquoise hover:bg-turquoise-hover text-navy font-bold py-3 rounded-lg transition-all mt-4">
              Salvar Cliente & Adicionar Ar-Condicionado
            </button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4 lg:col-span-2">
          <h3 className="font-bold text-navy text-lg">Clientes Cadastrados & Equipamentos</h3>
          
          <div className="border rounded-xl p-4 space-y-3 bg-slate-50">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-bold text-navy text-base">Supermercado Central</h4>
                <p className="text-xs text-slate-500 flex items-center mt-0.5">
                  <MapPin className="w-3.5 h-3.5 mr-1 text-slate-400" />
                  Av. Brasil, 450 - Centro
                </p>
              </div>
              <span className="bg-turquoise/20 text-navy text-xs font-bold px-2.5 py-1 rounded">
                3 Equipamentos
              </span>
            </div>

            <div className="bg-white p-3 rounded-lg border border-slate-200 space-y-2 text-xs">
              <p className="font-bold text-slate-700 flex items-center">
                <Wrench className="w-3.5 h-3.5 mr-1 text-turquoise" />
                Aparelhos Cadastrados:
              </p>
              <ul className="divide-y divide-slate-100">
                <li className="py-1 flex justify-between">
                  <span>1. Split Fujitsu 18.000 BTU (Recepção)</span>
                  <span className="font-mono text-slate-400">SN: FJ-98231</span>
                </li>
                <li className="py-1 flex justify-between">
                  <span>2. Cassete Elgin 36.000 BTU (Salão Principal)</span>
                  <span className="font-mono text-slate-400">SN: EL-55190</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
