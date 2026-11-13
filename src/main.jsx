import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  Activity, AlertTriangle, BarChart3, Bell, Boxes, CalendarDays, Check,
  ChevronDown, ChevronRight, CircleHelp, ClipboardCheck, Clock3, Eye, EyeOff,
  Factory, Gauge, HardHat, LayoutDashboard, LockKeyhole, LogOut, Menu, PackageCheck,
  Pause, Play, Plus, QrCode, Search, Settings, ShieldCheck, SlidersHorizontal, Sparkles,
  TimerReset, TrendingUp, UserRound, UsersRound, Wrench, X, Zap
} from 'lucide-react';
import logo from './logo.svg';
import './styles.css';
import './login.css';
import { ManagementPage } from './management.jsx';
import './ui.css';

const navItems = [
  { id: 'dashboard', label: 'Visão geral', icon: LayoutDashboard },
  { id: 'planning', label: 'Planeamento', icon: CalendarDays, badge: 3 },
  { id: 'orders', label: 'Ordens de fabrico', icon: ClipboardCheck, badge: 48 },
  { id: 'factory', label: 'Chão de fábrica', icon: Factory },
  { id: 'quality', label: 'Qualidade', icon: ShieldCheck, badge: 5 },
  { id: 'maintenance', label: 'Manutenção', icon: Wrench, badge: 2 },
];

const orders = [
  { id: 'OF-2481', client: 'Mota-Engil', work: 'Metro do Porto · Linha Rubi', piece: 'Viga V-120', qty: '12 un.', due: 'Hoje, 16:00', sector: 'Betonagem', progress: 72, status: 'Em produção', tone: 'orange' },
  { id: 'OF-2478', client: 'DST Group', work: 'Campus Tecnológico Braga', piece: 'Painel P-400', qty: '24 un.', due: 'Hoje, 18:00', sector: 'Armaduras', progress: 46, status: 'Em produção', tone: 'orange' },
  { id: 'OF-2469', client: 'Casais', work: 'Residências Universitárias', piece: 'Laje LA-20', qty: '85 un.', due: 'Amanhã', sector: 'Cura', progress: 88, status: 'Em cura', tone: 'blue' },
  { id: 'OF-2488', client: 'Teixeira Duarte', work: 'Nó Rodoviário A3', piece: 'Separador SP-80', qty: '40 un.', due: '15 nov.', sector: 'Preparação', progress: 18, status: 'Agendada', tone: 'gray' },
  { id: 'OF-2455', client: 'Ferrovial', work: 'Plataforma Logística Maia', piece: 'Pilar PR-60', qty: '16 un.', due: '16 nov.', sector: 'Expedição', progress: 100, status: 'Concluída', tone: 'green' },
];

const capacity = [
  { sector: 'Preparação', value: 76, detail: '38h / 50h', color: '#7c6ee6' },
  { sector: 'Armaduras', value: 91, detail: '4 095 / 4 500 kg', color: '#4d8fcc' },
  { sector: 'Moldes', value: 64, detail: '32h / 50h', color: '#e4a23a' },
  { sector: 'Betonagem', value: 84, detail: '67 / 80 m³', color: '#ef7d2d' },
];

function Logo({ compact = false }) {
  return <img className={compact ? 'logo compact' : 'logo'} src={logo} alt="Evolaje — Estruturas de Betão e Pré-Fabricados" />;
}

