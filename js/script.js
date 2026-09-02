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

  document.querySelectorAll('[data-whatsapp-service]').forEach(link => {
    const service = link.dataset.whatsappService;
    const message = `Olá! Conheci a MIBRAND pelo site e gostaria de conversar sobre o serviço de ${service}.`;
    const encodedServiceMessage = encodeURIComponent(message).replace(/!/g, '%21');
    link.href = `https://wa.me/${contactConfig.whatsappNumber}?text=${encodedServiceMessage}`;
    link.target = '_blank';
    link.rel = 'noopener';
    link.setAttribute('aria-label', `Conversar sobre ${service} pelo WhatsApp`);
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

  const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 24);
  onScroll();
  addEventListener('scroll', onScroll, { passive: true });

  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const projectVideos = document.querySelectorAll('.project-media video');

  if (!reducedMotion && projectVideos.length) {
    const videoObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.play().catch(() => {});
        else entry.target.pause();
      });
    }, { threshold: 0.35 });
    projectVideos.forEach(video => videoObserver.observe(video));
  }

  document.querySelectorAll('[data-carousel]').forEach(carousel => {
    const carouselTrack = carousel.querySelector('[data-carousel-track]');
    const carouselPrevious = carousel.querySelector('[data-carousel-prev]');
    const carouselNext = carousel.querySelector('[data-carousel-next]');
    if (!carouselTrack || !carouselPrevious || !carouselNext) return;

    const updateCarouselControls = () => {
      const maxScroll = carouselTrack.scrollWidth - carouselTrack.clientWidth;
      carouselPrevious.disabled = carouselTrack.scrollLeft <= 2;
      carouselNext.disabled = carouselTrack.scrollLeft >= maxScroll - 2;
    };
    const moveCarousel = direction => {
      const firstItem = carouselTrack.firstElementChild;
      if (!firstItem) return;
      const gap = parseFloat(getComputedStyle(carouselTrack).columnGap) || 0;
      carouselTrack.scrollBy({
        left: direction * (firstItem.getBoundingClientRect().width + gap),
        behavior: reducedMotion ? 'auto' : 'smooth'
      });
    };

    carouselPrevious.addEventListener('click', () => moveCarousel(-1));
    carouselNext.addEventListener('click', () => moveCarousel(1));
    carouselTrack.addEventListener('scroll', updateCarouselControls, { passive: true });
    addEventListener('resize', updateCarouselControls);
    updateCarouselControls();
  });

  /* Substitua somente os campos abaixo pelas avaliações reais do Google. */
  const reviews = [
    { name: 'Nome do cliente', rating: 5, text: 'Inserir avaliação real do Google aqui' },
    { name: 'Nome do cliente', rating: 5, text: 'Inserir avaliação real do Google aqui' },
    { name: 'Nome do cliente', rating: 5, text: 'Inserir avaliação real do Google aqui' },
    { name: 'Nome do cliente', rating: 5, text: 'Inserir avaliação real do Google aqui' },
    { name: 'Nome do cliente', rating: 5, text: 'Inserir avaliação real do Google aqui' },
    { name: 'Nome do cliente', rating: 5, text: 'Inserir avaliação real do Google aqui' },
    { name: 'Nome do cliente', rating: 5, text: 'Inserir avaliação real do Google aqui' },
    { name: 'Nome do cliente', rating: 5, text: 'Inserir avaliação real do Google aqui' },
    { name: 'Nome do cliente', rating: 5, text: 'Inserir avaliação real do Google aqui' },
    { name: 'Nome do cliente', rating: 5, text: 'Inserir avaliação real do Google aqui' }
  ];

  const reviewsCarousel = document.querySelector('[data-reviews-carousel]');
  if (reviewsCarousel) {
    const reviewsTrack = reviewsCarousel.querySelector('[data-reviews-track]');
    const reviewsPrevious = reviewsCarousel.querySelector('[data-reviews-prev]');
    const reviewsNext = reviewsCarousel.querySelector('[data-reviews-next]');
    const reviewsCount = reviewsCarousel.querySelector('[data-reviews-count]');
    const formatReviewNumber = number => String(number).padStart(2, '0');

    reviewsTrack.innerHTML = reviews.map((review, index) => {
      const rating = Math.max(0, Math.min(5, Number(review.rating) || 0));
      return `<article class="review-card reveal" aria-label="Avaliação ${index + 1} de ${reviews.length}">
        <span class="review-card-stars" aria-label="${rating} de 5 estrelas">${'★'.repeat(rating)}${'☆'.repeat(5 - rating)}</span>
        <blockquote>“${review.text}”</blockquote>
        <footer><strong>${review.name}</strong><span>Avaliação no Google</span></footer>
      </article>`;
    }).join('');

    const reviewStep = () => {
      const firstReview = reviewsTrack.firstElementChild;
      if (!firstReview) return 0;
      return firstReview.getBoundingClientRect().width + (parseFloat(getComputedStyle(reviewsTrack).columnGap) || 0);
    };
    const currentReview = () => Math.min(reviews.length - 1, Math.max(0, Math.round(reviewsTrack.scrollLeft / reviewStep())));
    const updateReviewCount = () => {
      reviewsCount.textContent = `${formatReviewNumber(currentReview() + 1)} / ${formatReviewNumber(reviews.length)}`;
    };
    const moveReviews = direction => {
      const current = currentReview();
      const target = direction > 0
        ? (current + 1) % reviews.length
        : (current - 1 + reviews.length) % reviews.length;
      reviewsTrack.scrollTo({ left: target * reviewStep(), behavior: reducedMotion ? 'auto' : 'smooth' });
    };

    reviewsPrevious.addEventListener('click', () => moveReviews(-1));
    reviewsNext.addEventListener('click', () => moveReviews(1));
    reviewsTrack.addEventListener('scroll', updateReviewCount, { passive: true });
    addEventListener('resize', updateReviewCount);

    let dragging = false;
    let dragStartX = 0;
    let dragStartScroll = 0;
    reviewsTrack.addEventListener('pointerdown', event => {
      if (event.pointerType === 'touch') return;
      dragging = true;
      dragStartX = event.clientX;
      dragStartScroll = reviewsTrack.scrollLeft;
      reviewsTrack.classList.add('is-dragging');
      reviewsTrack.setPointerCapture(event.pointerId);
    });
    reviewsTrack.addEventListener('pointermove', event => {
      if (dragging) reviewsTrack.scrollLeft = dragStartScroll - (event.clientX - dragStartX);
    });
    const stopDragging = event => {
      if (!dragging) return;
      dragging = false;
      reviewsTrack.classList.remove('is-dragging');
      if (reviewsTrack.hasPointerCapture(event.pointerId)) reviewsTrack.releasePointerCapture(event.pointerId);
      reviewsTrack.scrollTo({ left: currentReview() * reviewStep(), behavior: reducedMotion ? 'auto' : 'smooth' });
    };
    reviewsTrack.addEventListener('pointerup', stopDragging);
    reviewsTrack.addEventListener('pointercancel', stopDragging);

    if (!reducedMotion && reviews.length > 1) {
      let autoplay;
      const stopAutoplay = () => clearInterval(autoplay);
      const startAutoplay = () => {
        stopAutoplay();
        autoplay = setInterval(() => moveReviews(1), 6000);
      };
      reviewsCarousel.addEventListener('mouseenter', stopAutoplay);
      reviewsCarousel.addEventListener('mouseleave', startAutoplay);
      reviewsCarousel.addEventListener('focusin', stopAutoplay);
      reviewsCarousel.addEventListener('focusout', startAutoplay);
      reviewsCarousel.addEventListener('pointerdown', stopAutoplay);
      reviewsCarousel.addEventListener('pointerup', startAutoplay);
      startAutoplay();
    }
    updateReviewCount();
  }

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
  if (floatingWhatsApp) {
    const floatingBlockers = new Set();
    let heroActionsPassed = !heroActions;
    const updateFloatingWhatsApp = () => {
      floatingWhatsApp.classList.toggle('is-visible', heroActionsPassed && floatingBlockers.size === 0);
    };
    if (heroActions) {
      const heroActionsObserver = new IntersectionObserver(([entry]) => {
        heroActionsPassed = !entry.isIntersecting && entry.boundingClientRect.bottom < 0;
        updateFloatingWhatsApp();
      }, { threshold: 0 });
      heroActionsObserver.observe(heroActions);
    }
    const blockerObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) floatingBlockers.add(entry.target);
        else floatingBlockers.delete(entry.target);
      });
      updateFloatingWhatsApp();
    }, { threshold: 0.05 });
    document.querySelectorAll('.contact, .footer').forEach(section => blockerObserver.observe(section));
    updateFloatingWhatsApp();
  }

  const year = document.querySelector('#year');
  if (year) year.textContent = new Date().getFullYear();
})();
