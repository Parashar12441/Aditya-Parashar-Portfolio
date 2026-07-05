/**
 * PORTFOLIO MAIN
 * Renders PORTFOLIO_DATA into the DOM, then wires up animation & interaction.
 */

const D = PORTFOLIO_DATA;
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ============================================================
   SVG ICON HELPER FOR BRANDS (Lucide deprecated brands)
   ============================================================ */

function getSocialIconHtml(iconName, extraClass = "w-4 h-4") {
  if (iconName === "github") {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-github ${extraClass}"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>`;
  }
  if (iconName === "linkedin") {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-linkedin ${extraClass}"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect width="4" height="12" x="2" y="9"></rect><circle cx="4" cy="4" r="2"></circle></svg>`;
  }
  return `<i data-lucide="${iconName}" class="${extraClass}"></i>`;
}

/* ============================================================
   RENDER: content injection from data.js
   ============================================================ */

function renderHero() {
  if (!document.getElementById("heroTaglineText")) return;
  // Tagline pill
  document.getElementById("heroTaglineText").textContent = D.hero.heroTagline || D.meta.tagline;

  // Headline with text-gradient on the last line
  document.getElementById("heroHeadline").innerHTML = D.hero.headline
    .map((line, i) => `<span class="${i === D.hero.headline.length - 1 ? 'text-gradient' : ''}">${line} </span>`)
    .join("");
  document.getElementById("heroSub").textContent = D.hero.sub;

  // Role pills
  const roles = D.hero.roles || D.meta.role.split(" · ");
  document.getElementById("heroRoles").innerHTML = roles.map(r =>
    `<span class="role-pill rounded-full px-3 py-1 text-xs text-white/60">${r}</span>`
  ).join("");

  // Hero social links
  const socials = [
    { key: "github", icon: "github", url: D.socials.github },
    { key: "linkedin", icon: "linkedin", url: D.socials.linkedin },
    { key: "leetcode", icon: "code-2", url: D.socials.leetcode },
    { key: "google", icon: "cloud", url: D.socials.googleDeveloper },
  ];
  document.getElementById("heroSocials").innerHTML = socials.map(s => `
    <a href="${s.url}" target="_blank" rel="noopener noreferrer" class="relative z-10 grid w-11 h-11 place-items-center rounded-full text-white/50 transition-all hover:-translate-y-0.5 hover:text-white" aria-label="${s.key}">
      ${getSocialIconHtml(s.icon, "w-4 h-4")}
    </a>
  `).join("");

  // Location
  document.getElementById("heroLocationText").textContent = D.meta.location;
}

function renderStats() {
  const statsEl = document.getElementById("heroStats");
  if (!statsEl) return;
  statsEl.innerHTML = D.hero.stats.map((s, i) => {
    if (s.label === "Certifications") {
      return `
      <a href="recognition.html" class="stat-card group relative block rounded-3xl p-6 text-center reveal-up">
        <!-- Glass Reflection -->
        <div class="absolute inset-0 bg-gradient-to-b from-white/[0.15] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-md pointer-events-none rounded-3xl transform translate-y-4 group-hover:translate-y-0"></div>
        <div class="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/10 to-transparent opacity-0 group-hover:opacity-50 rounded-t-3xl pointer-events-none transition-opacity duration-500"></div>
        
        <!-- Tooltip -->
        <div class="absolute -top-10 left-1/2 -translate-x-1/2 bg-white text-black px-3 py-1.5 rounded-full text-[10px] font-mono tracking-widest uppercase whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:-translate-y-1 z-20 pointer-events-none shadow-lg">
          View Wall
          <!-- little arrow -->
          <div class="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-white rotate-45"></div>
        </div>

        <div class="font-display text-4xl text-gradient relative z-10" data-counter data-target="${s.value}" data-suffix="${s.suffix}">0${s.suffix}</div>
        <div class="mt-1 text-xs uppercase tracking-widest text-white/40 font-mono relative z-10">${s.label}</div>
      </a>
      `;
    }
    return `
      <div class="stat-card rounded-3xl p-6 text-center reveal-up">
        <div class="font-display text-4xl text-gradient" data-counter data-target="${s.value}" data-suffix="${s.suffix}">0${s.suffix}</div>
        <div class="mt-1 text-xs uppercase tracking-widest text-white/40 font-mono">${s.label}</div>
      </div>
    `;
  }).join("");
}

function renderAbout() {
  const aboutEl = document.getElementById("aboutParagraphs");
  if (!aboutEl) return;
  aboutEl.innerHTML = D.about.paragraphs
    .map(p => `<p>${p}</p>`).join("");

  const focusEl = document.getElementById("focusGrid");
  if (focusEl) {
    focusEl.innerHTML = D.about.focusAreas.map(f => `
      <div class="glass-card rounded-2xl p-5">
        <h4 class="font-display text-base mb-1.5">${f.title}</h4>
        <p class="text-sm text-white/70 leading-relaxed">${f.detail}</p>
      </div>
    `).join("");
  }
}

function renderTimeline() {
  const eduEl = document.getElementById("educationList");
  if (!eduEl) return;
  eduEl.innerHTML = D.education.map(e => `
    <div class="relative reveal-up">
      <div class="timeline-node"></div>
      <p class="font-mono text-xs text-accent-blue mb-1" style="color:#4f7cff;">${e.period}</p>
      <h4 class="font-display text-lg text-white leading-snug">${e.degree}</h4>
      <p class="text-sm text-white/70 mt-1">${e.institution}</p>
      ${e.detail ? `<p class="text-sm text-white/60 mt-2 leading-relaxed">${e.detail}</p>` : ""}
    </div>
  `).join("");

  document.getElementById("experienceList").innerHTML = D.experience.map(e => `
    <div class="relative reveal-up">
      <div class="timeline-node"></div>
      <p class="font-mono text-xs text-accent-blue mb-1" style="color:#4f7cff;">${e.period}</p>
      <h4 class="font-display text-lg text-white leading-snug">${e.role}</h4>
      <p class="text-sm text-white/70 mt-1">${e.org} · ${e.type}</p>
      <ul class="mt-3 space-y-1.5">
        ${e.points.map(pt => `<li class="text-sm text-white/60 leading-relaxed flex gap-2"><span class="text-white/20">—</span><span>${pt}</span></li>`).join("")}
      </ul>
    </div>
  `).join("");
}

const ACCENT_ICON = { blue: "radar", emerald: "cpu", purple: "hotel", gold: "train-front" };

function renderProjects() {
  const projEl = document.getElementById("projectsGrid");
  if (!projEl) return;

  // Remove the grid classes to allow a vertical list
  projEl.classList.remove("grid", "md:grid-cols-2");
  // Ensure it's a flex column with gap for spacing the cards
  projEl.classList.add("flex", "flex-col", "gap-6");

  let projectsData = D.projects;
  if (projEl.classList.contains('home-truncate-projects')) {
    projectsData = projectsData.slice(0, 2);
  }

  projEl.innerHTML = projectsData.map((p, i) => {
    return `
        <div onclick="openImmersiveProject('${p.id}')" onkeydown="if(event.key==='Enter'||event.key===' ')this.click()" tabindex="0" role="button" aria-label="Open ${p.title} project" class="project-list-item group relative p-8 md:p-12 glass rounded-3xl border border-white/5 cursor-pointer overflow-hidden transition-all hover:bg-white/5 focus-visible:ring-2 focus-visible:ring-accent-emerald focus-visible:outline-none" data-reveal style="transition-delay: ${i * 0.05}s">
          <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
            <div>
              <p class="font-mono text-xs text-accent-${p.accent} mb-3 transition-transform duration-500 ease-out group-hover:translate-x-3">${p.period} — ${p.category}</p>
              <h3 class="font-display text-5xl md:text-7xl lg:text-8xl text-white/30 group-hover:text-white transition-all duration-500 ease-out group-hover:translate-x-6 tracking-tight">${p.title}</h3>
            </div>
            <div class="opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out -translate-x-8 group-hover:translate-x-0 flex items-center gap-3 text-white/60">
              <span class="font-mono text-sm tracking-widest uppercase">View Project</span>
              <i data-lucide="arrow-right" class="w-6 h-6"></i>
            </div>
          </div>
          <!-- Hover Background Glow -->
          <div class="absolute inset-0 bg-gradient-to-r from-accent-${p.accent}/0 via-accent-${p.accent}/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
        </div>
      `;
  }).join("");
}