function Login({ onLogin }) {
  const [email, setEmail] = useState('gestor@evolaje.pt');
  const [password, setPassword] = useState('evolaje2026');
  const [show, setShow] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = (event) => {
    event.preventDefault();
    if (!email || !password) { setError('Preencha o email e a palavra-passe.'); return; }
    setLoading(true); setError('');
    setTimeout(() => { sessionStorage.setItem('evolaje-auth', 'true'); onLogin(); }, 650);
  };

  return (
    <main className="brand-entry">
      <section className="brand-stage" aria-label="Evolaje — Estruturas de Betão e Pré-Fabricados">
        <div className="brand-topline"><span>EVOLAJE</span><span>ESTRUTURAS DE BETÃO<br/>E PRÉ-FABRICADOS</span></div>
        <div className="brand-architecture" aria-hidden="true">
          <div className="architecture-grid"/>
          <div className="concrete-structure"><i className="structural-beam beam-one"/><i className="structural-beam beam-two"/><i className="structural-beam beam-three"/><i className="structural-beam beam-four"/><i className="structural-crossbeam"/><i className="structural-column column-one"/><i className="structural-column column-two"/><i className="structural-column column-three"/></div>
          <span className="architecture-caption">PRECISÃO NA FORMA. SOLIDEZ NA ESTRUTURA.</span>
        </div>
        <div className="brand-statement"><span className="brand-eyebrow">ENGENHARIA EM BETÃO</span><h2>Solidez em <br/>cada <em>detalhe.</em></h2><p>Estruturas que dão forma<br/>ao que vem a seguir.</p></div>
        <div className="brand-bottomline"><span>ESTRUTURA · PRECISÃO · CONFIANÇA</span><a href="https://evolaje.pt/" target="_blank" rel="noopener noreferrer">Conheça a Evolaje <ChevronRight size={14}/></a></div>
      </section>
      <section className="entry-panel" aria-label="Acesso à plataforma">
        <div className="entry-inner">
          <Logo />
          <div className="entry-copy">
            <span className="entry-eyebrow">PORTAL DE PRODUÇÃO</span>
            <h1>Bem-vindo à Evolaje.</h1>
            <p>O seu espaço de trabalho. <br/>Entre para continuar.</p>
          </div>
          <form onSubmit={submit} className="login-form">
            <label>Email profissional
              <div className="input-wrap"><UserRound size={18}/><input value={email} onChange={e=>setEmail(e.target.value)} type="email" autoComplete="email" required /></div>
            </label>
            <label>Palavra-passe
              <div className="input-wrap"><LockKeyhole size={18}/><input value={password} onChange={e=>setPassword(e.target.value)} type={show ? 'text' : 'password'} autoComplete="current-password" required /><button type="button" className="icon-button" onClick={()=>setShow(!show)} aria-label={show?'Ocultar palavra-passe':'Mostrar palavra-passe'} aria-pressed={show}>{show ? <EyeOff size={18}/> : <Eye size={18}/>}</button></div>
            </label>
            {error && <div className="form-error" role="alert"><AlertTriangle size={16}/>{error}</div>}
            <button className="primary login-submit" disabled={loading}>{loading ? <><span className="spinner"/>A entrar…</> : <>Entrar na plataforma <ChevronRight size={18}/></>}</button>
          </form>
          <p className="entry-demo">Acesso de demonstração · Credenciais preenchidas</p>
          <footer className="entry-footer"><span>© {new Date().getFullYear()} Evolaje</span><span>Estruturas de Betão e Pré-Fabricados</span></footer>
        </div>
      </section>
    </main>
  );
}

function Sidebar({ page, setPage, open, close, logout }) {
  return <aside className={`sidebar ${open ? 'mobile-open' : ''}`}>
    <div className="sidebar-brand"><Logo compact/><button className="mobile-close" aria-label="Fechar menu" onClick={close}><X size={22}/></button></div>
    <div className="plant-selector"><div><span className="factory-mark"><Factory size={17}/></span><div><small>UNIDADE</small><strong>Fábrica de Braga</strong></div></div><ChevronDown size={16}/></div>
    <nav className="main-nav">
      <span className="nav-heading">OPERAÇÃO</span>
      {navItems.map(item => <button key={item.id} className={page===item.id?'active':''} onClick={()=>{setPage(item.id);close();}}><item.icon size={19}/><span>{item.label}</span>{item.badge && <em>{item.badge}</em>}</button>)}
      <span className="nav-heading second">GESTÃO</span>
      <button className={page==='stocks'?'active':''} onClick={()=>{setPage('stocks');close();}}><Boxes size={19}/><span>Stocks e materiais</span></button>
      <button className={page==='teams'?'active':''} onClick={()=>{setPage('teams');close();}}><UsersRound size={19}/><span>Equipas</span></button>
      <button className={page==='reports'?'active':''} onClick={()=>{setPage('reports');close();}}><BarChart3 size={19}/><span>Relatórios</span></button>
    </nav>
    <div className="sidebar-bottom">
      <button><CircleHelp size={19}/>Centro de ajuda</button><button><Settings size={19}/>Configurações</button>
      <div className="sidebar-user"><div className="avatar">MC</div><div><strong>Miguel Costa</strong><small>Gestor de produção</small></div><button onClick={logout} title="Terminar sessão"><LogOut size={18}/></button></div>
    </div>
  </aside>
}

