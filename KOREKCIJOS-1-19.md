# Tech Zity renginių erdvių puslapis — kliento korekcijos 1–19

**Šaltinis:** „Korekcijos - Growthwave website (2).pdf", 1 dalis (Renginių erdvių paslaugos website).
2 dalis (SAMSUNG website) į šį darbą **neįtraukta** — ji tvarkoma atskirai
(`clients/samsungkc/`).

**Darbo failai:** `techzity-demo/` (deploy paketas), `demo-mirror/index.html` (senojo demo kopija,
nes originalaus šaltinio šioje mašinoje nebuvo — puslapis buvo deployintas iš kolegos Vercel paskyros).

---

## Turinio šaltiniai (viskas iš kliento medžiagos, nieko neišgalvota)

| Duomuo | Šaltinis |
|---|---|
| Tech Park salių talpos, įranga, baldai, parkavimas, sąlygos | „2026 Tech PARK Renginių erdvės LT.pdf" |
| Tech Arts salių talpos, įranga, baldai, parkavimas, sąlygos | „Tech ARTS Renginių erdvės \| LT \| 2026.pdf" |
| Samsung KC (Tech Zity Vilnius) salės A / B+C / B / C / Oranžerija / ABCD | „Samsung Konferencijų centras LT 2026_.pdf" + `clients/samsungkc/site/src/_data/halls.json` (ta pati bendra lentelė) |
| Salių nuotraukos (60 vnt.) | iškirptos iš Tech Park ir Tech Arts pristatymų skaidrių (kiekvienos salės 6 išdėstymo kadrai) |
| Renginių scenarijų nuotraukos (18 vnt.) | iškirptos iš „Kodėl Tech Park / Tech Arts?" skaidrių |
| Samsung KC nuotraukos | `clients/samsungkc/brand_assets/curated/` |
| Virtualūs turai | Matterport nuorodos iš tų pačių pristatymų |
| Apžiūrų kalendorius | `calendarBookingUrl` iš samsungkc `site.json` (kliento Google appointments booker) |
| Privatumo politika | `clients/samsungkc/site/src/_data/privacy.json` — jau pritaikyta **TechZity Events, UAB** |
| Logotipas, fontai, spalvos | `00_BRAND FILES` (Desktop\New folder (3)) |

**Lokacijų spalvos** (paimtos iš pačių pristatymų antraščių juostų):
Tech Park `#FFC36A` · Tech Arts `#0FCB76` · Tech Zity Vilnius `#F04800` (vermillion).
Bazė — brandbook: wine `#251216`, rust `#A53E00`, sage `#D0DFDD`.

**„Dobiliukas"** (korekcija 3) — mygtukų forma nuklonuota nuo firminio Tech Zity ženklo silueto
(`COVER LOGOS COLORS/*.png` keturių lapelių forma): nuožulnūs šonai + įpjovos kiekvieno krašto
viduryje. CSS kaukė `--clover`, dedama ant `::before`, kad `:focus-visible` žiedas liktų matomas.

---

## Kas padaryta pagal kiekvieną punktą

1. **Navigacija** — palikta ta pati struktūra kaip likusiuose Tech Zity tinklapiuose
   (Apie Tech Zity / Lokacijos / Paslaugos / Naujienos / Kontaktai + geltonas CTA + EN),
   tik dabar su tikru logotipu ir veikiančiu mobiliu meniu (anksčiau burgerio mygtukas nieko nedarė).
2. **Mobile** — perdaryti tarpai (token skalė). **Hero video lieka tas pats klipas ir groja
   visuose įrenginiuose** (user directive) — vietoje video išjungimo telefone sutvarkytas
   skaitomumas: kadras patamsintas (`brightness .66`) + dviejų sluoksnių šydas.
   Išmatuota per 8 klipo kadrus: blogiausias baltas tekstas ant fono — 6,67:1 (reikia 4,5:1),
   H1 — 9,26:1 (reikia 3:1). Poster kadras rodomas iš karto, video užsideda be mirktelėjimo;
   yra pauzės mygtukas, `prefers-reduced-motion` sustabdo. Hero telpa virš lipnios CTA juostos,
   kad kontaktų mygtukai nebūtų uždengti. 320/390 px — jokio horizontalaus scrollo.
3. **Fontai ir mygtukai** — self-hosted Deacon (display) + Neue Haas Grotesk (tekstas);
   visi mygtukai — firminio „dobiliuko" formos.
