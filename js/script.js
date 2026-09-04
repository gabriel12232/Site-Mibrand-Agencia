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

  /* Avaliações reais do perfil da MIBRAND no Google. */
  const reviews = [
    { name: 'Delika Gourmet', rating: 5, text: 'A melhor agência!!! Me atendeu super bem e tive ótimos resultados.' },
    { name: 'Moacir Malaquias', rating: 5, text: 'Olá, Estou muito satisfeito com os serviços prestados pela Mibrand na gestão do meu Instagram. A equipe é extremamente profissional e cumpre os prazos estabelecidos para a entrega de conteúdos. A qualidade das postagens é excelente, sempre alinhada com a identidade da minha marca e com uma boa variedade de formatos. Além disso, a equipe entende os melhores horários para publicar, maximizando o engajamento. Muito obrigado Lari.' },
    { name: 'Laura Jacob', rating: 5, text: 'Tivemos uma experiência incrível com a Larissa e toda a equipe! A cobertura dos nossos eventos foi feita com muito cuidado, atenção aos detalhes e um olhar extremamente sensível para registrar cada momento. A Larissa foi super cuidadosa e profissional, sempre atenta às nossas necessidades, e a entrega dos conteúdos foi muito rápida, o que fez toda a diferença para nós. Tanto no evento de make quanto no evento voltado ao meio médico, o resultado ficou impecável! Sem dúvidas, uma equipe que transmite profissionalismo, dedicação e muito carinho em cada trabalho. Recomendo de olhos fechados! 🩷' },
    { name: 'GABRIELE CRISTINA SILVA FANHANI', rating: 5, text: 'As meninas são perfeitas, todos os videos e fotos que fizemos ficaram sensacionais. Pegam seu melhor angulo e as legendas/ musicas dos videos os fazem viralizar mais. Obrigada 🤎🤎🤎 …' },
    { name: 'Natalia Paiva', rating: 5, text: 'Amei muito, a equipe foi simplesmente incrível e atenciosa com os detalhes, parabéns pelo trabalho, super indico!' },
    { name: 'Gabriela Signori', rating: 5, text: 'Tive uma ótima experiência com a MIBRAND! O trabalho de videomaker e edição ficou incrível, com uma produção super profissional e um resultado que valorizou muito o evento. Equipe atenciosa, criativa e muito competente. Recomendo demais!' },
    { name: 'larissa silva vieira', rating: 5, text: 'Eu amei demais a Lari, ela é incrível em tudo o que ela faz, além de ser super atenciosa o trabalho dela é incrível! Gente ela gravou meu trabalho e editou tudo!!! Ficou perfeito 😍 …' },
    { name: 'Giovanna Martins', rating: 5, text: 'Maravilhosas!!! Trabalho lindo, e super profissionais. O meu instagram esta ficando impecável.' },
    { name: 'GABRIELLY MANHA PICCIRILLO', rating: 5, text: 'Foi INCRÍVEL! Na verdade, acho que incrível é pouco, o serviço de vocês foi IMPECÁVEL. Além de profissionais incríveis, são simpáticos, pacientes, nos ajudam quando não temos nada me mente. Eu com certeza contratarei novamente e recomendei e recomendarei para todos que eu puder.' }
  ];

  const reviewsCarousel = document.querySelector('[data-reviews-carousel]');
  if (reviewsCarousel) {
    const reviewsTrack = reviewsCarousel.querySelector('[data-reviews-track]');
    const reviewsPrevious = reviewsCarousel.querySelector('[data-reviews-prev]');
    const reviewsNext = reviewsCarousel.querySelector('[data-reviews-next]');
    const reviewsDots = reviewsCarousel.querySelector('[data-reviews-dots]');
    const reviewsCount = reviewsCarousel.querySelector('[data-reviews-count]');
    const reviewsSource = document.querySelector('.reviews-link')?.href || '#';
    const reviewModal = document.querySelector('[data-review-modal]');
    const reviewModalClose = reviewModal?.querySelector('[data-review-modal-close]');
    const reviewModalAvatar = reviewModal?.querySelector('[data-review-modal-avatar]');
    const reviewModalName = reviewModal?.querySelector('[data-review-modal-name]');
    const reviewModalStars = reviewModal?.querySelector('[data-review-modal-stars]');
    const reviewModalText = reviewModal?.querySelector('[data-review-modal-text]');
    const reviewModalLink = reviewModal?.querySelector('[data-review-modal-link]');
    const formatReviewNumber = number => String(number).padStart(2, '0');
    const reviewInitials = name => name.trim().split(/\s+/).slice(0, 2).map(part => part[0]).join('').toUpperCase();
    const ReviewCard = (review, index) => {
      const rating = Math.max(0, Math.min(5, Number(review.rating) || 0));
      return `<article class="review-card" data-review-index="${index}" role="group" aria-roledescription="slide" aria-label="Avaliação ${index + 1} de ${reviews.length}">
        <header class="review-card-head">
          <span class="review-avatar" aria-hidden="true">${reviewInitials(review.name)}</span>
          <span class="review-user"><strong>${review.name}</strong><small>Avaliação no Google</small></span>
          <span class="google-sign" aria-label="Google"><b aria-hidden="true">G</b><span>Google</span></span>
        </header>
        <span class="review-card-stars" aria-label="${rating} de 5 estrelas">${'★'.repeat(rating)}${'☆'.repeat(5 - rating)}</span>
        <div class="review-card-content"><p class="review-card-text" data-review-text>“${review.text}”</p></div>
        <div class="review-card-more-row"><button class="review-more" type="button" data-review-more="${index}" hidden>Ler avaliação completa</button></div>
        <footer class="review-card-footer"><span>Avaliação pública no Google</span><a href="${reviewsSource}" target="_blank" rel="noopener noreferrer">Ver no Google ↗</a></footer>
      </article>`;
    };

    reviewsTrack.innerHTML = reviews.map(ReviewCard).join('');
    const reviewCards = [...reviewsTrack.children];
    let reviewDots = [];
    let currentPage = 0;
    let autoplay;

    const visibleReviews = () => innerWidth >= 1024 ? 3 : innerWidth >= 768 ? 2 : 1;
    const reviewStep = () => {
      const firstReview = reviewsTrack.firstElementChild;
      if (!firstReview) return 0;
      return firstReview.getBoundingClientRect().width + (parseFloat(getComputedStyle(reviewsTrack).columnGap) || 0);
    };
    const pageCount = () => Math.ceil(reviews.length / visibleReviews());
    const pageStep = () => reviewStep() * visibleReviews();
    const currentReviewPage = () => Math.min(pageCount() - 1, Math.max(0, Math.round(reviewsTrack.scrollLeft / pageStep())));
    const buildReviewDots = () => {
      reviewsDots.innerHTML = Array.from({ length: pageCount() }, (_, index) => `<button class="reviews-dot${index === currentPage ? ' is-active' : ''}" type="button" aria-label="Ir para o grupo ${index + 1} de avaliações"${index === currentPage ? ' aria-current="true"' : ''}></button>`).join('');
      reviewDots = [...reviewsDots.children];
      reviewDots.forEach((dot, index) => dot.addEventListener('click', () => scrollToReviewPage(index)));
    };
    const updateReviewCount = () => {
      currentPage = currentReviewPage();
      reviewsCount.textContent = `${formatReviewNumber(currentPage + 1)} / ${formatReviewNumber(pageCount())}`;
      reviewDots.forEach((dot, index) => {
        const active = index === currentPage;
        dot.classList.toggle('is-active', active);
        if (active) dot.setAttribute('aria-current', 'true');
        else dot.removeAttribute('aria-current');
      });
    };
    const scrollToReviewPage = (page, smooth = true) => {
      const total = pageCount();
      const target = (page + total) % total;
      currentPage = target;
      reviewsTrack.scrollTo({ left: target * pageStep(), behavior: smooth && !reducedMotion ? 'smooth' : 'auto' });
      updateReviewCount();
    };
    const moveReviews = direction => scrollToReviewPage(currentPage + direction);
    const updateMoreButtons = () => {
      reviewCards.forEach(card => {
        const text = card.querySelector('[data-review-text]');
        const button = card.querySelector('[data-review-more]');
        button.hidden = text.scrollHeight <= text.clientHeight + 1;
      });
    };
    const stopAutoplay = () => clearInterval(autoplay);
    const startAutoplay = () => {
      if (reducedMotion || reviews.length <= visibleReviews() || reviewModal?.open) return;
      stopAutoplay();
      autoplay = setInterval(() => moveReviews(1), 6000);
    };
    const openReviewModal = index => {
      const review = reviews[index];
      const rating = Math.max(0, Math.min(5, Number(review.rating) || 0));
      if (!reviewModal || !review) return;
      reviewModalAvatar.textContent = reviewInitials(review.name);
      reviewModalName.textContent = review.name;
      reviewModalStars.textContent = `${'★'.repeat(rating)}${'☆'.repeat(5 - rating)}`;
      reviewModalStars.setAttribute('aria-label', `${rating} de 5 estrelas`);
      reviewModalText.textContent = `“${review.text}”`;
      reviewModalLink.href = reviewsSource;
      stopAutoplay();
      document.body.classList.add('review-modal-open');
      reviewModal.showModal();
    };
    const closeReviewModal = () => reviewModal?.close();

    reviewsPrevious.addEventListener('click', () => moveReviews(-1));
    reviewsNext.addEventListener('click', () => moveReviews(1));
    reviewsTrack.querySelectorAll('[data-review-more]').forEach(button => {
      button.addEventListener('click', () => openReviewModal(Number(button.dataset.reviewMore)));
    });
    reviewsTrack.addEventListener('scroll', updateReviewCount, { passive: true });
    reviewsTrack.addEventListener('keydown', event => {
      if (event.key === 'ArrowLeft') { event.preventDefault(); moveReviews(-1); }
      if (event.key === 'ArrowRight') { event.preventDefault(); moveReviews(1); }
      if (event.key === 'Home') { event.preventDefault(); scrollToReviewPage(0); }
      if (event.key === 'End') { event.preventDefault(); scrollToReviewPage(pageCount() - 1); }
    });
    addEventListener('resize', () => {
      currentPage = Math.min(currentPage, pageCount() - 1);
      buildReviewDots();
      scrollToReviewPage(currentPage, false);
      updateMoreButtons();
    });

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
      scrollToReviewPage(currentReviewPage());
    };
    reviewsTrack.addEventListener('pointerup', stopDragging);
    reviewsTrack.addEventListener('pointercancel', stopDragging);

    reviewsCarousel.addEventListener('mouseenter', stopAutoplay);
    reviewsCarousel.addEventListener('mouseleave', startAutoplay);
    reviewsCarousel.addEventListener('focusin', stopAutoplay);
    reviewsCarousel.addEventListener('focusout', startAutoplay);
    reviewsCarousel.addEventListener('pointerdown', stopAutoplay);
    reviewsCarousel.addEventListener('pointerup', startAutoplay);
    reviewModalClose?.addEventListener('click', closeReviewModal);
    reviewModal?.addEventListener('click', event => { if (event.target === reviewModal) closeReviewModal(); });
    reviewModal?.addEventListener('close', () => {
      document.body.classList.remove('review-modal-open');
      startAutoplay();
    });

    buildReviewDots();
    updateReviewCount();
    requestAnimationFrame(updateMoreButtons);
    startAutoplay();
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
    document.querySelectorAll('.reviews, .contact, .footer').forEach(section => blockerObserver.observe(section));
    updateFloatingWhatsApp();
  }

  const year = document.querySelector('#year');
  if (year) year.textContent = new Date().getFullYear();
})();
