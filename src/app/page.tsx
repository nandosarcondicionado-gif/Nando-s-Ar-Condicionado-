import {
  AirVent, CalendarDays, ClipboardList, Users, Package, Wallet,
  FileText, Wrench, TrendingUp, Clock3, MapPin, ShieldCheck
} from "lucide-react";

const modules = [
  { name: "Clientes", detail: "Cadastros e equipamentos", icon: Users },
  { name: "Orçamentos", detail: "Valores, materiais e descontos", icon: FileText },
  { name: "Ordens de serviço", detail: "Execução e documentos", icon: ClipboardList },
  { name: "Agenda", detail: "Equipe, horários e capacidade diária", icon: CalendarDays },
  { name: "Estoque", detail: "Almoxarifado e consumo por serviço", icon: Package },
  { name: "Financeiro", detail: "Caixa, contas e resultados", icon: Wallet },
  { name: "Equipe", detail: "Técnicos, ajudantes e permissões", icon: ShieldCheck },
  { name: "Assistente técnico", detail: "Diagnóstico e procedimentos", icon: Wrench }
];

function Metric({ title, value, note, icon: Icon }: {
  title: string; value: string; note: string; icon: typeof AirVent
}) {
  return <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-soft">
    <div className="flex items-center justify-between">
      <p className="text-sm font-medium text-slate-500">{title}</p>
      <span className="rounded-xl bg-brand-100 p-2 text-brand-800"><Icon size={19}/></span>
    </div>
    <p className="mt-4 text-2xl font-bold text-brand-950">{value}</p>
    <p className="mt-1 text-xs text-slate-500">{note}</p>
  </article>;
}

export default function Home() {
  return <main className="min-h-screen">
    <header className="bg-brand-950 text-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5">
        <div className="flex items-center gap-3">
          <span className="rounded-xl bg-brand-600 p-2.5"><AirVent size={25}/></span>
          <div><p className="text-lg font-bold tracking-tight">Nando’s ClimaPro</p>
            <p className="text-xs text-slate-300">GESTÃO INTELIGENTE DE CLIMATIZAÇÃO</p></div>
        </div>
        <span className="rounded-full border border-white/20 px-3 py-1.5 text-xs text-slate-200">Ambiente de desenvolvimento</span>
      </div>
    </header>

    <div className="mx-auto max-w-7xl px-5 py-8">
      <section className="mb-8 overflow-hidden rounded-3xl bg-gradient-to-br from-brand-950 via-brand-900 to-brand-600 p-7 text-white shadow-soft md:p-10">
        <p className="text-sm font-semibold uppercase tracking-[.18em] text-teal-200">Painel administrativo</p>
        <h1 className="mt-3 max-w-2xl text-3xl font-bold leading-tight md:text-4xl">Sua empresa organizada. Seus serviços sob controle.</h1>
        <p className="mt-3 max-w-xl text-sm leading-6 text-slate-200">Clientes, orçamentos, ordens de serviço, agenda, estoque e financeiro em um só lugar.</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <span className="rounded-xl bg-white px-4 py-2.5 text-sm font-bold text-brand-950">Qualidade e confiança em todos os detalhes.</span>
          <span className="rounded-xl border border-white/30 px-4 py-2.5 text-sm">Online + offline planejado</span>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Metric title="Serviços de hoje" value="—" note="Aguardando conexão do banco" icon={CalendarDays}/>
        <Metric title="Orçamentos pendentes" value="—" note="Indicador será integrado" icon={FileText}/>
        <Metric title="Contas a receber" value="—" note="Sem dados fictícios" icon={TrendingUp}/>
        <Metric title="Estoque baixo" value="—" note="Alertas após cadastro" icon={Package}/>
      </section>

      <section className="mt-9">
        <div className="mb-4 flex items-end justify-between">
          <div><h2 className="text-xl font-bold text-brand-950">Módulos da empresa</h2>
            <p className="mt-1 text-sm text-slate-500">Estrutura inicial da nova plataforma</p></div>
          <span className="text-xs font-semibold text-brand-600">FASE 1 · FUNDAÇÃO</span>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {modules.map(({name, detail, icon: Icon}) => <article key={name} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-soft transition hover:-translate-y-0.5 hover:border-brand-500">
            <span className="inline-flex rounded-xl bg-brand-100 p-3 text-brand-800"><Icon size={22}/></span>
            <h3 className="mt-4 font-bold text-brand-950">{name}</h3>
            <p className="mt-1 text-sm leading-5 text-slate-500">{detail}</p>
          </article>)}
        </div>
      </section>

      <section className="mt-8 grid gap-4 md:grid-cols-2">
        <article className="rounded-2xl border border-slate-200 bg-white p-5">
          <div className="flex items-center gap-2 font-bold text-brand-950"><Clock3 size={18}/> Próximos passos</div>
          <ol className="mt-4 space-y-3 text-sm text-slate-600">
            <li>01 · Criar o repositório independente e configurar a Vercel.</li>
            <li>02 · Preparar Neon, autenticação e perfis de acesso.</li>
            <li>03 · Criar banco e migração auditável dos dados antigos.</li>
            <li>04 · Implementar módulos e sincronização offline.</li>
          </ol>
        </article>
        <article className="rounded-2xl border border-slate-200 bg-white p-5">
          <div className="flex items-center gap-2 font-bold text-brand-950"><MapPin size={18}/> Regra de segurança</div>
          <p className="mt-3 text-sm leading-6 text-slate-600">Os valores, lucros, caixa e relatórios financeiros serão protegidos no servidor. O perfil técnico receberá somente os dados operacionais autorizados para cada ordem de serviço.</p>
        </article>
      </section>
      <footer className="py-8 text-center text-xs text-slate-400">Nando’s ClimaPro · Fundação do novo sistema · Não utilizar ainda para operações reais</footer>
    </div>
  </main>;
}
