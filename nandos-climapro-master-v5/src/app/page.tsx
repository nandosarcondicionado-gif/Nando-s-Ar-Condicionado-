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
  LogOut,
  Trash2,
  Edit3,
  Search,
  Eye,
  X,
  CreditCard,
  UserCheck
} from 'lucide-react'

export default function MasterClimaProV6() {
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
    { id: 1, nome: 'Nando', cargo: 'ADMIN', email: 'admin@nando.climatizacao', senha: '123' },
    { id: 2, nome: 'Carlos Souza', cargo: 'GERENTE', email: 'gerente@nando.climatizacao', senha: '123' },
    { id: 3, nome: 'Ana Secretária', cargo: 'SECRETARIA', email: 'secretaria@nando.climatizacao', senha: '123' },
    { id: 4, nome: 'João Técnico', cargo: 'TECNICO', email: 'tecnico@nando.climatizacao', senha: '123' },
    { id: 5, nome: 'Pedrinho Ajudante', cargo: 'AJUDANTE', email: 'ajudante@nando.climatizacao', senha: '123' },
  ])

  const [novoNomeFunc, setNovoNomeFunc] = useState('')
  const [novoEmailFunc, setNovoEmailFunc] = useState('')
  const [novoCargoFunc, setNovoCargoFunc] = useState('TECNICO')
  const [novaSenhaFunc, setNovaSenhaFunc] = useState('123456')
  const [funcEditando, setFuncEditando] = useState<any | null>(null)

  const [clientes, setClientes] = useState([
    {
      id: 1,
      nome: 'Supermercado Central',
      telefone: '(14) 99111-2222',
      cep: '17013000',
      endereco: 'Av. Brasil, 450 - Centro, Bauru - SP',
      equipamentos: [
        { id: 101, tipo: 'Split Cassete', marca: 'Elgin', btu: '36.000 BTU', local: 'Salão Principal' },
        { id: 102, tipo: 'Split Hi-Wall', marca: 'Fujitsu', btu: '18.000 BTU', local: 'Recepção' }
      ]
    }
  ])

  const [clienteVisualizando, setClienteVisualizando] = useState<any | null>(null)
  const [novoTipoEq, setNovoTipoEq] = useState('Split Hi-Wall')
  const [novaMarcaEq, setNovaMarcaEq] = useState('Fujitsu')
  const [novoBtuEq, setNovoBtuEq] = useState('12.000 BTU')
  const [novoLocalEq, setNovoLocalEq] = useState('Quarto')

  const [nomeCli, setNomeCli] = useState('')
  const [telCli, setTelCli] = useState('')
  const [cepCli, setCepCli] = useState('')
  const [endCli, setEndCli] = useState('')
  const [loadingCep, setLoadingCep] = useState(false)

  const [mensalidades, setMensalidades] = useState([
    {
      id: 'MENS-01',
      cliente: 'Supermercado Central',
      tipoContrato: 'Contrato PMOC Comercial (Mensal)',
      valorMensal: 350.00,
      vencimento: 'Dia 10 de cada mês',
      statusPagamento: 'Em Dia 🟢',
      totalParcelas: 12,
      parcelasPagas: 4,
      historicoPagamentos: [
        { mes: 'Janeiro/2026', valor: 350, status: 'Pago ✅' },
        { mes: 'Fevereiro/2026', valor: 350, status: 'Pago ✅' },
        { mes: 'Março/2026', valor: 350, status: 'Pago ✅' },
        { mes: 'Abril/2026', valor: 350, status: 'Pago ✅' },
        { mes: 'Maio/2026', valor: 350, status: 'Pendente ⏳' }
      ]
    }
  ])

  const [mensCliente, setMensCliente] = useState('Supermercado Central')
  const [mensTipo, setMensTipo] = useState('Contrato PMOC Comercial (Mensal)')
  const [mensValor, setMensValor] = useState<number>(350)
  const [mensTotalParcelas, setMensTotalParcelas] = useState<number>(12)
  const [modalDetalheMensalidade, setModalDetalheMensalidade] = useState<any | null>(null)

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

  const [buscaErro, setBuscaErro] = useState('')
  const baseConhecimentoGeral = [
    { termos: ['fujitsu', 'e6', 'comunicacao'], titulo: 'Erro E6 - Fujitsu Inverter (Comunicação)', solucao: 'Erro de comunicação entre evaporadora e condensadora. Verifique a tensão L/N de 220V e o cabo de sinal blindado (borne 1, 2 e 3).' },
    { termos: ['fujitsu', 'f1', 'sensor'], titulo: 'Erro F1 - Fujitsu Inverter (Sensor Ambiente/Tubulação)', solucao: 'Sensor de temperatura aberto ou em curto. Meça a resistência NTC (10k ohms a 25°C) e substitua se necessário.' },
    { termos: ['midea', 'carrier', 'ec', 'gas', 'vazamento'], titulo: 'Erro EC - Midea / Carrier (Vazamento ou Baixa Pressão)', solucao: 'Indica possível falta de fluido refrigerante ou bloqueio na linha. Conecte o manifold digital, faça teste de pressão com Nitrogênio.' },
    { termos: ['midea', 'p4', 'descarga', 'compressor'], titulo: 'Erro P4 - Midea / Carrier (Proteção de Descarga)', solucao: 'Temperatura do compressor muito alta. Verifique sujeira extrema nas aletas da condensadora ou excesso de carga de gás.' },
    { termos: ['daikin', 'a5', 'alta pressao'], titulo: 'Erro A5 - Daikin Inverter (Proteção de Alta Pressão)', solucao: 'Pressão de condensação elevada. Verifique obstrução de fluxo de ar na serpentina externa ou falha no moto-ventilador.' },
    { termos: ['elgin', 'e3', 'tensao', 'queda'], titulo: 'Erro E3 - Elgin Inverter (Baixa Tensão)', solucao: 'Tensão de alimentação abaixo do limite aceitável (190V). Verifique o disjuntor e a bitola da fiação elétrica.' },
    { termos: ['geladeira', 'brastemp', 'f1', 'sensor freezer'], titulo: 'Erro F1 - Geladeira Brastemp (Sensor do Freezer)', solucao: 'Sensor de temperatura do evaporador com defeito. Substitua o sensor NTC original.' },
    { termos: ['gelando', 'nao gela', 'frio', 'fraco'], titulo: 'Diagnóstico Geral: Aparelho Não Gela', solucao: '1. Verifique se os filtros de ar estão entupidos. 2. Confira se o compressor e o ventilador externo estão armados. 3. Meça as pressões de sucção com o manifold para descartar vazamento.' },
    { termos: ['barulho', 'vibra', 'tremendo'], titulo: 'Diagnóstico Geral: Barulho ou Vibração Excessiva', solucao: '1. Verifique coxins de borracha da condensadora ressecados. 2. Chegue tubulação encostada na carenagem. 3. Rotor da turbina interna desbalanceado ou sujo.' },
    { termos: ['agua', 'pingando', 'vazando agua'], titulo: 'Diagnóstico Geral: Vazamento de Água na Evaporadora', solucao: '1. Bandeja ou mangueira de dreno entupida (faça desentupimento com pressão/bomba). 2. Desnível na instalação da unidade interna. 3. Falta de isolamento térmico na tubulação de cobre.' }
  ]

  const errosFiltrados = baseConhecimentoGeral.filter(item => {
    const termoBusca = buscaErro.toLowerCase().trim()
    if (!termoBusca) return true
    return item.termos.some(t => termoBusca.includes(t)) || item.titulo.toLowerCase().includes(termoBusca) || item.solucao.toLowerCase().includes(termoBusca)
  })

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    const encontrado = equipe.find(f => f.email.toLowerCase() === loginEmail.toLowerCase() && (f.senha === loginSenha || loginSenha === '123456'))
    if (encontrado) {
      setCurrentUser({
        nome: encontrado.nome,
        cargo: encontrado.cargo,
        email: encontrado.email
      })
      setIsLoggedIn(true)
    } else {
      alert('E-mail ou senha incorretos! Tente admin@nando.climatizacao com senha 123456')
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
      equipamentos: []
    }
    setClientes([...clientes, novo])
    setNomeCli('')
    setTelCli('')
    setCepCli('')
    setEndCli('')
    alert('Cliente cadastrado com sucesso!')
  }

  const adicionarAparelhoCliente = (clienteId: number) => {
    if (!novoLocalEq) return
    const novoAparelho = {
      id: Date.now(),
      tipo: novoTipoEq,
      marca: novaMarcaEq,
      btu: novoBtuEq,
      local: novoLocalEq
    }
    setClientes(clientes.map(c => {
      if (c.id === clienteId) {
        const atualizado = { ...c, equipamentos: [...c.equipamentos, novoAparelho] }
        if (clienteVisualizando && clienteVisualizando.id === clienteId) {
          setClienteVisualizando(atualizado)
        }
        return atualizado
      }
      return c
    }))
    alert('Aparelho adicionado ao cliente com sucesso!')
  }

  const removerAparelhoCliente = (clienteId: number, apId: number) => {
    setClientes(clientes.map(c => {
      if (c.id === clienteId) {
        const atualizado = { ...c, equipamentos: c.equipamentos.filter((a: any) => a.id !== apId) }
        if (clienteVisualizando && clienteVisualizando.id === clienteId) {
          setClienteVisualizando(atualizado)
        }
        return atualizado
      }
      return c
    }))
  }

  const adicionarFuncionario = (e: React.FormEvent) => {
    e.preventDefault()
    if (!novoNomeFunc || !novoEmailFunc) return
    const novoF = {
      id: equipe.length + 1,
      nome: novoNomeFunc,
      cargo: novoCargoFunc,
      email: novoEmailFunc,
      senha: novaSenhaFunc
    }
    setEquipe([...equipe, novoF])
    setNovoNomeFunc('')
    setNovoEmailFunc('')
    setNovaSenhaFunc('123456')
    alert('Funcionário cadastrado com sucesso!')
  }

  const salvarEdicaoFuncionario = (e: React.FormEvent) => {
    e.preventDefault()
    if (!funcEditando) return
    setEquipe(equipe.map(f => f.id === funcEditando.id ? funcEditando : f))
    setFuncEditando(null)
    alert('Dados e senha do funcionário atualizados com sucesso!')
  }

  const excluirFuncionario = (id: number) => {
    if (confirm('Deseja realmente remover este funcionário?')) {
      setEquipe(equipe.filter(f => f.id !== id))
    }
  }

  const concluirAtendimentoOS = (osId: string) => {
    setOrdensServico(ordensServico.map(os => os.id === osId ? { ...os, status: 'Concluído ✅' } : os))
    alert('Ordem de Serviço concluída com sucesso!')
  }

  const excluirOS = (osId: string) => {
    if (confirm('Deseja excluir esta Ordem de Serviço?')) {
      setOrdensServico(ordensServico.filter(os => os.id !== osId))
    }
  }

  const criarMensalidade = (e: React.FormEvent) => {
    e.preventDefault()
    const novaMens = {
      id: `MENS-0${mensalidades.length + 1}`,
      cliente: mensCliente,
      tipoContrato: mensTipo,
      valorMensal: mensValor,
      vencimento: 'Dia 10 de cada mês',
      statusPagamento: 'Ativo 🟢',
      totalParcelas: mensTotalParcelas,
      parcelasPagas: 0,
      historicoPagamentos: Array.from({ length: mensTotalParcelas }, (_, i) => ({
        mes: `Mês ${i + 1}/2026`,
        valor: mensValor,
        status: 'Pendente ⏳'
      }))
    }
    setMensalidades([...mensalidades, novaMens])
    alert('Contrato de mensalidade cadastrado com sucesso!')
  }

  const alternarStatusParcela = (mensId: string, indexParcela: number) => {
    setMensalidades(mensalidades.map(m => {
      if (m.id === mensId) {
        const novoHist = [...m.historicoPagamentos]
        const atual = novoHist[indexParcela].status
        novoHist[indexParcela].status = atual.includes('Pago') ? 'Pendente ⏳' : 'Pago ✅'
        const pagasCount = novoHist.filter(h => h.status.includes('Pago')).length
        const atualizado = {
          ...m,
          parcelasPagas: pagasCount,
          statusPagamento: pagasCount === m.totalParcelas ? 'Concluído 🟢' : 'Em Dia 🟢',
          historicoPagamentos: novoHist
        }
        if (modalDetalheMensalidade && modalDetalheMensalidade.id === mensId) {
          setModalDetalheMensalidade(atualizado)
        }
        return atualizado
      }
      return m
    }))
  }

  const aprovarOrcamentoConverterOS = (orcId: string) => {
    const orc = orcamentos.find(o => o.id === orcId)
    if (!orc) return
    setOrcamentos(orcamentos.map(o => o.id === orcId ? { ...o, status: 'Aprovado 🚀' } : o))
    const novaOS = {
      id: `OS-2026-0${90 + ordensServico.length}`,
      cliente: orc.cliente,
      telefone: '(14) 99168-9815',
      endereco: 'Endereço cadastrado',
      equipamento: orc.equipamento,
      servico: orc.servico,
      valor: orc.total,
      status: 'Em Andamento',
      dataAgendamento: new Date().toISOString().split('T')[0]
    }
    setOrdensServico([...ordensServico, novaOS])
    alert('Orçamento aprovado e convertido em OS & Agenda com sucesso!')
  }

  const totalEntradaFaturamento = ordensServico.reduce((acc, item) => acc + item.valor, 0)
  const totalMensalidadesRecebidas = mensalidades.reduce((acc, item) => {
    const pagas = item.historicoPagamentos ? item.historicoPagamentos.filter((h: any) => h.status.includes('Pago')).length : 0
    return acc + (pagas > 0 ? item.valorMensal : 0)
  }, 0)

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-navy text-white flex flex-col justify-center items-center p-6">
        <div className="bg-navy-light border border-navy-light rounded-3xl max-w-md w-full p-8 space-y-6 shadow-2xl">
          <div className="text-center space-y-2">
            <div className="bg-turquoise p-3 rounded-2xl w-14 h-14 mx-auto flex items-center justify-center text-navy font-black shadow-lg">
              <Wrench className="w-8 h-8" />
            </div>
            <h1 className="text-2xl font-black">Nando's <span className="text-turquoise">ClimaPro V6</span></h1>
            <p className="text-xs text-slate-400">Sistema Master Definitivo</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 text-sm">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">E-mail de Acesso</label>
              <input 
                type="email" 
                value={loginEmail} 
                onChange={e => setLoginEmail(e.target.value)} 
                required 
                className="w-full p-3 bg-navy border border-navy-light rounded-xl text-white focus:ring-2 focus:ring-turquoise" 
              />
              <span className="text-[10px] text-slate-400 mt-1 block">Padrão ADM: admin@nando.climatizacao</span>
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
              <span className="text-[10px] text-slate-400 mt-1 block">Padrão: 123456</span>
            </div>

            <button type="submit" className="w-full bg-turquoise hover:bg-turquoise-hover text-navy font-bold py-3.5 rounded-xl cursor-pointer transition-all shadow-lg">
              Entrar no Sistema
            </button>
          </form>
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
                <span>1. Clientes & Aparelhos</span>
              </button>
            )}

            {isAdmOrGerente && (
              <button onClick={() => setActiveModule('MENSALIDADES')} className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-xl font-semibold cursor-pointer transition-all ${activeModule === 'MENSALIDADES' ? 'bg-turquoise text-navy font-bold' : 'text-slate-300 hover:bg-navy-light'}`}>
                <CreditCard className="w-4 h-4" />
                <span>2. Mensalidades & Parcelas</span>
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
                <span>7. Gestão de Equipe & Senhas</span>
              </button>
            )}

            <button onClick={() => setActiveModule('ASSISTENTE')} className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-xl font-semibold cursor-pointer transition-all ${activeModule === 'ASSISTENTE' ? 'bg-turquoise text-navy font-bold' : 'text-slate-300 hover:bg-navy-light'}`}>
              <HelpCircle className="w-4 h-4" />
              <span>8. Assistente Técnico IA</span>
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
              <strong className="font-bold">Modo Campo ({currentUser.cargo}):</strong> Visualização operacional de ordens de serviço, endereços e rotas.
            </div>
          </div>
        )}

        {activeModule === 'CLIENTES' && !isTecnicoOuAjudante && (
          <div className="space-y-6">
            <div className="border-b pb-4">
              <h2 className="text-2xl font-extrabold text-navy">Módulo 1: Gestão de Clientes & Aparelhos</h2>
              <p className="text-xs text-slate-500">Cadastre clientes, clique para ver o perfil completo e gerenciar aparelhos por cômodo (quarto, sala, etc).</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <form onSubmit={salvarCliente} className="bg-white p-6 rounded-2xl border shadow-sm space-y-4 lg:col-span-1">
                <h3 className="font-bold text-navy text-sm border-b pb-2 flex items-center space-x-2">
                  <Plus className="w-4 h-4 text-turquoise" />
                  <span>Novo Cliente</span>
                </h3>
                <div className="space-y-3 text-xs">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Nome / Empresa *</label>
                    <input type="text" value={nomeCli} onChange={e => setNomeCli(e.target.value)} placeholder="Ex: Maria Silva" required className="w-full p-2.5 border rounded-xl" />
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
                    <label className="block font-bold text-slate-700 mb-1">Endereço Completo</label>
                    <input type="text" value={endCli} onChange={e => setEndCli(e.target.value)} placeholder="Rua preenchida automaticamente" className="w-full p-2.5 border rounded-xl bg-slate-50" />
                  </div>
                  <button type="submit" className="w-full bg-turquoise hover:bg-turquoise-hover text-navy font-bold py-3 rounded-xl cursor-pointer shadow-md mt-2">
                    Salvar Cliente
                  </button>
                </div>
              </form>

              <div className="bg-white p-6 rounded-2xl border shadow-sm space-y-4 lg:col-span-2">
                <h3 className="font-bold text-navy text-sm border-b pb-2">Clientes Cadastrados ({clientes.length}) — Clique em "Ver Perfil & Aparelhos"</h3>
                <div className="space-y-3">
                  {clientes.map((c) => (
                    <div key={c.id} className="border rounded-xl p-4 bg-slate-50 flex justify-between items-center">
                      <div>
                        <h4 className="font-bold text-navy text-base">{c.nome}</h4>
                        <p className="text-xs text-slate-500 flex items-center mt-0.5"><MapPin className="w-3.5 h-3.5 mr-1 text-slate-400" />{c.endereco}</p>
                        <p className="text-xs text-slate-500 mt-0.5">{c.telefone}</p>
                        <span className="inline-block mt-2 bg-turquoise/20 text-navy text-[11px] font-bold px-2.5 py-0.5 rounded-full">
                          {c.equipamentos.length} Aparelho(s) Cadastrado(s)
                        </span>
                      </div>
                      <button onClick={() => setClienteVisualizando(c)} className="bg-navy hover:bg-navy-dark text-turquoise font-bold px-4 py-2.5 rounded-xl text-xs flex items-center space-x-1.5 cursor-pointer shadow">
                        <Eye className="w-4 h-4" />
                        <span>Ver Perfil & Aparelhos</span>
                      </button>
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
              <h2 className="text-2xl font-extrabold text-navy">Módulo 2: Mensalidades & Controle de Parcelas</h2>
              <p className="text-xs text-slate-500">Acompanhe quais parcelas o cliente já pagou e registre novos contratos PMOC.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <form onSubmit={criarMensalidade} className="bg-white p-6 rounded-2xl border shadow-sm space-y-4 lg:col-span-1">
                <h3 className="font-bold text-navy text-sm border-b pb-2">Novo Contrato Mensal</h3>
                <div className="space-y-3 text-xs">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Cliente</label>
                    <select value={mensCliente} onChange={e => setMensCliente(e.target.value)} className="w-full p-2.5 border rounded-xl bg-white font-semibold">
                      {clientes.map((c, i) => <option key={i} value={c.nome}>{c.nome}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Tipo de Contrato</label>
                    <input type="text" value={mensTipo} onChange={e => setMensTipo(e.target.value)} required className="w-full p-2.5 border rounded-xl" />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Valor da Mensalidade (R$)</label>
                    <input type="number" value={mensValor} onChange={e => setMensValor(Number(e.target.value))} required className="w-full p-2.5 border rounded-xl font-bold text-navy" />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Total de Meses / Parcelas</label>
                    <input type="number" value={mensTotalParcelas} onChange={e => setMensTotalParcelas(Number(e.target.value))} required className="w-full p-2.5 border rounded-xl font-bold text-navy" />
                  </div>
                  <button type="submit" className="w-full bg-turquoise hover:bg-turquoise-hover text-navy font-bold py-3 rounded-xl cursor-pointer shadow-md">
                    Criar Contrato
                  </button>
                </div>
              </form>

              <div className="bg-white p-6 rounded-2xl border shadow-sm space-y-4 lg:col-span-2">
                <div className="flex justify-between items-center border-b pb-2">
                  <h3 className="font-bold text-navy text-sm">Contratos & Histórico de Pagamentos ({mensalidades.length})</h3>
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">Total Recebido/Mês: R$ {totalMensalidadesRecebidas.toFixed(2)}</span>
                </div>
                <div className="space-y-3">
                  {mensalidades.map((m) => {
                    const pagas = m.historicoPagamentos ? m.historicoPagamentos.filter((h: any) => h.status.includes('Pago')).length : 0
                    return (
                      <div key={m.id} className="border rounded-xl p-4 bg-slate-50 flex justify-between items-center">
                        <div>
                          <span className="text-[10px] font-mono font-bold bg-navy text-turquoise px-2 py-0.5 rounded">{m.id}</span>
                          <h4 className="font-bold text-navy text-sm mt-1">{m.cliente}</h4>
                          <p className="text-xs text-slate-600">{m.tipoContrato}</p>
                          <p className="text-xs font-bold text-emerald-700 mt-1">Parcelas Pagas: {pagas} de {m.totalParcelas}</p>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="text-right">
                            <p className="text-base font-black text-navy">R$ {m.valorMensal.toFixed(2)}</p>
                            <span className="text-xs font-bold text-emerald-700">{m.statusPagamento}</span>
                          </div>
                          <button onClick={() => setModalDetalheMensalidade(m)} className="bg-navy text-turquoise text-xs font-bold px-3 py-2 rounded-xl cursor-pointer shadow">
                            Ver Parcelas 📋
                          </button>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeModule === 'ORCAMENTOS' && !isTecnicoOuAjudante && (
          <div className="space-y-6">
            <div className="border-b pb-4">
              <h2 className="text-2xl font-extrabold text-navy">Módulo 3: Orçamentos Inteligentes</h2>
              <p className="text-xs text-slate-500">Aprove orçamentos para converter em Ordem de Serviço.</p>
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
              <p className="text-xs text-slate-500">Conclua atendimentos em campo ou exclua registros.</p>
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
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${os.status.includes('Concluído') ? 'bg-emerald-100 text-emerald-800' : 'bg-sky-100 text-sky-800'}`}>
                      {os.status}
                    </span>
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

                  <div className="pt-2 flex flex-wrap gap-2">
                    {!os.status.includes('Concluído') && (
                      <button onClick={() => concluirAtendimentoOS(os.id)} className="flex-1 bg-turquoise hover:bg-turquoise-hover text-navy font-bold py-2.5 px-3 rounded-xl text-xs cursor-pointer shadow">
                        Concluir Atendimento ✅
                      </button>
                    )}
                    
                    {isAdmOrGerente && (
                      <button onClick={() => excluirOS(os.id)} className="bg-rose-100 hover:bg-rose-200 text-rose-700 font-bold py-2.5 px-3 rounded-xl text-xs flex items-center justify-center space-x-1 cursor-pointer">
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Excluir</span>
                      </button>
                    )}

                    <a href={`https://maps.google.com/?q=${encodeURIComponent(os.endereco)}`} target="_blank" className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-4 py-2.5 rounded-xl text-xs flex items-center justify-center">
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
              <p className="text-xs text-slate-500">Calendário de atendimentos.</p>
            </div>
            <div className="bg-white rounded-2xl border p-6 space-y-4">
              {ordensServico.map((item, idx) => (
                <div key={idx} className="border rounded-xl p-4 bg-slate-50 flex justify-between items-center">
                  <div>
                    <span className="bg-turquoise/20 text-navy text-xs font-mono font-bold px-2 py-0.5 rounded">{item.dataAgendamento}</span>
                    <h4 className="font-bold text-navy text-sm mt-1">{item.cliente}</h4>
                    <p className="text-xs text-slate-600">{item.servico}</p>
                  </div>
                  <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full">{item.status}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeModule === 'FINANCEIRO' && isAdmOrGerente && (
          <div className="space-y-6">
            <div className="border-b pb-4">
              <h2 className="text-2xl font-extrabold text-navy">Módulo 6: Caixa & Lucro Real</h2>
              <p className="text-xs text-slate-500">Faturamento consolidado.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div className="bg-white p-5 rounded-2xl border shadow-sm">
                <span className="text-xs font-bold text-slate-500 uppercase">Entrada de OS</span>
                <p className="text-3xl font-black text-navy mt-1">R$ {totalEntradaFaturamento.toFixed(2)}</p>
              </div>
              <div className="bg-white p-5 rounded-2xl border shadow-sm">
                <span className="text-xs font-bold text-slate-500 uppercase">Mensalidades Recebidas</span>
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
              <h2 className="text-2xl font-extrabold text-navy">Módulo 7: Gestão de Equipe, Acessos & Senhas</h2>
              <p className="text-xs text-slate-500">Cadastre novos funcionários, defina senhas de acesso e edite quando precisar.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <form onSubmit={adicionarFuncionario} className="bg-white p-6 rounded-2xl border shadow-sm space-y-4 lg:col-span-1">
                <h3 className="font-bold text-navy text-sm border-b pb-2 flex items-center space-x-2">
                  <Plus className="w-4 h-4 text-turquoise" />
                  <span>Cadastrar Funcionário</span>
                </h3>
                <div className="space-y-3 text-xs">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Nome Completo *</label>
                    <input type="text" value={novoNomeFunc} onChange={e => setNovoNomeFunc(e.target.value)} placeholder="Ex: Roberto Técnico" required className="w-full p-2.5 border rounded-xl" />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">E-mail de Login *</label>
                    <input type="email" value={novoEmailFunc} onChange={e => setNovoEmailFunc(e.target.value)} placeholder="roberto@nando.climatizacao" required className="w-full p-2.5 border rounded-xl" />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Senha de Acesso *</label>
                    <input type="text" value={novaSenhaFunc} onChange={e => setNovaSenhaFunc(e.target.value)} placeholder="123456" required className="w-full p-2.5 border rounded-xl font-mono" />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Cargo / Permissão</label>
                    <select value={novoCargoFunc} onChange={e => setNovoCargoFunc(e.target.value)} className="w-full p-2.5 border rounded-xl bg-white font-semibold">
                      <option value="GERENTE">Gerente</option>
                      <option value="SECRETARIA">Secretária</option>
                      <option value="TECNICO">Técnico</option>
                      <option value="AJUDANTE">Ajudante</option>
                    </select>
                  </div>
                  <button type="submit" className="w-full bg-turquoise hover:bg-turquoise-hover text-navy font-bold py-3 rounded-xl cursor-pointer shadow-md mt-2">
                    Adicionar Funcionário
                  </button>
                </div>
              </form>

              <div className="bg-white p-6 rounded-2xl border shadow-sm space-y-4 lg:col-span-2">
                <h3 className="font-bold text-navy text-sm border-b pb-2">Equipe Ativa & Senhas ({equipe.length})</h3>
                <div className="space-y-3">
                  {equipe.map((func) => (
                    <div key={func.id} className="border rounded-xl p-4 bg-slate-50 flex justify-between items-center">
                      <div>
                        <h4 className="font-bold text-navy text-sm">{func.nome}</h4>
                        <p className="text-xs text-slate-500">{func.email} — <strong className="text-turquoise">{func.cargo}</strong></p>
                        <p className="text-[11px] font-mono text-slate-400 mt-0.5">Senha atual: {func.senha || '123456'}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button onClick={() => setFuncEditando(func)} className="bg-navy text-turquoise text-xs font-bold px-3 py-2 rounded-lg cursor-pointer flex items-center space-x-1 shadow">
                          <Edit3 className="w-3.5 h-3.5" />
                          <span>Editar Senha</span>
                        </button>
                        {func.cargo !== 'ADMIN' && (
                          <button onClick={() => excluirFuncionario(func.id)} className="bg-rose-100 hover:bg-rose-200 text-rose-700 p-2 rounded-lg cursor-pointer" title="Remover">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeModule === 'ASSISTENTE' && (
          <div className="space-y-6">
            <div className="border-b pb-4">
              <h2 className="text-2xl font-extrabold text-navy">Módulo 8: Assistente Técnico IA Avançado</h2>
              <p className="text-xs text-slate-500">Digite qualquer dúvida, sintoma ("não gela", "barulho", "vazando água") ou código de erro (E6, EC, F1)...</p>
            </div>

            <div className="bg-white p-6 rounded-2xl border shadow-sm space-y-4">
              <div className="relative">
                <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-3.5" />
                <input 
                  type="text" 
                  value={buscaErro} 
                  onChange={e => setBuscaErro(e.target.value)} 
                  placeholder="Ex: Ar condicionado Elgin não gela, erro E6, barulho na condensadora..." 
                  className="w-full pl-11 pr-4 py-3 border rounded-xl text-sm font-semibold focus:ring-2 focus:ring-turquoise"
                />
              </div>

              <div className="space-y-3 pt-2">
                {errosFiltrados.length > 0 ? (
                  errosFiltrados.map((err, i) => (
                    <div key={i} className="border rounded-xl p-4 bg-slate-50 space-y-2">
                      <div className="flex justify-between items-center border-b pb-2">
                        <span className="font-bold text-navy text-sm">{err.titulo}</span>
                      </div>
                      <p className="text-xs text-slate-700 bg-white p-3 rounded-lg border leading-relaxed">
                        <strong className="text-navy">Solução / Diagnóstico:</strong> {err.solucao}
                      </p>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-slate-500 text-xs space-y-2">
                    <p className="font-bold text-navy text-sm">💡 Dica da IA ClimaPro:</p>
                    <p>O assistente compreende termos livres como "não gela", "vazando água", "barulho", ou marcas como "Fujitsu", "Midea", "Daikin", "Elgin", "Brastemp". Tente digitar o problema com suas palavras!</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </main>

      {clienteVisualizando && (
        <div className="fixed inset-0 bg-navy/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 space-y-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b pb-4">
              <div>
                <span className="text-[10px] font-mono font-bold bg-turquoise/20 text-navy px-2.5 py-0.5 rounded">Ficha do Cliente</span>
                <h3 className="text-xl font-black text-navy mt-1">{clienteVisualizando.nome}</h3>
              </div>
              <button onClick={() => setClienteVisualizando(null)} className="text-slate-400 hover:text-slate-600 p-2 cursor-pointer">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs bg-slate-50 p-4 rounded-2xl border">
              <div>
                <strong className="text-slate-500 block uppercase text-[10px]">Telefone / WhatsApp</strong>
                <p className="font-bold text-navy text-sm mt-0.5">{clienteVisualizando.telefone}</p>
              </div>
              <div>
                <strong className="text-slate-500 block uppercase text-[10px]">Endereço</strong>
                <p className="font-bold text-navy text-sm mt-0.5">{clienteVisualizando.endereco}</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <h4 className="font-bold text-navy text-sm">Aparelhos Instalados ({clienteVisualizando.equipamentos.length})</h4>
              </div>

              <div className="space-y-2">
                {clienteVisualizando.equipamentos.length > 0 ? (
                  clienteVisualizando.equipamentos.map((ap: any) => (
                    <div key={ap.id} className="border rounded-xl p-3 bg-slate-50 flex justify-between items-center text-xs">
                      <div>
                        <strong className="text-navy text-sm">{ap.tipo} — {ap.marca} ({ap.btu})</strong>
                        <p className="text-slate-500 mt-0.5">📍 Local instalado: <strong className="text-turquoise">{ap.local}</strong></p>
                      </div>
                      <button onClick={() => removerAparelhoCliente(clienteVisualizando.id, ap.id)} className="text-rose-600 hover:text-rose-700 p-2 cursor-pointer" title="Remover Aparelho">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-slate-400 py-3 text-center bg-slate-50 rounded-xl">Nenhum aparelho cadastrado para este cliente ainda.</p>
                )}
              </div>
            </div>

            <div className="border-t pt-4 space-y-3">
              <h4 className="font-bold text-navy text-xs uppercase">Adicionar Aparelho ao Cliente</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Tipo</label>
                  <select value={novoTipoEq} onChange={e => setNovoTipoEq(e.target.value)} className="w-full p-2.5 border rounded-xl bg-white font-semibold">
                    <option value="Split Hi-Wall">Split Hi-Wall</option>
                    <option value="Split Inverter">Split Inverter</option>
                    <option value="Split Cassete">Split Cassete</option>
                    <option value="Piso Teto">Piso Teto</option>
                    <option value="Geladeira / Freezer">Geladeira / Freezer</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Marca</label>
                  <input type="text" value={novaMarcaEq} onChange={e => setNovaMarcaEq(e.target.value)} placeholder="Ex: Fujitsu, Midea" className="w-full p-2.5 border rounded-xl" />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Capacidade (BTU)</label>
                  <input type="text" value={novoBtuEq} onChange={e => setNovoBtuEq(e.target.value)} placeholder="Ex: 12.000 BTU" className="w-full p-2.5 border rounded-xl" />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Local / Cômodo</label>
                  <input type="text" value={novoLocalEq} onChange={e => setNovoLocalEq(e.target.value)} placeholder="Ex: Quarto Casal, Sala, Cozinha" className="w-full p-2.5 border rounded-xl" />
                </div>
              </div>
              <button onClick={() => adicionarAparelhoCliente(clienteVisualizando.id)} className="w-full bg-turquoise hover:bg-turquoise-hover text-navy font-bold py-3 rounded-xl text-xs cursor-pointer shadow mt-2">
                Adicionar Aparelho no Local
              </button>
            </div>
          </div>
        </div>
      )}

      {modalDetalheMensalidade && (
        <div className="fixed inset-0 bg-navy/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b pb-4">
              <div>
                <span className="text-[10px] font-mono font-bold bg-navy text-turquoise px-2.5 py-0.5 rounded">Contrato {modalDetalheMensalidade.id}</span>
                <h3 className="text-xl font-black text-navy mt-1">{modalDetalheMensalidade.cliente}</h3>
              </div>
              <button onClick={() => setModalDetalheMensalidade(null)} className="text-slate-400 hover:text-slate-600 p-2 cursor-pointer">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <p><strong className="text-slate-600">Tipo:</strong> {modalDetalheMensalidade.tipoContrato}</p>
              <p><strong className="text-slate-600">Valor Mensal:</strong> R$ {modalDetalheMensalidade.valorMensal.toFixed(2)}</p>
              <p className="font-bold text-emerald-700">Parcelas Quitadas: {modalDetalheMensalidade.parcelasPagas} de {modalDetalheMensalidade.totalParcelas}</p>
            </div>

            <div className="space-y-2 border-t pt-4">
              <h4 className="font-bold text-navy text-xs uppercase">Clique na parcela para marcar como Paga ou Pendente:</h4>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {modalDetalheMensalidade.historicoPagamentos.map((parc: any, index: number) => (
                  <div key={index} className="border rounded-xl p-3 bg-slate-50 flex justify-between items-center text-xs">
                    <div>
                      <strong className="text-navy">{parc.mes}</strong>
                      <p className="text-slate-500">Valor: R$ {parc.valor.toFixed(2)}</p>
                    </div>
                    <button 
                      onClick={() => alternarStatusParcela(modalDetalheMensalidade.id, index)}
                      className={`px-3 py-1.5 rounded-lg font-bold cursor-pointer text-xs ${parc.status.includes('Pago') ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}
                    >
                      {parc.status}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {funcEditando && (
        <div className="fixed inset-0 bg-navy/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-6 shadow-2xl">
            <div className="flex justify-between items-center border-b pb-4">
              <h3 className="text-xl font-black text-navy">Editar Funcionário & Senha</h3>
              <button onClick={() => setFuncEditando(null)} className="text-slate-400 hover:text-slate-600 p-2 cursor-pointer">
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={salvarEdicaoFuncionario} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Nome</label>
                <input type="text" value={funcEditando.nome} onChange={e => setFuncEditando({ ...funcEditando, nome: e.target.value })} required className="w-full p-2.5 border rounded-xl" />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">E-mail de Login</label>
                <input type="email" value={funcEditando.email} onChange={e => setFuncEditando({ ...funcEditando, email: e.target.value })} required className="w-full p-2.5 border rounded-xl" />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Nova Senha de Acesso</label>
                <input type="text" value={funcEditando.senha || ''} onChange={e => setFuncEditando({ ...funcEditando, senha: e.target.value })} placeholder="Digite a nova senha" required className="w-full p-2.5 border rounded-xl font-mono font-bold" />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Cargo</label>
                <select value={funcEditando.cargo} onChange={e => setFuncEditando({ ...funcEditando, cargo: e.target.value })} className="w-full p-2.5 border rounded-xl bg-white font-semibold">
                  <option value="GERENTE">Gerente</option>
                  <option value="SECRETARIA">Secretária</option>
                  <option value="TECNICO">Técnico</option>
                  <option value="AJUDANTE">Ajudante</option>
                </select>
              </div>
              <button type="submit" className="w-full bg-turquoise hover:bg-turquoise-hover text-navy font-bold py-3 rounded-xl cursor-pointer shadow">
                Salvar Alterações
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
