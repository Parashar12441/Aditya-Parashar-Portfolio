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
  statsEl.innerHTML = D.hero.stats.map((s, i) => `
    <div class="stat-card rounded-3xl p-6 text-center reveal-up">
      <div class="font-display text-4xl text-gradient" data-counter data-target="${s.value}" data-suffix="${s.suffix}">0${s.suffix}</div>
      <div class="mt-1 text-xs uppercase tracking-widest text-white/40 font-mono">${s.label}</div>
    </div>
  `).join("");
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
        <p class="text-sm text-white/45 leading-relaxed">${f.detail}</p>
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
  projEl.innerHTML = D.projects.map(p => `
    <article class="glass-card rounded-3xl p-7 sm:p-8 reveal-up flex flex-col" id="project-${p.id}">
      <div class="flex items-start justify-between mb-6">
        <div class="w-11 h-11 rounded-xl flex items-center justify-center bg-accent-${p.accent} border border-accent-${p.accent}">
          <i data-lucide="${ACCENT_ICON[p.accent] || 'box'}" class="w-5 h-5 accent-${p.accent}"></i>
        </div>
        <div class="flex flex-col items-end gap-1.5">
          <span class="font-mono text-[10px] tracking-widest uppercase text-white/60 border border-white/10 rounded-full px-2.5 py-1">${p.status}</span>
          ${p.badge ? `
            <span class="inline-flex items-center gap-1.5 font-mono text-[9px] tracking-widest uppercase rounded-full px-2.5 py-0.5 ${p.badge.type === 'gold' ? 'text-amber-400 border border-amber-400/20 bg-amber-400/5' : 'text-slate-300 border border-slate-300/20 bg-slate-300/5'}">
              <i data-lucide="${p.badge.icon}" class="w-3 h-3"></i>
              ${p.badge.text}
            </span>
          ` : ''}
        </div>
      </div>
      <p class="font-mono text-xs text-white/60 mb-2">${p.period} · ${p.category}</p>
      <h3 class="font-display text-2xl text-white mb-1.5">${p.title}</h3>
      <p class="text-sm accent-${p.accent} mb-4">${p.subtitle}</p>
      <p class="text-sm text-white/75 leading-relaxed mb-5">${p.description}</p>
      <ul class="space-y-1.5 mb-6">
        ${p.points.map(pt => `<li class="text-xs text-white/60 leading-relaxed flex gap-2"><span class="text-white/20 mt-0.5">▹</span><span>${pt}</span></li>`).join("")}
      </ul>
      <div class="tech-stack-container mt-auto flex flex-wrap gap-2 pt-4 border-t border-white/5 relative">
        ${p.tech.map(t => `<span class="tech-tag text-[11px] font-mono text-white/70 rounded-full px-2.5 py-1 relative z-10">${t}</span>`).join("")}
      </div>
    </article>
  `).join("");
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
        <div class="flex items-start gap-4 mb-6">
          <img src="${data.avatar_url}" alt="${data.login}" class="w-16 h-16 rounded-full border border-white/10" />
          <div>
            <h3 class="font-display text-xl text-white/90">${data.name || data.login}</h3>
            <a href="${data.html_url}" target="_blank" rel="noopener noreferrer" class="text-sm font-mono text-white/40 hover:text-accent-blue transition-colors">@${data.login}</a>
          </div>
        </div>
        
        <p class="text-sm text-white/60 mb-6 leading-relaxed">${data.bio || "Building things for the web."}</p>
        
        <div class="grid grid-cols-3 gap-4 border-t border-white/10 pt-6">
          <div class="text-center">
            <div class="font-display text-2xl text-white">${data.public_repos}</div>
            <div class="text-[10px] uppercase tracking-widest text-white/40 mt-1">Repos</div>
          </div>
          <div class="text-center">
            <div class="font-display text-2xl text-white">${data.followers}</div>
            <div class="text-[10px] uppercase tracking-widest text-white/40 mt-1">Followers</div>
          </div>
          <div class="text-center">
            <div class="font-display text-2xl text-white">${data.following}</div>
            <div class="text-[10px] uppercase tracking-widest text-white/40 mt-1">Following</div>
          </div>
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
    <div class="flex items-center gap-4">
      <i data-lucide="code-2" class="w-6 h-6 accent-blue flex-shrink-0" style="color:#4f7cff;"></i>
      <div>
        <p class="text-sm text-white/60">Live stats are unavailable right now.</p>
        <a href="https://leetcode.com/u/${username}/" target="_blank" rel="noopener noreferrer" class="text-sm accent-blue underline underline-offset-4" style="color:#4f7cff;">View the profile directly →</a>
      </div>
    </div>
  `;
  if (window.lucide) lucide.createIcons();
  initGlassCursorGlow();
}

function renderLeetcodeStats(container, stats, username) {
  const bars = [
    { label: "Easy", solved: stats.easySolved, total: stats.totalEasy, color: "#34d399" },
    { label: "Medium", solved: stats.mediumSolved, total: stats.totalMedium, color: "#d4af37" },
    { label: "Hard", solved: stats.hardSolved, total: stats.totalHard, color: "#f87171" },
  ];

  container.innerHTML = `
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
          <div class="flex justify-between text-xs font-mono text-white/45 mb-1.5">
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

  // Website URL Button
  if (D.startup.website_url && D.startup.website_url !== '#') {
    html += `
      <div class="mt-8" data-reveal>
        <a href="${D.startup.website_url}" target="_blank" class="btn-magnetic glow-primary inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-white" style="background: var(--accent-blue);">
          Visit Website <i data-lucide="arrow-up-right" class="w-4 h-4"></i>
        </a>
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
  document.querySelectorAll(".btn-magnetic").forEach(btn => {
    btn.addEventListener("mousemove", (e) => {
      const r = btn.getBoundingClientRect();
      const x = e.clientX - r.left - r.width / 2;
      const y = e.clientY - r.top - r.height / 2;
      gsap.to(btn, { x: x * 0.25, y: y * 0.35, duration: 0.4, ease: "power2.out" });
    });
    btn.addEventListener("mouseleave", () => {
      gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.4)" });
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
      indicator.style.transform = `translate(${cx}px, ${cy}px) scale(${scaleX}, ${scaleY})`;
      
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
      });
      
      item.addEventListener('mouseleave', () => {
        hoveredItem = null;
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
}

/* ============================================================
   INIT
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  renderAll();
  initPreloader();
  initCursor();
  initMagnetic();
  initRadarProgress();
  initNav();
  initCounters();
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
        <path id="rope-path" d="" stroke="rgba(255,255,255,0.3)" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
      <div id="rope-handle" class="absolute w-4 h-4 rounded-full bg-white/40 transition-colors shadow-[0_0_8px_rgba(255,255,255,0.8)] cursor-grab active:cursor-grabbing pointer-events-auto hover:bg-white/80 hover:shadow-[0_0_15px_rgba(255,255,255,1)]" style="left: 100px; top: 180px; transform: translate(-50%, -50%);"></div>
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
  
  // Create a rope of linked bodies (start high above screen so it drops in dramatically!)
  const rope = Composites.stack(100, -300, 1, numSegments, 0, 0, function(x, y) {
      return Bodies.rectangle(x, y, 4, segmentLength, { 
          collisionFilter: { group: group },
          frictionAir: 0.15, // High air friction acts like thick fluid to stop "dancing"
          density: 0.1, 
          slop: 0.1,
          friction: 0.5
      });
  });

  // Link them tightly together
  Composites.chain(rope, 0, 0.5, 0, -0.5, { 
      stiffness: 0.9, // Slight flex so it behaves like a rope, not a stick
      length: 2 // Gives joints room to rotate naturally
  });
  
  const lastBody = rope.bodies[rope.bodies.length - 1];
  // No extreme density differences needed anymore, gravity handles the speed
  
  // Anchor the top of the rope to the ceiling
  const anchor = Constraint.create({
      pointA: { x: 100, y: -10 },
      bodyB: rope.bodies[0],
      pointB: { x: 0, y: -segmentLength/2 },
      stiffness: 1,
      length: 0
  });

  Composite.add(world, [rope, anchor]);

  const ropePath = document.getElementById('rope-path');
  const ropeHandle = document.getElementById('rope-handle');
  const container = document.getElementById('theme-rope-container');
  
  let hasTriggered = false;
  
  // Sync physics loop to DOM
  Matter.Events.on(engine, 'afterUpdate', function() {
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
      if (lastBody.position.y > 340 && !hasTriggered) {
         hasTriggered = true;
         toggleTheme();
         gsap.fromTo(ropeHandle, 
           { backgroundColor: 'rgba(255,255,255,1)', boxShadow: '0 0 20px rgba(255,255,255,0.9)' }, 
           { backgroundColor: '', boxShadow: '', duration: 0.4 }
         );
      } else if (lastBody.position.y < 280) {
         hasTriggered = false;
      }
  });

  Runner.run(Runner.create(), engine);

  // Mouse interaction mapping
  let dragConstraint = null;
  let hasInteracted = false; // Track if the user has discovered the rope

  // Attraction Animation: Tug the rope slightly every 3 seconds until interacted
  const tugInterval = setInterval(() => {
      if (hasInteracted) {
          clearInterval(tugInterval);
          return;
      }
      // Apply a subtle downward/sideways force to make it organically twitch
      Matter.Body.applyForce(lastBody, lastBody.position, { x: 0.01, y: 0.06 });
  }, 3000);

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
         pointB: { x: 0, y: segmentLength/2 },
         stiffness: 0.1, // Stretchy rubber band feel
         damping: 0.5 // High damping prevents violent jitter when dragged fast
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
  window.addEventListener('mousemove', onDragMove, {passive: false});
  window.addEventListener('mouseup', onDragEnd);
  window.addEventListener('mouseleave', onDragEnd); // Catch mouse leaving window
  
  ropeHandle.addEventListener('touchstart', onDragStart, {passive: true});
  window.addEventListener('touchmove', onDragMove, {passive: false});
  window.addEventListener('touchend', onDragEnd);
  window.addEventListener('touchcancel', onDragEnd); // Catch touch interruptions
}

function toggleTheme() {
  const isLight = document.documentElement.getAttribute('data-theme') === 'light';
  if (isLight) {
     document.documentElement.setAttribute('data-theme', 'dark');
     localStorage.setItem('theme', 'dark');
  } else {
     document.documentElement.setAttribute('data-theme', 'light');
     localStorage.setItem('theme', 'light');
  }
}