function Topbar({ title, menu }) {
  const [searchOpen, setSearchOpen] = useState(false);
  return <header className="topbar"><div className="topbar-title"><button className="menu-button" aria-label="Abrir menu" onClick={menu}><Menu size={21}/></button><div><span>Operação /</span><strong>{title}</strong></div></div><div className="top-actions"><div className={`search ${searchOpen?'show':''}`}><Search size={18}/><input placeholder="Pesquisar OF, obra, peça…"/><kbd>⌘ K</kbd></div><button className="mobile-search" onClick={()=>setSearchOpen(!searchOpen)}><Search size={19}/></button><button className="notification"><Bell size={19}/><span/></button><div className="date-chip"><CalendarDays size={17}/><div><small>HOJE</small><strong>13 nov. 2026</strong></div></div></div></header>
}

function MetricCard({ icon: Icon, label, value, note, color, trend }) {
  return <article className="metric-card"><div className="metric-top"><span className="metric-icon" style={{background:color+'18',color}}><Icon size={21}/></span>{trend && <span className="trend"><TrendingUp size={14}/>{trend}</span>}</div><p>{label}</p><strong>{value}</strong><small>{note}</small></article>
}

function ProgressRing({ value }) {
  return <div className="ring" style={{'--value': value}}><div><strong>{value}%</strong><span>do objetivo</span></div></div>
}

function OrderTable({ compact=false, onSelect }) {
  return <div className="table-wrap"><table className="orders-table"><thead><tr><th>Ordem</th><th>Cliente / obra</th><th>Peça</th><th>Setor atual</th><th>Progresso</th><th>Prazo</th><th>Estado</th><th/></tr></thead><tbody>{orders.slice(0,compact?4:orders.length).map(order=><tr key={order.id} onClick={()=>onSelect?.(order)}><td><strong className="order-id">{order.id}</strong></td><td><strong>{order.client}</strong><small>{order.work}</small></td><td><strong>{order.piece}</strong><small>{order.qty}</small></td><td>{order.sector}</td><td><div className="table-progress"><span><i style={{width:order.progress+'%'}}/></span><em>{order.progress}%</em></div></td><td>{order.due}</td><td><span className={`status ${order.tone}`}>{order.status}</span></td><td><ChevronRight size={17}/></td></tr>)}</tbody></table></div>
}

