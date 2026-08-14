/* ═══════════════ BENDRAS PUSLAPIŲ SKRIPTAS ═══════════════
   Kiekviena skiltis dabar turi savo puslapį, todėl visi blokai
   paleidžiami tik tada, kai puslapyje randamas jų konteineris. */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const PARAMS = new URLSearchParams(location.search);

/* ═══════════════ ERDVIŲ TINKLELIS + FILTRAI (erdves.html) ═══════════════ */
const band = (n) => n <= 100 ? 's' : (n <= 250 ? 'm' : 'l');
const imgSrc = (sp, file) => `assets/img/${sp.dir === 'skc' ? 'skc' : 'spaces'}/${file}.jpg`;
const askHref = (name) => `uzklausa.html?erdve=${encodeURIComponent(name)}`;
const cardsEl = $('#cards');
const state = {loc:'all', size:'all'};

function matches(sp){
  const okLoc = state.loc === 'all' || (state.loc === 'lauko' ? sp.outdoor : sp.loc === state.loc);
  const okSize = state.size === 'all' || band(sp.theatre) === state.size;
  return okLoc && okSize;
}

/* Kortelė naudojama ir erdvių puslapyje, ir pradinio puslapio santraukoje.
   Skiriasi tik pirmas veiksmas: puslapyje jis atveria pop-upą, pradiniame — veda į erdvių puslapį. */
function cardHTML(sp, {teaser = false} = {}){
  const L = LOC[sp.loc];
  return `<article class="card">
      <div class="card-media">
        <img loading="lazy" src="${imgSrc(sp, sp.photos[0][0])}" alt="${sp.name} — ${L.name}, ${L.addr}" width="1200" height="750">
        <span class="card-count">${sp.photos.length} nuotr.</span>
      </div>
      <div class="card-strip" style="background:${L.color}"></div>
      <div class="card-body">
        <span class="card-loc" style="color:${L.ink}"><i class="loc-dot" style="background:${L.color}"></i>${L.name} · ${L.addr}</span>
        <h3>${sp.name}</h3>
        <div class="metas">
          <span>Plotas<b>${sp.area}</b></span>
          <span>${sp.outdoor ? 'Lauko renginys' : 'Teatro stiliumi'}<b>iki ${sp.theatre.toLocaleString('lt-LT')}</b></span>
        </div>
        ${sp.note ? `<p class="card-note">${sp.note}</p>` : ''}
        <div class="card-actions">
          ${teaser
            ? `<a class="chip chip--sm" href="erdves.html?atidaryti=${sp.id}">Žiūrėti erdvę</a>`
            : `<button class="chip chip--sm" data-open="${sp.id}">Žiūrėti erdvę</button>`}
          <a class="chip chip--primary chip--sm" href="${askHref(sp.name)}">Gauti pasiūlymą</a>
        </div>
      </div>
    </article>`;
}

function renderCards(){
  const list = SPACES.filter(matches);
  cardsEl.innerHTML = list.length ? list.map(sp => cardHTML(sp)).join('')
    : `<p class="empty-note">Pagal šiuos filtrus erdvių nėra. <button class="linkish" id="resetF" style="border:0;border-bottom:1.5px solid var(--rust)">Rodyti visas erdves</button></p>`;

  $('#fcount').textContent = list.length === 1 ? '1 erdvė' : (list.length >= 11 && list.length <= 19 ? list.length + ' erdvių' : (list.length % 10 === 0 || list.length === 0 ? list.length + ' erdvių' : list.length + ' erdvės'));
  const rf = $('#resetF');
  if (rf) rf.addEventListener('click', () => { state.loc = 'all'; state.size = 'all'; syncFilters(); renderCards(); });
}

function syncFilters(){
  $$('.fbtn[data-f]').forEach(b => b.setAttribute('aria-pressed', String(state[b.dataset.f] === b.dataset.v)));
}

if (cardsEl){
  /* filtrai gali ateiti iš kito puslapio: erdves.html?size=l&loc=arts */
  const pLoc = PARAMS.get('loc'), pSize = PARAMS.get('size');
  if (pLoc && ['park','arts','zity','lauko'].includes(pLoc)) state.loc = pLoc;
  if (pSize && ['s','m','l'].includes(pSize)) state.size = pSize;
  $$('.fbtn[data-f]').forEach(b => b.addEventListener('click', () => {
    state[b.dataset.f] = b.dataset.v; syncFilters(); renderCards();
  }));
  syncFilters();
  renderCards();
}

