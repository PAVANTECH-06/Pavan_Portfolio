/* ==========================================================================
   APP — renders every section from data.js and wires up theme + interactions.
   Edit data.js directly and push to GitHub whenever you want to update content.
   ========================================================================== */

const DATA = window.PORTFOLIO_DATA;

/* ---------- render helpers ---------- */
const $ = (sel, root = document) => root.querySelector(sel);
const el = (tag, cls, html) => {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  if (html !== undefined) n.innerHTML = html;
  return n;
};

function renderProfile() {
  const p = DATA.profile;
  document.title = `${p.shortName || p.name} — ${p.roles[0] || "Portfolio"}`;
  $("#brandHandle").textContent = p.handle;
  $("#navInitials").textContent = p.initials;
  $("#heroName").textContent = p.name;
  $("#heroSummary").textContent = p.summary;
  $("#heroPhoto").src = p.photoUrl;
  $("#heroPhoto").alt = p.name;
  $("#availabilityText").textContent = p.availability;
  $("#footerName").textContent = p.name;
  $("#footerYear").textContent = new Date().getFullYear();
  $("#resumeLink").href = p.resumeUrl;

  const aboutWrap = $("#aboutCopy");
  aboutWrap.innerHTML = "";
  p.aboutParagraphs.forEach((para) => aboutWrap.appendChild(el("p", "", para)));
  $("#aboutLocation").textContent = p.location;

  $("#hlGithub").href = p.github;
  $("#hlLinkedin").href = p.linkedin;
  $("#hlEmail").href = "mailto:" + p.email;
  $("#hlWhatsapp").href = "https://wa.me/" + (p.whatsapp || "").replace(/\D/g, "");
  $("#socialGithub").href = p.github;
  $("#socialLinkedin").href = p.linkedin;
  $("#socialEmail").href = "mailto:" + p.email;
  $("#socialWhatsapp").href = "https://wa.me/" + (p.whatsapp || "").replace(/\D/g, "");

  $("#contactEmail").textContent = p.email;
  $("#contactPhone").textContent = p.phone;
  $("#contactLocation").textContent = p.location;
  $("#copyEmail").dataset.copy = p.email;
  $("#copyPhone").dataset.copy = p.phone;

  // typing roles
  typeRoles(p.roles);
}

function typeRoles(roles) {
  const node = $("#heroRoles");
  let ri = 0, ci = 0, deleting = false;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion) { node.textContent = roles[0]; return; }

  function tick() {
    const word = roles[ri];
    node.textContent = word.slice(0, ci);
    if (!deleting && ci < word.length) { ci++; setTimeout(tick, 55); }
    else if (!deleting && ci === word.length) { deleting = true; setTimeout(tick, 1400); }
    else if (deleting && ci > 0) { ci--; setTimeout(tick, 28); }
    else { deleting = false; ri = (ri + 1) % roles.length; setTimeout(tick, 250); }
  }
  tick();
}

function renderStats() {
  const wrap = $("#statGrid");
  wrap.innerHTML = "";
  DATA.stats.forEach((s) => {
    const item = el("div", "stat");
    item.innerHTML = `<b data-target="${s.value}">0</b><span>${s.label}</span>`;
    wrap.appendChild(item);
  });
}

function animateCounters() {
  $("#statGrid").querySelectorAll("b").forEach((node) => {
    const target = node.dataset.target;
    const numMatch = target.match(/[\d.]+/);
    if (!numMatch) { node.textContent = target; return; }
    const num = parseFloat(numMatch[0]);
    const suffix = target.replace(numMatch[0], "");
    let cur = 0;
    const step = Math.max(num / 40, 0.5);
    const tick = () => {
      cur = Math.min(cur + step, num);
      node.textContent = (Number.isInteger(num) ? Math.floor(cur) : cur.toFixed(1)) + suffix;
      if (cur < num) requestAnimationFrame(tick);
    };
    tick();
  });
}

function renderSkills() {
  const wrap = $("#skillGroups");
  wrap.innerHTML = "";
  DATA.skills.forEach((g) => {
    const card = el("div", "skill-card reveal");
    card.innerHTML = `<h3>${g.category}</h3><div class="tags">${g.items.map((i) => `<span>${i}</span>`).join("")}</div>`;
    wrap.appendChild(card);
  });
}

function renderEducation() {
  const wrap = $("#educationTimeline");
  wrap.innerHTML = "";
  DATA.education.forEach((item) => {
    const node = el("div", "tl-item reveal");
    node.innerHTML = `
      <div class="period">${item.period}</div>
      <h3>${item.title}</h3>
      <div class="org">${item.org}${item.detail ? " · " + item.detail : ""}</div>
      ${item.points && item.points.length ? `<ul>${item.points.map((p) => `<li>${p}</li>`).join("")}</ul>` : ""}
    `;
    wrap.appendChild(node);
  });
}

function renderExperience() {
  const wrap = $("#experienceTimeline");
  wrap.innerHTML = "";
  DATA.experience.forEach((item) => {
    const node = el("div", "tl-item reveal");
    node.innerHTML = `
      <div class="period">${item.period}</div>
      <h3>${item.title}</h3>
      <div class="org">${item.org}</div>
      ${item.points && item.points.length ? `<ul>${item.points.map((p) => `<li>${p}</li>`).join("")}</ul>` : ""}
    `;
    wrap.appendChild(node);
  });
}

