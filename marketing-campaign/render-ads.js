import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import {fileURLToPath} from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const out = path.join(__dirname, 'images');
fs.mkdirSync(out, {recursive: true});

const fonts = '/Users/nasirrm/.codex/skills/canvas-design/canvas-fonts';
const bold = fs.readFileSync(path.join(fonts, 'BigShoulders-Bold.ttf')).toString('base64');
const sans = fs.readFileSync(path.join(fonts, 'InstrumentSans-Regular.ttf')).toString('base64');
const sansBold = fs.readFileSync(path.join(fonts, 'InstrumentSans-Bold.ttf')).toString('base64');

const C = {ink:'#0d0d0d', paper:'#fbfaf5', lime:'#c8ff2e', orange:'#ffb000', coral:'#ff4f32', cyan:'#31d8ff', gray:'#77776f'};
const formats = [
  {name:'feed-4x5', w:1080, h:1350},
  {name:'square-1x1', w:1080, h:1080},
  {name:'vertical-9x16', w:1080, h:1920},
];

const esc = (s) => s.replace(/&/g,'&amp;').replace(/</g,'&lt;');
const familyCss = `@font-face{font-family:Big;src:url(data:font/ttf;base64,${bold})} @font-face{font-family:Instrument;src:url(data:font/ttf;base64,${sans})} @font-face{font-family:Instrument;src:url(data:font/ttf;base64,${sansBold});font-weight:700}`;

function base(w,h,bg=C.paper){ return `<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg"><style>${familyCss} .big{font-family:Big,sans-serif;font-weight:700} .sans{font-family:Instrument,sans-serif} .bold{font-family:Instrument,sans-serif;font-weight:700}</style><rect width="${w}" height="${h}" fill="${bg}"/>`; }
function logo(x,y,color=C.ink){ return `<g transform="translate(${x} ${y})"><rect width="82" height="48" rx="2" fill="${color}"/><text x="41" y="33" text-anchor="middle" class="bold" font-size="22" fill="${color===C.ink?C.paper:C.ink}">OYM</text><text x="98" y="19" class="bold" font-size="16" fill="${color}">OWN YOUR WEB</text><text x="98" y="40" class="sans" font-size="13" letter-spacing="2" fill="${color}">SYSTEMS</text></g>`; }
function chip(x,y,text,fill,fg=C.ink){ return `<g transform="translate(${x} ${y})"><rect width="${Math.max(150,text.length*13+34)}" height="42" rx="21" fill="${fill}"/><text x="17" y="28" class="bold" font-size="17" letter-spacing="1" fill="${fg}">${esc(text)}</text></g>`; }
function footer(w,h,bg,fg=C.ink){ return `<rect x="0" y="${h-94}" width="${w}" height="94" fill="${bg}"/><text x="58" y="${h-55}" class="bold" font-size="18" fill="${fg}">AI-POWERED • HUMAN-REVIEWED</text><text x="${w-58}" y="${h-55}" text-anchor="end" class="bold" font-size="18" fill="${fg}">APPLY TODAY →</text>`; }

function system(f){
 const {w,h}=f, vert=h>1500, compact=h<1200;
 const headlineY=vert?300:245, fs=vert?122:(compact?108:120);
 const cardsY=vert?1060:(compact?650:800), cardH=vert?480:(compact?260:350);
 let s=base(w,h)+logo(58,56)+chip(58,145,'01 / THE SYSTEM',C.lime);
 s+=`<text x="58" y="${headlineY}" class="big" font-size="${fs}" fill="${C.ink}"><tspan x="58">YOUR SOCIAL</tspan><tspan x="58" dy=".83em">MEDIA NEEDS</tspan><tspan x="58" dy=".83em" fill="${C.coral}">A SYSTEM.</tspan></text>`;
 s+=`<text x="62" y="${vert?750:(compact?570:650)}" class="sans" font-size="25" fill="${C.ink}">PLANNED • DESIGNED • APPROVED • SCHEDULED</text>`;
 const labels=[['01','STRATEGY',C.lime],['02','CONTENT',C.orange],['03','REPORTING',C.cyan]];
 labels.forEach((a,i)=>{const x=58+i*322; s+=`<g transform="translate(${x} ${cardsY})"><rect width="292" height="${cardH}" rx="8" fill="${C.ink}"/><rect x="14" y="14" width="264" height="8" fill="${a[2]}"/><text x="24" y="82" class="big" font-size="52" fill="${a[2]}">${a[0]}</text><text x="24" y="130" class="bold" font-size="22" fill="${C.paper}">${a[1]}</text>${vert?`<circle cx="146" cy="250" r="68" fill="none" stroke="${a[2]}" stroke-width="10"/><path d="M110 250l25 26 51-60" fill="none" stroke="${a[2]}" stroke-width="12"/>`:''}</g>`});
 s+=footer(w,h,C.lime)+`</svg>`; return s;
}

