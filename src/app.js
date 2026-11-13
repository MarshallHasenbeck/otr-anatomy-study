/* ============================ STATE ============================ */
const store={get(k,d){try{const v=localStorage.getItem(k);return v?JSON.parse(v):d}catch(e){return d}},set(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}};
const KEY="otr_anatomy_v1";
let P=store.get(KEY,{});            // card id -> {b: box 0..4, d: due timestamp, m: misses, n: reviews}
const DAY=864e5,IV=[0,1,2,4,7];     // days until a card in each box comes back
const save=()=>store.set(KEY,P);
const S={tab:"study",deck:"muscle",region:"All",mode:"smart",queue:[],idx:0,done:0,flipped:false,q:"",browse:"muscle",
  sex:store.get("otr_sex","f"),gm:null,amode:"muscle",aview:window.innerWidth>=1240?"both":"a",sel:null,quiz:null,qtopics:{muscle:1,diagram:1,move:1,skel:1,term:0,clin:1,nbcot:1},qlen:10};

FIG.setSex(S.sex);

/* ============================ HELPERS ============================ */
const $=s=>document.querySelector(s),$$=s=>document.querySelectorAll(s);
const esc=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
function shuffle(a){a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a}
const pick=a=>a[Math.floor(Math.random()*a.length)];
function parseTag(t){const assist=t.startsWith("~");const s=assist?t.slice(1):t;const i=s.indexOf(":");return{joint:s.slice(0,i).trim(),move:s.slice(i+1).trim(),assist}}
let _mv=null;
function movements(){
  if(_mv)return _mv;const map={};
  MUSCLES.forEach(mu=>mu.t.forEach(t=>{const p=parseTag(t);const key=p.joint+": "+p.move;(map[key]=map[key]||{joint:p.joint,move:p.move,prime:[],assist:[]})[p.assist?"assist":"prime"].push(mu.n)}));
  return _mv=Object.values(map).sort((a,b)=>JOINT_ORDER.indexOf(a.joint)-JOINT_ORDER.indexOf(b.joint)||a.move.localeCompare(b.move));
}
const MBY={};MUSCLES.forEach(x=>MBY[x.n]=x);
const regNames=rs=>rs.map(r=>REGIONS[r]).join(", ");
const status=id=>{const r=P[id];return !r?"new":r.b>=3?"known":(r.b===0&&r.m>0)?"missed":"learning"};

/* ---- "where is it" thumbnails ---- */
const REGBOX={head:[150,15,250,135],neck:[150,90,250,180],shoulder:[215,140,325,240],thorax:[125,155,275,320],abdomen:[130,290,270,400],pelvis:[130,355,290,490],arm:[255,165,345,345],elbow:[270,295,350,375],forearm:[285,325,365,455],hand:[305,425,395,545],thigh:[200,410,300,625],knee:[200,560,285,650],leg:[195,600,295,820],foot:[200,770,285,850]};
function muscleView(n){const mp=FIG.MAP[n];if(!mp)return null;const own=mp.own||[],deep=mp.deep||[];if(mp.ghost)return{v:mp.ghost[0][0],ids:mp.ghost,kind:"deep",ghost:true};const v=(own[0]||deep[0])[0];
  let ids=own.filter(i=>i[0]===v),kind="own";if(!ids.length){ids=deep.filter(i=>i[0]===v);kind="deep"}return{v,ids,kind}}
function whereM(n,cls){const w=muscleView(n);if(!w)return"";const hl={};w.ids.forEach(i=>hl[i]=w.kind);
  const cap=(w.v==="a"?"Anterior":"Posterior")+" view"+(w.ghost?"<br>Deep muscle, drawn through the surface layer":w.kind==="deep"?"<br>Lies deep to: "+esc([...new Set(w.ids.map(i=>FIG.S[i].label))].join(", ")):"");
  return `<div class="where ${cls||""}">${FIG.svg({view:w.v,hl,mini:true,crop:FIG.cropFor(w.ids,34,110)})}<small>${cap}</small></div>`}
function whereB(n,cls){const v=(n==="Scapula"||n==="Vertebral column")?"p":"a";
  return `<div class="where ${cls||""}">${FIG.svg({view:v,mode:"bone",hlB:[n],mini:true,joints:false,crop:FIG.cropBox([FIG.BBOX_B[n]],8,90)})}<small>${v==="a"?"Anterior":"Posterior"} view</small></div>`}
function whereJ(n,cls){const j=FIG.JDOTS.find(x=>x[0]===n);if(!j)return"";let x=j[1],y=j[2];if(j[4]){const X=FIG.wx(336,446)+.978*x+.208*y,Y=446-.208*x+.978*y;x=X;y=Y}else x=FIG.wx(x,y);
  const v=j[3][0];return `<div class="where ${cls||""}">${FIG.svg({view:v,mode:"bone",hlJ:n,mini:true,crop:[x-70,y-70,140,140]})}<small>${v==="a"?"Anterior":"Posterior"} view</small></div>`}
function whereR(rs,cls){const b=REGBOX[rs[0]];return `<div class="where ${cls||""}">${FIG.svg({view:"a",mode:"bone",mini:true,joints:false,crop:FIG.cropBox([b],6,90)})}<small>${esc(regNames(rs))}</small></div>`}

