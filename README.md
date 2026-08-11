# Tech Zity — renginių erdvių puslapis (demo)

Live: **https://techzity-demo.vercel.app**

Statinė svetainė be build'o žingsnio: du HTML failai ir `assets/`. Jokio npm, jokio framework'o —
atsidarai `index.html` ir dirbi.

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

## Kur kas gyvena

| Ko reikia | Kur |
|---|---|
| Visas puslapio turinys ir stiliai | `index.html` (vienas failas: CSS `<style>`, HTML, JS `<script>`) |
| **Erdvių duomenys** (talpos, įranga, nuotraukos) | `index.html` → `const SPACES = [...]` |
| Renginių scenarijai | `index.html` → `const SCEN = [...]` |
| Lokacijos žemėlapiui (atstumai, parkavimas) | `index.html` → `const MAPDATA = {...}` |
| Lokacijų spalvos ir tipografija | `index.html` → `:root { ... }` |
| Privatumo politika | `privatumo-politika.html` |
| Salių nuotraukos | `assets/img/spaces/` (Tech Park + Tech Arts), `assets/img/skc/` (Samsung KC) |
| Scenarijų nuotraukos | `assets/img/scen/` |
| Atsisiunčiami kainoraščiai | `assets/docs/*.pdf` |
| Logotipas, šriftai | `assets/brand/`, `assets/fonts/` |

Sekcijos kraunamos iš JS masyvų, todėl naują salę pridėti = įrašyti dar vieną objektą į `SPACES`
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
  Kai bus atskiros nuorodos 3 lokacijoms — pakeisti `href` sekcijoje `#apziura`.
- **Google įvertinimas ir citatos**: kortelės veda į profilius, bet konkretaus balo nėra
  (senos „4,8 / 5" ir dvi citatos buvo pavyzdinės — pašalintos).
- **Klientų logotipai**: kol nėra failų, rodomi vardų ženkleliai (`.cnames`).
- **Formos**: demo režimu niekur nesiunčia. Produkcijai reikės backend'o (pvz. Resend) —
  `#inq` ir `#dlForm` submit handleriai `index.html` apačioje.
- **Terasų talpos** (Tech Park 750 / 500, Tech Arts 350) paimtos iš senesnio demo — pristatymuose
  jų nėra, verta patvirtinti su klientu.

## Kontekstas

`KOREKCIJOS-1-19.md` — kliento pastabų sąrašas (2026-07) ir kas pagal kiekvieną punktą padaryta,
su nuoroda, iš kurio šaltinio paimtas kiekvienas skaičius. **Perskaityk prieš keisdamas turinį** —
talpos, įranga ir kainos ateina iš kliento 2026 m. pristatymų, nieko neišgalvota.

Puslapis kol kas turi `noindex, nofollow` (demo). Prieš viešinant — išimti iš `index.html` `<head>`
ir iš `vercel.json` `X-Robots-Tag`.