function Dashboard({ goTo, onSelect }) {
  return <>
    <section className="page-heading"><div><p className="overline">SEXTA-FEIRA, 13 DE NOVEMBRO</p><h1>Bom dia, Miguel</h1><p>Esta é a situação da fábrica neste momento.</p></div><div className="heading-actions"><button className="secondary"><SlidersHorizontal size={17}/>Personalizar</button><button className="primary" onClick={()=>goTo('orders')}><Plus size={18}/>Nova ordem</button></div></section>
    <section className="metrics-grid"><MetricCard icon={ClipboardCheck} label="Ordens de fabrico ativas" value="48" note="14 atualmente em produção" color="#f39200" trend="12%"/><MetricCard icon={Gauge} label="Capacidade ocupada" value="82%" note="+6% face à semana anterior" color="#6b5dcc" trend="6%"/><MetricCard icon={PackageCheck} label="Produção de hoje" value="126 / 148" note="22 peças por concluir" color="#208a65"/><MetricCard icon={AlertTriangle} label="Alertas operacionais" value="5" note="2 requerem ação imediata" color="#d85b51"/></section>
    <section className="dashboard-grid">
      <article className="card production-card"><div className="card-head"><div><h2>Produção de hoje</h2><p>Objetivo diário por setor</p></div><button className="text-button">Ver detalhe <ChevronRight size={16}/></button></div><div className="production-body"><ProgressRing value={85}/><div className="sector-progress">{capacity.map(c=><div key={c.sector}><div><span>{c.sector}</span><strong>{c.detail}</strong></div><div className="bar"><i style={{width:c.value+'%',background:c.color}}/></div></div>)}</div></div></article>
      <article className="card agenda-card"><div className="card-head"><div><h2>Agenda imediata</h2><p>Próximos eventos críticos</p></div><button className="more">•••</button></div><div className="agenda-list"><div><span className="time">10:30</span><i className="agenda-dot orange"/><div><strong>Betonagem · OF-2481</strong><p>Vigas V-120 · Pavilhão 2</p></div><span className="tag">Em curso</span></div><div><span className="time">11:15</span><i className="agenda-dot red"/><div><strong>Validação de qualidade</strong><p>Painéis P-400 · 6 peças</p></div><span className="tag warning">Atraso 15m</span></div><div><span className="time">14:00</span><i className="agenda-dot purple"/><div><strong>Início da pista LA-20</strong><p>Pista 3 · 85 lajes</p></div></div><div><span className="time">16:30</span><i className="agenda-dot green"/><div><strong>Expedição · Lista LC-184</strong><p>Obra Campus Tecnológico</p></div></div></div></article>
    </section>
    <section className="card factory-status"><div className="card-head"><div><h2>Estado da fábrica</h2><p>Atualizado há poucos segundos</p></div><button className="text-button" onClick={()=>goTo('factory')}>Abrir painel <ChevronRight size={16}/></button></div><div className="stations">{[
      ['Armaduras','Operacional','8 / 10 postos','#269772'],['Serralharia','Operacional','4 / 5 postos','#269772'],['Central de betão','Atenção','Espera 12 min','#e0a028'],['Pavilhão de lajes','Operacional','3 / 3 pistas','#269772'],['Painéis e vigas','Manutenção','Ponte rolante 2','#cf5e55']
    ].map(([a,b,c,d])=><div className="station" key={a}><span className="station-status" style={{background:d}}/><Factory size={20}/><div><strong>{a}</strong><small>{c}</small></div><em style={{color:d}}>{b}</em></div>)}</div></section>
    <section className="card orders-card"><div className="card-head"><div><h2>Ordens prioritárias</h2><p>Ordenadas por prazo e impacto</p></div><button className="text-button" onClick={()=>goTo('orders')}>Ver todas <ChevronRight size={16}/></button></div><OrderTable compact onSelect={onSelect}/></section>
  </>;
}

