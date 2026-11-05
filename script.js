/* ==========================================================================
   IA Generativa - Script principal
   Interactividad, animaciones y renderizado de contenido
   ========================================================================== */

(() => {
  'use strict';

  // ------------------------------------------------------------------
  // Datos (extraídos de apuntes.md)
  // ------------------------------------------------------------------
  const HISTORIA = [
    { anio: 1950, evento: 'Test de Turing', desc: 'Alan Turing publica "Computing Machinery and Intelligence" y propone el test de Turing.' },
    { anio: 1956, evento: 'Nace el término IA', desc: 'Conferencia de Dartmouth: se acuña el término "inteligencia artificial".' },
    { anio: 1986, evento: 'Retropropagación', desc: 'Se populariza el backpropagation, clave para entrenar redes neuronales profundas.' },
    { anio: 2012, evento: 'AlexNet', desc: 'AlexNet gana ImageNet y arranca el auge del deep learning.' },
    { anio: 2014, evento: 'GANs', desc: 'Ian Goodfellow presenta las redes generativas antagónicas (GAN).' },
    { anio: 2017, evento: 'Transformer', desc: 'Google publica "Attention Is All You Need": nace la arquitectura Transformer.' },
    { anio: 2020, evento: 'GPT-3', desc: 'GPT-3 demuestra generación de texto coherente a gran escala.' },
    { anio: 2022, evento: 'IA generativa masiva', desc: 'DALL·E 2, Stable Diffusion y ChatGPT llevan la IA generativa al público general.' },
  ];

  const COMPONENTES = [
    { term: 'Tokens', def: 'El modelo no lee letras ni palabras completas, sino fragmentos. Una palabra corta = 1 token; una larga = varios.' },
    { term: 'Predicción del siguiente token', def: 'Su tarea básica: calcular qué token es más probable tras los anteriores. Repitiendo esto, genera frases y párrafos.' },
    { term: 'Atención (Transformer)', def: 'Permite "mirar" todas las partes relevantes del texto previo al elegir cada token, no solo la última palabra.' },
    { term: 'Ventana de contexto', def: 'Cantidad máxima de texto que el modelo puede tener presente a la vez. Si se pasa, olvida lo inicial.' },
    { term: 'Temperatura', def: 'Controla aleatoriedad: baja = respuestas estables/predecibles; alta = respuestas variadas/creativas.' },
  ];

  const ETAPAS = [
    { num: 1, title: 'Preentrenamiento', desc: 'El modelo lee cantidades masivas de texto y aprende a predecir el siguiente token. Etapa más costosa.' },
    { num: 2, title: 'Ajuste fino (fine-tuning)', desc: 'Se entrena con ejemplos de conversaciones y tareas para que aprenda a seguir instrucciones.' },
    { num: 3, title: 'RLHF', desc: 'Personas califican respuestas; el modelo se ajusta para dar las consideradas más útiles y seguras.' },
  ];

  const LIMITE = [
    { title: 'Alucinaciones', desc: 'Inventa datos, citas o fuentes con seguridad, porque busca lo plausible, no lo verdadero.' },
    { title: 'Sesgos', desc: 'Aprende de textos humanos y puede repetir prejuicios.' },
    { title: 'Fecha de corte', desc: 'No conoce eventos posteriores a su entrenamiento (salvo que use búsqueda externa).' },
    { title: 'No entiende como una persona', desc: 'Imita patrones de lenguaje. Siempre verifica sus resultados.' },
  ];

  const CLAVES = [
    { quote: 'La IA generativa se basa en la arquitectura Transformer (2017).', takeaway: 'Arquitectura base' },
    { quote: 'Un modelo aprende patrones y los usa para predecir qué sigue.', takeaway: 'Predicción de token' },
    { quote: 'El texto se procesa en tokens y cabe en una ventana de contexto limitada.', takeaway: 'Límite de entrada' },
    { quote: 'Se crea en tres etapas: preentrenamiento → ajuste fino → retroalimentación humana.', takeaway: 'Ciclo de creación' },
    { quote: 'Puede alucinar: verifica siempre lo que dice.', takeaway: 'Verificación humana' },
  ];

  // ------------------------------------------------------------------
  // Utilidades
  // ------------------------------------------------------------------
  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => Array.from(document.querySelectorAll(sel));

  const clamp = (n, min, max) => Math.min(Math.max(n, min), max);

  // ------------------------------------------------------------------
  // 1. Navegación móvil
  // ------------------------------------------------------------------
  const navToggle = $('#nav-toggle');
  const navLinks = $('#nav-links');

  navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', !expanded);
    navLinks.classList.toggle('open');
  });

  // Cerrar menú al hacer click en un enlace
  $$('.nav__link').forEach((link) => {
    link.addEventListener('click', () => {
      navToggle.setAttribute('aria-expanded', 'false');
      navLinks.classList.remove('open');
    });
  });

  // Cambiar estilo del navbar al hacer scroll
  let lastScrollY = window.scrollY;
  const nav = $('#nav');

  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    
    // Estado scrolled para fondo más sólido
    if (currentScrollY > 20) {
      nav.classList.add('nav--scrolled');
    } else {
      nav.classList.remove('nav--scrolled');
    }
    
    // Ocultar al bajar, mostrar al subir
    if (currentScrollY > 50 && currentScrollY > lastScrollY) {
      nav.style.transform = 'translateY(-100%)';
    } else {
      nav.style.transform = 'translateY(0)';
    }
    lastScrollY = currentScrollY;
  }, { passive: true });

  // ------------------------------------------------------------------
  // 2. Barra de progreso de lectura
  // ------------------------------------------------------------------
  const progressBar = $('#progress-bar');

  const updateProgress = () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = height ? (winScroll / height) * 100 : 0;
    progressBar.style.width = `${clamp(scrolled, 0, 100)}%`;
  };

  window.addEventListener('scroll', updateProgress, { passive: true });

  // ------------------------------------------------------------------
  // 3. Botón "Volver arriba"
  // ------------------------------------------------------------------
  const backToTop = $('#back-to-top');

  const toggleBackToTop = () => {
    if (window.scrollY > 400) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  };

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  window.addEventListener('scroll', toggleBackToTop, { passive: true });

  // ------------------------------------------------------------------
  // 4. Animaciones al entrar al viewport (Intersection Observer)
  // ------------------------------------------------------------------
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -10% 0px',
    threshold: 0.1,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observar elementos con data-animate
  $$('[data-animate]').forEach((el) => observer.observe(el));

  // Observar tarjetas dinámicas (timeline, componentes, etc.)
  const observeCards = () => {
    $$('.timeline-item, .card, .component-card, .stage-card, .limit-card, .key-idea').forEach((el) => {
      observer.observe(el);
    });
  };

  // ------------------------------------------------------------------
  // 5. Renderizado de Timeline (Historia)
  // ------------------------------------------------------------------
  const renderTimeline = () => {
    const container = $('#timeline');
    if (!container) return;

    const fragment = document.createDocumentFragment();

    HISTORIA.forEach((item, index) => {
      const article = document.createElement('article');
      article.className = 'timeline-item';
      article.setAttribute('data-animate', 'fade-up');
      article.setAttribute('data-delay', index * 100);
      article.innerHTML = `
        <div class="timeline__marker" aria-hidden="true"></div>
        <div class="timeline__content">
          <span class="timeline__year">${item.anio}</span>
          <h4 class="timeline__event">${item.evento}</h4>
          <p class="timeline__desc">${item.desc}</p>
        </div>
      `;
      fragment.appendChild(article);
    });

    container.appendChild(fragment);
    observeCards();
  };

  // ------------------------------------------------------------------
  // 6. Renderizado de Componentes (LLM)
  // ------------------------------------------------------------------
  const renderComponentes = () => {
    const container = $('#components-grid');
    if (!container) return;

    const fragment = document.createDocumentFragment();

    COMPONENTES.forEach((item, index) => {
      const card = document.createElement('div');
      card.className = 'component-card';
      card.setAttribute('data-animate', 'fade-up');
      card.setAttribute('data-delay', index * 80);
      card.innerHTML = `
        <span class="component__term">${item.term}</span>
        <p class="component__def">${item.def}</p>
      `;
      fragment.appendChild(card);
    });

    container.appendChild(fragment);
    observeCards();
  };

  // ------------------------------------------------------------------
  // 7. Carrusel de Etapas (3 etapas de creación)
  // ------------------------------------------------------------------
  let currentStage = 0;

  const renderEtapas = () => {
    const track = $('#stages-track');
    const navContainer = $('#stages-nav');
    if (!track || !navContainer) return;

    const trackFragment = document.createDocumentFragment();
    const navFragment = document.createDocumentFragment();

    ETAPAS.forEach((etapa, index) => {
      // Tarjeta de etapa
      const card = document.createElement('div');
      card.className = `stage-card ${index === 0 ? 'active' : ''}`;
      card.setAttribute('data-animate', 'fade-up');
      card.setAttribute('data-delay', index * 100);
      card.innerHTML = `
        <span class="stage__num">Etapa ${etapa.num}</span>
        <h4 class="stage__title">${etapa.title}</h4>
        <p class="stage__desc">${etapa.desc}</p>
      `;
      trackFragment.appendChild(card);

      // Botón de navegación
      const btn = document.createElement('button');
      btn.className = `stage-btn ${index === 0 ? 'active' : ''}`;
      btn.setAttribute('role', 'tab');
      btn.setAttribute('aria-selected', index === 0 ? 'true' : 'false');
      btn.setAttribute('aria-label', `Ir a etapa ${etapa.num}`);
      btn.addEventListener('click', () => {
        currentStage = index;
        updateStage();
      });
      navFragment.appendChild(btn);
    });

    track.appendChild(trackFragment);
    navContainer.appendChild(navFragment);
    observeCards();
  };

  const updateStage = () => {
    const cards = $$('.stage-card');
    const btns = $$('.stage-btn');

    cards.forEach((card, index) => {
      card.classList.toggle('active', index === currentStage);
    });

    btns.forEach((btn, index) => {
      btn.classList.toggle('active', index === currentStage);
      btn.setAttribute('aria-selected', index === currentStage ? 'true' : 'false');
    });
  };

  // ------------------------------------------------------------------
  // 8. Renderizado de Límites
  // ------------------------------------------------------------------
  const renderLimites = () => {
    const container = $('#limits-grid');
    if (!container) return;

    const fragment = document.createDocumentFragment();

    LIMITE.forEach((item, index) => {
      const card = document.createElement('div');
      card.className = 'limit-card';
      card.setAttribute('data-animate', 'fade-up');
      card.setAttribute('data-delay', index * 80);
      card.innerHTML = `
        <div class="limit__icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
        </div>
        <h4 class="limit__title">${item.title}</h4>
        <p class="limit__desc">${item.desc}</p>
      `;
      fragment.appendChild(card);
    });

    container.appendChild(fragment);
    observeCards();
  };

  // ------------------------------------------------------------------
  // 9. Renderizado de Ideas clave
  // ------------------------------------------------------------------
  const renderClaves = () => {
    const container = $('#key-ideas');
    if (!container) return;

    const fragment = document.createDocumentFragment();

    CLAVES.forEach((item, index) => {
      const card = document.createElement('div');
      card.className = 'key-idea';
      card.setAttribute('data-animate', 'fade-up');
      card.setAttribute('data-delay', index * 80);
      card.innerHTML = `
        <p class="key-idea__quote">"${item.quote}"</p>
        <span class="key-idea__takeaway">${item.takeaway}</span>
      `;
      fragment.appendChild(card);
    });

    container.appendChild(fragment);
    observeCards();
  };

  // ------------------------------------------------------------------
  // 10. Visualizador de Tokens interactivo
  // ------------------------------------------------------------------
  const tokenizerInput = $('#tokenizer-input');
  const tokenizerOutput = $('#tokenizer-output');
  const tokenCountEl = $('#token-count');
  const charCountEl = $('#char-count');

  // Tokenización simple: split por espacios y puntuación, manteniendo tokens significativos
  const tokenize = (texto) => {
    if (!texto || texto.trim() === '') return [];
    // Divide por espacios, pero mantiene signos de puntuación adjuntos como parte del token
    // para visualización didáctica simple
    return texto.trim().split(/\s+/).filter(Boolean);
  };

  const renderTokens = () => {
    const texto = tokenizerInput.value;
    const tokens = tokenize(texto);

    // Limpiar output
    tokenizerOutput.innerHTML = '';

    if (tokens.length === 0) {
      const placeholder = document.createElement('span');
      placeholder.className = 'tokenizer-demo__placeholder';
      placeholder.textContent = 'Los tokens aparecerán aquí';
      tokenizerOutput.appendChild(placeholder);
    } else {
      tokens.forEach((token, index) => {
        const el = document.createElement('span');
        el.className = 'token';
        el.textContent = token;
        el.style.animationDelay = `${index * 40}ms`;
        tokenizerOutput.appendChild(el);
      });
    }

    tokenCountEl.textContent = `${tokens.length} ${tokens.length === 1 ? 'token' : 'tokens'}`;
    charCountEl.textContent = `${texto.length} caracter${texto.length !== 1 ? 'es' : ''}`;
  };

  if (tokenizerInput) {
    tokenizerInput.addEventListener('input', renderTokens);
  }

  // ------------------------------------------------------------------
  // 11. Canvas de fondo animado (red neuronal sutil)
  // ------------------------------------------------------------------
  const canvas = $('#bg-canvas');
  const ctx = canvas.getContext('2d');

  let width, height;
  let nodes = [];
  let links = [];

  const resizeCanvas = () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  };

  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  class Node {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.4;
      this.vy = (Math.random() - 0.5) * 0.4;
      this.radius = Math.random() * 3 + 1;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(15, 191, 62, 0.15)';
      ctx.fill();
    }
  }

  const initNodes = () => {
    nodes = [];
    const count = Math.min(40, Math.floor((width * height) / 15000));
    for (let i = 0; i < count; i++) {
      nodes.push(new Node());
    }
    computeLinks();
  };

  const computeLinks = () => {
    links = [];
    const maxDist = 180;
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < maxDist) {
          links.push({ i, j, dist, maxDist });
        }
      }
    }
  };

  const drawCanvas = () => {
    ctx.clearRect(0, 0, width, height);

    nodes.forEach((node) => {
      node.update();
      node.draw();
    });

    links.forEach((link) => {
      const n1 = nodes[link.i];
      const n2 = nodes[link.j];
      const opacity = 1 - link.dist / link.maxDist;
      ctx.beginPath();
      ctx.moveTo(n1.x, n1.y);
      ctx.lineTo(n2.x, n2.y);
      ctx.strokeStyle = `rgba(15, 191, 62, ${opacity * 0.25})`;
      ctx.lineWidth = 0.8;
      ctx.stroke();
    });

    requestAnimationFrame(drawCanvas);
  };

  initNodes();
  drawCanvas();

  // ------------------------------------------------------------------
  // 12. Inicializar todo el contenido
  // ------------------------------------------------------------------
  renderTimeline();
  renderComponentes();
  renderEtapas();
  renderLimites();
  renderClaves();

  // Ejecutar renderTokens una vez al cargar para estado inicial
  renderTokens();

})();