/*
  FBG BAU — JAVASCRIPT

  Здесь находится поведение сайта:
  - кран и DOKA на desktop;
  - рабочий на лестнице на mobile;
  - смена текста по этапам;
  - FERTIG в конце;
  - плавное появление секций;
  - мобильное меню.

  Комментарии оставлены по-русски специально для удобства редактирования.
*/

(() => {
  // Главная scroll-секция. От неё считаем общий прогресс 0 → 1.
  const section = document.querySelector('.build-scroll');

  // Элементы desktop-сцены с краном.
  const trolley = document.getElementById('trolley');
  const cable = document.getElementById('cable');
  const hook = document.getElementById('hook');
  const panel = document.getElementById('panel'); // Пачка из пяти DOKA H20.
  const slingLeft = document.getElementById('slingLeft');
  const slingRight = document.getElementById('slingRight');
  const slab = document.querySelector('.new-slab');
  const worker = document.getElementById('worker');
  const desktopEnd = document.getElementById('desktopEnd');

  // Индикатор текущего этапа внизу экрана.
  const stepNo = document.getElementById('stepNo');
  const stepText = document.getElementById('stepText');
  const progressBar = document.getElementById('progressBar');

  // Фоновая фотография главной сцены.
  const heroPhoto = document.querySelector('.hero-photo');

  // Элементы мобильной сцены.
  const mobileWorker = document.getElementById('mobileWorker');
  const mobileEnd = document.getElementById('mobileEnd');
  const mobileStairs = document.getElementById('mobileStairs');

  // Текст слева, который меняется по этапам.
  const storyCopy = document.getElementById('storyCopy');
  const heroEyebrow = document.getElementById('heroEyebrow');
  const heroHeadline = document.getElementById('heroHeadline');
  const heroLead = document.getElementById('heroLead');
  const heroFact = document.getElementById('heroFact');
  // Пять текстовых этапов для desktop-сцены.
  const storyStages=[
    {eyebrow:'01 · MATERIAL & VORBEREITUNG', headline:'WIR BRINGEN<br><span>BETON IN FORM.</span>', lead:'Präzise Schalungsarbeiten. Eingespielte Teams. Leistung, die auf der Baustelle sichtbar wird.', fact:'SEIT 1995 · SCHWEIZWEIT'},
    {eyebrow:'02 · SCHALUNG ANHEBEN', headline:'ALLES BEGINNT<br><span>MIT DER FORM.</span>', lead:'Das richtige Schalungselement, sauber vorbereitet und genau dann bereit, wenn es auf der Baustelle gebraucht wird.', fact:'EIGENES SCHALUNGSINVENTAR · BIS ZU 50’000 m²'},
    {eyebrow:'03 · ELEMENT VERSETZEN', headline:'BEWEGUNG<br><span>MUSS SITZEN.</span>', lead:'Kran, Material und Team greifen ineinander. So werden grosse Flächen schnell, sicher und kontrolliert versetzt.', fact:'DOKAMATIC · STAXO 100 · DECKENSTÜTZEN'},
    {eyebrow:'04 · POSITIONIERUNG', headline:'PRÄZISION<br><span>AUF DEN PUNKT.</span>', lead:'Jedes Element wird exakt positioniert. Bevor Beton fliesst, muss die Form stimmen – Zentimeter für Zentimeter.', fact:'60+ MITARBEITENDE · EINGESPIELTE TEAMS'},
    {eyebrow:'05 · ERGEBNIS', headline:'FORM WIRD<br><span>STRUKTUR.</span>', lead:'Aus Schalung wird Decke. Aus präziser Arbeit wird ein Bauwerk, das bleibt – Projekt für Projekt.', fact:'30+ JAHRE ERFAHRUNG · 550+ PROJEKTE'}
  ];
  // Отдельные пять текстовых этапов для мобильной сцены.
  const mobileStoryStages=[
    {eyebrow:'01 · EINSTIEG', headline:'WIR STEIGEN<br><span>FÜR SIE EIN.</span>', lead:'Oben beginnt die Szene mit DOKA-Material: eine 700er Stütze und die lange Longerine 4.90 begleiten den Weg nach unten.', fact:'FBG BAU · SCHWEIZWEIT'},
    {eyebrow:'02 · TEAM', headline:'SCHRITT FÜR<br><span>SCHRITT.</span>', lead:'Erfahrung, Tempo und ein eingespieltes Team – genau dort, wo die Arbeit passiert.', fact:'60+ MITARBEITENDE'},
    {eyebrow:'03 · SCHALUNG', headline:'JEDE ETAGE<br><span>HAT IHRE FORM.</span>', lead:'Von DOKA-Trägern bis zu Deckenstützen: präzise Schalungsarbeit in jeder Höhe.', fact:'BIS ZU 50’000 m² INVENTAR'},
    {eyebrow:'04 · ERFAHRUNG', headline:'UNTEN KOMMT<br><span>QUALITÄT AN.</span>', lead:'30+ Jahre Erfahrung und über 550 realisierte Projekte – gebaut mit Konsequenz.', fact:'QUALITÄTSARBEIT SEIT 1995'},
    {eyebrow:'05 · FERTIG', headline:'BEREIT FÜR<br><span>IHR PROJEKT?</span>', lead:'Wir sind unten angekommen. Jetzt beginnt das nächste Projekt.', fact:'FBG BAU GMBH'}
  ];
  // Состояние смены текста.
  let activeStoryStage=-1, activeStoryMode='', storyTimer=0;
  // Текущий общий прогресс главной сцены.
  let currentProgress=0;
  // Меняем заголовок и описание при переходе на следующий этап.
  function setStoryStage(next){
    const mode=window.innerWidth<=760?'mobile':'desktop';
    if(next===activeStoryStage && mode===activeStoryMode) return;
    activeStoryStage=next;
    activeStoryMode=mode;
    clearTimeout(storyTimer);
    storyCopy.classList.add('is-switching');
    const applyStage=()=>{
      const stage=(mode==='mobile'?mobileStoryStages:storyStages)[next];
      heroEyebrow.textContent=stage.eyebrow;
      heroHeadline.innerHTML=stage.headline;
      heroLead.textContent=stage.lead;
      heroFact.textContent=stage.fact;
      requestAnimationFrame(()=>storyCopy.classList.remove('is-switching'));
    };
    if(reducedMotion?.matches){
      applyStage();
    }else{
      storyTimer=setTimeout(applyStage,150);
    }
  }
  // Простые помощники для расчёта плавного движения.
  const clamp=(n,a=0,b=1)=>Math.min(b,Math.max(a,n));
  const lerp=(a,b,t)=>a+(b-a)*t;
  const ease=t=>{t=clamp(t);return t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2};
  const segment=(p,a,b)=>clamp((p-a)/(b-a));

  // Mobile browser chrome changes the visual viewport while the user scrolls.
  // Always use the currently visible height when calculating the scene.
  const viewportHeight=()=>Math.max(1, Math.round(window.visualViewport?.height || window.innerHeight || document.documentElement.clientHeight || 1));
  const pageScrollY=()=>window.scrollY ?? document.documentElement.scrollTop ?? 0;
  const reducedMotion=window.matchMedia?.('(prefers-reduced-motion: reduce)') || null;

  // Все координаты груза считаются от положения крюка.
  // После натяжения строп пачка DOKA идёт за крюком с постоянным смещением,
  // поэтому груз визуально не может «оторваться» от троса.
  // =====================================================
  // DESKTOP: движение крана и пачки DOKA.
  // p = прогресс сцены от 0 до 1.
  // =====================================================
  function setLift(p){
    const vw=window.innerWidth;
    const isPhone=vw<=760;
    const isSmallPhone=vw<=480;

    // Главные координаты траектории груза.
    // Если понадобится двигать кран/груз — смотреть сюда.
    const startX=isPhone ? (isSmallPhone ? 610 : 590) : 550;
    const travelX=isPhone ? (isSmallPhone ? 930 : 900) : 825;
    const panelStartX=isPhone ? (isSmallPhone ? 520 : 500) : 455;
    const panelStartY=589;
    const panelTravelX=isPhone ? (isSmallPhone ? 835 : 810) : 730;
    const hookLiftTop=isPhone ? 235 : 250;
    const panelLiftTop=isPhone ? 294 : 309;
    const hookLowerY=isPhone ? 252 : 263;
    const panelLowerY=isPhone ? 307 : 322;

    let hookX=startX, hookY=360;
    let panelX=panelStartX, panelY=panelStartY;

    // Шаг 01: крюк опускается к стропам, DOKA пока стоит на месте.
    const descend=ease(segment(p,.00,.18));
    hookY=lerp(360,530,descend);

    // Шаг 02: подъём. Крюк и DOKA двигаются как одна система.
    if(p>=.18){
      const lift=ease(segment(p,.18,.42));
      hookY=lerp(530,hookLiftTop,lift);
      panelY=lerp(589,panelLiftTop,lift);
    }

    // Шаг 03: движение по горизонтали. Все элементы смещаются одинаково по X.
    if(p>=.42){
      const travel=ease(segment(p,.42,.72));
      hookX=lerp(startX,travelX,travel);
      panelX=lerp(panelStartX,panelTravelX,travel);
      hookY=hookLiftTop; panelY=panelLiftTop;
    }

    // Шаг 04: опускаем материал в конечную позицию.
    if(p>=.72){
      const lower=ease(segment(p,.72,.92));
      hookX=travelX; panelX=panelTravelX;
      hookY=lerp(hookLiftTop,hookLowerY,lower);
      panelY=lerp(panelLiftTop,panelLowerY,lower);
    }

    // Шаг 05: маленькая финальная досадка материала.
    if(p>=.92){
      const settle=ease(segment(p,.92,1));
      hookY=lerp(hookLowerY,hookLowerY-5,settle);
      panelY=lerp(panelLowerY,panelLowerY,settle);
    }

    const trolleyDx=hookX-startX;
    trolley.setAttribute('transform',`translate(${trolleyDx} 0)`);
    cable.setAttribute('x1',hookX); cable.setAttribute('x2',hookX); cable.setAttribute('y1',186); cable.setAttribute('y2',hookY);
    hook.setAttribute('transform',`translate(${hookX} ${hookY})`);
    panel.setAttribute('transform',`translate(${panelX} ${panelY})`);

    // Стропы появляются перед подъёмом и остаются привязанными к пачке.
    const slingOpacity=segment(p,.145,.195);
    const hookApexY=hookY+30;
    slingLeft.setAttribute('x1',hookX); slingLeft.setAttribute('y1',hookApexY); slingLeft.setAttribute('x2',panelX+24); slingLeft.setAttribute('y2',panelY);
    slingRight.setAttribute('x1',hookX); slingRight.setAttribute('y1',hookApexY); slingRight.setAttribute('x2',panelX+166); slingRight.setAttribute('y2',panelY);
    slingLeft.style.opacity=slingOpacity; slingRight.style.opacity=slingOpacity;

    slab.style.opacity=String(segment(p,.88,1));
    heroPhoto.style.transform=`scale(${lerp(1.06,1.11,p)}) translateY(${lerp(0,-12,p)}px)`;
    if(worker){
      // Desktop worker stays at a constant scale so SVG branding does not shimmer/jump
      // while scrolling. Integer-pixel Y movement preserves the subtle parallax.
      const workerY=Math.round(lerp(0,10,p));
      worker.style.transform=`translate3d(0, ${workerY}px, 0)`;
    }
  }

  // =====================================================
  // MOBILE: рабочий спускается по лестнице от скролла.
  // В самом конце останавливается и появляется FERTIG.
  // =====================================================
  function setMobileStairs(p){
    if(!mobileWorker) return;
    if(window.innerWidth>760){
      mobileWorker.classList.remove('is-finished');
      if(mobileEnd) mobileEnd.classList.remove('is-visible');
      section?.querySelector('.sticky-stage')?.classList.remove('is-mobile-final');
      return;
    }
    const vh=viewportHeight();
    const startY=Math.max(82, vh*.11);
    const endY=Math.max(startY+250, vh-335);
    const descend=ease(segment(p,.02,.88));
    const y=lerp(startY,endY,descend);
    const calmMotion=!!reducedMotion?.matches;
    const sway=calmMotion?0:Math.sin(p*36)*4*(1-segment(p,.84,.96));
    const bob=calmMotion?0:Math.abs(Math.sin(p*45))*3*(1-segment(p,.84,.96));
    const scale=lerp(.96,1.04,descend);
    mobileWorker.style.transform=`translate(${sway}px, ${y-startY+bob}px) scale(${scale})`;
    const walking=p<.9 && !reducedMotion?.matches;
    const phase=walking?Math.sin(p*52):0;
    const armL=walking?phase*12:0, armR=walking?-phase*12:0;
    const legL=walking?-phase*8:0, legR=walking?phase*8:0;
    mobileWorker.querySelector('.mw-arm-l')?.style.setProperty('transform',`rotate(${armL}deg)`);
    mobileWorker.querySelector('.mw-arm-r')?.style.setProperty('transform',`rotate(${armR}deg)`);
    mobileWorker.querySelector('.mw-leg-l')?.style.setProperty('transform',`rotate(${legL}deg)`);
    mobileWorker.querySelector('.mw-leg-r')?.style.setProperty('transform',`rotate(${legR}deg)`);
    const fertigVisible=p>=.86;
    const done=p>=.92;
    mobileWorker.classList.toggle('is-finished',done);
    if(mobileEnd) mobileEnd.classList.toggle('is-visible',fertigVisible);
    const stickyStage=section?.querySelector('.sticky-stage');
    if(stickyStage) stickyStage.classList.toggle('is-mobile-final',done);
    if(mobileStairs){
      const shift=lerp(0,-90,p);
      mobileStairs.style.backgroundPosition=`0 ${shift}px, 0 0, 0 0`;
    }
  }

  // Главная функция: считает прогресс и обновляет нужную сцену.
  function update(){
    if(!section) return;
    const vh=viewportHeight();
    const rect=section.getBoundingClientRect();
    // rect.top works even when content exists above the scene. Using the visual
    // viewport height keeps progress stable when mobile browser UI expands/collapses.
    const scrollable=Math.max(1,section.offsetHeight-vh);
    const p=clamp((-rect.top)/scrollable);
    currentProgress=p;
    progressBar.style.width=`${p*100}%`; if(window.innerWidth<=760){setMobileStairs(p)}else{setLift(p)};
    if(desktopEnd) desktopEnd.classList.toggle('is-visible', window.innerWidth>760 && p>=.90);
    let no='01',text=(window.innerWidth<=760?'Abstieg beginnt':'DOKA-Material aufnehmen'),story=0;
    if(p>=.18){no='02';text=(window.innerWidth<=760?'Etage wechseln':'DOKA-Träger anheben');story=1}
    if(p>=.42){no='03';text=(window.innerWidth<=760?'An Schalung vorbei':'DOKA-Element versetzen');story=2}
    if(p>=.72){no='04';text=(window.innerWidth<=760?'Unten ankommen':'Positionieren');story=3}
    if(p>=.92){no='05';text=(window.innerWidth<=760?'Daumen hoch':'Fertig positioniert');story=4}
    stepNo.textContent=no; stepText.textContent=text; setStoryStage(story);
  }
  // Не даём scroll/viewport событиям запускать больше одной перерисовки за кадр.
  let ticking=false;
  const requestUpdate=()=>{
    if(ticking) return;
    ticking=true;
    requestAnimationFrame(()=>{
      update();
      ticking=false;
    });
  };

  addEventListener('scroll',requestUpdate,{passive:true});

  // Keep the current scroll position inside the sticky scene after a real resize
  // or orientation change. Do not force-scroll on every visualViewport resize:
  // mobile browser chrome itself changes that viewport continuously while scrolling.
  const handleResize=()=>{
    requestAnimationFrame(()=>{
      if(!section) return;
      const vh=viewportHeight();
      const startY=section.offsetTop;
      const endY=startY + Math.max(1,section.offsetHeight-vh) - 1;
      const y=pageScrollY();
      if(y>=startY && y<startY+section.offsetHeight && y>endY){
        window.scrollTo(0,endY);
      }
      // Force the copy to be re-selected when crossing the mobile breakpoint.
      activeStoryMode='';
      update();
    });
  };

  addEventListener('resize',handleResize,{passive:true});
  addEventListener('orientationchange',handleResize,{passive:true});
  addEventListener('pageshow',requestUpdate,{passive:true});
  addEventListener('load',requestUpdate,{passive:true});
  document.addEventListener('visibilitychange',()=>{if(!document.hidden) requestUpdate();},{passive:true});

  if(window.visualViewport){
    window.visualViewport.addEventListener('resize',requestUpdate,{passive:true});
    window.visualViewport.addEventListener('scroll',requestUpdate,{passive:true});
  }
  reducedMotion?.addEventListener?.('change',requestUpdate);

  // First paint + one post-layout paint. This also fixes pages restored from bfcache.
  update();
  requestAnimationFrame(requestUpdate);

  // Плавно показываем обычные блоки, когда они попадают в экран.
  document.querySelectorAll('.about-card,.service-grid article,.current-list article,.project,.reference-archive-grid article,.timeline article,.leadership article,.loyalty-story,.news-card,.jobs article,.partner-panel,.contact-grid>div').forEach(el=>el.classList.add('reveal'));
  const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('is-visible');io.unobserve(e.target)}}),{threshold:.12});
  document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
  // Логика мобильного меню.
  const menu=document.querySelector('.menu-btn'), nav=document.querySelector('.nav');
  if(menu&&nav){
    const closeMenu=()=>{
      nav.style.display='none';
      menu.setAttribute('aria-expanded','false');
      menu.setAttribute('aria-label','Menü öffnen');
    };
    menu.addEventListener('click',()=>{
      const open=nav.style.display==='flex';
      if(open){ closeMenu(); return; }
      nav.style.display='flex';
      nav.style.position='fixed';
      nav.style.left='0';
      nav.style.right='0';
      const topbar=document.querySelector('.topbar');
      nav.style.top=((topbar?.getBoundingClientRect().height)|| (window.innerWidth<=760?68:74))+'px';
      nav.style.padding='22px';
      nav.style.background='rgba(7,9,10,.97)';
      nav.style.backdropFilter='blur(18px)';
      nav.style.flexDirection='column';
      nav.style.alignItems='center';
      nav.style.gap='18px';
      nav.style.borderBottom='1px solid rgba(255,255,255,.08)';
      menu.setAttribute('aria-expanded','true');
      menu.setAttribute('aria-label','Menü schließen');
    });
    nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{ if(window.innerWidth<=980) closeMenu(); }));
    document.addEventListener('keydown',(event)=>{ if(event.key==='Escape' && menu.getAttribute('aria-expanded')==='true'){ closeMenu(); menu.focus(); } });
    addEventListener('resize',()=>{ if(window.innerWidth>980){ nav.removeAttribute('style'); menu.setAttribute('aria-expanded','false');
      menu.setAttribute('aria-label','Menü öffnen'); } else { closeMenu(); } });
  }
})();
