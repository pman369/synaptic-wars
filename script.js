(function () {
  'use strict';

  // ============================================================
  //  NEURAL NETWORK BACKGROUND
  // ============================================================
  const canvas = document.getElementById('neural-bg');
  const ctx = canvas.getContext('2d');
  let W, H;

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  // --- nodes ---
  const NODE_COUNT = 80;
  const nodes = [];

  for (let i = 0; i < NODE_COUNT; i++) {
    nodes.push({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 2 + 1.5,
    });
  }

  function drawNeural() {
    ctx.clearRect(0, 0, W, H);

    // update positions
    for (const n of nodes) {
      n.x += n.vx;
      n.y += n.vy;
      if (n.x < 0 || n.x > W) n.vx *= -1;
      if (n.y < 0 || n.y > H) n.vy *= -1;
    }

    // draw connections
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 160) {
          const alpha = (1 - dist / 160) * 0.5;
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.strokeStyle = `rgba(124, 92, 252, ${alpha})`;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }
    }

    // draw nodes
    for (const n of nodes) {
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(0, 240, 255, 0.7)';
      ctx.fill();
      ctx.shadowBlur = 8;
      ctx.shadowColor = 'rgba(0, 240, 255, 0.4)';
    }
    ctx.shadowBlur = 0;

    requestAnimationFrame(drawNeural);
  }

  drawNeural();

  // ============================================================
  //  SCROLL REVEAL (Intersection Observer)
  // ============================================================
  const revealEls = document.querySelectorAll(
    '.section, .principle-card, .trinity-card, .impact-card, .pledge-box, blockquote, .code-block, table'
  );

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      }
    },
    { threshold: 0.1 }
  );

  for (const el of revealEls) {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
    observer.observe(el);
  }

  // ============================================================
  //  PARALLAX GRID ON HERO
  // ============================================================
  const heroGrid = document.querySelector('.hero-grid');
  if (heroGrid) {
    window.addEventListener('mousemove', (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 10;
      const y = (e.clientY / window.innerHeight - 0.5) * 10;
      heroGrid.style.transform = `translate(${x}px, ${y}px)`;
    });
  }

  // ============================================================
  //  NAVIGATION — smooth scroll for anchor links
  // ============================================================
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
})();
