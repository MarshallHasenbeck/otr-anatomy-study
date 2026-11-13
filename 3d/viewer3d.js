/* 3D viewer: plain WebGL, no libraries. Model data: BodyParts3D (see credit in the page footer). */
window.init3D=function(){if(window.__v3)return;window.__v3=1;(async function(){
const $=s=>document.querySelector(s),$$=s=>document.querySelectorAll(s);
const esc=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const row=(b,t)=>t?`<div class="row"><b>${b}</b><span>${window.gl(t)}</span></div>`:"";
const item=(title,sub,body,open)=>`<div class="it${open?" open":""}"><div class="hd"><strong>${esc(title)}</strong><small>${esc(sub||"")}</small></div><div class="bd">${body}</div></div>`;
const MBY={};MUSCLES.forEach(x=>MBY[x.n]=x);

/* ---------- map model part names to study cards ---------- */
const MM=[[/trapezius/,"Trapezius"],[/levator scapulae/,"Levator scapulae"],[/rhomboid/,"Rhomboids (major and minor)"],[/serratus anterior/,"Serratus anterior"],[/pectoralis minor/,"Pectoralis minor"],[/subclavius/,"Subclavius"],[/pectoralis major/,"Pectoralis major"],[/deltoid/,"Deltoid"],[/teres major/,"Teres major"],[/supraspinatus/,"Supraspinatus (rotator cuff)"],[/infraspinatus/,"Infraspinatus (rotator cuff)"],[/teres minor/,"Teres minor (rotator cuff)"],[/subscapularis/,"Subscapularis (rotator cuff)"],[/coracobrachialis/,"Coracobrachialis"],[/biceps brachii/,"Biceps brachii"],[/brachialis/,"Brachialis"],[/triceps/,"Triceps brachii"],[/anconeus/,"Anconeus"],[/brachioradialis/,"Brachioradialis"],[/pronator teres/,"Pronator teres"],[/pronator quadratus/,"Pronator quadratus"],[/supinator/,"Supinator"],[/flexor carpi radialis/,"Flexor carpi radialis"],[/palmaris longus/,"Palmaris longus"],[/flexor carpi ulnaris/,"Flexor carpi ulnaris"],[/flexor digitorum superficialis/,"Flexor digitorum superficialis"],[/flexor digitorum profundus/,"Flexor digitorum profundus"],[/flexor pollicis longus/,"Flexor pollicis longus"],[/extensor carpi radialis longus/,"Extensor carpi radialis longus"],[/extensor carpi radialis brevis/,"Extensor carpi radialis brevis"],[/extensor digitorum longus/,"Extensor digitorum longus"],[/extensor digitorum$/,"Extensor digitorum"],[/extensor digiti minimi/,"Extensor digiti minimi"],[/extensor indicis/,"Extensor indicis"],[/extensor carpi ulnaris/,"Extensor carpi ulnaris"],[/abductor pollicis longus/,"Abductor pollicis longus"],[/extensor pollicis brevis/,"Extensor pollicis brevis"],[/extensor pollicis longus/,"Extensor pollicis longus"],[/abductor pollicis brevis/,"Abductor pollicis brevis"],[/flexor pollicis brevis/,"Flexor pollicis brevis"],[/opponens pollicis/,"Opponens pollicis"],[/adductor pollicis/,"Adductor pollicis"],[/abductor digiti minimi of hand/,"Abductor digiti minimi"],[/flexor digiti minimi brevis of hand/,"Flexor digiti minimi brevis"],[/opponens digiti minimi of hand/,"Opponens digiti minimi"],[/lumbricals of hand/,"Lumbricals (4)"],[/dorsal interossei of hand/,"Dorsal interossei (4)"],[/palmar interossei of hand/,"Palmar interossei (3)"],[/sternocleidomastoid/,"Sternocleidomastoid"],[/scalenus/,"Scalenes (anterior, middle, posterior)"],[/longus (colli|capitis)/,"Longus colli and longus capitis (deep neck flexors)"],[/splenius/,"Splenius capitis and cervicis"],[/semispinalis capitis/,"Semispinalis capitis"],[/semispinalis/,null],[/iliocostalis|longissimus|spinalis/,"Erector spinae (iliocostalis, longissimus, spinalis)"],[/external oblique/,"External oblique"],[/diaphragm/,"Diaphragm"],[/intercostal/,"Intercostals (external and internal)"],[/psoas major|iliacus/,"Iliopsoas"],[/rectus femoris/,"Rectus femoris"],[/vastus/,"Vasti (lateralis, medialis, intermedius)"],[/sartorius/,"Sartorius"],[/tensor fasciae latae/,"Tensor fasciae latae"],[/gluteus maximus/,"Gluteus maximus"],[/gluteus medius/,"Gluteus medius"],[/gluteus minimus/,"Gluteus minimus"],[/piriformis|obturator|gemellus|quadratus femoris/,"Deep lateral rotators (piriformis, obturators, gemelli, quadratus femoris)"],[/adductor longus/,"Adductor longus"],[/adductor brevis/,"Adductor brevis"],[/adductor (magnus|minimus)/,"Adductor magnus"],[/gracilis/,"Gracilis"],[/pectineus/,"Pectineus"],[/biceps femoris/,"Biceps femoris (hamstring)"],[/semitendinosus/,"Semitendinosus (hamstring)"],[/semimembranosus/,"Semimembranosus (hamstring)"],[/popliteus/,"Popliteus"],[/tibialis anterior/,"Tibialis anterior"],[/extensor hallucis longus/,"Extensor hallucis longus"],[/fibularis tertius/,"Fibularis (peroneus) tertius"],[/fibularis longus/,"Fibularis (peroneus) longus"],[/fibularis brevis/,"Fibularis (peroneus) brevis"],[/gastrocnemius/,"Gastrocnemius"],[/soleus/,"Soleus"],[/plantaris/,"Plantaris"],[/tibialis posterior/,"Tibialis posterior"],[/flexor digitorum longus/,"Flexor digitorum longus"],[/flexor hallucis longus/,"Flexor hallucis longus"]];
const BM=[[/scapula/,"Scapula"],[/clavicle/,"Clavicle"],[/humerus/,"Humerus"],[/radius/,"Radius"],[/ulna/,"Ulna"],[/scaphoid|lunate|triquetral|pisiform|trapezium|trapezoid|capitate|hamate/,"Carpal bones"],[/metacarpal|phalanx of (index|middle|ring|little) finger|phalanx of thumb/,"Metacarpals and phalanges"],[/sternum|manubrium|xiphoid|\brib\b|costal cartilage/,"Sternum and ribs"],[/vertebra|sacrum|atlas|axis/,"Vertebral column"],[/hip bone/,"Pelvis (os coxae)"],[/femur/,"Femur"],[/patella/,"Patella"],[/tibia/,"Tibia"],[/fibula/,"Fibula"],[/calcaneus|talus|navicular|cuboid|cuneiform|metatarsal|toe|sesamoid/,"Tarsals and foot"],[/./,"Skull and mandible landmarks"]];
const CREG=[[/forearm/,["forearm"]],[/leg/,["leg"]],[/intervertebral/,["neck","thorax","abdomen"]],[/calcaneal|plantar/,["foot","leg"]],[/retinaculum/,["hand"]]];
const MREGION={"Scapula":["shoulder"],"Shoulder":["shoulder"],"Arm":["arm","elbow"],"Forearm":["forearm","elbow","hand"],"Hand":["hand"],"Neck":["neck"],"Trunk":["thorax","abdomen"],"Hip & Thigh":["pelvis","thigh","knee"],"Leg & Foot":["leg","knee","foot"],"Jaw":["head"]};
function sideOf(n){return /\bleft\b/.test(n)?"left":/\bright\b/.test(n)?"right":""}
function baseName(n){return n.replace(/\b(left|right)\b/g,"").replace(/\s+/g," ").trim()}
function pretty(n){const b=baseName(n).replace(/ muscle$/,"");return b.charAt(0).toUpperCase()+b.slice(1)}
function cardFor(p){const b=baseName(p.n.toLowerCase());const t=p.k==="m"?MM:p.k==="b"?BM:null;if(!t)return null;for(const q of t)if(q[0].test(b))return q[1];return null}

/* ---------- GL setup ---------- */
const canvas=$("#gl"),gl=canvas.getContext("webgl",{antialias:true,alpha:false,preserveDrawingBuffer:true});
if(!gl){$("#v3panel").innerHTML=`<div class="empty">This browser could not start WebGL, which the 3D view needs. Try Safari or Chrome with hardware acceleration on.</div>`;return}
const u32=gl.getExtension("OES_element_index_uint");
function sh(type,src){const s=gl.createShader(type);gl.shaderSource(s,src);gl.compileShader(s);if(!gl.getShaderParameter(s,gl.COMPILE_STATUS))throw new Error(gl.getShaderInfoLog(s));return s}
const prog=gl.createProgram();
gl.attachShader(prog,sh(gl.VERTEX_SHADER,`attribute vec3 aP;attribute vec3 aN;uniform mat4 uPV;uniform mat4 uV;uniform vec3 uOff;uniform float uScale;varying vec3 vN;varying vec3 vP;
void main(){vec4 w=vec4(aP*uScale+uOff,1.0);vP=(uV*w).xyz;vN=mat3(uV)*aN;gl_Position=uPV*w;}`));
gl.attachShader(prog,sh(gl.FRAGMENT_SHADER,`precision mediump float;uniform vec4 uC;uniform float uPick;varying vec3 vN;varying vec3 vP;
void main(){if(uPick>0.5){gl_FragColor=uC;return;}vec3 n=normalize(vN);vec3 v=normalize(-vP);if(dot(n,v)<0.0)n=-n;
float d=max(dot(n,normalize(vec3(0.35,0.55,0.75))),0.0);float f=max(dot(n,normalize(vec3(-0.5,0.2,0.6))),0.0);float rim=pow(1.0-max(dot(n,v),0.0),2.5);
vec3 h=normalize(normalize(vec3(0.35,0.55,0.75))+v);float sp=pow(max(dot(n,h),0.0),28.0)*0.16;
vec3 c=uC.rgb*(0.30+0.62*d+0.20*f)*(1.0-0.45*rim)+sp;gl_FragColor=vec4(c,uC.a);}`));
gl.linkProgram(prog);gl.useProgram(prog);
const U={};["uPV","uV","uOff","uScale","uC","uPick"].forEach(n=>U[n]=gl.getUniformLocation(prog,n));
const aP=gl.getAttribLocation(prog,"aP"),aN=gl.getAttribLocation(prog,"aN");gl.enableVertexAttribArray(aP);gl.enableVertexAttribArray(aN);

/* ---------- load model ---------- */
let buf;
try{buf=await(await fetch("data:application/octet-stream;base64,"+MODEL_B64)).arrayBuffer()}
catch(e){const s=atob(MODEL_B64),a=new Uint8Array(s.length);for(let i=0;i<s.length;i++)a[i]=s.charCodeAt(i);buf=a.buffer}
const mn=MODEL.min,span=MODEL.max.map((v,i)=>v-mn[i]);
const parts=MODEL.parts.map((q,i)=>{
  const[n,k,nv,nf,o1,o2,wide]=q,qz=new Uint16Array(buf,o1,nv*3),pos=new Float32Array(nv*3),nor=new Float32Array(nv*3);
  let lo=[1e9,1e9,1e9],hi=[-1e9,-1e9,-1e9];
  for(let j=0;j<nv;j++){const x=mn[0]+qz[j*3]/65535*span[0],y=mn[1]+qz[j*3+1]/65535*span[1],z=mn[2]+qz[j*3+2]/65535*span[2];
    const P=[x,z,-y];for(let a=0;a<3;a++){pos[j*3+a]=P[a];if(P[a]<lo[a])lo[a]=P[a];if(P[a]>hi[a])hi[a]=P[a]}}
  const idx=wide?new Uint32Array(buf,o2,nf*3):new Uint16Array(buf,o2,nf*3);
  for(let f=0;f<nf*3;f+=3){const a=idx[f]*3,b=idx[f+1]*3,c=idx[f+2]*3;
    const ux=pos[b]-pos[a],uy=pos[b+1]-pos[a+1],uz=pos[b+2]-pos[a+2],vx=pos[c]-pos[a],vy=pos[c+1]-pos[a+1],vz=pos[c+2]-pos[a+2];
    const nx=uy*vz-uz*vy,ny=uz*vx-ux*vz,nz=ux*vy-uy*vx;for(const t of[a,b,c]){nor[t]+=nx;nor[t+1]+=ny;nor[t+2]+=nz}}
  for(let j=0;j<nv*3;j+=3){const l=Math.hypot(nor[j],nor[j+1],nor[j+2])||1;nor[j]/=l;nor[j+1]/=l;nor[j+2]/=l}
  const vb=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,vb);gl.bufferData(gl.ARRAY_BUFFER,pos,gl.STATIC_DRAW);
  const nb=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,nb);gl.bufferData(gl.ARRAY_BUFFER,nor,gl.STATIC_DRAW);
  const ib=gl.createBuffer();gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,ib);gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,idx,gl.STATIC_DRAW);
  let h=0;for(let c=0;c<n.length;c++)h=(h*31+n.charCodeAt(c))%997;const t=(h/997-.5);
  const col=k==="m"?[.70+t*.12,.26+t*.07,.22+t*.05]:k==="b"?[.92+t*.03,.88+t*.03,.77+t*.04]:/disk/.test(n)?[.62,.74,.80]:[.84,.82,.74];
  const p={i,n,k,vb,nb,ib,cnt:nf*3,type:wide?gl.UNSIGNED_INT:gl.UNSIGNED_SHORT,col,c:[(lo[0]+hi[0])/2,(lo[1]+hi[1])/2,(lo[2]+hi[2])/2],r:Math.hypot(hi[0]-lo[0],hi[1]-lo[1],hi[2]-lo[2])/2,hidden:false,side:sideOf(n)};
  p.card=cardFor(p);p.label=pretty(n);return p});
