"use client";

import { useEffect, useMemo, useState } from "react";
import {
  AirVent, Users, Snowflake, FileText, ClipboardList, CalendarDays, Package,
  Wallet, ShieldCheck, FileBarChart, Wrench, Plus, Search, Trash2, Pencil,
  Save, X, Menu, Wifi, WifiOff, RefreshCw, LayoutDashboard, ClipboardCheck,
  CircleDollarSign, Boxes, UserRound, ScrollText
} from "lucide-react";
import { offlineDb, type EntityName, type LocalRecord } from "@/lib/offline-db";

const modules: {id: EntityName; label:string; description:string; icon:any; fields:string[]}[] = [
  {id:"clientes",label:"Clientes",description:"Cadastro e contato",icon:Users,fields:["Nome completo","Telefone / WhatsApp","Endereço e cidade","Observações"]},
  {id:"equipamentos",label:"Equipamentos",description:"Aparelhos e histórico",icon:Snowflake,fields:["Cliente","Marca e modelo","Capacidade BTU","Local instalado"]},
  {id:"orcamentos",label:"Orçamentos",description:"Serviços, materiais e descontos",icon:FileText,fields:["Cliente","Serviços e materiais","Desconto","Validade"]},
  {id:"ordens",label:"Ordens de serviço",description:"Execução e atendimento",icon:ClipboardList,fields:["Cliente","Serviço","Técnico","Data e garantia"]},
  {id:"agenda",label:"Agenda",description:"Agendamentos da equipe",icon:CalendarDays,fields:["Cliente","Data e horário","Técnico","Duração"]},
  {id:"estoque",label:"Estoque",description:"Produtos e movimentações",icon:Package,fields:["Produto","Quantidade","Custo","Estoque mínimo"]},
  {id:"financeiro",label:"Financeiro",description:"Entradas, saídas e recebimentos",icon:Wallet,fields:["Descrição","Valor","Vencimento","Forma de pagamento"]},
  {id:"equipe",label:"Equipe",description:"Técnicos e ajudantes",icon:ShieldCheck,fields:["Nome","Função","Telefone","Permissão"]},
  {id:"contratos",label:"Contratos",description:"Planos e manutenções recorrentes",icon:ScrollText,fields:["Cliente","Plano","Periodicidade","Vencimento"]}
];
const money = (v:number) => v.toLocaleString("pt-BR",{style:"currency",currency:"BRL"});
const empty = {title:"",details:"",amount:"",status:"Pendente",customer:"",date:""};

