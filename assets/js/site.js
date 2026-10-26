/* ═══════════════ BENDRAS PUSLAPIŲ SKRIPTAS ═══════════════
   Kiekviena skiltis dabar turi savo puslapį, todėl visi blokai
   paleidžiami tik tada, kai puslapyje randamas jų konteineris. */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const PARAMS = new URLSearchParams(location.search);

/* ═══════════════ ERDVIŲ TINKLELIS + FILTRAI (erdves.html) ═══════════════ */
const band = (n) => n <= 100 ? 's' : (n <= 250 ? 'm' : 'l');
const imgPath = (sp, file) => `${sp.dir === 'skc' ? 'skc' : 'spaces'}/${file}`;
/* Atsakingos nuotraukos. IMGW (data.js): 'katalogas/failas' → turimi pločiai, pvz. [800, 1600, 2400].
   Pagrindinis failas.jpg — didžiausias ≤ 1600 px, kiti — failas-800.jpg / failas-2400.jpg.
   Naršyklė pagal `sizes` ir ekrano tankį pasirenka variantą (kliento pastaba: originalai ≥ 2× rodomo pločio). */
/* ?v=IMG_V — /assets/* atiduodami su `immutable` (metams), todėl pakeitus nuotrauką tuo pačiu vardu
   versiją reikia pakelti (data.js IMG_V), kitaip anksčiau buvę lankytojai matytų seną failą */
const pic = (path, sizes) => {
  const base = `assets/img/${path}`, ws = IMGW[path] || [], v = `?v=${IMG_V}`;
  const main = Math.max(0, ...ws.filter(w => w <= 1600));
  const set = ws.map(w => `${base}${w === main ? '' : '-' + w}.jpg${v} ${w}w`).join(', ');
  return `src="${base}.jpg${v}"` + (ws.length > 1 ? ` srcset="${set}" sizes="${sizes}"` : '');
};
const SIZES = {
  card: '(max-width:560px) 90vw, (max-width:760px) 84vw, (max-width:1040px) 46vw, 400px',
  teaser: '(max-width:760px) 84vw, (max-width:1040px) 46vw, 300px',
  loc: '(max-width:760px) 84vw, (max-width:900px) 100vw, 620px',
  modal: '(max-width:1080px) 100vw, 1080px',
  scen: '(max-width:860px) 100vw, 620px',
  thumb: '150px'
};
const askHref = (name) => `uzklausa.html?erdve=${encodeURIComponent(name)}`;
/* lietuviškos daugiskaitos formos: 1 erdvė, 2–9 erdvės, 10–20 erdvių, 21 erdvė… */
const lt = (n, one, few, many) => {
  const d = n % 10, h = n % 100;
  return n + ' ' + (d === 1 && h !== 11 ? one : (d >= 2 && (h < 10 || h > 20) ? few : many));
};
const cardsEl = $('#cards');
const state = {loc:'all', size:'all'};

function matches(sp){
  const okLoc = state.loc === 'all' || (state.loc === 'lauko' ? sp.outdoor : sp.loc === state.loc);
  const okSize = state.size === 'all' || band(sp.theatre) === state.size;
  return okLoc && okSize;
}

/* Kortelė naudojama ir erdvių puslapyje, ir pradinio puslapio santraukoje.
   Veiksmas vienas: puslapyje jis atveria pop-upą, pradiniame — veda į erdvių puslapį.
   „Gauti pasiūlymą" kortelėse nebėra (kartojosi 7 kartus) — jis yra pop-upe, hero ir meniu. */