function renderProjects() {
  const wrap = $("#projectGrid");
  wrap.innerHTML = "";
  DATA.projects.forEach((p) => {
    const card = el("div", "project-card reveal");
    card.innerHTML = `
      <div class="project-media">
        <img src="${p.image}" alt="${p.title} screenshot" loading="lazy">
        <span class="project-status">${p.status}</span>
      </div>
      <div class="project-body">
        <h3>${p.title}</h3>
        <p>${p.description}</p>
        <div class="project-metrics">${p.metrics.map((m) => `<span>${m}</span>`).join("")}</div>
        <div class="project-tech">${p.tech.map((t) => `<span>${t}</span>`).join("")}</div>
        <a class="project-link" href="${p.link}" target="_blank" rel="noopener">View code →</a>
      </div>`;
    wrap.appendChild(card);
  });
}

function renderAchievements() {
  const wrap = $("#achGrid");
  wrap.innerHTML = "";
  DATA.achievements.forEach((a) => {
    const card = el("div", "ach-card reveal");
    card.innerHTML = `<h3>${a.title}</h3><p>${a.description}</p>`;
    wrap.appendChild(card);
  });
}

function renderCertificates() {
  const wrap = $("#certGrid");
  wrap.innerHTML = "";
  (DATA.certificates || []).forEach((c) => {
    const card = el("div", "cert-card reveal");
    card.innerHTML = `
      <div class="cert-thumb"><img src="${c.image}" alt="${c.title}" loading="lazy" onerror="this.closest('.cert-card').style.display='none'"></div>
      <div class="cert-info"><h4>${c.title}</h4><span>${c.issuer} · ${c.year}</span></div>`;
    card.addEventListener("click", () => openLightbox(c.image, c.title));
    wrap.appendChild(card);
  });
}

function initCertCarousel() {
  const track = $("#certGrid");
  const prev = $("#certPrev");
  const next = $("#certNext");
  if (!track || !prev || !next) return;
  const scrollAmount = () => Math.min(track.clientWidth * 0.8, 600);
  prev.addEventListener("click", () => track.scrollBy({ left: -scrollAmount(), behavior: "smooth" }));
  next.addEventListener("click", () => track.scrollBy({ left: scrollAmount(), behavior: "smooth" }));

  const updateArrows = () => {
    const atStart = track.scrollLeft <= 4;
    const atEnd = track.scrollLeft >= track.scrollWidth - track.clientWidth - 4;
    prev.classList.toggle("disabled", atStart);
    next.classList.toggle("disabled", atEnd || track.scrollWidth <= track.clientWidth + 4);
  };
  track.addEventListener("scroll", updateArrows);
  window.addEventListener("resize", updateArrows);
  updateArrows();
}

function openLightbox(src, alt) {
  const box = $("#lightbox");
  $("#lightboxImg").src = src;
  $("#lightboxImg").alt = alt;
  box.classList.add("open");
}
$("#lightbox")?.addEventListener?.("click", (e) => {
  if (e.target.id === "lightbox" || e.target.classList.contains("close")) {
    $("#lightbox").classList.remove("open");
  }
});

/* ---------- theme ---------- */
function initTheme() {
  const saved = localStorage.getItem("theme");
  let theme = saved;
  if (!theme) {
    const hour = new Date().getHours();
    theme = hour >= 6 && hour < 18 ? "day" : "night";
  }
  applyTheme(theme);
  $("#themeToggle").addEventListener("click", () => {
    const next = document.documentElement.getAttribute("data-theme") === "day" ? "night" : "day";
    applyTheme(next);
    localStorage.setItem("theme", next);
  });
}
function applyTheme(theme) {
  if (theme === "day") document.documentElement.setAttribute("data-theme", "day");
  else document.documentElement.removeAttribute("data-theme");
  const knob = $("#themeToggle .knob");
  if (knob) knob.textContent = theme === "day" ? "☀️" : "🌙";
}

/* ---------- scroll reveal ---------- */
function initReveal() {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  document.querySelectorAll(".reveal").forEach((n) => io.observe(n));

  const statObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { animateCounters(); statObserver.disconnect(); }
      });
    },
    { threshold: 0.4 }
  );
  const statGrid = $("#statGrid");
  if (statGrid) statObserver.observe(statGrid);
}

/* ---------- nav ---------- */
function initNav() {
  const menuBtn = $("#menuBtn");
  const links = $("#navLinks");
  menuBtn?.addEventListener("click", () => links.classList.toggle("open"));
  document.querySelectorAll(".nav-links a").forEach((a) =>
    a.addEventListener("click", () => links.classList.remove("open"))
  );
}

/* ---------- contact form (mailto — zero backend, zero cost) ---------- */
function initContactForm() {
  const form = $("#contactForm");
  if (!form) return;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = $("#cfName").value.trim();
    const email = $("#cfEmail").value.trim();
    const subject = $("#cfSubject").value.trim() || "Portfolio contact";
    const message = $("#cfMessage").value.trim();
    const body = `From: ${name} (${email})\n\n${message}`;
    window.location.href = `mailto:${DATA.profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    $("#formNote").textContent = "Opening your email app…";
  });
}

/* ---------- copy buttons ---------- */
function initCopyButtons() {
  document.querySelectorAll("[data-copy]").forEach((btn) => {
    btn.addEventListener("click", () => {
      navigator.clipboard.writeText(btn.dataset.copy);
      const old = btn.textContent;
      btn.textContent = "Copied ✓";
      setTimeout(() => (btn.textContent = old), 1500);
    });
  });
}

/* ---------- boot ---------- */
(function boot() {
  renderProfile();
  renderStats();
  renderSkills();
  renderEducation();
  renderExperience();
  renderProjects();
  renderAchievements();
  renderCertificates();
  initCertCarousel();
  initTheme();
  initNav();
  initContactForm();
  initCopyButtons();
  initReveal();
  document.dispatchEvent(new CustomEvent("portfolio:ready"));
})();