export default function Home() {
  const [active,setActive] = useState<EntityName|"dashboard"|"relatorios"|"assistente">("dashboard");
  const [records,setRecords] = useState<LocalRecord[]>([]);
  const [form,setForm] = useState(empty);
  const [editing,setEditing] = useState<string|null>(null);
  const [showForm,setShowForm] = useState(false);
  const [search,setSearch] = useState("");
  const [notice,setNotice] = useState("");
  const [online,setOnline] = useState(true);
  const [menuOpen,setMenuOpen] = useState(false);

  async function refresh() {
    const data = await offlineDb.records.toArray();
    setRecords(data.sort((a,b)=>b.updatedAt.localeCompare(a.updatedAt)));
  }
  useEffect(()=>{
    refresh().catch(()=>setNotice("Não foi possível iniciar o armazenamento local."));
    setOnline(navigator.onLine);
    const onOn=()=>setOnline(true), onOff=()=>setOnline(false);
    window.addEventListener("online",onOn); window.addEventListener("offline",onOff);
    return ()=>{window.removeEventListener("online",onOn);window.removeEventListener("offline",onOff);};
  },[]);
  const current = modules.find(m=>m.id===active);
  const visible = useMemo(()=>records.filter(r=>r.module===active && [r.title,r.customer,r.details,r.status].join(" ").toLowerCase().includes(search.toLowerCase())),[records,active,search]);
  const counts = useMemo(()=>Object.fromEntries(modules.map(m=>[m.id,records.filter(r=>r.module===m.id).length])) as Record<EntityName,number>,[records]);

  function startNew(){setEditing(null);setForm(empty);setShowForm(true);setNotice("");}
  function startEdit(r:LocalRecord){setEditing(r.id);setForm({title:r.title,details:r.details,amount:String(r.amount||""),status:r.status,customer:r.customer,date:r.date});setShowForm(true);}
  async function save(e:React.FormEvent){
    e.preventDefault();
    if(!form.title.trim()){setNotice("Preencha o nome ou título do cadastro.");return;}
    if(active==="dashboard"||active==="relatorios"||active==="assistente")return;
    const now=new Date().toISOString(), id=editing||crypto.randomUUID();
    const item:LocalRecord={id,module:active,title:form.title.trim(),details:form.details,amount:Number(form.amount)||0,status:form.status,customer:form.customer,date:form.date,createdAt:editing?(records.find(r=>r.id===editing)?.createdAt||now):now,updatedAt:now,syncStatus:"pending"};
    await offlineDb.records.put(item);
    await offlineDb.pendingChanges.put({id:crypto.randomUUID(),entity:active,operation:editing?"update":"create",payload:item,createdAt:now,status:"pending",attempts:0});
    setShowForm(false);setForm(empty);setEditing(null);await refresh();setNotice("Salvo neste aparelho. A sincronização com a nuvem será ativada após configurar o servidor Neon.");
  }
  async function remove(r:LocalRecord){
    if(!confirm("Excluir este registro deste aparelho?"))return;
    const now=new Date().toISOString();await offlineDb.records.delete(r.id);
    await offlineDb.pendingChanges.put({id:crypto.randomUUID(),entity:r.module,operation:"delete",payload:{id:r.id},createdAt:now,status:"pending",attempts:0});
    await refresh();setNotice("Registro excluído localmente.");
  }
  const pending = records.filter(r=>r.syncStatus==="pending").length;

  return <div className="min-h-screen lg:flex">
    <aside className={`${menuOpen?"block":"hidden"} fixed inset-0 z-40 bg-brand-950 p-5 text-white lg:static lg:block lg:w-72 lg:shrink-0`}>
      <div className="flex items-center justify-between"><div className="flex items-center gap-3"><span className="rounded-xl bg-blue-600 p-2"><AirVent size={25}/></span><div><b className="text-lg">Nando’s ClimaPro</b><p className="text-[10px] tracking-widest text-blue-200">GESTÃO DE CLIMATIZAÇÃO</p></div></div><button className="lg:hidden" onClick={()=>setMenuOpen(false)}><X/></button></div>
      <p className="mb-2 mt-9 text-[10px] font-bold tracking-widest text-slate-400">PAINEL</p>
      <button onClick={()=>{setActive("dashboard");setMenuOpen(false)}} className={`mb-1 flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm ${active==="dashboard"?"bg-blue-700":"hover:bg-white/10"}`}><LayoutDashboard size={18}/> Visão geral</button>
      <p className="mb-2 mt-6 text-[10px] font-bold tracking-widest text-slate-400">GESTÃO DA EMPRESA</p>
      {modules.map(m=>{const I=m.icon;return <button key={m.id} onClick={()=>{setActive(m.id);setShowForm(false);setMenuOpen(false);setSearch("")}} className={`mb-1 flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-sm ${active===m.id?"bg-blue-700":"hover:bg-white/10"}`}><span className="flex items-center gap-3"><I size={17}/>{m.label}</span><span className="text-xs text-blue-200">{counts[m.id]||""}</span></button>})}
      <p className="mb-2 mt-6 text-[10px] font-bold tracking-widest text-slate-400">FERRAMENTAS</p>
      <button onClick={()=>setActive("relatorios")} className={`mb-1 flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm ${active==="relatorios"?"bg-blue-700":"hover:bg-white/10"}`}><FileBarChart size={17}/> Relatórios</button>
      <button onClick={()=>setActive("assistente")} className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm ${active==="assistente"?"bg-blue-700":"hover:bg-white/10"}`}><Wrench size={17}/> Assistente técnico</button>
      <div className="mt-10 rounded-xl border border-white/10 bg-white/5 p-3 text-xs text-slate-300"><p className="font-bold text-white">Nando’s Ar-Condicionado</p><p className="mt-1">Qualidade e confiança em todos os detalhes.</p><p className="mt-3 text-blue-200">Araraquara e região</p></div>
    </aside>
    <main className="min-w-0 flex-1">
      <header className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-4 sm:px-7">
        <div className="flex items-center gap-3"><button className="rounded-lg p-2 hover:bg-slate-100 lg:hidden" onClick={()=>setMenuOpen(true)}><Menu/></button><div><p className="text-xs text-slate-500">Nando’s Ar-Condicionado / {current?.label||({dashboard:"Painel",relatorios:"Relatórios",assistente:"Assistente técnico"} as any)[active]}</p><h1 className="text-xl font-bold text-brand-950">{current?.label||({dashboard:"Visão geral",relatorios:"Relatórios",assistente:"Assistente técnico"} as any)[active]}</h1></div></div>
        <div className={`flex items-center gap-2 rounded-full px-3 py-2 text-xs font-semibold ${online?"bg-emerald-50 text-emerald-700":"bg-amber-50 text-amber-800"}`}>{online?<Wifi size={15}/>:<WifiOff size={15}/>} {online?"Conectado":"Sem internet"}</div>
      </header>
      <div className="mx-auto max-w-7xl p-4 sm:p-7">
        {notice&&<div className="mb-4 flex items-start justify-between gap-3 rounded-xl border border-blue-100 bg-blue-50 p-3 text-sm text-blue-900">{notice}<button onClick={()=>setNotice("")}><X size={16}/></button></div>}
        {active==="dashboard"&&<>
          <section className="rounded-3xl bg-gradient-to-br from-brand-950 via-blue-900 to-blue-600 p-6 text-white shadow-soft sm:p-9"><p className="text-xs font-bold tracking-[.2em] text-cyan-200">PAINEL ADMINISTRATIVO</p><h2 className="mt-3 max-w-2xl text-3xl font-bold sm:text-4xl">Sua empresa organizada. Seus serviços sob controle.</h2><p className="mt-3 max-w-xl text-sm leading-6 text-blue-100">Cadastros, atendimentos e controles em uma plataforma preparada para trabalhar offline.</p><p className="mt-6 inline-block rounded-lg bg-white px-4 py-2 text-sm font-bold text-brand-950">Qualidade e confiança em todos os detalhes.</p></section>
          <section className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">{[{t:"Clientes",v:counts.clientes,i:Users},{t:"Equipamentos",v:counts.equipamentos,i:Snowflake},{t:"Orçamentos",v:counts.orcamentos,i:FileText},{t:"Ordens de serviço",v:counts.ordens,i:ClipboardCheck}].map(x=>{const I=x.i;return <article key={x.t} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-soft"><div className="flex justify-between text-sm text-slate-500">{x.t}<I size={19}/></div><p className="mt-3 text-3xl font-bold text-brand-950">{x.v}</p></article>})}</section>
          <h2 className="mb-3 mt-8 text-lg font-bold text-brand-950">Acesso rápido</h2><div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">{modules.map(m=>{const I=m.icon;return <button key={m.id} onClick={()=>setActive(m.id)} className="rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-soft hover:border-blue-400"><span className="inline-flex rounded-xl bg-blue-50 p-3 text-blue-800"><I/></span><h3 className="mt-3 font-bold">{m.label}</h3><p className="mt-1 text-sm text-slate-500">{m.description}</p><p className="mt-3 text-xs font-bold text-blue-700">{counts[m.id]||0} registro(s)</p></button>})}</div>
          <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900"><b>Armazenamento local:</b> os registros desta versão ficam no navegador/aparelho em que foram cadastrados. A sincronização entre aparelhos ainda depende da configuração do banco Neon e da API segura.</div>
        </>}
        {current&&<>
          <div className="flex flex-wrap items-end justify-between gap-3"><div><p className="text-sm text-slate-500">{current.description}</p><p className="mt-1 text-sm text-slate-500">{visible.length} registro(s)</p></div><button onClick={startNew} className="flex items-center gap-2 rounded-xl bg-blue-800 px-4 py-3 text-sm font-bold text-white hover:bg-blue-900"><Plus size={18}/> Novo cadastro</button></div>
          <div className="mt-5 flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3"><Search size={18} className="text-slate-400"/><input value={search} onChange={e=>setSearch(e.target.value)} className="w-full py-3 outline-none" placeholder="Pesquisar cadastro..."/></div>
          {showForm&&<form onSubmit={save} className="mt-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-soft"><div className="mb-4 flex items-center justify-between"><h2 className="font-bold">{editing?"Editar":"Novo"} — {current.label}</h2><button type="button" onClick={()=>setShowForm(false)}><X/></button></div><div className="grid gap-3 sm:grid-cols-2"><label className="text-sm font-semibold sm:col-span-2">Nome / título *<input required value={form.title} onChange={e=>setForm({...form,title:e.target.value})} className="mt-1 w-full rounded-xl border border-slate-300 p-3 font-normal" placeholder={current.fields[0]}/></label><label className="text-sm font-semibold">Cliente / referência<input value={form.customer} onChange={e=>setForm({...form,customer:e.target.value})} className="mt-1 w-full rounded-xl border border-slate-300 p-3 font-normal" placeholder="Nome do cliente"/></label><label className="text-sm font-semibold">Data<input type="date" value={form.date} onChange={e=>setForm({...form,date:e.target.value})} className="mt-1 w-full rounded-xl border border-slate-300 p-3 font-normal"/></label><label className="text-sm font-semibold">Valor (R$)<input type="number" min="0" step="0.01" value={form.amount} onChange={e=>setForm({...form,amount:e.target.value})} className="mt-1 w-full rounded-xl border border-slate-300 p-3 font-normal" placeholder="0,00"/></label><label className="text-sm font-semibold">Situação<select value={form.status} onChange={e=>setForm({...form,status:e.target.value})} className="mt-1 w-full rounded-xl border border-slate-300 bg-white p-3 font-normal">{["Pendente","Em andamento","Agendado","Aprovado","Concluído","Pago","Cancelado"].map(s=><option key={s}>{s}</option>)}</select></label><label className="text-sm font-semibold sm:col-span-2">Detalhes / observações<textarea rows={4} value={form.details} onChange={e=>setForm({...form,details:e.target.value})} className="mt-1 w-full rounded-xl border border-slate-300 p-3 font-normal" placeholder={current.fields.slice(1).join(" • ")}/></label></div><div className="mt-4 flex flex-wrap gap-2"><button className="flex items-center gap-2 rounded-xl bg-blue-800 px-5 py-3 font-bold text-white"><Save size={17}/> Salvar</button><button type="button" onClick={()=>setShowForm(false)} className="rounded-xl border border-slate-300 px-5 py-3 font-semibold">Cancelar</button></div></form>}
          <div className="mt-5 space-y-3">{visible.length===0?<div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center text-sm text-slate-500">Nenhum registro nesta área ainda. Toque em “Novo cadastro” para começar.</div>:visible.map(r=><article key={r.id} className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-soft"><div className="min-w-0"><h3 className="font-bold text-brand-950">{r.title}</h3><p className="mt-1 text-sm text-slate-600">{r.customer||"Sem referência"} {r.date?` · ${r.date}`:""}</p><p className="mt-1 whitespace-pre-wrap text-sm text-slate-500">{r.details}</p><div className="mt-2 flex flex-wrap gap-2 text-xs"><span className="rounded-full bg-slate-100 px-2 py-1">{r.status}</span>{r.amount>0&&<span className="rounded-full bg-emerald-50 px-2 py-1 font-bold text-emerald-800">{money(r.amount)}</span>}<span className="rounded-full bg-amber-50 px-2 py-1 text-amber-800">Aguardando sincronização</span></div></div><div className="flex gap-2"><button onClick={()=>startEdit(r)} className="rounded-lg border p-2" aria-label="Editar"><Pencil size={17}/></button><button onClick={()=>remove(r)} className="rounded-lg border border-red-200 p-2 text-red-600" aria-label="Excluir"><Trash2 size={17}/></button></div></article>)}</div>
        </>}
        {active==="relatorios"&&<section className="rounded-2xl border bg-white p-6"><h2 className="text-xl font-bold">Resumo dos cadastros</h2><p className="mt-1 text-sm text-slate-500">Contagem local por módulo. Os totais financeiros só serão consolidados após a implementação do financeiro.</p><div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{modules.map(m=><div key={m.id} className="rounded-xl bg-slate-50 p-4"><p className="text-sm text-slate-500">{m.label}</p><p className="mt-1 text-2xl font-bold">{counts[m.id]}</p></div>)}</div></section>}
        {active==="assistente"&&<section className="rounded-2xl border bg-white p-6"><div className="flex items-center gap-3"><Wrench className="text-blue-800"/><h2 className="text-xl font-bold">Assistente técnico</h2></div><p className="mt-3 text-sm leading-6 text-slate-600">Área reservada para apoio em diagnóstico de ar-condicionado, códigos de erro, procedimentos, medições e segurança. A consulta inteligente ainda não está conectada nesta versão.</p><div className="mt-4 rounded-xl bg-amber-50 p-4 text-sm text-amber-900">Sempre confirme procedimentos elétricos e de refrigeração com o manual do fabricante e instrumentos adequados. Não execute serviços energizados sem qualificação e proteção.</div></section>}
        <footer className="mt-10 flex flex-wrap items-center justify-between gap-2 border-t border-slate-200 py-5 text-xs text-slate-400"><span>Nando’s ClimaPro · Qualidade e confiança em todos os detalhes.</span><span>{pending} registro(s) na fila local</span></footer>
      </div>
    </main>
  </div>;
}
