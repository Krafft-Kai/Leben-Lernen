/* Navigator „Bildungswege Niedersachsen“
   Übernommen aus docs/navigator-original.html, ohne KI-Wegfinder und ohne window.claude.
   Die Daten kommen aus daten/navigator.json (eingebettet als #navigator-data) und werden hier
   auf die kurzen Namen des Original-Skripts abgebildet. Keine Fakten in dieser Datei. */
(() => {
"use strict";
const datenEl = document.getElementById("navigator-data");
const root = document.getElementById("navi");
if (!datenEl || !root) return;

/* ---------- Daten ---------- */
const D = JSON.parse(datenEl.textContent);
const SECT = Object.fromEntries(Object.entries(D.bereiche).map(([k, name]) => [k, { name }]));

/* p = [Spalte, Zeile] in der Stufen-Ansicht; a = [von, bis, Zeile] bzw. Abschluss [Alter, Zeile] in der Alters-Ansicht */
const N = D.stationen.map(s => ({
  id: s.id, t: s.titel, s: s.kurz, sec: s.bereich,
  ms: s.meilenstein ? 1 : 0, bbs: s.bbs ? 1 : 0, open: s.offen ? 1 : 0,
  p: [s.stufe.spalte, s.stufe.zeile],
  a: s.alter.bei != null ? [s.alter.bei, s.alter.zeile] : [s.alter.von, s.alter.bis, s.alter.zeile],
  pm: s.meta_stufe || "", am: s.meta_alter || "",
  dur: s.dauer || "", zug: s.zugang || "", abs: s.abschluss || "", wo: s.wo || "", note: s.hinweis || ""
}));
/* Übergänge: c = nur mit Zusatzvoraussetzung */
const E = D.uebergaenge.map(u => ({ f: u.von, t: u.nach, c: !!u.bedingung, note: u.hinweis || "" }));
const AGES = D.altersphasen.map(a => ({ from: a.von, to: a.bis, focus: a.fokus, title: a.titel, text: a.text, todo: a.todo || [] }));

/* ---------- Geometrie ---------- */
const ROW=76, NH=60, TOP=60, PADX=20, GAP=40;
const COLS=[148,148,148,148,120,148,120,148,148,148,148];
const colX=[]; { let x=PADX; COLS.forEach((w,i)=>{ colX[i]=x; x+=w+GAP; }); }
const PATH_W = colX[10]+COLS[10]+PADX;
const HEADS=[[0,1,"Frühe Bildung"],[2,2,"Primarstufe"],[3,3,"Sekundarstufe I"],[4,4,"Abschluss"],[5,5,"Sek II · Beruf"],[6,6,"Abschluss"],[7,7,"Aufstieg · 2. Weg"],[8,8,"Studium"],[9,9,"Master · Profi"],[10,10,"Ein Leben lang"]];
const K1=50, K2=9, SPLIT=26, AMAX=85;
const xAge = a => PADX + (a<=SPLIT ? a*K1 : SPLIT*K1 + (a-SPLIT)*K2);
const AGE_W = xAge(AMAX)+PADX;
const TICKS=[0,1,3,6,10,13,16,19,22,26,40,50,60,67,80];

const byId = Object.fromEntries(N.map(n=>[n.id,n]));
const $ = s => root.querySelector(s);
const canvas=$("#canvas"), scroller=$("#scroller"), nodesEl=$("#nodes"), edgeG=$("#edge-g");
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
const state = {view:"path", age:5, sel:"kita", all:false, bbs:false};
const issueBasis = root.dataset.issueBasis || "";

function geom(n, view){
  if(view==="path"){
    const [c,r]=n.p, w=COLS[c];
    return n.ms ? {x:colX[c], y:TOP+r*ROW+10, w, h:40} : {x:colX[c], y:TOP+r*ROW, w, h:NH};
  }
  if(n.ms){ const [at,r]=n.a; return {x:xAge(at)-25, y:TOP+r*ROW-21, w:50, h:20}; }
  const [f,t,r]=n.a; return {x:xAge(f)+2, y:TOP+r*ROW, w:xAge(t)-xAge(f)-4, h:NH};
}
const esc = s => String(s).replace(/[&<>"]/g, c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const plain = s => s.replace(/­/g,"");

/* ---------- Aufbau ---------- */
const els={};
N.forEach(n=>{
  const b=document.createElement("button");
  b.type="button"; b.id="s-"+n.id;
  b.className="node"+(n.ms?" ms":"")+(n.open?" open":"");
  b.dataset.sec=n.sec;
  b.innerHTML='<span class="t"></span><span class="m"></span>';
  b.addEventListener("click",()=>{ select(n.id); });
  nodesEl.appendChild(b); els[n.id]=b;
});
const EP = E.map(e=>{
  const p=document.createElementNS("http://www.w3.org/2000/svg","path");
  p.setAttribute("class","edge"+(e.c?" c":""));
  edgeG.appendChild(p); return {...e, el:p};
});
// Achsen
const axPath=$("#axis-path"), axAge=$("#axis-age");
HEADS.forEach(([a,b,l])=>{ const d=document.createElement("div"); d.className="colhead"; d.style.left=colX[a]+"px"; d.style.width=(colX[b]+COLS[b]-colX[a])+"px"; d.textContent=l; axPath.appendChild(d); });
TICKS.forEach(a=>{ const d=document.createElement("div"); d.className="tick"+(a===SPLIT?" brk":""); d.style.left=xAge(a)+"px";
  d.innerHTML="<span>"+a+"</span>"+(a===SPLIT?"<em>ab hier gestaucht</em>":""); axAge.appendChild(d); });
// Legende
$("#legend").innerHTML = ["frueh","schule","beruf","aufstieg","hoch","leben"].map(k=>
  `<span><i style="--c:var(--${k});--b:var(--${k}-bg)"></i>${esc(SECT[k].name)}</span>`).join("")
  + '<span><span class="ln"></span>direkter Anschluss</span><span><span class="ln d"></span>mit Zusatzvoraussetzung</span><span><span class="ring"></span>passt zum gewählten Alter</span>';
// Schnellwahl
const QUICK=[1,4,6,10,16,19,24,45,67];
$("#quick").innerHTML = QUICK.map(a=>`<button type="button" data-age="${a}">${a}</button>`).join("");
$("#quick").addEventListener("click",e=>{ const b=e.target.closest("button[data-age]"); if(b) setAge(+b.dataset.age, true); });

/* ---------- Layout ---------- */
function setText(n, view, g){
  const el=els[n.id], t=el.firstChild, m=el.lastChild;
  const narrow = view==="age" && !n.ms && g.w<128;
  t.textContent = (view==="age" && (n.ms||narrow)) ? n.s : n.t;
  if(n.ms){ m.hidden=true; }
  else {
    const meta = view==="path" ? n.pm : n.am;
    m.innerHTML = (n.bbs && g.w>=96 ? "<b>BBS</b>" : "") + esc(meta);
    m.hidden = g.w<70;
  }
  el.setAttribute("aria-label", plain(n.t) + (n.ms ? ", Abschluss" : ", " + n.am));
}
function layout(view, animate){
  canvas.classList.toggle("view-age", view==="age");
  canvas.classList.toggle("view-path", view==="path");
  const W = view==="path" ? PATH_W : AGE_W;
  const rows = view==="path" ? 7 : 8;
  canvas.style.width=W+"px"; canvas.style.height=(TOP+rows*ROW+4)+"px";
  N.forEach(n=>{ const g=geom(n,view), s=els[n.id].style;
    s.left=g.x+"px"; s.top=g.y+"px"; s.width=g.w+"px"; s.height=g.h+"px"; setText(n,view,g); });
  updateNowLine();
  if(animate && !reduce) animateEdges(820); else drawEdges();
}

/* ---------- Kanten ---------- */
function rectOf(id){ const e=els[id]; return {x:e.offsetLeft,y:e.offsetTop,w:e.offsetWidth,h:e.offsetHeight}; }
function pathD(a,b){
  let p0,p1,d0,d1;
  if(b.x >= a.x+a.w-6){ p0=[a.x+a.w,a.y+a.h/2]; d0=[1,0]; p1=[b.x,b.y+b.h/2]; d1=[1,0]; }
  else if(b.x+b.w <= a.x+6){ p0=[a.x,a.y+a.h/2]; d0=[-1,0]; p1=[b.x+b.w,b.y+b.h/2]; d1=[-1,0]; }
  else {
    const down=b.y>a.y, mx=(Math.max(a.x,b.x)+Math.min(a.x+a.w,b.x+b.w))/2;
    p0=[mx, down?a.y+a.h:a.y]; d0=[0,down?1:-1]; p1=[mx, down?b.y:b.y+b.h]; d1=[0,down?1:-1];
  }
  const dist=Math.hypot(p1[0]-p0[0],p1[1]-p0[1]);
  if(dist<7) return "";
  const k=Math.max(16,Math.min(72,dist*0.45));
  const c0=[p0[0]+d0[0]*k,p0[1]+d0[1]*k], c1=[p1[0]-d1[0]*k,p1[1]-d1[1]*k];
  const f=v=>v.map(n=>n.toFixed(1)).join(",");
  return `M${f(p0)} C${f(c0)} ${f(c1)} ${f(p1)}`;
}
function drawEdges(){ EP.forEach(ep=>{ ep.el.setAttribute("d", pathD(rectOf(ep.f), rectOf(ep.t))); }); }
let animUntil=0;
function animateEdges(ms){
  const start=animUntil===0||performance.now()>animUntil;
  animUntil=performance.now()+ms;
  if(!start) return;
  const step=()=>{ drawEdges(); if(performance.now()<animUntil) requestAnimationFrame(step); else animUntil=0; };
  requestAnimationFrame(step);
}

/* ---------- Zustand ---------- */
function isNow(n, age){
  if(n.ms) return age>=n.a[0]-0.5 && age<=n.a[0]+0.5;
  return age>=n.a[0] && (age<n.a[1] || (n.a[1]>=AMAX && age<=AMAX));
}
function reachable(id){ const seen=new Set([id]), q=[id]; while(q.length){ const c=q.shift(); E.forEach(e=>{ if(e.f===c && !seen.has(e.t)){ seen.add(e.t); q.push(e.t); } }); } return seen; }
function applyState(){
  const {sel}=state;
  const reach = sel && !state.all ? reachable(sel) : null;
  N.forEach(n=>{
    const el=els[n.id];
    el.classList.toggle("is-sel", n.id===sel);
    el.setAttribute("aria-pressed", String(n.id===sel));
    el.classList.toggle("is-now", isNow(n,state.age));
    const dim=(!!reach && !reach.has(n.id)) || (state.bbs && !n.bbs);
    el.classList.toggle("is-dim", dim);
  });
  EP.forEach(ep=>{
    const hot = reach ? (reach.has(ep.f)&&reach.has(ep.t)) : (sel && (ep.f===sel||ep.t===sel));
    ep.el.classList.toggle("hot", !!hot);
    ep.el.classList.toggle("dim", (!!reach && !hot) || (state.bbs && !(byId[ep.f].bbs||byId[ep.t].bbs)));
    ep.el.setAttribute("marker-end", hot?"url(#ah-hot)":"url(#ah)");
    if(hot) edgeG.appendChild(ep.el);
  });
}
function updateNowLine(){
  const x=xAge(state.age); const nl=$("#now-line");
  nl.style.left=x+"px"; $("#now-label").textContent=state.age+" J.";
}
function scrollToX(x, smooth){
  const left=Math.max(0, x - scroller.clientWidth*0.35);
  scroller.scrollTo({left, behavior: smooth && !reduce ? "smooth" : "auto"});
}
function scrollToAgeFocus(smooth){
  if(state.view==="age"){ scrollToX(xAge(state.age), smooth); return; }
  const first=N.filter(n=>isNow(n,state.age)).map(n=>geom(n,"path").x);
  if(first.length) scrollToX(Math.min(...first), smooth);
}

/* ---------- Karten ---------- */
const nodeChip = id => { const n=byId[id]; return `<button type="button" class="chip" data-go="${n.id}" data-bereich="${n.sec}"><i></i>${esc(plain(n.t))}</button>`; };
function ageWord(a){ return a===0 ? "Im ersten Lebensjahr" : a===1 ? "Mit 1 Jahr" : `Mit ${a} Jahren`; }
function renderAge(){
  const a=state.age, b=AGES.find(x=>a>=x.from && a<=x.to) || AGES[AGES.length-1];
  const now=N.filter(n=>isNow(n,a));
  $("#age-card").innerHTML = `
    <p class="eyebrow">${ageWord(a)}</p>
    <h2>${esc(b.title)}</h2>
    <p>${esc(b.text)}</p>
    <h3>Was jetzt ansteht</h3>
    <ul class="todo">${b.todo.map(t=>`<li>${esc(t)}</li>`).join("")}</ul>
    ${now.length?`<h3>Typische Stationen in diesem Alter</h3><ul class="chips">${now.map(n=>`<li>${nodeChip(n.id)}</li>`).join("")}</ul>`:""}`;
}
function issueLink(id){
  if(!issueBasis) return "";
  try { const u=new URL(issueBasis); u.searchParams.set("bezug","Station "+id); return u.toString(); }
  catch(e){ return issueBasis; }
}
function renderNode(){
  const n=byId[state.sel]; if(!n) return;
  const secName = SECT[n.sec].name + (n.bbs ? " · an der BBS" : "");
  const outs=E.filter(e=>e.f===n.id), ins=E.filter(e=>e.t===n.id);
  const li = (id, note, c) => `<li>${nodeChip(id)}${note||c?`<span class="cond">${esc(note|| "mit Zusatzvoraussetzung")}</span>`:""}</li>`;
  const facts = n.ms ? "" : `<dl class="facts">
      <dt>Alter</dt><dd>${esc(n.am)}</dd>
      <dt>Dauer</dt><dd>${esc(n.dur)}</dd>
      <dt>Zugang</dt><dd>${esc(n.zug)}</dd>
      <dt>Abschluss</dt><dd>${esc(n.abs)}</dd>
      <dt>Wo</dt><dd>${esc(n.wo)}</dd></dl>`;
  const korrektur = issueLink(n.id);
  $("#node-card").innerHTML = `
    <p class="eyebrow" data-bereich="${n.sec}"><span class="sec-dot"></span>${esc(secName)}</p>
    <h2>${esc(plain(n.t))}</h2>
    ${facts}
    ${n.note?`<p class="note">${esc(n.note)}</p>`:""}
    ${outs.length?`<h3>Wie geht es weiter?</h3><ul class="nextlist">${outs.map(e=>li(e.t,e.note,e.c)).join("")}</ul>`:""}
    ${ins.length?`<h3>Wie kommt man hierher?</h3><ul class="nextlist">${ins.map(e=>li(e.f,e.note,e.c)).join("")}</ul>`:""}
    <div class="actions">
      <button type="button" class="btn" id="allbtn" aria-pressed="${state.all}">${state.all?"Nur Wege ab hier zeigen":"Alle Stationen zeigen"}</button>
      <a class="btn klein" href="#kommentare">Kommentieren</a>
      ${korrektur?`<a class="btn klein" href="${esc(korrektur)}">Korrektur vorschlagen</a>`:""}
      <span class="small mono">Station ${esc(n.id)}</span>
    </div>`;
}
document.addEventListener("click", e=>{
  const go=e.target.closest("[data-go]"); if(go && byId[go.dataset.go]){ e.preventDefault(); waehle(go.dataset.go, true); return; }
  if(e.target.closest("#allbtn")){ state.all=!state.all; applyState(); renderNode(); }
});

function merkeHash(id){
  try { history.replaceState(null, "", "#s-"+id); } catch(e) { /* ohne History-API bleibt die Adresse */ }
}
function select(id, scroll){
  if(state.sel===id){ state.all=!state.all; }
  else { state.sel=id; state.all=false; }
  applyState(); renderNode(); merkeHash(id);
  if(scroll){ const g=geom(byId[id],state.view); scrollToX(g.x, true); }
}
/* Station gezielt auswählen (Chip, Hash-Link): kein Umschalten auf „alle“, Karte in Sicht bringen */
function waehle(id, smooth){
  state.sel=id; state.all=false;
  applyState(); renderNode(); merkeHash(id);
  scroller.scrollIntoView({behavior: smooth && !reduce ? "smooth" : "auto", block:"nearest"});
  scrollToX(geom(byId[id],state.view).x, smooth);
}
function setAge(a, smooth){
  state.age=a; $("#age").value=a; $("#age-out").textContent = a===1 ? "1 Jahr" : a+" Jahre";
  root.querySelectorAll("#quick button").forEach(b=>b.setAttribute("aria-pressed", String(+b.dataset.age===a)));
  const b=AGES.find(x=>a>=x.from && a<=x.to);
  if(b && !(byId[state.sel] && isNow(byId[state.sel],a))){ state.sel=b.focus; state.all=false; }
  updateNowLine(); applyState(); renderAge(); renderNode();
  scrollToAgeFocus(smooth);
}
function setView(v){
  if(state.view===v) return;
  state.view=v;
  $("#v-path").setAttribute("aria-pressed", String(v==="path"));
  $("#v-age").setAttribute("aria-pressed", String(v==="age"));
  layout(v, true);
  setTimeout(()=>scrollToAgeFocus(true), reduce?0:420);
}
$("#v-path").addEventListener("click",()=>setView("path"));
$("#v-age").addEventListener("click",()=>setView("age"));
$("#age").addEventListener("input",e=>setAge(+e.target.value,false));
$("#bbs").addEventListener("change",e=>{ state.bbs=e.target.checked; applyState(); });
window.addEventListener("resize",()=>drawEdges());

/* ---------- Hash-Links: /navigator/#s-kita wählt die Station aus ---------- */
function stationAusHash(){
  const m=/^#s-([a-z0-9-]+)$/.exec(location.hash);
  return m && byId[m[1]] ? m[1] : null;
}
window.addEventListener("hashchange",()=>{ const id=stationAusHash(); if(id && id!==state.sel) waehle(id, true); });

/* ---------- Start ---------- */
layout("path", false);
const startId = stationAusHash();
if(startId){
  // Alter passend zur Station einstellen, dann die Station auswählen
  setAge(Math.min(80, Math.floor(byId[startId].a[0])), false);
  waehle(startId, false);
} else {
  setAge(5, false);
}
if(document.fonts && document.fonts.ready) document.fonts.ready.then(()=>drawEdges());
})();