window.openImmersiveProject = function (projectId) {
  const project = D.projects.find(p => p.id === projectId);
  if (!project) return;

  const hasMedia = project.media && (project.media.video || project.media.image);

  // 1. Create Immersive Viewer HTML
  const viewerHtml = `
    <div id="immersiveViewer" class="fixed inset-0 z-[9999999] flex flex-col pointer-events-auto" style="opacity: 0; backdrop-filter: blur(0px); -webkit-backdrop-filter: blur(0px);">
      <!-- Deep glass background -->
      <div class="absolute inset-0 bg-black/60"></div>
      
      <!-- Close Button -->
      <button id="closeImmersive" class="absolute top-8 right-8 z-50 w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors btn-magnetic" style="opacity: 0; transform: scale(0.8);">
        <i data-lucide="x" class="w-5 h-5"></i>
      </button>

      <!-- Content Container -->
      <div class="relative z-10 flex-1 flex flex-col md:flex-row overflow-hidden h-full">
        
        ${hasMedia ? `
        <!-- Media Side -->
        <div class="w-full md:w-3/5 h-[40vh] md:h-full relative flex items-center justify-center p-6 md:p-12 lg:p-16">
          <div id="immersiveMedia" class="w-full h-full rounded-3xl overflow-hidden relative shadow-2xl border border-white/10 bg-white/5" style="opacity: 0; transform: translateY(40px) scale(0.95);">
            ${project.media.video ?
        `<video src="${project.media.video}" autoplay loop muted playsinline class="w-full h-full object-cover"></video>` :
        `<img src="${project.media.image}" class="w-full h-full object-cover" loading="lazy" />`
      }
          </div>
        </div>
        ` : ''}

        <!-- Info Side -->
        <div class="w-full ${hasMedia ? 'md:w-2/5 h-[60vh] md:h-full overflow-y-auto' : 'h-full overflow-y-auto flex-1 items-center md:items-start text-center md:text-left mx-auto max-w-5xl'} flex flex-col justify-start md:justify-center p-6 md:p-12 lg:p-16 bg-gradient-to-t md:bg-gradient-to-l from-black/80 to-transparent">
          <div id="immersiveInfo" style="opacity: 0; transform: translateY(30px);" class="${!hasMedia ? 'w-full' : ''}">
            <div class="flex flex-wrap items-center ${!hasMedia ? 'justify-center md:justify-start' : ''} gap-3 mb-6">
              <span class="font-mono text-xs tracking-widest uppercase text-white/60 border border-white/10 rounded-full px-3 py-1.5">${project.status}</span>
              ${project.badge ? `<span class="font-mono text-xs tracking-widest uppercase text-amber-400 border border-amber-400/20 bg-amber-400/5 rounded-full px-3 py-1.5 flex items-center gap-2"><i data-lucide="${project.badge.icon}" class="w-3.5 h-3.5"></i>${project.badge.text}</span>` : ''}
            </div>
            
            <p class="font-mono text-sm text-accent-${project.accent} mb-3">${project.period} — ${project.category}</p>
            <h2 class="font-display text-5xl lg:text-7xl text-white mb-4 tracking-tight leading-none">${project.title}</h2>
            <p class="text-xl text-white/80 mb-8 font-light">${project.subtitle}</p>
            
            <p class="text-base text-white/60 leading-relaxed mb-10 max-w-lg">${project.description}</p>
            
            <h4 class="font-mono text-xs tracking-widest text-white/40 uppercase mb-4">Tech Stack</h4>
            <div id="immersiveTech" class="flex flex-wrap ${!hasMedia ? 'justify-center md:justify-start' : ''} gap-2">
              ${project.tech.map(t => `<span class="immersive-tech-tag inline-block font-mono text-xs text-white/80 border border-white/10 bg-white/5 rounded-full px-3 py-1.5" style="opacity: 0; transform: translateY(10px);">${t}</span>`).join("")}
            </div>

            <div class="flex flex-wrap ${!hasMedia ? 'justify-center md:justify-start' : ''} gap-4 mt-12" id="immersiveLinks" style="opacity: 0;">
              ${project.links && project.links.github ? `<a href="${project.links.github}" target="_blank" class="glass-card rounded-full px-6 py-3 text-sm text-white hover:text-white transition-colors flex items-center gap-2"><i data-lucide="github" class="w-4 h-4"></i> View Source</a>` : ''}
              ${project.links && project.links.demo ? `<a href="${project.links.demo}" target="_blank" class="glass-strong rounded-full px-6 py-3 text-sm text-accent-${project.accent} hover:text-white transition-colors flex items-center gap-2"><i data-lucide="external-link" class="w-4 h-4"></i> Live Demo</a>` : ''}
            </div>
          </div>
        </div>

      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', viewerHtml);
  lucide.createIcons();

  const viewer = document.getElementById("immersiveViewer");
  const closeBtn = document.getElementById("closeImmersive");

  if (typeof initMagnetic === 'function') {
    setTimeout(initMagnetic, 100);
  }

  // Prevent background scrolling
  document.body.style.overflow = "hidden";

  // GSAP Timeline
  const tl = gsap.timeline();

  // 1. Viewer Background & Blur
  tl.to(viewer, {
    opacity: 1,
    duration: 0.5,
    ease: "power2.out",
    onUpdate: function () {
      const progress = this.progress();
      viewer.style.backdropFilter = `blur(${progress * 40}px)`;
      viewer.style.webkitBackdropFilter = `blur(${progress * 40}px)`;
    }
  });

  if (hasMedia) {
    // 2. Media Image/Video scale up
    tl.to("#immersiveMedia", {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.8,
      ease: "power3.out"
    }, "-=0.2");
  }

  // 3. Info text slide up
  tl.to("#immersiveInfo", {
    opacity: 1,
    y: 0,
    duration: 0.6,
    ease: "power2.out"
  }, "-=0.6");

  // 4. Tech stack stagger
  tl.to(".immersive-tech-tag", {
    opacity: 1,
    y: 0,
    duration: 0.4,
    stagger: 0.05,
    ease: "back.out(1.5)"
  }, "-=0.3");

  // 5. Links fade in and button reveal
  tl.to("#immersiveLinks", {
    opacity: 1,
    duration: 0.4,
    ease: "power2.out"
  }, "-=0.2");

  tl.to(closeBtn, {
    opacity: 1,
    scale: 1,
    duration: 0.4,
    ease: "back.out(1.5)"
  }, "-=0.4");

  // Close logic
  const closeViewer = () => {
    tl.reverse().then(() => {
      viewer.remove();
      document.body.style.overflow = "";
    });
  };

  closeBtn.addEventListener("click", closeViewer);
};

function renderEvents() {
  const eventsEl = document.getElementById('eventsGrid') || document.getElementById('eventsList');
  if (!eventsEl) return;

  let eventsData = D.events;
  if (eventsEl.classList.contains('home-truncate-events')) {
    eventsData = eventsData.slice(0, 2);
  }

  eventsEl.innerHTML = eventsData.map((e, i) => {
    const isWinner = e.role && (e.role.toLowerCase().includes('winner') || e.role.toLowerCase().includes('first'));
    const cardStyle = isWinner ? 'border border-yellow-500/30 shadow-[0_0_15px_rgba(234,179,8,0.1)] hover:shadow-[0_0_25px_rgba(234,179,8,0.2)]' : 'border border-white/5 hover:bg-white/10';
    const roleStyle = isWinner ? 'text-yellow-400 bg-yellow-400/10 border border-yellow-400/20 px-2 py-0.5 rounded text-[10px]' : 'text-accent-blue';
    const roleIcon = isWinner ? '<i data-lucide=\'trophy\' class=\'w-3 h-3\'></i> ' : '';

    return `
      <div onclick="openImmersiveEvent('${e.id}')" onkeydown="if(event.key==='Enter'||event.key===' ')this.click()" tabindex="0" role="button" aria-label="Open ${e.title} event" class="block group glass rounded-3xl p-6 transition-all cursor-pointer ${cardStyle} focus-visible:ring-2 focus-visible:ring-accent-blue focus-visible:outline-none" data-reveal style="transition-delay: ${i * 0.05}s">
        <div class="flex flex-wrap items-center justify-between gap-4 mb-3">
          <span class="text-xs font-mono ${isWinner ? 'text-yellow-500/80 border-yellow-500/30 bg-yellow-500/5' : 'text-white/40 border-white/10'} border rounded-full px-2.5 py-1 flex items-center gap-1.5">${isWinner ? '<i data-lucide="award" class="w-3 h-3"></i>' : ''}${e.type}</span>
          <span class="text-xs font-mono text-white/40 flex items-center gap-2"><i data-lucide="map-pin" class="w-3.5 h-3.5"></i> ${e.location || 'Remote'}</span>
        </div>
        <div class="flex items-start justify-between gap-4 mb-2">
          <h3 class="font-display ${e.title.length > 50 ? 'text-lg md:text-xl leading-tight' : 'text-2xl'} group-hover:text-accent-blue transition-colors" style="--tw-text-opacity:1; color:var(--accent-blue, #4f7cff)">${e.title}</h3>
          <i data-lucide="expand" class="w-4 h-4 text-white/30 group-hover:text-white/80 transition-colors mt-1 shrink-0"></i>
        </div>
        <div class="text-sm font-mono text-white/50 mb-3 flex items-center gap-3 flex-wrap">
          <span class="flex items-center gap-2"><i data-lucide="calendar" class="w-3.5 h-3.5"></i> ${e.date}</span>
          ${e.role ? `<span class="${roleStyle}">${roleIcon}${e.role}</span>` : ''}
        </div>
        ${e.description ? `<p class="mt-2 text-white/60 leading-relaxed">${e.description}</p>` : ''}
      </div>
    `}).join('');
}

window.openImmersiveEvent = function (eventId) {
  const event = D.events.find(e => e.id === eventId);
  if (!event) return;

  const hasMedia = !!event.image || (event.images && event.images.length > 0);
  const mediaArray = event.images && event.images.length > 0 ? event.images : (event.image ? [event.image] : []);

  const viewerHtml = `
    <div id="immersiveViewer" class="fixed inset-0 flex items-center justify-center p-4 md:p-8 lg:p-12 pointer-events-auto" style="z-index: 9999999; opacity: 0; backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);">
      <div class="absolute inset-0 bg-black/40" id="closeImmersiveBg"></div>
      
      <div id="immersiveModal" class="relative w-full max-w-7xl max-h-[95vh] glass-strong rounded-3xl overflow-hidden flex flex-col md:flex-row shadow-2xl" style="opacity: 0; transform: translateY(30px) scale(0.95);">
        
        <button id="closeImmersive" class="absolute top-4 right-4 z-50 w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors btn-magnetic">
          <i data-lucide="x" class="w-4 h-4"></i>
        </button>

        ${hasMedia ? `
        <div class="w-full md:w-3/5 h-[40vh] md:h-auto md:self-stretch relative border-b md:border-b-0 md:border-r border-white/10 overflow-hidden group/gallery bg-black/20">
          <div id="gallery-track" class="absolute inset-0 flex overflow-x-auto snap-x snap-mandatory hide-scrollbar" style="scroll-behavior: smooth;">
            ${mediaArray.map(img => `
            <div class="w-full h-full shrink-0 snap-center relative p-4">
              <img src="${img}" class="absolute inset-0 w-full h-full object-contain p-4" loading="lazy" />
            </div>
            `).join('')}
          </div>
          
          ${mediaArray.length > 1 ? `
          <div id="gallery-dots" class="auto-slide-container absolute bottom-4 left-0 right-0 flex justify-center gap-3 z-20 pointer-events-auto opacity-100 transition-opacity duration-300">
             ${mediaArray.map((_, i) => `<button type="button" aria-label="Go to slide ${i+1}" class="auto-slide-link w-2 h-2 rounded-full bg-white/30 cursor-pointer ${i === 0 ? 'is-active' : ''} focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none" onclick="document.getElementById('gallery-track').scrollTo({left: document.getElementById('gallery-track').clientWidth * ${i}, behavior: 'smooth'})"></button>`).join('')}
          </div>
          <div class="absolute top-4 left-4 z-20 pointer-events-none bg-black/40 backdrop-blur-md text-white/80 text-[10px] font-mono px-2 py-1 rounded-md border border-white/10 opacity-100 transition-opacity duration-300">
            SWIPE TO EXPLORE
          </div>
          ` : ''}
          <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent md:hidden pointer-events-none"></div>
        </div>
        ` : ''}

        <div class="w-full ${hasMedia ? 'md:w-2/5 flex-1 md:min-h-[60vh]' : 'h-full'} p-6 md:p-10 lg:p-12 overflow-y-auto custom-scrollbar flex flex-col justify-center">
          <div id="immersiveInfo">
            <div class="flex flex-wrap items-center gap-3 mb-6">
              <span class="font-mono text-xs tracking-widest uppercase text-white/60 border border-white/10 rounded-full px-3 py-1.5">${event.type}</span>
              ${event.role ? `<span class="font-mono text-xs tracking-widest uppercase text-accent-blue border border-accent-blue/20 bg-accent-blue/5 rounded-full px-3 py-1.5 flex items-center gap-2">${event.role}</span>` : ''}
            </div>

            <h2 class="font-display ${event.title.length > 50 ? 'text-2xl md:text-3xl' : 'text-3xl md:text-4xl lg:text-5xl'} text-white mb-6 tracking-tight leading-tight">${event.title}</h2>
            
            <div class="flex flex-col gap-3 mb-8">
              <div class="flex items-center gap-3 text-white/50 text-sm font-mono">
                <i data-lucide="calendar" class="w-4 h-4"></i> ${event.date}
              </div>
              <div class="flex items-center gap-3 text-white/50 text-sm font-mono">
                <i data-lucide="map-pin" class="w-4 h-4"></i> ${event.location || 'Remote'}
              </div>
            </div>

            <p class="text-base text-white/60 leading-relaxed ${event.details || event.team ? 'mb-6' : 'mb-10'} max-w-lg">${event.description}</p>
            
            ${event.details && event.details.length > 0 ? `
            <div class="flex flex-col gap-3 mb-6 max-w-lg">
              ${event.details.map(d => `
              <details class="group/accordion border border-white/10 rounded-xl bg-white/5 overflow-hidden transition-all duration-300">
                <summary class="flex items-center justify-between p-4 cursor-pointer list-none text-sm font-medium text-white/80 hover:bg-white/5 transition-colors select-none [&::-webkit-details-marker]:hidden">
                  ${d.title}
                  <i data-lucide="chevron-down" class="w-4 h-4 text-white/40 transition-transform duration-300 group-open/accordion:rotate-180"></i>
                </summary>
                <div class="p-4 pt-0 text-sm text-white/50 leading-relaxed whitespace-pre-line">
                  ${d.content}
                </div>
              </details>
              `).join('')}
            </div>
            ` : ''}
            
            ${event.team && event.team.length > 0 ? `
            <div class="mb-10 max-w-lg">
              <h3 class="text-xs font-mono uppercase tracking-widest text-white/40 mb-3 flex items-center gap-2"><i data-lucide="users" class="w-3.5 h-3.5"></i> Team</h3>
              <div id="immersiveTeam" class="flex flex-wrap gap-1 auto-slide-container p-1 rounded-full border border-white/10 bg-white/5 glass w-fit">
                ${event.team.map(member => {
    const name = typeof member === 'string' ? member : member.name;
    const link = typeof member === 'string' ? null : member.link;
    if (link && link !== '#') {
      return `<a href="${link}" target="_blank" rel="noopener noreferrer" class="auto-slide-link relative z-10 text-xs px-3 py-1.5 flex items-center gap-2 text-white/70 hover:text-white transition-colors duration-300 group/team">
                      ${name}
                      <i data-lucide="external-link" class="w-3 h-3 opacity-40 group-hover/team:opacity-100 transition-opacity"></i>
                    </a>`;
    }
    return `<span class="relative z-10 text-xs px-3 py-1.5 flex items-center gap-2 text-white/70">
                    ${name}
                  </span>`;
  }).join('')}
              </div>
            </div>
            ` : ''}
          
          ${event.link && event.link !== '#' ? `
          <div class="flex flex-wrap gap-4 mt-6" id="immersiveLinks">
            <a href="${event.link}" target="_blank" rel="noopener noreferrer" class="glass rounded-full px-8 py-3 text-sm text-[#0a66c2] hover:text-white transition-colors flex items-center gap-3"><i data-lucide="linkedin" class="w-5 h-5"></i> Open in LinkedIn</a>
          </div>
          ` : ''}
          </div>
        </div>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', viewerHtml);
  if (window.lucide) lucide.createIcons();

  if (document.getElementById('immersiveTeam')) {
    createSlidingIndicators('#immersiveTeam', '.auto-slide-link', { hideCursor: true, magnetic: false, hideOnItemLeave: true });
  }

  if (document.getElementById('gallery-dots')) {
    createSlidingIndicators('#gallery-dots', '.auto-slide-link', { hideCursor: true, magnetic: false, hideOnItemLeave: false, defaultIndex: 0 });

    const track = document.getElementById('gallery-track');
    const dots = document.querySelectorAll('#gallery-dots .auto-slide-link');
    if (track && dots.length > 0) {
      track.addEventListener('scroll', () => {
        const index = Math.round(track.scrollLeft / track.clientWidth);
        dots.forEach((dot, i) => dot.classList.toggle('is-active', i === index));
      }, { passive: true });

      let autoScrollInterval;
      const startAutoScroll = () => {
        clearInterval(autoScrollInterval);
        autoScrollInterval = setInterval(() => {
          let nextIndex = Math.round(track.scrollLeft / track.clientWidth) + 1;
          if (nextIndex >= dots.length) nextIndex = 0;
          track.scrollTo({ left: track.clientWidth * nextIndex, behavior: 'smooth' });
        }, 3000);
        const v = document.getElementById("immersiveViewer");
        if (v) v._autoScrollInterval = autoScrollInterval;
      };

      startAutoScroll();
    }
  }

  const viewer = document.getElementById("immersiveViewer");
  const modal = document.getElementById("immersiveModal");
  const closeBtn = document.getElementById("closeImmersive");
  const closeBg = document.getElementById("closeImmersiveBg");

  if (typeof initMagnetic === 'function') {
    setTimeout(initMagnetic, 100);
  }

  document.body.style.overflow = "hidden";

  const tl = gsap.timeline();

  tl.to(viewer, {
    opacity: 1,
    duration: 0.4,
    ease: "power2.out"
  });

  tl.to(modal, {
    opacity: 1,
    y: 0,
    scale: 1,
    duration: 0.6,
    ease: "back.out(1.2)"
  }, "-=0.2");

  const closeViewer = () => {
    if (viewer && viewer._autoScrollInterval) clearInterval(viewer._autoScrollInterval);
    tl.reverse().then(() => {
      viewer.remove();
      document.body.style.overflow = "";
    });
  };

  closeBtn.addEventListener("click", closeViewer);
  closeBg.addEventListener("click", closeViewer);
}

