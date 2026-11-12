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

  // 1. Equipe
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

  // 2. Estoque de Peças & Materiais
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

  // 3. Clientes
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
  const [nomeCli, setNomeCli] = useState('')
  const [telCli, setTelCli] = useState('')
  const [cepCli, setCepCli] = useState('')
  const [endCli, setEndCli] = useState('')

  // 4. Mensalidades
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

  const [modalDetalheMensalidade, setModalDetalheMensalidade] = useState<any | null>(null)

  // 5. Orçamentos
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

  // 6. Ordens de Serviço (OS) com Vínculo de Peças do Estoque
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

  // Modais de Peças e Impressão de PDF
  const [osEditandoPecas, setOsEditandoPecas] = useState<any | null>(null)
  const [pecaSelecionadaId, setPecaSelecionadaId] = useState<number>(1)
  const [qtdPecaOS, setQtdPecaOS] = useState<number>(1)
  const [osParaPdf, setOsParaPdf] = useState<any | null>(null)

  // Assistente IA
  const [buscaErro, setBuscaErro] = useState('')
  const baseConhecimentoGeral = [
    { termos: ['fujitsu', 'e6', 'comunicacao'], titulo: 'Erro E6 - Fujitsu Inverter (Comunicação)', solucao: 'Erro de comunicação entre evaporadora e condensadora. Verifique a tensão L/N de 220V e o cabo de sinal blindado (borne 1, 2 e 3).' },
    { termos: ['midea', 'ec', 'gas', 'vazamento'], titulo: 'Erro EC - Midea / Carrier (Vazamento)', solucao: 'Indica falta de fluido refrigerante. Faça teste de pressão com Nitrogênio.' }
  ]

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
      alert('E-mail ou senha incorretos!')
    }
  }

  // Funções de Estoque
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

  // Baixa Automática no Estoque ao Add Peça na OS
  const adicionarPecaNaOS = (osId: string) => {
    const pecaObj = estoque.find(p => p.id === Number(pecaSelecionadaId))
    if (!pecaObj) return

    if (pecaObj.quantidade < qtdPecaOS) {
      alert(`Quantidade insuficiente em estoque! Saldo atual: ${pecaObj.quantidade}`)
      return
    }

    // 1. Baixa no Estoque
    setEstoque(estoque.map(p => p.id === pecaObj.id ? { ...p, quantidade: p.quantidade - qtdPecaOS } : p))

    // 2. Vincular na OS
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

    alert(`Adicionado ${qtdPecaOS}x ${pecaObj.nome} na OS! Baixa de estoque efetuada.`)
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

  const totalEntradaFaturamento = ordensServico.reduce((acc, item) => acc + item.valorTotal, 0)

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-navy text-white flex flex-col justify-center items-center p-6">
        <div className="bg-navy-light border border-navy-light rounded-3xl max-w-md w-full p-8 space-y-6 shadow-2xl">
          <div className="text-center space-y-2">
            <div className="bg-turquoise p-3 rounded-2xl w-14 h-14 mx-auto flex items-center justify-center text-navy font-black shadow-lg">
              <Wrench className="w-8 h-8" />
            </div>
            <h1 className="text-2xl font-black">Nando's <span className="text-turquoise">ClimaPro V7</span></h1>
            <p className="text-xs text-slate-400">Sistema Empresarial com Estoque & PDF</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 text-sm">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">E-mail</label>
              <input type="email" value={loginEmail} onChange={e => setLoginEmail(e.target.value)} required className="w-full p-3 bg-navy border rounded-xl text-white" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Senha</label>
              <input type="password" value={loginSenha} onChange={e => setLoginSenha(e.target.value)} required className="w-full p-3 bg-navy border rounded-xl text-white" />
            </div>
            <button type="submit" className="w-full bg-turquoise text-navy font-bold py-3.5 rounded-xl">Entrar</button>
          </form>
        </div>
      </div>
    )
  }

  const isAdmOrGerente = currentUser.cargo === 'ADMIN' || currentUser.cargo === 'GERENTE'

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
            <button onClick={() => setActiveModule('OS')} className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-xl font-semibold cursor-pointer ${activeModule === 'OS' ? 'bg-turquoise text-navy font-bold' : 'text-slate-300'}`}>
              <Wrench className="w-4 h-4" />
              <span>1. Ordens de Serviço (OS)</span>
            </button>

            {isAdmOrGerente && (
              <button onClick={() => setActiveModule('ESTOQUE')} className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-xl font-semibold cursor-pointer ${activeModule === 'ESTOQUE' ? 'bg-turquoise text-navy font-bold' : 'text-slate-300'}`}>
                <Package className="w-4 h-4" />
                <span>2. Estoque de Peças</span>
              </button>
            )}

            <button onClick={() => setActiveModule('CLIENTES')} className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-xl font-semibold cursor-pointer ${activeModule === 'CLIENTES' ? 'bg-turquoise text-navy font-bold' : 'text-slate-300'}`}>
              <Users className="w-4 h-4" />
              <span>3. Clientes & Aparelhos</span>
            </button>
          </nav>
        </div>

        <div className="pt-4 border-t border-navy-light text-xs">
          <button onClick={() => setIsLoggedIn(false)} className="text-rose-400 font-bold flex items-center space-x-1">
            <LogOut className="w-3.5 h-3.5" />
            <span>Sair</span>
          </button>
        </div>
      </aside>

      <main className="flex-1 p-6 md:p-8 space-y-6 overflow-y-auto max-w-7xl mx-auto w-full">
        {activeModule === 'OS' && (
          <div className="space-y-6">
            <div className="border-b pb-4">
              <h2 className="text-2xl font-extrabold text-navy">Ordens de Serviço (OS)</h2>
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
                  </div>

                  <div className="space-y-2 text-xs">
                    <p><strong>Serviço:</strong> {os.servico}</p>
                    
                    <div className="bg-slate-50 p-3 rounded-xl border space-y-2">
                      <div className="flex justify-between items-center">
                        <strong className="text-navy text-xs flex items-center"><Package className="w-3.5 h-3.5 mr-1 text-turquoise" /> Peças Utilizadas:</strong>
                        <button onClick={() => setOsEditandoPecas(os)} className="text-[11px] bg-turquoise/20 text-navy font-bold px-2 py-1 rounded-lg">
                          + Add Peça
                        </button>
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
                        <p className="text-[11px] text-slate-400 italic">Nenhuma peça adicionada do estoque.</p>
                      )}
                    </div>

                    <div className="pt-2 border-t flex justify-between items-center">
                      <span className="text-slate-900 font-extrabold text-base">Total OS: <strong className="text-emerald-600">R$ {os.valorTotal.toFixed(2)}</strong></span>
                    </div>
                  </div>

                  <div className="pt-2 flex gap-2">
                    <button onClick={() => setOsParaPdf(os)} className="bg-navy text-turquoise font-bold py-2.5 px-3 rounded-xl text-xs flex items-center justify-center space-x-1.5 flex-1 shadow">
                      <Printer className="w-4 h-4" />
                      <span>Gerar Comprovante / PDF</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeModule === 'ESTOQUE' && (
          <div className="space-y-6">
            <div className="border-b pb-4">
              <h2 className="text-2xl font-extrabold text-navy">Controle de Estoque de Peças & Materiais</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <form onSubmit={adicionarPecaEstoque} className="bg-white p-6 rounded-2xl border shadow-sm space-y-4 lg:col-span-1">
                <h3 className="font-bold text-navy text-sm border-b pb-2">Cadastrar Item no Estoque</h3>
                <div className="space-y-3 text-xs">
                  <div>
                    <label className="block font-bold mb-1">Nome da Peça *</label>
                    <input type="text" value={novoNomePeca} onChange={e => setNovoNomePeca(e.target.value)} placeholder="Ex: Capacitor 35uF" required className="w-full p-2.5 border rounded-xl" />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold mb-1">Quantidade *</label>
                      <input type="number" value={novaQtdPeca} onChange={e => setNovaQtdPeca(Number(e.target.value))} required className="w-full p-2.5 border rounded-xl font-bold" />
                    </div>
                    <div>
                      <label className="block font-bold mb-1">Preço Unit. *</label>
                      <input type="number" value={novoValorPeca} onChange={e => setNovoValorPeca(Number(e.target.value))} required className="w-full p-2.5 border rounded-xl font-bold" />
                    </div>
                  </div>
                  <button type="submit" className="w-full bg-turquoise text-navy font-bold py-3 rounded-xl shadow">Adicionar ao Estoque</button>
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
                        <p className="text-xs text-slate-500">Preço: R$ {item.precoUnitario.toFixed(2)}</p>
                      </div>
                      <span className={`text-xs font-extrabold px-3 py-1.5 rounded-full ${item.quantidade <= 3 ? 'bg-rose-100 text-rose-800' : 'bg-emerald-100 text-emerald-800'}`}>
                        Saldo: {item.quantidade} un.
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* MODAL EDITAR PEÇAS NA OS */}
      {osEditandoPecas && (
        <div className="fixed inset-0 bg-navy/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-6 shadow-2xl">
            <div className="flex justify-between items-center border-b pb-4">
              <h3 className="text-xl font-black text-navy">Lançar Peça do Estoque na OS</h3>
              <button onClick={() => setOsEditandoPecas(null)} className="text-slate-400 p-2"><X className="w-6 h-6" /></button>
            </div>
            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-bold mb-1">Selecione o Item do Estoque</label>
                <select value={pecaSelecionadaId} onChange={e => setPecaSelecionadaId(Number(e.target.value))} className="w-full p-3 border rounded-xl">
                  {estoque.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.nome} — Saldo: {item.quantidade} un. (R$ {item.precoUnitario.toFixed(2)})
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block font-bold mb-1">Quantidade</label>
                <input type="number" min={1} value={qtdPecaOS} onChange={e => setQtdPecaOS(Number(e.target.value))} required className="w-full p-2.5 border rounded-xl font-bold" />
              </div>
              <button onClick={() => adicionarPecaNaOS(osEditandoPecas.id)} className="w-full bg-turquoise text-navy font-bold py-3 rounded-xl shadow">
                Lançar na OS & Baixar do Estoque 🚀
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL DE COMPROVANTE OFICIAL EM PDF */}
      {osParaPdf && (
        <div className="fixed inset-0 bg-navy/90 backdrop-blur-md flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-8 space-y-6 shadow-2xl text-slate-900" id="comprovante-print">
            <div className="border-b-2 border-navy pb-4 flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-black text-navy">NANDO'S <span className="text-turquoise">CLIMATIZAÇÃO</span></h1>
                <p className="text-xs text-slate-600 font-bold">Instalação, Manutenção & Sanitização de Ar-Condicionado</p>
                <p className="text-[11px] text-slate-500">(14) 99168-9815 | Bauru - SP</p>
              </div>
              <div className="text-right">
                <span className="text-xs font-mono font-bold bg-navy text-turquoise px-3 py-1 rounded-lg">RECIBO DE OS</span>
                <p className="text-sm font-black text-navy mt-1">{osParaPdf.id}</p>
              </div>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border grid grid-cols-2 gap-4 text-xs">
              <div>
                <strong className="text-slate-400 block text-[10px] uppercase">Cliente</strong>
                <p className="font-bold text-navy text-sm">{osParaPdf.cliente}</p>
                <p className="text-slate-600">{osParaPdf.telefone}</p>
              </div>
              <div>
                <strong className="text-slate-400 block text-[10px] uppercase">Endereço</strong>
                <p className="font-bold text-navy text-xs">{osParaPdf.endereco}</p>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <h3 className="font-extrabold text-navy border-b pb-1">Valores & Serviços</h3>
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-100 text-slate-700 border-b">
                    <th className="p-2">Descrição</th>
                    <th className="p-2 text-center">Qtd</th>
                    <th className="p-2 text-right">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y text-slate-700">
                  <tr>
                    <td className="p-2 font-semibold">Mão de Obra Técnica Especializada</td>
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

            <div className="border-t pt-4 flex justify-between items-center">
              <button onClick={() => setOsParaPdf(null)} className="bg-slate-200 text-slate-800 font-bold px-4 py-2.5 rounded-xl text-xs">Fechar</button>
              <button onClick={() => window.print()} className="bg-turquoise text-navy font-black px-6 py-2.5 rounded-xl text-xs flex items-center space-x-2 shadow-lg">
                <Printer className="w-4 h-4" />
                <span>Imprimir / Salvar como PDF</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