function Planning() {
  const [selectedDay,setSelectedDay]=useState(2);
  const days=['Seg 09','Ter 10','Qua 11','Qui 12','Sex 13','Sáb 14','Dom 15'];
  const rows=[['Preparação',[58,66,84,73,76,22,0]],['Armaduras',[72,88,93,95,91,34,0]],['Moldes',[44,62,71,58,64,0,0]],['Betonagem',[68,75,86,81,84,30,0]],['Lajes / pistas',[33,66,100,66,100,33,0]]];
  return <><section className="page-heading"><div><p className="overline">SEMANA 46 · 9—15 NOVEMBRO</p><h1>Planeamento de capacidade</h1><p>Carga e disponibilidade por setor produtivo.</p></div><div className="heading-actions"><button className="secondary"><CalendarDays size={17}/>Esta semana</button><button className="primary"><Plus size={18}/>Agendar produção</button></div></section>
  <section className="planning-summary"><div><span className="summary-icon orange"><Gauge/></span><p>Ocupação média<strong>82%</strong><small>+6% vs. semana anterior</small></p></div><div><span className="summary-icon purple"><Clock3/></span><p>Horas disponíveis<strong>186h</strong><small>de 224h totais</small></p></div><div><span className="summary-icon green"><PackageCheck/></span><p>Peças planeadas<strong>624</strong><small>em 48 ordens</small></p></div><div><span className="summary-icon red"><AlertTriangle/></span><p>Conflitos<strong>3</strong><small>requerem resolução</small></p></div></section>
  <section className="card capacity-board"><div className="card-head"><div><h2>Mapa semanal</h2><p>Selecione uma célula para ver as ordens alocadas</p></div><div className="legend"><span><i className="low"/>Disponível</span><span><i className="med"/>Elevada</span><span><i className="high"/>No limite</span></div></div><div className="capacity-table"><div className="capacity-row header"><strong>Setor</strong>{days.map((d,i)=><button key={d} className={selectedDay===i?'selected':''} onClick={()=>setSelectedDay(i)}>{d}</button>)}</div>{rows.map(([sector,vals])=><div className="capacity-row" key={sector}><strong>{sector}</strong>{vals.map((v,i)=><button key={i} className={`${v>=90?'cap-high':v>=70?'cap-med':v>0?'cap-low':'cap-empty'} ${selectedDay===i?'selected':''}`} onClick={()=>setSelectedDay(i)}><span>{v ? v+'%' : '—'}</span><small>{v ? Math.max(1,Math.round(v/18))+' OF' : ''}</small></button>)}</div>)}</div></section>
  <section className="card planned-orders"><div className="card-head"><div><h2>Sex. 13 novembro · Betonagem</h2><p>67 de 80 m³ alocados</p></div><button className="secondary small"><SlidersHorizontal size={15}/>Filtros</button></div><div className="schedule-list">{orders.slice(0,3).map((o,i)=><div key={o.id}><span className="drag">⠿</span><span className="schedule-time">{['08:00','10:30','14:00'][i]}</span><div className="schedule-main"><strong>{o.id} · {o.piece}</strong><small>{o.client} · {o.qty}</small></div><span className="resource">{['18 m³ · Molde M-12','24 m³ · Mesa 2','25 m³ · Pista 3'][i]}</span><span className={`status ${o.tone}`}>{o.status}</span><button className="more">•••</button></div>)}</div></section></>;
}

function OrdersPage({ onSelect }) {
  const [query,setQuery]=useState(''); const [state,setState]=useState('Todas');
  const filtered=orders.filter(o=>(state==='Todas'||o.status===state)&&(`${o.id} ${o.client} ${o.work} ${o.piece}`.toLowerCase().includes(query.toLowerCase())));
  return <><section className="page-heading"><div><p className="overline">PRODUÇÃO</p><h1>Ordens de fabrico</h1><p>Acompanhe prioridades, progresso e prazos de todas as ordens.</p></div><button className="primary"><Plus size={18}/>Nova ordem</button></section><section className="order-stats"><button className={state==='Todas'?'active':''} onClick={()=>setState('Todas')}><span>Todas</span><strong>48</strong><small>ordens ativas</small></button><button className={state==='Em produção'?'active':''} onClick={()=>setState('Em produção')}><span>Em produção</span><strong>14</strong><small>neste momento</small></button><button className={state==='Agendada'?'active':''} onClick={()=>setState('Agendada')}><span>Agendadas</span><strong>21</strong><small>próximos 7 dias</small></button><button><span>Em risco</span><strong className="danger">5</strong><small>prazo ou material</small></button></section><section className="card all-orders"><div className="table-toolbar"><div className="search field"><Search size={18}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Pesquisar ordem, cliente ou peça…"/></div><div><button className="secondary small"><SlidersHorizontal size={16}/>Filtros <em>2</em></button><button className="secondary small">Exportar</button></div></div><div className="result-line"><strong>{filtered.length} ordens apresentadas</strong><span>Atualizado agora</span></div><OrderTableRows data={filtered} onSelect={onSelect}/></section></>;
}