function renderSkills() {
  const skillsEl = document.getElementById("skillsPanel");
  if (!skillsEl) return;

  const groups = [
    { title: "Languages", items: D.skills.languages },
    { title: "Frameworks & Libraries", items: D.skills.frameworks },
    { title: "Cloud & DevOps", items: D.skills.cloud },
    { title: "Tools & Platforms", items: D.skills.tools },
  ];
  skillsEl.innerHTML = groups.map(g => `
    <div class="reveal-up">
      <h4 class="font-mono text-xs tracking-widest text-white/40 mb-3 uppercase">${g.title}</h4>
      <div>
        ${g.items.map(it => `
          <div class="readout-row">
            <span class="text-sm text-white/75">${it.name}</span>
            ${it.note ? `<span class="text-[11px] font-mono text-white/30">${it.note}</span>` : `<span class="text-[11px] font-mono text-accent-emerald" style="color:#34d399;">●</span>`}
          </div>
        `).join("")}
      </div>
    </div>
  `).join("");

  const compEl = document.getElementById("competencyTags");
  if (compEl) {
    compEl.innerHTML = D.competencies.map(c => `
      <span class="text-xs font-mono text-white/55 border border-white/10 rounded-full px-3.5 py-2 hover:border-white/30 hover:text-white transition-colors">${c}</span>
    `).join("");
  }
}

function renderAchievements() {
  const achEl = document.getElementById("achievementsGrid");
  if (!achEl) return;
  achEl.innerHTML = D.achievements.map(a => `
    <div class="glass-card rounded-2xl p-6 reveal-up">
      <div class="flex items-center gap-3 mb-4">
        <i data-lucide="${a.tier === 'gold' ? 'trophy' : 'medal'}" class="w-5 h-5 accent-gold flex-shrink-0" style="color:#d4af37;"></i>
        <h4 class="font-display text-base text-white leading-tight">${a.title}</h4>
      </div>
      <p class="text-sm text-white/70 leading-relaxed">${a.detail}</p>
    </div>
  `).join("");

  const certEl = document.getElementById("certificationsList");
  if (certEl) {
    certEl.innerHTML = D.certifications.map(c => `
      <div class="glass rounded-xl px-4 py-3.5 flex items-center gap-3 reveal-up">
        <i data-lucide="badge-check" class="w-4 h-4 accent-blue flex-shrink-0" style="color:#4f7cff;"></i>
        <div class="min-w-0">
          <p class="text-sm text-white/90 truncate">${c.name}</p>
          <p class="text-xs text-white/60 font-mono">${c.issuer}</p>
        </div>
      </div>
    `).join("");
  }
}

async function renderGithubWidgets() {
  const wrapper = document.getElementById("githubWidgetsWrapper");
  if (!wrapper) return;
  const u = D.integrations.githubUsername;
  const container = document.getElementById("githubWidgets");

  container.innerHTML = `<p class="text-sm text-white/30 font-mono">Fetching GitHub data…</p>`;

  try {
    const res = await fetch(`https://api.github.com/users/${u}`);
    if (!res.ok) throw new Error("bad response");
    const data = await res.json();

    container.innerHTML = `
      <div class="glass-card rounded-3xl p-8 flex flex-col justify-center min-h-[280px]">
        <div class="flex items-center gap-2 mb-6 text-white/50 text-[10px] font-mono uppercase tracking-widest border border-white/10 rounded-full px-4 py-1.5 w-fit">
          <svg class="w-3.5 h-3.5" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg> GitHub
        </div>
        <div class="flex items-start gap-4 mb-6">
          <img src="${data.avatar_url}" alt="${data.login}" class="w-16 h-16 rounded-full border border-white/10" loading="lazy" />
          <div>
            <h3 class="font-display text-xl text-white/90">${data.name || data.login}</h3>
            <a href="${data.html_url}" target="_blank" rel="noopener noreferrer" class="text-sm font-mono text-white/40 hover:text-accent-blue transition-colors">@${data.login}</a>
          </div>
        </div>
        
        <p class="text-sm text-white/60 mb-6 leading-relaxed">${data.bio || "Building things for the web."}</p>
        
        <div class="grid grid-cols-3 gap-4 pt-8 mt-6 border-t border-white/5 relative">
          <!-- Subtle liquid ambient glow -->
          <div class="absolute inset-0 bg-gradient-to-t from-accent-blue/5 to-transparent pointer-events-none blur-2xl"></div>
          
          <!-- Repos -->
          <div class="relative group">
            <div class="absolute inset-0 bg-accent-blue/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500"></div>
            <div class="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.08] to-transparent backdrop-blur-2xl p-5 text-center transition-all duration-500 group-hover:-translate-y-1 group-hover:border-white/20" style="box-shadow: inset 0 1px 1px rgba(255,255,255,0.25), inset 0 -1px 1px rgba(0,0,0,0.5), 0 10px 40px rgba(0,0,0,0.3);">
              <!-- Top liquid sheen reflection -->
              <div class="absolute top-0 left-0 right-0 h-[45%] bg-gradient-to-b from-white/10 to-transparent opacity-60 rounded-t-2xl pointer-events-none"></div>
              <!-- Content -->
              <div class="font-display text-3xl font-light text-white tracking-tight relative z-10 drop-shadow-sm">${data.public_repos}</div>
              <div class="text-[9px] uppercase tracking-[0.2em] text-white/50 mt-1 relative z-10 font-semibold group-hover:text-accent-blue transition-colors">Repos</div>
            </div>
          </div>

          <!-- Followers -->
          <div class="relative group">
            <div class="absolute inset-0 bg-accent-blue/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500"></div>
            <div class="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.08] to-transparent backdrop-blur-2xl p-5 text-center transition-all duration-500 group-hover:-translate-y-1 group-hover:border-white/20" style="box-shadow: inset 0 1px 1px rgba(255,255,255,0.25), inset 0 -1px 1px rgba(0,0,0,0.5), 0 10px 40px rgba(0,0,0,0.3);">
              <div class="absolute top-0 left-0 right-0 h-[45%] bg-gradient-to-b from-white/10 to-transparent opacity-60 rounded-t-2xl pointer-events-none"></div>
              <div class="font-display text-3xl font-light text-white tracking-tight relative z-10 drop-shadow-sm">${data.followers}</div>
              <div class="text-[9px] uppercase tracking-[0.2em] text-white/50 mt-1 relative z-10 font-semibold group-hover:text-accent-blue transition-colors">Followers</div>
            </div>
          </div>

          <!-- Following -->
          <div class="relative group">
            <div class="absolute inset-0 bg-accent-blue/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500"></div>
            <div class="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.08] to-transparent backdrop-blur-2xl p-5 text-center transition-all duration-500 group-hover:-translate-y-1 group-hover:border-white/20" style="box-shadow: inset 0 1px 1px rgba(255,255,255,0.25), inset 0 -1px 1px rgba(0,0,0,0.5), 0 10px 40px rgba(0,0,0,0.3);">
              <div class="absolute top-0 left-0 right-0 h-[45%] bg-gradient-to-b from-white/10 to-transparent opacity-60 rounded-t-2xl pointer-events-none"></div>
              <div class="font-display text-3xl font-light text-white tracking-tight relative z-10 drop-shadow-sm">${data.following}</div>
              <div class="text-[9px] uppercase tracking-[0.2em] text-white/50 mt-1 relative z-10 font-semibold group-hover:text-accent-blue transition-colors">Following</div>
            </div>
          </div>
        </div>
        
        <div class="flex justify-center mt-8 mb-2">
          <a href="https://git.io/streak-stats" target="_blank" rel="noopener noreferrer">
            <img src="https://github-readme-streak-stats.herokuapp.com?user=Parashar12441&theme=dark&hide_border=true" alt="GitHub Streak" class="w-full max-w-[500px] transition-transform hover:scale-[1.02] filter hover:brightness-110" loading="lazy" />
          </a>
        </div>
        
        <a href="${data.html_url}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1.5 mt-8 text-xs font-mono accent-blue" style="color:#4f7cff;">
          View GitHub Profile <i data-lucide="arrow-up-right" class="w-3 h-3"></i>
        </a>
      </div>
    `;
    if (window.lucide) lucide.createIcons();
    initGlassCursorGlow();
  } catch (err) {
    container.innerHTML = `
      <div class="glass-card rounded-3xl p-8 flex flex-col justify-center min-h-[280px]">
        <div class="flex items-center gap-4">
          ${getSocialIconHtml("github", "w-6 h-6 accent-blue flex-shrink-0")}
          <div>
            <p class="text-sm text-white/60">Live stats are temporarily unavailable (API Limit).</p>
            <a href="https://github.com/${u}" target="_blank" rel="noopener noreferrer" class="text-sm accent-blue underline underline-offset-4" style="color:#4f7cff;">View GitHub profile directly →</a>
          </div>
        </div>
      </div>
    `;
    if (window.lucide) lucide.createIcons();
    initGlassCursorGlow();
  }
}

