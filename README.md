# Tech Zity — renginių erdvių puslapis (demo)

Live: **https://techzity-demo.vercel.app**

Statinė svetainė be build'o žingsnio: po vieną HTML failą kiekvienai skilčiai, bendri
`assets/css/site.css` ir `assets/js/`. Jokio npm, jokio framework'o — atsidarai failą ir dirbi.

---

## Kaip paleisti lokaliai

`file://` netinka (šriftai lūžta dėl CORS). Reikia bet kokio statinio serverio:

```bash
npx serve -l 4177 .        # arba: python -m http.server 4177
```

Tada http://localhost:4177

## Kaip deployinti

Projektas Vercel'yje jau egzistuoja — **`techzity-demo`** (team `airids-projects`).

```bash
vercel --prod --yes --scope airids-projects
```

Pirmą kartą: `vercel link` → pasirinkti esamą projektą `techzity-demo`, kitaip atsiras naujas URL.
Alternatyva: prijungti šį GitHub repą prie to paties Vercel projekto — tada `git push` = auto-deploy.

---

## Puslapiai

Kiekviena skiltis — atskiras puslapis; `index.html` liko tik apžvalga (hero, faktų juosta ir
santraukų korteles į visas skiltis).

| Puslapis | Kas jame |
|---|---|
| `index.html` | Hero su video, faktų juosta ir kiekvienos skilties santrauka: 3 erdvės (po vieną iš lokacijos), 4 scenarijai, 3 lokacijos, kainodara + apžiūros, atsiliepimai, 3 DUK klausimai — visa kita atsiveria dedikuotame puslapyje |
| `erdves.html` | Filtrai, 16 erdvių kortelių, salės pop-upas |
| `scenarijai.html` | Renginių formatai ir nuotraukų tinklelis |
| `kainos.html` | Kas įskaičiuota + kainoraščio forma (lead magnet) |
| `lokacijos.html` | Interaktyvus žemėlapis, atstumai, parkavimas |
| `atsiliepimai.html` | Atsiliepimų nuorodos ir klientų sąrašai |
| `turas.html` | Virtualūs 360° turai |
| `apziura.html` | 4 apžiūrų kalendoriaus nuorodos |
| `duk.html` | DUK |
| `uzklausa.html` | Renginio užklausos forma |
| `privatumo-politika.html` | Privatumo politika |

Puslapiai susikalba per URL parametrus: `erdves.html?loc=arts&size=l` (iš anksto uždeda filtrus),
`erdves.html?atidaryti=tp-kc` (iš karto atveria salės pop-upą), `lokacijos.html?loc=zity`
(atidaro lokaciją žemėlapyje), `uzklausa.html?erdve=Didžioji salė` (parenka erdvę formos sąraše).

Pradinio puslapio santraukos generuojamos iš tų pačių duomenų — kurios rodomos, nurodo `data-`
atributai HTML'e: `#cardsTeaser[data-ids]` (erdvių `id`), `#scenTeaser[data-keys]` (scenarijų `k`).
`#locTeaser` visada rodo visas tris `MAPDATA` lokacijas.

