"use client";
import { useEffect, useState } from "react";

const PHONE="5515997757798";
const general="Olá! Vim pelo site da TopClean e gostaria de agendar um atendimento.";
const wa=(m=general)=>`https://wa.me/${PHONE}?text=${encodeURIComponent(m)}`;
type Pack={name:string;prices:string[];includes:string[];featured?:boolean};
type Category={id:string;label:string;eyebrow:string;description:string;packages:Pack[];note?:string};
const services:Category[]=[
 {id:"lavagens",label:"Lavagens",eyebrow:"Do essencial ao completo",description:"Três níveis de cuidado para você escolher o acabamento ideal para sua rotina e seu veículo.",packages:[
  {name:"Lavagem Básica",prices:["Hatch — R$ 60","Sedan — R$ 70","SUV — R$ 80"],includes:["Limpeza externa detalhada","Vidros e pneus","Pretinho e cera","Enxágue completo"]},
  {name:"Lavagem Plus",prices:["Hatch — R$ 80","Sedan — R$ 90","SUV — R$ 100"],includes:["Tudo da Básica","Aspiração","Painel e console","Vidros internos","Higienização leve dos tapetes"],featured:true},
  {name:"Lavagem Premium",prices:["Hatch — R$ 95","Sedan — R$ 110","SUV — R$ 130"],includes:["Aspiração completa","Painel, consoles e portas","Revitalização de plásticos","Tapetes e carpetes","Cuidado relacionado a odores","Lavagem externa, cera e acabamento"]}]},
 {id:"higienizacao",label:"Higienização",eyebrow:"Limpeza interna profunda",description:"Um cuidado completo para o interior, alcançando áreas de uso frequente e pontos de difícil acesso.",packages:[{name:"Higienização Automotiva",prices:["Hatch — R$ 180","Sedan — R$ 220","SUV — R$ 250"],includes:["Bancos e ar-condicionado","Painéis, portas e saídas de ar","Plásticos e soleiras","Carpetes e porta-malas","Áreas de difícil acesso","Cuidados previstos no serviço Premium"],featured:true}]},
 {id:"motos",label:"Motos",eyebrow:"Cuidado em cada componente",description:"Pacotes progressivos para limpeza, proteção e acabamento da sua moto.",packages:[
  {name:"Moto Básica",prices:["R$ 35"],includes:["Limpeza externa","Rodas e pneus","Acabamento essencial"]},
  {name:"Moto Plus",prices:["R$ 50"],includes:["Tudo da Básica","Cuidado com corrente e plásticos","Cera e painel"],featured:true},
  {name:"Moto Premium",prices:["R$ 70"],includes:["Cuidado completo","Motor e detalhes","Lubrificação da corrente","Cera e acabamento final"]}],note:"Os itens podem variar conforme o pacote e a condição da moto."},
 {id:"polimento",label:"Polimento",eyebrow:"Recuperação de brilho",description:"Tratamento da pintura para suavizar marcas superficiais e recuperar uniformidade e brilho.",packages:[
  {name:"Polimento de Carros",prices:["Hatch — a partir de R$ 300","Sedan — a partir de R$ 400","SUV — a partir de R$ 600"],includes:["Riscos superficiais","Manchas e impurezas","Recuperação de brilho","Uniformização da pintura","Acabamento com cera ou vitrificador"],featured:true},
  {name:"Polimento de Motos",prices:["A partir de R$ 150"],includes:["Avaliação da pintura","Recuperação de brilho","Acabamento final"]}],note:"Valor final confirmado após avaliação do veículo."}
];
const faqs=[
 ["Preciso agendar o atendimento?","Sim. Os atendimentos da TopClean são realizados com agendamento, garantindo mais organização e atenção ao seu veículo."],
 ["A TopClean busca o veículo?","Sim. Além de trazer seu veículo até nós, você pode consultar a disponibilidade para realizarmos a busca."],
 ["Vocês atendem em domicílio?","Sim, mediante disponibilidade. Entre em contato pelo WhatsApp para verificar a possibilidade para o serviço desejado."],
 ["Quanto tempo leva o serviço?","Depende do serviço e das condições do veículo. Em geral, o atendimento pode levar de 1 a 4 horas. No agendamento, informamos uma estimativa mais adequada."],
 ["Quais formas de pagamento são aceitas?","Aceitamos diversas formas de pagamento, oferecendo mais praticidade na hora de cuidar do seu veículo."],
 ["Vocês atendem carros e motos?","Sim. A TopClean possui opções de cuidados para carros e motos, com serviços e valores específicos para cada categoria."],
 ["Qual a diferença entre as lavagens Básica, Plus e Premium?","A Básica é voltada principalmente à limpeza externa. A Plus acrescenta aspiração e limpeza interna leve. A Premium oferece um cuidado mais completo, com revitalização de plásticos e outros acabamentos."],
 ["Como faço para solicitar um orçamento ou agendar?","Fale com a TopClean pelo WhatsApp, informe seu veículo e o serviço de interesse. Tiramos suas dúvidas e combinamos o atendimento."]
];
function Arrow(){return <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></svg>};
function Check(){return <svg aria-hidden="true" viewBox="0 0 24 24"><path d="m5 12 4 4L19 6"/></svg>};
function WhatsAppIcon(){return <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M20.5 11.8a8.5 8.5 0 0 1-12.6 7.4L3.5 20.5l1.3-4.3a8.5 8.5 0 1 1 15.7-4.4Z"/><path d="M8.2 7.7c.2-.4.4-.4.7-.4h.5c.2 0 .4.1.5.4l.8 1.9c.1.3 0 .5-.2.7l-.7.8c-.2.2-.1.4 0 .6.7 1.3 1.8 2.3 3.1 3 .2.1.4.2.6 0l.9-1c.2-.2.4-.3.7-.2l1.9.9c.3.1.4.3.4.5 0 .4-.2 1.4-.9 2-.6.6-1.5.9-2.5.6-1.3-.3-3-1.1-4.7-2.6-1.4-1.2-2.4-2.7-2.8-3.9-.4-1.1 0-2.5.5-3.1.3-.3.7-.4 1.2-.2Z"/></svg>};

export default function Home(){
 const [menu,setMenu]=useState(false),[activeId,setActive]=useState("lavagens"),[slider,setSlider]=useState(52),[top,setTop]=useState(false);
 const active=services.find(s=>s.id===activeId)!;
 useEffect(()=>{const f=()=>setTop(window.scrollY>700);window.addEventListener("scroll",f,{passive:true});return()=>window.removeEventListener("scroll",f)},[]);
 const msg=(name:string)=>`Olá! Vim pelo site da TopClean e tenho interesse em ${name}. Gostaria de mais informações e de agendar um horário.`;
 return <>
  <header className="site-header">
   <div className="header-inner container">
    <a className="brand" href="#inicio" aria-label="TopClean — início"><img src="/logo-topclean.png" alt="TopClean Auto"/></a>
    <button className="menu-toggle" onClick={()=>setMenu(!menu)} aria-expanded={menu} aria-controls="main-nav" aria-label="Abrir menu"><span/><span/></button>
    <nav id="main-nav" className={menu?"nav open":"nav"} aria-label="Navegação principal">{[["Início","inicio"],["Serviços","servicos"],["Resultados","resultados"],["Por que TopClean","diferenciais"],["Como funciona","processo"],["FAQ","faq"]].map(([l,id])=><a key={id} href={`#${id}`} onClick={()=>setMenu(false)}>{l}</a>)}<a className="button button-small" href={wa()} target="_blank" rel="noreferrer">AGENDAR HORÁRIO <Arrow/></a></nav>
   </div>
  </header>
  <main>
   <section id="inicio" className="hero">
    <img
      className="hero-image"
      src="/topclean-hero-bg.webp"
      alt="Veículo esportivo preto em estúdio de estética automotiva profissional com iluminação vertical e reflexos no piso molhado"
      fetchPriority="high"
      decoding="sync"
      loading="eager"
      width="2048"
      height="982"
    />
    <div className="hero-shade"/>
    <div className="hero-content container">
      <p className="eyebrow"><span/> TopClean — Estética Automotiva</p>
      <h1>NÃO É SÓ LIMPEZA.<br/>É CUIDADO EM CADA <em>DETALHE.</em></h1>
      <p className="hero-copy">Lavagens, higienização e cuidados para carros e motos, com atenção aos detalhes e praticidade no atendimento.</p>
      <div className="hero-actions">
        <div className="hero-btn-group">
          <a className="button" href={wa()} target="_blank" rel="noreferrer">AGENDAR HORÁRIO <Arrow/></a>
          <span className="hero-btn-subtext">Atendimento via WhatsApp</span>
        </div>
        <a className="text-link hero-secondary-link" href="#servicos">CONHECER SERVIÇOS &gt;</a>
      </div>
      <div className="hero-meta">
        <span>Carros &amp; motos</span>
        <span className="hero-meta-dot" aria-hidden="true">•</span>
        <span>Atendimento agendado</span>
        <span className="hero-meta-dot" aria-hidden="true">•</span>
        <span>Opção em domicílio*</span>
      </div>
      <small className="hero-meta-note">* Conforme disponibilidade.</small>
    </div>
   </section>
   <section id="servicos" className="section services-section"><div className="container"><div className="section-heading split-heading"><div><p className="kicker">Serviços e valores</p><h2>Cuidado para cada <span>necessidade.</span></h2></div><p>Escolha uma categoria e encontre o nível de cuidado que combina com seu veículo.</p></div><div className="service-tabs" role="tablist" aria-label="Categorias de serviços">{services.map(s=><button key={s.id} role="tab" aria-selected={activeId===s.id} onClick={()=>setActive(s.id)}>{s.label}</button>)}</div><div className="service-panel" role="tabpanel"><div className={active.id==="higienizacao"?"panel-intro panel-intro-long":"panel-intro"}><p className="kicker">{active.eyebrow}</p><h3>{active.label}</h3><p>{active.description}</p>{active.note&&<small>{active.note}</small>}</div><div className={`packages packages-${Math.min(active.packages.length,3)}`}>{active.packages.map(p=><article className={p.featured?"package featured":"package"} key={p.name}>{p.featured&&<span className="package-tag">Mais escolhido</span>}<h4>{p.name}</h4><div className="prices">{p.prices.map(x=><strong key={x}>{x}</strong>)}</div><ul>{p.includes.map(x=><li key={x}><Check/>{x}</li>)}</ul><a className="package-cta" href={wa(msg(p.name))} target="_blank" rel="noreferrer">Agendar este serviço <Arrow/></a></article>)}</div></div></div></section>
   <section id="resultados" className="section result-section"><div className="container result-layout"><div className="result-copy"><p className="kicker">Resultado visível</p><h2>Veja a diferença <span>nos detalhes.</span></h2><p>Use o controle para comparar o cuidado antes e depois. Na V1, as fotografias abaixo são apenas uma demonstração visual do componente.</p><span className="illustrative">Imagem ilustrativa</span></div><div className="compare" style={{"--position":`${slider}%`} as React.CSSProperties}><img src="/after-topclean.webp" alt="Veículo depois da limpeza — imagem ilustrativa" loading="lazy"/><div className="after"><img src="/before-topclean.webp" alt="Veículo antes da limpeza — imagem ilustrativa" loading="lazy"/></div><span className="compare-label before-label">Antes</span><span className="compare-label after-label">Depois</span><div className="handle" aria-hidden="true"><span>↔</span></div><input type="range" min="5" max="95" value={slider} onChange={e=>setSlider(Number(e.target.value))} aria-label="Comparar imagem antes e depois"/></div></div></section>
   <section id="diferenciais" className="section why-section"><div className="container why-grid"><div className="why-intro"><p className="kicker">Por que escolher a TopClean?</p><h2>Cuidado de verdade. <span>Praticidade para você.</span></h2><p>Seu veículo recebe mais do que uma simples limpeza. Cada serviço é realizado com atenção aos detalhes, produtos de qualidade e cuidado com cada etapa, buscando um acabamento que você percebe no resultado.</p><p>Você pode agendar e trazer o veículo até nós ou consultar a disponibilidade de busca e atendimento em domicílio.</p><strong>Seu veículo merece cuidado. Sua rotina merece praticidade.</strong></div><div className="why-list">{[["01","Cuidado nos detalhes","Atenção ao veículo do início ao acabamento final."],["02","Produtos de qualidade","Produtos profissionais de marcas reconhecidas, como Vonixx."],["03","Mais praticidade","Hora marcada e opções que se adaptam à sua rotina."],["04","Carros e motos","Cuidados para manter seu veículo limpo e valorizado."]].map(([n,t,d])=><div className="why-item" key={n}><span>{n}</span><div><h3>{t}</h3><p>{d}</p></div></div>)}</div></div></section>
   <section id="processo" className="section process-section"><div className="container"><div className="section-heading"><p className="kicker">Como funciona</p><h2>Do primeiro contato ao <span>acabamento final.</span></h2></div><ol className="process-line">{[["01","Escolha o serviço"],["02","Chame no WhatsApp"],["03","Agende o melhor horário"],["04","Traga ou consulte atendimento móvel"],["05","Receba seu veículo cuidado"]].map(([n,t])=><li key={n}><span>{n}</span><p>{t}</p></li>)}</ol></div></section>
   <section className="section modes-section"><div className="container modes-card"><div className="modes-head"><p className="kicker">Mais praticidade</p><h2>Você escolhe como quer <span>ser atendido.</span></h2></div><div className="modes-options"><article><span>01</span><h3>Traga seu veículo</h3><p>Atendimento agendado na TopClean, em Jardim Lírio — Tatuí/SP.</p></article><b>ou</b><article><span>02</span><h3>Consulte busca / atendimento em domicílio</h3><p>Disponível conforme serviço, localização e disponibilidade.</p></article></div><a className="button" href={wa("Olá! Vim pelo site da TopClean e gostaria de consultar a disponibilidade de busca ou atendimento em domicílio.")} target="_blank" rel="noreferrer">Consultar disponibilidade <Arrow/></a></div></section>
   <section id="faq" className="section faq-section"><div className="container faq-grid"><div className="section-heading sticky-heading"><p className="kicker">Dúvidas frequentes</p><h2>Tudo claro antes de <span>agendar.</span></h2><p>Ainda ficou com alguma dúvida? Fale diretamente com a TopClean.</p><a className="text-link" href={wa()} target="_blank" rel="noreferrer">Chamar no WhatsApp <Arrow/></a></div><div className="accordion">{faqs.map(([q,a])=><details key={q}><summary>{q}<span>+</span></summary><p>{a}</p></details>)}</div></div></section>
   <section className="final-cta"><div className="final-bg"/><div className="container final-content"><img src="/logo-topclean.png" alt="" aria-hidden="true"/><p className="kicker">Seu próximo cuidado começa aqui</p><h2>Seu veículo merece <span>esse cuidado.</span></h2><p>Agende seu atendimento de forma rápida pelo WhatsApp. Escolha o serviço, tire suas dúvidas e encontre a melhor opção para seu carro ou moto.</p><a className="button" href={wa()} target="_blank" rel="noreferrer">Agendar pelo WhatsApp <Arrow/></a><small>Atendimento agendado · Carros e motos · Consulte busca ou atendimento em domicílio</small></div></section>
  </main>
  <footer><div className="container footer-grid"><div className="footer-brand"><img src="/logo-topclean.png" alt="TopClean Auto"/><p>Qualidade, praticidade e cuidado em cada detalhe.</p></div><div><h3>Navegação</h3><a href="#servicos">Serviços</a><a href="#resultados">Resultados</a><a href="#diferenciais">Por que TopClean</a><a href="#faq">FAQ</a></div><div><h3>Serviços</h3>{services.map(s=><a key={s.id} href="#servicos" onClick={()=>setActive(s.id)}>{s.label}</a>)}</div><div><h3>Contato</h3><p>Jardim Lírio — Tatuí/SP</p><a href={wa()} target="_blank" rel="noreferrer">+55 15 99775-7798</a><a href="https://www.instagram.com/topclean.auto" target="_blank" rel="noreferrer">@topclean.auto ↗</a></div></div><div className="container footer-bottom"><span>© {new Date().getFullYear()} TopClean Estética Automotiva.</span><a href="#inicio">Voltar ao início ↑</a></div></footer>
  <a className="whatsapp-float" href={wa()} target="_blank" rel="noreferrer" aria-label="Agendar pelo WhatsApp"><WhatsAppIcon/><span>WhatsApp</span></a><button className={top?"back-top visible":"back-top"} onClick={()=>window.scrollTo({top:0,behavior:"smooth"})} aria-label="Voltar ao topo">↑</button>
 </>
}