/* ============================ CARDS ============================ */
const DECKS=[["muscle","Muscles: name → origin, insertion, action, nerve"],["reverse","Muscles: attachments → name"],["diagram","Identify the muscle on the figure"],["move","Movements → muscles"],["bone","Bone landmarks"],["joint","Joints"],["lig","Ligaments"],["clin","OT clinical anatomy"],["nbcot","NBCOT exam prep"],["term","Terminology"],["all","Everything"]];
let _cards=null;
function allCards(){
  if(_cards)return _cards;const c=[];
  MUSCLES.forEach(x=>{c.push({id:"m:"+x.n,kind:"muscle",x,r:x.r,label:x.n});c.push({id:"r:"+x.n,kind:"reverse",x,r:x.r,label:x.n+" (from attachments)"})});
  FIG.SH.forEach(sh=>{if(sh.k==="m"&&FIG.OWN[sh.id])c.push({id:"d:"+sh.id,kind:"diagram",sh,r:MBY[FIG.OWN[sh.id][0]].r,label:sh.label+" (on the figure, "+(sh.v==="a"?"anterior":"posterior")+")"})});
  movements().forEach(x=>c.push({id:"v:"+x.joint+x.move,kind:"move",x,r:x.joint,label:x.joint+": "+x.move}));
  BONES.forEach(b=>b.L.forEach(l=>c.push({id:"b:"+b.n+":"+l[0],kind:"bone",bone:b.n,loc:b.l,name:l[0],note:l[1],r:b.r,label:b.n+": "+l[0]})));
  JOINTS.forEach(j=>c.push({id:"j:"+j[0],kind:"joint",j,r:REGIONS[j[1][0]],label:j[0]}));
  LIG.forEach(l=>c.push({id:"l:"+l[0],kind:"lig",l,r:REGIONS[l[1][0]],label:l[0]}));
  CLIN.forEach(q=>c.push({id:"c:"+q[1],kind:"clin",cat:q[0],name:q[1],note:q[2],r:q[0],label:q[1]}));
  NBCOT.forEach(q=>c.push({id:"n:"+q[1],kind:"nbcot",cat:q[0],name:q[1],note:q[2],r:q[0],label:q[1]}));
  TERMS.forEach(t=>c.push({id:"t:"+t[1],kind:"term",cat:t[0],name:t[1],note:t[2],r:t[0],label:t[1]}));
  return _cards=c;
}
const deckCards=d=>allCards().filter(c=>d==="all"||c.kind===d);
function regionsFor(d){return["All",...new Set(deckCards(d).map(c=>c.r))]}
function buildQueue(){
  const now=Date.now();
  let cs=deckCards(S.deck).filter(c=>S.region==="All"||c.r===S.region);
  if(S.mode==="missed")return shuffle(cs.filter(c=>status(c.id)==="missed"));
  if(S.mode==="all")return shuffle(cs);
  const miss=[],due=[],fresh=[];
  cs.forEach(c=>{const r=P[c.id];if(!r)fresh.push(c);else if(r.b===0&&r.m>0)miss.push(c);else if(r.d<=now)due.push(c)});
  return[...shuffle(miss),...shuffle(due),...shuffle(fresh)];
}
function resetQueue(){S.queue=buildQueue();S.idx=0;S.done=0;S.flipped=false}

const row=(b,t)=>`<div class="row"><b>${b}</b><span>${gl(t)}</span></div>`;
const muscleRows=x=>cnRow(x.n)+plainRow(PLAIN_MUS[x.n])+row("Location",x.l)+row("Origin",x.o)+row("Insertion",x.i)+row("Action",x.a)+row("Innervation",x.v);
function cardFace(c,f){
  const front=(tag,big,hint,cn)=>`<div class="tag">${esc(tag)}</div><div class="big">${esc(big)}</div>${cn?`<div class="cn">${esc(cn)}</div>`:""}<div class="hint">${hint} Space to flip.</div>`;
  const back=(tag,txt,where)=>`<div class="tag">${esc(tag)}</div><div class="back"><div class="txt">${txt}</div>${where||""}</div>`;
  if(c.kind==="muscle"){const x=c.x;return f?back(x.n,muscleRows(x),whereM(x.n)):front(x.r+" · Muscle",x.n,"Recall origin, insertion, action, and nerve.",COMMON[x.n])}
  if(c.kind==="reverse"){const x=c.x;return f?back(x.r,`<div class="big" style="margin-bottom:14px">${esc(x.n)}</div>`+plainRow(PLAIN_MUS[x.n])+row("Action",x.a)+row("Innervation",x.v),whereM(x.n))
    :`<div class="tag">Which muscle?</div>${row("Origin",x.o)}${row("Insertion",x.i)}<div class="hint">Name it, then its action and nerve. Space to flip.</div>`}
  if(c.kind==="diagram"){const sh=c.sh,ms=FIG.OWN[sh.id];
    const fig=`<div class="qfig" style="display:flex;justify-content:center;margin-bottom:10px"><div class="where" style="width:250px">${FIG.svg({view:sh.v,hl:{[sh.id]:"own"},mini:true,crop:FIG.cropFor([sh.id],46,130)}).replace('class="fig','style="width:250px;height:250px" class="fig')}<small>${sh.v==="a"?"Anterior":"Posterior"} view</small></div></div>`;
    return f?`<div class="tag">${sh.v==="a"?"Anterior":"Posterior"} view</div><div class="back"><div class="txt"><div class="big" style="margin-bottom:14px">${esc(sh.label)}</div>${ms.map(n=>(ms.length>1?`<div class="row"><b>${esc(n)}</b></div>`:"")+row("Action",MBY[n].a)+row("Innervation",MBY[n].v)).join("")}</div>${whereM(ms[0])}</div>`
      :`<div class="tag">Name the highlighted muscle</div>${fig}<div class="hint" style="text-align:center;margin-top:4px">Space to flip.</div>`}
  if(c.kind==="move"){const x=c.x;const pills=(a,k)=>a.map(n=>`<span class="pill ${k}">${esc(n)}</span>`).join("")||"<i>none listed</i>";
    return f?back(x.joint+": "+x.move,plainRow(PLAIN_M[x.joint+": "+x.move])+`<div class="row"><b>Prime movers</b><div>${pills(x.prime,"")}</div></div><div class="row"><b>Assisting muscles</b><div>${pills(x.assist,"as")}</div></div>`)
      :front(x.joint,x.move,"Which muscles produce this movement?")}
  if(c.kind==="bone")return f?back(c.bone,`<div class="big" style="font-size:23px;margin-bottom:12px">${esc(c.name)}</div>`+row("What it is and what attaches",c.note)+row("The bone",(PLAIN_B[c.bone]||"")+" "+c.loc),whereB(c.bone))
    :front(c.bone+(COMMON[c.bone]?" ("+COMMON[c.bone].toLowerCase()+")":"")+" · Landmark",c.name,"What is it, and what attaches here?");
  if(c.kind==="joint"){const j=c.j;return f?back(j[0],jointBody(j),whereJ(j[0])):front(c.r+" · Joint",j[0],"Type, movements, and bones.",COMMON[j[0]])}
  if(c.kind==="lig"){const l=c.l;return f?back(l[0],ligBody(l),whereR(l[1])):front(c.r+" · Ligament",l[0],"Attachments and role.",COMMON[l[0]])}
  return f?back(c.cat,`<div class="big" style="font-size:23px;margin-bottom:12px">${esc(c.name)}</div>`+(c.kind==="clin"?plainRow(PLAIN_C[c.name])+row("Details",c.note):`<div class="row"><span>${gl(c.note)}</span></div>`)):front(c.cat,c.name,c.kind==="clin"?"What does it look like, and what does the OT do?":c.kind==="nbcot"?"Recall the key points.":"Define it.");
}