function cardHTML(sp, {teaser = false} = {}){
  const L = LOC[sp.loc];
  return `<article class="card">
      <div class="card-media">
        <img loading="lazy" ${pic(imgPath(sp, (teaser && sp.hero) || sp.photos[0][0]), SIZES.card)} alt="${sp.name} — ${L.name}, ${L.addr}" width="1200" height="750">
        ${sp.combo ? `<span class="card-combo">Derinys · ${sp.combo}</span>` : ''}
        <span class="card-count">${sp.photos.length} nuotr.</span>
      </div>
      <div class="card-strip" style="background:${L.color}"></div>
      <!-- galva ir kūnas — atskiros eilės (CSS subgrid): vienos eilės kortelėse talpos ir mygtukai stovi vienoje linijoje,
           net jei kurioje nors lūžta adresas ar pavadinimas; „Derinys" — ant nuotraukos (kliento pastaba 2026-10-16) -->
      <div class="card-head">
        <span class="card-loc" style="color:${L.ink}"><i class="loc-dot" style="background:${L.color}"></i>${L.name} · ${L.addr}</span>
        <h3>${sp.name}</h3>
      </div>
      <div class="card-body">
        <div class="metas">
          <span>Plotas<b>${sp.area}</b></span>
          <span>${sp.outdoor ? 'Lauko renginys' : 'Teatro stiliumi'}<b>iki ${sp.theatre.toLocaleString('lt-LT')}</b></span>
        </div>
        ${sp.note ? `<p class="card-note">${sp.note}</p>` : ''}
        <div class="card-actions">
          ${teaser
            ? `<a class="chip chip--sm" href="erdves.html?atidaryti=${sp.id}">Žiūrėti erdvę</a>`
            : `<button class="chip chip--sm" data-open="${sp.id}">Žiūrėti erdvę</button>`}
        </div>
      </div>
    </article>`;
}

function renderCards(){
  const list = SPACES.filter(matches);
  cardsEl.innerHTML = list.length ? list.map(sp => cardHTML(sp)).join('')
    : `<p class="empty-note">Pagal šiuos filtrus erdvių nėra. <button class="linkish" id="resetF" style="border:0;border-bottom:1.5px solid var(--rust)">Rodyti visas erdves</button></p>`;

  /* skaičiuojamos tik erdvės; deriniai (Didžioji + Mažoji, B + C, visas centras) — atskirai */
  const nCombo = list.filter(sp => sp.combo).length, nSpace = list.length - nCombo;
  $('#fcount').textContent = [nSpace && lt(nSpace, 'erdvė', 'erdvės', 'erdvių'), nCombo && lt(nCombo, 'derinys', 'deriniai', 'derinių')]
    .filter(Boolean).join(' ir ') || '0 erdvių';
  const rf = $('#resetF');
  if (rf) rf.addEventListener('click', () => { state.loc = 'all'; state.size = 'all'; syncFilters(); renderCards(); });
}

function syncFilters(){
  $$('.fbtn[data-f]').forEach(b => b.setAttribute('aria-pressed', String(state[b.dataset.f] === b.dataset.v)));
}