function scramble(f){
 const {w,h}=f, vert=h>1500, compact=h<1200;
 const fs=vert?116:(compact?102:112), y=vert?340:270;
 let s=base(w,h,C.ink)+logo(58,56,C.paper)+chip(58,145,'02 / REPLACE THE CHAOS',C.coral);
 s+=`<g transform="rotate(-3 ${w/2} ${y})"><rect x="36" y="${y-130}" width="1008" height="${vert?520:430}" fill="${C.coral}"/><text x="65" y="${y}" class="big" font-size="${fs}" fill="${C.ink}"><tspan x="65">STOP</tspan><tspan x="65" dy=".82em">SCRAMBLING.</tspan></text></g>`;
 s+=`<text x="58" y="${vert?900:(compact?700:770)}" class="big" font-size="${vert?116:90}" fill="${C.paper}"><tspan x="58">START SHOWING UP</tspan><tspan x="58" dy=".95em" fill="${C.lime}">CONSISTENTLY.</tspan></text>`;
 const py=vert?1230:(compact?830:960); ['CALENDAR BUILT','GRAPHICS DESIGNED','CAPTIONS WRITTEN','APPROVALS ORGANIZED'].forEach((t,i)=>{const yy=py+i*(vert?105:74); s+=`<rect x="58" y="${yy}" width="${w-116}" height="${vert?80:58}" rx="4" fill="${i%2?C.paper:C.orange}"/><text x="82" y="${yy+(vert?53:39)}" class="bold" font-size="${vert?27:21}" fill="${C.ink}">✓ ${t}</text>`});
 s+=footer(w,h,C.orange)+`</svg>`; return s;
}

function price(f){
 const {w,h}=f, vert=h>1500, compact=h<1200;
 let s=base(w,h)+logo(58,56)+chip(58,145,'03 / ONE CLEAR PRICE',C.cyan);
 s+=`<text x="58" y="${vert?390:330}" class="big" font-size="${vert?114:(compact?98:108)}" fill="${C.ink}"><tspan x="58">ONE PRICE.</tspan><tspan x="58" dy=".82em">ONE CONTENT</tspan><tspan x="58" dy=".82em">SYSTEM.</tspan></text>`;
 const cy=vert?920:(compact?670:750), ch=vert?590:(compact?320:430);
 s+=`<rect x="58" y="${cy}" width="964" height="${ch}" rx="10" fill="${C.cyan}" stroke="${C.ink}" stroke-width="5"/><text x="100" y="${cy+(vert?175:130)}" class="big" font-size="${vert?230:185}" fill="${C.ink}">$450</text><text x="${vert?725:680}" y="${cy+(vert?175:130)}" class="bold" font-size="30" fill="${C.ink}">/ MONTH</text><line x1="100" y1="${cy+(vert?235:175)}" x2="980" y2="${cy+(vert?235:175)}" stroke="${C.ink}" stroke-width="3"/><text x="100" y="${cy+(vert?305:225)}" class="bold" font-size="${vert?29:23}" fill="${C.ink}">12 POSTS • INSTAGRAM + FACEBOOK</text><text x="100" y="${cy+(vert?365:270)}" class="sans" font-size="${vert?26:21}" fill="${C.ink}">GRAPHICS • CAPTIONS • SCHEDULING • ANALYTICS</text>${vert?`<rect x="100" y="${cy+425}" width="360" height="72" rx="36" fill="${C.ink}"/><text x="280" y="${cy+472}" text-anchor="middle" class="bold" font-size="23" fill="${C.paper}">NO SETUP FEE</text>`:''}`;
 s+=footer(w,h,C.coral)+`</svg>`; return s;
}

(async()=>{
 for(const f of formats){
  for(const [name,fn] of [['01-system',system],['02-stop-scrambling',scramble],['03-one-price',price]]){
   await sharp(Buffer.from(fn(f))).png().toFile(path.join(out,`${name}-${f.name}.png`));
  }
 }
 console.log(`Rendered 9 campaign images to ${out}`);
})();