/* ============================ STUDY ============================ */
function renderStudy(){
  const cs=deckCards(S.deck).filter(c=>S.region==="All"||c.r===S.region);
  const cnt={new:0,learning:0,known:0,missed:0};cs.forEach(c=>cnt[status(c.id)]++);
  let h=`<div class="fcwrap"><div class="bar">
    <select id="deck">${DECKS.map(d=>`<option value="${d[0]}"${d[0]===S.deck?" selected":""}>${esc(d[1])}</option>`).join("")}</select>
    <select id="region">${regionsFor(S.deck).map(r=>`<option${r===S.region?" selected":""}>${esc(r)}</option>`).join("")}</select>
    <span class="seg" id="mode">${[["smart","Smart"],["all","All"],["missed","Missed"]].map(o=>`<button data-v="${o[0]}" class="${S.mode===o[0]?"on":""}">${o[1]}</button>`).join("")}</span>
    <span class="stats">${cnt.known} known · ${cnt.learning} learning · ${cnt.missed} missed · ${cnt.new} new</span></div>`;
  const left=S.queue.length;
  if(!left){
    const msg=S.done?`<p><b>Session complete.</b> ${S.done} card${S.done>1?"s":""} reviewed.</p>`:"";
    const why=S.mode==="missed"?"No missed cards here.":S.mode==="smart"?"Nothing is due in this deck right now. Smart mode shows new cards, missed cards, and cards that are due for review.":"No cards match.";
    h+=`<div class="empty">${msg}<p>${why}</p><div class="acts"><button class="btn pri" id="again">Study this deck again (All)</button></div></div></div>`;
    $("#main").innerHTML=h;wireStudy();return}
  const c=S.queue[S.idx];
  h+=`<div class="prog"><i style="width:${Math.round(S.done/(S.done+left)*100)}%"></i></div>
  <div class="face" id="face">${cardFace(c,S.flipped)}</div>
  <div class="acts">${S.flipped?`<button class="btn bad" id="g0">Missed it <kbd>1</kbd></button><button class="btn good" id="g1">Got it <kbd>2</kbd></button><button class="btn easy" id="g2">Easy <kbd>3</kbd></button>`:`<button class="btn pri" id="flipb">Show answer <kbd>space</kbd></button>`}<button class="btn" id="skip">Skip <kbd>→</kbd></button></div>
  <div class="kbd">${left} left in this session${P[c.id]&&P[c.id].m?` · you have missed this one ${P[c.id].m}×`:""}</div></div>`;
  $("#main").innerHTML=h;wireStudy();
}
function wireStudy(){
  const on=(s,f)=>{const e=$(s);if(e)e.onclick=f};
  $("#deck").onchange=e=>{S.deck=e.target.value;S.region="All";resetQueue();renderStudy()};
  $("#region").onchange=e=>{S.region=e.target.value;resetQueue();renderStudy()};
  $$("#mode button").forEach(b=>b.onclick=()=>{S.mode=b.dataset.v;resetQueue();renderStudy()});
  on("#face",flip);on("#flipb",flip);on("#skip",skip);
  on("#g0",()=>grade(0));on("#g1",()=>grade(1));on("#g2",()=>grade(2));
  on("#again",()=>{S.mode="all";resetQueue();renderStudy()});
}
function flip(){if(!S.queue.length)return;S.flipped=!S.flipped;renderStudy()}
function skip(){if(S.queue.length<2)return;S.queue.push(S.queue.splice(S.idx,1)[0]);S.flipped=false;renderStudy()}
function grade(g){
  const c=S.queue[S.idx];if(!c)return;
  const r=P[c.id]||(P[c.id]={b:0,d:0,m:0,n:0});const first=r.n===0;r.n++;
  S.queue.splice(S.idx,1);
  if(g===0){r.b=0;r.m++;r.d=Date.now();S.queue.splice(Math.min(S.queue.length,3),0,c)}
  else{r.b=Math.min(4,first&&g===2?3:r.b+g);r.d=Date.now()+IV[r.b]*DAY;S.done++}
  save();badge();S.flipped=false;renderStudy();
}
function badge(){const n=Object.keys(P).filter(k=>status(k)==="missed").length;const e=$("#fbadge");if(e)e.textContent=n||""}

/* ============================ QUIZ ============================ */
function near(pool,same,key){ // distractors, preferring ones that share a region
  const a=shuffle(pool.filter(same)),b=shuffle(pool.filter(x=>!same(x)));const out=[],seen=new Set();
  [...a,...b].forEach(x=>{const k=key(x);if(!seen.has(k)){seen.add(k);out.push(x)}});return out}