/* ═══════════════ PRADINIO PUSLAPIO SANTRAUKOS (index.html) ═══════════════
   Pradiniame rodomos tik kelios erdvės ir scenarijai — visa kita atsiveria savo puslapyje. */
/* Kaskada: kas antras stulpelis pastumiamas žemyn per pusę kortelės aukščio.
   CSS to neapskaičiuotų (procentinė paraštė matuojama nuo pločio), todėl žingsnį paduodame
   kintamuoju ir perskaičiuojame pasikeitus kortelės aukščiui (šriftai, nuotraukos, lango plotis). */
function stagger(grid, varName){
  const first = grid && grid.firstElementChild;
  if (!first) return;
  const setStep = () => grid.style.setProperty(varName, Math.round(first.offsetHeight / 2) + 'px');
  setStep();
  document.fonts?.ready.then(setStep);
  if (window.ResizeObserver) new ResizeObserver(setStep).observe(first);
  else addEventListener('resize', setStep, {passive: true});
}

const teaserEl = $('#cardsTeaser');
if (teaserEl){
  teaserEl.innerHTML = (teaserEl.dataset.ids || '').split(',')
    .map(id => SPACES.find(s => s.id === id.trim()))
    .filter(Boolean)
    .map(sp => cardHTML(sp, {teaser: true})).join('');
  if (teaserEl.classList.contains('cards--stagger')) stagger(teaserEl, '--card-step');
}

const scenTeaser = $('#scenTeaser');
if (scenTeaser){
  const dir = (f) => f.startsWith('scen-') ? 'scen' : 'spaces';
  scenTeaser.innerHTML = (scenTeaser.dataset.keys || '').split(',')
    .map(k => SCEN.find(s => s.k === k.trim()))
    .filter(Boolean)
    .map(s => {
      const [f, cap, full] = s.photos[0];
      return `<a class="scen" href="scenarijai.html">
      <img loading="lazy" src="assets/img/${dir(f)}/${f}.jpg" alt="${full || `${s.label} · ${cap}`}" width="1100" height="825">
      <figcaption>${s.label}<small>${cap}</small></figcaption></a>`;
    }).join('');
}

/* Klientų juosta slenka iš kairės į dešinę. Sąrašas dubliuojamas, kad ciklas būtų be tarpo;
   dublikatas paslėptas nuo skaitytuvų ir nerodomas išjungus animacijas. */
const clientsEl = $('#clientsMarquee');
if (clientsEl){
  const item = (n, clone) => `<span class="cname${clone ? ' is-clone' : ''}"${clone ? ' aria-hidden="true"' : ''}>${n}</span>`;
  clientsEl.innerHTML = `<div class="marquee-track">${
    CLIENTS_FEATURED.map(n => item(n, false)).join('') + CLIENTS_FEATURED.map(n => item(n, true)).join('')
  }</div>`;
}

const locTeaser = $('#locTeaser');
if (locTeaser){
  locTeaser.innerHTML = Object.entries(MAPDATA).map(([k, d]) => `<a class="hub-item" href="lokacijos.html?loc=${k}">
        <span class="card-loc" style="color:${d.ink}"><i class="loc-dot" style="background:${d.color}"></i>${d.name}</span>
        <h3>${d.addr.split(',')[0]}</h3>
        <p>${d.desc}</p>
        <div class="hub-facts">${d.dist.slice(0, 2).map(([v, t]) => `<span>${t}<b>${v}</b></span>`).join('')}</div>
        <span class="rev-go">Atvykimas ir parkavimas →</span>
      </a>`).join('');

  if (locTeaser.classList.contains('hub--stagger')) stagger(locTeaser, '--hub-step');
}

