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
| `index.html` | Hero su video, faktų juosta ir kiekvienos skilties santrauka: 3 erdvės (iš abiejų lokacijų), 4 scenarijai, 2 lokacijos, kainodara (sąlygos pagal lokaciją) + apžiūros, atsiliepimai, 3 DUK klausimai — visa kita atsiveria dedikuotame puslapyje |
| `erdves.html` | Filtrai, 8 erdvės + 3 deriniai (11 kortelių), salės pop-upas |
| `scenarijai.html` | Visi 8 renginių formatai iš karto: didelė nuotrauka + miniatiūros |
| `lokacijos.html` | Interaktyvus žemėlapis, atstumai, parkavimas |
| `atsiliepimai.html` | Atsiliepimų nuorodos ir klientų sąrašai |
| `turas.html` | Virtualus 360° turas (Tech Park) |
| `apziura.html` | 3 apžiūrų kalendoriaus nuorodos (2 lokacijos + konsultacija) |
| `duk.html` | DUK |
| `uzklausa.html` | Renginio užklausos forma |
| `privatumo-politika.html` | Privatumo politika |

Puslapiai susikalba per URL parametrus: `erdves.html?loc=zity&size=l` (iš anksto uždeda filtrus),
`erdves.html?atidaryti=tp-kc` (iš karto atveria salės pop-upą), `lokacijos.html?loc=zity`
(atidaro lokaciją žemėlapyje), `uzklausa.html?erdve=Didžioji salė` (parenka erdvę formos sąraše).
Senos `?loc=arts` nuorodos nelūžta: abu puslapiai tiesiog atsidaro be filtro.

Pradinio puslapio santraukos generuojamos iš tų pačių duomenų — kurios rodomos, nurodo `data-`
atributai HTML'e: `#cardsTeaser[data-ids]` (erdvių `id`), `#scenTeaser[data-keys]` (scenarijų `k`).
`#locTeaser` visada rodo visas `MAPDATA` lokacijas (dabar dvi).

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
| Salių nuotraukos | `assets/img/spaces/` (Tech Park), `assets/img/skc/` (Samsung KC) |
| Scenarijų nuotraukos | `assets/img/scen/` |
| Kliento pristatymai (tik šaltinis, viešai nerodomi) | `assets/docs/*.pdf` |
| Logotipas, šriftai | `assets/brand/`, `assets/fonts/` |

Turinys kraunamas iš JS masyvų, todėl naują salę pridėti = įrašyti dar vieną objektą į `SPACES`
(privalomi laukai: `id`, `loc`, `name`, `area`, `theatre`, `outdoor`, `lead`, `layouts`, `equip`,
`photos`). Filtrai, pop-upas, formos „Dominanti erdvė" sąrašas ir talpų juostos susigeneruoja patys.

### Brand taisyklės

- **Tipografija — 6 dydžiai** (`site.css` `:root`): `--fs-s` 14 px · `--fs-b` 16 · `--fs-l` 18 · `--fs-h3` 24 ·
  `--fs-h2` 28–40 · `--fs-h1` 36–60. Mažiausias tekstas 14 px (kliento pastaba 2026-10-15). Naujam elementui —
  vienas iš šių, ne naujas dydis. Didžiosios raidės — tik H1/H2 ir mygtukai.

- Šriftai: **Deacon** (antraštės) + **Neue Haas Grotesk Display** (tekstas), self-hosted `assets/fonts/`.
- Mygtukai — firminio **„dobiliuko"** formos (`--clover` CSS kaukė, dedama ant `::before`,
  kad `:focus-visible` žiedas liktų matomas). Nekeisti į paprastus stačiakampius.
- Lokacijų spalvos (iš 2026 m. pristatymų): Tech Park `#FFC36A` · Tech Zity Vilnius `#F04800`.
  Bazė: wine `#251216`, rust `#A53E00`, sage `#D0DFDD`.
- **Hero video privalo likti tas pats kliento klipas ir groti visuose įrenginiuose** (kliento
  sprendimas). Jei keisi hero, patikrink, ar baltas tekstas išlieka skaitomas šviesiuose kadruose —
  dabar tai užtikrina `filter: brightness(.66)` ant video + dviejų sluoksnių `.hero-scrim`.