/* joint marker sphere */
const SPH=(()=>{const P=[],I=[],A=10,B=14;for(let a=0;a<=A;a++)for(let b=0;b<=B;b++){const t=a/A*Math.PI,f=b/B*2*Math.PI;P.push(Math.sin(t)*Math.cos(f),Math.cos(t),Math.sin(t)*Math.sin(f))}
  for(let a=0;a<A;a++)for(let b=0;b<B;b++){const p=a*(B+1)+b;I.push(p,p+B+1,p+1,p+1,p+B+1,p+B+2)}
  const vb=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,vb);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(P),gl.STATIC_DRAW);
  const ib=gl.createBuffer();gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,ib);gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,new Uint16Array(I),gl.STATIC_DRAW);return{vb,ib,cnt:I.length}})();
const joints=MODEL.joints.map((j,i)=>({i,n:j[0],c:[j[1],j[3],-j[2]],r:/carp|phalang|Wrist|radioulnar|tarsal|Subtalar|Atlant|Temporo|Acromio|Sterno/i.test(j[0])?5:8,side:j[1]>2?"left":j[1]<-2?"right":""}));

/* ---------- camera ---------- */
const HOME={t:[0,(mn[2]+MODEL.max[2])/2,-(mn[1]+MODEL.max[1])/2],d:4300,yaw:0,pitch:.05};
const cam={t:HOME.t.slice(),d:HOME.d,yaw:0,pitch:.05};
function persp(fy,as,n,f){const t=1/Math.tan(fy/2);return[t/as,0,0,0,0,t,0,0,0,0,(f+n)/(n-f),-1,0,0,2*f*n/(n-f),0]}
function mul(a,b){const o=new Array(16);for(let c=0;c<4;c++)for(let r=0;r<4;r++)o[c*4+r]=a[r]*b[c*4]+a[4+r]*b[c*4+1]+a[8+r]*b[c*4+2]+a[12+r]*b[c*4+3];return o}
function view(){const cp=Math.cos(cam.pitch),e=[cam.t[0]+cam.d*Math.sin(cam.yaw)*cp,cam.t[1]+cam.d*Math.sin(cam.pitch),cam.t[2]+cam.d*Math.cos(cam.yaw)*cp];
  let z=[e[0]-cam.t[0],e[1]-cam.t[1],e[2]-cam.t[2]];const zl=Math.hypot(...z);z=z.map(v=>v/zl);
  let x=[z[2],0,-z[0]];const xl=Math.hypot(...x)||1;x=x.map(v=>v/xl);const y=[z[1]*x[2]-z[2]*x[1],z[2]*x[0]-z[0]*x[2],z[0]*x[1]-z[1]*x[0]];
  return{m:[x[0],y[0],z[0],0,x[1],y[1],z[1],0,x[2],y[2],z[2],0,-(x[0]*e[0]+x[1]*e[1]+x[2]*e[2]),-(y[0]*e[0]+y[1]*e[1]+y[2]*e[2]),-(z[0]*e[0]+z[1]*e[1]+z[2]*e[2]),1],x,y}}