const QGEN={
  nerve(){const x=pick(MUSCLES);const d=near(MUSCLES.filter(y=>y.v!==x.v),y=>y.r===x.r,y=>y.v).slice(0,3);
    return{k:"n"+x.n,card:"m:"+x.n,q:`Which nerve innervates ${x.n}?`,a:x.v,opts:d.map(y=>y.v),ex:`${x.n}: ${x.v}.`}},
  field(){const x=pick(MUSCLES),f=pick([["o","origin"],["i","insertion"],["a","action"]]);const d=near(MUSCLES.filter(y=>y!==x),y=>y.r===x.r,y=>y.n).slice(0,3);
    return{k:f[0]+x.n,card:"m:"+x.n,q:`Which muscle has this ${f[1]}?`,quote:x[f[0]],a:x.n,opts:d.map(y=>y.n),ex:`${x.n}. ${f[1]==="action"?"Nerve: "+x.v:"Action: "+x.a}`}},
  diagram(){const pool=FIG.SH.filter(s=>s.k==="m"&&FIG.OWN[s.id]),sh=pick(pool);const cx=b=>[(b[0]+b[2])/2,(b[1]+b[3])/2],p=cx(sh.bb);
    const d=pool.filter(s=>s.v===sh.v&&s.label!==sh.label).sort((s,t)=>{const a=cx(s.bb),b=cx(t.bb);return Math.hypot(a[0]-p[0],a[1]-p[1])-Math.hypot(b[0]-p[0],b[1]-p[1])}).slice(0,7);
    const m=MBY[FIG.OWN[sh.id][0]];
    return{k:"d"+sh.id,card:"d:"+sh.id,q:`Which muscle is highlighted? (${sh.v==="a"?"anterior":"posterior"} view)`,fig:FIG.svg({view:sh.v,hl:{[sh.id]:"own"},mini:true,crop:FIG.cropFor([sh.id],48,130)}),a:sh.label,opts:shuffle(d).slice(0,3).map(s=>s.label),ex:`${sh.label}. ${m.a}`}},
  move(){const x=pick(movements().filter(v=>v.prime.length));const ok=pick(x.prime);const bad=MUSCLES.filter(y=>!x.prime.includes(y.n)&&!x.assist.includes(y.n));
    const d=near(bad,y=>y.t.some(t=>parseTag(t).joint===x.joint),y=>y.n).slice(0,3);
    return{k:"v"+x.joint+x.move,card:"v:"+x.joint+x.move,q:`Which of these is a prime mover for ${x.joint.toLowerCase()} ${x.move.toLowerCase()}?`,a:ok,opts:d.map(y=>y.n),ex:`Prime movers: ${x.prime.join(", ")}.${x.assist.length?" Assisting: "+x.assist.join(", ")+".":""}`}},
  jtype(){const j=pick(JOINTS);const d=near(JOINTS.filter(y=>y[2]!==j[2]),()=>true,y=>y[2]).slice(0,3);
    return{k:"j"+j[0],card:"j:"+j[0],q:`What type of joint is the ${j[0].replace(/ joints?$/,"")}?`,a:j[2],opts:d.map(y=>y[2]),ex:`${j[2]}. ${j[3]}`}},
  lig(){const l=pick(LIG);const d=near(LIG.filter(y=>y!==l),y=>y[1][0]===l[1][0],y=>y[0]).slice(0,3);
    return{k:"l"+l[0],card:"l:"+l[0],q:"Which ligament is this?",quote:l[3]+" Attachments: "+l[2],a:l[0],opts:d.map(y=>y[0]),ex:l[0]+"."}},
  bone(){const b=pick(BONES.filter(x=>x.L.length>=4)),l=pick(b.L);const d=shuffle(b.L.filter(y=>y!==l)).slice(0,3);
    return{k:"b"+b.n+l[0],card:"b:"+b.n+":"+l[0],q:`${b.n}: which landmark is this?`,quote:l[1],a:l[0],opts:d.map(y=>y[0]),ex:l[0]+"."}},
  term(){const t=pick(TERMS);const d=near(TERMS.filter(y=>y!==t),y=>y[0]===t[0],y=>y[1]).slice(0,3);
    return{k:"t"+t[1],card:"t:"+t[1],q:"Which term matches this definition?",quote:t[2],a:t[1],opts:d.map(y=>y[1]),ex:t[1]+"."}},
  clin(){const c=pick(CLIN);const d=near(CLIN.filter(y=>y!==c),y=>y[0]===c[0],y=>y[1]).slice(0,3);
    return{k:"c"+c[1],card:"c:"+c[1],q:"Which does this describe?",quote:c[2],a:c[1],opts:d.map(y=>y[1]),ex:c[1]+"."}}
};
QGEN.nbcot=function(){const c=pick(NBCOT);const d=near(NBCOT.filter(y=>y!==c),y=>y[0]===c[0],y=>y[1]).slice(0,3);
  return{k:"n"+c[1],card:"n:"+c[1],q:"Which topic does this describe?",quote:c[2],a:c[1],opts:d.map(y=>y[1]),ex:c[1]+"."}};
