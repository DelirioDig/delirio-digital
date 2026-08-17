
(function(){
  const page=document.getElementById("page");
  const pageWrap=document.getElementById("pageWrap");
  function scalePage(){
    if(!page || !pageWrap) return;
    const scale=Math.min(1,window.innerWidth/1000);
    document.documentElement.style.setProperty("--page-scale",scale);
    requestAnimationFrame(()=>pageWrap.style.height=(page.offsetHeight*scale)+"px");
  }
  window.addEventListener("resize",scalePage);
  window.addEventListener("load",scalePage);
  scalePage();

  const now=new Date(), start=new Date(2026,3,28);
  const dayNumber=Math.floor((now-start)/(1000*60*60*24))+1;
  const months=["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
  const days=["Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado"];
  const date=document.getElementById("fechaTexto");
  if(date) date.textContent=`${months[now.getMonth()]} ${now.getDate()}, ${now.getFullYear()} // Día ${dayNumber} // ${days[now.getDay()]}`;

  const theme=document.getElementById("themeButton");
  function syncTheme(){
    if(!theme)return;
    theme.textContent=document.body.classList.contains("dark")?"☀":"☼";
  }
  if(localStorage.getItem("delirio-tema")==="dark") document.body.classList.add("dark");
  syncTheme();
  theme?.addEventListener("click",()=>{
    document.body.classList.toggle("dark");
    localStorage.setItem("delirio-tema",document.body.classList.contains("dark")?"dark":"light");
    syncTheme();
  });

  const menu=document.getElementById("menuPanel");
  document.getElementById("menuButton")?.addEventListener("click",()=>menu?.classList.add("open"));
  document.getElementById("menuClose")?.addEventListener("click",()=>menu?.classList.remove("open"));

  const searchInput=document.getElementById("searchInput");
  const searchDropdown=document.getElementById("searchDropdown");
  const searchable=[...document.querySelectorAll(".searchable")];
  function showSearch(){
    if(!searchDropdown || !searchInput)return;
    const q=searchInput.value.trim().toLowerCase();
    if(!q){searchDropdown.classList.remove("open");return;}
    const results=searchable.filter(x=>x.textContent.toLowerCase().includes(q)).map(x=>{
      const title=x.dataset.title || x.querySelector(".title")?.innerText?.replace("★","").trim() || x.querySelector("h2")?.innerText || "";
      const author=x.dataset.author || x.querySelector(".author")?.innerText?.trim() || "";
      const href=x.dataset.href || x.querySelector("a")?.getAttribute("href") || "#";
      return {title,author,href};
    });
    searchDropdown.innerHTML=results.length
      ? results.map(r=>`<a href="${r.href}"><strong>${r.title}</strong><span>${r.author}</span></a>`).join("")
      : '<div class="search-no">NO HAY RESULTADOS</div>';
    searchDropdown.classList.add("open");
  }
  searchInput?.addEventListener("input",showSearch);
  searchInput?.addEventListener("keydown",e=>{if(e.key==="Enter")showSearch()});
  document.getElementById("searchButton")?.addEventListener("click",showSearch);
  document.getElementById("bannerSearch")?.addEventListener("click",()=>{
    searchInput?.focus();
    searchInput?.scrollIntoView({behavior:"smooth",block:"center"});
  });

  // Galería únicamente de INICIO. No se usa en MINI.
  const modal=document.getElementById("galleryModal");
  const modalImage=document.getElementById("galleryModalImage");
  const caption=document.getElementById("galleryCaption");
  document.querySelectorAll(".gallery-grid img").forEach(img=>{
    img.addEventListener("click",()=>{
      if(!modal)return;
      modalImage.src=img.src;
      modalImage.alt=img.alt;
      const author=img.dataset.author || "";
      caption.innerHTML=`<strong>${img.dataset.title || img.alt}</strong><span>${author}</span>`;
      modal.classList.add("open");
    });
  });
  document.getElementById("galleryClose")?.addEventListener("click",()=>modal?.classList.remove("open"));
  modal?.addEventListener("click",e=>{if(e.target===modal)modal.classList.remove("open")});

  // Tamaño de letra en entradas.
  const articleText=document.getElementById("articleText");
  let fontSize=18;
  document.getElementById("fontPlus")?.addEventListener("click",()=>{
    fontSize=Math.min(28,fontSize+2); articleText.style.fontSize=fontSize+"px"; scalePage();
  });
  document.getElementById("fontMinus")?.addEventListener("click",()=>{
    fontSize=Math.max(14,fontSize-2); articleText.style.fontSize=fontSize+"px"; scalePage();
  });

  // Comentarios: conserva el formulario que ya utilizabas.
  window.enviado=function(){
    setTimeout(()=>{
      const msg=document.getElementById("mensaje");
      const form=document.querySelector(".comment-form");
      if(msg)msg.textContent="Comentario enviado.";
      form?.reset();
    },500);
  };

  // Acceso de demostración para AUTORES / REVISIÓN.
  document.querySelectorAll(".demo-login").forEach(form=>{
    form.addEventListener("submit",e=>{
      e.preventDefault();
      const user=form.querySelector("[name=user]")?.value.trim();
      const pass=form.querySelector("[name=pass]")?.value;
      const msg=form.querySelector(".status");
      const expected=form.dataset.password || "DELIRIO";
      if(pass===expected){
        sessionStorage.setItem("delirio-auth","1");
        if(form.dataset.redirect) window.location.href=form.dataset.redirect;
        else if(msg) msg.textContent="Acceso correcto.";
      }else if(msg){
        msg.textContent="Clave incorrecta.";
      }
    });
  });

  document.querySelectorAll(".review-open").forEach(btn=>{
    btn.addEventListener("click",()=>{
      document.getElementById("reviewEditor")?.classList.add("open");
      scalePage();
    });
  });
})();
