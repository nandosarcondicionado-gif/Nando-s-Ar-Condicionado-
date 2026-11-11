'use client'

import { useState } from 'react'
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  AlertTriangle, 
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
  MessageSquare,
  Home,
  CheckCircle2
} from 'lucide-react'

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<'ADMIN' | 'TECH'>('ADMIN')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  
  // Lista completa com todos os campos operacionais reais
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
    },
    { 
      id: 'OS-2026-090', 
      client: 'Supermercado Central', 
      phone: '(14) 99222-5555',
      eq: 'Cassete Elgin 36.000 BTU', 
      defect: 'Manutenção preventiva trimestral PMOC',
      desc: 'Lavagem de filtros, serpentina e conferência de pressões',
      val: 950, 
      status: 'Agendado', 
      address: 'Av. Brasil, 450 - Centro, Bauru - SP' 
    }
  ])

  // Estados para o cadastro completo de nova OS
  const [showModal, setShowModal] = useState(false)
  const [cliente, setCliente] = useState('')
  const [telefone, setTelefone] = useState('')
  const [equipamento, setEquipamento] = useState('')
  const [defeito, setDefeito] = useState('')
  const [servico, setServico] = useState('')
  const [valor, setValor] = useState('')
  const [endereco, setEndereco] = useState('')

  const cadastrarOSCompleta = (e: React.FormEvent) => {
    e.preventDefault()
    if (!cliente || !valor) return

    const novaOS = {
      id: `OS-2026-0${91 + osList.length}`,
      client: cliente,
      phone: telefone || '(14) 99168-9815',
      eq: equipamento || 'Ar-Condicionado Split Inverter',
      defect: defeito || 'Manutenção geral solicitada',
      desc: servico || 'Higienização e revisão técnica completa',
      val: Number(valor),
      status: 'Novo',
      address: endereco || 'Endereço não informado'
    }

    setOsList([novaOS, ...osList])
    // Limpar campos
    setCliente('')
    setTelefone('')
    setEquipamento('')
    setDefeito('')
    setServico('')
    setValor('')
    setEndereco('')
    setShowModal(false)
  }

  const totalEntrada = osList.reduce((acc, item) => acc + item.val, 0)

  return (
    <div className="min-h-screen bg-surface flex flex-col md:flex-row">
      <div className="md:hidden bg-navy text-white p-4 flex justify-between items-center border-b border-navy-light">
        <div className="flex items-center space-x-2">
          <Wrench className="w-6 h-6 text-turquoise" />
          <span className="font-bold text-lg">Nando's <span className="text-turquoise">ClimaPro</span></span>
        </div>
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="cursor-pointer">
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
              className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                activeTab === 'ADMIN' ? 'bg-turquoise text-navy' : 'text-slate-400 hover:text-white'
              }`}
            >
              Visão ADM
            </button>
            <button
              onClick={() => setActiveTab('TECH')}
              className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                activeTab === 'TECH' ? 'bg-turquoise text-navy' : 'text-slate-400 hover:text-white'
              }`}
            >
              Visão Técnico
            </button>
          </div>

          <nav className="space-y-1">
            <button onClick={() => window.location.href = '/'} className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-slate-300 hover:bg-navy-light hover:text-white transition-colors text-left cursor-pointer">
              <Home className="w-5 h-5 text-turquoise" />
              <span>Início</span>
            </button>
            <button onClick={() => window.location.href = '/dashboard'} className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg bg-turquoise/10 text-turquoise font-semibold text-left cursor-pointer">
              <TrendingUp className="w-5 h-5" />
              <span>Painel Geral</span>
            </button>
            <button onClick={() => window.location.href = '/clientes'} className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-slate-300 hover:bg-navy-light hover:text-white transition-colors text-left cursor-pointer">
              <Users className="w-5 h-5" />
              <span>Clientes & Equip.</span>
            </button>
            <button onClick={() => window.location.href = '/orcamentos'} className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-slate-300 hover:bg-navy-light hover:text-white transition-colors text-left cursor-pointer">
              <FileText className="w-5 h-5" />
              <span>Orçamentos</span>
            </button>
            <button onClick={() => window.location.href = '/assistente'} className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-slate-300 hover:bg-navy-light hover:text-white transition-colors text-left cursor-pointer">
              <HelpCircle className="w-5 h-5 text-turquoise" />
              <span>Assistente Técnico</span>
            </button>
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
              {activeTab === 'ADMIN' ? 'Visão consolidada do fluxo operacional e financeiro da empresa.' : 'Modo Técnico ativo: restrito apenas a endereços e tarefas operacionais.'}
            </p>
          </div>

          <div className="flex items-center space-x-3 w-full sm:w-auto">
            {activeTab === 'ADMIN' && (
              <button 
                onClick={() => setShowModal(true)} 
                className="bg-turquoise hover:bg-turquoise-hover text-navy font-bold px-4 py-2.5 rounded-lg text-sm flex items-center space-x-2 transition-all cursor-pointer shadow-md"
              >
                <Plus className="w-4 h-4" />
                <span>Nova Ordem de Serviço</span>
              </button>
            )}
          </div>
        </div>

        {/* MODAL DE CADASTRO COMPLETO DE OS */}
        {showModal && (
          <div className="fixed inset-0 bg-navy/60 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center border-b pb-3">
                <h3 className="font-bold text-navy text-lg">Cadastro Completo de Ordem de Serviço</h3>
                <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-navy cursor-pointer">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={cadastrarOSCompleta} className="space-y-3 text-sm">
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">Nome do Cliente *</label>
                  <input 
                    type="text" 
                    value={cliente} 
                    onChange={(e) => setCliente(e.target.value)} 
                    placeholder="Ex: Escritório Comercial Bauru" 
                    required 
                    className="w-full p-2.5 border rounded-lg" 
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1">Telefone / WhatsApp</label>
                    <input 
                      type="text" 
                      value={telefone} 
                      onChange={(e) => setTelefone(e.target.value)} 
                      placeholder="(14) 99168-9815" 
                      className="w-full p-2.5 border rounded-lg" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1">Valor Total (R$) *</label>
                    <input 
                      type="number" 
                      value={valor} 
                      onChange={(e) => setValor(e.target.value)} 
                      placeholder="Ex: 500" 
                      required 
                      className="w-full p-2.5 border rounded-lg font-bold text-navy" 
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">Endereço Completo</label>
                  <input 
                    type="text" 
                    value={endereco} 
                    onChange={(e) => setEndereco(e.target.value)} 
                    placeholder="Rua Exemplo, 123 - Bairro" 
                    className="w-full p-2.5 border rounded-lg" 
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">Equipamento (Marca / Modelo / BTU)</label>
                  <input 
                    type="text" 
                    value={equipamento} 
                    onChange={(e) => setEquipamento(e.target.value)} 
                    placeholder="Split Fujitsu 12.000 BTU Inverter" 
                    className="w-full p-2.5 border rounded-lg" 
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">Defeito Relatado</label>
                  <input 
                    type="text" 
                    value={defeito} 
                    onChange={(e) => setDefeito(e.target.value)} 
                    placeholder="Ex: Não gela / Vazando água" 
                    className="w-full p-2.5 border rounded-lg" 
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">Procedimento Técnico</label>
                  <input 
                    type="text" 
                    value={servico} 
                    onChange={(e) => setServico(e.target.value)} 
                    placeholder="Ex: Higienización + Carga de Gás R410A" 
                    className="w-full p-2.5 border rounded-lg" 
                  />
                </div>

                <div className="pt-3 flex gap-3">
                  <button type="submit" className="flex-1 bg-turquoise hover:bg-turquoise-hover text-navy font-bold py-3 rounded-lg cursor-pointer">
                    Salvar e Registrar OS
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ADMIN DASHBOARD */}
        {activeTab === 'ADMIN' && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-2">
                <div className="flex justify-between items-center text-slate-500 text-xs font-bold uppercase tracking-wider">
                  <span>Entrada Total (OS)</span>
                  <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                </div>
                <p className="text-2xl font-black text-navy">R$ {totalEntrada.toFixed(2)}</p>
                <p className="text-xs text-emerald-600 font-semibold">Atualizado em tempo real</p>
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
                <p className="text-2xl font-black text-emerald-600">R$ {(totalEntrada - 680).toFixed(2)}</p>
                <p className="text-xs text-slate-400">Margem líquida apurada</p>
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
                  <h3 className="font-bold text-navy text-lg">Ordens de Serviço Ativas (Visão ADM com Valores)</h3>
                  <p className="text-xs text-slate-400">Valores financeiros, faturamento e envio de comprovante via WhatsApp</p>
                </div>
                <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full">
                  {osList.length} Serviços
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
                    {osList.map((item, idx) => (
                      <tr key={idx} className="hover:bg-slate-50 transition-colors">
                        <td className="p-3 font-mono font-bold text-navy">{item.id}</td>
                        <td className="p-3 font-semibold">{item.client}</td>
                        <td className="p-3 text-slate-600">{item.eq}</td>
                        <td className="p-3 text-slate-600">{item.desc}</td>
                        <td className="p-3 font-bold text-emerald-600">R$ {item.val.toFixed(2)}</td>
                        <td className="p-3 flex space-x-2">
                          <a 
                            href={`https://wa.me/5514991689815?text=Ol%C3%A1%21%20Sua%20OS%20n%C2%BA%20${item.id}%20da%20Nando%27s%20ClimaPro%20no%20valor%20de%20R%24%20${item.val.toFixed(2)}%20est%C3%A1%20em%20andamento.`} 
                            target="_blank" 
                            className="bg-emerald-600 hover:bg-emerald-700 text-white p-1.5 rounded flex items-center space-x-1 text-xs font-bold"
                          >
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
        )}

        {/* TECHNICIAN DASHBOARD - SEGURA (SEM VALORES) */}
        {activeTab === 'TECH' && (
          <div className="space-y-6">
            <div className="bg-amber-50 border border-amber-200 text-amber-900 p-4 rounded-xl text-sm flex items-center space-x-3">
              <ShieldCheck className="w-6 h-6 text-amber-600 flex-shrink-0" />
              <div>
                <strong className="font-bold">Modo de Campo (OS Dupla Segura):</strong> Tela estritamente operacional para técnicos. Nenhum valor financeiro ou cobrança é exibido.
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {osList.map((item, idx) => (
                <div key={idx} className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-4">
                  <div className="flex justify-between items-start border-b border-slate-100 pb-3">
                    <div>
                      <span className="text-xs font-mono font-bold text-turquoise bg-navy px-2 py-0.5 rounded">{item.id}</span>
                      <h3 className="font-bold text-navy text-lg mt-1">{item.client}</h3>
                      <p className="text-xs text-slate-500 flex items-center mt-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-400 mr-1" />
                        {item.address}
                      </p>
                      <p className="text-xs text-slate-500 mt-1">Tel: {item.phone}</p>
                    </div>
                    <span className="bg-sky-100 text-sky-800 text-xs font-bold px-2.5 py-1 rounded-full">
                      {item.status}
                    </span>
                  </div>

                  <div className="space-y-2 text-sm">
                    <p><strong className="text-slate-700">Equipamento:</strong> {item.eq}</p>
                    <p><strong className="text-slate-700">Defeito Relatado:</strong> {item.defect}</p>
                    <p><strong className="text-slate-700">Procedimento:</strong> {item.desc}</p>
                  </div>

                  <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 space-y-1 text-xs">
                    <p className="font-bold text-slate-700">Checklist Operacional Obrigatório:</p>
                    <ul className="list-disc list-inside text-slate-600 space-y-0.5">
                      <li>Higienização com bolsa coletora e bactericida</li>
                      <li>Verificação de pressões no manifold digital</li>
                      <li>Teste de dreno e vazamentos</li>
                    </ul>
                  </div>

                  <div className="pt-2 flex gap-3">
                    <button className="flex-1 bg-turquoise hover:bg-turquoise-hover text-navy font-bold py-2.5 rounded-lg text-sm transition-all cursor-pointer">
                      Concluir Atendimento no Campo
                    </button>
                    <a 
                      href={`https://maps.google.com/?q=${encodeURIComponent(item.address)}`} 
                      target="_blank" 
                      className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-4 py-2.5 rounded-lg text-sm transition-all flex items-center justify-center cursor-pointer"
                    >
                      Rota GPS
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