4. **Telefono mygtukai** — `tel:` nuoroda (mobiliajame skambina) + atskiras **Kopijuoti** mygtukas
   šalia (kompiuteryje kopijuoja į iškarpinę, rodo „Nukopijuota"). Tas pats el. paštui.
5. **Viršus ir sekcijų tarpai** — vienoda `--sec` skalė, `tight` variantas antriniams blokams;
   filtrai suvesti į vieną tvarkingą juostą.
6. **Salės pop-upe** — kortelė atveria modalą su galerijos skroleriu (rodyklės, taškai, klaviatūra,
   Escape, focus trap), pilnu išdėstymų sąrašu ir įranga. Kiekvienai Tech Park / Tech Arts salei —
   po 6 realias nuotraukas su kliento pristatymo parašais.
7. **SKC salės pridėtos** — Didžioji A, Vidutinė B+C, Mažoji B, Mažoji C, Oranžerija + Kiemas,
   Visas centras (buy-out); talpos pagal bendrą lentelę, tą pačią kaip Samsung web.
8. **Filtras pagal svečių skaičių** — iki 100 / iki 250 / virš 250 (pagal teatro stilių),
   veikia kartu su lokacijos filtru; rodomas rezultatų skaičius.
9. **Įranga ir sąlygos** — išimta iš kortelių (burbuliukai nebeslankioja), perkelta į pop-upą.
   Kortelėje liko tik plotas, talpa ir lokacijos spalva.
10. **Social proof** — 6 nuorodos (Google × 2, Placer × 2, Breezit × 2), „300+ patenkintų renginių
    klientų per metus" juosta ir pilni klientų sąrašai (verslas / agentūros / organizacijos).
    Logotipų failų neturime, todėl vardai pateikti kaip tvarkingi ženkleliai — jokių netikrų logotipų.
11. **Tech Zity Events logotipas** — viršutinėje juostoje ir poraštėje (tikras SVG iš brand failų).
12. **Kainos** — nerodomos. Vietoje jų „Į nuomos kainą įskaičiuota" sąrašas + forma, kurią užpildžius
    iš karto atsiveria pilni Tech Park ir Tech Arts kainoraščiai (PDF) ir SKC pristatymas.
13. **Žemėlapis** — švari inline SVG Vilniaus schema su 3 lokacijomis tikrose geografinėse pozicijose,
    Nerimi ir orientyrais (Katedra, stotis, oro uostas). Paspaudus žymeklį — aprašymas, atstumai
    (Tech Park 3 min iki Senamiesčio; Tech Arts ~100 nemokamų vietų; SKC 10 min iki oro uosto,
    2 min iki pietinio aplinkkelio) ir parkavimo sąlygos.
14. **Renginių scenarijai** — 8 formatai (konferencijos, hakatonai, įmonių vakarėliai, koncertai,
    lauko renginiai, išleistuvės, vestuvės, parodos) su tikromis nuotraukomis;
    mygtukas „Rodyti tinkamas erdves" uždeda atitinkamą dydžio filtrą.
15. **Virtualus turas** — abu Matterport turai (Tech Arts | Tech Park) puslapio apačioje,
    nuoroda ir inkarų juostoje. SKC turo kol kas nėra — taip ir parašyta.
16. **Spalvų koordinavimas** — lokacijos spalva kortelės juostoje, etiketėje, filtro mygtuke,
    žemėlapio žymeklyje, apžiūrų kortelėje ir hero ženkleliuose.
17. **Formos laukas** — „Nežinau, patarkite" pakeista į **„Noriu jūsų konsultacijos / patarimo"**.
18. **Privatumo politika** — atskiras puslapis `privatumo-politika.html`, valdytojas
    **TechZity Events, UAB** (įm. k. 304066506); pritaikyta šiai svetainei
    (vietoje Google Maps aprašytas Matterport turas ir kalendorius).
19. **Apžiūrų kalendoriai** — 4 kortelės: Tech Park, Tech Arts, Tech Zity Vilnius ir
    „Renginių erdvių konsultacija". Kol nėra atskirų nuorodų, visos veda į kliento Google
    appointments booker.

---

## Ką dar reikia kliento / user'io

- **Atskiros kalendoriaus nuorodos** kiekvienai lokacijai (dabar visos 4 → tas pats booker).
- **Google įvertinimas ir atsiliepimų citatos** — kortelės veda į profilius, bet konkretūs
  balai/citatos neįrašyti, nes tikslių duomenų neturime (senajame demo buvę „4,8 / 5" ir
  dvi citatos buvo pažymėti kaip PAVYZDYS — jie pašalinti).
- **Klientų logotipų failai**, jei norima juostos vietoje vardų sąrašo.
- **Formos backend** (Resend raktai), jei demo virsta gyva svetaine.
- Terasų talpos (Tech Park 750 / 500, Tech Arts 350) paimtos iš ankstesnio demo ir
  viešos svetainės — pristatymuose jų nėra; verta patvirtinti.