---

## Kontaktai ir mygtukai (2026-10-15)

Telefonas ir el. paštas — paprastos `tel:` / `mailto:` nuorodos (`.cbtn`); kopijavimo mygtukų
klientas nepageidauja. „Gauti pasiūlymą" pradiniame puslapyje — tik meniu, hero ir kainodaros
skydelyje; erdvių kortelėse jo nėra (konkrečios erdvės pasiūlymas — pop-upe).

## Kas dar nepadaryta

- **Apžiūrų kalendoriai** (2026-10-16 kliento nuorodos): Tech Park, SKC ir konsultacija — `apziura.html`,
  pradinio „Pamatykite erdves" skydelis ir DUK apžiūrų atsakymas.
- **„300+ klientų renginių per metus"** pašalinta 2026-10-15 (klientas: nesutampa). Grąžinti tik su
  kliento patvirtintu skaičiumi (`.bigstat` stiliai palikti `site.css`).
- **Google įvertinimas ir citatos**: kortelės veda į profilius, bet konkretaus balo nėra
  (senos „4,8 / 5" ir dvi citatos buvo pavyzdinės — pašalintos).
- **Klientų logotipai**: juostos (`[data-clients]`) piešiamos iš `data.js` — pradiniame
  `CLIENTS_FEATURED`, atsiliepimų puslapyje `CLIENTS` grupės (2026-10-15 kliento prašymu — karuselės).
  Logotipas rodomas, kai `LOGOS` turi įrašą „vardas → failas" (`assets/img/logos/`). **Be oficialaus
  logotipo vardas į sąrašus nededamas** (2026-10-15 sprendimas; išimti Civita, Creativa, Eventum, EPP, VVK).
- **Formos**: demo režimu niekur nesiunčia. Produkcijai reikės backend'o (pvz. Resend) —
  `#inq` ir `#dlForm` submit handleriai `assets/js/site.js`.
- **Terasų talpos** (Tech Park 750 / 500) paimtos iš senesnio demo — pristatymuose
  jų nėra, verta patvirtinti su klientu.

## Tech Arts (2026-10-06) ir erdvių skaičius (2026-10-15)

Kliento pranešimu Tech Arts parduota — renginių ten nebėra nuo 2026 m. spalio 6 d. Iš svetainės
išimtos visos 5 salės, žemėlapis, filtras, turas, apžiūros kortelė, atsiliepimų nuorodos, PDF ir
nuotraukos. 2026-10-15 kliento prašymu (Eimantas) **pašalintas ir atsisveikinimo prierašas** —
Tech Arts svetainėje nebeminima visai.

**Erdvių yra 8** (Tech Park: Didžioji ir Mažoji salės, dvi terasos su kiemais; SKC: A, B, C ir
Oranžerija + Kiemas). Kortelių 11, nes 3 yra deriniai — Konferencijų centras (Didžioji + Mažoji),
B+C ir visas centras; `data.js` juos žymi lauku `combo`, kortelėje ir pop-upe rodoma „Derinys · …",
o erdvių skaitiklis juos skaičiuoja atskirai („8 erdvės ir 3 deriniai"). Svečių intervalas 20–1 000.

**Sąlygos skiriasi pagal lokaciją** — `TERMS` faile `data.js` (pop-upas), kainodaros skydelis
`index.html` ir DUK. Tech Park — 2026 pristatymo „Sąlygos" skaidrė; SKC — SKC pristatymas
(tas pats sąrašas samsungkc.lt); SKC minimali trukmė (pusė dienos) — kliento pastaba 2026-10-15.

**Kainų ir sutarties sąlygų svetainėje nerodome** (2026-10-15 sprendimas — mažina pardavimus): jokių
sumų (€, PVM), mokesčių, avanso ar mokėjimo tvarkos, kainoraščių PDF. Rodoma tik minimali trukmė ir
kas įskaičiuota; kaina — pasiūlyme. Kliento pristatymai su kainoraščiais `assets/docs/` — tik šaltinis
(`.vercelignore`).

## Kontekstas

`PASTABOS-2026-10-15.md` — naujausios kliento pastabos, etapai ir atviri klausimai.
`KOREKCIJOS-1-19.md` — kliento pastabų sąrašas (2026-07, dar su Tech Arts) ir kas pagal kiekvieną punktą padaryta,
su nuoroda, iš kurio šaltinio paimtas kiekvienas skaičius. **Perskaityk prieš keisdamas turinį** —
talpos, įranga ir kainos ateina iš kliento 2026 m. pristatymų, nieko neišgalvota.

## Nuotraukos (2026-10-15)

Kiekviena nuotrauka turi variantus: `<vardas>.jpg` (≤ 1600 px), `<vardas>-800.jpg` ir, jei originalas
pakankamai didelis, `<vardas>-2048/2400.jpg`. `site.js` `pic()` iš jų sudaro `srcset` pagal `IMGW`
manifestą (`data.js`), o `SIZES` nurodo, kokio pločio vieta kiekvienam blokui. Kliento kriterijus —
originalas bent 2× didesnis už rodomą plotį.

```bash
uv run --with pillow python tools/nuotraukos.py add <originalas.jpg> spaces/tp-kc-9   # variantai + IMGW
uv run --with pillow python tools/nuotraukos.py manifest                             # tik IMGW
```

**Pakeitus failą tuo pačiu vardu — pakelk `IMG_V` faile `data.js`** (ir hero poster'io `?v=` `index.html`),
nes `/assets/*` atiduodami su `immutable` — be to lankytojai metus matytų seną nuotrauką.

**SKC nuotraukos = samsungkc.lt** (2026-10-16 kliento nurodymas): kadrai iš SKC repo `brand_assets_masters/venue/`
(gyva versija), parašai ir įranga — iš jo `halls.json`. B ir C ten sukeistos (2026-09-10): B rodo `hall-c-1`, C — `hall-b-1`.
Pasikeitus SKC svetainės kadrui — atnaujinti ir čia (`tools/nuotraukos.py add`, pakelti `IMG_V`).

Šaltiniai: Tech Park — techzity.com media biblioteka (E_* fotosesija, `techpark_*` renginių kadrai,
TP_header); SKC — samsungkc.lt masteriai ir techzity.com 2024-07 renderiai. Pristatymo PDF kadrai
be originalų (25) 2026-10-15 **padidinti Higgsfield** (bytedance upscale, 2–4K) ir apkarpyti PDF
juostų kraštai — AI atkuria smulkias detales (veidus, tekstą), todėl kadrus su įskaitomu tikro asmens
vardu ar tekstu palikti originalius (`scen-tp-1`). Žr. `PASTABOS-2026-10-15.md`, 10 etapą.

`.vercelignore` neleidžia į deploy'ų `*.md` ir `tools/` — vidiniai dokumentai nėra viešai pasiekiami.

## SVARBU: cache versijos

`vercel.json` uždeda `/assets/*` failams `Cache-Control: immutable, max-age=31536000` — naršyklė
tokio failo neperklaus metus, net su Ctrl+Shift+R. Todėl CSS ir JS nuorodos HTML'e turi versijos
parametrą: `site.css?v=N`, `data.js?v=N`, `site.js?v=N` (2026-10-16 — `v=18`, `IMG_V = 4`).

**Pakeitus `assets/css/site.css` arba `assets/js/*.js` — pakelk `v` numerį visuose HTML failuose**,
kitaip anksčiau svetainėje buvę lankytojai matys seną CSS/JS su nauju HTML: puslapis atrodys
sulūžęs, o konsolėje klaidų nebus. Nuotraukoms — `IMG_V` (žr. „Nuotraukos"), šriftams versijos nereikia.

Puslapiai kol kas turi `noindex, nofollow` (demo). Prieš viešinant — išimti `<meta name="robots">`
iš visų HTML failų `<head>` ir `X-Robots-Tag` iš `vercel.json`.
