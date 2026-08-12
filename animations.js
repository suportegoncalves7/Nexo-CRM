(function () {
  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var hasGsap = typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined';

  if (!hasGsap || reducedMotion) {
    document.querySelectorAll('.reveal').forEach(function (el) {
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  function animateDashboardMetrics() {
    gsap.utils.toArray('.stat-value, .mini-chart-card .stat-copy strong').forEach(function (el) {
      var text = el.textContent.trim();
      var match = text.match(/-?\d+(\.\d+)?/);
      if (!match) return;
      var target = parseFloat(match[0]);
      var decimals = match[0].indexOf('.') > -1 ? 1 : 0;
      var prefix = text.slice(0, match.index);
      var suffix = text.slice(match.index + match[0].length);
      var counter = { val: 0 };
      gsap.to(counter, {
        val: target,
        duration: 1.1,
        ease: 'power1.out',
        onUpdate: function () { el.textContent = prefix + counter.val.toFixed(decimals) + suffix; },
        onComplete: function () { el.textContent = text; }
      });
    });

    gsap.set('.bar-chart span', { scaleY: 0, transformOrigin: 'bottom' });
    gsap.to('.bar-chart span', { scaleY: 1, duration: 0.7, ease: 'power2.out', stagger: 0.05 });

    var donut = document.querySelector('.donut');
    if (donut) {
      var donutValueEl = donut.querySelector('span');
      var donutTarget = parseInt((donutValueEl.textContent.match(/\d+/) || ['0'])[0], 10);
      var donutCounter = { val: 0 };
      gsap.to(donutCounter, {
        val: donutTarget,
        duration: 1.1,
        ease: 'power1.out',
        onUpdate: function () {
          var v = donutCounter.val;
          donut.style.background = 'conic-gradient(var(--teal) 0% ' + v + '%, var(--surface-border) ' + v + '% 100%)';
          donutValueEl.textContent = Math.round(v) + '%';
        }
      });
    }
  }

  // ---------- Entrada do hero ----------
  gsap.timeline({ defaults: { ease: 'power3.out' } })
    .to('.hero-copy .eyebrow', { opacity: 1, y: 0, duration: 0.5 })
    .to('.hero-copy h1', { opacity: 1, y: 0, duration: 0.6 }, '-=0.3')
    .to('.hero-copy .lede', { opacity: 1, y: 0, duration: 0.5 }, '-=0.35')
    .to('.hero-copy .cta-row', { opacity: 1, y: 0, duration: 0.5 }, '-=0.3')
    .to('.hero-visual .dashboard-card', { opacity: 1, y: 0, duration: 0.7 }, '-=0.35')
    .to('.hero-visual .floating-chip', { opacity: 1, y: 0, duration: 0.4 }, '-=0.25')
    .add(animateDashboardMetrics, '-=0.15');

  // ---------- Reveal com stagger ao rolar ----------
  function revealGroup(selector) {
    var items = gsap.utils.toArray(selector);
    if (!items.length) return;
    gsap.to(items, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: 'power2.out',
      stagger: 0.12,
      scrollTrigger: { trigger: items[0].parentElement, start: 'top 82%', once: true }
    });
  }

  revealGroup('.pillar-card');
  revealGroup('.process-step');
  revealGroup('.benefit-card');
  revealGroup('.manifesto blockquote');
  revealGroup('#contato .final-cta');

  // ---------- Header reativo ao scroll ----------
  ScrollTrigger.create({
    start: 'top -80',
    end: 99999,
    toggleClass: { targets: 'header.site', className: 'is-scrolled' }
  });

  // ---------- Linha de progresso na metodologia ----------
  var track = document.querySelector('.process-track-fill');
  if (track) {
    gsap.to(track, {
      height: '100%',
      ease: 'none',
      scrollTrigger: {
        trigger: '.process-list',
        start: 'top 60%',
        end: 'bottom 60%',
        scrub: true
      }
    });
  }
})();