function OrderTableRows({data,onSelect}) { return <div className="table-wrap"><table className="orders-table"><thead><tr><th><input type="checkbox"/></th><th>Ordem</th><th>Cliente / obra</th><th>Peça</th><th>Setor atual</th><th>Progresso</th><th>Prazo</th><th>Estado</th><th/></tr></thead><tbody>{data.map(order=><tr key={order.id} onClick={()=>onSelect(order)}><td onClick={e=>e.stopPropagation()}><input type="checkbox"/></td><td><strong className="order-id">{order.id}</strong></td><td><strong>{order.client}</strong><small>{order.work}</small></td><td><strong>{order.piece}</strong><small>{order.qty}</small></td><td>{order.sector}</td><td><div className="table-progress"><span><i style={{width:order.progress+'%'}}/></span><em>{order.progress}%</em></div></td><td>{order.due}</td><td><span className={`status ${order.tone}`}>{order.status}</span></td><td><ChevronRight size={17}/></td></tr>)}</tbody></table>{!data.length&&<div className="empty-state"><Search size={28}/><strong>Sem resultados</strong><p>Experimente alterar os filtros ou a pesquisa.</p></div>}</div> }

function FactoryPage() {
  const [running,setRunning]=useState(true); const [seconds,setSeconds]=useState(7542); const [done,setDone]=useState(6);
  useEffect(()=>{if(!running)return; const t=setInterval(()=>setSeconds(s=>s+1),1000);return()=>clearInterval(t)},[running]);
  const time=new Date(seconds*1000).toISOString().slice(11,19);
  return <><section className="page-heading"><div><p className="overline"><span className="live-dot"/> POSTO EM DIRETO</p><h1>Painel de betonagem</h1><p>Pavilhão 2 · Equipa B · Turno 08:00—16:00</p></div><div className="heading-actions"><button className="secondary"><QrCode size={18}/>Ler etiqueta</button><button className="secondary"><Factory size={18}/>Mudar posto</button></div></section><section className="workstation-grid"><article className="card active-job"><div className="job-header"><span className="status orange">EM EXECUÇÃO</span><span>OF-2481</span></div><div className="job-title"><div><p>ORDEM ATUAL</p><h2>Viga V-120</h2><span>Metro do Porto · Linha Rubi</span></div><div className="piece-visual"><span>V-120</span><i/><i/></div></div><div className="job-meta"><div><small>Quantidade</small><strong>12 peças</strong></div><div><small>Molde</small><strong>M-12 · Pavilhão 2</strong></div><div><small>Betão</small><strong>C40/50 · 18 m³</strong></div><div><small>Prazo</small><strong>Hoje, 16:00</strong></div></div><div className="job-progress"><div><span>Progresso da ordem</span><strong>{done} de 12 peças</strong></div><div className="large-progress"><span style={{width:(done/12*100)+'%'}}/></div></div><div className="job-actions"><button className="pause-button" onClick={()=>setRunning(!running)}>{running?<><Pause size={24}/>Pausar operação</>:<><Play size={26}/>Retomar operação</>}</button><button className="complete-button" onClick={()=>setDone(Math.min(12,done+1))}><Check size={27}/>Concluir peça</button></div></article><aside className="workstation-side"><article className="card timer-card"><p>TEMPO DA OPERAÇÃO</p><strong>{time}</strong><span><span className="live-dot"/> {running?'Em curso':'Em pausa'}</span><div><small>Previsto</small><strong>02:30:00</strong></div></article><article className="card quick-actions"><h3>Registo rápido</h3><div><button><AlertTriangle/>Paragem</button><button><Boxes/>Consumo</button><button><ShieldCheck/>Qualidade</button><button><QrCode/>Etiqueta</button></div></article></aside></section><section className="factory-bottom"><article className="card checklist"><div className="card-head"><div><h2>Checklist da operação</h2><p>4 de 6 verificações concluídas</p></div><strong>67%</strong></div>{['Molde limpo e descofrante aplicado','Armadura posicionada e validada','Acessórios e insertos verificados','Betão C40/50 confirmado','Vibração e compactação','Acabamento e identificação'].map((x,i)=><label key={x} className={i<4?'checked':''}><input type="checkbox" defaultChecked={i<4}/><span><Check size={15}/></span>{x}</label>)}</article><article className="card team-card"><div className="card-head"><div><h2>Equipa no posto</h2><p>4 operadores ativos</p></div></div>{['JO|João Oliveira|Chefe de equipa','AS|André Silva|Operador','RM|Rui Martins|Operador','PC|Pedro Costa|Operador'].map(x=>{const[a,b,c]=x.split('|');return <div key={a}><span className="mini-avatar">{a}</span><p><strong>{b}</strong><small>{c}</small></p><i className="online"/></div>})}</article></section></>;
}