/* ---------- state + drawing ---------- */
const L={m:true,b:true,c:true,j:true};let fade=false,sel=null,hover=null,dirty=true,selSet=new Set();
let fbo=null,fw=0,fh=0;
function resize(){const r=canvas.getBoundingClientRect(),dpr=Math.min(2,window.devicePixelRatio||1),w=Math.max(2,Math.round(r.width*dpr)),h=Math.max(2,Math.round(r.height*dpr));
  if(canvas.width!==w||canvas.height!==h){canvas.width=w;canvas.height=h;dirty=true}}
function pickTarget(){if(fbo&&fw===canvas.width&&fh===canvas.height)return;fw=canvas.width;fh=canvas.height;
  const tex=gl.createTexture();gl.bindTexture(gl.TEXTURE_2D,tex);gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,fw,fh,0,gl.RGBA,gl.UNSIGNED_BYTE,null);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.NEAREST);
  const rb=gl.createRenderbuffer();gl.bindRenderbuffer(gl.RENDERBUFFER,rb);gl.renderbufferStorage(gl.RENDERBUFFER,gl.DEPTH_COMPONENT16,fw,fh);
  fbo=gl.createFramebuffer();gl.bindFramebuffer(gl.FRAMEBUFFER,fbo);gl.framebufferTexture2D(gl.FRAMEBUFFER,gl.COLOR_ATTACHMENT0,gl.TEXTURE_2D,tex,0);gl.framebufferRenderbuffer(gl.FRAMEBUFFER,gl.DEPTH_ATTACHMENT,gl.RENDERBUFFER,rb);gl.bindFramebuffer(gl.FRAMEBUFFER,null)}
