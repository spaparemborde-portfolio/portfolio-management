const pages=[...document.querySelectorAll(".page")];
let current=0;
const currentEl=document.getElementById("currentPage");
const totalEl=document.getElementById("totalPages");
const progress=document.querySelector(".progress span");
const prev=document.getElementById("prevBtn");
const next=document.getElementById("nextBtn");
const toc=document.getElementById("toc");
totalEl.textContent=pages.length;

function show(i){
  current=Math.max(0,Math.min(pages.length-1,i));
  pages.forEach((p,n)=>p.classList.toggle("active",n===current));
  currentEl.textContent=current+1;
  progress.style.width=((current+1)/pages.length*100)+"%";
  prev.disabled=current===0; next.disabled=current===pages.length-1;
  window.scrollTo({top:0,behavior:"smooth"});
  history.replaceState(null,"","#page-"+(current+1));
}
prev.onclick=()=>show(current-1);
next.onclick=()=>show(current+1);
document.querySelectorAll("[data-next]").forEach(b=>b.onclick=()=>show(current+1));
document.getElementById("tocBtn").onclick=()=>toc.classList.add("open");
document.getElementById("tocClose").onclick=()=>toc.classList.remove("open");
document.querySelectorAll("[data-go]").forEach(a=>a.onclick=()=>{show(+a.dataset.go);toc.classList.remove("open")});
document.querySelectorAll("[data-go-title]").forEach(a=>a.onclick=()=>{
  const idx=pages.findIndex(p=>p.dataset.title===a.dataset.goTitle);
  if(idx>=0) show(idx);
  toc.classList.remove("open");
});
document.addEventListener("keydown",e=>{
 if(e.key==="ArrowRight")show(current+1);
 if(e.key==="ArrowLeft")show(current-1);
 if(e.key==="Escape"){toc.classList.remove("open");document.getElementById("lightbox").classList.remove("open")}
});
const lb=document.getElementById("lightbox");
document.getElementById("showVerbatims").onclick=()=>lb.classList.add("open");
document.getElementById("lightboxClose").onclick=()=>lb.classList.remove("open");
lb.onclick=e=>{if(e.target===lb)lb.classList.remove("open")};
const m=location.hash.match(/page-(\d+)/); if(m) current=Math.max(0,Math.min(pages.length-1,+m[1]-1));
show(current);

// Les boutons Avenir Pro restent visuellement présents ; les URL existantes pourront être reconnectées sans modifier la mise en page.
document.querySelectorAll('[data-resource]').forEach(a=>a.addEventListener('click',e=>{if(a.getAttribute('href')==='#') e.preventDefault();}));