const QTOPICS=[["muscle","Muscles",["nerve","field","field"]],["diagram","Figure ID",["diagram","diagram"]],["move","Movements",["move"]],["skel","Bones, joints, ligaments",["bone","jtype","lig"]],["clin","OT clinical",["clin","clin"]],["nbcot","NBCOT prep",["nbcot","nbcot","nbcot"]],["term","Terminology",["term"]]];
function startQuiz(){
  const types=[];QTOPICS.forEach(t=>{if(S.qtopics[t[0]])types.push(...t[2])});if(!types.length)return;
  const qs=[],seen=new Set();let guard=0;
  while(qs.length<S.qlen&&guard++<600){const q=QGEN[pick(types)]();if(seen.has(q.k)||q.opts.length<3||q.opts.includes(q.a))continue;seen.add(q.k);q.all=shuffle([q.a,...q.opts]);qs.push(q)}
  S.quiz={qs,i:0,pick:null,right:0,wrong:[]};renderQuiz();
}
function renderQuiz(){
  const Q=S.quiz;let h=`<div class="qz">`;
  if(!Q){
    h+=`<h2>Quiz</h2><p class="sub">Multiple choice, built fresh each time from the same facts as the flashcards. Anything you get wrong is added to your missed cards.</p>
    <div class="bar">${QTOPICS.map(t=>`<button class="chip ${S.qtopics[t[0]]?"on":""}" data-t="${t[0]}">${t[1]}</button>`).join("")}</div>
    <div class="bar"><span class="seg" id="qlen">${[10,20,40].map(n=>`<button data-v="${n}" class="${S.qlen===n?"on":""}">${n} questions</button>`).join("")}</span><button class="btn pri" id="qgo">Start quiz</button></div></div>`;
    $("#main").innerHTML=h;
    $$("#main .chip").forEach(b=>b.onclick=()=>{S.qtopics[b.dataset.t]=S.qtopics[b.dataset.t]?0:1;renderQuiz()});
    $$("#qlen button").forEach(b=>b.onclick=()=>{S.qlen=+b.dataset.v;renderQuiz()});
    $("#qgo").onclick=startQuiz;return}
  if(Q.i>=Q.qs.length){
    const pct=Math.round(Q.right/Q.qs.length*100);
    h+=`<div class="qcard" style="text-align:center"><div class="score">${Q.right} / ${Q.qs.length}</div><p class="sub">${pct}% correct${Q.wrong.length?". The ones you missed are now in your missed cards.":". Clean sweep."}</p>
    <div class="acts"><button class="btn pri" id="qnew">New quiz</button>${Q.wrong.length?`<button class="btn" id="qmiss">Study missed cards</button>`:""}</div></div>`;
    if(Q.wrong.length)h+=`<h3 class="ph">Review</h3>`+Q.wrong.map(q=>`<div class="it open"><div class="hd"><strong>${esc(q.q)}</strong></div><div class="bd">${q.quote?`<p style="margin-top:0">${esc(q.quote)}</p>`:""}<p style="margin-top:0"><b>Answer:</b> ${esc(q.a)}</p><p style="color:var(--mute)">${esc(q.ex)}</p></div></div>`).join("");
    $("#main").innerHTML=h+"</div>";
    $("#qnew").onclick=()=>{S.quiz=null;renderQuiz()};
    if($("#qmiss"))$("#qmiss").onclick=()=>{S.deck="all";S.region="All";S.mode="missed";resetQueue();show("study")};return}
  const q=Q.qs[Q.i],done=Q.pick!==null;
  h+=`<div class="prog"><i style="width:${Math.round(Q.i/Q.qs.length*100)}%"></i></div><div class="qcard"><div class="face-tag" style="color:var(--mute);font-size:13px">Question ${Q.i+1} of ${Q.qs.length}</div>
  <div class="qq">${esc(q.q)}</div>${q.fig?`<div class="qfig">${q.fig}</div>`:""}${q.quote?`<div class="note" style="font-size:15.5px">${esc(q.quote)}</div>`:""}
  ${q.all.map((o,i)=>`<button class="opt ${done?(o===q.a?"right":o===Q.pick?"wrong":""):""}" data-o="${i}" ${done?"disabled":""}><i>${i+1}</i><span>${esc(o)}</span></button>`).join("")}
  ${done?`<div class="expl">${Q.pick===q.a?"<b>Correct.</b> ":"<b>Not quite.</b> "}${esc(q.ex)}</div><div class="acts"><button class="btn pri" id="qnext">${Q.i+1<Q.qs.length?"Next":"See results"} <kbd>enter</kbd></button></div>`:""}</div>
  <div class="kbd">Keys: 1 to 4 to answer · Enter for next · <a href="#" id="qquit">end quiz</a></div></div>`;
  $("#main").innerHTML=h;
  $$("#main .opt").forEach(b=>b.onclick=()=>answer(+b.dataset.o));
  if($("#qnext"))$("#qnext").onclick=nextQ;
  $("#qquit").onclick=e=>{e.preventDefault();S.quiz=null;renderQuiz()};
}
function answer(i){const Q=S.quiz;if(!Q||Q.pick!==null||Q.i>=Q.qs.length)return;const q=Q.qs[Q.i];if(i>=q.all.length)return;Q.pick=q.all[i];
  if(Q.pick===q.a)Q.right++;else{Q.wrong.push(q);const r=P[q.card]||(P[q.card]={b:0,d:0,m:0,n:0});r.b=0;r.m++;r.n++;r.d=Date.now();save();badge()}
  renderQuiz()}
function nextQ(){const Q=S.quiz;if(!Q||Q.pick===null)return;Q.i++;Q.pick=null;renderQuiz()}