const shown=p=>L[p.k]&&!p.hidden;
function drawPart(p,c){gl.uniform3f(U.uOff,0,0,0);gl.uniform1f(U.uScale,1);gl.uniform4fv(U.uC,c);
  gl.bindBuffer(gl.ARRAY_BUFFER,p.vb);gl.vertexAttribPointer(aP,3,gl.FLOAT,false,0,0);gl.bindBuffer(gl.ARRAY_BUFFER,p.nb);gl.vertexAttribPointer(aN,3,gl.FLOAT,false,0,0);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,p.ib);gl.drawElements(gl.TRIANGLES,p.cnt,p.type,0)}
function drawJoint(j,c){gl.uniform3fv(U.uOff,j.c);gl.uniform1f(U.uScale,j.r);gl.uniform4fv(U.uC,c);
  gl.bindBuffer(gl.ARRAY_BUFFER,SPH.vb);gl.vertexAttribPointer(aP,3,gl.FLOAT,false,0,0);gl.vertexAttribPointer(aN,3,gl.FLOAT,false,0,0);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,SPH.ib);gl.drawElements(gl.TRIANGLES,SPH.cnt,gl.UNSIGNED_SHORT,0)}
const idCol=n=>[(n&255)/255,((n>>8)&255)/255,((n>>16)&255)/255,1];
function render(pick){
  const V=view(),PV=mul(persp(.5,canvas.width/canvas.height,cam.d*.05,cam.d*4+4000),V.m);
  gl.bindFramebuffer(gl.FRAMEBUFFER,pick?fbo:null);gl.viewport(0,0,canvas.width,canvas.height);
  const dark=matchMedia("(prefers-color-scheme:dark)").matches;
  if(pick)gl.clearColor(0,0,0,1);else dark?gl.clearColor(.075,.09,.1,1):gl.clearColor(.965,.96,.945,1);
  gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);gl.enable(gl.DEPTH_TEST);gl.depthFunc(gl.LEQUAL);gl.disable(gl.BLEND);gl.depthMask(true);
  gl.uniformMatrix4fv(U.uPV,false,new Float32Array(PV));gl.uniformMatrix4fv(U.uV,false,new Float32Array(V.m));gl.uniform1f(U.uPick,pick?1:0);
  const selP=sel&&sel.t==="p"?sel.o:null,hovP=hover&&hover.t==="p"?hover.o:null,later=[];
  for(const p of parts){if(!shown(p))continue;
    if(fade&&p.k==="m"&&!selSet.has(p)){later.push(p);continue}
    drawPart(p,pick?idCol(p.i+1):p===selP?[.16,.47,.96,1]:selSet.has(p)?[.36,.60,.98,1]:p===hovP?[Math.min(1,p.col[0]*1.18+.06),Math.min(1,p.col[1]*1.18+.06),Math.min(1,p.col[2]*1.18+.06),1]:[...p.col,1])}
  if(!pick&&later.length){gl.enable(gl.BLEND);gl.blendFunc(gl.SRC_ALPHA,gl.ONE_MINUS_SRC_ALPHA);gl.depthMask(false);for(const p of later)drawPart(p,[...p.col,.13]);gl.depthMask(true);gl.disable(gl.BLEND)}
  if(L.j){gl.depthFunc(gl.ALWAYS);for(const j of joints)drawJoint(j,pick?idCol(100000+j.i):(sel&&sel.t==="j"&&sel.o===j)||(hover&&hover.t==="j"&&hover.o===j)?[.98,.66,.1,1]:[.06,.5,.52,1]);gl.depthFunc(gl.LEQUAL)}
}
function pickAt(cx,cy){pickTarget();render(true);const r=canvas.getBoundingClientRect(),s=canvas.width/r.width,px=new Uint8Array(4);
  gl.readPixels(Math.round((cx-r.left)*s),canvas.height-1-Math.round((cy-r.top)*s),1,1,gl.RGBA,gl.UNSIGNED_BYTE,px);gl.bindFramebuffer(gl.FRAMEBUFFER,null);dirty=true;
  const id=px[0]|(px[1]<<8)|(px[2]<<16);if(!id)return null;return id>=100000?{t:"j",o:joints[id-100000]}:{t:"p",o:parts[id-1]}}
