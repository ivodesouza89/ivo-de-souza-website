/* ===== EDIT HERE: one place for all pages ===== */
const LINKS={ // full URLs; empty ones stay hidden
 spotify:"", apple:"", youtube:"", instagram:"", tiktok:"", facebook:""
};
const SHOWS=[ // optional per show: ticket:"https://..."
 {date:"2025-12-12",venue:"Pura Resenha Bar",city:"Lisbon, PT"},
 {date:"2025-12-20",venue:"Pura Resenha Bar",city:"Areeiro, Lisbon, PT",time:"19:00"},
 {date:"2025-12-26",venue:"Pura Resenha Bar",city:"Lisbon, PT"}
];
const U="https://ivodesouza.wordpress.com/wp-content/uploads/";
const PHOTOS=["2025/11/a76adb3d-8197-4ffa-b755-4b5ffdcbc13d.jpg","2025/11/3b0fd573-096e-48bd-b184-ce8c04d96571.jpg","2025/11/whatsapp-image-2023-08-28-at-14.47.44-1.jpeg","2025/11/4a6ebe05-92ca-4169-a4c8-80f57d867436.jpg","2025/11/whatsapp-image-2021-12-13-at-20.14.42-1-3.jpeg","2025/11/img_0536.jpeg","2025/12/f59cb803-b730-4736-abe9-f32f14a6af16.jpg","2025/11/whatsapp-image-2025-11-25-at-18.57.02-1.jpeg"];
/* ============================================== */
const $=id=>document.getElementById(id), page=document.body.dataset.page;
const NAV=[["index","Home"],["about","About"],["music","Music"],["videos","Videos"],["shows","Shows"],["photos","Photos"]];
$("hd").innerHTML=`<nav aria-label="Main"><div class="links">${NAV.map(([p,n])=>`<a href="${p}.html"${p===page?' aria-current="page"':""}>${n}</a>`).join("")}</div><button id="theme" aria-label="Switch light or dark theme">Theme</button><a class="cta" href="contact.html">Book</a></nav>`;
$("ft").innerHTML=`© ${new Date().getFullYear()} Ivo de Souza. Lisbon, Portugal.`;
$("theme").onclick=()=>{const r=document.documentElement,dark=getComputedStyle(r).getPropertyValue("--bg").trim()==="#0d0e13";r.dataset.theme=dark?"light":"dark"};

const dt=d=>new Date(d+"T12:00:00");
const row=s=>`<div class="show"><div class="d"><b>${dt(s.date).getDate()}</b><span>${dt(s.date).toLocaleDateString("en-GB",{month:"short",year:"numeric"})}</span></div><div><h3>${s.venue}</h3><p>${s.time?s.time+" · ":""}${s.city}</p></div>${s.ticket?`<a class="btn" href="${s.ticket}" target="_blank" rel="noopener">Tickets</a>`:""}</div>`;
const today=new Date().toISOString().slice(0,10),sorted=[...SHOWS].sort((a,b)=>a.date.localeCompare(b.date));
const nx=sorted.filter(s=>s.date>=today),old=sorted.filter(s=>s.date<today).reverse();
const names={spotify:"Spotify",apple:"Apple Music",youtube:"YouTube",instagram:"Instagram",tiktok:"TikTok",facebook:"Facebook"};
const socials=Object.keys(names).filter(k=>LINKS[k]).map(k=>`<a href="${LINKS[k]}" target="_blank" rel="noopener">${names[k]}</a>`).join("");

if(page==="index"&&nx.length){const s=nx[0];$("nextname").textContent=s.venue;$("nextinfo").textContent=dt(s.date).toLocaleDateString("en-GB",{weekday:"short",day:"numeric",month:"long"})+" · "+s.city}
if(page==="shows"){$("next").innerHTML=nx.length?nx.map(row).join(""):'<p class="tbd">New dates coming soon. To book Ivo for your venue, go to the Book page.</p>';$("past").innerHTML=old.map(row).join("");$("pastbox").hidden=!old.length}
if(page==="music"||page==="contact"){const el=$("social");if(el)el.innerHTML=socials}
if(page==="photos"){const lb=$("lb"),lbi=$("lbimg");
 PHOTOS.forEach((p,i)=>{const b=document.createElement("button");b.setAttribute("aria-label","Open photo "+(i+1));b.innerHTML=`<img loading="lazy" src="${U+p}" alt="Ivo de Souza photo ${i+1}">`;b.onclick=()=>{lbi.src=U+p;lb.showModal()};$("gallery").appendChild(b)});
 lb.addEventListener("click",e=>{if(e.target===lb)lb.close()})}
if(page==="contact")$("form").addEventListener("submit",e=>{e.preventDefault();const f=new FormData(e.target);
 location.href="mailto:ivosouza89@gmail.com?subject="+encodeURIComponent("Booking enquiry from "+f.get("name"))+"&body="+encodeURIComponent(f.get("message")+"\n\nFrom: "+f.get("name")+" ("+f.get("email")+")")});