function QualityPage() { return <><section className="page-heading"><div><p className="overline">CONTROLO E RASTREABILIDADE</p><h1>Qualidade</h1><p>Validações pendentes, ensaios e não conformidades.</p></div><button className="primary"><Plus size={18}/>Novo registo</button></section><section className="metrics-grid"><MetricCard icon={ClipboardCheck} label="Validações pendentes" value="8" note="2 acima do tempo esperado" color="#f39200"/><MetricCard icon={ShieldCheck} label="Taxa de conformidade" value="97,4%" note="+0,8% este mês" color="#208a65" trend="0,8%"/><MetricCard icon={TimerReset} label="Tempo médio de validação" value="18 min" note="Objetivo: menos de 20 min" color="#6b5dcc"/><MetricCard icon={AlertTriangle} label="Não conformidades" value="5" note="3 abertas · 2 em análise" color="#d85b51"/></section><section className="quality-layout"><article className="card validation-queue"><div className="card-head"><div><h2>Fila de validação</h2><p>Pedidos dos postos de produção</p></div><button className="text-button">Ver histórico <ChevronRight size={16}/></button></div>{orders.slice(0,4).map((o,i)=><div className="validation-item" key={o.id}><span className={`validation-priority ${i===1?'urgent':''}`}>{i===1?'URGENTE':String(i+1).padStart(2,'0')}</span><div><strong>{o.id} · {o.piece}</strong><p>{['Verificação de acabamento','Controlo dimensional','Validação pré-betonagem','Ensaio de resistência'][i]}</p></div><span><Clock3 size={15}/>{[8,24,12,4][i]} min</span><button className="secondary small">Validar</button></div>)}</article><article className="card quality-chart"><div className="card-head"><div><h2>Conformidade</h2><p>Últimos 7 dias</p></div></div><div className="mini-chart">{[93,96,94,98,97,99,97].map((n,i)=><div key={i}><span style={{height:n+'%'}} title={n+'%'}/><small>{['S','T','Q','Q','S','S','D'][i]}</small></div>)}</div><div className="quality-score"><span><i/>Conformes <strong>97,4%</strong></span><span><i/>Retrabalho <strong>1,8%</strong></span><span><i/>NOK <strong>0,8%</strong></span></div></article></section></> }

function MaintenancePage() { return <><section className="page-heading"><div><p className="overline">EQUIPAMENTOS E INSTALAÇÕES</p><h1>Manutenção</h1><p>Disponibilidade, intervenções e plano preventivo.</p></div><button className="primary"><Plus size={18}/>Novo pedido</button></section><section className="metrics-grid"><MetricCard icon={Activity} label="Disponibilidade técnica" value="94,8%" note="Meta mensal: 95%" color="#208a65"/><MetricCard icon={Wrench} label="Pedidos em aberto" value="7" note="2 com prioridade alta" color="#f39200"/><MetricCard icon={Zap} label="MTBF" value="186h" note="+14h face ao mês anterior" color="#6b5dcc" trend="8%"/><MetricCard icon={Clock3} label="MTTR" value="1h 24m" note="Meta: menos de 2 horas" color="#4d8fcc"/></section><section className="maintenance-layout"><article className="card interventions"><div className="card-head"><div><h2>Intervenções em curso</h2><p>Estado dos pedidos ativos</p></div><button className="text-button">Ver todos <ChevronRight size={16}/></button></div>{[['Ponte rolante 2','Pavilhão painéis e vigas','Corretiva','Em intervenção','45 min'],['Central de betão · Sensor H2O','Central','Preventiva','Agendada','14:30'],['Vibrador V-04','Pavilhão 2','Corretiva','A aguardar peça','2h 10m']].map((x,i)=><div className="intervention" key={x[0]}><span className={`machine-icon ${i===0?'red':''}`}><Wrench size={20}/></span><div><strong>{x[0]}</strong><small>{x[1]}</small></div><span className="maintenance-type">{x[2]}</span><span className={`status ${i===0?'orange':i===1?'blue':'gray'}`}>{x[3]}</span><span className="duration"><Clock3 size={15}/>{x[4]}</span><ChevronRight size={17}/></div>)}</article><article className="card preventive"><div className="card-head"><div><h2>Próximas preventivas</h2><p>7 dias seguintes</p></div></div>{[['14 NOV','Molde M-08','Inspeção após 50 ciclos'],['16 NOV','Ponte rolante 1','Revisão trimestral'],['18 NOV','Central de betão','Lubrificação geral']].map(x=><div key={x[1]}><span>{x[0]}</span><p><strong>{x[1]}</strong><small>{x[2]}</small></p><button><ChevronRight size={17}/></button></div>)}</article></section></> }

