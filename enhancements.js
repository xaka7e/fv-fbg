
(() => {
  // Signature page transition line.
  const bar = document.createElement('div');
  bar.className = 'page-transition is-entering';
  bar.setAttribute('aria-hidden','true');
  document.body.appendChild(bar);
  window.setTimeout(() => bar.classList.remove('is-entering'), 500);

  document.addEventListener('click', (event) => {
    const a = event.target.closest('a[href]');
    if (!a || event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const href = a.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:') || a.target === '_blank') return;
    const url = new URL(a.href, location.href);
    if (url.origin !== location.origin) return;
    if (url.pathname === location.pathname && url.hash) return;
    event.preventDefault();
    bar.classList.remove('is-entering');
    bar.classList.add('is-leaving');
    window.setTimeout(() => { location.href = url.href; }, 210);
  });

  // Count-up for the three headline metrics.
  const counters = [...document.querySelectorAll('[data-count]')];
  if (counters.length) {
    const run = (el) => {
      if (el.dataset.done) return;
      el.dataset.done='1';
      const target = Number(el.dataset.count || 0), suffix = el.dataset.suffix || '';
      const start = performance.now(), duration = 900;
      const tick = (now) => {
        const p = Math.min(1,(now-start)/duration), eased = 1-Math.pow(1-p,3);
        el.textContent = Math.round(target*eased).toLocaleString('de-CH') + suffix;
        if (p<1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver(es => es.forEach(e => { if(e.isIntersecting){run(e.target);io.unobserve(e.target)}}),{threshold:.35});
      counters.forEach(c=>io.observe(c));
    } else counters.forEach(run);
  }

  // Interactive Swiss project map.
  document.querySelectorAll('.project-map').forEach((section) => {
    const points=[...section.querySelectorAll('.map-point')];
    const city=section.querySelector('#mapCity'), project=section.querySelector('#mapProject'), meta=section.querySelector('#mapMeta');
    const activate=(point) => {
      if(!point) return;
      points.forEach(p=>p.classList.toggle('is-active',p===point));
      if(city) city.textContent=point.dataset.city || '';
      if(project) project.textContent=point.dataset.project || '';
      if(meta) meta.textContent=point.dataset.meta || '';
    };
    points.forEach(point => {
      point.addEventListener('mouseenter',()=>activate(point));
      point.addEventListener('focus',()=>activate(point));
      point.addEventListener('click',()=>activate(point));
    });
    section.querySelectorAll('[data-map-target]').forEach((btn,i)=>btn.addEventListener('click',()=>{
      activate(points[i]);
      section.querySelector('.map-card')?.scrollIntoView({behavior:'smooth',block:'center'});
    }));
  });

  // Reveal the new editorial blocks without changing legacy behavior.
  const extra=[...document.querySelectorAll('.work-process .process-track article,.project-map .map-shell,.dual-cta>a')];
  extra.forEach(el=>el.classList.add('reveal'));
  if(extra.length && 'IntersectionObserver' in window){
    const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('is-visible');io.unobserve(e.target)}}),{threshold:.08});
    extra.forEach(el=>io.observe(el));
  } else extra.forEach(el=>el.classList.add('is-visible'));
})();
