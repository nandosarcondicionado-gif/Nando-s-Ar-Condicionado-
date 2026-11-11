'use client'

import { useState } from 'react'
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  AlertTriangle, 
  Plus, 
  Wrench, 
  Users, 
  FileText, 
  ShieldCheck, 
  HelpCircle,
  MapPin,
  MessageSquare,
  X,
  CheckCircle2
} from 'lucide-react'

export default function Home() {
  const [activeTab, setActiveTab] = useState<'ADMIN' | 'TECH'>('ADMIN')
  const [subView, setSubView] = useState<'DASHBOARD' | 'CLIENTES' | 'ORCAMENTOS' | 'ASSISTENTE'>('DASHBOARD')

  // Lista de OS Operacional
  const [osList, setOsList] = useState([
    { 
      id: 'OS-2026-089', 
      client: 'Residencial Silva', 
      phone: '(14) 99111-1234',
      eq: 'Split Fujitsu 12.000 BTU', 
      defect: 'Vazando água internamente e não gela',
      desc: 'Limpeza química com bolsa coletora e recarga parcial R410A',
      val: 480, 
      status: 'Em Andamento', 
      address: 'Rua das Palmeiras, 142 - Centro, Bauru - SP' 
    }
  ])

  // Modal Novo OS
  const [showModal, setShowModal] = useState(false)
  const [cliente, setCliente] = useState('')
  const [valor, setValor] = useState('')
  const [endereco, setEndereco] = useState('')

  // Estados ViaCEP
  const [cep, setCep] = useState('')
  const [rua, setRua] = useState('')
  const [bairro, setBairro] = useState('')
  const [cidade, setCidade] = useState('')
  const [uf, setUf] = useState('')

  const cadastrarOS = (e: React.FormEvent) => {
    e.preventDefault()
    if (!cliente || !valor) return
    setOsList([
      {
        id: `OS-2026-0${90 + osList.length}`,
        client: cliente,
        phone: '(14) 99168-9815',
        eq: 'Split Inverter Geral',
        defect: 'Manutenção solicitada',
        desc: 'Revisão técnica especializada',
        val: Number(valor),
        status: 'Novo',
        address: endereco || 'Bauru - SP'
      },
      ...osList
    ])
    setCliente('')
    setValor('')
    setEndereco('')
    setShowModal(false)
  }

  const handleBuscarCep = async (val: string) => {
    const limpo = val.replace(/\D/g, '')
    setCep(limpo)
    if (limpo.length === 8) {
      try {
        const res = await fetch(`https://viacep.com.br/ws/${limpo}/json/`)
        const data = await res.json()
        if (!data.erro) {
          setRua(data.logradouro || '')
          setBairro(data.bairro || '')
          setCidade(data.localidade || '')
          setUf(data.uf || '')
        }
      } catch (e) {
        console.error(e)
      }
    }
  }

  const totalEntrada = osList.reduce((acc, item) => acc + item.val, 0)

  return (
    <div className="min-h-screen bg-surface flex flex-col md:flex-row text-slate-900">
      {/* MENU LATERAL */}
      <aside className="bg-navy text-white w-full md:w-64 p-5 flex flex-col justify-between shrink-0">
        <div className="space-y-6">
          <div className="flex items-center space-x-3">
            <div className="bg-turquoise p-2 rounded-lg">
              <Wrench className="w-6 h-6 text-navy" />
            </div>
            <span className="text-xl font-bold">Nando's <span className="text-turquoise">ClimaPro</span></span>
          </div>

          <div className="bg-navy-light p-1 rounded-xl flex">
            <button
              onClick={() => setActiveTab('ADMIN')}
              className={`flex-1 py-1.5 text-xs font-bold rounded-lg cursor-pointer transition-all ${
                activeTab === 'ADMIN' ? 'bg-turquoise text-navy' : 'text-slate-400'
              }`}
            >
              Visão ADM
            </button>
            <button
              onClick={() => setActiveTab('TECH')}
              className={`flex-1 py-1.5 text-xs font-bold rounded-lg cursor-pointer transition-all ${
                activeTab === 'TECH' ? 'bg-turquoise text-navy' : 'text-slate-400'
              }`}
            >
              Visão Técnico
            </button>
          </div>

          <nav className="space-y-1">
            <button onClick={() => setSubView('DASHBOARD')} className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-lg text-sm cursor-pointer ${subView === 'DASHBOARD' ? 'bg-turquoise/10 text-turquoise font-semibold' : 'text-slate-300 hover:bg-navy-light'}`}>
              <TrendingUp className="w-4 h-4" />
              <span>Painel Geral & OS</span>
            </button>
            <button onClick={() => setSubView('CLIENTES')} className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-lg text-sm cursor-pointer ${subView === 'CLIENTES' ? 'bg-turquoise/10 text-turquoise font-semibold' : 'text-slate-300 hover:bg-navy-light'}`}>
              <Users className="w-4 h-4" />
              <span>Clientes & ViaCEP</span>
            </button>
            <button onClick={() => setSubView('ORCAMENTOS')} className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-lg text-sm cursor-pointer ${subView === 'ORCAMENTOS' ? 'bg-turquoise/10 text-turquoise font-semibold' : 'text-slate-300 hover:bg-navy-light'}`}>
              <FileText className="w-4 h-4" />
              <span>Orçamentos & WhatsApp</span>
            </button>
            <button onClick={() => setSubView('ASSISTENTE')} className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-lg text-sm cursor-pointer ${subView === 'ASSISTENTE' ? 'bg-turquoise/10 text-turquoise font-semibold' : 'text-slate-300 hover:bg-navy-light'}`}>
              <HelpCircle className="w-4 h-4 text-turquoise" />
              <span>Assistente de Erros</span>
            </button>
          </nav>
        </div>

        <div className="pt-4 border-t border-navy-light text-xs text-slate-400">
          <p className="font-semibold text-white">Nando Climatização</p>
          <p>Tel: (14) 99168-9815</p>
        </div>
      </aside>

      {/* CONTEÚDO PRINCIPAL */}
      <main className="flex-1 p-6 md:p-8 space-y-6 overflow-y-auto">
        {/* TELA DE DASHBOARD E OS */}
        {subView === 'DASHBOARD' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b pb-4">
              <div>
                <h1 className="text-2xl font-extrabold text-navy">
                  {activeTab === 'ADMIN' ? 'Painel Executivo & Caixa' : 'Modo Técnico (OS Dupla Segura)'}
                </h1>
                <p className="text-xs text-slate-500">
                  {activeTab === 'ADMIN' ? 'Gerencie entradas, faturamento e ordens de serviço.' : 'Valores financeiros ocultos para segurança em campo.'}
                </p>
              </div>
              {activeTab === 'ADMIN' && (
                <button 
                  onClick={() => setShowModal(true)} 
                  className="bg-turquoise hover:bg-turquoise-hover text-navy font-bold px-4 py-2.5 rounded-lg text-sm flex items-center space-x-2 cursor-pointer shadow"
                >
                  <Plus className="w-4 h-4" />
                  <span>Nova Ordem de Serviço</span>
                </button>
              )}
            </div>

            {/* MODAL NOVO OS */}
            {showModal && (
              <div className="fixed inset-0 bg-navy/60 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl">
                  <div className="flex justify-between items-center border-b pb-3">
                    <h3 className="font-bold text-navy text-lg">Nova Ordem de Serviço</h3>
                    <button onClick={() => setShowModal(false)} className="cursor-pointer"><X className="w-5 h-5" /></button>
                  </div>
                  <form onSubmit={cadastrarOS} className="space-y-3 text-sm">
                    <div>
                      <label className="block text-xs font-bold text-slate-600 mb-1">Nome do Cliente *</label>
                      <input type="text" value={cliente} onChange={e => setCliente(e.target.value)} placeholder="Ex: Escritório Central" required className="w-full p-2.5 border rounded-lg" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-600 mb-1">Valor Total (R$) *</label>
                      <input type="number" value={valor} onChange={e => setValor(e.target.value)} placeholder="Ex: 450" required className="w-full p-2.5 border rounded-lg font-bold text-navy" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-600 mb-1">Endereço</label>
                      <input type="text" value={endereco} onChange={e => setEndereco(e.target.value)} placeholder="Rua das Flores, 100" className="w-full p-2.5 border rounded-lg" />
                    </div>
                    <button type="submit" className="w-full bg-turquoise hover:bg-turquoise-hover text-navy font-bold py-2.5 rounded-lg cursor-pointer mt-2">
                      Salvar OS no Sistema
                    </button>
                  </form>
                </div>
              </div>
            )}

            {activeTab === 'ADMIN' ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-white p-5 rounded-xl border shadow-sm">
                    <span className="text-xs font-bold text-slate-500 uppercase">Entrada Total</span>
                    <p className="text-2xl font-black text-navy mt-1">R$ {totalEntrada.toFixed(2)}</p>
                  </div>
                  <div className="bg-white p-5 rounded-xl border shadow-sm">
                    <span className="text-xs font-bold text-slate-500 uppercase">Saídas & Insumos</span>
                    <p className="text-2xl font-black text-rose-600 mt-1">R$ 680,00</p>
                  </div>
                  <div className="bg-white p-5 rounded-xl border shadow-sm">
                    <span className="text-xs font-bold text-slate-500 uppercase">Lucro Real Líquido</span>
                    <p className="text-2xl font-black text-emerald-600 mt-1">R$ {(totalEntrada - 680).toFixed(2)}</p>
                  </div>
                </div>

                <div className="bg-white rounded-xl border p-6 space-y-4 shadow-sm">
                  <h3 className="font-bold text-navy text-lg">Ordens de Serviço Registradas</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                      <thead className="bg-slate-50 text-slate-500 uppercase text-xs">
                        <tr>
                          <th className="p-3">Código</th>
                          <th className="p-3">Cliente</th>
                          <th className="p-3">Serviço</th>
                          <th className="p-3">Valor</th>
                          <th className="p-3">Ação</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        {osList.map((item, idx) => (
                          <tr key={idx} className="hover:bg-slate-50">
                            <td className="p-3 font-mono font-bold text-navy">{item.id}</td>
                            <td className="p-3 font-semibold">{item.client}</td>
                            <td className="p-3 text-slate-600">{item.desc}</td>
                            <td className="p-3 font-bold text-emerald-600">R$ {item.val.toFixed(2)}</td>
                            <td className="p-3">
                              <a href={`https://wa.me/5514991689815?text=Ol%C3%A1%21%20Sua%20OS%20${item.id}%20no%20valor%20de%20R%24%20${item.val.toFixed(2)}%20est%C3%A1%20em%20andamento.`} target="_blank" className="bg-emerald-600 text-white px-3 py-1.5 rounded text-xs font-bold inline-flex items-center space-x-1">
                                <MessageSquare className="w-3.5 h-3.5" />
                                <span>WhatsApp</span>
                              </a>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </>
            ) : (
              /* VISÃO TÉCNICO SEGURA */
              <div className="space-y-4">
                <div className="bg-amber-50 border border-amber-200 text-amber-900 p-4 rounded-xl text-sm flex items-center space-x-3">
                  <ShieldCheck className="w-6 h-6 text-amber-600 shrink-0" />
                  <div><strong>Modo de Campo Seguro:</strong> Nenhum valor financeiro ou faturamento é exibido para o técnico.</div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {osList.map((item, idx) => (
                    <div key={idx} className="bg-white border rounded-xl p-5 shadow-sm space-y-3">
                      <div className="flex justify-between items-start border-b pb-2">
                        <div>
                          <span className="text-xs font-mono font-bold text-turquoise bg-navy px-2 py-0.5 rounded">{item.id}</span>
                          <h4 className="font-bold text-navy text-base mt-1">{item.client}</h4>
                          <p className="text-xs text-slate-500 flex items-center mt-1"><MapPin className="w-3.5 h-3.5 mr-1 text-slate-400" />{item.address}</p>
                        </div>
                      </div>
                      <p className="text-sm"><strong className="text-slate-700">Equipamento:</strong> {item.eq}</p>
                      <p className="text-sm"><strong className="text-slate-700">Defeito:</strong> {item.defect}</p>
                      <div className="bg-slate-50 p-2.5 rounded text-xs space-y-1">
                        <p className="font-bold text-slate-700">Checklist Obrigatório:</p>
                        <ul className="list-disc list-inside text-slate-600">
                          <li>Limpeza com bolsa coletora</li>
                          <li>Conferência de pressões no manifold</li>
                        </ul>
                      </div>
                      <a href={`https://maps.google.com/?q=${encodeURIComponent(item.address)}`} target="_blank" className="block text-center bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-2 rounded-lg text-xs">
                        Abrir Rota no GPS
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* TELA DE CLIENTES & VIACEP */}
        {subView === 'CLIENTES' && (
          <div className="space-y-6">
            <h1 className="text-2xl font-bold text-navy">Módulo de Clientes & ViaCEP</h1>
            <div className="bg-white p-6 rounded-xl border shadow-sm max-w-xl space-y-4">
              <h3 className="font-bold text-navy text-base">Cadastrar Novo Cliente com CEP Automático</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">CEP (Digite 8 dígitos)</label>
                  <input type="text" maxLength={8} value={cep} onChange={e => handleBuscarCep(e.target.value)} placeholder="Ex: 17013000" className="w-full p-2.5 border rounded-lg font-mono" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">Rua / Logradouro</label>
                  <input type="text" value={rua} onChange={e => setRua(e.target.value)} className="w-full p-2.5 border rounded-lg bg-slate-50" />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1">Bairro</label>
                    <input type="text" value={bairro} onChange={e => setBairro(e.target.value)} className="w-full p-2.5 border rounded-lg bg-slate-50" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1">Cidade / UF</label>
                    <input type="text" value={`${cidade} / ${uf}`} readOnly className="w-full p-2.5 border rounded-lg bg-slate-50" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TELA DE ORÇAMENTOS */}
        {subView === 'ORCAMENTOS' && (
          <div className="space-y-6">
            <h1 className="text-2xl font-bold text-navy">Módulo de Orçamentos Dinâmicos</h1>
            <div className="bg-white p-6 rounded-xl border shadow-sm max-w-xl space-y-4">
              <div className="grid grid-cols-3 gap-3 text-sm">
                <div>
                  <label className="block text-xs font-bold mb-1">Mão de Obra (R$)</label>
                  <input type="number" defaultValue={350} className="w-full p-2 border rounded font-bold text-navy" />
                </div>
                <div>
                  <label className="block text-xs font-bold mb-1">Materiais (R$)</label>
                  <input type="number" defaultValue={130} className="w-full p-2 border rounded font-bold text-navy" />
                </div>
                <div>
                  <label className="block text-xs font-bold mb-1">Desconto (R$)</label>
                  <input type="number" defaultValue={30} className="w-full p-2 border rounded font-bold text-rose-600" />
                </div>
              </div>
              <div className="bg-navy p-4 rounded-xl text-white flex justify-between items-center">
                <div>
                  <p className="text-xs text-slate-400">Total do Orçamento:</p>
                  <p className="text-2xl font-black text-turquoise">R$ 450,00</p>
                </div>
                <a href="https://wa.me/5514991689815?text=Ol%C3%A1%21%20Segue%20o%20or%C3%A7amento%20da%20Nando%27s%20ClimaPro." target="_blank" className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-2.5 rounded-lg text-xs flex items-center space-x-1">
                  <MessageSquare className="w-4 h-4" />
                  <span>Enviar WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        )}

        {/* TELA DE ASSISTENTE TÉCNICO */}
        {subView === 'ASSISTENTE' && (
          <div className="space-y-6">
            <h1 className="text-2xl font-bold text-navy">Assistente Técnico de Erros</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white p-5 rounded-xl border shadow-sm space-y-2">
                <div className="flex justify-between font-bold text-sm">
                  <span>Fujitsu Inverter</span>
                  <span className="text-rose-600 bg-rose-50 px-2 py-0.5 rounded font-mono">E6</span>
                </div>
                <p className="text-xs text-slate-600">Erro de Comunicação entre Unidade Interna e Externa. Verificar tensão L/N e cabos de sinal.</p>
              </div>
              <div className="bg-white p-5 rounded-xl border shadow-sm space-y-2">
                <div className="flex justify-between font-bold text-sm">
                  <span>Midea / Carrier</span>
                  <span className="text-rose-600 bg-rose-50 px-2 py-0.5 rounded font-mono">EC</span>
                </div>
                <p className="text-xs text-slate-600">Possível vazamento de Fluido Refrigerante. Verificar pressões com manifold no campo.</p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