/* ═══════════════ MODALAS SU GALERIJOS SKROLERIU (erdves.html) ═══════════════ */
const modal = $('#modal');
if (modal){
  const mgal = $('#mgal');
  const minfo = $('#modalInfo');
  let lastFocus = null, slideIdx = 0, slideCount = 0;

  const openSpace = (id) => {
    const sp = SPACES.find(s => s.id === id); if (!sp) return;
    const L = LOC[sp.loc];
    slideIdx = 0; slideCount = sp.photos.length;
    mgal.innerHTML = `
      <div class="mgal-track" id="mgalTrack">
        ${sp.photos.map(([f, cap], i) => `<div class="mgal-slide"><img ${i ? 'loading="lazy"' : ''} src="${imgSrc(sp, f)}" alt="${cap} — ${sp.name}, ${L.name}" width="1200" height="820"><p class="mgal-cap">${cap}</p></div>`).join('')}
      </div>
      ${slideCount > 1 ? `
        <button class="mgal-btn mgal-prev" aria-label="Ankstesnė nuotrauka"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m15 5-7 7 7 7"/></svg></button>
        <button class="mgal-btn mgal-next" aria-label="Kita nuotrauka"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m9 5 7 7-7 7"/></svg></button>
        <div class="mgal-dots">${sp.photos.map((_, i) => `<button aria-label="Nuotrauka ${i + 1}" aria-current="${i === 0}"></button>`).join('')}</div>` : ''}`;

    minfo.innerHTML = `
      <span class="card-loc" style="color:${L.ink}"><i class="loc-dot" style="background:${L.color}"></i>${L.name} · ${L.addr}</span>
      <h3 id="modalTitle">${sp.name}</h3>
      <p class="lead">${sp.lead}</p>
      <div>
        <h4>Plotas ir talpos</h4>
        <div class="layouts" style="margin-top:.5rem">
          <div class="layout"><b>${sp.area}</b><span>Plotas</span></div>
          ${sp.layouts.map(([n, v]) => `<div class="layout"><b>${v.toLocaleString('lt-LT')}</b><span>${n}</span></div>`).join('')}
        </div>
      </div>
      <div>
        <h4>Įranga ir sąlygos</h4>
        <ul class="equip" style="margin-top:.5rem">${sp.equip.map(e => `<li><span>${e}</span></li>`).join('')}</ul>
      </div>
      ${sp.note ? `<p class="card-note">${sp.note}</p>` : ''}
      <p class="fineprint">${INCLUDED}</p>
      <div class="card-actions" style="margin-top:.4rem">
        <a class="chip chip--primary chip--sm" href="${askHref(sp.name)}">Gauti šios erdvės pasiūlymą</a>
        <a class="chip chip--sm" href="apziura.html">Rezervuoti apžiūrą</a>
      </div>`;

    lastFocus = document.activeElement;
    modal.hidden = false; modal.setAttribute('data-open', '');
    document.body.style.overflow = 'hidden';
    $('#modalClose').focus();

    const track = $('#mgalTrack');
    const dots = $$('.mgal-dots button', mgal);
    const go = (i) => {
      slideIdx = (i + slideCount) % slideCount;
      track.scrollTo({left: track.clientWidth * slideIdx, behavior: 'smooth'});
      dots.forEach((d, k) => d.setAttribute('aria-current', String(k === slideIdx)));
    };
    $('.mgal-prev', mgal)?.addEventListener('click', () => go(slideIdx - 1));
    $('.mgal-next', mgal)?.addEventListener('click', () => go(slideIdx + 1));
    dots.forEach((d, i) => d.addEventListener('click', () => go(i)));
    track.addEventListener('scroll', () => {
      const i = Math.round(track.scrollLeft / track.clientWidth);
      if (i !== slideIdx) { slideIdx = i; dots.forEach((d, k) => d.setAttribute('aria-current', String(k === i))); }
    }, {passive: true});
  };

  const closeModal = () => {
    modal.removeAttribute('data-open'); modal.hidden = true;
    document.body.style.overflow = '';
    lastFocus?.focus();
  };
  $('#modalClose').addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
  document.addEventListener('keydown', (e) => {
    if (!modal.hasAttribute('data-open')) return;
    if (e.key === 'Escape') closeModal();
    if (e.key === 'Tab') {
      const f = $$('a[href],button:not([disabled])', modal);
      if (!f.length) return;
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });
  document.addEventListener('click', (e) => {
    const o = e.target.closest('[data-open]');
    if (o && o.dataset.open) openSpace(o.dataset.open);
  });

  /* iš pradinio puslapio kortelės: erdves.html?atidaryti=tp-kc */
  const auto = PARAMS.get('atidaryti');
  if (auto && SPACES.some(s => s.id === auto)) openSpace(auto);
}

/* ═══════════════ SCENARIJAI (scenarijai.html) ═══════════════ */
const chipsEl = $('#scenChips');
if (chipsEl){
  const gridEl = $('#scenGrid');
  const ctaEl = $('#scenCta');
  let scenActive = SCEN[0].k;

  chipsEl.innerHTML = SCEN.map(s => `<button class="fbtn" data-scen="${s.k}" aria-pressed="${s.k === scenActive}">${s.label}</button>`).join('');

  /* Antraštėje kartojasi pasirinkto formato pavadinimas (jis jau matomas aktyviame filtre),
     todėl rodoma tik nuotraukos antraštė; pilnas pavadinimas lieka alt tekste. */
  const renderScen = () => {
    const s = SCEN.find(x => x.k === scenActive);
    const dir = (f) => f.startsWith('scen-') ? 'scen' : 'spaces';
    gridEl.innerHTML = s.photos.map(([f, cap, full]) => `
      <figure class="scen"><img loading="lazy" src="assets/img/${dir(f)}/${f}.jpg" alt="${full || `${s.label} · ${cap}`}" width="1100" height="825">
        <figcaption>${cap}</figcaption></figure>`).join('');
    ctaEl.innerHTML = `<p>Ieškote erdvės tokiam renginiui — <b>${s.label.toLowerCase()}</b>?</p>
      <a class="chip chip--primary chip--sm" href="erdves.html?size=${s.size}">Rodyti tinkamas erdves</a>`;
    $$('[data-scen]', chipsEl).forEach(b => b.setAttribute('aria-pressed', String(b.dataset.scen === scenActive)));
  };
  chipsEl.addEventListener('click', (e) => {
    const b = e.target.closest('[data-scen]'); if (!b) return;
    scenActive = b.dataset.scen; renderScen();
  });
  renderScen();
}

/* ═══════════════ ŽEMĖLAPIS (lokacijos.html) ═══════════════ */
const mapPanel = $('#mapPanel');
if (mapPanel){
  const showLoc = (key) => {
    const d = MAPDATA[key];
    mapPanel.innerHTML = `
      <span class="badge" style="color:${d.ink}"><i class="loc-dot" style="background:${d.color}"></i>${d.name}</span>
      <h3>${d.addr}</h3>
      <p class="lead" style="font-size:.92rem">${d.desc}</p>
      <div>
        <h4 style="font-family:var(--font-m);font-size:.66rem;letter-spacing:.14em;text-transform:uppercase;color:var(--steel);font-weight:400">Kaip patogu atvykti</h4>
        <ul class="dist">${d.dist.map(([v, t]) => `<li><b>${v}</b><span>${t}</span></li>`).join('')}</ul>
      </div>
      <div class="park-info"><b>Parkavimas.</b> ${d.park}</div>
      <div class="card-actions" style="margin-top:.2rem">
        <a class="chip chip--sm" href="${d.maps}" target="_blank" rel="noopener">Kaip atvykti ↗</a>
        <a class="chip chip--primary chip--sm" href="erdves.html?loc=${key}">Erdvės šioje lokacijoje</a>
      </div>`;
    $$('.pin').forEach(p => p.setAttribute('aria-pressed', String(p.dataset.pin === key)));
  };
  $$('.pin').forEach(p => {
    p.addEventListener('click', () => showLoc(p.dataset.pin));
    p.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); showLoc(p.dataset.pin); } });
  });
  const pLoc = PARAMS.get('loc');
  showLoc(MAPDATA[pLoc] ? pLoc : 'park');
}

