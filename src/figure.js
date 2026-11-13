/* ============================ FIGURE ============================
   Hand-drawn anatomical figure, 400 x 860 units, midline at x=200.
   Only one half is authored (x >= 200) and mirrored. Proportions: ~7.5 heads.
   Landmarks: chin 130, acromion 166, nipple 241, navel 348, pubic symphysis 446,
   knee joint 610, ankle 800, sole 842.
*/
const FIG=(()=>{
const SIL="M200,20 C224,20 238,40 238,66 C238,84 234,100 226,112 L224,134 C232,146 262,152 288,165 C302,170 310,184 310,206 C310,224 311,236 312,250 C314,280 318,310 324,335 C334,352 339,372 341,398 C343,415 345,432 346,446 L326,446 C320,425 310,395 302,370 C297,355 294,345 293,334 C288,310 284,280 281,256 C279,244 277,234 275,228 C274,240 273,252 272,264 C270,290 264,315 262,335 C262,350 264,362 268,374 C276,392 282,410 283,432 C285,455 284,480 282,505 C278,545 270,580 263,606 C262,616 263,624 265,634 C270,655 268,690 262,730 C257,760 252,785 250,800 C254,815 258,828 256,838 C250,846 228,846 222,840 C220,828 222,814 226,800 C226,780 226,760 225,740 C222,715 218,690 219,662 C220,645 221,630 220,612 C218,590 216,575 214,560 C210,530 205,500 203,470 C202,462 201,456 200,452";
const HT="translate(336,446) rotate(-12)";
const MIR="translate(400,0) scale(-1,1)";
const rr=(x,y,w,h,r)=>`M${x+r},${y} L${x+w-r},${y} C${x+w},${y} ${x+w},${y} ${x+w},${y+r} L${x+w},${y+h-r} C${x+w},${y+h} ${x+w},${y+h} ${x+w-r},${y+h} L${x+r},${y+h} C${x},${y+h} ${x},${y+h} ${x},${y+h-r} L${x},${y+r} C${x},${y} ${x},${y} ${x+r},${y}Z`;
const HAND=["M-10,0 L10,0 C14,6 16,14 16,24 L16,44 L-13,42 L-13,20 C-13,10 -12,4 -10,0Z",rr(9,38,7,44,3.4),rr(1.7,38,7,50,3.4),rr(-5.6,38,7,46,3.4),rr(-13,36,6.8,36,3.3),"M11,4 C18,8 24,20 28,34 C30,40 29,46 26,47 C22,48 20,44 18,38 C16,30 14,24 12,20Z"];

/* ---- realism helpers: ears, female/male proportions, fiber directions ---- */
const EAR="M236,64 C243,61 246,70 244,81 C242,90 238,93 234,90Z";
let SEX="f";
/* width scale by height (y): narrower shoulders and rib cage with a wider pelvis for the female figure, the reverse for the male */
const PROF={f:[[20,.96],[130,.96],[166,.9],[240,.91],[335,.9],[385,1.02],[430,1.07],[480,1.06],[606,1],[860,.98]],m:[[20,1],[130,1],[166,1.05],[240,1.05],[335,1.01],[430,.97],[480,.98],[606,1],[860,1]]};
const ARMB=[[228,275],[260,277],[335,278],[380,290],[446,305],[560,300]];
function lerp(t,y){if(y<=t[0][0])return t[0][1];for(let i=1;i<t.length;i++)if(y<=t[i][0]){const a=t[i-1],b=t[i];return a[1]+(b[1]-a[1])*(y-a[0])/(b[0]-a[0])}return t[t.length-1][1]}
function wx(x,y){const arm=y>228&&y<560&&x>lerp(ARMB,y);return +(200+(x-200)*lerp(PROF[SEX],arm?228:y)).toFixed(1)}
const WC={};
function W(d){const k=SEX+d;return WC[k]||(WC[k]=d.replace(/(-?\d+(?:\.\d+)?),(-?\d+(?:\.\d+)?)/g,(m,x,y)=>wx(+x,+y)+","+y))}
const ht=()=>`translate(${wx(336,446)},446) rotate(-12)`;
/* fiber angle per shape, degrees from vertical on the authored (right-hand) half */
const FIB={a_lat:20,a_serr:55,a_eo:40,a_ra:0,a_pec:72,a_trap:-55,a_scm:25,a_tri:-6,a_cb:-6,a_brach:-6,a_bic:-6,a_delt:-14,a_fcu:-18,a_pl:-20,a_fcr:-22,a_pt:-42,a_brd:-12,
a_gmed:-15,a_tfl:-10,a_vl:14,a_vm:-32,a_rf:4,a_am:-20,a_grac:-5,a_al:-30,a_pect:-32,a_ilio:-14,a_sart:20,a_sol:0,a_gast:0,a_fib:6,a_edl:4,a_ta:4,a_temp:10,a_mass:14,
p_es:0,p_eo:30,p_lat:48,p_rhom:-50,p_infra:68,p_tmin:62,p_tmaj:58,p_spl:-20,p_trap:78,p_tri:-6,p_delt:-30,p_anc:20,p_fcu:-14,p_ecu:-14,p_ed:-13,p_ecr:-12,p_brd:-12,p_apl:-35,
p_gmed:-22,p_vl:8,p_gmax:-48,p_grac:-5,p_am:-8,p_sm:-3,p_st:-3,p_bf:-4,p_sol:0,p_fib:8,p_gast:0};

/* shapes: id, label, path, tone, opts {k: kind m|b|t, hand, note} — order = paint order */
const SH=[];const S={};
function s(id,label,d,t,o){const x=Object.assign({id,v:id[0],label,d,t:t||0,k:"m"},o||{});SH.push(x);S[id]=x}

/* ---------- ANTERIOR ---------- */
s("a_lat","Latissimus dorsi","M270,230 L282,230 L278,300 L268,332 L264,300 C268,280 270,255 270,230Z",1);
s("a_serr","Serratus anterior","M266,244 L270,250 L268,300 L262,316 L255,304 L262,297 L252,288 L261,281 L250,270 L260,264 L252,254Z",2);
s("a_eo","External oblique","M228,266 C240,268 250,280 256,300 L266,318 C262,340 262,356 268,374 C262,392 246,412 226,432 L214,440 C226,410 232,360 230,300 Z",0);
s("a_ra","Rectus abdominis","M202,258 L226,262 C230,290 230,340 226,380 C222,410 212,436 203,444 L202,444 Z",1);
s("a_pec","Pectoralis major","M206,170 L252,168 C266,176 280,196 292,216 L290,228 C276,244 250,262 222,262 C212,262 205,256 204,250 Z",0);
s("a_trap","Trapezius (upper fibers)","M233,114 L233,136 C245,146 270,156 292,166 L262,167 C246,165 236,161 228,159 C231,145 233,130 233,114Z",1);
s("a_scm","Sternocleidomastoid","M226,106 L234,111 C233,134 227,150 225,161 L203,163 C208,148 220,130 226,106Z",2);
s("a_clav","Clavicle","M206,163 C222,158 240,168 258,165 C270,163 280,161 290,163 L290,169 C280,167 270,169 258,171 C240,174 222,164 206,169Z",0,{k:"b",note:"Bone. Easy to palpate along its whole length. Pectoralis major, deltoid, trapezius, and sternocleidomastoid attach to it."});
s("a_tri","Triceps brachii (medial side)","M281,258 C284,288 289,312 293,332 L299,326 C293,304 289,284 287,262Z",2);
s("a_cb","Coracobrachialis","M277,228 L288,226 C286,244 286,258 289,272 L284,270 C280,256 278,240 277,228Z",1);
s("a_brach","Brachialis","M305,262 C312,280 317,300 320,324 L312,332 C312,306 310,282 305,262Z M288,290 C290,305 294,318 299,330 L302,326 C297,314 293,302 291,292Z",2);
s("a_bic","Biceps brachii","M286,226 C282,250 286,290 300,326 L310,330 C314,300 312,260 304,236 C298,228 292,224 286,226Z",0);
s("a_delt","Deltoid","M252,165 C266,160 282,160 292,164 C304,170 312,186 312,210 C312,232 308,250 303,264 C298,254 292,236 286,224 C278,204 266,184 252,165Z",1);
s("a_fcu","Flexor carpi ulnaris","M292,336 L298,350 C304,372 314,400 320,418 C324,430 327,440 330,447 L322,447 C314,425 304,395 298,372 C294,358 291,346 292,336Z",1);
s("a_pl","Palmaris longus","M297,346 C306,366 316,390 323,408 C327,422 331,436 334,447 L329,447 C326,434 321,418 316,406 C308,386 300,366 296,352Z",2);
s("a_fcr","Flexor carpi radialis","M298,340 C308,356 321,378 328,394 C333,410 337,430 340,447 L334,447 C330,427 325,407 319,394 C310,376 302,358 297,346Z",0);
s("a_pt","Pronator teres","M296,332 L305,328 C313,343 323,363 331,382 L326,391 C316,373 305,353 296,340Z",1);
s("a_brd","Brachioradialis","M313,308 L323,303 C333,330 341,360 343,390 C345,410 346,428 347,444 L340,444 C338,415 334,385 328,360 C322,340 316,324 313,308Z",2);
s("a_then","Thenar muscles","M3,3 C10,2 15,8 16,16 C17,24 14,31 9,32 C5,30 2,22 2,14Z",0,{hand:1});
s("a_hypo","Hypothenar muscles","M-3,5 C-9,4 -13,10 -13,20 C-13,28 -12,34 -9,36 C-5,34 -3,26 -3,18Z",1,{hand:1});
s("a_palm","Lumbricals and palmar interossei (mid palm)","M-2,24 L3,24 C6,30 12,34 15,34 L16,43 L-13,41 L-12,36 C-7,36 -3,30 -2,24Z",2,{hand:1});
s("a_gmed","Gluteus medius","M266,373 C276,384 282,400 284,424 L280,440 C280,420 276,396 266,380Z",2);
s("a_tfl","Tensor fasciae latae","M258,384 L268,378 C278,396 282,420 280,448 L270,454 C268,430 264,404 258,384Z",1);
s("a_itb","Iliotibial tract (IT band)","M270,454 L286,444 L286,470 C284,520 276,570 266,614 L258,614 C268,570 274,510 270,454Z",0,{k:"t",note:"Thick band of fascia on the lateral thigh. Tensor fasciae latae and gluteus maximus insert into it; it attaches to Gerdy's tubercle on the tibia."});
s("a_vl","Vastus lateralis","M268,440 C282,470 284,530 272,580 C266,596 258,602 252,600 L250,584 C266,540 272,470 262,424Z",0);
s("a_vm","Vastus medialis","M248,468 C238,508 223,546 219,576 C218,598 224,610 235,607 L241,588 C247,560 251,520 252,478Z",2);
s("a_rf","Rectus femoris","M262,424 C272,470 266,540 250,584 L236,584 C232,550 238,490 250,440 C254,432 258,426 262,424Z",1);
s("a_am","Adductor magnus","M210,468 L240,478 L234,560 L223,598 L213,562Z",2);
s("a_grac","Gracilis","M200,450 L210,447 C214,500 222,560 226,606 L216,612 C212,570 206,510 200,450Z",1);
s("a_al","Adductor longus","M220,434 L208,446 C214,470 222,500 230,542 C234,520 236,500 240,476 C232,462 226,448 220,434Z",0);
s("a_pect","Pectineus","M236,416 L222,432 C228,448 234,462 240,476 C240,452 238,434 236,416Z",2);
s("a_ilio","Iliopsoas","M250,400 L238,414 C238,432 238,448 240,468 C246,446 250,424 252,402Z",1);
s("a_sart","Sartorius","M254,386 L264,386 C258,430 240,490 222,545 C216,570 216,600 222,640 L214,640 C208,600 206,570 212,540 C230,490 248,430 254,386Z",2);
s("a_pat","Patella","M231,598 C231,590 236,586 241,586 C247,586 252,590 252,598 C252,606 247,611 241,611 C236,611 231,606 231,598Z",0,{k:"b",note:"Sesamoid bone in the quadriceps tendon. The patellar ligament runs from its apex to the tibial tuberosity."});
s("a_sol","Soleus","M222,718 L231,718 C231,750 230,775 229,796 L225,796 C224,770 222,745 222,718Z",1);
s("a_gast","Gastrocnemius (medial head)","M224,628 C215,650 216,690 222,720 L231,720 C229,690 229,655 231,636Z",0);
s("a_tib","Tibia (shin)","M235,626 L245,628 C243,690 239,750 237,797 L228,799 C228,750 228,690 231,640Z",0,{k:"b",note:"The anteromedial surface of the tibia is subcutaneous, with no muscle covering it. Tibialis anterior lies just lateral to the shin."});
s("a_fib","Fibularis (peroneus) longus","M256,620 L266,622 C272,660 268,720 258,790 L250,802 C254,760 258,700 258,660 C258,645 257,632 256,620Z",2);
s("a_edl","Extensor digitorum longus","M250,634 C259,660 259,710 253,760 C251,780 249,795 247,808 L240,808 C244,780 246,750 248,720 C252,690 252,660 250,634Z",1);
s("a_ta","Tibialis anterior","M245,628 C253,650 253,700 247,740 C244,765 241,785 237,802 L231,802 C236,770 240,720 242,680 C243,660 244,640 245,628Z",0);
s("a_temp","Temporalis","M221,42 C232,45 238,56 237,72 L228,76 C226,62 224,52 221,42Z",1);
s("a_mass","Masseter","M225,88 L233,91 C233,102 229,113 222,118 L217,111 C221,105 224,97 225,88Z",0);

/* ---------- POSTERIOR ---------- */
s("p_tlf","Thoracolumbar fascia","M200,296 L210,298 C216,322 226,344 254,366 L266,374 C244,380 222,386 200,412Z",0,{k:"t",note:"Diamond shaped sheet of fascia over the low back. Latissimus dorsi, the internal oblique, and transversus abdominis attach to it; erector spinae and multifidus lie deep to it."});
s("p_es","Erector spinae","M203,330 C213,326 221,338 225,356 C227,374 222,394 213,406 L203,410Z",2);
s("p_eo","External oblique","M267,326 C263,343 259,357 254,367 L270,376 C265,360 263,343 267,326Z",0);
s("p_lat","Latissimus dorsi","M208,298 C224,276 240,260 252,256 C264,248 274,240 279,226 L281,240 C278,270 273,300 267,330 C263,345 259,356 253,366 C240,360 228,350 222,338 C216,326 212,312 208,298Z",1);
s("p_rhom","Rhomboid major","M233,224 C235,236 239,246 246,255 L237,256 C233,247 231,238 230,229Z",2);
s("p_infra","Infraspinatus","M235,199 L250,189 C260,194 270,202 279,212 C264,216 252,226 243,237 C238,226 235,212 235,199Z",0);
s("p_tmin","Teres minor","M243,237 C252,226 264,218 279,212 L283,219 C270,224 258,232 247,244Z",2);
s("p_tmaj","Teres major","M247,244 C258,233 270,225 283,219 L288,232 C276,238 262,248 252,259 C248,255 246,250 247,244Z",1);
s("p_spl","Splenius capitis","M209,98 L225,103 L225,138 C217,126 212,112 209,98Z",2);
s("p_trap","Trapezius","M200,96 L209,98 C212,112 216,126 224,138 C236,148 262,156 292,166 C276,172 260,180 248,186 L234,197 C236,224 222,280 202,332 L200,332Z",0);
s("p_tri","Triceps brachii","M283,230 C279,250 283,290 294,330 L320,330 C320,300 316,266 308,250 C300,240 292,234 283,230Z",1);
s("p_delt","Deltoid","M292,164 C304,170 312,188 312,212 C312,234 308,252 303,264 C296,250 286,228 270,206 C262,196 254,190 248,186 C262,178 278,170 292,164Z",2);
s("p_olec","Olecranon (ulna)","M303,330 C303,325 315,325 315,331 C315,338 312,342 309,342 C305,342 303,337 303,330Z",0,{k:"b",note:"The point of the elbow. Triceps brachii inserts here."});
s("p_anc","Anconeus","M314,336 L324,333 C322,346 318,357 313,364 C312,354 312,344 314,336Z",0);
s("p_fcu","Flexor carpi ulnaris","M292,336 L303,342 C306,360 311,376 316,392 C320,410 325,428 328,447 L322,447 C316,420 306,390 300,370 C295,358 291,346 292,336Z",2);
s("p_ecu","Extensor carpi ulnaris","M310,344 C317,358 322,372 325,388 C328,408 331,428 334,447 L328,447 C325,426 320,406 316,388 C313,372 308,358 306,346Z",0);
s("p_ed","Extensor digitorum","M316,338 C324,350 329,366 332,384 C335,402 338,424 340,446 L334,447 C331,424 328,402 325,388 C322,370 316,354 311,344Z",1);
s("p_ecr","Extensor carpi radialis longus and brevis","M317,318 C327,332 333,352 337,376 C340,398 343,420 346,444 L340,446 C338,422 335,402 332,384 C328,362 322,344 316,334Z",2);
s("p_brd","Brachioradialis","M314,306 L324,302 C333,328 339,355 343,392 L338,392 C335,365 330,340 317,320Z",0);
s("p_apl","Abductor pollicis longus and extensor pollicis brevis","M332,404 L339,397 C342,410 345,424 347,438 L342,434 C339,422 336,412 332,404Z",1);
s("p_dio","Dorsal interossei","M9,18 C11,24 12,32 12,38 L9,38 C8,32 7,24 7,18Z M2,18 C3,24 3,32 3,38 L0,38 C0,32 0,24 0,18Z M-5,18 C-5,24 -6,32 -6,37 L-9,37 C-8,32 -8,24 -7,18Z M13,12 C17,16 19,24 18,30 L14,26 C14,20 13,16 13,12Z",0,{hand:1});
s("p_sac","Sacrum","M200,388 L208,390 C206,410 204,430 200,446Z",0,{k:"b",note:"Five fused vertebrae. Gluteus maximus, erector spinae, and multifidus attach; the PSIS lies just lateral to its upper part."});
s("p_gmed","Gluteus medius","M226,384 C240,371 258,369 271,376 C281,392 285,410 285,432 C276,430 270,426 266,421 C254,410 240,396 226,384Z",1);
s("p_itb","Iliotibial tract (IT band)","M285,430 L280,470 C282,520 274,570 264,614 L272,614 L288,470Z",0,{k:"t",note:"Thick band of fascia on the lateral thigh. Tensor fasciae latae and gluteus maximus insert into it; it attaches to Gerdy's tubercle on the tibia."});
s("p_vl","Vastus lateralis","M256,490 C266,490 274,486 279,472 C279,510 275,550 267,590 L262,604 C264,590 264,580 264,575 C265,545 262,515 256,490Z",1);
s("p_gmax","Gluteus maximus","M206,392 C212,386 220,383 228,384 C244,398 258,412 268,422 C278,434 282,450 280,470 C270,485 250,493 230,491 C216,489 206,481 202,471 L204,446 C206,428 207,410 206,392Z",0);
s("p_grac","Gracilis","M200,474 L211,486 C214,520 220,570 225,612 L216,618 C212,570 206,520 200,474Z",1);
s("p_am","Adductor magnus","M211,486 L224,488 C224,505 222,524 218,544 C215,524 213,505 211,486Z",2);
s("p_sm","Semimembranosus","M218,544 C221,526 224,506 224,490 C228,515 230,545 232,575 C233,592 232,606 229,624 L222,620 C223,600 222,580 221,565Z",0);
s("p_st","Semitendinosus","M224,488 L238,488 C241,515 243,540 242,562 C241,580 239,596 236,614 L231,614 C232,598 233,585 232,575 C230,545 228,515 224,488Z",1);
s("p_bf","Biceps femoris","M238,488 C246,486 252,488 256,490 C262,515 265,545 264,575 C264,595 263,610 262,628 L255,626 C254,606 252,590 250,580 C247,566 244,560 242,562 C243,540 241,515 238,488Z",2);
s("p_sol","Soleus","M221,698 C223,730 227,750 232,766 L250,766 C256,748 262,725 265,694 C256,708 248,714 241,716 C234,716 228,710 221,698Z",1);
s("p_fib","Fibularis (peroneus) longus and brevis","M264,640 L270,665 C268,700 262,750 253,800 L248,792 C254,750 260,710 264,696Z",2);
s("p_gast","Gastrocnemius","M224,606 C216,636 216,672 222,700 C228,712 236,717 240.4,717 L240.4,626 C236,616 230,610 224,606Z M241.6,626 L241.6,717 C248,714 258,708 264,696 C270,672 268,645 260,610 C254,612 246,618 241.6,626Z",0);
s("p_ach","Achilles (calcaneal) tendon","M232,766 L250,766 C247,782 245,798 245,816 L236,816 C236,798 235,782 232,766Z",0,{k:"t",note:"Common tendon of gastrocnemius and soleus (triceps surae), inserting on the calcaneus. Strongest tendon in the body."});

/* ---------- DEEP MUSCLES (drawn only when highlighted, as a see-through overlay) ---------- */
const G={k:"d"};
s("p_g_supra","Supraspinatus","M237,178 C250,172 266,170 280,172 L287,179 C272,181 254,187 240,197Z",0,G);
s("p_g_lev","Levator scapulae","M209,112 L216,112 C222,135 232,158 243,174 L234,181 C224,162 214,140 209,124Z",0,G);
s("p_g_rhom","Rhomboids (major and minor)","M201,157 L236,188 L239,247 L201,214Z",0,G);
s("p_g_es","Erector spinae","M203,120 L213,130 C222,200 227,300 225,380 L212,404 L203,408Z",0,G);
s("p_g_ql","Quadratus lumborum","M212,304 L227,300 L241,372 L218,379Z",0,G);
s("p_g_sup","Supinator","M313,336 L324,338 C329,350 329,362 327,373 L318,367 C316,356 313,346 313,336Z",0,G);
s("p_g_gmin","Gluteus minimus","M240,392 C254,384 268,386 276,396 C280,410 282,422 282,433 L274,431 C264,418 252,404 240,392Z",0,G);
s("p_g_rot","Deep lateral rotators (piriformis shown)","M204,403 L209,421 C232,429 256,434 276,438 L279,428 C254,420 228,410 204,403Z",0,G);
s("p_g_pop","Popliteus","M254,601 L261,610 C249,624 237,640 228,651 L224,632 C236,622 246,612 254,601Z",0,G);
s("p_g_tp","Tibialis posterior","M235,640 C244,640 249,660 248,700 C247,740 241,780 235,802 L230,800 C236,760 238,720 236,690Z",0,G);
s("a_g_pmin","Pectoralis minor","M268,177 L274,184 C263,206 251,229 241,245 L230,237 L231,207 C245,199 258,189 268,177Z",0,G);
s("a_g_sub","Subscapularis","M238,181 C252,177 266,179 276,185 L285,191 C277,207 263,233 249,251 C243,237 238,209 238,181Z",0,G);
s("a_g_ilio","Iliopsoas (psoas major and iliacus)","M204,300 L215,300 C227,340 241,390 253,440 L247,464 C237,430 217,362 204,330Z M233,371 L263,380 L253,432 L245,420Z",0,G);
s("a_g_pq","Pronator quadratus","M324,420 L343,417 L346,436 L328,439Z",0,G);

/* thin detail lines (not clickable) */
const DET={
a:["M205,72 C205,66 223,66 223,72 C223,78 205,78 205,72Z","M210,72 C210,69.6 218,69.6 218,72 C218,74.4 210,74.4 210,72Z","M200,80 L204.5,96 C203,99 201,99.5 200,99.5","M200,104 C208,104 212,107 212,110 C212,114 207,117 200,117","M200,110.5 L209,110","M203,290 L227,292","M203,318 L229,320","M203,348 L228,349","M201,258 L201,444","M262,382 L208,444","M241,611 L241,630","M270,172 C284,190 294,224 301,258","M214,180 C240,186 266,200 288,220","M210,214 C236,216 262,222 288,226","M224,838 L224,846 M231,839 L231,847 M239,840 L239,848 M247,839 L247,847"],
p:["M200,96 L200,446","M262,170 C276,190 290,224 301,258","M296,262 C300,285 304,308 308,326","M200,470 L200,476","M238,766 L240,740 L246,766"]
};

/* which shapes each muscle occupies: own = visible, deep = lies under these */
const MAP={
"Trapezius":{own:["p_trap","a_trap"]},
"Levator scapulae":{ghost:["p_g_lev"],deep:["p_trap"]},
"Rhomboids (major and minor)":{ghost:["p_g_rhom"],own:["p_rhom"],deep:["p_trap"]},
"Serratus anterior":{own:["a_serr"]},
"Pectoralis minor":{ghost:["a_g_pmin"],deep:["a_pec"]},
"Subclavius":{deep:["a_pec","a_clav"]},
"Pectoralis major":{own:["a_pec"]},
"Latissimus dorsi":{own:["p_lat","a_lat"]},
"Deltoid":{own:["a_delt","p_delt"]},
"Teres major":{own:["p_tmaj"]},
"Supraspinatus (rotator cuff)":{ghost:["p_g_supra"],deep:["p_trap"]},
"Infraspinatus (rotator cuff)":{own:["p_infra"]},
"Teres minor (rotator cuff)":{own:["p_tmin"]},
"Subscapularis (rotator cuff)":{ghost:["a_g_sub"],deep:["a_pec","a_delt"]},
"Coracobrachialis":{own:["a_cb"]},
"Biceps brachii":{own:["a_bic"]},
"Brachialis":{own:["a_brach"],deep:["a_bic"]},
"Triceps brachii":{own:["p_tri","a_tri"]},
"Anconeus":{own:["p_anc"]},
"Brachioradialis":{own:["a_brd","p_brd"]},
"Pronator teres":{own:["a_pt"]},
"Pronator quadratus":{ghost:["a_g_pq"],deep:["a_fcr","a_pl"]},
"Supinator":{ghost:["p_g_sup"],deep:["p_ecr","p_ed"]},
"Flexor carpi radialis":{own:["a_fcr"]},
"Palmaris longus":{own:["a_pl"]},
"Flexor carpi ulnaris":{own:["a_fcu","p_fcu"]},
"Flexor digitorum superficialis":{deep:["a_fcr","a_pl","a_fcu"]},
"Flexor digitorum profundus":{deep:["a_pl","a_fcu"]},
"Flexor pollicis longus":{deep:["a_fcr","a_brd"]},
"Extensor carpi radialis longus":{own:["p_ecr"]},
"Extensor carpi radialis brevis":{own:["p_ecr"]},
"Extensor digitorum":{own:["p_ed"]},
"Extensor digiti minimi":{own:["p_ed"]},
"Extensor indicis":{deep:["p_ed"]},
"Extensor carpi ulnaris":{own:["p_ecu"]},
"Abductor pollicis longus":{own:["p_apl"]},
"Extensor pollicis brevis":{own:["p_apl"]},
"Extensor pollicis longus":{deep:["p_ed","p_apl"]},
"Abductor pollicis brevis":{own:["a_then"]},
"Flexor pollicis brevis":{own:["a_then"]},
"Opponens pollicis":{own:["a_then"]},
"Adductor pollicis":{deep:["a_then"]},
"Abductor digiti minimi":{own:["a_hypo"]},
"Flexor digiti minimi brevis":{own:["a_hypo"]},
"Opponens digiti minimi":{own:["a_hypo"]},
"Lumbricals (4)":{own:["a_palm"]},
"Dorsal interossei (4)":{own:["p_dio"]},
"Palmar interossei (3)":{own:["a_palm"]},
"Sternocleidomastoid":{own:["a_scm"]},
"Scalenes (anterior, middle, posterior)":{deep:["a_scm","a_trap"]},
"Longus colli and longus capitis (deep neck flexors)":{deep:["a_scm"]},
"Splenius capitis and cervicis":{own:["p_spl"],deep:["p_trap"]},
"Semispinalis capitis":{deep:["p_trap","p_spl"]},
"Erector spinae (iliocostalis, longissimus, spinalis)":{ghost:["p_g_es"],own:["p_es"],deep:["p_tlf","p_lat","p_trap"]},
"Multifidus":{deep:["p_es","p_tlf"]},
"Rectus abdominis":{own:["a_ra"]},
"External oblique":{own:["a_eo","p_eo"]},
"Internal oblique":{deep:["a_eo"]},
"Transversus abdominis":{deep:["a_eo","a_ra"]},
"Quadratus lumborum":{ghost:["p_g_ql"],deep:["p_es","p_tlf"]},
"Diaphragm":{deep:["a_ra","a_eo","a_serr"]},
"Intercostals (external and internal)":{deep:["a_pec","a_serr"]},
"Iliopsoas":{ghost:["a_g_ilio"],own:["a_ilio"],deep:["a_ra","a_eo"]},
"Rectus femoris":{own:["a_rf"]},
"Vasti (lateralis, medialis, intermedius)":{own:["a_vl","a_vm","p_vl"],deep:["a_rf"]},
"Sartorius":{own:["a_sart"]},
"Tensor fasciae latae":{own:["a_tfl"]},
"Gluteus maximus":{own:["p_gmax"]},
"Gluteus medius":{own:["p_gmed","a_gmed"]},
"Gluteus minimus":{ghost:["p_g_gmin"],deep:["p_gmed"]},
"Deep lateral rotators (piriformis, obturators, gemelli, quadratus femoris)":{ghost:["p_g_rot"],deep:["p_gmax"]},
"Adductor longus":{own:["a_al"]},
"Adductor brevis":{deep:["a_al","a_pect"]},
"Adductor magnus":{own:["p_am","a_am"],deep:["a_al"]},
"Gracilis":{own:["a_grac","p_grac"]},
"Pectineus":{own:["a_pect"]},
"Biceps femoris (hamstring)":{own:["p_bf"]},
"Semitendinosus (hamstring)":{own:["p_st"]},
"Semimembranosus (hamstring)":{own:["p_sm"]},
"Popliteus":{ghost:["p_g_pop"],deep:["p_gast"]},
"Tibialis anterior":{own:["a_ta"]},
"Extensor digitorum longus":{own:["a_edl"]},
"Extensor hallucis longus":{deep:["a_ta","a_edl"]},
"Fibularis (peroneus) tertius":{deep:["a_edl"]},
"Fibularis (peroneus) longus":{own:["a_fib","p_fib"]},
"Fibularis (peroneus) brevis":{own:["p_fib"],deep:["a_fib"]},
"Gastrocnemius":{own:["p_gast","a_gast"]},
"Soleus":{own:["p_sol","a_sol"]},
"Plantaris":{deep:["p_gast"]},
"Tibialis posterior":{ghost:["p_g_tp"],deep:["p_sol"]},
"Flexor digitorum longus":{deep:["p_sol"]},
"Flexor hallucis longus":{deep:["p_sol"]},
"Masseter":{own:["a_mass"]},
"Temporalis":{own:["a_temp"]},
"Medial pterygoid":{deep:["a_mass"]},
"Lateral pterygoid":{deep:["a_mass"]}
};
/* reverse lookups */
const OWN={},DEEP={};
Object.keys(MAP).forEach(n=>{(MAP[n].own||[]).forEach(i=>(OWN[i]=OWN[i]||[]).push(n));(MAP[n].deep||[]).forEach(i=>(DEEP[i]=DEEP[i]||[]).push(n))});

/* bounding boxes (control-point boxes are close enough for cropping) */
function bbox(d,hand){const n=d.match(/-?\d+(\.\d+)?/g).map(Number);let a=1e9,b=1e9,c=-1e9,e=-1e9;
  for(let i=0;i<n.length;i+=2){let x=n[i],y=n[i+1];if(hand){const X=336+.978*x+.208*y,Y=446-.208*x+.978*y;x=X;y=Y}
    a=Math.min(a,x);b=Math.min(b,y);c=Math.max(c,x);e=Math.max(e,y)}return[a,b,c,e]}
SH.forEach(x=>x.bb=bbox(x.d,x.hand));
function cropBox(boxes,pad,min){let a=1e9,b=1e9,c=-1e9,e=-1e9;boxes.forEach(q=>{a=Math.min(a,q[0]);b=Math.min(b,q[1]);c=Math.max(c,q[2]);e=Math.max(e,q[3])});
  const cy=(b+e)/2,cx=wx((a+c)/2,cy),sz=Math.max(c-a,e-b,min||120)+(pad||30)*2;return[cx-sz/2,cy-sz/2,sz,sz]}
function cropFor(ids,pad,min){return cropBox(ids.map(i=>S[i].bb),pad,min)}

/* ---------- SKELETON ---------- */
const BBOX_B={"Skull and mandible landmarks":[160,20,240,132],"Vertebral column":[150,110,250,450],"Sternum and ribs":[125,155,275,320],"Clavicle":[195,130,305,200],"Scapula":[215,150,315,270],"Humerus":[255,165,345,345],"Radius":[285,325,365,455],"Ulna":[285,325,365,455],"Carpal bones":[310,425,380,495],"Metacarpals and phalanges":[305,430,395,545],"Pelvis (os coxae)":[130,355,280,490],"Femur":[200,410,300,625],"Patella":[205,565,280,640],"Tibia":[195,600,295,820],"Fibula":[195,600,295,820],"Tarsals and foot":[200,775,280,850]};
const JDOTS=[ /* name, x, y, views, hand-frame? , midline? */
["Temporomandibular joint (TMJ)",231,93,"ap"],["Atlanto-occipital joint",200,114,"p",0,1],["Atlantoaxial joint",200,123,"p",0,1],
["Intervertebral and facet (zygapophyseal) joints",200,330,"ap",0,1],["Costovertebral and costotransverse joints",213,236,"p"],
["Sternoclavicular (SC) joint",209,168,"a"],["Acromioclavicular (AC) joint",289,165,"ap"],["Glenohumeral joint",282,188,"ap"],["Scapulothoracic joint (functional)",250,218,"p"],
["Elbow (humeroulnar and humeroradial)",308,333,"ap"],["Proximal radioulnar joint",319,345,"ap"],["Distal radioulnar joint",332,438,"ap"],
["Wrist (radiocarpal) joint",0,1,"ap",1],["Midcarpal joint",0,8.5,"ap",1],["Thumb carpometacarpal (CMC) joint",9.5,13,"ap",1],["Finger carpometacarpal joints (2 to 5)",-4,15,"ap",1],["Metacarpophalangeal (MCP) joints",5.2,43,"ap",1],["Interphalangeal joints (PIP, DIP, thumb IP)",5.2,64,"ap",1],
["Sacroiliac joint",212,394,"ap"],["Pubic symphysis",200,448,"a",0,1],["Hip joint",245,428,"ap"],
["Knee (tibiofemoral) joint",242,611,"ap"],["Patellofemoral joint",242,596,"a"],["Proximal tibiofibular joint",257,621,"ap"],
["Ankle (talocrural) joint",239,802,"ap"],["Subtalar joint",240,814,"p"],["Transverse tarsal (midtarsal) joint",238,815,"a"],["Metatarsophalangeal and interphalangeal joints (toes)",240,833,"a"]
];
const esc=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
function skeleton(v,hlB){
  const cls=n=>hlB&&hlB.includes(n)?" hl":"";
  const sb0=(n,d,w,x)=>`<path class="bo" d="${d}" stroke-width="${w+1.6}"/><path class="bs${x||""}${cls(n)}" data-b="${esc(n)}" d="${d}" stroke-width="${w}"><title>${esc(n)}</title></path>`;
  const fb0=(n,d,x)=>`<path class="bf${cls(n)}" data-b="${esc(n)}" d="${d}" ${x||""}><title>${esc(n)}</title></path>`;
  const el0=(n,cx,cy,rx,ry,rot)=>`<ellipse class="bf${cls(n)}" data-b="${esc(n)}" cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}"${rot?` transform="rotate(${rot} ${cx} ${cy})"`:""}><title>${esc(n)}</title></ellipse>`;
  let H=0;const sb=(n,d,w,x)=>sb0(n,H?d:W(d),w,x),fb=(n,d,x)=>fb0(n,H?d:W(d),x),el=(n,cx,cy,rx,ry,rot)=>el0(n,H?cx:wx(cx,cy),cy,rx,ry,rot);
  const V="Vertebral column",R="Sternum and ribs",SK="Skull and mandible landmarks",A=v==="a";
  let mid="",half="",hand="";
  /* spine */
  for(let i=0;i<7;i++)mid+=fb(V,rr(191,115+i*6.6,18,5.2,2));
  for(let i=0;i<12;i++){const w=20+i*.6;mid+=fb(V,rr(200-w/2,163+i*11.5,w,9,3))}
  for(let i=0;i<5;i++)mid+=fb(V,rr(185,302+i*15.8,30,12.5,4));
  mid+=fb(V,"M184,383 L216,383 C214,405 208,428 201,440 L199,440 C192,428 186,405 184,383Z")+fb(V,"M197,441 L203,441 L200,450Z");
  if(!A)for(let i=0;i<17;i++){const y=i<12?167.5+i*11.5:308+(i-12)*15.8;mid+=`<ellipse class="bd" cx="200" cy="${y}" rx="2" ry="3.4"/>`}
  /* ribs (half) */
  const RW=[30,42,50,56,60,63,65,66,65,62,52,40],E=[[234,268],[246,285],[256,301]];
  let ribs="";
  for(let i=0;i<12;i++){const yv=168+i*11.5,w=RW[i],x=200+w;
    if(i>=10){ribs+=sb(R,`M212,${yv} C${200+w*.6},${yv-3} ${x},${yv+5} ${x+2},${yv+13}`,3.6);continue}
    const sy=171+i*12.6,cy=i<7?sy+1+i*2.6:E[i-7][1],cx=i<7?200+w*.5:E[i-7][0],yL=yv+(cy-yv)*.55;
    const post=`M212,${yv} C${200+w*.6},${yv-5} ${x},${yL-9} ${x},${yL}`;
    if(A){ribs+=sb(R,post+` C${x},${yL+9} ${cx+(x-cx)*.5},${cy+3} ${cx},${cy}`,3.6);if(i<7)ribs+=sb(R,`M${cx},${cy} L207,${sy}`,3," cart")}
    else ribs+=sb(R,post+` C${x},${yL+6} ${x-3},${yL+10} ${x-6},${yL+13}`,3.6);
  }
  if(A)ribs+=sb(R,"M207,250 C218,256 228,262 234,268 L246,285 L256,301",3," cart");
  const scap=fb("Scapula","M238,174 C250,170 264,171 274,177 L283,184 C286,191 284,197 280,201 C270,218 258,236 247,251 C241,240 236,216 236,196Z")
    +fb("Scapula","M268,172 C278,163 291,160 296,167 C295,174 287,175 279,175Z")
    +(A?fb("Scapula","M266,178 C270,173 277,175 276,181 C273,185 268,184 266,178Z"):sb("Scapula","M239,198 L287,171",4));
  half+=A?scap+ribs:ribs+scap;
  half+=sb("Clavicle","M209,168 C226,161 246,173 262,169 C272,166 280,163 289,165",5.5);
  /* arm */
  half+=el("Humerus",283,187,10,10)+el("Humerus",293,189,4.5,8)+sb("Humerus","M289,198 L307,324",8)+el("Humerus",309,331,15,6.5,-8);
  half+=sb("Ulna","M302,337 L327,437",5)+el("Ulna",327,440,3.6,3.6)+(A?"":el("Ulna",303,334,5.5,7));
  half+=sb("Radius","M318,345 L339,434",4.6)+el("Radius",318,343,5.2,3.4,-10)+el("Radius",339,438,6.5,4.6,-12);
  H=1;const car=[[5,5],[0,4.5],[-5,5.5],[8,11],[4,11.5],[-.5,11.5],[-5.5,11.5]];if(A)car.push([-7.6,7.6]);
  car.forEach(c=>hand+=el("Carpal bones",c[0],c[1],2.7,2.7));
  [[6.5,15,12.5,40],[2,15.5,5.2,41],[-2,15.5,-2.1,40],[-6,15,-9.6,38],[10.5,13.5,17,26]].forEach(q=>hand+=sb("Metacarpals and phalanges",`M${q[0]},${q[1]} L${q[2]},${q[3]}`,3));
  [[12.5,[44,60,62,72,74,80]],[5.2,[45,63,65,77,79,86]],[-2.1,[44,60,62,73,75,82]],[-9.6,[42,54,56,63,65,70]]].forEach(f=>{for(let k=0;k<6;k+=2)hand+=sb("Metacarpals and phalanges",`M${f[0]},${f[1][k]} L${f[0]},${f[1][k+1]}`,2.8)});
  hand+=sb("Metacarpals and phalanges","M18,28 L22.5,37",2.8)+sb("Metacarpals and phalanges","M23.5,39 L26,45",2.8);H=0;
  /* pelvis + leg */
  const P="Pelvis (os coxae)";
  half+=fb(P,"M212,386 C218,368 244,360 264,378 C265,392 259,400 256,408 C259,418 257,432 249,440 C239,441 231,435 229,425 C222,414 214,402 212,386Z")
    +fb(P,"M230,424 C222,429 210,435 203,439 L203,457 C210,463 218,469 226,476 C235,473 242,462 246,444 C241,437 235,429 230,424Z M224,441 C230,441 233,447 232,455 C231,462 226,466 221,462 C216,458 215,448 218,444 C220,442 222,441 224,441Z",'fill-rule="evenodd"');
  half+=sb("Femur","M249,431 L266,440",7)+el("Femur",245,428,9,9)+el("Femur",269,441,6,10)+el("Femur",254,453,3.6,3.6)+sb("Femur","M266,447 L244,584",10)
    +fb("Femur","M228,594 C227,582 257,582 257,594 C258,606 250,611 243,607 C236,611 227,606 228,594Z");
  if(A)half+=el("Patella",242,596,8.5,9.5);
  half+=fb("Tibia","M227,613 L257,613 C257,621 250,626 242,626 C234,626 227,621 227,613Z")+sb("Tibia","M241,625 L238,790",9)+fb("Tibia","M231,788 L245,788 L244,800 C238,802 231,806 229,800Z");
  half+=el("Fibula",258,623,4,5)+sb("Fibula","M258,627 L251,796",3.6)+el("Fibula",250,802,3.6,6);
  const T="Tarsals and foot";
  if(A){half+=el(T,238,808,8,5)+el(T,238,815,9,3.5);for(let j=0;j<5;j++){const x0=231+j*3.5,x1=226.5+j*6.6;half+=sb(T,`M${x0},820 L${x1},832`,3)+sb(T,`M${x1},835 L${x1+.2},842`,2.8)}}
  else half+=el(T,238,807,7,4.5)+el(T,240,823,8,12);
  /* skull last so it covers the upper cervical spine */
  let skull="";
  if(A)skull=fb(SK,"M172,97 C173,114 181,127 193,130 L207,130 C219,127 227,114 228,97 L223,100 C221,110 214,117 200,117 C186,117 179,110 177,100Z")
    +fb(SK,"M200,24 C222,24 234,40 234,62 C234,76 232,86 229,94 L225,100 C222,108 212,114 200,114 C188,114 178,108 175,100 L171,94 C168,86 166,76 166,62 C166,40 178,24 200,24Z")
    +`<ellipse class="bh" cx="186" cy="70" rx="8" ry="6.5"/><ellipse class="bh" cx="214" cy="70" rx="8" ry="6.5"/><path class="bh" d="M200,80 L205,95 L195,95Z"/><path class="bd" d="M186,108 L214,108"/>`;
  else skull=fb(SK,"M174,98 C176,112 184,122 194,124 L206,124 C216,122 224,112 226,98Z")
    +fb(SK,"M200,24 C222,24 234,40 234,62 C234,78 230,92 222,102 C214,110 208,112 200,112 C192,112 186,110 178,102 C170,92 166,78 166,62 C166,40 178,24 200,24Z");
  const sides=["",MIR].map(t=>`<g${t?` transform="${t}"`:""}>${half}<g transform="${ht()}">${hand}</g></g>`).join("");
  return mid+sides+skull;
}
function jointDots(v,hlJ){
  let half="",mid="",hand="";
  JDOTS.forEach(j=>{if(!j[3].includes(v))return;const c=`<circle class="jd${hlJ===j[0]?" hl":""}" data-j="${esc(j[0])}" cx="${j[4]?j[1]:wx(j[1],j[2])}" cy="${j[2]}" r="${j[4]?2.6:4.2}"><title>${esc(j[0])}</title></circle>`;if(j[4])hand+=c;else if(j[5])mid+=c;else half+=c});
  return mid+["",MIR].map(t=>`<g${t?` transform="${t}"`:""}>${half}<g transform="${ht()}">${hand}</g></g>`).join("");
}

/* ---------- RENDER ---------- */
let N=0;
function svg(o){
  const v=o.view||"a",mode=o.mode||"muscle",hl=o.hl||{},id="fg"+(++N);
  const silPaths=t=>`<path d="${W(SIL)}"${t?` transform="${t}"`:""}/><path d="${W(EAR)}"${t?` transform="${t}"`:""}/>`+HAND.map(d=>`<path d="${d}" transform="${t?t+" ":""}${ht()}"/>`).join("");
  let defs=`<clipPath id="${id}">${silPaths("")}${silPaths(MIR)}</clipPath><pattern id="${id}h" width="4" height="4" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="4" height="4" class="hbg"/><line x1="0" y1="0" x2="0" y2="4" class="hln"/></pattern>`;
  if(!o.mini&&mode==="muscle"){
    defs+=`<linearGradient id="${id}s" x1="0" x2="1" y1="0" y2="0"><stop offset="0" stop-color="#000" stop-opacity=".24"/><stop offset=".3" stop-color="#fff" stop-opacity=".2"/><stop offset=".62" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".26"/></linearGradient>`
      +[...new Set(Object.values(FIB))].map(a=>`<pattern id="${id}f${a}" width="2.4" height="2.4" patternUnits="userSpaceOnUse" patternTransform="rotate(${a})"><line x1="0" y1="0" x2="0" y2="2.4" stroke="#4a0f0a" stroke-width=".42" stroke-opacity=".34"/></pattern>`).join("")
      +`<filter id="${id}i" x="-5%" y="-5%" width="110%" height="110%" color-interpolation-filters="sRGB"><feComponentTransfer in="SourceAlpha"><feFuncA type="table" tableValues="1 0"/></feComponentTransfer><feGaussianBlur stdDeviation="7"/><feComposite operator="in" in2="SourceAlpha"/><feColorMatrix type="matrix" values="0 0 0 0 0.16  0 0 0 0 0.03  0 0 0 0 0.02  0 0 0 0.8 0"/></filter>`;
  }
  let body="";
  if(mode==="muscle"){
    const one=x=>{const h=hl[x.id];const c=["ms","k"+x.k,"t"+x.t];if(h)c.push(h);if(o.sel===x.id)c.push("sel");const D=x.hand?x.d:W(x.d);
      return `<path class="${c.join(" ")}" data-s="${x.id}" d="${D}"${h==="deep"?` style="fill:url(#${id}h)"`:""}><title>${esc(x.label)}</title></path>`
        +(o.mini||x.k==="d"?"":(x.k==="m"&&FIB[x.id]!==undefined?`<path class="ov" d="${D}" fill="url(#${id}f${FIB[x.id]})"/>`:"")+`<path class="ov" d="${D}" fill="url(#${id}s)"/>`)};
    const main=SH.filter(x=>x.v===v&&!x.hand&&(x.k!=="d"||hl[x.id])).map(one).join(""),hand=SH.filter(x=>x.v===v&&x.hand).map(one).join("");
    const det=DET[v].map(d=>`<path class="det" d="${W(d)}"/>`).join("");
    body=`<g clip-path="url(#${id})"><rect class="base" x="0" y="0" width="400" height="860"/>`+["",MIR].map(t=>`<g${t?` transform="${t}"`:""}>${main}${det}<g transform="${ht()}">${hand}</g></g>`).join("")+`</g>`+(o.mini?"":`<g class="ov" fill="#000" filter="url(#${id}i)">${silPaths("")}${silPaths(MIR)}<rect x="199" y="22" width="2" height="428"/></g>`)+`<g class="outline">${silPaths("")}${silPaths(MIR)}</g>`;
  }else{
    body=`<g class="ghost">${silPaths("")}${silPaths(MIR)}</g><g class="bones">${skeleton(v,o.hlB)}</g>`+(o.joints===false?"":jointDots(v,o.hlJ));
  }
  const vb=o.crop?o.crop.map(n=>+n.toFixed(1)).join(" "):"20 10 360 844";
  const label=o.crop||o.nolabel?"":`<text class="vlab" x="28" y="30">${v==="a"?"ANTERIOR":"POSTERIOR"}</text>`;
  return `<svg class="fig ${mode}${o.mini?" mini":""}" viewBox="${vb}" role="img" aria-label="${v==="a"?"Anterior":"Posterior"} ${mode==="muscle"?"muscle":"skeleton"} view"><defs>${defs}</defs>${body}${label}</svg>`;
}
return{svg,SH,S,MAP,OWN,DEEP,cropFor,cropBox,BBOX_B,JDOTS,wx,setSex(s){SEX=s==="m"?"m":"f"}};
})();
