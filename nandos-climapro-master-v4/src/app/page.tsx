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
  Building2,
  Phone,
  Lock,
  UserCheck,
  CreditCard,
  Settings,
  LogOut,
  Briefcase
} from 'lucide-react'

export default function MasterClimaPro() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [currentUser, setCurrentUser] = useState({
    nome: 'Nando (Administrador)',
    cargo: 'ADMIN',
    email: 'admin@nando.climatizacao'
  })

  const [loginEmail, setLoginEmail] = useState('admin@nando.climatizacao')
  const [loginSenha, setLoginSenha] = useState('123456')

  const [activeModule, setActiveModule] = useState<'CLIENTES' | 'ORCAMENTOS' | 'OS' | 'AGENDA' | 'FINANCEIRO' | 'MENSALIDADES' | 'EQUIPE' | 'ASSISTENTE'>('CLIENTES')

  const [equipe, setEquipe] = useState([
    { id: 1, nome: 'Nando', cargo: 'ADMIN', email: 'admin@nando.climatizacao', permCaixa: true, permClientes: true, permOS: true },
    { id: 2, nome: 'Carlos Souza', cargo: 'GERENTE', email: 'gerente@nando.climatizacao', permCaixa: true, permClientes: true, permOS: true },
    { id: 3, nome: 'Ana Secretária', cargo: 'SECRETARIA', email: 'secretaria@nando.climatizacao', permCaixa: false, permClientes: true, permOS: true },
    { id: 4, nome: 'João Técnico', cargo: 'TECNICO', email: 'tecnico@nando.climatizacao', permCaixa: false, permClientes: false, permOS: true },
    { id: 5, nome: 'Pedrinho Ajudante', cargo: 'AJUDANTE', email: 'ajudante@nando.climatizacao', permCaixa: false, permClientes: false, permOS: true },
  ])

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

  const [mensalidades, setMensalidades] = useState([
    {
      id: 'MENS-01',
      cliente: 'Supermercado Central',
      tipoContrato: 'Contrato PMOC Comercial (Mensal)',
      valorMensal: 350.00,
      vencimento: 'Dia 10 de cada mês',
      statusPagamento: 'Em Dia 🟢'
    },
    {
      id: 'MENS-02',
      cliente: 'Escritório Bauru Contabilidade',
      tipoContrato: 'Manutenção Preventiva Trimestral',
      valorMensal: 200.00,
      vencimento: 'Dia 15 de cada mês',
      statusPagamento: 'Pendente ⏳'
    }
  ])

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

  const [nomeCli, setNomeCli] = useState('')
  const [telCli, setTelCli] = useState('')
  const [cepCli, setCepCli] = useState('')
  const [endCli, setEndCli] = useState('')
  const [eqTipo, setEqTipo] = useState('Split Hi-Wall')
  const [eqMarca, setEqMarca] = useState('Fujitsu')
  const [eqBtu, setEqBtu] = useState('12.000 BTU')
  const [eqLocal, setEqLocal] = useState('Quarto Principal')
  const [loadingCep, setLoadingCep] = useState(false)

  const [mensCliente, setMensCliente] = useState('Supermercado Central')
  const [mensTipo, setMensTipo] = useState('Contrato PMOC Comercial (Mensal)')
  const [mensValor, setMensValor] = useState<number>(300)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    const encontrado = equipe.find(f => f.email.toLowerCase() === loginEmail.toLowerCase())
    if (encontrado) {
      setCurrentUser({
        nome: encontrado.nome,
        cargo: encontrado.cargo,
        email: encontrado.email
      })
      setIsLoggedIn(true)
    } else {
      setCurrentUser({
        nome: 'Funcionário Autorizado',
        cargo: 'TECNICO',
        email: loginEmail
      })
      setIsLoggedIn(true)
    }
  }

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
    alert('Cliente cadastrado com sucesso!')
  }

  const criarMensalidade = (e: React.FormEvent) => {
    e.preventDefault()
    const novaMens = {
      id: `MENS-0${mensalidades.length + 1}`,
      cliente: mensCliente,
      tipoContrato: mensTipo,
      valorMensal: mensValor,
      vencimento: 'Dia 10 de cada mês',
      statusPagamento: 'Ativo 🟢'
    }
    setMensalidades([novaMens, ...mensalidades])
    alert('Contrato de mensalidade cadastrado com sucesso!')
  }

  const aprovarOrcamentoConverterOS = (orcId: string) => {
    const orc = orcamentos.find(o => o.id === orcId)
    if (!orc) return
    setOrcamentos(orcamentos.map(o => o.id === orcId ? { ...o, status: 'Aprovado 🚀' } : o))
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
    alert('Orçamento aprovado e convertido em OS & Agenda com sucesso!')
  }

  const totalEntradaFaturamento = ordensServico.reduce((acc, item) => acc + item.valor, 0)
  const totalMensalidadesRecebidas = mensalidades.reduce((acc, item) => acc + item.valorMensal, 0)

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-navy text-white flex flex-col justify-center items-center p-6">
        <div className="bg-navy-light border border-navy-light rounded-3xl max-w-md w-full p-8 space-y-6 shadow-2xl">
          <div className="text-center space-y-2">
            <div className="bg-turquoise p-3 rounded-2xl w-14 h-14 mx-auto flex items-center justify-center text-navy font-black shadow-lg">
              <Wrench className="w-8 h-8" />
            </div>
            <h1 className="text-2xl font-black">Nando's <span className="text-turquoise">ClimaPro</span></h1>
            <p className="text-xs text-slate-400">Sistema Master de Gestão e Acesso por Cargos</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 text-sm">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">E-mail de Acesso do Funcionário</label>
              <input 
                type="email" 
                value={loginEmail} 
                onChange={e => setLoginEmail(e.target.value)} 
                required 
                className="w-full p-3 bg-navy border border-navy-light rounded-xl text-white focus:ring-2 focus:ring-turquoise" 
              />
              <span className="text-[10px] text-slate-400 mt-1 block">Testes rápidos: admin@nando.climatizacao | tecnico@nando.climatizacao | secretaria@nando.climatizacao</span>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Senha</label>
              <input 
                type="password" 
                value={loginSenha} 
                onChange={e => setLoginSenha(e.target.value)} 
                required 
                className="w-full p-3 bg-navy border border-navy-light rounded-xl text-white focus:ring-2 focus:ring-turquoise" 
              />
            </div>

            <button type="submit" className="w-full bg-turquoise hover:bg-turquoise-hover text-navy font-bold py-3.5 rounded-xl cursor-pointer transition-all shadow-lg">
              Entrar no Sistema
            </button>
          </form>

          <div className="border-t border-navy-light pt-4 text-center text-xs text-slate-400">
            <p>Controle Hierárquico: ADM, Gerente, Secretária, Técnico e Ajudante.</p>
          </div>
        </div>
      </div>
    )
  }

  const isAdmOrGerente = currentUser.cargo === 'ADMIN' || currentUser.cargo === 'GERENTE'
  const isTecnicoOuAjudante = currentUser.cargo === 'TECNICO' || currentUser.cargo === 'AJUDANTE'

  return (
    <div className="min-h-screen bg-surface flex flex-col md:flex-row text-slate-900 font-sans">
      <aside className="bg-navy text-white w-full md:w-64 p-5 flex flex-col justify-between shrink-0 shadow-xl">
        <div className="space-y-6">
          <div className="flex items-center space-x-3 pb-3 border-b border-navy-light">
            <div className="bg-turquoise p-2.5 rounded-xl">
              <Wrench className="w-6 h-6 text-navy" />
            </div>
            <div>
              <h1 className="font-extrabold text-base tracking-tight">Nando's <span className="text-turquoise">ClimaPro</span></h1>
              <p className="text-[10px] text-slate-400">Logado: <strong className="text-turquoise">{currentUser.nome}</strong> ({currentUser.cargo})</p>
            </div>
          </div>

          <nav className="space-y-1.5 text-xs">
            {!isTecnicoOuAjudante && (
              <button onClick={() => setActiveModule('CLIENTES')} className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-xl font-semibold cursor-pointer transition-all ${activeModule === 'CLIENTES' ? 'bg-turquoise text-navy font-bold' : 'text-slate-300 hover:bg-navy-light'}`}>
                <Users className="w-4 h-4" />
                <span>1. Clientes & Equipamentos</span>
              </button>
            )}

            {isAdmOrGerente && (
              <button onClick={() => setActiveModule('MENSALIDADES')} className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-xl font-semibold cursor-pointer transition-all ${activeModule === 'MENSALIDADES' ? 'bg-turquoise text-navy font-bold' : 'text-slate-300 hover:bg-navy-light'}`}>
                <CreditCard className="w-4 h-4" />
                <span>2. Mensalidades & Contratos</span>
              </button>
            )}

            {!isTecnicoOuAjudante && (
              <button onClick={() => setActiveModule('ORCAMENTOS')} className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-xl font-semibold cursor-pointer transition-all ${activeModule === 'ORCAMENTOS' ? 'bg-turquoise text-navy font-bold' : 'text-slate-300 hover:bg-navy-light'}`}>
                <FileText className="w-4 h-4" />
                <span>3. Orçamentos & Aprovação</span>
              </button>
            )}

            <button onClick={() => setActiveModule('OS')} className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-xl font-semibold cursor-pointer transition-all ${activeModule === 'OS' ? 'bg-turquoise text-navy font-bold' : 'text-slate-300 hover:bg-navy-light'}`}>
              <Wrench className="w-4 h-4" />
              <span>4. Ordens de Serviço (OS)</span>
            </button>

            <button onClick={() => setActiveModule('AGENDA')} className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-xl font-semibold cursor-pointer transition-all ${activeModule === 'AGENDA' ? 'bg-turquoise text-navy font-bold' : 'text-slate-300 hover:bg-navy-light'}`}>
              <Calendar className="w-4 h-4" />
              <span>5. Agenda Automática</span>
            </button>

            {isAdmOrGerente && (
              <button onClick={() => setActiveModule('FINANCEIRO')} className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-xl font-semibold cursor-pointer transition-all ${activeModule === 'FINANCEIRO' ? 'bg-turquoise text-navy font-bold' : 'text-slate-300 hover:bg-navy-light'}`}>
                <DollarSign className="w-4 h-4" />
                <span>6. Caixa & Lucro Real</span>
              </button>
            )}

            {currentUser.cargo === 'ADMIN' && (
              <button onClick={() => setActiveModule('EQUIPE')} className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-xl font-semibold cursor-pointer transition-all ${activeModule === 'EQUIPE' ? 'bg-turquoise text-navy font-bold' : 'text-slate-300 hover:bg-navy-light'}`}>
                <UserCheck className="w-4 h-4" />
                <span>7. Gestão de Equipe & Acessos</span>
              </button>
            )}

            <button onClick={() => setActiveModule('ASSISTENTE')} className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-xl font-semibold cursor-pointer transition-all ${activeModule === 'ASSISTENTE' ? 'bg-turquoise text-navy font-bold' : 'text-slate-300 hover:bg-navy-light'}`}>
              <HelpCircle className="w-4 h-4" />
              <span>8. Assistente Técnico</span>
            </button>
          </nav>
        </div>

        <div className="pt-4 border-t border-navy-light text-xs space-y-2">
          <div className="flex justify-between items-center text-slate-300">
            <span>{currentUser.nome}</span>
            <button onClick={() => setIsLoggedIn(false)} className="text-rose-400 hover:text-rose-300 font-bold flex items-center space-x-1 cursor-pointer">
              <LogOut className="w-3.5 h-3.5" />
              <span>Sair</span>
            </button>
          </div>
        </div>
      </aside>

      <main className="flex-1 p-6 md:p-8 space-y-6 overflow-y-auto max-w-7xl mx-auto w-full">
        {isTecnicoOuAjudante && (
          <div className="bg-amber-50 border border-amber-200 text-amber-900 p-4 rounded-xl text-sm flex items-center space-x-3 shadow-sm">
            <ShieldCheck className="w-6 h-6 text-amber-600 shrink-0" />
            <div>
              <strong className="font-bold">Acesso Restrito ao Cargo ({currentUser.cargo}):</strong> Valores financeiros, caixa e margens de lucro estão protegidos. Você tem acesso operacional a endereços, agendamentos e checklists.
            </div>
          </div>
        )}

        {activeModule === 'CLIENTES' && !isTecnicoOuAjudante && (
          <div className="space-y-6">
            <div className="border-b pb-4">
              <h2 className="text-2xl font-extrabold text-navy">Módulo 1: Gestão de Clientes & Equipamentos</h2>
              <p className="text-xs text-slate-500">Busca automática ViaCEP e cadastro de aparelhos.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <form onSubmit={salvarCliente} className="bg-white p-6 rounded-2xl border shadow-sm space-y-4 lg:col-span-1">
                <h3 className="font-bold text-navy text-sm border-b pb-2 flex items-center space-x-2">
                  <Plus className="w-4 h-4 text-turquoise" />
                  <span>Cadastrar Novo Cliente</span>
                </h3>
                <div className="space-y-3 text-xs">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Nome / Empresa *</label>
                    <input type="text" value={nomeCli} onChange={e => setNomeCli(e.target.value)} placeholder="Ex: Supermercado Central" required className="w-full p-2.5 border rounded-xl" />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Telefone / WhatsApp *</label>
                    <input type="text" value={telCli} onChange={e => setTelCli(e.target.value)} placeholder="(14) 99168-9815" required className="w-full p-2.5 border rounded-xl" />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">CEP (Busca ViaCEP)</label>
                    <input type="text" maxLength={8} value={cepCli} onChange={e => handleBuscarCep(e.target.value)} placeholder="17013000" className="w-full p-2.5 border rounded-xl font-mono" />
                    {loadingCep && <span className="text-turquoise mt-1 block">Buscando endereço...</span>}
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Endereço</label>
                    <input type="text" value={endCli} onChange={e => setEndCli(e.target.value)} placeholder="Rua preenchida automaticamente" className="w-full p-2.5 border rounded-xl bg-slate-50" />
                  </div>
                  <button type="submit" className="w-full bg-turquoise hover:bg-turquoise-hover text-navy font-bold py-3 rounded-xl cursor-pointer shadow-md mt-2">
                    Salvar Cliente
                  </button>
                </div>
              </form>

              <div className="bg-white p-6 rounded-2xl border shadow-sm space-y-4 lg:col-span-2">
                <h3 className="font-bold text-navy text-sm border-b pb-2">Clientes Cadastrados ({clientes.length})</h3>
                <div className="space-y-3">
                  {clientes.map((c) => (
                    <div key={c.id} className="border rounded-xl p-4 bg-slate-50 space-y-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-bold text-navy text-base">{c.nome}</h4>
                          <p className="text-xs text-slate-500 flex items-center mt-0.5"><MapPin className="w-3.5 h-3.5 mr-1 text-slate-400" />{c.endereco}</p>
                          <p className="text-xs text-slate-500 mt-0.5 flex items-center"><Phone className="w-3.5 h-3.5 mr-1 text-slate-400" />{c.telefone}</p>
                        </div>
                        <span className="bg-turquoise/20 text-navy text-xs font-bold px-2.5 py-1 rounded-full">{c.equipamentos.length} Aparelho(s)</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeModule === 'MENSALIDADES' && isAdmOrGerente && (
          <div className="space-y-6">
            <div className="border-b pb-4">
              <h2 className="text-2xl font-extrabold text-navy">Módulo 2: Mensalidades & Contratos (PMOC / Manutenção)</h2>
              <p className="text-xs text-slate-500">Gerencie contratos de manutenção recorrente para empresas e clientes residenciais.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <form onSubmit={criarMensalidade} className="bg-white p-6 rounded-2xl border shadow-sm space-y-4 lg:col-span-1">
                <h3 className="font-bold text-navy text-sm border-b pb-2">Novo Contrato de Mensalidade</h3>
                <div className="space-y-3 text-xs">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Cliente / Empresa</label>
                    <select value={mensCliente} onChange={e => setMensCliente(e.target.value)} className="w-full p-2.5 border rounded-xl bg-white font-semibold">
                      {clientes.map((c, i) => <option key={i} value={c.nome}>{c.nome}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Tipo de Contrato</label>
                    <input type="text" value={mensTipo} onChange={e => setMensTipo(e.target.value)} required className="w-full p-2.5 border rounded-xl" />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Valor Mensal (R$)</label>
                    <input type="number" value={mensValor} onChange={e => setMensValor(Number(e.target.value))} required className="w-full p-2.5 border rounded-xl font-bold text-navy" />
                  </div>
                  <button type="submit" className="w-full bg-turquoise hover:bg-turquoise-hover text-navy font-bold py-3 rounded-xl cursor-pointer shadow-md">
                    Cadastrar Mensalidade
                  </button>
                </div>
              </form>

              <div className="bg-white p-6 rounded-2xl border shadow-sm space-y-4 lg:col-span-2">
                <div className="flex justify-between items-center border-b pb-2">
                  <h3 className="font-bold text-navy text-sm">Contratos Ativos ({mensalidades.length})</h3>
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">Recorrente Mensal: R$ {totalMensalidadesRecebidas.toFixed(2)}/mês</span>
                </div>
                <div className="space-y-3">
                  {mensalidades.map((m, idx) => (
                    <div key={idx} className="border rounded-xl p-4 bg-slate-50 flex justify-between items-center">
                      <div>
                        <span className="text-[10px] font-mono font-bold bg-navy text-turquoise px-2 py-0.5 rounded">{m.id}</span>
                        <h4 className="font-bold text-navy text-sm mt-1">{m.cliente}</h4>
                        <p className="text-xs text-slate-600">{m.tipoContrato} — Vencimento: {m.vencimento}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-base font-black text-navy">R$ {m.valorMensal.toFixed(2)}</p>
                        <span className="text-xs font-bold text-emerald-700">{m.statusPagamento}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeModule === 'ORCAMENTOS' && !isTecnicoOuAjudante && (
          <div className="space-y-6">
            <div className="border-b pb-4">
              <h2 className="text-2xl font-extrabold text-navy">Módulo 3: Orçamentos Inteligentes</h2>
              <p className="text-xs text-slate-500">Crie orçamentos, envie no WhatsApp e converta em Ordem de Serviço após aprovação.</p>
            </div>

            <div className="bg-white p-6 rounded-2xl border shadow-sm space-y-4">
              <h3 className="font-bold text-navy text-sm border-b pb-2">Orçamentos Emitidos</h3>
              <div className="space-y-3">
                {orcamentos.map((orc) => (
                  <div key={orc.id} className="border rounded-xl p-4 bg-slate-50 flex justify-between items-center">
                    <div>
                      <span className="text-[10px] font-mono font-bold bg-navy text-turquoise px-2 py-0.5 rounded">{orc.id}</span>
                      <h4 className="font-bold text-navy text-sm mt-1">{orc.cliente}</h4>
                      <p className="text-xs text-slate-600">{orc.servico}</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="font-bold text-navy">R$ {orc.total.toFixed(2)}</span>
                      {!orc.status.includes('Aprovado') ? (
                        <button onClick={() => aprovarOrcamentoConverterOS(orc.id)} className="bg-navy text-turquoise text-xs font-bold px-3 py-1.5 rounded-lg cursor-pointer">
                          Aprovar & Gerar OS 🚀
                        </button>
                      ) : (
                        <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2.5 py-1 rounded-full">Aprovado</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeModule === 'OS' && (
          <div className="space-y-6">
            <div className="border-b pb-4">
              <h2 className="text-2xl font-extrabold text-navy">Módulo 4: Ordens de Serviço (OS Dupla Segura)</h2>
              <p className="text-xs text-slate-500">Visão protegida para técnicos em campo e visão executiva para a administração.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {ordensServico.map((os) => (
                <div key={os.id} className="bg-white border rounded-2xl p-6 shadow-sm space-y-4">
                  <div className="flex justify-between items-start border-b pb-3">
                    <div>
                      <span className="text-[10px] font-mono font-bold text-turquoise bg-navy px-2 py-0.5 rounded">{os.id}</span>
                      <h3 className="font-bold text-navy text-base mt-1">{os.cliente}</h3>
                      <p className="text-xs text-slate-500 flex items-center mt-1"><MapPin className="w-3.5 h-3.5 mr-1 text-slate-400" />{os.endereco}</p>
                    </div>
                    <span className="bg-sky-100 text-sky-800 text-xs font-bold px-2.5 py-1 rounded-full">{os.status}</span>
                  </div>

                  <div className="space-y-2 text-xs">
                    <p><strong className="text-slate-700">Equipamento:</strong> {os.equipamento}</p>
                    <p><strong className="text-slate-700">Serviço:</strong> {os.servico}</p>
                    
                    {!isTecnicoOuAjudante && (
                      <p className="pt-2 border-t"><strong className="text-slate-700">Valor da OS: </strong> <span className="text-emerald-600 font-bold text-sm">R$ {os.valor.toFixed(2)}</span></p>
                    )}
                  </div>

                  <div className="bg-slate-50 p-3 rounded-xl border text-xs space-y-1">
                    <p className="font-bold text-slate-700">Checklist Obrigatório:</p>
                    <ul className="list-disc list-inside text-slate-600 space-y-0.5">
                      <li>Higienização com bolsa coletora e bactericida</li>
                      <li>Verificação de pressões no manifold digital</li>
                    </ul>
                  </div>

                  <div className="pt-2 flex gap-3">
                    <button className="flex-1 bg-turquoise hover:bg-turquoise-hover text-navy font-bold py-2.5 rounded-xl text-xs cursor-pointer shadow">
                      Concluir Atendimento
                    </button>
                    <a href={`https://maps.google.com/?q=${encodeURIComponent(os.endereco)}`} target="_blank" className="bg-slate-100 text-slate-700 font-bold px-4 py-2.5 rounded-xl text-xs flex items-center justify-center">
                      GPS
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeModule === 'AGENDA' && (
          <div className="space-y-6">
            <div className="border-b pb-4">
              <h2 className="text-2xl font-extrabold text-navy">Módulo 5: Agenda Automática de Serviços</h2>
              <p className="text-xs text-slate-500">Calendário de instalações e manutenções agendadas.</p>
            </div>
            <div className="bg-white rounded-2xl border p-6 space-y-4">
              {ordensServico.map((item, idx) => (
                <div key={idx} className="border rounded-xl p-4 bg-slate-50 flex justify-between items-center">
                  <div>
                    <span className="bg-turquoise/20 text-navy text-xs font-mono font-bold px-2 py-0.5 rounded">{item.dataAgendamento}</span>
                    <h4 className="font-bold text-navy text-sm mt-1">{item.cliente}</h4>
                    <p className="text-xs text-slate-600">{item.servico}</p>
                  </div>
                  <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full">Agendado</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeModule === 'FINANCEIRO' && isAdmOrGerente && (
          <div className="space-y-6">
            <div className="border-b pb-4">
              <h2 className="text-2xl font-extrabold text-navy">Módulo 6: Caixa & Lucro Real</h2>
              <p className="text-xs text-slate-500">Faturamento consolidado de OS e mensalidades de clientes/empresas.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div className="bg-white p-5 rounded-2xl border shadow-sm">
                <span className="text-xs font-bold text-slate-500 uppercase">Entrada de OS</span>
                <p className="text-3xl font-black text-navy mt-1">R$ {totalEntradaFaturamento.toFixed(2)}</p>
              </div>
              <div className="bg-white p-5 rounded-2xl border shadow-sm">
                <span className="text-xs font-bold text-slate-500 uppercase">Mensalidades Recorrentes</span>
                <p className="text-3xl font-black text-emerald-600 mt-1">R$ {totalMensalidadesRecebidas.toFixed(2)}</p>
              </div>
              <div className="bg-white p-5 rounded-2xl border shadow-sm">
                <span className="text-xs font-bold text-slate-500 uppercase">Faturamento Total</span>
                <p className="text-3xl font-black text-turquoise mt-1">R$ {(totalEntradaFaturamento + totalMensalidadesRecebidas).toFixed(2)}</p>
              </div>
            </div>
          </div>
        )}

        {activeModule === 'EQUIPE' && currentUser.cargo === 'ADMIN' && (
          <div className="space-y-6">
            <div className="border-b pb-4">
              <h2 className="text-2xl font-extrabold text-navy">Módulo 7: Gestão de Equipe & Permissões de Acesso</h2>
              <p className="text-xs text-slate-500">Configure quem é Administrador, Gerente, Secretária, Técnico ou Ajudante na Nando's ClimaPro.</p>
            </div>

            <div className="bg-white p-6 rounded-2xl border shadow-sm space-y-4">
              <h3 className="font-bold text-navy text-sm border-b pb-2">Funcionários Cadastrados & Cargos</h3>
              <div className="space-y-3">
                {equipe.map((func) => (
                  <div key={func.id} className="border rounded-xl p-4 bg-slate-50 flex justify-between items-center">
                    <div>
                      <h4 className="font-bold text-navy text-sm">{func.nome}</h4>
                      <p className="text-xs text-slate-500">{func.email} — <strong className="text-turquoise">{func.cargo}</strong></p>
                    </div>
                    <span className="bg-navy text-turquoise text-xs font-bold px-3 py-1 rounded-full">
                      Acesso Liberado
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeModule === 'ASSISTENTE' && (
          <div className="space-y-6">
            <div className="border-b pb-4">
              <h2 className="text-2xl font-extrabold text-navy">Módulo 8: Assistente Técnico Inteligente</h2>
              <p className="text-xs text-slate-500">Consulta de códigos de erro de ar-condicionado e geladeiras.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white border rounded-2xl p-5 shadow-sm space-y-2">
                <div className="flex justify-between font-bold text-sm">
                  <span>Fujitsu Inverter</span>
                  <span className="text-rose-600 bg-rose-50 px-2 py-0.5 rounded font-mono">E6</span>
                </div>
                <p className="text-xs text-slate-600">Erro de Comunicação entre Unidade Interna e Externa. Verificar tensão L/N e cabos de sinal.</p>
              </div>
              <div className="bg-white border rounded-2xl p-5 shadow-sm space-y-2">
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
