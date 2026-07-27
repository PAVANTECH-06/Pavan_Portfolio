/* ==========================================================================
   SKY CANVAS — signature background
   Night: twinkling stars + occasional shooting star + soft moon glow
   Day:   slow drifting parallax cloud layers + warm sun glow
   ========================================================================== */
(function () {
  const canvas = document.getElementById('sky-canvas');
  const ctx = canvas.getContext('2d');
  let w, h, dpr;
  let stars = [];
  let clouds = [];
  let shootingStars = [];
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = window.innerWidth;
    h = window.innerHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = w + 'px';
    canvas.style.height = h + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    buildStars();
    buildClouds();
  }

  function buildStars() {
    const count = Math.floor((w * h) / 9000);
    stars = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h * 0.85,
      r: Math.random() * 1.3 + 0.3,
      phase: Math.random() * Math.PI * 2,
      speed: Math.random() * 0.015 + 0.005,
    }));
  }

  function buildClouds() {
    clouds = Array.from({ length: 6 }, (_, i) => ({
      x: Math.random() * w,
      y: h * (0.08 + i * 0.11) + Math.random() * 40,
      scale: 0.6 + Math.random() * 1.1,
      speed: 0.06 + Math.random() * 0.1,
      opacity: 0.35 + Math.random() * 0.35,
    }));
  }

  function drawCloud(c) {
    ctx.save();
    ctx.translate(c.x, c.y);
    ctx.scale(c.scale, c.scale);
    ctx.globalAlpha = c.opacity;
    ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--sky-mid') || '#fff';
    const isDay = document.documentElement.getAttribute('data-theme') === 'day';
    ctx.fillStyle = isDay ? '#ffffff' : '#2a3560';
    const puffs = [[0, 0, 32], [34, 6, 26], [-30, 8, 24], [16, -14, 22], [-12, -10, 20]];
    ctx.beginPath();
    puffs.forEach(([dx, dy, r]) => {
      ctx.moveTo(dx + r, dy);
      ctx.arc(dx, dy, r, 0, Math.PI * 2);
    });
    ctx.fill();
    ctx.restore();
  }

  function maybeSpawnShootingStar() {
    if (Math.random() < 0.0025 && shootingStars.length < 2) {
      shootingStars.push({
        x: Math.random() * w * 0.6 + w * 0.2,
        y: Math.random() * h * 0.25,
        vx: 7 + Math.random() * 4,
        vy: 3 + Math.random() * 2,
        life: 1,
      });
    }
  }

  let t = 0;
  function frame() {
    t += 1;
    ctx.clearRect(0, 0, w, h);
    const isDay = document.documentElement.getAttribute('data-theme') === 'day';

    if (isDay) {
      clouds.forEach((c) => {
        c.x += c.speed;
        if (c.x - 80 > w) c.x = -80;
        drawCloud(c);
      });
    } else {
      ctx.fillStyle = '#fff';
      stars.forEach((s) => {
        const tw = 0.55 + Math.sin(t * s.speed + s.phase) * 0.45;
        ctx.globalAlpha = tw;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalAlpha = 1;

      maybeSpawnShootingStar();
      shootingStars.forEach((s) => {
        ctx.save();
        ctx.strokeStyle = 'rgba(255,255,255,' + s.life + ')';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(s.x - s.vx * 6, s.y - s.vy * 6);
        ctx.stroke();
        ctx.restore();
        s.x += s.vx;
        s.y += s.vy;
        s.life -= 0.02;
      });
      shootingStars = shootingStars.filter((s) => s.life > 0 && s.x < w + 50 && s.y < h + 50);
    }

    if (!reduceMotion) requestAnimationFrame(frame);
  }

  window.addEventListener('resize', resize);
  resize();
  frame();
  if (reduceMotion) {
    // draw a single static frame representative of the theme
    frame();
  }
})();
