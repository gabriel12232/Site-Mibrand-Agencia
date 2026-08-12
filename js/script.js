(() => {
  const contactConfig = {
    whatsappNumber: '5511973408275',
    whatsappMessage: 'Olá! Conheci a MIBRAND pelo site e gostaria de conversar sobre um projeto.'
  };
  const encodedMessage = encodeURIComponent(contactConfig.whatsappMessage).replace(/!/g, '%21');
  const whatsappURL = `https://wa.me/${contactConfig.whatsappNumber}?text=${encodedMessage}`;

  document.querySelectorAll('.whatsapp-link').forEach(link => {
    link.href = whatsappURL;
    link.target = '_blank';
    link.rel = 'noopener';
  });

  const header = document.querySelector('[data-header]');
  const menu = document.querySelector('#menu');
  const toggle = document.querySelector('.menu-toggle');
  const menuLinks = [...menu.querySelectorAll('a')];
  const desktopQuery = matchMedia('(min-width: 64rem)');
  let lastFocusedElement = null;
  const setMenuInteractive = interactive => {
    if (interactive) {
      menu.removeAttribute('inert');
      menu.removeAttribute('aria-hidden');
      menuLinks.forEach(link => link.removeAttribute('tabindex'));
    } else {
      menu.setAttribute('inert', '');
      menu.setAttribute('aria-hidden', 'true');
      menuLinks.forEach(link => link.setAttribute('tabindex', '-1'));
    }
  };
  const closeMenu = () => {
    menu.classList.remove('open');
    header.classList.remove('menu-active');
    document.body.classList.remove('menu-open');
    setMenuInteractive(desktopQuery.matches);
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Abrir menu');
    if (lastFocusedElement && !desktopQuery.matches) lastFocusedElement.focus();
  };

  toggle.addEventListener('click', () => {
    const opening = !menu.classList.contains('open');
    menu.classList.toggle('open', opening);
    header.classList.toggle('menu-active', opening);
    document.body.classList.toggle('menu-open', opening);
    toggle.setAttribute('aria-expanded', String(opening));
    toggle.setAttribute('aria-label', opening ? 'Fechar menu' : 'Abrir menu');
    setMenuInteractive(opening);
    if (opening) {
      lastFocusedElement = toggle;
      menuLinks[0].focus();
    }
  });
  menuLinks.forEach(link => link.addEventListener('click', () => {
    closeMenu();
    if (link.getAttribute('href')?.startsWith('#')) {
      requestAnimationFrame(() => toggle.focus());
    }
  }));
  document.addEventListener('keydown', event => {
    if (!menu.classList.contains('open')) return;
    if (event.key === 'Escape') closeMenu();
    if (event.key === 'Tab') {
      const focusable = [...menuLinks, toggle];
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }
  });

  const syncMenuMode = () => {
    if (desktopQuery.matches) {
      setMenuInteractive(true);
      menu.classList.remove('open');
      header.classList.remove('menu-active');
      document.body.classList.remove('menu-open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Abrir menu');
    } else {
      setMenuInteractive(menu.classList.contains('open'));
    }
  };
  syncMenuMode();
  desktopQuery.addEventListener('change', syncMenuMode);

  document.querySelectorAll('.service summary').forEach(summary => {
    summary.addEventListener('keydown', event => {
      if (event.key !== 'Enter' && event.key !== ' ') return;
      event.preventDefault();
      const service = summary.closest('details');
      service.open = !service.open;
    });
  });

  const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 24);
  onScroll();
  addEventListener('scroll', onScroll, { passive: true });

  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reducedMotion) {
    document.querySelectorAll('.reveal').forEach(item => item.classList.add('visible'));
  } else {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: .12 });
    document.querySelectorAll('.reveal').forEach(item => observer.observe(item));
  }

  const floatingWhatsApp = document.querySelector('.floating-whatsapp');
  const heroActions = document.querySelector('.hero .actions');
  const floatingBlockers = new Set();
  let heroActionsPassed = false;
  const updateFloatingWhatsApp = () => {
    floatingWhatsApp.classList.toggle('is-visible', heroActionsPassed && floatingBlockers.size === 0);
  };
  const heroActionsObserver = new IntersectionObserver(([entry]) => {
    heroActionsPassed = !entry.isIntersecting && entry.boundingClientRect.bottom < 0;
    updateFloatingWhatsApp();
  }, { threshold: 0 });
  const blockerObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) floatingBlockers.add(entry.target);
      else floatingBlockers.delete(entry.target);
    });
    updateFloatingWhatsApp();
  }, { threshold: 0.05 });
  heroActionsObserver.observe(heroActions);
  document.querySelectorAll('.contact, .footer').forEach(section => blockerObserver.observe(section));

  document.querySelector('#year').textContent = new Date().getFullYear();
})();