function loop(){resize();if(dirty){dirty=false;render(false)}requestAnimationFrame(loop)}

/* ---------- info panel ---------- */
const overlap=(a,b)=>a.some(r=>b.includes(r));
const jointBody=j=>row("Common name",COMMON[j[0]])+row("In plain words",PLAIN_J[j[0]])+row("Type",j[2])+row("Movements",j[3])+row("Bones",j[4]);
const ligBody=l=>row("Common name",COMMON[l[0]])+row("In plain words",PLAIN_L[l[0]])+row("Attachments",l[2])+row("Role",l[3]);
function areaLists(regs,skipJoint){let h="";if(!regs||!regs.length)return h;
  const js=JOINTS.filter(j=>overlap(j[1],regs)&&j[0]!==skipJoint),ls=LIG.filter(l=>overlap(l[1],regs));
  if(js.length)h+=`<h3 class="ph">Joints in this area (${js.length})</h3>`+js.map(j=>item(j[0],COMMON[j[0]]||"",jointBody(j))).join("");
  if(ls.length)h+=`<h3 class="ph">Ligaments in this area (${ls.length})</h3>`+ls.map(l=>item(l[0],COMMON[l[0]]||"",ligBody(l))).join("");return h}
function panel(){
  const el=$("#v3panel");
  if(!sel){el.innerHTML=`<div class="empty"><p><b>Click any part of the body</b></p><p>Drag to rotate. Scroll or pinch to zoom. Hold Shift and drag (or use two fingers on a touch screen) to move. Double-click a part to zoom in on it.</p><p>Click a muscle and press <b>H</b> (or the Hide button) to peel it away and see what is underneath. The teal dots are joints.</p></div>`;return}
  let h="";
  if(sel.t==="j"){const j=JOINTS.find(x=>x[0]===sel.o.n);
    h+=`<h3 class="rt">${esc(j[0])}</h3><p class="sub">Joint${sel.o.side?" · "+sel.o.side+" side":""}</p>`+item(j[0],"joint",jointBody(j),true)+areaLists(j[1],j[0]);
  }else{const p=sel.o,kind=p.k==="m"?"Muscle":p.k==="b"?"Bone":"Connective tissue";
    h+=`<h3 class="rt">${esc(p.label)}</h3><p class="sub">${kind}${p.side?" · "+p.side+" side":""}</p><div class="bar" style="margin-bottom:12px"><button class="btn" id="hideSel">Hide this <kbd>H</kbd></button><button class="btn" id="focusSel">Zoom to it</button></div>`;
    let regs=null;
    if(p.k==="m"){const x=p.card&&MBY[p.card];
      if(x){regs=MREGION[x.r];h+=item(x.n,x.r,row("Common name",COMMON[x.n])+row("In plain words",PLAIN_MUS[x.n])+row("Location",x.l)+row("Origin",x.o)+row("Insertion",x.i)+row("Action",x.a)+row("Innervation",x.v),true)}
      else h+=`<div class="note">This muscle is in the 3D model but is not one of the study cards, so there are no card details for it.</div>`}
    else if(p.k==="b"){const b=BONES.find(x=>x.n===p.card);
      if(b){regs=BREG[b.n];h+=item(b.n,COMMON[b.n]||"",row("In plain words",PLAIN_B[b.n])+row("Location",b.l)+`<p style="margin:0 0 10px;color:var(--mute)">${esc(b.intro)}</p>`+b.L.map(l=>row(esc(l[0]),l[1])).join(""),true)}}
    else{const q=CREG.find(c=>c[0].test(p.n));regs=q?q[1]:null;h+=`<div class="note">The 3D model includes only a few connective structures (discs, interosseous membranes, the Achilles tendon). Most ligaments are listed below by area rather than drawn.</div>`}
    h+=areaLists(regs);}
  el.innerHTML=h;
  el.querySelectorAll(".hd").forEach(x=>x.onclick=()=>x.parentElement.classList.toggle("open"));
  if($("#hideSel"))$("#hideSel").onclick=hideSel;if($("#focusSel"))$("#focusSel").onclick=()=>focus(sel.o);
}
function select(s){sel=s;selSet=new Set();if(s&&s.t==="p"){const o=s.o;selSet.add(o);if(o.k==="m"&&o.card)parts.forEach(p=>{if(p.k==="m"&&p.card===o.card&&p.side===o.side)selSet.add(p)})}dirty=true;panel()}
function hideSel(){if(sel&&sel.t==="p"){selSet.forEach(p=>p.hidden=true);select(null);hiddenCount()}}
function hiddenCount(){const n=parts.filter(p=>p.hidden).length;$("#showAll").textContent=n?`Show all (${n} hidden)`:"Show all";$("#showAll").disabled=!n}
function focus(o){cam.t=o.c.slice();cam.d=Math.max(260,(o.r||40)*5.2);dirty=true}

