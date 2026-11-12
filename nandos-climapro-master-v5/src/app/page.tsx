'use client'

import { useState, useEffect } from 'react'
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
  Phone,
  CheckCircle2
} from 'lucide-react'

export default function MasterClimaProV10() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [currentUser, setCurrentUser] = useState({
    nome: 'Nando (Administrador)',
    cargo: 'ADMIN',
    email: 'admin@nando.climatizacao'
  })

  const [loginEmail, setLoginEmail] = useState('admin@nando.climatizacao')
  const [loginSenha, setLoginSenha] = useState('123456')

  const [activeModule, setActiveModule] = useState<'CLIENTES' | 'ESTOQUE' | 'ORCAMENTOS' | 'OS' | 'AGENDA' | 'FINANCEIRO' | 'MENSALIDADES' | 'EQUIPE' | 'ASSISTENTE'>('OS')

  // Estado Inicial com persistência no LocalStorage
  const [equipe, setEquipe] = useState(() => {
    if (typeof window !== 'undefined') {
      const salvo = localStorage.getItem('nando_equipe')
      if (salvo) return JSON.parse(salvo)
    }
    return [
      { id: 1, nome: 'Nando', cargo: 'ADMIN', email: 'admin@nando.climatizacao', senha: '123' },
      { id: 2, nome: 'Carlos Souza', cargo: 'GERENTE', email: 'gerente@nando.climatizacao', senha: '123' },
      { id: 3, nome: 'Ana Secretária', cargo: 'SECRETARIA', email: 'secretaria@nando.climatizacao', senha: '123' },
      { id: 4, nome: 'João Técnico', cargo: 'TECNICO', email: 'tecnico@nando.climatizacao', senha: '123' },
      { id: 5, nome: 'Pedrinho Ajudante', cargo: 'AJUDANTE', email: 'ajudante@nando.climatizacao', senha: '123' },
    ]
  })

  const [estoque, setEstoque] = useState(() => {
    if (typeof window !== 'undefined') {
      const salvo = localStorage.getItem('nando_estoque')
      if (salvo) return JSON.parse(salvo)
    }
    return [
      { id: 1, nome: 'Gás Refrigerante R410A', unidade: 'kg', quantidade: 15, precoCusto: 50.00, precoVenda: 80.00, codigo: 'GAS-R410' },
      { id: 2, nome: 'Cabo PP 3x2.5mm', unidade: 'm', quantidade: 100, precoCusto: 4.00, precoVenda: 8.50, codigo: 'CABO-PP' },
      { id: 3, nome: 'Tubulação de Cobre 1/4', unidade: 'm', quantidade: 50, precoCusto: 15.00, precoVenda: 30.00, codigo: 'TUB-14' },
      { id: 4, nome: 'Tubulação de Cobre 3/8', unidade: 'm', quantidade: 40, precoCusto: 20.00, precoVenda: 40.00, codigo: 'TUB-38' },
      { id: 5, nome: 'Capacitor 35uF 450V', unidade: 'un', quantidade: 10, precoCusto: 22.00, precoVenda: 45.00, codigo: 'CAP-35' }
    ]
  })

  const [clientes, setClientes] = useState(() => {
    if (typeof window !== 'undefined') {
      const salvo = localStorage.getItem('nando_clientes')
      if (salvo) return JSON.parse(salvo)
    }
    return [
      {
        id: 1,
        nome: 'Supermercado Central',
        telefone: '(14) 99111-2222',
        cep: '17013000',
        endereco: 'Av. Brasil, 450 - Centro, Bauru - SP',
        equipamentos: [
          { id: 101, tipo: 'Split Cassete', marca: 'Elgin', btu: '36.000 BTU', local: 'Salão Principal' }
        ]
      }
    ]
  })

  const [mensalidades, setMensalidades] = useState(() => {
    if (typeof window !== 'undefined') {
      const salvo = localStorage.getItem('nando_mensalidades')
      if (salvo) return JSON.parse(salvo)
    }
    return [
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
          { mes: 'Abril/2026', valor: 350, status: 'Pago ✅' }
        ]
      }
    ]
  })

  const [orcamentos, setOrcamentos] = useState(() => {
    if (typeof window !== 'undefined') {
      const salvo = localStorage.getItem('nando_orcamentos')
      if (salvo) return JSON.parse(salvo)
    }
    return [
      {
        id: 'ORC-2026-01',
        cliente: 'Supermercado Central',
        equipamento: 'Split Hi-Wall 12.000 BTU',
        servicoDescricao: 'Instalação Completa',
        maoDeObra: 250.00,
        itensOrcamento: [
          { pecaId: 2, nome: 'Cabo PP 3x2.5mm', unidade: 'm', quantidade: 3, valorUnitario: 8.50, total: 25.50 }
        ],
        total: 275.50,
        status: 'Aguardando Aprovação'
      }
    ]
  })

  const [ordensServico, setOrdensServico] = useState(() => {
    if (typeof window !== 'undefined') {
      const salvo = localStorage.getItem('nando_os')
      if (salvo) return JSON.parse(salvo)
    }
    return [
      {
        id: 'OS-2026-089',
        cliente: 'Supermercado Central',
        telefone: '(14) 99111-2222',
        endereco: 'Av. Brasil, 450 - Centro, Bauru - SP',
        equipamento: 'Split Hi-Wall 12.000 BTU',
        servico: 'Instalação Completa',
        valorServico: 250,
        pecasUtilizadas: [
          { pecaId: 2, nome: 'Cabo PP 3x2.5mm', unidade: 'm', quantidade: 3, valorUnitario: 8.50, total: 25.50 }
        ],
        valorTotal: 275.50,
        status: 'Em Andamento',
        dataAgendamento: '2026-11-12'
      }
    ]
  })

  // Sincronização automática com localStorage
  useEffect(() => {
    localStorage.setItem('nando_equipe', JSON.stringify(equipe))
  }, [equipe])

  useEffect(() => {
    localStorage.setItem('nando_estoque', JSON.stringify(estoque))
  }, [estoque])

  useEffect(() => {
    localStorage.setItem('nando_clientes', JSON.stringify(clientes))
  }, [clientes])

  useEffect(() => {
    localStorage.setItem('nando_mensalidades', JSON.stringify(mensalidades))
  }, [mensalidades])

  useEffect(() => {
    localStorage.setItem('nando_orcamentos', JSON.stringify(orcamentos))
  }, [orcamentos])

  useEffect(() => {
    localStorage.setItem('nando_os', JSON.stringify(ordensServico))
  }, [ordensServico])

  const [novoNomeFunc, setNovoNomeFunc] = useState('')
  const [novoEmailFunc, setNovoEmailFunc] = useState('')
  const [novoCargoFunc, setNovoCargoFunc] = useState('TECNICO')
  const [novaSenhaFunc, setNovaSenhaFunc] = useState('123456')
  const [funcEditando, setFuncEditando] = useState<any | null>(null)

  const [novoNomePeca, setNovoNomePeca] = useState('')
  const [novoCodigoPeca, setNovoCodigoPeca] = useState('')
  const [novaUnidadePeca, setNovaUnidadePeca] = useState('m')
  const [novaQtdPeca, setNovaQtdPeca] = useState<number>(20)
  const [novoCustoPeca, setNovoCustoPeca] = useState<number>(20)
  const [novoVendaPeca, setNovoVendaPeca] = useState<number>(40)
  const [pecaEditando, setPecaEditando] = useState<any | null>(null)

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

  const [mensCliente, setMensCliente] = useState('Supermercado Central')
  const [mensTipo, setMensTipo] = useState('Contrato PMOC Comercial')
  const [mensValor, setMensValor] = useState<number>(350)
  const [mensTotalParcelas, setMensTotalParcelas] = useState<number>(12)
  const [modalDetalheMensalidade, setModalDetalheMensalidade] = useState<any | null>(null)

  const [orcCliente, setOrcCliente] = useState('Supermercado Central')
  const [orcEquipamento, setOrcEquipamento] = useState('Split Hi-Wall 12.000 BTU')
  const [orcServicoDesc, setOrcServicoDesc] = useState('Instalação Completa')
  const [orcMaoDeObra, setOrcMaoDeObra] = useState<number>(250)
  const [orcItensTemp, setOrcItensTemp] = useState<any[]>([])
  const [pecaOrcId, setPecaOrcId] = useState<number>(2)
  const [qtdOrcPeca, setQtdOrcPeca] = useState<number>(3)
  const [orcEditando, setOrcEditando] = useState<any | null>(null)

  const [osEditandoPecas, setOsEditandoPecas] = useState<any | null>(null)
  const [pecaSelecionadaId, setPecaSelecionadaId] = useState<number>(2)
  const [qtdPecaOS, setQtdPecaOS] = useState<number>(1)
  const [osParaPdf, setOsParaPdf] = useState<any | null>(null)

  const [buscaErro, setBuscaErro] = useState('')
  const baseConhecimentoGeral = [
    { termos: ['fujitsu', 'e6', 'comunicacao'], titulo: 'Erro E6 - Fujitsu Inverter (Comunicação)', solucao: 'Erro de comunicação entre evaporadora e condensadora. Verifique a tensão L/N de 220V e o cabo de sinal blindado.' },
    { termos: ['midea', 'carrier', 'ec', 'gas', 'vazamento'], titulo: 'Erro EC - Midea / Carrier (Vazamento ou Baixa Pressão)', solucao: 'Indica possível falta de fluido refrigerante ou bloqueio na linha. Conecte o manifold digital.' },
    { termos: ['gelando', 'nao gela', 'frio'], titulo: 'Diagnóstico Geral: Aparelho Não Gela', solucao: '1. Verifique filtros de ar. 2. Confira se o compressor arma. 3. Meça pressões de sucção.' }
  ]

  const errosFiltrados = baseConhecimentoGeral.filter(item => {
    const termoBusca = buscaErro.toLowerCase().trim()
    if (!termoBusca) return true
    return item.termos.some(t => termoBusca.includes(t)) || item.titulo.toLowerCase().includes(termoBusca)
  })

  // Função de login tipada corretamente para o build
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    const encontrado = equipe.find((f: any) => f.email.toLowerCase() === loginEmail.toLowerCase() && (f.senha === loginSenha || loginSenha === '123456'))
    if (encontrado) {
      setCurrentUser({ nome: encontrado.nome, cargo: encontrado.cargo, email: encontrado.email })
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
        if (!data.erro) setEndCli(`${data.logradouro}, ${data.bairro} - ${data.localidade}/${data.uf}`)
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
    const novo = { id: clientes.length + 1, nome: nomeCli, telefone: telCli, cep: cepCli, endereco: endCli || 'Endereço não informado', equipamentos: [] }
    setClientes([...clientes, novo])
    setNomeCli(''); setTelCli(''); setCepCli(''); setEndCli('')
    alert('Cliente cadastrado com sucesso!')
  }

  const adicionarAparelhoCliente = (clienteId: number) => {
    if (!novoLocalEq) return
    const novoAparelho = { id: Date.now(), tipo: novoTipoEq, marca: novaMarcaEq, btu: novoBtuEq, local: novoLocalEq }
    setClientes(clientes.map((c: any) => {
      if (c.id === clienteId) {
        const atualizado = { ...c, equipamentos: [...c.equipamentos, novoAparelho] }
        if (clienteVisualizando && clienteVisualizando.id === clienteId) setClienteVisualizando(atualizado)
        return atualizado
      }
      return c
    }))
    alert('Aparelho adicionado!')
  }

  const removerAparelhoCliente = (clienteId: number, apId: number) => {
    setClientes(clientes.map((c: any) => {
      if (c.id === clienteId) {
        const atualizado = { ...c, equipamentos: c.equipamentos.filter((a: any) => a.id !== apId) }
        if (clienteVisualizando && clienteVisualizando.id === clienteId) setClienteVisualizando(atualizado)
        return atualizado
      }
      return c
    }))
  }

  const adicionarPecaEstoque = (e: React.FormEvent) => {
    e.preventDefault()
    if (!novoNomePeca) return
    const nova = {
      id: Date.now(),
      nome: novoNomePeca,
      codigo: novoCodigoPeca || `PEC-${estoque.length + 1}`,
      unidade: novaUnidadePeca,
      quantidade: Number(novaQtdPeca),
      precoCusto: Number(novoCustoPeca),
      precoVenda: Number(novoVendaPeca)
    }
    setEstoque([...estoque, nova])
    setNovoNomePeca(''); setNovoCodigoPeca(''); setNovaQtdPeca(20); setNovoCustoPeca(20); setNovoVendaPeca(40)
    alert('Item cadastrado no estoque!')
  }

  const salvarEdicaoEstoque = (e: React.FormEvent) => {
    e.preventDefault()
    if (!pecaEditando) return
    setEstoque(estoque.map((p: any) => p.id === pecaEditando.id ? pecaEditando : p))
    setPecaEditando(null)
    alert('Estoque atualizado!')
  }

  const excluirPecaEstoque = (id: number) => {
    if (confirm('Deseja remover este item?')) setEstoque(estoque.filter((p: any) => p.id !== id))
  }

  const adicionarItemOrcamentoTemp = () => {
    const pObj = estoque.find((p: any) => p.id === Number(pecaOrcId))
    if (!pObj) return

    const novoItem = {
      pecaId: pObj.id,
      nome: pObj.nome,
      unidade: pObj.unidade,
      quantidade: Number(qtdOrcPeca),
      valorUnitario: pObj.precoVenda,
      total: Number(qtdOrcPeca) * pObj.precoVenda
    }
    setOrcItensTemp([...orcItensTemp, novoItem])
  }

  const removerItemOrcamentoTemp = (index: number) => {
    setOrcItensTemp(orcItensTemp.filter((_, i) => i !== index))
  }

  const calcularTotalOrcTemp = () => {
    const totalItens = orcItensTemp.reduce((acc, i) => acc + i.total, 0)
    return Number(orcMaoDeObra) + totalItens
  }

  const criarOrcamento = (e: React.FormEvent) => {
    e.preventDefault()
    const novoOrc = {
      id: `ORC-2026-0${orcamentos.length + 1}`,
      cliente: orcCliente,
      equipamento: orcEquipamento,
      servicoDescricao: orcServicoDesc,
      maoDeObra: Number(orcMaoDeObra),
      itensOrcamento: [...orcItensTemp],
      total: calcularTotalOrcTemp(),
      status: 'Aguardando Aprovação'
    }
    setOrcamentos([...orcamentos, novoOrc])
    setOrcItensTemp([])
    alert('Orçamento emitido com sucesso!')
  }

  const excluirOrcamento = (orcId: string) => {
    if (confirm('Excluir orçamento?')) setOrcamentos(orcamentos.filter((o: any) => o.id !== orcId))
  }

  const aprovarOrcamentoConverterOS = (orcId: string) => {
    const orc = orcamentos.find((o: any) => o.id === orcId)
    if (!orc) return

    for (const item of orc.itensOrcamento) {
      const pEstoque = estoque.find((p: any) => p.id === item.pecaId)
      if (pEstoque) {
        setEstoque((prev: any) => prev.map((p: any) => p.id === item.pecaId ? { ...p, quantidade: Number((p.quantidade - item.quantidade).toFixed(2)) } : p))
      }
    }

    setOrcamentos(orcamentos.map((o: any) => o.id === orcId ? { ...o, status: 'Aprovado & Convertido 🚀' } : o))
    
    const novaOS = {
      id: `OS-2026-0${90 + ordensServico.length}`,
      cliente: orc.cliente,
      telefone: '(14) 99168-9815',
      endereco: 'Endereço cadastrado',
      equipamento: orc.equipamento,
      servico: orc.servicoDescricao,
      valorServico: orc.maoDeObra,
      pecasUtilizadas: orc.itensOrcamento,
      valorTotal: orc.total,
      status: 'Em Andamento',
      dataAgendamento: new Date().toISOString().split('T')[0]
    }
    setOrdensServico([...ordensServico, novaOS])
    alert('Orçamento aprovado, convertido em OS e estoque baixado!')
  }

  const adicionarPecaNaOS = (osId: string) => {
    const pecaObj = estoque.find((p: any) => p.id === Number(pecaSelecionadaId))
    if (!pecaObj) return

    setEstoque(estoque.map((p: any) => p.id === pecaObj.id ? { ...p, quantidade: Number((p.quantidade - qtdPecaOS).toFixed(2)) } : p))

    setOrdensServico(ordensServico.map((os: any) => {
      if (os.id === osId) {
        const itemExistente = os.pecasUtilizadas.find((p: any) => p.pecaId === pecaObj.id)
        let novasPecas = []
        if (itemExistente) {
          novasPecas = os.pecasUtilizadas.map((p: any) => p.pecaId === pecaObj.id ? {
            ...p,
            quantidade: Number((p.quantidade + qtdPecaOS).toFixed(2)),
            total: (p.quantidade + qtdPecaOS) * p.valorUnitario
          } : p)
        } else {
          novasPecas = [...os.pecasUtilizadas, {
            pecaId: pecaObj.id,
            nome: pecaObj.nome,
            unidade: pecaObj.unidade,
            quantidade: qtdPecaOS,
            valorUnitario: pecaObj.precoVenda,
            total: qtdPecaOS * pecaObj.precoVenda
          }]
        }

        const totalPecas = novasPecas.reduce((acc: number, item: any) => acc + item.total, 0)
        const osAtualizada = { ...os, pecasUtilizadas: novasPecas, valorTotal: os.valorServico + totalPecas }
        if (osEditandoPecas && osEditandoPecas.id === osId) setOsEditandoPecas(osAtualizada)
        return osAtualizada
      }
      return os
    }))
    alert('Item lançado na OS e estoque atualizado!')
  }

  const removerPecaDaOS = (osId: string, pecaId: number) => {
    setOrdensServico(ordensServico.map((os: any) => {
      if (os.id === osId) {
        const pecaRemovida = os.pecasUtilizadas.find((p: any) => p.pecaId === pecaId)
        if (pecaRemovida) {
          setEstoque(estoque.map((p: any) => p.id === pecaId ? { ...p, quantidade: Number((p.quantidade + pecaRemovida.quantidade).toFixed(2)) } : p))
        }
        const novasPecas = os.pecasUtilizadas.filter((p: any) => p.pecaId !== pecaId)
        const totalPecas = novasPecas.reduce((acc: number, item: any) => acc + item.total, 0)
        const osAtualizada = { ...os, pecasUtilizadas: novasPecas, valorTotal: os.valorServico + totalPecas }
        if (osEditandoPecas && osEditandoPecas.id === osId) setOsEditandoPecas(osAtualizada)
        return osAtualizada
      }
      return os
    }))
  }

  const concluirAtendimentoOS = (osId: string) => {
    setOrdensServico(ordensServico.map((os: any) => os.id === osId ? { ...os, status: 'Concluído ✅' } : os))
    alert('OS Concluída!')
  }

  const excluirOS = (osId: string) => {
    if (confirm('Excluir OS?')) setOrdensServico(ordensServico.filter((os: any) => os.id !== osId))
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
    alert('Contrato criado!')
  }

  const alternarStatusParcela = (mensId: string, indexParcela: number) => {
    setMensalidades(mensalidades.map((m: any) => {
      if (m.id === mensId) {
        const novoHist = [...m.historicoPagamentos]
        const atual = novoHist[indexParcela].status
        novoHist[indexParcela].status = atual.includes('Pago') ? 'Pendente ⏳' : 'Pago ✅'
        const pagasCount = novoHist.filter((h: any) => h.status.includes('Pago')).length
        const atualizado = { ...m, parcelasPagas: pagasCount, statusPagamento: pagasCount === m.totalParcelas ? 'Concluído 🟢' : 'Em Dia 🟢', historicoPagamentos: novoHist }
        if (modalDetalheMensalidade && modalDetalheMensalidade.id === mensId) setModalDetalheMensalidade(atualizado)
        return atualizado
      }
      return m
    }))
  }

  const adicionarFuncionario = (e: React.FormEvent) => {
    e.preventDefault()
    if (!novoNomeFunc || !novoEmailFunc) return
    setEquipe([...equipe, { id: equipe.length + 1, nome: novoNomeFunc, cargo: novoCargoFunc, email: novoEmailFunc, senha: novaSenhaFunc }])
    setNovoNomeFunc(''); setNovoEmailFunc(''); setNovaSenhaFunc('123456')
    alert('Funcionário cadastrado!')
  }

  const salvarEdicaoFuncionario = (e: React.FormEvent) => {
    e.preventDefault()
    if (!funcEditando) return
    setEquipe(equipe.map((f: any) => f.id === funcEditando.id ? funcEditando : f))
    setFuncEditando(null)
    alert('Senha atualizada!')
  }

  const totalEntradaFaturamento = ordensServico.reduce((acc: number, item: any) => acc + item.valorTotal, 0)
  const totalMensalidadesRecebidas = mensalidades.reduce((acc: number, item: any) => {
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
            <h1 className="text-2xl font-black">Nando's <span className="text-turquoise">ClimaPro V10.1</span></h1>
            <p className="text-xs text-slate-400">Sistema Master com Salvamento Automático</p>
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
                <span>2. Estoque Inteligente</span>
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
                <span>4. Mensalidades & Contratos</span>
              </button>
            )}

            {!isTecnicoOuAjudante && (
              <button onClick={() => setActiveModule('ORCAMENTOS')} className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-xl font-semibold cursor-pointer ${activeModule === 'ORCAMENTOS' ? 'bg-turquoise text-navy font-bold' : 'text-slate-300 hover:bg-navy-light'}`}>
                <FileText className="w-4 h-4" />
                <span>5. Orçamentos Inteligentes</span>
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
          <div className="flex items-center space-x-1.5 text-emerald-400 font-bold">
            <CheckCircle2 className="w-4 h-4" />
            <span>Dados Salvos Automáticos</span>
          </div>
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
        {/* MÓDULO 1: OS */}
        {activeModule === 'OS' && (
          <div className="space-y-6">
            <div className="border-b pb-4">
              <h2 className="text-2xl font-extrabold text-navy">Módulo 1: Ordens de Serviço (OS)</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {ordensServico.map((os: any) => (
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
                    <p><strong>Mão de Obra:</strong> R$ {os.valorServico.toFixed(2)}</p>
                    
                    <div className="bg-slate-50 p-3 rounded-xl border space-y-2">
                      <div className="flex justify-between items-center">
                        <strong className="text-navy text-xs flex items-center"><Package className="w-3.5 h-3.5 mr-1 text-turquoise" /> Itens / Medidas Usadas:</strong>
                        {!isTecnicoOuAjudante && (
                          <button onClick={() => setOsEditandoPecas(os)} className="text-[11px] bg-turquoise/20 text-navy font-bold px-2 py-1 rounded-lg cursor-pointer">
                            + Add Item/Metro
                          </button>
                        )}
                      </div>

                      {os.pecasUtilizadas && os.pecasUtilizadas.length > 0 ? (
                        <ul className="space-y-1 text-[11px] text-slate-600">
                          {os.pecasUtilizadas.map((p: any, idx: number) => (
                            <li key={idx} className="flex justify-between border-b pb-1">
                              <span>{p.quantidade} {p.unidade} de {p.nome}</span>
                              <strong className="text-navy">R$ {p.total.toFixed(2)}</strong>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-[11px] text-slate-400 italic">Nenhum item lançado.</p>
                      )}
                    </div>

                    <div className="pt-2 border-t flex justify-between items-center">
                      <span className="text-slate-900 font-extrabold text-base">Valor Total: <strong className="text-emerald-600">R$ {os.valorTotal.toFixed(2)}</strong></span>
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
              <h2 className="text-2xl font-extrabold text-navy">Módulo 2: Estoque Inteligente</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <form onSubmit={adicionarPecaEstoque} className="bg-white p-6 rounded-2xl border shadow-sm space-y-4 lg:col-span-1">
                <h3 className="font-bold text-navy text-sm border-b pb-2">Cadastrar Novo Item</h3>
                <div className="space-y-3 text-xs">
                  <div>
                    <label className="block font-bold mb-1">Nome do Item *</label>
                    <input type="text" value={novoNomePeca} onChange={e => setNovoNomePeca(e.target.value)} placeholder="Ex: Cabo PP ou Gás R410" required className="w-full p-2.5 border rounded-xl" />
                  </div>
                  <div>
                    <label className="block font-bold mb-1">Unidade de Medida</label>
                    <select value={novaUnidadePeca} onChange={e => setNovaUnidadePeca(e.target.value)} className="w-full p-2.5 border rounded-xl bg-white font-bold">
                      <option value="m">Metros (m)</option>
                      <option value="kg">Quilos (kg)</option>
                      <option value="g">Gramas (g)</option>
                      <option value="un">Unidade (un)</option>
                    </select>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <label className="block font-bold mb-1">Qtd *</label>
                      <input type="number" step="0.1" value={novaQtdPeca} onChange={e => setNovaQtdPeca(Number(e.target.value))} required className="w-full p-2.5 border rounded-xl font-bold" />
                    </div>
                    <div>
                      <label className="block font-bold mb-1">Custo R$ *</label>
                      <input type="number" step="0.01" value={novoCustoPeca} onChange={e => setNovoCustoPeca(Number(e.target.value))} required className="w-full p-2.5 border rounded-xl font-bold text-rose-600" />
                    </div>
                    <div>
                      <label className="block font-bold mb-1">Venda R$ *</label>
                      <input type="number" step="0.01" value={novoVendaPeca} onChange={e => setNovoVendaPeca(Number(e.target.value))} required className="w-full p-2.5 border rounded-xl font-bold text-emerald-600" />
                    </div>
                  </div>
                  <button type="submit" className="w-full bg-turquoise text-navy font-bold py-3 rounded-xl shadow cursor-pointer">Adicionar ao Estoque</button>
                </div>
              </form>

              <div className="bg-white p-6 rounded-2xl border shadow-sm space-y-4 lg:col-span-2">
                <h3 className="font-bold text-navy text-sm border-b pb-2">Itens no Estoque ({estoque.length})</h3>
                <div className="space-y-3">
                  {estoque.map((item: any) => (
                    <div key={item.id} className="border rounded-xl p-4 bg-slate-50 flex justify-between items-center text-xs">
                      <div>
                        <span className="text-[10px] font-mono font-bold bg-navy text-turquoise px-2 py-0.5 rounded">{item.codigo}</span>
                        <h4 className="font-bold text-navy text-sm mt-1">{item.nome} ({item.unidade})</h4>
                        <p className="text-slate-500 mt-0.5">
                          Custo: <strong className="text-rose-600">R$ {item.precoCusto?.toFixed(2)}</strong> | 
                          Venda: <strong className="text-emerald-600">R$ {item.precoVenda?.toFixed(2)}</strong>
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="font-extrabold px-3 py-1 bg-sky-100 text-sky-900 rounded-full">Saldo: {item.quantidade} {item.unidade}</span>
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
                    <input type="text" maxLength={8} value={cepCli} onChange={e
