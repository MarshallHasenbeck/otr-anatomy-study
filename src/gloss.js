/* Tap-to-define glossary: jargon inside card text gets a dotted underline; tapping or hovering shows a plain definition. */
const GLOSS={
"thenar":"The fleshy pad at the base of the thumb, on the palm side. It holds the small muscles that move the thumb.",
"hypothenar":"The fleshy pad on the little finger side of the palm. It holds the small muscles that move the little finger.",
"palmar":"On the palm side of the hand.",
"volar":"On the palm side of the hand or wrist (same as palmar).",
"dorsal":"On the back of the hand, or the top of the foot.",
"plantar":"On the sole of the foot.",
"proximal":"Closer to the trunk. On a limb, the end nearer the shoulder or hip.",
"distal":"Farther from the trunk. On a limb, the end nearer the fingers or toes.",
"medial":"Toward the midline of the body.",
"lateral":"Away from the midline of the body, toward the side.",
"anterior":"Toward the front of the body.",
"posterior":"Toward the back of the body.",
"superior":"Above, toward the head.",
"inferior":"Below, toward the feet.",
"radial":"On the thumb side of the forearm and hand.",
"ulnar":"On the little finger side of the forearm and hand.",
"orthosis":"A splint or brace: a device worn to support, rest, or position a body part.",
"splint":"A device worn to support, rest, or position a body part (also called an orthosis).",
"subluxation":"A partial dislocation: the joint surfaces have slipped but are still partly in contact.",
"tenodesis":"The natural hand action where lifting the wrist makes the fingers curl closed, and dropping the wrist lets them open.",
"atrophy":"Wasting: a muscle getting smaller and weaker from lack of nerve supply or use.",
"palsy":"Weakness or paralysis of muscles from a nerve problem.",
"lesion":"An area of injury or damage.",
"valgus":"A force or angle that pushes the far end of a limb outward, away from the midline (knock-kneed direction).",
"varus":"A force or angle that pushes the far end of a limb inward, toward the midline (bow-legged direction).",
"aponeurosis":"A broad, flat sheet of tendon.",
"retinaculum":"A band of tough tissue that straps tendons down at the wrist or ankle.",
"contracture":"A permanent tightening of muscle, tendon, or other soft tissue that stops a joint from moving fully.",
"avulsion":"When a tendon or ligament pulls a small piece of bone off.",
"sesamoid":"A small bone that sits inside a tendon, like the kneecap.",
"synovial":"The freely moving type of joint, with a fluid filled capsule.",
"condyloid":"A joint that moves in two directions (bend and straighten, side to side) but does not spin.",
"MCP":"Metacarpophalangeal joint: the big knuckle where a finger joins the hand.",
"MCPs":"Metacarpophalangeal joints: the big knuckles where the fingers join the hand.",
"PIP":"Proximal interphalangeal joint: the middle knuckle of a finger.",
"DIP":"Distal interphalangeal joint: the last knuckle of a finger, nearest the fingertip.",
"CMC":"Carpometacarpal joint: where a hand bone meets the wrist bones. The thumb's CMC joint is at its base.",
"TMJ":"Temporomandibular joint: the jaw joint, just in front of the ear.",
"ROM":"Range of motion: how far a joint can move.",
"ADLs":"Activities of daily living: everyday self care such as dressing, bathing, eating, and toileting.",
"Phalen's":"Phalen's test: holding the wrists fully bent for up to a minute. Tingling in the thumb and first fingers suggests carpal tunnel syndrome.",
"Tinel's":"Tinel's sign: tapping over a nerve. Tingling shooting into the area the nerve supplies suggests the nerve is irritated there.",
"Finkelstein's":"Finkelstein's test: tucking the thumb into the fist and tilting the wrist toward the little finger. Sharp pain at the thumb side of the wrist suggests De Quervain's.",
"opposition":"Bringing the pad of the thumb across to touch the pad of a finger.",
"pronation":"Turning the forearm so the palm faces down.",
"supination":"Turning the forearm so the palm faces up.",
"dorsiflexion":"Pulling the foot up toward the shin.",
"plantarflexion":"Pointing the foot down, away from the shin.",
"inversion":"Turning the sole of the foot inward.",
"eversion":"Turning the sole of the foot outward.",
"eccentric":"A muscle working while it lengthens, like slowly lowering a weight.",
"intrinsic":"Small muscles that start and end inside the hand (or foot) itself.",
"extrinsic":"Muscles that sit in the forearm (or leg) and work the hand (or foot) through long tendons.",
"interossei":"The small muscles between the long bones of the hand that spread the fingers and bring them together.",
"lumbricals":"Four small muscles in the palm that bend the big knuckles while keeping the fingers straight.",
"labrum":"A rim of cartilage that deepens a joint socket.",
"meniscus":"A C shaped cartilage cushion in the knee.",
"menisci":"The two C shaped cartilage cushions in the knee.",
"tubercle":"A small rounded bump on a bone where something attaches.",
"tuberosity":"A larger roughened bump on a bone where a muscle or ligament attaches.",
"epicondyle":"A bump on the side of a bone just above a joint, where muscles and ligaments attach.",
"condyle":"A rounded knob at the end of a bone that forms part of a joint.",
"fossa":"A shallow hollow in a bone.",
"foramen":"A hole in a bone that nerves or vessels pass through.",
"ventral rami":"The front branches of the spinal nerves, which supply the limbs and the front and sides of the trunk.",
"dorsal rami":"The back branches of the spinal nerves, which supply the deep back muscles and the skin over them.",
"brachial plexus":"The network of nerves from the neck (C5 to T1) that supplies the arm.",
"dermatome":"The strip of skin that gets its feeling from one spinal nerve."
};
const GLRE=new RegExp("(^|[^A-Za-z])("+Object.keys(GLOSS).sort((a,b)=>b.length-a.length).map(k=>k.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")).join("|")+")(?![A-Za-z])","gi");
const GLKEY={};Object.keys(GLOSS).forEach(k=>GLKEY[k.toLowerCase()]=k);
/* escape text, then mark the first use of each glossary term */
function gl(t){const seen={};return String(t).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c])).replace(GLRE,(m,pre,w)=>{
  const exact=GLOSS[w]?w:null,k=exact||(/^[A-Z]{2,}/.test(w)?null:GLKEY[w.toLowerCase()]);
  if(!k||/^[A-Z]{2,}/.test(k)&&k!==w||seen[k])return m;seen[k]=1;
  return pre+'<span class="g" tabindex="0" data-g="'+k.replace(/"/g,"&quot;")+'">'+w+'</span>'})}
(function(){
  const tip=document.createElement("div");tip.id="gtip";document.addEventListener("DOMContentLoaded",()=>document.body.appendChild(tip));
  if(document.body)document.body.appendChild(tip);
  function showTip(g){const k=g.dataset.g;tip.innerHTML="<b>"+k+"</b><br>"+GLOSS[k];tip.style.display="block";
    const r=g.getBoundingClientRect(),w=tip.offsetWidth,h=tip.offsetHeight;
    tip.style.left=Math.max(8,Math.min(window.innerWidth-w-8,r.left))+"px";
    tip.style.top=(r.bottom+h+12>window.innerHeight?Math.max(8,r.top-h-8):r.bottom+8)+"px"}
  document.addEventListener("click",e=>{const g=e.target.closest&&e.target.closest(".g");
    if(g){e.stopPropagation();e.preventDefault();if(tip.style.display==="block"&&tip.dataset.for===g.dataset.g){tip.style.display="none";tip.dataset.for=""}else{showTip(g);tip.dataset.for=g.dataset.g}}
    else{tip.style.display="none";tip.dataset.for=""}},true);
  document.addEventListener("mouseover",e=>{const g=e.target.closest&&e.target.closest(".g");if(g&&!tip.dataset.for)showTip(g)});
  document.addEventListener("mouseout",e=>{const g=e.target.closest&&e.target.closest(".g");if(g&&!tip.dataset.for)tip.style.display="none"});
  document.addEventListener("scroll",()=>{tip.style.display="none";tip.dataset.for=""},true);
})();
