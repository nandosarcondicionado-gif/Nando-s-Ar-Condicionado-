'use client'

import { useState } from 'react'
import { 
  Users, 
  FileText, 
  Wrench, 
  Calendar, 
  DollarSign, 
  ShieldCheck, 
  HelpCircle, 
  Plus, 
  MapPin, 
  MessageSquare, 
  CheckCircle2, 
  Clock, 
  Trash2,
  TrendingUp,
  AlertTriangle,
  Building2,
  Phone
} from 'lucide-react'

export default function ClimaProApp() {
  const [activeModule, setActiveModule] = useState<'CLIENTES' | 'ORCAMENTOS' | 'OS' | 'AGENDA' | 'FINANCEIRO' | 'ASSISTENTE'>('CLIENTES')
  const [userRole, setUserRole] = useState<'ADMIN' | 'TECH'>('ADMIN')

  // Estado de Clientes com Aparelhos
  const [clientes, setClientes] = useState([
    {
      id: 1,
      nome: 'Supermercado Central',
      telefone: '(14) 99111-2222',
      cep: '17013000',
      endereco: 'Av. Brasil, 450 - Centro, Bauru - SP',
      equipamentos: [
        { tipo: 'Split Cassete', marca: 'Elgin', btu: '36.000 BTU', local: 'Salão Principal' },
        { tipo: 'Split Hi-Wall', marca: 'Fujitsu', btu: '18.000 BTU', local: 'Recepção' }
      ]
    }
  ])

  // Estado de Orçamentos
  const [orcamentos, setOrcamentos] = useState([
    {
      id: 'ORC-2026-01',
      cliente: 'Supermercado Central',
      equipamento: 'Split Cassete Elgin 36.000 BTU',
      servico: 'Higienização Química Completa + Carga de Gás R410A',
      maoObra: 450,
      materiais: 220,
      desconto: 50,
      total: 620,
      status: 'Aguardando Aprovação'
    }
  ])

  // Estado de Ordens de Serviço (OS) geradas a partir da aprovação
  const [ordensServico, setOrdensServico] = useState([
    {
      id: 'OS-2026-089',
      cliente: 'Supermercado Central',
      telefone: '(14) 99111-2222',
      endereco: 'Av. Brasil, 450 - Centro, Bauru - SP',
      equipamento: 'Split Cassete Elgin 36.000 BTU',
      servico: 'Higienização Química Completa + Carga de Gás R410A',
      valor: 620,
      status: 'Em Andamento',
      dataAgendamento: '2026-11-12'
    }
  ])

  // Formulário Novo Cliente
  const [nomeCli, setNomeCli] = useState('')
  const [telCli, setTelCli] = useState('')
  const [cepCli, setCepCli] = useState('')
  const [endCli, setEndCli] = useState('')
  const [eqTipo, setEqTipo] = useState('Split Hi-Wall')
  const [eqMarca, setEqMarca] = useState('Fujitsu')
  const [eqBtu, setEqBtu] = useState('12.000 BTU')
  const [eqLocal, setEqLocal] = useState('Quarto Principal')
  const [loadingCep, setLoadingCep] = useState(false)

  // Formulário Novo Orçamento
  const [orcCli, setOrcCli] = useState('Supermercado Central')
  const [orcServico, setOrcServico] = useState('Manutenção Corretiva & Limpeza')
  const [orcMaoObra, setOrcMaoObra] = useState<number>(350)
  const [orcMateriais, setOrcMateriais] = useState<number>(120)
  const [orcDesconto, setOrcDesconto] = useState<number>(20)

  // ViaCEP Automático
  const handleBuscarCep = async (val: string) => {
    const limpo = val.replace(/\D/g, '')
    setCepCli(limpo)
    if (limpo.length === 8) {
      setLoadingCep(true)
      try {
        const res = await fetch(`https://viacep.com.br/ws/${limpo}/json/`)
        const data = await res.json()
        if (!data.erro) {
          setEndCli(`${data.logradouro}, ${data.bairro} - ${data.localidade}/${data.uf}`)
        }
      } catch (e) {
        console.error(e)
      } finally {
        setLoadingCep(false)
      }
    }
  }

  const salvarCliente = (e: React.FormEvent) => {
    e.preventDefault()
    if (!nomeCli || !telCli) return
    const novo = {
      id: clientes.length + 1,
      nome: nomeCli,
      telefone: telCli,
      cep: cepCli,
      endereco: endCli || 'Endereço não informado',
      equipamentos: [{ tipo: eqTipo, marca: eqMarca, btu: eqBtu, local: eqLocal }]
    }
    setClientes([novo, ...clientes])
    setNomeCli('')
    setTelCli('')
    setCepCli('')
    setEndCli('')
    alert('Cliente e Equipamento cadastrados com sucesso!')
  }

  const criarOrcamento = (e: React.FormEvent) => {
    e.preventDefault()
    const totalCalc = Math.max(0, (orcMaoObra + orcMateriais) - orcDesconto)
    const novoOrc = {
      id: `ORC-2026-0${orcamentos.length + 1}`,
      cliente: orcCli,
      equipamento: 'Split Inverter Cadastrado',
      servico: orcServico,
      maoObra: orcMaoObra,
      materiais: orcMateriais,
      desconto: orcDesconto,
      total: totalCalc,
      status: 'Aguardando Aprovação'
    }
    setOrcamentos([novoOrc, ...orcamentos])
    alert('Orçamento gerado com sucesso!')
  }

  const aprovarOrcamentoConverterOS = (orcId: string) => {
    const orc = orcamentos.find(o => o.id === orcId)
    if (!orc) return

    // Atualiza status do orçamento
    setOrcamentos(orcamentos.map(o => o.id === orcId ? { ...o, status: 'Aprovado 🚀' } : o))

    // Cria a OS automaticamente
    const novaOS = {
      id: `OS-2026-0${90 + ordensServico.length}`,
      cliente: orc.cliente,
      telefone: '(14) 99168-9815',
      endereco: 'Endereço cadastrado do cliente',
      equipamento: orc.equipamento,
      servico: orc.servico,
      valor: orc.total,
      status: 'Agendado',
      dataAgendamento: new Date().toISOString().split('T')[0]
    }
    setOrdensServico([novaOS, ...ordensServico])
    alert('Orçamento aprovado e convertido em Ordem de Serviço & Agenda com sucesso!')
  }

  const totalEntradaFaturamento = ordensServico.reduce((acc, item) => acc + item.valor, 0)

  return (
    <div className="min-h-screen bg-surface flex flex-col md:flex-row text-slate-900 font-sans">
      
      {/* MENU LATERAL PROFISSIONAL */}
      <aside className="bg-navy text-white w-full md:w-64 p-5 flex flex-col justify-between shrink-0 shadow-xl">
        <div className="space-y-6">
          <div className="flex items-center space-x-3 pb-2 border-b border-navy-light">
            <div className="bg-turquoise p-2 rounded-xl">
              <Wrench className="w-6 h-6 text-navy" />
            </div>
            <div>
              <h1 className="font-extrabold text-base tracking-tight">Nando's <span className="text-turquoise">ClimaPro</span></h1>
              <p className="text-[10px] text-slate-400">Enterprise HVAC & Refrigeração</p>
            </div>
          </div>

          {/* PERFIL / ROLE SWITCHER */}
          <div className="bg-navy-light p-1.5 rounded-xl flex border border-navy-light">
            <button
              onClick={() => setUserRole('ADMIN')}
              className={`flex-1 py-1.5 text-xs font-bold rounded-lg cursor-pointer transition-all ${
                userRole === 'ADMIN' ? 'bg-turquoise text-navy shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              Visão ADM
            </button>
            <button
              onClick={() => setUserRole('TECH')}
              className={`flex-1 py-1.5 text-xs font-bold rounded-lg cursor-pointer transition-all ${
                userRole === 'TECH' ? 'bg-turquoise text-navy shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              Visão Técnico
            </button>
          </div>

          {/* NAVEGAÇÃO ENTRE MÓDULOS */}
          <nav className="space-y-1.5">
            <button 
              onClick={() => setActiveModule('CLIENTES')} 
              className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-xl text-xs font-semibold cursor-pointer transition-all ${
                activeModule === 'CLIENTES' ? 'bg-turquoise text-navy shadow-lg font-bold' : 'text-slate-300 hover:bg-navy-light'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>1. Clientes & Equipamentos</span>
            </button>

            <button 
              onClick={() => setActiveModule('ORCAMENTOS')} 
              className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-xl text-xs font-semibold cursor-pointer transition-all ${
                activeModule === 'ORCAMENTOS' ? 'bg-turquoise text-navy shadow-lg font-bold' : 'text-slate-300 hover:bg-navy-light'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>2. Orçamentos & Aprovação</span>
            </button>

            <button 
              onClick={() => setActiveModule('OS')} 
              className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-xl text-xs font-semibold cursor-pointer transition-all ${
                activeModule === 'OS' ? 'bg-turquoise text-navy shadow-lg font-bold' : 'text-slate-300 hover:bg-navy-light'
              }`}
            >
              <Wrench className="w-4 h-4" />
              <span>3. Ordens de Serviço (OS)</span>
            </button>

            <button 
              onClick={() => setActiveModule('AGENDA')} 
              className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-xl text-xs font-semibold cursor-pointer transition-all ${
                activeModule === 'AGENDA' ? 'bg-turquoise text-navy shadow-lg font-bold' : 'text-slate-300 hover:bg-navy-light'
              }`}
            >
              <Calendar className="w-4 h-4" />
              <span>4. Agenda Automática</span>
            </button>

            {userRole === 'ADMIN' && (
              <button 
                onClick={() => setActiveModule('FINANCEIRO')} 
                className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-xl text-xs font-semibold cursor-pointer transition-all ${
                  activeModule === 'FINANCEIRO' ? 'bg-turquoise text-navy shadow-lg font-bold' : 'text-slate-300 hover:bg-navy-light'
                }`}
              >
                <DollarSign className="w-4 h-4" />
                <span>5. Caixa & Lucro Real</span>
              </button>
            )}

            <button 
              onClick={() => setActiveModule('ASSISTENTE')} 
              className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-xl text-xs font-semibold cursor-pointer transition-all ${
                activeModule === 'ASSISTENTE' ? 'bg-turquoise text-navy shadow-lg font-bold' : 'text-slate-300 hover:bg-navy-light'
              }`}
            >
              <HelpCircle className="w-4 h-4" />
              <span>6. Assistente de Erros</span>
            </button>
          </nav>
        </div>

        <div className="pt-4 border-t border-navy-light text-xs text-slate-400 space-y-1">
          <p className="font-bold text-white">Nando Climatização</p>
          <p>Disparos: (14) 99168-9815</p>
          <p className="text-[10px] text-turquoise">Status: Online no Netlify 🚀</p>
        </div>
      </aside>

      {/* PAINEL DE CONTEÚDO PRINCIPAL */}
      <main className="flex-1 p-6 md:p-8 space-y-6 overflow-y-auto max-w-7xl mx-auto w-full">
        
        {/* AVISO SE FOR MODO TÉCNICO */}
        {userRole === 'TECH' && (
          <div className="bg-amber-50 border border-amber-200 text-amber-900 p-4 rounded-xl text-sm flex items-center space-x-3 shadow-sm">
            <ShieldCheck className="w-6 h-6 text-amber-600 shrink-0" />
            <div>
              <strong className="font-bold">Modo de Campo Ativo (OS Dupla Segura):</strong> Você está na visão de técnico. Nenhum valor financeiro, faturamento ou margem de lucro é exibido. Apenas rotas, tarefas e checklists.
            </div>
          </div>
        )}

        {/* 1. MÓDULO DE CLIENTES & APARELHOS */}
        {activeModule === 'CLIENTES' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center border-b pb-4">
              <div>
                <h2 className="text-2xl font-extrabold text-navy">Módulo 1: Gestão de Clientes & Equipamentos</h2>
                <p className="text-xs text-slate-500">Cadastre o cliente com busca automática de endereço ViaCEP e vincule múltiplos aparelhos.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* FORMULÁRIO DE CADASTRO */}
              <form onSubmit={salvarCliente} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4 lg:col-span-1">
                <h3 className="font-bold text-navy text-base flex items-center space-x-2 border-b pb-2">
                  <Plus className="w-4 h-4 text-turquoise" />
                  <span>Novo Cadastro de Cliente</span>
                </h3>

                <div className="space-y-3 text-xs">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Nome / Razão Social *</label>
                    <input type="text" value={nomeCli} onChange={e => setNomeCli(e.target.value)} placeholder="Ex: Escritório Comercial Bauru" required className="w-full p-2.5 border rounded-xl" />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Telefone / WhatsApp *</label>
                    <input type="text" value={telCli} onChange={e => setTelCli(e.target.value)} placeholder="(14) 99168-9815" required className="w-full p-2.5 border rounded-xl" />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">CEP (Busca Automática ViaCEP)</label>
                    <input type="text" maxLength={8} value={cepCli} onChange={e => handleBuscarCep(e.target.value)} placeholder="Ex: 17013000" className="w-full p-2.5 border rounded-xl font-mono" />
                    {loadingCep && <span className="text-turquoise mt-1 block">Buscando endereço nos Correios...</span>}
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Endereço Completo</label>
                    <input type="text" value={endCli} onChange={e => setEndCli(e.target.value)} placeholder="Rua preenchida automaticamente" className="w-full p-2.5 border rounded-xl bg-slate-50" />
                  </div>

                  <div className="pt-2 border-t space-y-2">
                    <p className="font-bold text-navy">Vincular Primeiro Aparelho</p>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-slate-600 mb-1">Tipo</label>
                        <select value={eqTipo} onChange={e => setEqTipo(e.target.value)} className="w-full p-2 border rounded-lg bg-white">
                          <option>Split Hi-Wall</option>
                          <option>Split Cassete</option>
                          <option>Piso Teto</option>
                          <option>Geladeira / Freezer</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-slate-600 mb-1">Marca</label>
                        <select value={eqMarca} onChange={e => setEqMarca(e.target.value)} className="w-full p-2 border rounded-lg bg-white">
                          <option>Fujitsu</option>
                          <option>Daikin</option>
                          <option>Midea</option>
                          <option>Elgin</option>
                          <option>Brastemp</option>
                        </select>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-slate-600 mb-1">BTU / Potência</label>
                        <input type="text" value={eqBtu} onChange={e => setEqBtu(e.target.value)} placeholder="12.000 BTU" className="w-full p-2 border rounded-lg" />
                      </div>
                      <div>
                        <label className="block text-slate-600 mb-1">Local / Comodo</label>
                        <input type="text" value={eqLocal} onChange={e => setEqLocal(e.target.value)} placeholder="Quarto Suíte" className="w-full p-2 border rounded-lg" />
                      </div>
                    </div>
                  </div>

                  <button type="submit" className="w-full bg-turquoise hover:bg-turquoise-hover text-navy font-bold py-3 rounded-xl transition-all cursor-pointer shadow-md mt-3">
                    Salvar Cliente & Aparelho
                  </button>
                </div>
              </form>

              {/* LISTAGEM DOS CLIENTES CADASTRADOS */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4 lg:col-span-2">
                <h3 className="font-bold text-navy text-base border-b pb-2">Base de Clientes Cadastrados ({clientes.length})</h3>
                
                <div className="space-y-3">
                  {clientes.map((c) => (
                    <div key={c.id} className="border border-slate-200 rounded-xl p-4 bg-slate-50 space-y-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-bold text-navy text-base flex items-center space-x-2">
                            <Building2 className="w-4 h-4 text-turquoise" />
                            <span>{c.nome}</span>
                          </h4>
                          <p className="text-xs text-slate-500 flex items-center mt-1">
                            <MapPin className="w-3.5 h-3.5 mr-1 text-slate-400" />
                            {c.endereco}
                          </p>
                          <p className="text-xs text-slate-500 mt-0.5 flex items-center">
                            <Phone className="w-3.5 h-3.5 mr-1 text-slate-400" />
                            {c.telefone}
                          </p>
                        </div>
                        <span className="bg-turquoise/20 text-navy text-xs font-bold px-2.5 py-1 rounded-full">
                          {c.equipamentos.length} Aparelho(s)
                        </span>
                      </div>

                      <div className="bg-white p-3 rounded-lg border border-slate-200 text-xs space-y-1">
                        <p className="font-bold text-slate-700">Aparelhos Vinculados:</p>
                        <ul className="divide-y divide-slate-100">
                          {c.equipamentos.map((eq, i) => (
                            <li key={i} className="py-1 flex justify-between">
                              <span className="font-semibold text-navy">{eq.tipo} {eq.marca} ({eq.btu})</span>
                              <span className="text-slate-400">Local: {eq.local}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 2. MÓDULO DE ORÇAMENTOS & APROVAÇÃO */}
        {activeModule === 'ORCAMENTOS' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center border-b pb-4">
              <div>
                <h2 className="text-2xl font-extrabold text-navy">Módulo 2: Orçamentos Inteligentes</h2>
                <p className="text-xs text-slate-500">Crie orçamentos dinâmicos, envie para o WhatsApp do cliente e aprove para gerar a OS automaticamente.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* CRIADOR DE ORÇAMENTO */}
              <form onSubmit={criarOrcamento} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                <h3 className="font-bold text-navy text-base border-b pb-2">Compor Novo Orçamento</h3>

                <div className="space-y-3 text-xs">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Selecionar Cliente</label>
                    <select value={orcCli} onChange={e => setOrcCli(e.target.value)} className="w-full p-2.5 border rounded-xl bg-white font-semibold">
                      {clientes.map((c, i) => <option key={i} value={c.nome}>{c.nome}</option>)}
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Descrição do Serviço / Reparo</label>
                    <input type="text" value={orcServico} onChange={e => setOrcServico(e.target.value)} required className="w-full p-2.5 border rounded-xl" />
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Mão de Obra (R$)</label>
                      <input type="number" value={orcMaoObra} onChange={e => setOrcMaoObra(Number(e.target.value))} className="w-full p-2.5 border rounded-xl font-bold text-navy" />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Materiais (R$)</label>
                      <input type="number" value={orcMateriais} onChange={e => setOrcMateriais(Number(e.target.value))} className="w-full p-2.5 border rounded-xl font-bold text-navy" />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Desconto (R$)</label>
                      <input type="number" value={orcDesconto} onChange={e => setOrcDesconto(Number(e.target.value))} className="w-full p-2.5 border rounded-xl font-bold text-rose-600" />
                    </div>
                  </div>

                  <div className="bg-navy p-4 rounded-xl text-white flex justify-between items-center">
                    <div>
                      <p className="text-[10px] text-slate-400 uppercase font-bold">Valor Final Automático</p>
                      <p className="text-2xl font-black text-turquoise">R$ {Math.max(0, (orcMaoObra + orcMateriais) - orcDesconto).toFixed(2)}</p>
                    </div>
                    <span className="text-[10px] bg-navy-light px-3 py-1 rounded-full border border-navy-light">Validade: 7 Dias</span>
                  </div>

                  <button type="submit" className="w-full bg-turquoise hover:bg-turquoise-hover text-navy font-bold py-3 rounded-xl cursor-pointer shadow-md">
                    Salvar Orçamento na Base
                  </button>
                </div>
              </form>

              {/* LISTA DE ORÇAMENTOS & APROVAÇÃO */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                <h3 className="font-bold text-navy text-base border-b pb-2">Orçamentos Emitidos & Conversão para OS</h3>
                
                <div className="space-y-4">
                  {orcamentos.map((orc) => (
                    <div key={orc.id} className="border border-slate-200 rounded-xl p-4 bg-slate-50 space-y-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="text-[10px] font-mono font-bold bg-navy text-turquoise px-2 py-0.5 rounded">{orc.id}</span>
                          <h4 className="font-bold text-navy text-sm mt-1">{orc.cliente}</h4>
                          <p className="text-xs text-slate-600">{orc.servico}</p>
                        </div>
                        <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${orc.status.includes('Aprovado') ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                          {orc.status}
                        </span>
                      </div>

                      <div className="flex justify-between items-center pt-2 border-t text-xs">
                        <div>
                          <span className="text-slate-400">Total: </span>
                          <span className="font-bold text-navy text-sm">R$ {orc.total.toFixed(2)}</span>
                        </div>

                        <div className="flex space-x-2">
                          <a 
                            href={`https://wa.me/5514991689815?text=Ol%C3%A1%21%20Segue%20o%20or%C3%A7amento%20${orc.id}%20da%20Nando%27s%20ClimaPro%20no%20valor%20de%20R%24%20${orc.total.toFixed(2)}.`} 
                            target="_blank" 
                            className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1.5 rounded-lg text-xs font-bold flex items-center space-x-1"
                          >
                            <MessageSquare className="w-3.5 h-3.5" />
                            <span>WhatsApp</span>
                          </a>

                          {!orc.status.includes('Aprovado') && (
                            <button 
                              onClick={() => aprovarOrcamentoConverterOS(orc.id)}
                              className="bg-navy hover:bg-navy-light text-turquoise px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer"
                            >
                              Aprovar & Gerar OS 🚀
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 3. MÓDULO DE ORDENS DE SERVIÇO (OS) & OS DUPLA */}
        {activeModule === 'OS' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center border-b pb-4">
              <div>
                <h2 className="text-2xl font-extrabold text-navy">Módulo 3: Ordens de Serviço (OS Dupla Segura)</h2>
                <p className="text-xs text-slate-500">Ordens geradas a partir de orçamentos aprovados. Na visão técnico, valores somem e apenas checklists aparecem.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {ordensServico.map((os) => (
                <div key={os.id} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
                  <div className="flex justify-between items-start border-b pb-3">
                    <div>
                      <span className="text-[10px] font-mono font-bold text-turquoise bg-navy px-2 py-0.5 rounded">{os.id}</span>
                      <h3 className="font-bold text-navy text-base mt-1">{os.cliente}</h3>
                      <p className="text-xs text-slate-500 flex items-center mt-1">
                        <MapPin className="w-3.5 h-3.5 mr-1 text-slate-400" />
                        {os.endereco}
                      </p>
                    </div>
                    <span className="bg-sky-100 text-sky-800 text-xs font-bold px-2.5 py-1 rounded-full">
                      {os.status}
                    </span>
                  </div>

                  <div className="space-y-2 text-xs">
                    <p><strong className="text-slate-700">Equipamento:</strong> {os.equipamento}</p>
                    <p><strong className="text-slate-700">Procedimento:</strong> {os.servico}</p>
                    
                    {/* VALOR EXIBIDO APENAS NA VISÃO ADM */}
                    {userRole === 'ADMIN' && (
                      <p className="pt-2 border-t">
                        <strong className="text-slate-700">Valor da OS: </strong> 
                        <span className="text-emerald-600 font-bold text-sm">R$ {os.valor.toFixed(2)}</span>
                      </p>
                    )}
                  </div>

                  {/* CHECKLIST OPERACIONAL PARA O TÉCNICO */}
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs space-y-1">
                    <p className="font-bold text-slate-700">Checklist Obrigatório em Campo:</p>
                    <ul className="list-disc list-inside text-slate-600 space-y-0.5">
                      <li>Higienização com bolsa coletora e bactericida</li>
                      <li>Verificação de pressões no manifold digital</li>
                      <li>Teste de dreno e vazamentos com nitrogênio</li>
                    </ul>
                  </div>

                  <div className="pt-2 flex gap-3">
                    <button className="flex-1 bg-turquoise hover:bg-turquoise-hover text-navy font-bold py-2.5 rounded-xl text-xs transition-all cursor-pointer shadow">
                      Concluir Atendimento
                    </button>
                    <a 
                      href={`https://maps.google.com/?q=${encodeURIComponent(os.endereco)}`} 
                      target="_blank" 
                      className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-4 py-2.5 rounded-xl text-xs transition-all flex items-center justify-center"
                    >
                      Abrir Rota GPS
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 4. AGENDA AUTOMÁTICA */}
        {activeModule === 'AGENDA' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center border-b pb-4">
              <div>
                <h2 className="text-2xl font-extrabold text-navy">Módulo 4: Agenda Automática de Serviços</h2>
                <p className="text-xs text-slate-500">Calendário de instalações, manutenções e limpezas agendadas para a equipe técnica.</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
              <div className="flex justify-between items-center border-b pb-3">
                <h3 className="font-bold text-navy text-base flex items-center space-x-2">
                  <Calendar className="w-5 h-5 text-turquoise" />
                  <span>Compromissos Agendados (Novembro 2026)</span>
                </h3>
                <span className="bg-navy text-turquoise text-xs font-bold px-3 py-1 rounded-full">
                  {ordensServico.length} Agendamentos Ativos
                </span>
              </div>

              <div className="space-y-3">
                {ordensServico.map((item, idx) => (
                  <div key={idx} className="border border-slate-200 rounded-xl p-4 bg-slate-50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="bg-turquoise/20 text-navy text-xs font-mono font-bold px-2 py-0.5 rounded">{item.dataAgendamento}</span>
                        <h4 className="font-bold text-navy text-sm">{item.cliente}</h4>
                      </div>
                      <p className="text-xs text-slate-600">{item.servico} — <span className="text-slate-400">{item.equipamento}</span></p>
                    </div>

                    <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full">
                      Confirmado na Agenda
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 5. CAIXA & LUCRO REAL (EXCLUSIVO ADM) */}
        {activeModule === 'FINANCEIRO' && userRole === 'ADMIN' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center border-b pb-4">
              <div>
                <h2 className="text-2xl font-extrabold text-navy">Módulo 5: Caixa & Lucro Real</h2>
                <p className="text-xs text-slate-500">Apuramento em tempo real de entradas de OS, dedução de insumos e margem líquida.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
                <span className="text-xs font-bold text-slate-500 uppercase">Entrada Total de OS</span>
                <p className="text-3xl font-black text-navy">R$ {totalEntradaFaturamento.toFixed(2)}</p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
                <span className="text-xs font-bold text-slate-500 uppercase">Saídas & Combustível</span>
                <p className="text-3xl font-black text-rose-600">R$ 680,00</p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
                <span className="text-xs font-bold text-slate-500 uppercase">Lucro Líquido Real</span>
                <p className="text-3xl font-black text-emerald-600">R$ {(totalEntradaFaturamento - 680).toFixed(2)}</p>
              </div>
            </div>
          </div>
        )}

        {/* 6. ASSISTENTE TÉCNICO DE ERROS */}
        {activeModule === 'ASSISTENTE' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center border-b pb-4">
              <div>
                <h2 className="text-2xl font-extrabold text-navy">Módulo 6: Assistente Técnico Inteligente</h2>
                <p className="text-xs text-slate-500">Consulte códigos de erro de ar-condicionado e geladeiras diretamente no atendimento.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-3">
                <div className="flex justify-between items-center border-b pb-2">
                  <span className="font-bold text-xs text-slate-500">Fujitsu Inverter</span>
                  <span className="bg-rose-100 text-rose-800 font-mono font-black text-xs px-2 py-0.5 rounded">E6 / 00</span>
                </div>
                <h4 className="font-bold text-navy text-sm">Erro de Comunicação</h4>
                <p className="text-xs text-slate-600">Verificar tensão no terminal de interligação (L/N) e continuidade dos cabos de sinal.</p>
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-3">
                <div className="flex justify-between items-center border-b pb-2">
                  <span className="font-bold text-xs text-slate-500">Midea / Carrier</span>
                  <span className="bg-rose-100 text-rose-800 font-mono font-black text-xs px-2 py-0.5 rounded">EC</span>
                </div>
                <h4 className="font-bold text-navy text-sm">Vazamento de Gás</h4>
                <p className="text-xs text-slate-600">Verificar pressões com manifold no campo. Realizar teste de estanqueidade com Nitrogênio.</p>
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-3">
                <div className="flex justify-between items-center border-b pb-2">
                  <span className="font-bold text-xs text-slate-500">Geladeira Brastemp</span>
                  <span className="bg-rose-100 text-rose-800 font-mono font-black text-xs px-2 py-0.5 rounded">Erro F1</span>
                </div>
                <h4 className="font-bold text-navy text-sm">Falha no Sensor NTC</h4>
                <p className="text-xs text-slate-600">Verificar chicote do sensor de temperatura no congelador ou substituir o sensor.</p>
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  )
}