function leetcodeFallback(container, username) {
  container.innerHTML = `
    <div class="flex items-center gap-2 mb-6 text-white/50 text-[10px] font-mono uppercase tracking-widest border border-white/10 rounded-full px-4 py-1.5 w-fit">
      <svg class="w-3.5 h-3.5" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><path d="M16.102 17.93l-2.697 2.607c-.466.467-1.111.662-1.823.662s-1.357-.195-1.824-.662l-4.332-4.363c-.467-.467-.702-1.15-.702-1.863s.235-1.357.702-1.824l4.319-4.38c.467-.467 1.125-.645 1.837-.645s1.357.195 1.823.662l2.697 2.606c.514.515 1.365.497 1.9-.038.535-.536.553-1.387.039-1.901l-2.609-2.636a5.055 5.055 0 0 0-2.445-1.337l2.467-2.503c.516-.514.498-1.366-.037-1.901-.535-.535-1.387-.552-1.902-.038l-10.1 10.101c-.981.982-1.497 2.337-1.497 3.814s.516 2.831 1.497 3.813l10.098 10.102a5.355 5.355 0 0 0 3.813 1.497c1.477 0 2.831-.516 3.813-1.497l2.61-2.636c.514-.515.496-1.366-.039-1.901-.535-.535-1.386-.517-1.9.038zM20.811 13.01H10.666c-.702 0-1.27.604-1.27 1.346s.568 1.346 1.27 1.346h10.145c.701 0 1.27-.604 1.27-1.346s-.569-1.346-1.27-1.346z"/></svg> LeetCode
    </div>
    <div class="flex items-center gap-4">
      <i data-lucide="code-2" class="w-6 h-6 accent-blue flex-shrink-0" style="color:#4f7cff;"></i>
      <div>
        <p class="text-sm text-white/60">Live stats are temporarily unavailable (API Limit).</p>
        <a href="https://leetcode.com/${username}" target="_blank" rel="noopener noreferrer" class="text-sm accent-blue underline underline-offset-4" style="color:#4f7cff;">View LeetCode profile directly →</a>
      </div>
    </div>
  `;
  if (window.lucide) lucide.createIcons();
}

function renderLeetcodeStats(container, stats, username) {
  const bars = [
    { label: "Easy", solved: stats.easySolved, total: stats.totalEasy, color: "#34d399" },
    { label: "Medium", solved: stats.mediumSolved, total: stats.totalMedium, color: "#d4af37" },
    { label: "Hard", solved: stats.hardSolved, total: stats.totalHard, color: "#f87171" },
  ];

  container.innerHTML = `
    <div class="flex items-center gap-2 mb-6 text-white/50 text-[10px] font-mono uppercase tracking-widest border border-white/10 rounded-full px-4 py-1.5 w-fit">
      <svg class="w-3.5 h-3.5" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><path d="M16.102 17.93l-2.697 2.607c-.466.467-1.111.662-1.823.662s-1.357-.195-1.824-.662l-4.332-4.363c-.467-.467-.702-1.15-.702-1.863s.235-1.357.702-1.824l4.319-4.38c.467-.467 1.125-.645 1.837-.645s1.357.195 1.823.662l2.697 2.606c.514.515 1.365.497 1.9-.038.535-.536.553-1.387.039-1.901l-2.609-2.636a5.055 5.055 0 0 0-2.445-1.337l2.467-2.503c.516-.514.498-1.366-.037-1.901-.535-.535-1.387-.552-1.902-.038l-10.1 10.101c-.981.982-1.497 2.337-1.497 3.814s.516 2.831 1.497 3.813l10.098 10.102a5.355 5.355 0 0 0 3.813 1.497c1.477 0 2.831-.516 3.813-1.497l2.61-2.636c.514-.515.496-1.366-.039-1.901-.535-.535-1.386-.517-1.9.038zM20.811 13.01H10.666c-.702 0-1.27.604-1.27 1.346s.568 1.346 1.27 1.346h10.145c.701 0 1.27-.604 1.27-1.346s-.569-1.346-1.27-1.346z"/></svg> LeetCode
    </div>
    <div class="grid sm:grid-cols-3 gap-6 mb-8">
      <div>
        <div class="font-display text-4xl">${stats.totalSolved}</div>
        <div class="text-xs text-white/40 font-mono mt-1">/ ${stats.totalQuestions} solved</div>
      </div>
      <div>
        <div class="font-display text-4xl">#${stats.ranking?.toLocaleString?.() ?? stats.ranking}</div>
        <div class="text-xs text-white/40 font-mono mt-1">Global ranking</div>
      </div>
      <div>
        <div class="font-display text-4xl">${stats.acceptanceRate}%</div>
        <div class="text-xs text-white/40 font-mono mt-1">Acceptance rate</div>
      </div>
    </div>
    <div class="space-y-4">
      ${bars.map(b => `
        <div>
          <div class="flex justify-between text-xs font-mono text-white/70 mb-1.5">
            <span>${b.label}</span>
            <span>${b.solved} / ${b.total}</span>
          </div>
          <div class="h-1.5 rounded-full bg-white/5 overflow-hidden">
            <div class="h-full rounded-full leetcode-bar" data-width="${b.total ? (b.solved / b.total) * 100 : 0}" style="background:${b.color}; width:0%;"></div>
          </div>
        </div>
      `).join("")}
    </div>
    <a href="https://leetcode.com/u/${username}/" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1.5 mt-8 text-xs font-mono accent-blue" style="color:#4f7cff;">
      View full profile <i data-lucide="arrow-up-right" class="w-3 h-3"></i>
    </a>
  `;
  if (window.lucide) lucide.createIcons();
  initGlassCursorGlow();

  requestAnimationFrame(() => {
    container.querySelectorAll(".leetcode-bar").forEach(bar => {
      const w = bar.dataset.width + "%";
      if (prefersReducedMotion || !window.gsap) { bar.style.width = w; return; }
      gsap.to(bar, { width: w, duration: 1.2, ease: "power2.out" });
    });
  });
}

async function renderLeetcodeWidget() {
  const container = document.getElementById("leetcodeWidget");
  if (!container) return;
  const username = D.integrations.leetcodeUsername;
  container.innerHTML = `<p class="text-sm text-white/30 font-mono">Fetching live stats…</p>`;
  try {
    const res = await fetch(`https://leetcode-stats.tashif.codes/${username}`);
    if (!res.ok) throw new Error("bad response");
    const stats = await res.json();
    if (stats.status !== "success") throw new Error("api error");
    renderLeetcodeStats(container, stats, username);
  } catch (err) {
    leetcodeFallback(container, username);
  }
}

function renderContact() {
  const emailBtn = document.getElementById("contactEmailBtn");
  if (!emailBtn) return;
  emailBtn.href = `mailto:${D.meta.email}`;
  document.getElementById("contactResumeBtn").href = D.meta.resumeUrl;
  document.getElementById("contactResumeBtn").setAttribute("download", "Aditya_Parashar_Resume.pdf");

  const socials = [
    { key: "github", icon: "github", url: D.socials.github },
    { key: "linkedin", icon: "linkedin", url: D.socials.linkedin },
    { key: "leetcode", icon: "code-2", url: D.socials.leetcode },
    { key: "google", icon: "cloud", url: D.socials.googleDeveloper },
  ];
  document.getElementById("contactSocials").innerHTML = socials.map(s => `
    <a href="${s.url}" target="_blank" rel="noopener noreferrer" class="grid w-11 h-11 place-items-center rounded-full border border-white/10 text-white/50 transition-all hover:-translate-y-0.5 hover:border-white/30 hover:text-white" aria-label="${s.key}">
      ${getSocialIconHtml(s.icon, "w-4 h-4")}
    </a>
  `).join("");
}

function renderNavAndFooter() {
  const navBtn = document.getElementById("navResumeBtn");
  if (navBtn) {
    navBtn.href = D.meta.resumeUrl;
    navBtn.setAttribute("download", "Aditya_Parashar_Resume.pdf");
  }
  const heroResumeBtn = document.getElementById("heroResumeBtn");
  if (heroResumeBtn) {
    heroResumeBtn.href = D.meta.resumeUrl;
    heroResumeBtn.setAttribute("download", "Aditya_Parashar_Resume.pdf");
  }
  document.getElementById("footerName").textContent = D.meta.name;
  document.getElementById("footerLocation").textContent = D.meta.location;
  document.getElementById("footerYear").textContent = D.meta.year;
  document.title = `${D.meta.name} — Software Engineer & Creative Technologist`;
}

function renderResearch() {
  const container = document.getElementById("researchList");
  if (!container || !D.research) return;
  if (D.research.length === 0) {
    container.innerHTML = '<p class="text-center text-white/50">Research is being catalogued. Check back soon.</p>';
    return;
  }
  container.innerHTML = D.research.map((r, i) => `
    <article class="glass rounded-3xl p-6" data-reveal style="transition-delay: ${i * 0.05}s">
      <div class="flex flex-wrap items-start justify-between gap-3">
        <span class="rounded-full bg-white/5 border border-white/10 px-2.5 py-0.5 text-xs uppercase tracking-widest text-accent-blue" style="color:var(--accent-blue)">${r.type}</span>
        <span class="text-xs text-white/50 font-mono">${r.status}</span>
      </div>
      <h2 class="mt-3 font-display text-2xl">${r.title}</h2>
      ${r.venue ? `<p class="mt-1 text-sm text-accent-blue/80" style="color:var(--accent-blue)">${r.venue}</p>` : ''}
      ${r.authors && r.authors.length > 0 ? `<p class="mt-1 text-sm text-white/50">${r.authors.join(", ")}</p>` : ''}
      ${r.abstract ? `<p class="mt-3 text-sm text-white/60 leading-relaxed">${r.abstract}</p>` : ''}
      <div class="mt-4 flex flex-wrap gap-3">
        ${r.pdf_url ? `<a href="${r.pdf_url}" target="_blank" class="inline-flex items-center gap-1.5 text-sm text-white/80 hover:text-white"><i data-lucide="file-text" class="w-4 h-4"></i> PDF</a>` : ''}
        ${r.doi ? `<a href="${r.doi}" target="_blank" class="inline-flex items-center gap-1.5 text-sm text-white/80 hover:text-white"><i data-lucide="external-link" class="w-4 h-4"></i> DOI</a>` : ''}
      </div>
    </article>
  `).join("");
}