/* ═══════════════ UŽKLAUSOS FORMA (uzklausa.html) ═══════════════ */
const inq = $('#inq');
if (inq){
  const sel = $('#f-space');
  SPACES.forEach(sp => {
    const o = document.createElement('option');
    o.textContent = `${LOC[sp.loc].name} – ${sp.name}`;
    sel.appendChild(o);
  });
  /* erdvė gali būti pasirinkta kitame puslapyje: uzklausa.html?erdve=Didžioji%20salė */
  const want = PARAMS.get('erdve');
  if (want){
    const hit = [...sel.options].find(o => o.textContent.endsWith('– ' + want));
    if (hit) sel.value = hit.value || hit.textContent;
  }
  inq.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!inq.checkValidity()) { inq.reportValidity(); return; }
    $('#formOk').setAttribute('data-open', '');
  });
}

/* ═══════════════ KAINORAŠČIO FORMA (kainos.html) ═══════════════ */
const dlForm = $('#dlForm');
if (dlForm){
  dlForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!dlForm.checkValidity()) { dlForm.reportValidity(); return; }
    dlForm.style.display = 'none';
    $('#dlDone').setAttribute('data-open', '');
  });
}

/* ═══════════════ KOPIJUOTI KONTAKTĄ (4) ═══════════════ */
$$('.cbtn-copy').forEach(b => b.addEventListener('click', async () => {
  const v = b.dataset.copy;
  try { await navigator.clipboard.writeText(v); }
  catch { const t = document.createElement('textarea'); t.value = v; document.body.appendChild(t); t.select(); document.execCommand('copy'); t.remove(); }
  const s = b.querySelector('span'); const old = s.textContent;
  s.textContent = 'Nukopijuota'; b.setAttribute('data-done', '');
  setTimeout(() => { s.textContent = old; b.removeAttribute('data-done'); }, 1800);
}));