/* ============================ ATLAS ============================ */
const item=(title,sub,body,open)=>`<div class="it${open?" open":""}"><div class="hd"><strong>${esc(title)}</strong><small>${esc(sub||"")}</small></div><div class="bd">${body}</div></div>`;
const plainRow=t=>t?row("In plain words",t):"";
const cnRow=n=>COMMON[n]?row("Common name",COMMON[n]):"";
const jointBody=j=>cnRow(j[0])+plainRow(PLAIN_J[j[0]])+row("Type",j[2])+row("Movements",j[3])+row("Bones",j[4]);
const ligBody=l=>cnRow(l[0])+plainRow(PLAIN_L[l[0]])+row("Attachments",l[2])+row("Role",l[3]);
const boneBody=b=>cnRow(b.n)+plainRow(PLAIN_B[b.n])+row("Location",b.l)+`<p style="margin:0 0 10px;color:var(--mute)">${esc(b.intro)}</p>`+b.L.map(l=>row(esc(l[0]),l[1])).join("");
function atlasPanel(){
  const s=S.sel;
  if(!s)return S.amode==="muscle"
    ?`<div class="empty"><p><b>Click any muscle</b></p><p>Each shape is one superficial muscle. Click it to see its attachments, action, and nerve, plus the deeper muscles underneath. Hover to see names.</p></div>`
    :`<div class="empty"><p><b>Click a bone or a joint</b></p><p>Bones show their landmarks. The teal dots are joints; click one for its type, movements, and the ligaments around it.</p></div>`;
  let h="";
  const overlap=(a,b)=>a.some(r=>b.includes(r));
  if(s.t==="s"){const sh=FIG.S[s.id],own=FIG.OWN[s.id]||[],deep=FIG.DEEP[s.id]||[];
    h+=`<h3 class="rt">${esc(sh.label)}</h3><p class="sub">${sh.v==="a"?"Anterior":"Posterior"} view${sh.k==="b"?" · bony landmark":sh.k==="t"?" · tendon / fascia":""}</p>`;
    if(sh.note)h+=`<div class="note">${esc(sh.note)}</div>`;
    h+=own.map(n=>item(n,MBY[n].r,muscleRows(MBY[n]),true)).join("");
    if(deep.length)h+=`<h3 class="ph">Deep to this (${deep.length})</h3><p class="sub" style="margin-bottom:8px">Open one to see it drawn on the figure, where a deep outline is available.</p>`+deep.map(n=>item(n,MBY[n].r,muscleRows(MBY[n]),n===S.gm).replace('class="it','data-m="'+esc(n)+'" class="it gm')).join("");
  }else{
    let regs;
    if(s.t==="b"){const b=BONES.find(x=>x.n===s.name);regs=BREG[s.name];h+=`<h3 class="rt">${esc(b.n)}</h3><p class="sub">${esc(b.r)}</p>`+item("Landmarks",b.L.length+"",boneBody(b),true)}
    else{const j=JOINTS.find(x=>x[0]===s.name);regs=j[1];h+=`<h3 class="rt">${esc(j[0])}</h3><p class="sub">${esc(regNames(regs))}</p>`+item(j[0],"joint",jointBody(j),true)}
    regs.forEach(r=>{if(SEXNOTE[r])h+=`<div class="note">${esc(SEXNOTE[r])}</div>`});
    const js=JOINTS.filter(j=>overlap(j[1],regs)&&j[0]!==s.name),ls=LIG.filter(l=>overlap(l[1],regs));
    if(js.length)h+=`<h3 class="ph">${s.t==="b"?"Joints of this bone and its neighbors":"Nearby joints"} (${js.length})</h3>`+js.map(j=>item(j[0],j[2].split(/[.(]/)[0],jointBody(j))).join("");
    if(ls.length)h+=`<h3 class="ph">Ligaments here (${ls.length})</h3>`+ls.map(l=>item(l[0],"",ligBody(l))).join("");
  }
  return h;
}
function renderAtlas(){
  const s=S.sel,hl={},ghostOn=!!(s&&s.t==="s"&&S.gm&&FIG.MAP[S.gm].ghost);
  if(s&&s.t==="s"){if(ghostOn)FIG.MAP[S.gm].ghost.forEach(i=>hl[i]="deep");else(FIG.OWN[s.id]||[]).forEach(n=>(FIG.MAP[n].own||[]).forEach(i=>hl[i]="own"))}
  const views=S.aview==="both"?["a","p"]:[S.aview];
  const fig=v=>`<div class="figbox">${FIG.svg({view:v,mode:S.amode,hl,sel:s&&s.t==="s"&&!ghostOn?s.id:null,hlB:s&&s.t==="b"?[s.name]:null,hlJ:s&&s.t==="j"?s.name:null})}</div>`;
  const seg=(k,opts)=>`<span class="seg">${opts.map(o=>`<button class="${S[k]===o[0]?"on":""}" data-k="${k}" data-v="${o[0]}">${o[1]}</button>`).join("")}</span>`;
  $("#main").innerHTML=`<div class="bar">${seg("amode",[["muscle","Muscles"],["bone","Skeleton and joints"]])}${seg("aview",[["both","Both"],["a","Anterior"],["p","Posterior"]])}${seg("sex",[["f","Female"],["m","Male"]])}</div>
  <div class="atlas"><div class="figs" id="figs">${views.map(fig).join("")}</div><div class="panel" id="panel">${atlasPanel()}</div></div>`;
  $$("#main .seg button").forEach(b=>b.onclick=()=>{S[b.dataset.k]=b.dataset.v;if(b.dataset.k==="amode")S.sel=null;if(b.dataset.k==="sex"){FIG.setSex(S.sex);store.set("otr_sex",S.sex)}renderAtlas()});
  $("#figs").onclick=e=>{const t=e.target.closest("[data-s],[data-b],[data-j]");if(!t)return;
    S.gm=null;S.sel=t.dataset.s?{t:"s",id:t.dataset.s}:t.dataset.j?{t:"j",name:t.dataset.j}:{t:"b",name:t.dataset.b};const y=$(".content").scrollTop;renderAtlas();$(".content").scrollTop=y};
  wireHd();
  $$("#panel .gm .hd").forEach(h=>h.onclick=()=>{const n=h.parentElement.dataset.m;S.gm=S.gm===n?null:n;const y=$(".content").scrollTop;renderAtlas();$(".content").scrollTop=y});
}
function wireHd(){$$("#main .hd").forEach(h=>h.onclick=()=>h.parentElement.classList.toggle("open"))}
function showOnAtlas(n){const mp=FIG.MAP[n];if(!mp)return;const own=(mp.own||[])[0];S.amode="muscle";
  if(own&&!mp.ghost){S.sel={t:"s",id:own};S.gm=null}else{S.sel={t:"s",id:own||mp.deep[0]};S.gm=n}
  if(S.aview!=="both")S.aview=(mp.ghost?mp.ghost[0]:S.sel.id)[0];show("atlas")}

/* ============================ LIBRARY ============================ */
function renderLib(){
  const cats=[["muscle","Muscles"],["move","Movements"],["bone","Bones"],["joint","Joints"],["lig","Ligaments"],["clin","OT clinical"],["nbcot","NBCOT prep"],["term","Terminology"]];
  $("#main").innerHTML=`<div class="bar"><span class="seg">${cats.map(o=>`<button class="${S.browse===o[0]?"on":""}" data-v="${o[0]}">${o[1]}</button>`).join("")}</span></div>
  <div class="bar"><input type="search" id="q" placeholder="Search by name, attachment, action, nerve…" value="${esc(S.q)}"></div><div id="list"></div>`;
  $$("#main .seg button").forEach(b=>b.onclick=()=>{S.browse=b.dataset.v;renderLib()});
  $("#q").oninput=e=>{S.q=e.target.value;fillList()};fillList();
}
function fillList(){
  const q=S.q.toLowerCase().trim(),has=s=>!q||s.toLowerCase().includes(q);let out="";
  const grouped=(rows,key,render)=>{let last="";return rows.map(x=>{const k=key(x),hd=k!==last?`<h3 class="ph">${esc(k)}</h3>`:"";last=k;return hd+render(x)}).join("")};
  if(S.browse==="muscle")out=grouped(MUSCLES.filter(x=>has([x.n,x.r,x.l,x.o,x.i,x.a,x.v].join(" "))),x=>x.r,x=>item(x.n,x.v.split(/[(.;]/)[0],`<div class="back"><div class="txt">${muscleRows(x)}<p><a href="#" data-show="${esc(x.n)}">Show on the figure</a></p></div>${whereM(x.n,"sm")}</div>`));
  else if(S.browse==="move")out=`<p class="sub">Prime movers are solid; assisting muscles are dashed. This split is a simplification and textbooks draw the line differently.</p>`+grouped(movements().filter(x=>has(x.joint+" "+x.move+" "+x.prime.join(" ")+" "+x.assist.join(" "))),x=>x.joint,x=>item(x.move,x.prime.length+" prime · "+x.assist.length+" assist",
    plainRow(PLAIN_M[x.joint+": "+x.move])+`<div class="row"><b>Prime movers</b><div>${x.prime.map(n=>`<span class="pill">${esc(n)}</span>`).join("")||"<i>none listed</i>"}</div></div><div class="row"><b>Assisting</b><div>${x.assist.map(n=>`<span class="pill as">${esc(n)}</span>`).join("")||"<i>none listed</i>"}</div></div>`,!!q));
  else if(S.browse==="bone")out=BONES.filter(b=>has(b.n+" "+b.intro+" "+b.L.map(l=>l.join(" ")).join(" "))).map(b=>item(b.n,b.r,`<div class="back"><div class="txt">${boneBody(b)}</div>${whereB(b.n,"sm")}</div>`)).join("");
  else if(S.browse==="joint")out=JOINTS.filter(j=>has(j.flat().join(" "))).map(j=>item(j[0],regNames(j[1]),`<div class="back"><div class="txt">${jointBody(j)}</div>${whereJ(j[0],"sm")}</div>`)).join("");
  else if(S.browse==="lig")out=LIG.filter(l=>has(l.flat().join(" "))).map(l=>item(l[0],regNames(l[1]),ligBody(l))).join("");
  else{const src=S.browse==="clin"?CLIN:S.browse==="nbcot"?NBCOT:TERMS;out=grouped(src.filter(t=>has(t.join(" "))),t=>t[0],t=>`<div class="it open"><div class="hd"><strong>${esc(t[1])}</strong></div><div class="bd">${S.browse==="clin"?plainRow(PLAIN_C[t[1]])+row("Details",t[2]):gl(t[2])}</div></div>`)}
  $("#list").innerHTML=out||`<div class="empty">No matches.</div>`;wireHd();
  $$("#list [data-show]").forEach(a=>a.onclick=e=>{e.preventDefault();showOnAtlas(a.dataset.show)});
}

/* ============================ PROGRESS ============================ */
function renderProgress(){
  const tiles=DECKS.filter(d=>d[0]!=="all").map(d=>{const cs=deckCards(d[0]),n=cs.length,c={new:0,learning:0,known:0,missed:0};cs.forEach(x=>c[status(x.id)]++);
    return `<div class="tile" data-d="${d[0]}" style="cursor:pointer"><b>${esc(d[1].split(":")[0]+(d[1].includes("→")&&d[1].includes(":")?": "+d[1].split(": ")[1]:""))}</b><div class="stack"><i class="k" style="width:${c.known/n*100}%"></i><i class="l" style="width:${c.learning/n*100}%"></i><i class="x" style="width:${c.missed/n*100}%"></i></div><small>${c.known} known · ${c.learning} learning · ${c.missed} missed · ${c.new} new</small></div>`}).join("");
  const missed=allCards().filter(c=>status(c.id)==="missed").sort((a,b)=>P[b.id].m-P[a.id].m);
  const byR={};missed.forEach(c=>byR[c.r]=(byR[c.r]||0)+1);
  let h=`<h2>Progress</h2><p class="sub">A card is "known" after you get it right on a few separate days. Missed cards come back first in Smart mode.</p><div class="grid">${tiles}</div>`;
  if(missed.length)h+=`<div class="bar"><h3 class="ph" style="margin:0">Needs focus (${missed.length})</h3><button class="btn pri" id="pstudy">Study missed cards</button></div>
    <div class="bar" style="gap:4px"><span style="color:var(--mute);font-size:14px;margin-right:6px">Weakest areas:</span>${Object.entries(byR).sort((a,b)=>b[1]-a[1]).map(([r,n])=>`<span class="pill">${esc(r)} · ${n}</span>`).join("")}</div>`
    +missed.map(c=>`<div class="fcl"><div><strong>${esc(c.label)}</strong><br><small>${esc(c.r)}</small></div><div class="mc">missed ${P[c.id].m}×</div></div>`).join("");
  else h+=`<div class="empty">Nothing in the missed pile. Cards you miss in Study or Quiz show up here.</div>`;
  h+=`<h3 class="ph">About the content</h3><div class="note" style="line-height:1.6"><b>This is a study aid, not a primary reference.</b> The muscle, bone, joint, and ligament facts follow standard anatomy texts (Moore, Gray's, Kendall, OpenStax), and the clinical and NBCOT exam prep decks follow common OT references (OTPF-4 and standard OT textbooks). The NBCOT deck is general exam content written for this app; it is not NBCOT material and this app is not affiliated with NBCOT. Sources disagree on some details, most often spinal root levels, exact splinting angles, ROM norms, and which muscles count as prime movers versus assistants. Where a card says "about" or "sources vary", that is why. If something here conflicts with her NBCOT prep materials, trust those.<br><br>The figure is a hand-drawn schematic with correct relative positions of the superficial muscles and bones. Words with a dotted underline are glossary terms: tap or hover for a plain definition. It is for learning where things are, not a substitute for an atlas plate. The 3D model tab uses a real scan-based model (BodyParts3D), which is male only and is missing a few muscles; the note under the viewer lists them. Deep muscles are shown as hatching over the muscle that covers them. The female and male figures have the same muscles and bones; they differ in proportions (shoulder and rib cage width, pelvis width), and the pelvis and knee notes describe the real skeletal differences.<br><br>Progress is saved in this browser on this device only; use the backup below to protect it.</div>
  <h3 class="ph">Back up your progress</h3><div class="note">Progress lives in this browser. Browsers can clear it (private windows, "clear website data", or long periods without opening the app), so save a backup file now and then. A backup can also move your progress to another computer or phone.<br><span id="bkinfo" style="color:var(--mute)"></span></div>
  <div class="bar"><button class="btn pri" id="pexport">Save backup file</button><button class="btn" id="pimport">Restore from backup…</button><input type="file" id="pfile" accept=".json,application/json" style="display:none"><button class="btn bad" id="preset" style="margin-left:auto">Reset all progress</button></div>`;
  $("#main").innerHTML=h;
  $$("#main .tile").forEach(t=>t.onclick=()=>{S.deck=t.dataset.d;S.region="All";S.mode="smart";resetQueue();show("study")});
  if($("#pstudy"))$("#pstudy").onclick=()=>{S.deck="all";S.region="All";S.mode="missed";resetQueue();show("study")};
  $("#preset").onclick=()=>{if(confirm("Erase all study progress? This cannot be undone.")){P={};save();badge();resetQueue();renderProgress()}};
  const last=store.get("otr_backup_at",0),n=Object.keys(P).length;
  $("#bkinfo").textContent=n?(last?"Last backup: "+new Date(last).toLocaleDateString()+".":"No backup saved yet.")+" "+n+(n===1?" card has":" cards have")+" progress.":"No progress yet.";
  $("#pexport").onclick=()=>{const blob=new Blob([JSON.stringify({app:"otr-anatomy-study",v:1,saved:new Date().toISOString(),progress:P})],{type:"application/json"});
    const a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download="otr-anatomy-progress-"+new Date().toISOString().slice(0,10)+".json";document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(a.href),2000);
    store.set("otr_backup_at",Date.now());renderProgress()};
  $("#pimport").onclick=()=>$("#pfile").click();
  $("#pfile").onchange=e=>{const f=e.target.files[0];if(!f)return;const rd=new FileReader();rd.onload=()=>{try{const d=JSON.parse(rd.result),src=d&&d.progress;
      if(!src||typeof src!=="object"||Array.isArray(src))throw new Error("not a backup file");
      const clean={};Object.keys(src).forEach(k=>{const r=src[k];if(r&&typeof r==="object"&&typeof r.b==="number")clean[k]={b:Math.max(0,Math.min(4,r.b|0)),d:+r.d||0,m:r.m|0,n:r.n|0}});
      const c=Object.keys(clean).length;if(!c)throw new Error("no progress found in that file");
      if(confirm("Restore progress for "+c+" cards from this backup? This replaces the progress currently in this browser.")){P=clean;save();badge();resetQueue();renderProgress()}
    }catch(err){alert("Could not restore: "+err.message)}};rd.readAsText(f);e.target.value=""};
}

/* ============================ NAV + KEYS ============================ */
function show(t){
  S.tab=t;$$("#nav button").forEach(b=>b.classList.toggle("on",b.dataset.t===t));$(".content").scrollTop=0;
  const v3=t==="v3";$("#main").style.display=v3?"none":"";$("#v3wrap").style.display=v3?"":"none";
  if(v3){init3D();if(window.V3D)V3D.render();return}
  ({study:renderStudy,quiz:renderQuiz,atlas:renderAtlas,lib:renderLib,progress:renderProgress})[t]();
}
document.addEventListener("keydown",e=>{
  if(/INPUT|SELECT|TEXTAREA/.test(document.activeElement.tagName)||e.metaKey||e.ctrlKey||e.altKey)return;
  if(S.tab==="study"){
    if(e.key===" "||e.key==="Enter"){e.preventDefault();flip()}
    else if(e.key==="ArrowRight")skip();
    else if(S.flipped&&"123".includes(e.key))grade(+e.key-1);
  }else if(S.tab==="quiz"&&S.quiz){
    if("1234".includes(e.key))answer(+e.key-1);else if(e.key==="Enter"||e.key===" "){e.preventDefault();nextQ()}
  }
});
$$("#nav button").forEach(b=>b.onclick=()=>show(b.dataset.t));
if(navigator.storage&&navigator.storage.persist)navigator.storage.persist().catch(()=>{});
resetQueue();show("study");badge();