function renderStartup() {
  const container = document.getElementById("startupContent");
  if (!container || !D.startup || !D.startup.name) {
    if (container) container.innerHTML = '<p class="text-center text-white/50">The venture story is coming soon.</p>';
    return;
  }

  // Update header title & subtitle if they exist
  const headerTitle = document.querySelector("#startup-page header h1");
  const headerSub = document.querySelector("#startup-page header p + h1 + p");
  if (headerTitle) {
    headerTitle.textContent = D.startup.name || 'Startup';
  }
  if (headerSub) {
    headerSub.textContent = D.startup.tagline || '';
  }

  let html = '';

  // Mission & Vision Grid
  if (D.startup.mission || D.startup.vision) {
    html += `
      <div class="grid gap-6 md:grid-cols-2">
        ${D.startup.mission ? `
          <div class="glass rounded-3xl p-6" data-reveal>
            <h2 class="text-xs uppercase tracking-widest text-accent-blue font-mono" style="color:var(--accent-blue)">Mission</h2>
            <p class="mt-3 text-white/70 leading-relaxed">${D.startup.mission}</p>
          </div>
        ` : ''}
        ${D.startup.vision ? `
          <div class="glass rounded-3xl p-6" data-reveal style="transition-delay:0.08s">
            <h2 class="text-xs uppercase tracking-widest text-accent-purple font-mono" style="color:var(--accent-purple)">Vision</h2>
            <p class="mt-3 text-white/70 leading-relaxed">${D.startup.vision}</p>
          </div>
        ` : ''}
      </div>
    `;
  }

  // Description
  if (D.startup.description_md) {
    html += `
      <div class="mt-8 glass rounded-3xl p-8" data-reveal>
        <p class="whitespace-pre-line leading-relaxed text-white/70">${D.startup.description_md}</p>
      </div>
    `;
  }

  // Achievements
  if (D.startup.achievements && D.startup.achievements.length > 0) {
    html += `
      <div class="mt-10" data-reveal>
        <h2 class="mb-4 font-display text-2xl">Achievements</h2>
        <ul class="space-y-3">
          ${D.startup.achievements.map(a => `
            <li class="flex items-start gap-3 text-white/70">
              <span class="mt-2.5 w-1.5 h-1.5 shrink-0 rounded-full" style="background:var(--accent-blue)"></span>
              <span>${a}</span>
            </li>
          `).join("")}
        </ul>
      </div>
    `;
  }

  // Timeline
  if (D.startup.timeline && D.startup.timeline.length > 0) {
    html += `
      <div class="mt-10 border-l border-white/10 pl-8 space-y-6" data-reveal>
        ${D.startup.timeline.map((t, i) => `
          <div class="relative" data-reveal style="transition-delay:${i * 0.06}s">
            <span class="absolute -left-[2.6rem] top-1.5 w-3 h-3 rounded-full" style="background:var(--accent-blue)"></span>
            <p class="text-xs text-white/40 font-mono">${t.date}</p>
            <h3 class="font-medium text-white/90 text-lg mt-0.5">${t.title}</h3>
            ${t.description ? `<p class="text-sm text-white/60 mt-1">${t.description}</p>` : ''}
          </div>
        `).join("")}
      </div>
    `;
  }

  // Website URL Preview
  if (D.startup.website_url && D.startup.website_url !== '#') {
    let shortUrl = D.startup.website_url.replace(/^https?:\/\//, '');
    html += `
      <div class="mt-12 mb-8 glass rounded-3xl p-1.5 relative overflow-hidden group shadow-2xl shadow-black/50" data-reveal>
        <!-- Desktop Window Decor -->
        <div class="bg-[#1a1a1a]/80 backdrop-blur-md px-4 py-3 border-b border-white/5 flex items-center justify-between rounded-t-2xl">
          <div class="flex gap-2">
            <div class="w-3 h-3 rounded-full bg-red-500/80"></div>
            <div class="w-3 h-3 rounded-full bg-yellow-500/80"></div>
            <div class="w-3 h-3 rounded-full bg-green-500/80"></div>
          </div>
          <div class="text-xs font-mono text-white/40 bg-white/5 px-4 py-1.5 rounded-full truncate max-w-xs text-center border border-white/5">
            ${shortUrl}
          </div>
          <a href="${D.startup.website_url}" target="_blank" class="text-xs text-accent-blue hover:text-white transition-colors flex items-center gap-1.5" title="Open in new tab">
            Open <i data-lucide="external-link" class="w-3 h-3"></i>
          </a>
        </div>
        
        <!-- iFrame Container -->
        <div class="w-full relative rounded-b-2xl overflow-hidden bg-[#0a0a0a]">
          <div class="relative w-full aspect-video">
            <!-- Loading state -->
            <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div class="flex flex-col items-center gap-3">
                <i data-lucide="loader-2" class="w-6 h-6 text-accent-blue animate-spin"></i>
                <span class="text-xs font-mono tracking-widest text-white/30 uppercase">Connecting</span>
              </div>
            </div>
            
            <iframe 
              src="${D.startup.website_url}" 
              title="Safe Yatra Live Preview"
              class="absolute top-0 left-0 border-0 opacity-0 transition-opacity duration-1000 z-10"
              style="width: 200%; height: 200%; transform: scale(0.5); transform-origin: 0 0;"
              onload="this.style.opacity='1'"
              sandbox="allow-scripts allow-same-origin"
            ></iframe>
            
            <!-- Hover Overlay Gradient & Magnetic Button -->
            <div class="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center pb-8 z-20">
              <a href="${D.startup.website_url}" target="_blank" class="btn-magnetic inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-medium text-white shadow-xl shadow-black/50 pointer-events-auto hover:scale-105 transition-transform" style="background: var(--accent-blue);">
                Explore Interactive Site <i data-lucide="arrow-up-right" class="w-3.5 h-3.5"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  container.innerHTML = html;
}

function renderPhotography() {
  const container = document.getElementById("photographyGrid");
  if (!container || !D.photography) return;
  if (D.photography.length === 0) {
    container.innerHTML = '<p class="text-center text-white/55 col-span-full py-12">Curated albums with lightbox viewing will appear here as they\'re published from the admin dashboard.</p>';
    return;
  }
  container.innerHTML = D.photography.map((p, i) => `
    <div class="group relative overflow-hidden rounded-2xl glass-strong aspect-[4/5]" data-reveal style="transition-delay: ${i * 0.05}s">
      <img src="${p.url}" alt="${p.caption || 'Photograph'}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
      ${p.caption ? `
        <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
          <p class="text-white text-sm font-medium">${p.caption}</p>
        </div>
      ` : ''}
    </div>
  `).join("");
}

function renderJournal() {
  const container = document.getElementById("journalList");
  if (!container || !D.journal) return;
  if (D.journal.length === 0) {
    container.innerHTML = '<p class="text-center text-white/55 py-12">First posts are being written. Stay tuned.</p>';
    return;
  }
  container.innerHTML = D.journal.map((j, i) => `
    <a href="${j.url || '#'}" class="block group glass rounded-3xl p-6 transition-all hover:bg-white/5" data-reveal style="transition-delay: ${i * 0.05}s">
      <div class="flex items-center justify-between gap-4 mb-3">
        <span class="text-xs font-mono text-white/40">${j.date || ''}</span>
        <i data-lucide="arrow-up-right" class="w-4 h-4 text-white/30 group-hover:text-white/80 transition-colors"></i>
      </div>
      <h3 class="font-display text-2xl group-hover:text-accent-blue transition-colors" style="--tw-text-opacity:1; color:var(--accent-blue, #4f7cff)">${j.title}</h3>
      ${j.excerpt ? `<p class="mt-2 text-white/60 leading-relaxed">${j.excerpt}</p>` : ''}
    </a>
  `).join("");
}

function renderHomeResearchStartup() {
  const startupTitle = document.getElementById("homeStartupTitle");
  const startupTagline = document.getElementById("homeStartupTagline");
  const researchCount = document.getElementById("homeResearchCount");
  const researchFeatured = document.getElementById("homeResearchFeatured");

  if (startupTitle && D.startup && D.startup.name) {
    startupTitle.textContent = D.startup.name;
    startupTagline.textContent = D.startup.tagline || '';
  }

  if (researchCount && D.research) {
    if (D.research.length > 0) {
      researchCount.textContent = `${D.research.length} works & papers`;
      researchFeatured.textContent = D.research[0].title;
    } else {
      researchCount.textContent = "Research & Patents";
      researchFeatured.textContent = "Exploring embedded systems, AI, and applied engineering.";
    }
  }
}

function renderAll() {
  renderHero();
  renderStats();
  renderAbout();
  renderTimeline();
  renderProjects();
  renderEvents();
  renderHomeResearchStartup();
  renderSkills();
  renderAchievements();
  renderGithubWidgets();
  renderLeetcodeWidget();
  renderResearch();
  renderStartup();
  renderPhotography();
  renderJournal();
  renderContact();
  renderNavAndFooter();
  initGlassCursorGlow();
  if (window.lucide) lucide.createIcons();
}

/* ============================================================
   PRELOADER
   ============================================================ */

function initPreloader() {
  const ring = document.getElementById("preload-ring");
  const pre = document.getElementById("preloader");
  let done = false;
  const finish = () => {
    if (done) return;
    done = true;
    pre.classList.add("loaded");
    setTimeout(() => {
      pre.remove();
      if (window.ScrollTrigger) ScrollTrigger.refresh();
    }, 900);
    startRevealAnimations();
  };
  if (prefersReducedMotion) {
    finish();
    return;
  }
  gsap.to(ring, { strokeDashoffset: 0, duration: 1.1, ease: "power2.inOut" });
  window.addEventListener("load", () => setTimeout(finish, 500));
  setTimeout(finish, 2200); // safety fallback
}

/* ============================================================
   CUSTOM CURSOR
   ============================================================ */

function initCursor() {
  if (window.matchMedia("(hover: none), (pointer: coarse)").matches) return;
  document.body.classList.add("custom-cursor-enabled");

  // Wrap logo text to prevent the CSS mask from disabling pointer events on the hit area
  document.querySelectorAll(".logo-container").forEach(logo => {
    if (logo.querySelector(".logo-text-wrapper")) return;
    const wrapper = document.createElement("span");
    wrapper.className = "logo-text-wrapper";
    wrapper.style.display = "flex";
    wrapper.style.alignItems = "center";
    while (logo.firstChild) {
      wrapper.appendChild(logo.firstChild);
    }
    logo.appendChild(wrapper);
  });

  const dot = document.getElementById("cursorDot");
  const ring = document.getElementById("cursorRing");
  let mx = 0, my = 0, rx = 0, ry = 0;
  let clone = null;

  window.addEventListener("mousemove", (e) => {
    mx = e.clientX; my = e.clientY;
    dot.style.left = mx + "px"; dot.style.top = my + "px";
  });

  const animateRing = () => {
    rx += (mx - rx) * 0.18;
    ry += (my - ry) * 0.18;
    ring.style.left = rx + "px"; ring.style.top = ry + "px";

    if (clone) {
      const logo = document.querySelector(".logo-container");
      if (logo) {
        const rect = logo.getBoundingClientRect();
        const dx = rect.left - rx;
        const dy = rect.top - ry;

        const maskX = rx - rect.left;
        const maskY = ry - rect.top;
        logo.style.setProperty('--mask-x', maskX + 'px');
        logo.style.setProperty('--mask-y', maskY + 'px');

        clone.style.left = (dx + 24) + "px";
        clone.style.top = (dy + 24) + "px";
        clone.style.transformOrigin = `${-dx}px ${-dy}px`;
        clone.style.transform = "scale(1.4)";
      }
    }

    requestAnimationFrame(animateRing);
  };
  animateRing();

  document.querySelectorAll("a, button, [data-magnetic]").forEach(el => {
    el.addEventListener("mouseenter", () => {
      if (el.classList.contains("logo-container")) {
        el.classList.add("is-magnified");
        ring.classList.add("is-magnifier");
        dot.classList.add("is-hidden");

        if (clone) {
          clone.remove();
        }

        clone = el.cloneNode(true);
        clone.classList.add("magnified-logo");
        clone.classList.remove("logo-container", "group", "is-magnified");
        ring.appendChild(clone);
      } else {
        ring.classList.add("is-active");
      }
    });
    el.addEventListener("mouseleave", () => {
      if (el.classList.contains("logo-container")) {
        el.classList.remove("is-magnified");
        ring.classList.remove("is-magnifier");
        dot.classList.remove("is-hidden");
        if (clone) {
          clone.remove();
          clone = null;
        }
      } else {
        ring.classList.remove("is-active");
      }
    });
  });
}

/* ============================================================
   MAGNETIC BUTTONS
   ============================================================ */

function initMagnetic() {
  if (prefersReducedMotion) return;
  document.querySelectorAll(".btn-magnetic, #radarIndicator").forEach(btn => {
    btn.addEventListener("mousemove", (e) => {
      const r = btn.getBoundingClientRect();
      const x = e.clientX - r.left - r.width / 2;
      const y = e.clientY - r.top - r.height / 2;
      // Increased sensitivity (from 0.25/0.35 to 0.7) and speed (duration 0.2)
      gsap.to(btn, { x: x * 0.7, y: y * 0.7, duration: 0.2, ease: "power2.out" });
    });
    btn.addEventListener("mouseleave", () => {
      // More elastic snap-back
      gsap.to(btn, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1.2, 0.3)" });
    });
  });
}

/* ============================================================
   RADAR SCROLL PROGRESS
   ============================================================ */

function initRadarProgress() {
  const circle = document.getElementById("radarProgress");
  const circumference = 150.8;
  const onScroll = () => {
    const h = document.documentElement;
    const scrolled = h.scrollTop / (h.scrollHeight - h.clientHeight || 1);
    circle.style.strokeDashoffset = circumference - scrolled * circumference;
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
  document.getElementById("radarIndicator").addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
  });
}

/* ============================================================
   NAV: active link + mobile toggle
   ============================================================ */

function initNav() {
  const links = document.querySelectorAll(".nav-link");
  const sections = [...links].map(l => {
    const href = l.getAttribute("href");
    if (href && href.startsWith("#")) {
      try {
        return document.querySelector(href);
      } catch (e) {
        return null;
      }
    }
    return null;
  });

  const onScroll = () => {
    let current = null;
    sections.forEach(s => {
      if (s && window.scrollY >= s.offsetTop - 140) current = s;
    });
    if (current) {
      links.forEach(l => l.classList.toggle("is-active", l.getAttribute("href") === "#" + current.id));
    }
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  const toggle = document.getElementById("mobileNavToggle");
  const menu = document.getElementById("mobileMenu");
  toggle.addEventListener("click", () => menu.classList.toggle("hidden"));
  menu.querySelectorAll("a").forEach(a => a.addEventListener("click", () => menu.classList.add("hidden")));
}

/* ============================================================
   ANIMATED COUNTERS
   ============================================================ */

function initCounters() {
  const counters = document.querySelectorAll("[data-counter]");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.dataset.target, 10);
      const suffix = el.dataset.suffix || "";
      if (prefersReducedMotion) {
        el.textContent = target + suffix;
      } else {
        gsap.to({ val: 0 }, {
          val: target,
          duration: 1.4,
          ease: "power2.out",
          onUpdate: function () { el.textContent = Math.round(this.targets()[0].val) + suffix; },
        });
      }
      observer.unobserve(el);
    });
  }, { threshold: 0.6 });
  counters.forEach(c => observer.observe(c));
}

/* ============================================================
   SCROLL REVEALS
   ============================================================ */

function startRevealAnimations() {
  if (!window.gsap || !window.ScrollTrigger) return;
  gsap.registerPlugin(ScrollTrigger);

  if (prefersReducedMotion) {
    document.querySelectorAll(".reveal-up, [data-reveal]").forEach(el => {
      el.style.opacity = 1; el.style.transform = "none";
    });
    return;
  }

  // Set initial hidden state for section reveals FIRST (before hero timeline)
  document.querySelectorAll("section [data-reveal]").forEach(el => {
    gsap.set(el, { opacity: 0, y: 24 });
  });

  // Set initial hidden state for hero [data-reveal] elements
  const heroSection = document.querySelector("section[aria-label='Introduction']") || document.querySelector("main > section:first-child");
  if (heroSection) {
    heroSection.querySelectorAll("[data-reveal]").forEach(el => {
      gsap.set(el, { opacity: 0, y: 24 });
    });
  }

  // Hero entrance
  const heroTl = gsap.timeline({ delay: 0.1 });

  // Set initial 3D state for photo wrapper
  const photoWrapper = document.getElementById("heroPhotoWrapper");
  if (photoWrapper) {
    // Start way below the screen, scaled down, and spun around twice (720 deg)
    gsap.set(photoWrapper, { opacity: 0, y: window.innerHeight + 200, rotateX: 0, rotateY: 720, scale: 0.5, transformPerspective: 1200 });

    // Add to timeline
    heroTl.to(photoWrapper, {
      opacity: 1,
      y: 0,
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      duration: 3.5, // slower duration for majestic rise & spin
      ease: "power3.out",
      onUpdate: function () {
        const rotY = gsap.getProperty(photoWrapper, "rotateY");
        const normalized = (rotY % 360 + 360) % 360;
        const isBack = normalized > 90 && normalized < 270;
        const img = document.getElementById("heroFrameImg");
        const backContent = document.getElementById("heroCardBackContent");

        if (img) img.style.opacity = isBack ? 0 : 1;
        if (backContent) backContent.style.opacity = isBack ? 1 : 0;
      },
      onComplete: function () {
        const img = document.getElementById("heroFrameImg");
        const backContent = document.getElementById("heroCardBackContent");

        if (img) img.style.opacity = 1;
        if (backContent) backContent.style.opacity = 0;
      }
    }, 0.1); // Start slightly earlier so it rises as the text appears
  }

  heroTl.to("#heroTagline", { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }, 0)
    .from("#heroHeadline span", { yPercent: 60, opacity: 0, duration: 0.9, stagger: 0.08, ease: "power4.out" }, 0.1);

  // Only target hero [data-reveal] elements (not section ones)
  if (heroSection) {
    const heroReveals = heroSection.querySelectorAll("[data-reveal]:not(#heroTagline)");
    heroTl.to(heroReveals, { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power3.out" }, 0.35);
  }

  // Section reveals (scroll-triggered)
  document.querySelectorAll(".reveal-up").forEach(el => {
    gsap.to(el, {
      opacity: 1, y: 0, duration: 0.8, ease: "power3.out",
      scrollTrigger: { trigger: el, start: "top 88%", once: true },
    });
  });

  document.querySelectorAll("section [data-reveal]").forEach(el => {
    gsap.to(el, {
      opacity: 1, y: 0, duration: 0.7, ease: "power3.out",
      scrollTrigger: { trigger: el, start: "top 90%", once: true },
    });
  });
}

/* ============================================================
   COMMAND PALETTE
   ============================================================ */

function initCommandPalette() {
  const palette = document.getElementById("commandPalette");
  const backdrop = document.getElementById("commandPaletteBackdrop");
  const input = document.getElementById("commandInput");
  const results = document.getElementById("commandResults");
  const trigger = document.getElementById("cmdTrigger");

  const items = [
    { label: "About", href: "#about", icon: "user" },
    { label: "Education & Experience", href: "#journey", icon: "route" },
    { label: "Projects", href: "#projects", icon: "layout-grid" },
    { label: "Skills", href: "#skills", icon: "cpu" },
    { label: "Awards & Certifications", href: "#recognition", icon: "trophy" },
    { label: "GitHub — live stats", href: "#live", icon: "github" },
    { label: "Contact", href: "#contact", icon: "mail" },
    { label: "Download résumé", href: D.meta.resumeUrl, icon: "download", download: true },
    { label: "Open GitHub profile", href: D.socials.github, icon: "external-link" },
    { label: "Open LinkedIn profile", href: D.socials.linkedin, icon: "external-link" },
  ];

  function renderResults(list) {
    results.innerHTML = list.map((it, i) => `
      <li>
        <button data-href="${it.href}" data-download="${!!it.download}" class="cmd-item w-full flex items-center gap-3 px-5 py-3 text-sm text-left hover:bg-white/[0.06] transition-colors" data-index="${i}">
          <i data-lucide="${it.icon}" class="w-4 h-4 text-white/40"></i>
          <span>${it.label}</span>
        </button>
      </li>
    `).join("") || `<li class="px-5 py-6 text-sm text-white/30">No matches.</li>`;
    if (window.lucide) lucide.createIcons();
    results.querySelectorAll(".cmd-item").forEach(btn => {
      btn.addEventListener("click", () => {
        const href = btn.dataset.href;
        if (btn.dataset.download === "true") {
          const a = document.createElement("a");
          a.href = href; a.download = ""; a.click();
        } else if (href.startsWith("http")) {
          window.open(href, "_blank", "noopener");
        } else {
          document.querySelector(href)?.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth" });
        }
        closePalette();
      });
    });
  }

  function openPalette() {
    palette.classList.remove("hidden");
    palette.classList.add("flex");
    input.value = "";
    renderResults(items);
    setTimeout(() => input.focus(), 50);
  }
  function closePalette() {
    palette.classList.add("hidden");
    palette.classList.remove("flex");
  }

  trigger?.addEventListener("click", openPalette);
  backdrop.addEventListener("click", closePalette);
  document.addEventListener("keydown", (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
      e.preventDefault();
      palette.classList.contains("hidden") ? openPalette() : closePalette();
    }
    if (e.key === "Escape") closePalette();
  });
  input.addEventListener("input", () => {
    const q = input.value.toLowerCase();
    renderResults(items.filter(it => it.label.toLowerCase().includes(q)));
  });
}

function initFramePhotoParallax() {
  if (window.matchMedia("(hover: none), (pointer: coarse)").matches) return;
  const card = document.getElementById("heroPhotoCard");
  const img = document.getElementById("heroFrameImg");
  const reflection = document.getElementById("heroGlassReflection");
  if (!card || !img || !reflection) return;

  // Set transform perspective on the parent container to enable 3D tilting
  gsap.set(card.parentElement, { perspective: 1000 });

  // Set default scale on the card (0.58 of w-96 is ~w-56) with top-right origin to stay in corner
  gsap.set(card, {
    scale: 0.58,
    transformOrigin: "top right",
    force3D: true,
    x: 0,
    y: 0,
    rotationX: 0,
    rotationY: 0
  });

  // Set default scale on the image and reflection so they have space to pan, forcing GPU layers
  gsap.set(img, { scale: 1.15, force3D: true });
  gsap.set(reflection, { force3D: true });

  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2); // -1 to 1
    const y = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2); // -1 to 1

    // Scale up to 1.0 (natural size = 100% sharp/crisp) and tilt in 3D
    gsap.to(card, {
      scale: 1.0,
      x: x * 15, // slight interactive card pan
      y: y * 15,
      rotationY: x * 12, // 3D rotation Y
      rotationX: -y * 12, // 3D rotation X
      duration: 0.35,
      ease: "power1.out",
      force3D: true
    });

    // Pan the photo inside the card in the opposite direction for parallax depth
    gsap.to(img, {
      x: -x * 12,
      y: -y * 12,
      duration: 0.35,
      ease: "power1.out",
      force3D: true
    });

    // Pan the specular reflection overlay in the opposite direction to simulate moving light sheens
    gsap.to(reflection, {
      x: -x * 25,
      y: -y * 25,
      duration: 0.35,
      ease: "power1.out",
      force3D: true
    });
  });

  card.addEventListener("mouseleave", () => {
    // Reset the card smoothly back to its top-right small floating state (0.58 scale)
    gsap.to(card, {
      scale: 0.58,
      x: 0,
      y: 0,
      rotationX: 0,
      rotationY: 0,
      duration: 0.5,
      ease: "power2.out",
      force3D: true
    });

    // Reset the image inside the card
    gsap.to(img, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: "power2.out",
      force3D: true
    });

    // Reset the reflection overlay
    gsap.to(reflection, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: "power2.out",
      force3D: true
    });
  });
}

function initGlassCursorGlow() {
  const cards = document.querySelectorAll(".glass, .glass-card, .stat-card, .cta-card, .role-pill");
  cards.forEach(card => {
    if (card.dataset.glowBound) return;
    card.dataset.glowBound = "true";

    card.addEventListener("mousemove", e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty("--mouse-x", `${x}px`);
      card.style.setProperty("--mouse-y", `${y}px`);
    });

    // Reset glow when cursor leaves card (delayed to allow CSS transition fade at exit point)
    card.addEventListener("mouseleave", () => {
      setTimeout(() => {
        if (!card.matches(":hover")) {
          card.style.setProperty("--mouse-x", "-999px");
          card.style.setProperty("--mouse-y", "-999px");
        }
      }, 450);
    });
  });
}

/* ============================================================
   SLIDING NAV WATER DROPLET
   ============================================================ */

function createSlidingIndicators(containerSelector, itemSelector, options = {}) {
  const containers = document.querySelectorAll(containerSelector);

  containers.forEach(container => {
    container.style.position = 'relative';

    const indicator = document.createElement('div');
    indicator.className = 'sliding-indicator';
    container.appendChild(indicator);

    const items = container.querySelectorAll(itemSelector);
    if (items.length === 0) return;

    let activeItem = null;
    const jiggleState = { scale: 1, rotation: 0 };

    if (options.matchPath) {
      let currentPath = window.location.pathname.split('/').pop();
      if (currentPath === '' || currentPath === '/') currentPath = 'index.html';
      items.forEach(item => {
        if (item.getAttribute('href') === currentPath) {
          activeItem = item;
          item.classList.add('is-active');
        }
      });
    } else if (options.defaultIndex !== undefined && items[options.defaultIndex]) {
      activeItem = items[options.defaultIndex];
      activeItem.classList.add('is-active');
    }

    // Physics State Variables
    let cx = 0, cy = 0, cw = 0, ch = 0; // Current
    let vx = 0, vy = 0, vw = 0, vh = 0; // Velocity
    let tx = 0, ty = 0, tw = 0, th = 0; // Target
    let isFirstMove = true;
    let isActive = false;

    function moveIndicator(el) {
      if (!el) {
        isActive = false;
        indicator.style.opacity = '0';
        return;
      }
      isActive = true;
      indicator.style.opacity = '1';

      tw = el.offsetWidth;
      th = el.offsetHeight;
      tx = el.offsetLeft;
      ty = el.offsetTop;

      if (isFirstMove) {
        cx = tx; cy = ty; cw = tw; ch = th;
        isFirstMove = false;
      }
    }

    function updatePhysics() {
      // Slow, languid water droplet physics
      const tension = 0.04; // Very low pull strength for a slow, heavy glide
      const friction = 0.85; // High friction for a viscous, liquid feel

      vx += (tx - cx) * tension;
      vy += (ty - cy) * tension;
      vw += (tw - cw) * tension;
      vh += (th - ch) * tension;

      vx *= friction;
      vy *= friction;
      vw *= friction;
      vh *= friction;

      cx += vx;
      cy += vy;
      cw += vw;
      ch += vh;

      // Water drop squash and stretch deformation
      const speedX = Math.abs(vx);
      const stretchX = Math.min(speedX * 0.02, 0.45);
      const scaleX = 1 + stretchX;
      const scaleY = 1 - (stretchX * 0.3);

      indicator.style.width = `${cw}px`;
      indicator.style.height = `${ch}px`;
      indicator.style.transform = `translate(${cx}px, ${cy}px) scale(${scaleX * jiggleState.scale}, ${scaleY * jiggleState.scale}) rotate(${jiggleState.rotation}deg)`;

      // "Bulge Zoom" effect on the text links under the sliding glass
      if (isActive || cw > 0) {
        const indicatorCenterX = cx + (cw / 2);
        items.forEach(item => {
          const itemCenterX = item.offsetLeft + (item.offsetWidth / 2);
          const distance = Math.abs(indicatorCenterX - itemCenterX);

          const radius = Math.max(cw * 1.5, 60);
          let textScale = 1;

          if (isActive && distance < radius) {
            const factor = Math.cos((distance / radius) * (Math.PI / 2));
            textScale = 1 + (0.15 * factor); // Max 15% bulge
          }

          item.style.transform = `scale(${textScale})`;
        });
      }

      requestAnimationFrame(updatePhysics);
    }

    if (activeItem) {
      setTimeout(() => moveIndicator(activeItem), 100);
    } else {
      indicator.style.opacity = '0';
    }

    window.addEventListener('resize', () => {
      if (activeItem) moveIndicator(activeItem);
    });

    updatePhysics();

    const isMagnetic = options.magnetic !== false; // Default true
    let isMouseInContainer = false;
    let hoveredItem = null;

    container.addEventListener('mouseenter', () => {
      isMouseInContainer = true;
      if (options.hideCursor) {
        document.getElementById('cursorDot')?.classList.add('is-hidden');
        document.getElementById('cursorRing')?.classList.add('is-hidden');
      }
    });

    if (isMagnetic) {
      container.addEventListener('mousemove', (e) => {
        const rect = container.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        if (!hoveredItem) {
          isActive = true;
          indicator.style.opacity = '1';
          tw = 32;
          th = 32;
          tx = mouseX - 16;
          ty = mouseY - 16;

          indicator.style.setProperty("--mouse-x", "16px");
          indicator.style.setProperty("--mouse-y", "16px");
        }
      });
    }

    items.forEach(item => {
      item.addEventListener('mouseenter', () => {
        hoveredItem = item;
        if (!isMagnetic) {
          moveIndicator(item);
        }

        // Satisfying elastic jiggle/pop when the droplet attaches to the link
        // We jiggle both the text item and the indicator together
        gsap.killTweensOf(item, "scale,rotation");
        const rot = Math.random() > 0.5 ? 2 : -2;
        gsap.fromTo(item,
          { scale: 0.85, rotation: rot },
          { scale: 1, rotation: 0, duration: 0.7, ease: "elastic.out(1.2, 0.4)", clearProps: "scale,rotation" }
        );

        gsap.killTweensOf(jiggleState);
        gsap.fromTo(jiggleState,
          { scale: 0.85, rotation: rot },
          { scale: 1, rotation: 0, duration: 0.7, ease: "elastic.out(1.2, 0.4)" }
        );
      });

      item.addEventListener('mouseleave', () => {
        hoveredItem = null;
        if (options.hideOnItemLeave) {
          if (activeItem) {
            moveIndicator(activeItem);
          } else {
            moveIndicator(null);
          }
        }
      });

      item.addEventListener('mousemove', e => {
        const rect = item.getBoundingClientRect();
        const itemMouseX = e.clientX - rect.left;
        const itemMouseY = e.clientY - rect.top;

        if (isMagnetic) {
          const mouseOffsetX = (itemMouseX - (rect.width / 2)) * 0.15;
          const mouseOffsetY = (itemMouseY - (rect.height / 2)) * 0.15;

          isActive = true;
          indicator.style.opacity = '1';

          tw = item.offsetWidth;
          th = item.offsetHeight;
          tx = item.offsetLeft + mouseOffsetX;
          ty = item.offsetTop + mouseOffsetY;
        }

        indicator.style.setProperty("--mouse-x", `${itemMouseX + item.offsetLeft - cx}px`);
        indicator.style.setProperty("--mouse-y", `${itemMouseY + item.offsetTop - cy}px`);
      });
    });

    container.addEventListener('mouseleave', () => {
      isMouseInContainer = false;
      hoveredItem = null;

      if (activeItem) {
        moveIndicator(activeItem);
      } else {
        moveIndicator(null);
      }

      items.forEach(item => item.style.transform = `scale(1)`);

      if (options.hideCursor) {
        document.getElementById('cursorDot')?.classList.remove('is-hidden');
        document.getElementById('cursorRing')?.classList.remove('is-hidden');
      }
    });
  });
}

function initSlidingNav() {
  createSlidingIndicators('nav ul.hidden.md\\:flex', '.nav-link', { matchPath: true, hideCursor: true });
  createSlidingIndicators('#navActions', 'button, a', { hideCursor: true });
  createSlidingIndicators('#heroSocials', 'a', { hideCursor: true, magnetic: false });
  createSlidingIndicators('#contactSocials', 'a', { hideCursor: true, magnetic: false });
  createSlidingIndicators('.tech-stack-container', '.tech-tag', { hideCursor: true });

  // Apply water droplet effect to all other standalone links (buttons, inline text links)
  // Exclude block-level cards, glass containers, logos, mobile menu links, sr-only buttons, and btn-magnetic to avoid double borders
  const standaloneLinks = document.querySelectorAll('a[href]:not(.nav-link):not(#navActions a):not(#heroSocials a):not(#contactSocials a):not(.tech-tag):not(.block):not(.glass):not(.logo-container):not(.sr-only):not(.btn-magnetic)');

  const linkGroups = new Map();
  standaloneLinks.forEach(link => {
    // Add the CSS class required for correct z-indexing and styling
    link.classList.add('auto-slide-link');

    const parent = link.parentElement;
    if (!linkGroups.has(parent)) {
      linkGroups.set(parent, []);
      parent.classList.add('auto-slide-container');
    }
    linkGroups.get(parent).push(link);
  });

  // Initialize physics for all dynamic link containers
  if (linkGroups.size > 0) {
    createSlidingIndicators('.auto-slide-container', '.auto-slide-link', { hideCursor: true, magnetic: false, hideOnItemLeave: true });
  }
}



/* ============================================================
   LIVE VISITOR COUNTER
   ============================================================ */
async function initLiveCounter() {
  const counterEl = document.getElementById("visitCounter");
  if (!counterEl) return;
  
  try {
    const response = await fetch("https://api.counterapi.dev/v1/aditya-parashar.vercel.app/visits/up");
    if (!response.ok) throw new Error("Failed to fetch count");
    const data = await response.json();
    
    // Animate the counter using GSAP
    if (window.gsap) {
      gsap.to({ val: 0 }, {
        val: data.count,
        duration: 2,
        ease: "power3.out",
        onUpdate: function () { 
          counterEl.textContent = Math.round(this.targets()[0].val).toLocaleString() + "+"; 
        },
      });
    } else {
      counterEl.textContent = data.count.toLocaleString() + "+";
    }
  } catch (err) {
    console.error("Live Counter Error:", err);
    if (counterEl.parentElement) { counterEl.parentElement.style.display = 'none'; } else { counterEl.textContent = ''; }
  }
}

/* ============================================================
   INIT
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  // GSAP 60 FPS Hardware Acceleration & A11y
  if (window.gsap) {
    gsap.defaults({ force3D: true });
    let mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.globalTimeline.timeScale(100);
    });
  }

  renderAll();
  initPreloader();
  initCursor();
  initMagnetic();
  initRadarProgress();
  initNav();
  initCounters();
  initLiveCounter();
  initCommandPalette();
  initFramePhotoParallax();
  initGlassCursorGlow();
  initSlidingNav();
  initThemeToggle();
});

/* ============================================================
   THEME TOGGLE & LAMP ROPE PHYSICS
   ============================================================ */
function initThemeToggle() {
  const ropeHTML = `
    <div id="theme-rope-container" class="fixed top-0 left-12 md:left-20 z-[200] pointer-events-none select-none touch-none" style="width: 200px; height: 800px; margin-left: -100px;">
      <svg class="w-full h-full overflow-visible absolute top-0 left-0" viewBox="0 0 200 800">
        <path id="rope-path" d="" class="stroke-white/30" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
      <div id="rope-handle" class="absolute w-4 h-4 rounded-full bg-white/40 transition-colors shadow-[0_0_8px_rgb(var(--color-white))] cursor-grab active:cursor-grabbing pointer-events-auto hover:bg-white/80 hover:shadow-[0_0_15px_rgb(var(--color-white))]" style="left: 100px; top: 180px; transform: translate(-50%, -50%);"></div>
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', ropeHTML);

  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
  }

  // Dynamically load Matter.js
  const script = document.createElement('script');
  script.src = "https://cdnjs.cloudflare.com/ajax/libs/matter-js/0.19.0/matter.min.js";
  script.onload = () => {
    initMatterPhysics();
  };
  document.head.appendChild(script);
}

function initMatterPhysics() {
  const Engine = Matter.Engine,
    Runner = Matter.Runner,
    Composites = Matter.Composites,
    Composite = Matter.Composite,
    Bodies = Matter.Bodies,
    Constraint = Matter.Constraint;

  const engine = Engine.create({
    positionIterations: 20, // Keep maximum stability
    velocityIterations: 16
  });
  const world = engine.world;
  world.gravity.y = 3.0; // Fast but slightly more natural than 4.0

  const group = Matter.Body.nextGroup(true);
  const numSegments = 14;
  const segmentLength = 14;

  const isHomePage = window.location.pathname === '/' || window.location.pathname.endsWith('index.html');

  // Randomize drop-in position only on the home page. Otherwise, spawn statically.
  const randomStartX = isHomePage ? (Math.random() * 600) - 200 : 100;
  const randomStartY = isHomePage ? -(Math.random() * 300 + 200) : -10;

  // Create a rope of linked bodies
  const rope = Composites.stack(randomStartX, randomStartY, 1, numSegments, 0, 0, function (x, y) {
    return Bodies.rectangle(x, y, 4, segmentLength, {
      collisionFilter: { group: group },
      frictionAir: 0.02, // Realistic air friction so it swings and bounces longer
      density: 0.1,
      slop: 0.1,
      friction: 0.5
    });
  });

  // Link them loosely together for maximum flexibility
  Composites.chain(rope, 0, 0.5, 0, -0.5, {
    stiffness: 1.0, // Fully rigid to prevent heavy bob bouncing
    length: 4 // Give joints plenty of room to rotate naturally
  });

  const lastBody = rope.bodies[rope.bodies.length - 1];
  Matter.Body.setDensity(lastBody, 4.0); // Make the bob very heavy so it aggressively pulls the rope toward gravity

  // Anchor the top of the rope to the ceiling
  const anchor = Constraint.create({
    pointA: { x: 100, y: -10 },
    bodyB: rope.bodies[0],
    pointB: { x: 0, y: -segmentLength / 2 },
    stiffness: 1,
    length: 0
  });

  Composite.add(world, [rope, anchor]);

  const ropePath = document.getElementById('rope-path');
  const ropeHandle = document.getElementById('rope-handle');
  const container = document.getElementById('theme-rope-container');

  let hasTriggered = false;

  // Sync physics loop to DOM
  Matter.Events.on(engine, 'afterUpdate', function () {
    const bodies = rope.bodies;

    // Perfectly smooth Quadratic Bezier spline through physics bodies
    if (bodies.length > 1) {
      let pathString = `M 100 -10 L ${bodies[0].position.x} ${bodies[0].position.y} `;
      for (let i = 1; i < bodies.length - 1; i++) {
        const curr = bodies[i].position;
        const next = bodies[i + 1].position;
        const midX = (curr.x + next.x) / 2;
        const midY = (curr.y + next.y) / 2;
        pathString += `Q ${curr.x} ${curr.y} ${midX} ${midY} `;
      }
      const last = bodies[bodies.length - 1].position;
      pathString += `L ${last.x} ${last.y}`;
      ropePath.setAttribute('d', pathString);
    }

    ropeHandle.style.left = `${lastBody.position.x}px`;
    ropeHandle.style.top = `${lastBody.position.y}px`;

    // Toggle logic
    if (lastBody.position.y > 260 && !hasTriggered) {
      hasTriggered = true;
      toggleTheme();

      // Use CSS variable injection for the flash so it respects the active theme
      gsap.fromTo(ropeHandle,
        { backgroundColor: 'rgb(var(--color-white))', boxShadow: '0 0 20px rgb(var(--color-white))' },
        { backgroundColor: '', boxShadow: '', duration: 0.4 }
      );
    } else if (lastBody.position.y < 220) {
      hasTriggered = false;
    }
  });

  Runner.run(Runner.create(), engine);
  
  // Gyroscope tilt support for mobile
  if (window.DeviceOrientationEvent) {
    // Request permission for iOS 13+ on first interaction
    const requestGyro = () => {
      if (typeof DeviceOrientationEvent.requestPermission === 'function') {
        DeviceOrientationEvent.requestPermission().catch(() => {});
      }
      document.body.removeEventListener('click', requestGyro);
      document.body.removeEventListener('touchstart', requestGyro);
    };
    document.body.addEventListener('click', requestGyro, { once: true });
    document.body.addEventListener('touchstart', requestGyro, { once: true });

    window.addEventListener('deviceorientation', function(event) {
      if (!engine || !engine.world) return;
      
      let tiltX = 0;
      let tiltY = 0;
      // Handle orientation changes (portrait vs landscape)
      if (window.orientation === 90) {
        tiltX = event.beta;
        tiltY = -event.gamma;
      } else if (window.orientation === -90) {
        tiltX = -event.beta;
        tiltY = event.gamma;
      } else {
        tiltX = event.gamma;
        tiltY = event.beta; // Beta is typically ~90 when held vertically
      }

      if (tiltX !== null && tiltY !== null) {
        // High sensitivity for dramatic swing.
        let gravityX = tiltX / 12; 
        let gravityY = tiltY / 30; // 90 degrees / 30 = 3.0 standard downward gravity
        
        // Clamp to prevent breaking physics
        gravityX = Math.max(-4.0, Math.min(4.0, gravityX));
        gravityY = Math.max(-4.0, Math.min(4.0, gravityY));

        engine.world.gravity.x = gravityX;
        engine.world.gravity.y = gravityY;
        
        // Wake up sleeping bodies just in case
        if (Matter.Composite && Matter.Body) {
          Matter.Composite.allBodies(engine.world).forEach(b => {
             Matter.Body.setAwake(b, true);
          });
        }
      }
    });
  }

  // Mouse interaction mapping
  let dragConstraint = null;
  let hasInteracted = false; // Track if the user has discovered the rope

  // Attraction Animation: Tug the rope slightly every 3 seconds until interacted (Only on Home Page)
  if (isHomePage) {
    const tugInterval = setInterval(() => {
      if (hasInteracted) {
        clearInterval(tugInterval);
        return;
      }
      // Apply a subtle downward/sideways force to make it organically twitch
      Matter.Body.applyForce(lastBody, lastBody.position, { x: 0.003, y: 0.015 });
    }, 3000);
  }

  function getCoords(e) {
    if (e.touches && e.touches.length > 0) {
      return { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
    return { x: e.clientX || 0, y: e.clientY || 0 };
  }

  function onDragStart(e) {
    hasInteracted = true; // User found it, stop the auto-tug
    const coords = getCoords(e);

    const rect = container.getBoundingClientRect();
    const localX = coords.x - rect.left;
    const localY = coords.y - rect.top;

    // Attach an invisible elastic spring from the mouse to the handle
    dragConstraint = Constraint.create({
      pointA: { x: localX, y: localY },
      bodyB: lastBody,
      pointB: { x: 0, y: segmentLength / 2 },
      stiffness: 0.5, // Tighter pull for heavy bob
      damping: 0.2 // Higher damping to prevent bounce so it doesn't jitter excessively
    });

    Composite.add(world, dragConstraint);
    document.body.style.userSelect = 'none';
  }

  function onDragMove(e) {
    if (!dragConstraint) return;

    // If the user released the mouse outside the browser window, 
    // e.buttons will be 0 on mousemove. We should release the rope!
    if (e.type === 'mousemove' && e.buttons === 0) {
      onDragEnd();
      return;
    }

    // Prevent default to stop scrolling on mobile while dragging!
    if (e.cancelable) e.preventDefault();

    const coords = getCoords(e);
    const rect = container.getBoundingClientRect();
    dragConstraint.pointA = {
      x: coords.x - rect.left,
      y: coords.y - rect.top
    };
  }

  function onDragEnd() {
    if (!dragConstraint) return;
    Composite.remove(world, dragConstraint);
    dragConstraint = null;
    document.body.style.userSelect = '';
  }

  ropeHandle.addEventListener('mousedown', onDragStart);
  window.addEventListener('mousemove', onDragMove, { passive: false });
  window.addEventListener('mouseup', onDragEnd);
  window.addEventListener('mouseleave', onDragEnd); // Catch mouse leaving window

  ropeHandle.addEventListener('touchstart', onDragStart, { passive: true });
  window.addEventListener('touchmove', onDragMove, { passive: false });
  window.addEventListener('touchend', onDragEnd);
  window.addEventListener('touchcancel', onDragEnd); // Catch touch interruptions
}

function playSwitchSound() {
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  if (!AudioContext) return;
  
  if (!window.audioCtx) {
    window.audioCtx = new AudioContext();
  }
  const ctx = window.audioCtx;
  if (ctx.state === 'suspended') ctx.resume();

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  // Create a mechanical 'click/clack' percussive strike
  osc.type = 'sine';
  osc.frequency.setValueAtTime(800, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.04);

  gain.gain.setValueAtTime(0.5, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.04);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + 0.04);
}

function toggleTheme() {
  playSwitchSound();
  
  const isLight = document.documentElement.getAttribute('data-theme') === 'light';
  if (isLight) {
    document.documentElement.setAttribute('data-theme', 'dark');
    localStorage.setItem('theme', 'dark');
  } else {
    document.documentElement.setAttribute('data-theme', 'light');
    localStorage.setItem('theme', 'light');
  }
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    const closeBtn = document.getElementById("closeImmersive");
    if (closeBtn) closeBtn.click();
  }
});