function OrderDrawer({ order, close }) { if(!order)return null; return <div className="drawer-backdrop" onClick={close}><aside className="drawer" onClick={e=>e.stopPropagation()}><div className="drawer-head"><div><p>ORDEM DE FABRICO</p><h2>{order.id}</h2></div><button onClick={close}><X size={21}/></button></div><div className="drawer-status"><span className={`status ${order.tone}`}>{order.status}</span><strong>{order.progress}% concluído</strong></div><div className="large-progress"><span style={{width:order.progress+'%'}}/></div><section><h3>{order.piece}</h3><p>{order.qty} · {order.client}</p><span>{order.work}</span></section><div className="drawer-grid"><div><small>SETOR ATUAL</small><strong>{order.sector}</strong></div><div><small>PRAZO</small><strong>{order.due}</strong></div><div><small>PRIORIDADE</small><strong>Alta</strong></div><div><small>RESPONSÁVEL</small><strong>João Oliveira</strong></div></div><h4>Progresso de produção</h4><div className="timeline">{['Preparação','Armaduras','Moldes','Betonagem','Cura e qualidade','Expedição'].map((x,i)=><div key={x} className={i<3?'done':i===3?'current':''}><span>{i<3?<Check size={14}/>:i+1}</span><div><strong>{x}</strong><small>{i<3?'Concluído':i===3?'Em curso':'Por iniciar'}</small></div></div>)}</div><button className="primary full">Abrir dossier de produção</button></aside></div> }

function App() {
  const [logged,setLogged]=useState(sessionStorage.getItem('evolaje-auth')==='true');
  const [page,setPage]=useState('dashboard'); const [mobile,setMobile]=useState(false); const [selected,setSelected]=useState(null);
  if(!logged)return <Login onLogin={()=>setLogged(true)}/>;
  const titles={dashboard:'Visão geral',planning:'Planeamento',orders:'Ordens de fabrico',factory:'Chão de fábrica',quality:'Qualidade',maintenance:'Manutenção',stocks:'Stocks e materiais',teams:'Equipas',reports:'Relatórios'};
  const content=['stocks','teams','reports'].includes(page)?<ManagementPage page={page}/>: {dashboard:<Dashboard goTo={setPage} onSelect={setSelected}/>,planning:<Planning/>,orders:<OrdersPage onSelect={setSelected}/>,factory:<FactoryPage/>,quality:<QualityPage/>,maintenance:<MaintenancePage/>}[page];
  return <div className="app-shell"><Sidebar page={page} setPage={setPage} open={mobile} close={()=>setMobile(false)} logout={()=>{sessionStorage.removeItem('evolaje-auth');setLogged(false)}}/><div className="main-shell"><Topbar title={titles[page]} menu={()=>setMobile(true)}/><main className="page-content">{content}</main></div>{mobile&&<div className="mobile-overlay" onClick={()=>setMobile(false)}/>}<OrderDrawer order={selected} close={()=>setSelected(null)}/></div>;
}

createRoot(document.getElementById('root')).render(<App/>);