if (cardsEl){
  /* filtrai gali ateiti iš kito puslapio: erdves.html?size=l&loc=zity
     (senos ?loc=arts nuorodos tiesiog rodo visas erdves) */
  const pLoc = PARAMS.get('loc'), pSize = PARAMS.get('size');
  if (pLoc && ['park','zity','lauko'].includes(pLoc)) state.loc = pLoc;
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
      <img loading="lazy" ${pic(`${dir(f)}/${f}`, SIZES.teaser)} alt="${full || `${s.label} · ${cap}`}" width="1100" height="825">
      <figcaption>${s.label}<small>${cap}</small></figcaption></a>`;
    }).join('');
}

/* ═══════════════ KLIENTŲ JUOSTOS (karuselės) ═══════════════
   Pradiniame — viena juosta (CLIENTS_FEATURED), atsiliepimų puslapyje — po juostą kiekvienai grupei
   (kliento pastaba 2026-10-15). Sąrašas dubliuojamas, kad ciklas būtų be tarpo; dublikatas paslėptas
   nuo skaitytuvų ir nerodomas išjungus animacijas. Jei LOGOS turi failą — rodomas logotipas. */
/* optinis dydis: aukštis ~ 1/√santykio (28 px, kai santykis 3,2), ribos 20–44 px */
const logoH = (ar) => Math.round(Math.min(44, Math.max(20, 28 * Math.sqrt(3.2 / ar))));
const clientItem = (n, clone) => {
  const [file, ar, white] = LOGOS[n] || [];
  const h = file && logoH(ar);
  return `<span class="cname${file ? ' cname--logo' : ''}${white ? ' cname--sil' : ''}${clone ? ' is-clone' : ''}"${clone ? ' aria-hidden="true"' : ''}>${
    file ? `<img src="assets/img/logos/${file}" alt="${clone ? '' : n}" height="${h}" width="${Math.round(h * ar)}" style="height:${h}px" loading="lazy">` : n}</span>`;
};
$$('[data-clients]').forEach(el => {
  const names = el.dataset.clients === 'featured' ? CLIENTS_FEATURED : (CLIENTS[el.dataset.clients] || []);
  /* greitis pagal sąrašo ilgį — kad ilgesnė juosta neslinktų greičiau */
  el.innerHTML = `<div class="marquee-track" style="--dur:${Math.round(names.length * 2.9)}s">${
    names.map(n => clientItem(n, false)).join('') + names.map(n => clientItem(n, true)).join('')}</div>`;
});

/* Pradinio apačioje — tik lokacijos pavadinimas ir Google žemėlapis (kliento pastaba 2026-10-23) */
const mapPair = $('#mapPair');
if (mapPair){
  mapPair.innerHTML = Object.values(MAPDATA).map(d => `<div class="map-item">
      <h3 class="loc-name loc-name--big"><i class="loc-dot" style="background:${d.color}"></i>${d.name}</h3>
      <div class="map-card"><iframe class="map-frame" src="${d.embed}" title="${d.name} — žemėlapis" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div>
    </div>`).join('');
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
        ${sp.photos.map(([f, cap], i) => `<div class="mgal-slide"><img ${i ? 'loading="lazy"' : ''} ${pic(imgPath(sp, f), SIZES.modal)} alt="${cap} — ${sp.name}, ${L.name}" width="1200" height="820"><p class="mgal-cap">${cap}</p></div>`).join('')}
      </div>
      ${slideCount > 1 ? `
        <button class="mgal-btn mgal-prev" aria-label="Ankstesnė nuotrauka"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m15 5-7 7 7 7"/></svg></button>
        <button class="mgal-btn mgal-next" aria-label="Kita nuotrauka"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m9 5 7 7-7 7"/></svg></button>
        <div class="mgal-dots">${sp.photos.map((_, i) => `<button aria-label="Nuotrauka ${i + 1}" aria-current="${i === 0}"></button>`).join('')}</div>` : ''}`;

    /* skliaustai („po 6–8") nelaužomi per eilutę — anksčiau „8)" nukrisdavo į kitą eilutę */
    const keepParen = (t) => t.replace(/\(([^)]+)\)/g, '<span class="nw">($1)</span>');
    minfo.innerHTML = `
      <div class="mi-col">
        <span class="card-loc" style="color:${L.ink}"><i class="loc-dot" style="background:${L.color}"></i>${L.name} · ${L.addr}</span>
        <h3 id="modalTitle">${sp.name}</h3>
        ${sp.combo ? `<span class="card-combo">Derinys · ${sp.combo}</span>` : ''}
        <p class="lead">${sp.lead}</p>
        <div>
          <h4>Plotas ir talpos</h4>
          <div class="layouts">
            <div class="layout"><b>${sp.area}</b><span>Plotas</span></div>
            ${sp.layouts.map(([n, v]) => `<div class="layout"><b>${v.toLocaleString('lt-LT')}</b><span>${keepParen(n)}</span></div>`).join('')}
          </div>
        </div>
      </div>
      <div class="mi-col">
        <div>
          <h4>Įranga ir sąlygos</h4>
          <ul class="equip">${sp.equip.map(e => `<li><span>${e}</span></li>`).join('')}</ul>
        </div>
        ${sp.note ? `<p class="card-note">${sp.note}</p>` : ''}
        <p class="fineprint">${TERMS[sp.loc].included} ${TERMS[sp.loc].min}</p>
        <div class="card-actions">
          <a class="chip chip--primary chip--sm" href="${askHref(sp.name)}">Gauti šios erdvės pasiūlymą</a>
          <a class="chip chip--sm" href="apziura.html">Rezervuoti apžiūrą</a>
        </div>
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

/* ═══════════════ SCENARIJAI (scenarijai.html) ═══════════════
   Visi 8 formatai rodomi iš karto (kliento pastaba 2026-10-15: anksčiau matėsi tik vieno formato
   4 nuotraukos). Kiekvienas — su didele nuotrauka ir miniatiūromis; miniatiūra ją pakeičia. */
const scenList = $('#scenList');
if (scenList){
  const dir = (f) => f.startsWith('scen-') ? 'scen' : 'spaces';
  const altOf = (s, [, cap, full]) => full || `${s.label} · ${cap}`;
  scenList.innerHTML = SCEN.map((s, n) => {
    const [first] = s.photos;
    return `<article class="scen-card" id="scen-${s.k}">
      <figure class="scen-main">
        <img ${pic(`${dir(first[0])}/${first[0]}`, SIZES.scen)} alt="${altOf(s, first)}" width="1200" height="800"${n > 1 ? ' loading="lazy"' : ''}>
        <figcaption>${first[1]}</figcaption>
      </figure>
      <div class="scen-thumbs" role="group" aria-label="${s.label} — nuotraukos">
        ${s.photos.map((p, i) => `<button class="scen-thumb" data-i="${i}" aria-pressed="${i === 0}" aria-label="Nuotrauka ${i + 1} iš ${s.photos.length}: ${p[1]}"><img ${pic(`${dir(p[0])}/${p[0]}`, SIZES.thumb)} alt="" width="300" height="225" loading="lazy"></button>`).join('')}
      </div>
      <div class="scen-body">
        <h2>${s.label}</h2>
        <a class="linkish" href="erdves.html?size=${s.size}">Tinkamos erdvės →</a>
      </div>
    </article>`;
  }).join('');
  scenList.addEventListener('click', (e) => {
    const b = e.target.closest('.scen-thumb'); if (!b) return;
    const card = b.closest('.scen-card');
    const s = SCEN.find(x => 'scen-' + x.k === card.id), p = s.photos[+b.dataset.i];
    const img = card.querySelector('.scen-main img');
    /* srcset ir src keičiami kartu — kitaip naršyklė liktų prie senos nuotraukos varianto */
    const tmp = document.createElement('div'); tmp.innerHTML = `<img ${pic(`${dir(p[0])}/${p[0]}`, SIZES.scen)}>`;
    const n = tmp.firstChild;
    if (n.srcset) { img.srcset = n.srcset; img.sizes = n.sizes; } else { img.removeAttribute('srcset'); img.removeAttribute('sizes'); }
    img.src = n.getAttribute('src'); img.alt = altOf(s, p);
    card.querySelector('.scen-main figcaption').textContent = p[1];
    card.querySelectorAll('.scen-thumb').forEach(t => t.setAttribute('aria-pressed', String(t === b)));
  });
}

/* ═══════════════ LOKACIJOS IR ŽEMĖLAPIAI (lokacijos.html) ═══════════════
   Kiekvienai lokacijai — atskiras Google žemėlapis su žymekliu ir ta pati aprašymo lentelė. */
const locList = $('#locList');
if (locList){
  locList.innerHTML = Object.entries(MAPDATA).map(([key, d]) => `
    <article class="loc-block" id="loc-${key}">
      <div class="map-card">
        <iframe class="map-frame" src="${d.embed}" title="${d.name} — ${d.addr} žemėlapyje"
                loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe>
      </div>
      <div class="map-panel">
        <span class="badge" style="color:${d.ink}"><i class="loc-dot" style="background:${d.color}"></i>${d.name}</span>
        <h3>${d.addr}</h3>
        <p class="lead" style="font-size:var(--fs-b)">${d.desc}</p>
        <div>
          <h4 class="panel-label">Atvykimas</h4>
          <ul class="dist">${d.dist.map(([v, t]) => `<li><b>${v}</b><span>${t}</span></li>`).join('')}</ul>
        </div>
        <div class="park-info"><b>Parkavimas.</b> ${d.park}</div>
        <div class="card-actions" style="margin-top:.2rem">
          <a class="chip chip--sm" href="${d.maps}" target="_blank" rel="noopener">Kaip atvykti ↗</a>
          <a class="chip chip--primary chip--sm" href="erdves.html?loc=${key}">Erdvės šioje lokacijoje</a>
        </div>
      </div>
    </article>`).join('');

  /* nuoroda su ?loc=zity atveria tą lokaciją; senos ?loc=arts nuorodos tiesiog rodo puslapį */
  const pLoc = PARAMS.get('loc');
  const locTarget = pLoc && document.getElementById('loc-' + pLoc);
  if (locTarget){
    locTarget.scrollIntoView({behavior: 'smooth', block: 'start'});
    /* programinis skrolinimas ne visada sukelia scroll ivyki, todel header busena
       atnaujinam patys - kitaip jis liktu permatomas ant sviesaus turinio */
    setTimeout(() => window.dispatchEvent(new Event('scroll')), 700);
  }
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
  /* siuntimas — tiesiai į seną HubSpot renginių formą „Domina mūsų renginių erdvės?“
     (portalas 20121518), kaip siuntė senas WordPress puslapis. Formos ID viešas, raktų nėra;
     privalomus laukus ir el. pašto formatą HubSpot tikrina pats. */
  const HS_URL = 'https://api.hsforms.com/submissions/v3/integration/submit/20121518/9aa7a350-eaa9-4381-877c-addc562322bc';
  const FAIL = 'Nepavyko išsiųsti. Parašykite events@techzity.com arba paskambinkite +370 671 86 572.';
  /* HubSpot laukas venue_interest priima tik savo reikšmes; Tech Zity Vilnius salės jame nėra — jos lieka žinutėje */
  const venue = sp => !sp ? 'Domina konsultacija dėl erdvės' : sp.startsWith('Tech Park') ? 'Tech Park' : '';
  const t0 = Date.now();
  const ok = $('#formOk'), err = $('#formErr'), btn = inq.querySelector('button[type=submit]');
  const showErr = msg => { err.textContent = msg; err.setAttribute('data-open', ''); };
  inq.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!inq.checkValidity()) { inq.reportValidity(); return; }
    ok.removeAttribute('data-open'); err.removeAttribute('data-open');
    const v = id => $('#' + id).value.trim();
    /* botams — tyli „sėkmė“ be siuntimo */
    if (v('f-hp')) { ok.setAttribute('data-open', ''); inq.reset(); return; }
    if (Date.now() - t0 < 3000) { showErr('Forma pateikta per greitai. Palaukite kelias sekundes ir bandykite dar kartą.'); return; }
    const space = v('f-space'), msg = v('f-msg');
    const extra = [
      v('f-date') && `Renginio data: ${v('f-date')}`,
      `Dominanti erdvė: ${space || 'Konsultacija / patarimas'}`,
      'Sutikimas su privatumo politika pažymėtas.'
    ].filter(Boolean).join('\n');
    const fields = [
      ['firstname', v('f-name')], ['company', v('f-org')], ['email', v('f-mail')], ['phone', v('f-tel')],
      ['venue_interest', venue(space)], ['number_of_participants', v('f-n')],
      ['message', (msg ? msg + '\n\n' : '') + extra]
    ].filter(([, x]) => x).map(([name, value]) => ({objectTypeId: '0-1', name, value}));
    btn.disabled = true;
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 10000);
    try {
      const r = await fetch(HS_URL, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({fields, context: {pageUri: location.href.split('?')[0], pageName: document.title}}),
        signal: ctrl.signal
      });
      if (r.ok){ ok.setAttribute('data-open', ''); inq.reset(); }
      else {
        const j = await r.json().catch(() => ({}));
        const bad = (j.errors || []).some(x => /INVALID_EMAIL|INVALID_NUMBER|REQUIRED_FIELD/.test(x.errorType || ''));
        showErr(bad ? 'Patikrinkite įvestus duomenis.' : FAIL);
      }
    } catch (_) { showErr(FAIL); }
    finally { clearTimeout(timer); btn.disabled = false; }
  });
}

/* ═══════════════ VIRTUALUS TURAS (turas.html) ═══════════════ */
$$('[data-tour]').forEach(b => b.addEventListener('click', () => {
  const k = b.dataset.tour;
  $$('[data-tour]').forEach(x => {
    const on = x.dataset.tour === k;
    x.setAttribute('aria-pressed', String(on));
    x.classList.toggle('chip--dark', on);
  });
  $$('.tour-frame').forEach(f => {
    const t = f.id.replace('tour-', '');
    f.hidden = t !== k;
    const ifr = f.querySelector('iframe');
    if (t === k && ifr.dataset.src && !ifr.src) { ifr.src = ifr.dataset.src; }
  });
}));

/* ═══════════════ HEADER — permatomas ant hero, baltas nuskrolinus ═══════════════
   Riba 100 px paimta iš techzity.com elgsenos. */
const hdr = $('header');
if (hdr){
  const syncHeader = () => hdr.toggleAttribute('data-scrolled', window.scrollY > 100);
  syncHeader();
  window.addEventListener('scroll', syncHeader, {passive: true});
}

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

/* ═══════════════ PRADINIO DUK — 3 klausimai + „Rodyti visus" ═══════════════ */
const faqHome = $('#faqHome'), faqMore = $('#faqMore');
if (faqHome && faqMore){
  faqMore.addEventListener('click', () => {
    const open = faqMore.getAttribute('aria-expanded') !== 'true';
    faqHome.classList.toggle('faq--short', !open);
    faqMore.setAttribute('aria-expanded', String(open));
    faqMore.firstChild.textContent = open ? 'Rodyti mažiau ' : 'Rodyti visus klausimus ';
  });
}

/* ═══════════════ HERO VIDEO — tik pradiniame puslapyje ═══════════════
   Poster kadras rodomas iš karto, video švelniai užsideda ant jo, kai gali groti (2). */
const vid = $('#heroVideo'), vt = $('#videoToggle'), heroPoster = $('#heroPoster');
if (vid && vt && heroPoster){
  const ICON_PAUSE = '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><rect x="6" y="5" width="4" height="14" rx="1"/><rect x="14" y="5" width="4" height="14" rx="1"/></svg>';
  const ICON_PLAY = '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5l11 7-11 7z"/></svg>';

  // poster slepiamas tik kai video tikrai groja – kitaip lieka sustingęs pirmas kadras
  vid.addEventListener('playing', () => { heroPoster.style.opacity = '0'; }, {once: true});
  let userPaused = false;
  const tryPlay = () => { if (!userPaused && vid.paused && !document.hidden) vid.play().catch(() => {}); };

  if (window.matchMedia('(prefers-reduced-motion:reduce)').matches) {
    vid.pause();
    vt.setAttribute('aria-label', 'Paleisti vaizdo įrašą');
    vt.innerHTML = ICON_PLAY;
  } else {
    tryPlay();
    // naršyklė kartais atideda autoplay (lėtas tinklas, iOS taupymo režimas) – bandom vėl, kai video pasiruošia, grįžus į kortelę ar po pirmo lietimo / slinkimo
    vid.addEventListener('canplay', tryPlay);
    document.addEventListener('visibilitychange', tryPlay);
    ['pointerdown', 'touchstart', 'scroll', 'keydown'].forEach(ev => window.addEventListener(ev, tryPlay, {once: true, passive: true}));
  }

  vt.addEventListener('click', () => {
    userPaused = !vid.paused;
    if (vid.paused) { vid.play().catch(() => {}); vt.setAttribute('aria-label', 'Sustabdyti vaizdo įrašą'); vt.innerHTML = ICON_PAUSE; }
    else { vid.pause(); vt.setAttribute('aria-label', 'Paleisti vaizdo įrašą'); vt.innerHTML = ICON_PLAY; }
  });
}