/* ---------- input ---------- */
let drag=null;const tip=$("#tip");
canvas.addEventListener("contextmenu",e=>e.preventDefault());
const pts=new Map();let pinch=null;const pd=()=>{const a=[...pts.values()];return{d:Math.hypot(a[0].x-a[1].x,a[0].y-a[1].y)||1,x:(a[0].x+a[1].x)/2,y:(a[0].y+a[1].y)/2}};
canvas.addEventListener("pointercancel",e=>{pts.delete(e.pointerId);pinch=null;drag=null});
canvas.addEventListener("pointerdown",e=>{canvas.setPointerCapture(e.pointerId);pts.set(e.pointerId,{x:e.clientX,y:e.clientY});if(pts.size===2){drag=null;pinch=pd();return}drag={x:e.clientX,y:e.clientY,sx:e.clientX,sy:e.clientY,pan:e.shiftKey||e.button===2,moved:false};tip.style.display="none"});
canvas.addEventListener("pointermove",e=>{if(pts.has(e.pointerId))pts.set(e.pointerId,{x:e.clientX,y:e.clientY});
  if(pinch&&pts.size===2){const n=pd(),V=view(),k=cam.d*.00075;cam.d=Math.max(120,Math.min(9000,cam.d*pinch.d/n.d));for(let a=0;a<3;a++)cam.t[a]+=(-(n.x-pinch.x)*V.x[a]+(n.y-pinch.y)*V.y[a])*k;pinch=n;dirty=true;return}
  if(e.pointerType==="touch"&&!drag)return;
  if(drag){const dx=e.clientX-drag.x,dy=e.clientY-drag.y;drag.x=e.clientX;drag.y=e.clientY;if(Math.hypot(e.clientX-drag.sx,e.clientY-drag.sy)>4)drag.moved=true;
    if(drag.pan){const V=view(),k=cam.d*.00075;for(let a=0;a<3;a++)cam.t[a]+=(-dx*V.x[a]+dy*V.y[a])*k}
    else{cam.yaw-=dx*.008;cam.pitch=Math.max(-1.5,Math.min(1.5,cam.pitch+dy*.008))}dirty=true;return}
  if(hoverWait)return;hoverWait=true;const cx=e.clientX,cy=e.clientY;requestAnimationFrame(()=>{hoverWait=false;const h=pickAt(cx,cy);
    if((h&&h.o)!==(hover&&hover.o)){hover=h;dirty=true}
    if(h){tip.textContent=h.t==="j"?h.o.n:h.o.label+(h.o.side?" ("+h.o.side+")":"");tip.style.display="block";const r=canvas.getBoundingClientRect();tip.style.left=(cx-r.left+14)+"px";tip.style.top=(cy-r.top+14)+"px"}else tip.style.display="none"})});