Antraštė, skilčių navigacija ir poraštė kiekviename faile surašytos tiesiogiai (build'o nėra), tad
keičiant meniu reikia pataisyti visus HTML failus — greičiausia `sed`'u arba redaktoriaus
„replace in files".

## Kur kas gyvena

| Ko reikia | Kur |
|---|---|
| Visi stiliai | `assets/css/site.css` |
| Visa logika (filtrai, pop-upas, žemėlapis, formos) | `assets/js/site.js` — blokai paleidžiami tik radę savo konteinerį |
| **Erdvių duomenys** (talpos, įranga, nuotraukos) | `assets/js/data.js` → `const SPACES = [...]` |
| Renginių scenarijai | `assets/js/data.js` → `const SCEN = [...]` |
| Lokacijos žemėlapiui (atstumai, parkavimas) | `assets/js/data.js` → `const MAPDATA = {...}` |
| Lokacijų spalvos ir tipografija | `assets/css/site.css` → `:root { ... }` |
| Privatumo politika | `privatumo-politika.html` |
| Salių nuotraukos | `assets/img/spaces/` (Tech Park + Tech Arts), `assets/img/skc/` (Samsung KC) |
| Scenarijų nuotraukos | `assets/img/scen/` |
| Atsisiunčiami kainoraščiai | `assets/docs/*.pdf` |
| Logotipas, šriftai | `assets/brand/`, `assets/fonts/` |

Turinys kraunamas iš JS masyvų, todėl naują salę pridėti = įrašyti dar vieną objektą į `SPACES`
(privalomi laukai: `id`, `loc`, `name`, `area`, `theatre`, `outdoor`, `lead`, `layouts`, `equip`,
`photos`). Filtrai, pop-upas, formos „Dominanti erdvė" sąrašas ir talpų juostos susigeneruoja patys.

### Brand taisyklės

- Šriftai: **Deacon** (antraštės) + **Neue Haas Grotesk Display** (tekstas), self-hosted `assets/fonts/`.
- Mygtukai — firminio **„dobiliuko"** formos (`--clover` CSS kaukė, dedama ant `::before`,
  kad `:focus-visible` žiedas liktų matomas). Nekeisti į paprastus stačiakampius.
- Lokacijų spalvos (iš 2026 m. pristatymų): Tech Park `#FFC36A` · Tech Arts `#0FCB76` ·
  Tech Zity Vilnius `#F04800`. Bazė: wine `#251216`, rust `#A53E00`, sage `#D0DFDD`.
- **Hero video privalo likti tas pats kliento klipas ir groti visuose įrenginiuose** (kliento
  sprendimas). Jei keisi hero, patikrink, ar baltas tekstas išlieka skaitomas šviesiuose kadruose —
  dabar tai užtikrina `filter: brightness(.66)` ant video + dviejų sluoksnių `.hero-scrim`.

---

## Kas dar nepadaryta

- **Apžiūrų kalendorius**: visos 4 kortelės veda į tą patį Google appointments booker.
  Kai bus atskiros nuorodos 3 lokacijoms — pakeisti `href` faile `apziura.html`.
- **Google įvertinimas ir citatos**: kortelės veda į profilius, bet konkretaus balo nėra
  (senos „4,8 / 5" ir dvi citatos buvo pavyzdinės — pašalintos).
- **Klientų logotipai**: kol nėra failų, rodomi vardų ženkleliai. Pradiniame puslapyje jie sudėti į
  slenkančią juostą (`#clientsMarquee`, sąrašas — `CLIENTS_FEATURED` faile `assets/js/data.js`);
  gavus logotipus, `site.js` juostos `item()` funkcijoje `<span>` keičiamas į `<img>`.
  Atsiliepimų puslapyje sąmoningai palikti pilni statiniai sąrašai (`.cnames`) — ten svarbu perskaityti.
- **Formos**: demo režimu niekur nesiunčia. Produkcijai reikės backend'o (pvz. Resend) —
  `#inq` ir `#dlForm` submit handleriai `assets/js/site.js`.
- **Terasų talpos** (Tech Park 750 / 500, Tech Arts 350) paimtos iš senesnio demo — pristatymuose
  jų nėra, verta patvirtinti su klientu.

## Kontekstas

`KOREKCIJOS-1-19.md` — kliento pastabų sąrašas (2026-07) ir kas pagal kiekvieną punktą padaryta,
su nuoroda, iš kurio šaltinio paimtas kiekvienas skaičius. **Perskaityk prieš keisdamas turinį** —
talpos, įranga ir kainos ateina iš kliento 2026 m. pristatymų, nieko neišgalvota.

Puslapiai kol kas turi `noindex, nofollow` (demo). Prieš viešinant — išimti `<meta name="robots">`
iš visų HTML failų `<head>` ir `X-Robots-Tag` iš `vercel.json`.