/* ═══════════════ VIRTUALUS TURAS (turas.html) ═══════════════ */
$$('[data-tour]').forEach(b => b.addEventListener('click', () => {
  const k = b.dataset.tour;
  $$('[data-tour]').forEach(x => {
    const on = x.dataset.tour === k;
    x.setAttribute('aria-pressed', String(on));
    x.classList.toggle('chip--dark', on);
  });
  ['arts', 'park'].forEach(t => {
    const f = $('#tour-' + t);
    f.hidden = t !== k;
    const ifr = f.querySelector('iframe');
    if (t === k && ifr.dataset.src && !ifr.src) { ifr.src = ifr.dataset.src; }
  });
}));

/* ═══════════════ MOBILUS MENIU ═══════════════ */
const burger = $('#burger'), mm = $('#mobmenu');
if (burger && mm){
  burger.addEventListener('click', () => {
    const open = mm.hasAttribute('data-open');
    mm.toggleAttribute('data-open', !open);
    burger.setAttribute('aria-expanded', String(!open));
    burger.setAttribute('aria-label', open ? 'Atidaryti meniu' : 'Uždaryti meniu');
  });
  mm.addEventListener('click', (e) => { if (e.target.tagName === 'A') { mm.removeAttribute('data-open'); burger.setAttribute('aria-expanded', 'false'); } });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && mm.hasAttribute('data-open')) { mm.removeAttribute('data-open'); burger.setAttribute('aria-expanded', 'false'); burger.focus(); } });
}

/* ═══════════════ HERO VIDEO — tik pradiniame puslapyje ═══════════════
   Poster kadras rodomas iš karto, video švelniai užsideda ant jo, kai gali groti (2). */
const vid = $('#heroVideo'), vt = $('#videoToggle'), heroPoster = $('#heroPoster');
if (vid && vt && heroPoster){
  const ICON_PAUSE = '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><rect x="6" y="5" width="4" height="14" rx="1"/><rect x="14" y="5" width="4" height="14" rx="1"/></svg>';
  const ICON_PLAY = '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5l11 7-11 7z"/></svg>';

  vid.addEventListener('playing', () => { heroPoster.style.opacity = '0'; }, {once: true});
  vid.addEventListener('loadeddata', () => { if (vid.readyState >= 2) heroPoster.style.opacity = '0'; }, {once: true});

  if (window.matchMedia('(prefers-reduced-motion:reduce)').matches) {
    vid.pause();
    vt.setAttribute('aria-label', 'Paleisti vaizdo įrašą');
    vt.innerHTML = ICON_PLAY;
  } else {
    vid.play().catch(() => {});
  }

  vt.addEventListener('click', () => {
    if (vid.paused) { vid.play().catch(() => {}); vt.setAttribute('aria-label', 'Sustabdyti vaizdo įrašą'); vt.innerHTML = ICON_PAUSE; }
    else { vid.pause(); vt.setAttribute('aria-label', 'Paleisti vaizdo įrašą'); vt.innerHTML = ICON_PLAY; }
  });
}

/* ═══════════════ KOREKCIJŲ PANELĖ ═══════════════ */
const fb = $('#fixBtn'), fp = $('#fixPanel');
if (fb && fp){
  fb.addEventListener('click', () => {
    const open = fp.hasAttribute('data-open');
    fp.toggleAttribute('data-open', !open);
    fb.setAttribute('aria-expanded', String(!open));
  });
}
