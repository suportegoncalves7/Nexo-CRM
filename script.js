(function () {
  var toggle = document.getElementById('menu-toggle');
  var nav = document.getElementById('primary-nav');
  var iconOpen = document.getElementById('menu-icon-open');
  var iconClose = document.getElementById('menu-icon-close');

  function closeMenu() {
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    iconOpen.style.display = '';
    iconClose.style.display = 'none';
    closeAllDropdowns();
  }
  function openMenu() {
    nav.classList.add('open');
    toggle.setAttribute('aria-expanded', 'true');
    iconOpen.style.display = 'none';
    iconClose.style.display = '';
  }
  toggle.addEventListener('click', function () {
    var isOpen = nav.classList.contains('open');
    if (isOpen) closeMenu(); else openMenu();
  });
  nav.querySelectorAll('.dropdown-menu a').forEach(function (a) {
    a.addEventListener('click', closeMenu);
  });
  nav.querySelectorAll(':scope > a').forEach(function (a) {
    a.addEventListener('click', closeMenu);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeMenu();
  });

  var dropdownItems = Array.prototype.slice.call(document.querySelectorAll('.nav-item.has-dropdown'));

  function closeAllDropdowns() {
    dropdownItems.forEach(function (item) {
      item.classList.remove('open');
      var btn = item.querySelector('.dropdown-toggle');
      if (btn) btn.setAttribute('aria-expanded', 'false');
    });
  }

  dropdownItems.forEach(function (item) {
    var btn = item.querySelector('.dropdown-toggle');
    if (!btn) return;
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      var isOpen = item.classList.contains('open');
      closeAllDropdowns();
      if (!isOpen) {
        item.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  document.addEventListener('click', function (e) {
    dropdownItems.forEach(function (item) {
      if (!item.contains(e.target)) {
        item.classList.remove('open');
        var btn = item.querySelector('.dropdown-toggle');
        if (btn) btn.setAttribute('aria-expanded', 'false');
      }
    });
  });

  var mql = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (!mql.matches && 'IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    document.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });
  } else {
    document.querySelectorAll('.reveal').forEach(function (el) { el.classList.add('in-view'); });
  }
})();