let hoverWait=false;
canvas.addEventListener("pointerup",e=>{pts.delete(e.pointerId);if(pinch){pinch=null;drag=null;return}const d=drag;drag=null;if(d&&!d.moved)select(pickAt(e.clientX,e.clientY))});
canvas.addEventListener("pointerleave",()=>{tip.style.display="none";if(hover){hover=null;dirty=true}});
canvas.addEventListener("dblclick",e=>{const h=pickAt(e.clientX,e.clientY);if(h){select(h);focus(h.o)}});
canvas.addEventListener("wheel",e=>{e.preventDefault();cam.d=Math.max(120,Math.min(9000,cam.d*Math.exp(e.deltaY*(e.ctrlKey?.012:.0016))));dirty=true},{passive:false});
document.addEventListener("keydown",e=>{if(/INPUT|SELECT|TEXTAREA/.test(document.activeElement.tagName)||e.metaKey||e.ctrlKey||S.tab!=="v3")return;
  if(e.key==="h"||e.key==="H")hideSel();else if(e.key==="Escape")select(null)});
window.addEventListener("resize",()=>{dirty=true});
$$("[data-layer]").forEach(b=>b.onclick=()=>{const k=b.dataset.layer;L[k]=!L[k];b.classList.toggle("on",L[k]);dirty=true});
$("#fade").onclick=e=>{fade=!fade;e.currentTarget.classList.toggle("on",fade);dirty=true};
$$("[data-view]").forEach(b=>b.onclick=()=>{const v=b.dataset.view;if(v==="home"){cam.t=HOME.t.slice();cam.d=HOME.d}cam.yaw={front:0,home:0,back:Math.PI,left:Math.PI/2,right:-Math.PI/2}[v];cam.pitch=.05;dirty=true});
$("#showAll").onclick=()=>{parts.forEach(p=>p.hidden=false);hiddenCount();dirty=true};
const names=[...new Set(parts.map(p=>p.label))].sort();$("#names").innerHTML=names.map(n=>`<option value="${esc(n)}">`).join("");
$("#find").addEventListener("change",e=>{const q=e.target.value.trim().toLowerCase();if(!q)return;
  const p=parts.find(p=>p.label.toLowerCase()===q&&p.side!=="right")||parts.find(p=>p.label.toLowerCase().includes(q)&&p.side!=="right")||parts.find(p=>p.label.toLowerCase().includes(q));
  if(p){p.hidden=false;if(!L[p.k]){L[p.k]=true;$(`[data-layer="${p.k}"]`).classList.add("on")}select({t:"p",o:p});focus(p);hiddenCount()}});
window.V3D={panel,get sel(){return sel},parts,joints,cam,select,focus,L,render:()=>{dirty=true},pickAt,setFade(v){fade=v;dirty=true}};
$("#loading").style.display="none";hiddenCount();panel();loop();
})().catch(e=>{document.querySelector("#v3panel").innerHTML='<div class="empty">The 3D view failed to start: '+String(e.message||e)+'</div>'});
};
