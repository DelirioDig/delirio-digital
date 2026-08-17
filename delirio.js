(function(){

  /* =========================================================
     ESCALA GENERAL DE LA PÁGINA
     PC = 1000 px
     CELULAR = escala proporcional
     ========================================================= */

  const page = document.getElementById("page");
  const pageWrap = document.getElementById("pageWrap");

  function scalePage(){
    if(!page || !pageWrap) return;

    const baseWidth = 1000;
    const viewportWidth = window.innerWidth;

    const scale = Math.min(1, viewportWidth / baseWidth);

    document.documentElement.style.setProperty(
      "--page-scale",
      scale
    );

    requestAnimationFrame(()=>{
      pageWrap.style.height =
        (page.offsetHeight * scale) + "px";
    });
  }

  window.addEventListener("resize", scalePage);
  window.addEventListener("orientationchange", scalePage);
  window.addEventListener("load", scalePage);

  scalePage();


  /* =========================================================
     MINI — CONTENIDO GLOBAL
     
     TODO el contenido de MINI se modifica AQUÍ.
     
     Cualquier página que tenga:
     
     <aside class="mini"></aside>
     
     recibirá automáticamente este contenido.
     ========================================================= */

  const MINI = {

    portada: {
      imagen: "imagenes/PORTADA-AGO.png",
      alt: "Portada de agosto",
      titulo: "AGOSTO 2026"
    },

    colaboracion: {
      titulo: "COLABORACIÓN",
      texto: "Desorden mental y una pizca de creatividad",
      autor: "Santiago Riojas",
      enlace: "SR_01.html"
    },

    instagram: {
      enlace: "https://www.instagram.com/delirio_revista",
      nombre: "Delirio",
      texto: "EN INSTAGRAM",
      usuario: "@Delirio_revista"
    },

    poesia: {
      titulo: "Birdie",
      texto: "Si vuelves, si me buscas, si regresas, no importa cuando, ni como, dime donde, que solo quiero eso. Yo dejaré que me encuentres. Casi no le tengo miedo a nada; pero nunca dejar de sentir esto me tiene aterrada. Sé que mereces el amor que yo te ofrezco, pero yo, no merezco el fallido intento de amor que te agradezco; aún así vuelve, que siento que me ahogo.",
      autor: "Natalia Regnier",
      enlace: "NR_01.html"
    },

    anuncio: {
      texto: "ANUNCIO"
    },

    cumpleaños: {
      dia: "16",
      mes: "AGOSTO",
      nombre: "DAVID PAREDES HERNÁNDEZ",
      texto: "CUMPLEAÑOS<br>CREADOR DE ESTA REVISTA"
    },

    acceso: {
      autores: "autores.html",
      revision: "agregar-entrada.html"
    }

  };


  function cargarMini(){

    document.querySelectorAll(".mini").forEach(mini => {

      mini.innerHTML = `

        <img
          class="cover"
          src="${MINI.portada.imagen}"
          alt="${MINI.portada.alt}"
        >

        <h3 class="mini-title">
          ${MINI.portada.titulo}
        </h3>


        <a
          class="mini-box mini-link"
          href="${MINI.colaboracion.enlace}"
        >
          <h3>${MINI.colaboracion.titulo}</h3>

          <p>
            <span class="star">★</span>${MINI.colaboracion.texto}
          </p>

          <div class="mini-author">
            ${MINI.colaboracion.autor}
          </div>
        </a>


        <a
          class="instagram"
          href="${MINI.instagram.enlace}"
          target="_blank"
          rel="noopener"
        >
          <strong>${MINI.instagram.nombre}</strong>
          <span>${MINI.instagram.texto}</span>
          <span>${MINI.instagram.usuario}</span>
        </a>


        <a
          class="mini-box mini-link"
          href="${MINI.poesia.enlace}"
        >
          <h3><em>${MINI.poesia.titulo}</em></h3>

          <p>
            ${MINI.poesia.texto}
          </p>

          <div class="mini-author">
            ${MINI.poesia.autor}
          </div>
        </a>


        <div class="ad">
          ${MINI.anuncio.texto}
        </div>


        <div class="birthday">

          <div class="day">
            ${MINI.cumpleaños.dia}
          </div>

          <div class="month">
            ${MINI.cumpleaños.mes}
          </div>

          <div class="name">
            ${MINI.cumpleaños.nombre}
          </div>

          <small>
            ${MINI.cumpleaños.texto}
          </small>

        </div>


        <div class="mini-access">

          <a href="${MINI.acceso.autores}">
            AUTORES
          </a>

          <a href="${MINI.acceso.revision}">
            REVISIÓN
          </a>

        </div>

      `;

    });

  }

  cargarMini();


  /* =========================================================
     FECHA AUTOMÁTICA
     ========================================================= */

  const now = new Date();
  const start = new Date(2026,3,28);

  const dayNumber =
    Math.floor(
      (now-start)/(1000*60*60*24)
    ) + 1;

  const months = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre"
  ];

  const days = [
    "Domingo",
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado"
  ];

  const date =
    document.getElementById("fechaTexto");

  if(date){

    date.textContent =
      `${months[now.getMonth()]} ${now.getDate()}, ${now.getFullYear()} // Día ${dayNumber} // ${days[now.getDay()]}`;

  }


  /* =========================================================
     TEMA CLARO / OSCURO
     ========================================================= */

  const theme =
    document.getElementById("themeButton");

  function syncTheme(){

    if(!theme) return;

    theme.textContent =
      document.body.classList.contains("dark")
        ? "☀"
        : "☼";

  }

  if(
    localStorage.getItem("delirio-tema")
    ===
    "dark"
  ){

    document.body.classList.add("dark");

  }

  syncTheme();

  theme?.addEventListener("click",()=>{

    document.body.classList.toggle("dark");

    localStorage.setItem(
      "delirio-tema",
      document.body.classList.contains("dark")
        ? "dark"
        : "light"
    );

    syncTheme();

  });


  /* =========================================================
     MENÚ
     ========================================================= */

  const menu =
    document.getElementById("menuPanel");

  document
    .getElementById("menuButton")
    ?.addEventListener(
      "click",
      ()=>{
        menu?.classList.add("open");
      }
    );

  document
    .getElementById("menuClose")
    ?.addEventListener(
      "click",
      ()=>{
        menu?.classList.remove("open");
      }
    );


  /* =========================================================
     BUSCADOR
     ========================================================= */

  const searchInput =
    document.getElementById("searchInput");

  const searchDropdown =
    document.getElementById("searchDropdown");

  const searchable = [
    ...document.querySelectorAll(".searchable")
  ];


  function showSearch(){

    if(
      !searchDropdown ||
      !searchInput
    ) return;

    const q =
      searchInput.value
        .trim()
        .toLowerCase();

    if(!q){

      searchDropdown.classList.remove("open");

      return;

    }


    const results =
      searchable
        .filter(
          x =>
            x.textContent
              .toLowerCase()
              .includes(q)
        )
        .map(x=>{

          const title =
            x.dataset.title ||
            x.querySelector(".title")
              ?.innerText
              ?.replace("★","")
              .trim() ||
            x.querySelector("h2")
              ?.innerText ||
            "";

          const author =
            x.dataset.author ||
            x.querySelector(".author")
              ?.innerText
              ?.trim() ||
            "";

          const href =
            x.dataset.href ||
            x.querySelector("a")
              ?.getAttribute("href") ||
            "#";

          return {
            title,
            author,
            href
          };

        });


    searchDropdown.innerHTML =
      results.length

        ?

        results
          .map(
            r =>
              `<a href="${r.href}">
                <strong>${r.title}</strong>
                <span>${r.author}</span>
              </a>`
          )
          .join("")

        :

        '<div class="search-no">NO HAY RESULTADOS</div>';


    searchDropdown.classList.add("open");

  }


  searchInput
    ?.addEventListener(
      "input",
      showSearch
    );

  searchInput
    ?.addEventListener(
      "keydown",
      e=>{
        if(e.key==="Enter")
          showSearch();
      }
    );

  document
    .getElementById("searchButton")
    ?.addEventListener(
      "click",
      showSearch
    );

  document
    .getElementById("bannerSearch")
    ?.addEventListener(
      "click",
      ()=>{
        searchInput?.focus();

        searchInput?.scrollIntoView({
          behavior:"smooth",
          block:"center"
        });

      }
    );


  /* =========================================================
     GALERÍA — ÚNICAMENTE INICIO
     ========================================================= */

  const modal =
    document.getElementById("galleryModal");

  const modalImage =
    document.getElementById(
      "galleryModalImage"
    );

  const caption =
    document.getElementById(
      "galleryCaption"
    );


  document
    .querySelectorAll(".gallery-grid img")
    .forEach(img=>{

      img.addEventListener(
        "click",
        ()=>{

          if(!modal) return;

          modalImage.src =
            img.src;

          modalImage.alt =
            img.alt;

          const author =
            img.dataset.author || "";

          caption.innerHTML =
            `<strong>${img.dataset.title || img.alt}</strong><span>${author}</span>`;

          modal.classList.add("open");

        }
      );

    });


  document
    .getElementById("galleryClose")
    ?.addEventListener(
      "click",
      ()=>{
        modal?.classList.remove("open");
      }
    );


  modal?.addEventListener(
    "click",
    e=>{
      if(e.target===modal)
        modal.classList.remove("open");
    }
  );


  /* =========================================================
     TAMAÑO DE LETRA EN ENTRADAS
     ========================================================= */

  const articleText =
    document.getElementById("articleText");

  let fontSize = 18;


  document
    .getElementById("fontPlus")
    ?.addEventListener(
      "click",
      ()=>{

        fontSize =
          Math.min(
            28,
            fontSize+2
          );

        if(articleText)
          articleText.style.fontSize =
            fontSize+"px";

        scalePage();

      }
    );


  document
    .getElementById("fontMinus")
    ?.addEventListener(
      "click",
      ()=>{

        fontSize =
          Math.max(
            14,
            fontSize-2
          );

        if(articleText)
          articleText.style.fontSize =
            fontSize+"px";

        scalePage();

      }
    );


  /* =========================================================
     COMENTARIOS
     ========================================================= */

  window.enviado=function(){

    setTimeout(()=>{

      const msg =
        document.getElementById("mensaje");

      const form =
        document.querySelector(
          ".comment-form"
        );

      if(msg)
        msg.textContent =
          "Comentario enviado.";

      form?.reset();

    },500);

  };


  /* =========================================================
     ACCESO DE DEMOSTRACIÓN
     ========================================================= */

  document
    .querySelectorAll(".demo-login")
    .forEach(form=>{

      form.addEventListener(
        "submit",
        e=>{

          e.preventDefault();

          const user =
            form
              .querySelector("[name=user]")
              ?.value
              .trim();

          const pass =
            form
              .querySelector("[name=pass]")
              ?.value;

          const msg =
            form.querySelector(".status");

          const expected =
            form.dataset.password ||
            "DELIRIO";


          if(pass===expected){

            sessionStorage.setItem(
              "delirio-auth",
              "1"
            );

            if(form.dataset.redirect)

              window.location.href =
                form.dataset.redirect;

            else if(msg)

              msg.textContent =
                "Acceso correcto.";

          }

          else if(msg){

            msg.textContent =
              "Clave incorrecta.";

          }

        }
      );

    });


  /* =========================================================
     REVISIÓN
     ========================================================= */

  document
    .querySelectorAll(".review-open")
    .forEach(btn=>{

      btn.addEventListener(
        "click",
        ()=>{

          document
            .getElementById("reviewEditor")
            ?.classList.add("open");

          scalePage();

        }
      );

    });


})();
