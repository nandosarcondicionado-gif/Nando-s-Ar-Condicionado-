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
  UserCheck,
  Package,
  Printer,
  Phone
} from 'lucide-react'

export default function MasterClimaProV7() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [currentUser, setCurrentUser] = useState({
    nome: 'Nando (Administrador)',
    cargo: 'ADMIN',
    email: 'admin@nando.climatizacao'
  })

  const [loginEmail, setLoginEmail] = useState('admin@nando.climatizacao')
  const [loginSenha, setLoginSenha] = useState('123456')

  const [activeModule, setActiveModule] = useState<'CLIENTES' | 'ESTOQUE' | 'ORCAMENTOS' | 'OS' | 'AGENDA' | 'FINANCEIRO' | 'MENSALIDADES' | 'EQUIPE' | 'ASSISTENTE'>('OS')

  // Equipe
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

  // Estoque de Peças & Materiais
  const [estoque, setEstoque] = useState([
    { id: 1, nome: 'Gás Refrigerante R410A (Kg)', quantidade: 15, precoUnitario: 80.00, codigo: 'GAS-R410' },
    { id: 2, nome: 'Capacitor 35uF 450V', quantidade: 8, precoUnitario: 45.00, codigo: 'CAP-35' },
    { id: 3, nome: 'Capacitor 45uF 450V', quantidade: 5, precoUnitario: 55.00, codigo: 'CAP-45' },
    { id: 4, nome: 'Placa Universal Inverter', quantidade: 3, precoUnitario: 220.00, codigo: 'PLC-INV' },
    { id: 5, nome: 'Tubulacao de Cobre 1/4 (Metros)', quantidade: 40, precoUnitario: 25.00, codigo: 'TUB-14' },
    { id: 6, nome: 'Tubulacao de Cobre 3/8 (Metros)', quantidade: 30, precoUnitario: 35.00, codigo: 'TUB-38' },
    { id: 7, nome: 'Sensor de Temperatura NTC 10k', quantidade: 12, precoUnitario: 20.00, codigo: 'SNS-10K' }
  ])

  const [novoNomePeca, setNovoNomePeca] = useState('')
  const [novoCodigoPeca, setNovoCodigoPeca] = useState('')
  const [novaQtdPeca, setNovaQtdPeca] = useState<number>(10)
  const [novoValorPeca, setNovoValorPeca] = useState<number>(50)
  const [pecaEditando, setPecaEditando] = useState<any | null>(null)

  // Clientes & Aparelhos
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

  // Mensalidades & Contratos PMOC
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

  // Orçamentos
  const [orcamentos, setOrcamentos] = useState([
    {
      id: 'ORC-2026-01',
      cliente: 'Supermercado Central',
      equipamento: 'Split Cassete Elgin 36.000 BTU',
      servico: 'Higienização Química Completa + Carga de Gás R410A',
      total: 620,
      status: 'Aguardando Aprovação'
    }
  ])

  const [orcCliente, setOrcCliente] = useState('Supermercado Central')
  const [orcEquipamento, setOrcEquipamento] = useState('Split Hi-Wall 12.000 BTU')
  const [orcServico, setOrcServico] = useState('Instalação Completa')
  const [orcValor, setOrcValor] = useState<number>(450)
  const [orcEditando, setOrcEditando] = useState<any | null>(null)

  // Ordens de Serviço (OS) com Vínculo de Peças e PDF
  const [ordensServico, setOrdensServico] = useState([
    {
      id: 'OS-2026-089',
      cliente: 'Supermercado Central',
      telefone: '(14) 99111-2222',
      endereco: 'Av. Brasil, 450 - Centro, Bauru - SP',
      equipamento: 'Split Cassete Elgin 36.000 BTU',
      servico: 'Higienização Química Completa + Carga de Gás R410A',
      valorServico: 450,
      pecasUtilizadas: [
        { pecaId: 1, nome: 'Gás Refrigerante R410A (Kg)', quantidade: 2, valorUnitario: 80.00, total: 160.00 }
      ],
      valorTotal: 610,
      status: 'Em Andamento',
      dataAgendamento: '2026-11-12'
    }
  ])

  const [osEditandoPecas, setOsEditandoPecas] = useState<any | null>(null)
  const [pecaSelecionadaId, setPecaSelecionadaId] = useState<number>(1)
  const [qtdPecaOS, setQtdPecaOS] = useState<number>(1)
  const [osParaPdf, setOsParaPdf] = useState<any | null>(null)

  // Assistente Técnico IA
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

  // Funções de Clientes & Aparelhos
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
    alert('Aparelho adicionado com sucesso!')
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

  // Funções de Estoque & Peças na OS
  const adicionarPecaEstoque = (e: React.FormEvent) => {
    e.preventDefault()
    if (!novoNomePeca) return
    const nova = {
      id: Date.now(),
      nome: novoNomePeca,
      codigo: novoCodigoPeca || `PEC-${estoque.length + 1}`,
      quantidade: Number(novaQtdPeca),
      precoUnitario: Number(novoValorPeca)
    }
    setEstoque([...estoque, nova])
    setNovoNomePeca('')
    setNovoCodigoPeca('')
    setNovaQtdPeca(10)
    setNovoValorPeca(50)
    alert('Item cadastrado no estoque!')
  }

  const salvarEdicaoEstoque = (e: React.FormEvent) => {
    e.preventDefault()
    if (!pecaEditando) return
    setEstoque(estoque.map(p => p.id === pecaEditando.id ? pecaEditando : p))
    setPecaEditando(null)
    alert('Estoque atualizado com sucesso!')
  }

  const excluirPecaEstoque = (id: number) => {
    if (confirm('Deseja remover este item?')) {
      setEstoque(estoque.filter(p => p.id !== id))
    }
  }

  const adicionarPecaNaOS = (osId: string) => {
    const pecaObj = estoque.find(p => p.id === Number(pecaSelecionadaId))
    if (!pecaObj) return

    if (pecaObj.quantidade < qtdPecaOS) {
      alert(`Quantidade insuficiente em estoque! Saldo atual: ${pecaObj.quantidade}`)
      return
    }

    setEstoque(estoque.map(p => p.id === pecaObj.id ? { ...p, quantidade: p.quantidade - qtdPecaOS } : p))

    setOrdensServico(ordensServico.map(os => {
      if (os.id === osId) {
        const itemExistente = os.pecasUtilizadas.find((p: any) => p.pecaId === pecaObj.id)
        let novasPecas = []
        if (itemExistente) {
          novasPecas = os.pecasUtilizadas.map((p: any) => p.pecaId === pecaObj.id ? {
            ...p,
            quantidade: p.quantidade + qtdPecaOS,
            total: (p.quantidade + qtdPecaOS) * p.valorUnitario
          } : p)
        } else {
          novasPecas = [...os.pecasUtilizadas, {
            pecaId: pecaObj.id,
            nome: pecaObj.nome,
            quantidade: qtdPecaOS,
            valorUnitario: pecaObj.precoUnitario,
            total: qtdPecaOS * pecaObj.precoUnitario
          }]
        }

        const totalPecas = novasPecas.reduce((acc: number, item: any) => acc + item.total, 0)
        const osAtualizada = {
          ...os,
          pecasUtilizadas: novasPecas,
          valorTotal: os.valorServico + totalPecas
        }

        if (osEditandoPecas && osEditandoPecas.id === osId) {
          setOsEditandoPecas(osAtualizada)
        }
        return osAtualizada
      }
      return os
    }))
    alert('Peça adicionada e baixa efetuada no estoque!')
  }

  const removerPecaDaOS = (osId: string, pecaId: number) => {
    setOrdensServico(ordensServico.map(os => {
      if (os.id === osId) {
        const pecaRemovida = os.pecasUtilizadas.find((p: any) => p.pecaId === pecaId)
        if (pecaRemovida) {
          setEstoque(estoque.map(p => p.id === pecaId ? { ...p, quantidade: p.quantidade + pecaRemovida.quantidade } : p))
        }
        const novasPecas = os.pecasUtilizadas.filter((p: any) => p.pecaId !== pecaId)
        const totalPecas = novasPecas.reduce((acc: number, item: any) => acc + item.total, 0)
        const osAtualizada = {
          ...os,
          pecasUtilizadas: novasPecas,
          valorTotal: os.valorServico + totalPecas
        }
        if (osEditandoPecas && osEditandoPecas.id === osId) {
          setOsEditandoPecas(osAtualizada)
        }
        return osAtualizada
      }
      return os
    }))
  }

  const concluirAtendimentoOS = (osId: string) => {
    setOrdensServico(ordensServico.map(os => os.id === osId ? { ...os, status: 'Concluído ✅' } : os))
    alert('Ordem de Serviço concluída!')
  }

  const excluirOS = (osId: string) => {
    if (confirm('Deseja excluir esta OS?')) {
      setOrdensServico(ordensServico.filter(os => os.id !== osId))
    }
  }

  // Mensalidades & Parcelas
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
    alert('Contrato cadastrado com sucesso!')
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

  // Orçamentos
  const criarOrcamento = (e: React.FormEvent) => {
    e.preventDefault()
    const novoOrc = {
      id: `ORC-2026-0${orcamentos.length + 1}`,
      cliente: orcCliente,
      equipamento: orcEquipamento,
      servico: orcServico,
      total: orcValor,
      status: 'Aguardando Aprovação'
    }
    setOrcamentos([...orcamentos, novoOrc])
    alert('Orçamento emitido com sucesso!')
  }

  const salvarEdicaoOrcamento = (e: React.FormEvent) => {
    e.preventDefault()
    if (!orcEditando) return
    setOrcamentos(orcamentos.map(o => o.id === orcEditando.id ? orcEditando : o))
    setOrcEditando(null)
    alert('Orçamento atualizado!')
  }

  const excluirOrcamento = (orcId: string) => {
    if (confirm('Excluir orçamento?')) {
      setOrcamentos(orcamentos.filter(o => o.id !== orcId))
    }
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
      valorServico: orc.total,
      pecasUtilizadas: [],
      valorTotal: orc.total,
      status: 'Em Andamento',
      dataAgendamento: new Date().toISOString().split('T')[0]
    }
    setOrdensServico([...ordensServico, novaOS])
    alert('Orçamento aprovado e convertido em OS!')
  }

  // Equipe
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
    alert('Funcionário cadastrado!')
  }

  const salvarEdicaoFuncionario = (e: React.FormEvent) => {
    e.preventDefault()
    if (!funcEditando) return
    setEquipe(equipe.map(f => f.id === funcEditando.id ? funcEditando : f))
    setFuncEditando(null)
    alert('Senha/Dados atualizados!')
  }

  const totalEntradaFaturamento = ordensServico.reduce((acc, item) => acc + item.valorTotal, 0)
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
            <h1 className="text-2xl font-black">Nando's <span className="text-turquoise">ClimaPro V7</span></h1>
            <p className="text-xs text-slate-400">Sistema Master Definitivo</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 text-sm">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">E-mail de Acesso</label>
              <input type="email" value={loginEmail} onChange={e => setLoginEmail(e.target.value)} required className="w-full p-3 bg-navy border rounded-xl text-white" />
              <span className="text-[10px] text-slate-400 mt-1 block">Padrão ADM: admin@nando.climatizacao</span>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Senha</label>
              <input type="password" value={loginSenha} onChange={e => setLoginSenha(e.target.value)} required className="w-full p-3 bg-navy border rounded-xl text-white" />
              <span className="text-[10px] text-slate-400 mt-1 block">Padrão: 123456</span>
            </div>
            <button type="submit" className="w-full bg-turquoise hover:bg-turquoise-hover text-navy font-bold py-3.5 rounded-xl cursor-pointer shadow-lg">
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
              <p className="text-[10px] text-slate-400">Logado: <strong className="text-turquoise">{currentUser.nome}</strong></p>
            </div>
          </div>

          <nav className="space-y-1.5 text-xs">
            <button onClick={() => setActiveModule('OS')} className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-xl font-semibold cursor-pointer ${activeModule === 'OS' ? 'bg-turquoise text-navy font-bold' : 'text-slate-300 hover:bg-navy-light'}`}>
              <Wrench className="w-4 h-4" />
              <span>1. Ordens de Serviço (OS)</span>
            </button>

            {isAdmOrGerente && (
              <button onClick={() => setActiveModule('ESTOQUE')} className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-xl font-semibold cursor-pointer ${activeModule === 'ESTOQUE' ? 'bg-turquoise text-navy font-bold' : 'text-slate-300 hover:bg-navy-light'}`}>
                <Package className="w-4 h-4" />
                <span>2. Estoque de Peças</span>
              </button>
            )}

            {!isTecnicoOuAjudante && (
              <button onClick={() => setActiveModule('CLIENTES')} className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-xl font-semibold cursor-pointer ${activeModule === 'CLIENTES' ? 'bg-turquoise text-navy font-bold' : 'text-slate-300 hover:bg-navy-light'}`}>
                <Users className="w-4 h-4" />
                <span>3. Clientes & Aparelhos</span>
              </button>
            )}

            {isAdmOrGerente && (
              <button onClick={() => setActiveModule('MENSALIDADES')} className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-xl font-semibold cursor-pointer ${activeModule === 'MENSALIDADES' ? 'bg-turquoise text-navy font-bold' : 'text-slate-300 hover:bg-navy-light'}`}>
                <CreditCard className="w-4 h-4" />
                <span>4. Mensalidades & Parcelas</span>
              </button>
            )}

            {!isTecnicoOuAjudante && (
              <button onClick={() => setActiveModule('ORCAMENTOS')} className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-xl font-semibold cursor-pointer ${activeModule === 'ORCAMENTOS' ? 'bg-turquoise text-navy font-bold' : 'text-slate-300 hover:bg-navy-light'}`}>
                <FileText className="w-4 h-4" />
                <span>5. Orçamentos & Edição</span>
              </button>
            )}

            <button onClick={() => setActiveModule('AGENDA')} className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-xl font-semibold cursor-pointer ${activeModule === 'AGENDA' ? 'bg-turquoise text-navy font-bold' : 'text-slate-300 hover:bg-navy-light'}`}>
              <Calendar className="w-4 h-4" />
              <span>6. Agenda Automática</span>
            </button>

            {isAdmOrGerente && (
              <button onClick={() => setActiveModule('FINANCEIRO')} className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-xl font-semibold cursor-pointer ${activeModule === 'FINANCEIRO' ? 'bg-turquoise text-navy font-bold' : 'text-slate-300 hover:bg-navy-light'}`}>
                <DollarSign className="w-4 h-4" />
                <span>7. Caixa & Faturamento</span>
              </button>
            )}

            {currentUser.cargo === 'ADMIN' && (
              <button onClick={() => setActiveModule('EQUIPE')} className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-xl font-semibold cursor-pointer ${activeModule === 'EQUIPE' ? 'bg-turquoise text-navy font-bold' : 'text-slate-300 hover:bg-navy-light'}`}>
                <UserCheck className="w-4 h-4" />
                <span>8. Gestão de Equipe</span>
              </button>
            )}

            <button onClick={() => setActiveModule('ASSISTENTE')} className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-xl font-semibold cursor-pointer ${activeModule === 'ASSISTENTE' ? 'bg-turquoise text-navy font-bold' : 'text-slate-300 hover:bg-navy-light'}`}>
              <HelpCircle className="w-4 h-4" />
              <span>9. Assistente IA</span>
            </button>
          </nav>
        </div>

        <div className="pt-4 border-t border-navy-light text-xs space-y-2">
          <div className="flex justify-between items-center text-slate-300">
            <span>{currentUser.nome}</span>
            <button onClick={() => setIsLoggedIn(false)} className="text-rose-400 font-bold flex items-center space-x-1 cursor-pointer">
              <LogOut className="w-3.5 h-3.5" />
              <span>Sair</span>
            </button>
          </div>
        </div>
      </aside>

      <main className="flex-1 p-6 md:p-8 space-y-6 overflow-y-auto max-w-7xl mx-auto w-full">
        {/* MÓDULO 1: ORDENS DE SERVIÇO */}
        {activeModule === 'OS' && (
          <div className="space-y-6">
            <div className="border-b pb-4">
              <h2 className="text-2xl font-extrabold text-navy">Módulo 1: Ordens de Serviço (OS)</h2>
              <p className="text-xs text-slate-500">Adicione peças do estoque com baixa automática e gere o PDF/comprovante.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {ordensServico.map((os) => (
                <div key={os.id} className="bg-white border rounded-2xl p-6 shadow-sm space-y-4">
                  <div className="flex justify-between items-start border-b pb-3">
                    <div>
                      <span className="text-[10px] font-mono font-bold text-turquoise bg-navy px-2 py-0.5 rounded">{os.id}</span>
                      <h3 className="font-bold text-navy text-base mt-1">{os.cliente}</h3>
                      <p className="text-xs text-slate-500"><MapPin className="w-3.5 h-3.5 inline mr-1" />{os.endereco}</p>
                    </div>
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${os.status.includes('Concluído') ? 'bg-emerald-100 text-emerald-800' : 'bg-sky-100 text-sky-800'}`}>
                      {os.status}
                    </span>
                  </div>

                  <div className="space-y-2 text-xs">
                    <p><strong>Equipamento:</strong> {os.equipamento}</p>
                    <p><strong>Serviço:</strong> {os.servico}</p>
                    
                    <div className="bg-slate-50 p-3 rounded-xl border space-y-2">
                      <div className="flex justify-between items-center">
                        <strong className="text-navy text-xs flex items-center"><Package className="w-3.5 h-3.5 mr-1 text-turquoise" /> Peças do Estoque:</strong>
                        {!isTecnicoOuAjudante && (
                          <button onClick={() => setOsEditandoPecas(os)} className="text-[11px] bg-turquoise/20 text-navy font-bold px-2 py-1 rounded-lg cursor-pointer">
                            + Add Peça
                          </button>
                        )}
                      </div>

                      {os.pecasUtilizadas && os.pecasUtilizadas.length > 0 ? (
                        <ul className="space-y-1 text-[11px] text-slate-600">
                          {os.pecasUtilizadas.map((p: any, idx: number) => (
                            <li key={idx} className="flex justify-between border-b pb-1">
                              <span>{p.quantidade}x {p.nome}</span>
                              <strong className="text-navy">R$ {p.total.toFixed(2)}</strong>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-[11px] text-slate-400 italic">Nenhuma peça adicionada ainda.</p>
                      )}
                    </div>

                    <div className="pt-2 border-t flex justify-between items-center">
                      <span className="text-slate-900 font-extrabold text-base">Total: <strong className="text-emerald-600">R$ {os.valorTotal.toFixed(2)}</strong></span>
                    </div>
                  </div>

                  <div className="pt-2 flex flex-wrap gap-2">
                    <button onClick={() => setOsParaPdf(os)} className="bg-navy hover:bg-navy-dark text-turquoise font-bold py-2.5 px-3 rounded-xl text-xs flex items-center justify-center space-x-1.5 flex-1 shadow cursor-pointer">
                      <Printer className="w-4 h-4" />
                      <span>Gerar Comprovante / PDF</span>
                    </button>
                    {!os.status.includes('Concluído') && (
                      <button onClick={() => concluirAtendimentoOS(os.id)} className="bg-turquoise text-navy font-bold py-2.5 px-3 rounded-xl text-xs cursor-pointer shadow">
                        Concluir ✅
                      </button>
                    )}
                    {isAdmOrGerente && (
                      <button onClick={() => excluirOS(os.id)} className="bg-rose-100 text-rose-700 font-bold p-2.5 rounded-xl text-xs cursor-pointer">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* MÓDULO 2: ESTOQUE */}
        {activeModule === 'ESTOQUE' && isAdmOrGerente && (
          <div className="space-y-6">
            <div className="border-b pb-4">
              <h2 className="text-2xl font-extrabold text-navy">Módulo 2: Estoque de Peças & Materiais</h2>
              <p className="text-xs text-slate-500">Gerencie o saldo e os preços dos materiais.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <form onSubmit={adicionarPecaEstoque} className="bg-white p-6 rounded-2xl border shadow-sm space-y-4 lg:col-span-1">
                <h3 className="font-bold text-navy text-sm border-b pb-2">Cadastrar Item</h3>
                <div className="space-y-3 text-xs">
                  <div>
                    <label className="block font-bold mb-1">Nome *</label>
                    <input type="text" value={novoNomePeca} onChange={e => setNovoNomePeca(e.target.value)} required className="w-full p-2.5 border rounded-xl" />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold mb-1">Qtd *</label>
                      <input type="number" value={novaQtdPeca} onChange={e => setNovaQtdPeca(Number(e.target.value))} required className="w-full p-2.5 border rounded-xl font-bold" />
                    </div>
                    <div>
                      <label className="block font-bold mb-1">Preço R$ *</label>
                      <input type="number" value={novoValorPeca} onChange={e => setNovoValorPeca(Number(e.target.value))} required className="w-full p-2.5 border rounded-xl font-bold" />
                    </div>
                  </div>
                  <button type="submit" className="w-full bg-turquoise text-navy font-bold py-3 rounded-xl shadow cursor-pointer">Adicionar ao Estoque</button>
                </div>
              </form>

              <div className="bg-white p-6 rounded-2xl border shadow-sm space-y-4 lg:col-span-2">
                <h3 className="font-bold text-navy text-sm border-b pb-2">Itens em Estoque ({estoque.length})</h3>
                <div className="space-y-3">
                  {estoque.map((item) => (
                    <div key={item.id} className="border rounded-xl p-4 bg-slate-50 flex justify-between items-center">
                      <div>
                        <span className="text-[10px] font-mono font-bold bg-navy text-turquoise px-2 py-0.5 rounded">{item.codigo}</span>
                        <h4 className="font-bold text-navy text-sm mt-1">{item.nome}</h4>
                        <p className="text-xs text-slate-500">R$ {item.precoUnitario.toFixed(2)}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-extrabold px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full">Saldo: {item.quantidade}</span>
                        <button onClick={() => setPecaEditando(item)} className="bg-navy text-turquoise p-2 rounded-lg cursor-pointer"><Edit3 className="w-4 h-4" /></button>
                        <button onClick={() => excluirPecaEstoque(item.id)} className="bg-rose-100 text-rose-700 p-2 rounded-lg cursor-pointer"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* MÓDULO 3: CLIENTES */}
        {activeModule === 'CLIENTES' && !isTecnicoOuAjudante && (
          <div className="space-y-6">
            <div className="border-b pb-4">
              <h2 className="text-2xl font-extrabold text-navy">Módulo 3: Clientes & Aparelhos</h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <form onSubmit={salvarCliente} className="bg-white p-6 rounded-2xl border shadow-sm space-y-4 lg:col-span-1">
                <h3 className="font-bold text-navy text-sm border-b pb-2">Novo Cliente</h3>
                <div className="space-y-3 text-xs">
                  <div>
                    <label className="block font-bold mb-1">Nome / Empresa *</label>
                    <input type="text" value={nomeCli} onChange={e => setNomeCli(e.target.value)} required className="w-full p-2.5 border rounded-xl" />
                  </div>
                  <div>
                    <label className="block font-bold mb-1">Telefone *</label>
                    <input type="text" value={telCli} onChange={e => setTelCli(e.target.value)} required className="w-full p-2.5 border rounded-xl" />
                  </div>
                  <div>
                    <label className="block font-bold mb-1">CEP (ViaCEP)</label>
                    <input type="text" maxLength={8} value={cepCli} onChange={e => handleBuscarCep(e.target.value)} placeholder="17013000" className="w-full p-2.5 border rounded-xl" />
                    {loadingCep && <span className="text-turquoise text-[10px]">Buscando...</span>}
                  </div>
                  <div>
                    <label className="block font-bold mb-1">Endereço</label>
                    <input type="text" value={endCli} onChange={e => setEndCli(e.target.value)} className="w-full p-2.5 border rounded-xl bg-slate-50" />
                  </div>
                  <button type="submit" className="w-full bg-turquoise text-navy font-bold py-3 rounded-xl shadow cursor-pointer">Salvar Cliente</button>
                </div>
              </form>

              <div className="bg-white p-6 rounded-2xl border shadow-sm space-y-4 lg:col-span-2">
                <h3 className="font-bold text-navy text-sm border-b pb-2">Clientes ({clientes.length})</h3>
                <div className="space-y-3">
                  {clientes.map((c) => (
                    <div key={c.id} className="border rounded-xl p-4 bg-slate-50 flex justify-between items-center">
                      <div>
                        <h4 className="font-bold text-navy text-base">{c.nome}</h4>
                        <p className="text-xs text-slate-500">{c.endereco} — {c.telefone}</p>
                      </div>
                      <button onClick={() => setClienteVisualizando(c)} className="bg-navy text-turquoise font-bold px-4 py-2.5 rounded-xl text-xs flex items-center space-x-1 cursor-pointer">
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

        {/* MÓDULO 4: MENSALIDADES */}
        {activeModule === 'MENSALIDADES' && isAdmOrGerente && (
          <div className="space-y-6">
            <div className="border-b pb-4">
              <h2 className="text-2xl font-extrabold text-navy">Módulo 4: Mensalidades & Contratos PMOC</h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <form onSubmit={criarMensalidade} className="bg-white p-6 rounded-2xl border shadow-sm space-y-4 lg:col-span-1">
                <h3 className="font-bold text-navy text-sm border-b pb-2">Novo Contrato</h3>
                <div className="space-y-3 text-xs">
                  <div>
                    <label className="block font-bold mb-1">Cliente</label>
                    <select value={mensCliente} onChange={e => setMensCliente(e.target.value)} className="w-full p-2.5 border rounded-xl bg-white font-semibold">
                      {clientes.map((c, i) => <option key={i} value={c.nome}>{c.nome}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block font-bold mb-1">Tipo</label>
                    <input type="text" value={mensTipo} onChange={e => setMensTipo(e.target.value)} required className="w-full p-2.5 border rounded-xl" />
                  </div>
                  <div>
                    <label className="block font-bold mb-1">Valor Mensal (R$)</label>
                    <input type="number" value={mensValor} onChange={e => setMensValor(Number(e.target.value))} required className="w-full p-2.5 border rounded-xl font-bold" />
                  </div>
                  <div>
                    <label className="block font-bold mb-1">Total de Meses</label>
                    <input type="number" value={mensTotalParcelas} onChange={e => setMensTotalParcelas(Number(e.target.value))} required className="w-full p-2.5 border rounded-xl font-bold" />
                  </div>
                  <button type="submit" className="w-full bg-turquoise text-navy font-bold py-3 rounded-xl shadow cursor-pointer">Criar Contrato</button>
                </div>
              </form>

              <div className="bg-white p-6 rounded-2xl border shadow-sm space-y-4 lg:col-span-2">
                <div className="flex justify-between items-center border-b pb-2">
                  <h3 className="font-bold text-navy text-sm">Contratos ({mensalidades.length})</h3>
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">Recebido/Mês: R$ {totalMensalidadesRecebidas.toFixed(2)}</span>
                </div>
                <div className="space-y-3">
                  {mensalidades.map((m) => {
                    const pagas = m.historicoPagamentos ? m.historicoPagamentos.filter((h: any) => h.status.includes('Pago')).length : 0
                    return (
                      <div key={m.id} className="border rounded-xl p-4 bg-slate-50 flex justify-between items-center">
                        <div>
                          <span className="text-[10px] font-mono font-bold bg-navy text-turquoise px-2 py-0.5 rounded">{m.id}</span>
                          <h4 className="font-bold text-navy text-sm mt-1">{m.cliente}</h4>
                          <p className="text-xs text-slate-600">{m.tipoContrato} — R$ {m.valorMensal.toFixed(2)}</p>
                          <p className="text-xs font-bold text-emerald-700 mt-1">Pagas: {pagas} de {m.totalParcelas}</p>
                        </div>
                        <button onClick={() => setModalDetalheMensalidade(m)} className="bg-navy text-turquoise text-xs font-bold px-3 py-2 rounded-xl cursor-pointer shadow">
                          Ver Parcelas 📋
                        </button>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* MÓDULO 5: ORÇAMENTOS */}
        {activeModule === 'ORCAMENTOS' && !isTecnicoOuAjudante && (
          <div className="space-y-6">
            <div className="border-b pb-4">
              <h2 className="text-2xl font-extrabold text-navy">Módulo 5: Orçamentos & Edição</h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <form onSubmit={criarOrcamento} className="bg-white p-6 rounded-2xl border shadow-sm space-y-4 lg:col-span-1">
                <h3 className="font-bold text-navy text-sm border-b pb-2">Novo Orçamento</h3>
                <div className="space-y-3 text-xs">
                  <div>
                    <label className="block font-bold mb-1">Cliente</label>
                    <select value={orcCliente} onChange={e => setOrcCliente(e.target.value)} className="w-full p-2.5 border rounded-xl bg-white font-semibold">
                      {clientes.map((c, i) => <option key={i} value={c.nome}>{c.nome}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block font-bold mb-1">Equipamento</label>
                    <input type="text" value={orcEquipamento} onChange={e => setOrcEquipamento(e.target.value)} required className="w-full p-2.5 border rounded-xl" />
                  </div>
                  <div>
                    <label className="block font-bold mb-1">Serviço</label>
                    <input type="text" value={orcServico} onChange={e => setOrcServico(e.target.value)} required className="w-full p-2.5 border rounded-xl" />
                  </div>
                  <div>
                    <label className="block font-bold mb-1">Valor Total (R$)</label>
                    <input type="number" value={orcValor} onChange={e => setOrcValor(Number(e.target.value))} required className="w-full p-2.5 border rounded-xl font-bold" />
                  </div>
                  <button type="submit" className="w-full bg-turquoise text-navy font-bold py-3 rounded-xl shadow cursor-pointer">Emitir Orçamento</button>
                </div>
              </form>

              <div className="bg-white p-6 rounded-2xl border shadow-sm space-y-4 lg:col-span-2">
                <h3 className="font-bold text-navy text-sm border-b pb-2">Orçamentos Emitidos ({orcamentos.length})</h3>
                <div className="space-y-3">
                  {orcamentos.map((orc) => (
                    <div key={orc.id} className="border rounded-xl p-4 bg-slate-50 flex justify-between items-center">
                      <div>
                        <span className="text-[10px] font-mono font-bold bg-navy text-turquoise px-2 py-0.5 rounded">{orc.id}</span>
                        <h4 className="font-bold text-navy text-sm mt-1">{orc.cliente}</h4>
                        <p className="text-xs text-slate-600">{orc.servico} — R$ {orc.total.toFixed(2)}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button onClick={() => setOrcEditando(orc)} className="bg-navy text-turquoise p-2.5 rounded-xl cursor-pointer" title="Editar"><Edit3 className="w-4 h-4" /></button>
                        <button onClick={() => excluirOrcamento(orc.id)} className="bg-rose-100 text-rose-700 p-2.5 rounded-xl cursor-pointer" title="Excluir"><Trash2 className="w-4 h-4" /></button>
                        <button onClick={() => aprovarOrcamentoConverterOS(orc.id)} className="bg-turquoise text-navy text-xs font-bold px-3 py-2.5 rounded-xl cursor-pointer shadow">
                          Aprovar & Gerar OS 🚀
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* MÓDULO 6: AGENDA */}
        {activeModule === 'AGENDA' && (
          <div className="space-y-6">
            <div className="border-b pb-4">
              <h2 className="text-2xl font-extrabold text-navy">Módulo 6: Agenda Automática</h2>
            </div>
            <div className="bg-white rounded-2xl border p-6 space-y-4">
              {ordensServico.map((item, idx) => (
                <div key={idx} className="border rounded-xl p-4 bg-slate-50 flex justify-between items-center text-xs">
                  <div>
                    <span className="bg-turquoise/20 text-navy font-mono font-bold px-2 py-0.5 rounded">{item.dataAgendamento}</span>
                    <h4 className="font-bold text-navy text-sm mt-1">{item.cliente}</h4>
                    <p className="text-slate-600">{item.servico}</p>
                  </div>
                  <span className="bg-emerald-100 text-emerald-800 font-bold px-3 py-1 rounded-full">{item.status}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* MÓDULO 7: FINANCEIRO */}
        {activeModule === 'FINANCEIRO' && isAdmOrGerente && (
          <div className="space-y-6">
            <div className="border-b pb-4">
              <h2 className="text-2xl font-extrabold text-navy">Módulo 7: Caixa & Faturamento Real</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div className="bg-white p-5 rounded-2xl border shadow-sm">
                <span className="text-xs font-bold text-slate-500 uppercase">Faturamento de OS</span>
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

        {/* MÓDULO 8: EQUIPE */}
        {activeModule === 'EQUIPE' && currentUser.cargo === 'ADMIN' && (
          <div className="space-y-6">
            <div className="border-b pb-4">
              <h2 className="text-2xl font-extrabold text-navy">Módulo 8: Gestão de Equipe & Senhas</h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <form onSubmit={adicionarFuncionario} className="bg-white p-6 rounded-2xl border shadow-sm space-y-4 lg:col-span-1">
                <h3 className="font-bold text-navy text-sm border-b pb-2">Novo Funcionário</h3>
                <div className="space-y-3 text-xs">
                  <div>
                    <label className="block font-bold mb-1">Nome *</label>
                    <input type="text" value={novoNomeFunc} onChange={e => setNovoNomeFunc(e.target.value)} required className="w-full p-2.5 border rounded-xl" />
                  </div>
                  <div>
                    <label className="block font-bold mb-1">E-mail *</label>
                    <input type="email" value={novoEmailFunc} onChange={e => setNovoEmailFunc(e.target.value)} required className="w-full p-2.5 border rounded-xl" />
                  </div>
                  <div>
                    <label className="block font-bold mb-1">Senha *</label>
                    <input type="text" value={novaSenhaFunc} onChange={e => setNovaSenhaFunc(e.target.value)} required className="w-full p-2.5 border rounded-xl font-mono" />
                  </div>
                  <div>
                    <label className="block font-bold mb-1">Cargo</label>
                    <select value={novoCargoFunc} onChange={e => setNovoCargoFunc(e.target.value)} className="w-full p-2.5 border rounded-xl bg-white font-semibold">
                      <option value="GERENTE">Gerente</option>
                      <option value="SECRETARIA">Secretária</option>
                      <option value="TECNICO">Técnico</option>
                      <option value="AJUDANTE">Ajudante</option>
                    </select>
                  </div>
                  <button type="submit" className="w-full bg-turquoise text-navy font-bold py-3 rounded-xl shadow cursor-pointer">Adicionar Funcionário</button>
                </div>
              </form>

              <div className="bg-white p-6 rounded-2xl border shadow-sm space-y-4 lg:col-span-2">
                <h3 className="font-bold text-navy text-sm border-b pb-2">Equipe Ativa ({equipe.length})</h3>
                <div className="space-y-3">
                  {equipe.map((func) => (
                    <div key={func.id} className="border rounded-xl p-4 bg-slate-50 flex justify-between items-center text-xs">
                      <div>
                        <h4 className="font-bold text-navy text-sm">{func.nome}</h4>
                        <p className="text-slate-500">{func.email} — <strong className="text-turquoise">{func.cargo}</strong></p>
                        <p className="font-mono text-slate-400 mt-0.5">Senha: {func.senha}</p>
                      </div>
                      <button onClick={() => setFuncEditando(func)} className="bg-navy text-turquoise font-bold px-3 py-2 rounded-lg cursor-pointer shadow">Editar Senha</button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* MÓDULO 9: ASSISTENTE IA */}
        {activeModule === 'ASSISTENTE' && (
          <div className="space-y-6">
            <div className="border-b pb-4">
              <h2 className="text-2xl font-extrabold text-navy">Módulo 9: Assistente Técnico IA</h2>
              <p className="text-xs text-slate-500">Busque por sintomas ("não gela", "barulho") ou códigos de erro (E6, EC, F1).</p>
            </div>
            <div className="bg-white p-6 rounded-2xl border shadow-sm space-y-4">
              <input 
                type="text" 
                value={buscaErro} 
                onChange={e => setBuscaErro(e.target.value)} 
                placeholder="Ex: Ar condicionado Elgin não gela, erro E6..." 
                className="w-full p-3 border rounded-xl text-sm font-semibold"
              />
              <div className="space-y-3">
                {errosFiltrados.map((err, i) => (
                  <div key={i} className="border rounded-xl p-4 bg-slate-50 space-y-2 text-xs">
                    <span className="font-bold text-navy text-sm">{err.titulo}</span>
                    <p className="text-slate-700 bg-white p-3 rounded-lg border leading-relaxed">{err.solucao}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* MODAL PEÇAS NA OS */}
      {osEditandoPecas && (
        <div className="fixed inset-0 bg-navy/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-6 shadow-2xl">
            <div className="flex justify-between items-center border-b pb-4">
              <h3 className="text-xl font-black text-navy">Lançar Peça na OS ({osEditandoPecas.id})</h3>
              <button onClick={() => setOsEditandoPecas(null)} className="text-slate-400 p-2 cursor-pointer"><X className="w-6 h-6" /></button>
            </div>
            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-bold mb-1">Peça do Estoque</label>
                <select value={pecaSelecionadaId} onChange={e => setPecaSelecionadaId(Number(e.target.value))} className="w-full p-3 border rounded-xl bg-white">
                  {estoque.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.nome} — Saldo: {item.quantidade} (R$ {item.precoUnitario.toFixed(2)})
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block font-bold mb-1">Quantidade</label>
                <input type="number" min={1} value={qtdPecaOS} onChange={e => setQtdPecaOS(Number(e.target.value))} required className="w-full p-2.5 border rounded-xl font-bold" />
              </div>
              <button onClick={() => adicionarPecaNaOS(osEditandoPecas.id)} className="w-full bg-turquoise text-navy font-bold py-3 rounded-xl shadow cursor-pointer">
                Lançar Peça & Baixar do Estoque 🚀
              </button>
            </div>

            <div className="border-t pt-4 space-y-2">
              <h4 className="font-bold text-navy text-xs uppercase">Peças na OS:</h4>
              <div className="space-y-2 max-h-40 overflow-y-auto text-xs">
                {osEditandoPecas.pecasUtilizadas && osEditandoPecas.pecasUtilizadas.map((p: any, idx: number) => (
                  <div key={idx} className="border rounded-xl p-3 bg-slate-50 flex justify-between items-center">
                    <span>{p.quantidade}x {p.nome} — R$ {p.total.toFixed(2)}</span>
                    <button onClick={() => removerPecaDaOS(osEditandoPecas.id, p.pecaId)} className="text-rose-600 cursor-pointer"><Trash2 className="w-4 h-4" /></button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL PDF / COMPROVANTE */}
      {osParaPdf && (
        <div className="fixed inset-0 bg-navy/90 backdrop-blur-md flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-8 space-y-6 shadow-2xl max-h-[90vh] overflow-y-auto text-slate-900" id="comprovante-print">
            <div className="border-b-2 border-navy pb-4 flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-black text-navy">NANDO'S <span className="text-turquoise">CLIMATIZAÇÃO</span></h1>
                <p className="text-xs text-slate-600 font-bold">Instalação, Manutenção & Sanitização</p>
                <p className="text-[11px] text-slate-500">(14) 99168-9815 | Bauru - SP</p>
              </div>
              <div className="text-right">
                <span className="text-xs font-mono font-bold bg-navy text-turquoise px-3 py-1 rounded-lg">RECIBO DE OS</span>
                <p className="text-sm font-black text-navy mt-1">{osParaPdf.id}</p>
                <p className="text-[10px] text-slate-500">{osParaPdf.dataAgendamento}</p>
              </div>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border grid grid-cols-2 gap-4 text-xs">
              <div>
                <strong className="text-slate-400 block text-[10px] uppercase">Cliente</strong>
                <p className="font-bold text-navy text-sm">{osParaPdf.cliente}</p>
              </div>
              <div>
                <strong className="text-slate-400 block text-[10px] uppercase">Endereço</strong>
                <p className="font-bold text-navy text-xs">{osParaPdf.endereco}</p>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <h3 className="font-extrabold text-navy border-b pb-1">Serviços & Equipamento</h3>
              <p><strong>Equipamento:</strong> {osParaPdf.equipamento}</p>
              <p><strong>Serviço:</strong> {osParaPdf.servico}</p>
            </div>

            <div className="space-y-2 text-xs">
              <h3 className="font-extrabold text-navy border-b pb-1">Discriminação</h3>
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-100 text-slate-700 border-b">
                    <th className="p-2">Item</th>
                    <th className="p-2 text-center">Qtd</th>
                    <th className="p-2 text-right">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y text-slate-700">
                  <tr>
                    <td className="p-2 font-semibold">Mão de Obra Técnica</td>
                    <td className="p-2 text-center">1</td>
                    <td className="p-2 text-right font-bold text-navy">R$ {osParaPdf.valorServico.toFixed(2)}</td>
                  </tr>
                  {osParaPdf.pecasUtilizadas && osParaPdf.pecasUtilizadas.map((p: any, idx: number) => (
                    <tr key={idx}>
                      <td className="p-2">{p.nome}</td>
                      <td className="p-2 text-center">{p.quantidade}</td>
                      <td className="p-2 text-right font-bold text-navy">R$ {p.total.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="bg-slate-100 p-4 rounded-xl flex justify-between items-center text-sm font-black text-navy border">
                <span>VALOR TOTAL:</span>
                <span className="text-lg text-emerald-600">R$ {osParaPdf.valorTotal.toFixed(2)}</span>
              </div>
            </div>

            <div className="border-t pt-6 grid grid-cols-2 gap-8 text-center text-xs">
              <div>
                <div className="border-b border-slate-400 mb-1 w-3/4 mx-auto"></div>
                <p className="font-bold text-navy">Nando's Climatização</p>
              </div>
              <div>
                <div className="border-b border-slate-400 mb-1 w-3/4 mx-auto"></div>
                <p className="font-bold text-navy">{osParaPdf.cliente}</p>
              </div>
            </div>

            <div className="border-t pt-4 flex justify-between items-center print:hidden">
              <button onClick={() => setOsParaPdf(null)} className="bg-slate-200 font-bold px-4 py-2.5 rounded-xl text-xs cursor-pointer">Fechar</button>
              <button onClick={() => window.print()} className="bg-turquoise text-navy font-black px-6 py-2.5 rounded-xl text-xs flex items-center space-x-2 shadow-lg cursor-pointer">
                <Printer className="w-4 h-4" />
                <span>Imprimir / Salvar como PDF</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL CLIENTE */}
      {clienteVisualizando && (
        <div className="fixed inset-0 bg-navy/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 space-y-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b pb-4">
              <h3 className="text-xl font-black text-navy">{clienteVisualizando.nome}</h3>
              <button onClick={() => setClienteVisualizando(null)} className="text-slate-400 p-2 cursor-pointer"><X className="w-6 h-6" /></button>
            </div>
            <p className="text-xs text-slate-600">{clienteVisualizando.endereco} — {clienteVisualizando.telefone}</p>
            <div className="space-y-2">
              <h4 className="font-bold text-navy text-xs uppercase">Aparelhos Instalados</h4>
              {clienteVisualizando.equipamentos.map((ap: any) => (
                <div key={ap.id} className="border rounded-xl p-3 bg-slate-50 flex justify-between items-center text-xs">
                  <span>{ap.tipo} — {ap.marca} ({ap.btu}) | Local: <strong>{ap.local}</strong></span>
                  <button onClick={() => removerAparelhoCliente(clienteVisualizando.id, ap.id)} className="text-rose-600 cursor-pointer"><Trash2 className="w-4 h-4" /></button>
                </div>
              ))}
            </div>
            <div className="border-t pt-4 space-y-3 text-xs">
              <h4 className="font-bold text-navy uppercase">Adicionar Aparelho</h4>
              <div className="grid grid-cols-2 gap-3">
                <input type="text" value={novaMarcaEq} onChange={e => setNovaMarcaEq(e.target.value)} placeholder="Marca" className="p-2.5 border rounded-xl" />
                <input type="text" value={novoLocalEq} onChange={e => setNovoLocalEq(e.target.value)} placeholder="Local (Quarto, Sala...)" className="p-2.5 border rounded-xl" />
              </div>
              <button onClick={() => adicionarAparelhoCliente(clienteVisualizando.id)} className="w-full bg-turquoise text-navy font-bold py-3 rounded-xl shadow cursor-pointer">Adicionar</button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL MENSALIDADE */}
      {modalDetalheMensalidade && (
        <div className="fixed inset-0 bg-navy/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-6 shadow-2xl">
            <div className="flex justify-between items-center border-b pb-4">
              <h3 className="text-xl font-black text-navy">Parcelas: {modalDetalheMensalidade.cliente}</h3>
              <button onClick={() => setModalDetalheMensalidade(null)} className="text-slate-400 p-2 cursor-pointer"><X className="w-6 h-6" /></button>
            </div>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {modalDetalheMensalidade.historicoPagamentos.map((parc: any, index: number) => (
                <div key={index} className="border rounded-xl p-3 bg-slate-50 flex justify-between items-center text-xs">
                  <span>{parc.mes} — R$ {parc.valor.toFixed(2)}</span>
                  <button onClick={() => alternarStatusParcela(modalDetalheMensalidade.id, index)} className={`px-3 py-1.5 rounded-lg font-bold cursor-pointer text-xs ${parc.status.includes('Pago') ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                    {parc.status}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* MODAL EDITAR ORÇAMENTO */}
      {orcEditando && (
        <div className="fixed inset-0 bg-navy/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-6 shadow-2xl">
            <div className="flex justify-between items-center border-b pb-4">
              <h3 className="text-xl font-black text-navy">Editar Orçamento</h3>
              <button onClick={() => setOrcEditando(null)} className="text-slate-400 p-2 cursor-pointer"><X className="w-6 h-6" /></button>
            </div>
            <form onSubmit={salvarEdicaoOrcamento} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold mb-1">Cliente</label>
                <input type="text" value={orcEditando.cliente} onChange={e => setOrcEditando({ ...orcEditando, cliente: e.target.value })} required className="w-full p-2.5 border rounded-xl" />
              </div>
              <div>
                <label className="block font-bold mb-1">Equipamento</label>
                <input type="text" value={orcEditando.equipamento} onChange={e => setOrcEditando({ ...orcEditando, equipamento: e.target.value })} required className="w-full p-2.5 border rounded-xl" />
              </div>
              <div>
                <label className="block font-bold mb-1">Serviço</label>
                <input type="text" value={orcEditando.servico} onChange={e => setOrcEditando({ ...orcEditando, servico: e.target.value })} required className="w-full p-2.5 border rounded-xl" />
              </div>
              <div>
                <label className="block font-bold mb-1">Valor Total (R$)</label>
                <input type="number" value={orcEditando.total} onChange={e => setOrcEditando({ ...orcEditando, total: Number(e.target.value) })} required className="w-full p-2.5 border rounded-xl font-bold" />
              </div>
              <button type="submit" className="w-full bg-turquoise text-navy font-bold py-3 rounded-xl shadow cursor-pointer">Salvar Alterações</button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL EQUIPE */}
      {funcEditando && (
        <div className="fixed inset-0 bg-navy/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-6 shadow-2xl">
            <div className="flex justify-between items-center border-b pb-4">
              <h3 className="text-xl font-black text-navy">Editar Senha do Funcionário</h3>
              <button onClick={() => setFuncEditando(null)} className="text-slate-400 p-2 cursor-pointer"><X className="w-6 h-6" /></button>
            </div>
            <form onSubmit={salvarEdicaoFuncionario} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold mb-1">Nova Senha</label>
                <input type="text" value={funcEditando.senha || ''} onChange={e => setFuncEditando({ ...funcEditando, senha: e.target.value })} required className="w-full p-2.5 border rounded-xl font-mono font-bold" />
              </div>
              <button type="submit" className="w-full bg-turquoise text-navy font-bold py-3 rounded-xl shadow cursor-pointer">Salvar</button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL ESTOQUE */}
      {pecaEditando && (
        <div className="fixed inset-0 bg-navy/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-6 shadow-2xl">
            <div className="flex justify-between items-center border-b pb-4">
              <h3 className="text-xl font-black text-navy">Ajustar Estoque</h3>
              <button onClick={() => setPecaEditando(null)} className="text-slate-400 p-2 cursor-pointer"><X className="w-6 h-6" /></button>
            </div>
            <form onSubmit={salvarEdicaoEstoque} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold mb-1">Nome</label>
                <input type="text" value={pecaEditando.nome} onChange={e => setPecaEditando({ ...pecaEditando, nome: e.target.value })} required className="w-full p-2.5 border rounded-xl" />
              </div>
              <div>
                <label className="block font-bold mb-1">Quantidade</label>
                <input type="number" value={pecaEditando.quantidade} onChange={e => setPecaEditando({ ...pecaEditando, quantidade: Number(e.target.value) })} required className="w-full p-2.5 border rounded-xl font-bold" />
              </div>
              <div>
                <label className="block font-bold mb-1">Preço Unitário (R$)</label>
                <input type="number" value={pecaEditando.precoUnitario} onChange={e => setPecaEditando({ ...pecaEditando, precoUnitario: Number(e.target.value) })} required className="w-full p-2.5 border rounded-xl font-bold" />
              </div>
              <button type="submit" className="w-full bg-turquoise text-navy font-bold py-3 rounded-xl shadow cursor-pointer">Salvar Ajuste</button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
