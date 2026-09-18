(() => {
  /* ================================================================
     ОБЩАЯ ЛОГИКА ВНУТРЕННИХ СТРАНИЦ
     Здесь только меню и плавное появление секций.
     Главная анимация крана остаётся отдельно в script.js.
     ================================================================ */

  const menu = document.querySelector('.menu-btn');
  const nav = document.querySelector('.nav');

  // Мобильное меню. Поведение специально такое же, как на главной.
  if (menu && nav) {
    const closeMenu = () => {
      nav.style.display = 'none';
      menu.setAttribute('aria-expanded', 'false');
      menu.setAttribute('aria-label', 'Menü öffnen');
    };

    menu.addEventListener('click', () => {
      const open = nav.style.display === 'flex';
      if (open) {
        closeMenu();
        return;
      }

      nav.style.display = 'flex';
      nav.style.position = 'fixed';
      nav.style.left = '0';
      nav.style.right = '0';
      const topbar = document.querySelector('.topbar');
      nav.style.top = ((topbar?.getBoundingClientRect().height) || (window.innerWidth <= 760 ? 68 : 74)) + 'px';
      nav.style.padding = '22px';
      nav.style.background = 'rgba(7,9,10,.98)';
      nav.style.backdropFilter = 'blur(18px)';
      nav.style.flexDirection = 'column';
      nav.style.alignItems = 'center';
      nav.style.gap = '18px';
      nav.style.borderBottom = '1px solid rgba(255,255,255,.08)';
      menu.setAttribute('aria-expanded', 'true');
      menu.setAttribute('aria-label', 'Menü schließen');
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') {
        closeMenu();
        menu.focus();
      }
    });

    nav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 980) closeMenu();
      });
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 980) {
        nav.removeAttribute('style');
        menu.setAttribute('aria-expanded', 'false');
      menu.setAttribute('aria-label', 'Menü öffnen');
      } else {
        closeMenu();
      }
    }, { passive: true });
  }

  // Небольшое плавное появление контента, без тяжёлых эффектов.
  const revealTargets = document.querySelectorAll(
    '.section-pad > *, .values-strip article, .page-cta > *, .page-next > *, .about-portal'
  );
  revealTargets.forEach((element) => element.classList.add('reveal'));

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });
    revealTargets.forEach((element) => observer.observe(element));
  } else {
    revealTargets.forEach((element) => element.classList.add('is-visible'));
  }
})();
