/* ═══════════════ DUOMENYS ═══════════════
   Šaltiniai: „2026 Tech PARK Renginių erdvės LT", „Tech ARTS Renginių erdvės | LT | 2026",
   „Samsung Konferencijų centras LT 2026" (bendra salių lentelė). */
const LOC = {
  park: {name:'Tech Park', addr:'Antakalnio g. 17', color:'var(--park)', ink:'var(--park-ink)'},
  arts: {name:'Tech Arts', addr:'Vaidilutės g. 79', color:'var(--arts)', ink:'var(--arts-ink)'},
  zity: {name:'Tech Zity Vilnius', addr:'Panerių g. 43', color:'var(--zity)', ink:'var(--zity-ink)'}
};

const TP_EQUIP = [
  'Integruota garso sistema',
  '2 projektoriai su ekranais',
  '3 bevieliai „hand-held" ir 2 „headset" mikrofonai',
  '2 skaidrių prezenteriai, 3 mikrofonų laikikliai',
  'Wi-Fi, LAN, trifazės jungtys',
  '255 kėdės, 20 rašomųjų stalų, 5 baro ir 9 kavos staliukai, 2 tribūnos, 3 baltos lentos',
  'Papildomai: 2 stumdomi TV — 75 € / vnt. + PVM'
];
const TA_EQUIP = [
  'Integruota garso sistema',
  'Projektorius',
  'Rankinis mikrofonas, skaidrių prezenteris',
  'Trifazis ir elektros įvadai, lauko vandens tiekimas',
  '150 kėdžių, 12 stalų, 2 baro staliukai ir 6 baro kėdės, tribūna, balta lenta',
  'Papildomai: stumdomas TV — 75 € + PVM'
];
const INCLUDED = 'Į kainą įskaičiuota: erdvės nuoma, turima įranga, baldai ir jų išdėstymas, valymas prieš renginį ir kontaktinis žmogus nuomos metu.';

const SPACES = [
  /* ── TECH PARK ── */
  {id:'tp-kc', loc:'park', name:'Konferencijų centras', area:'300 m²', theatre:300, outdoor:false,
   lead:'Didžioji ir Mažoji salės kartu — universaliausia Tech Park erdvė konferencijoms su maitinimu ir kūrybine laisve.',
   layouts:[['Teatro',300],['Teatro (šonu)',225],['Klasės (po 2)',200],['Dirbtuvių (po 4)',175],['Vakarienės (po 6–8)',180],['Stovimas',325]],
   equip:TP_EQUIP,
   photos:[['tp-kc-1','Teatro stiliumi | iki 300'],['tp-kc-2','Klasės stiliumi (grupės po 2) | iki 200'],['tp-kc-3','Dirbtuvių stiliumi (grupės po 4) | iki 175'],['tp-kc-4','Grupės po 6–8 | Vakarienės | iki 180'],['tp-kc-5','Teatro stiliumi (šonu) | iki 225'],['tp-kc-6','Stovimas renginys | Kūrybinė laisvė | iki 325']]},

  {id:'tp-didz', loc:'park', name:'Didžioji salė', area:'210 m²', theatre:190, outdoor:false,
   lead:'Šviesi salė su didžiuliais langais į Sapiegų parką — konferencijoms, pristatymams ir vakarienėms.',
   layouts:[['Teatro',190],['Teatro (šonu)',175],['Klasės (po 2)',120],['Dirbtuvių (po 4)',120],['Apvalūs stalai',140],['Stovimas',225]],
   equip:TP_EQUIP,
   photos:[['tp-didz-1','Teatro stiliumi | iki 190'],['tp-didz-2','Klasės stiliumi (grupės po 2) | iki 120'],['tp-didz-3','Dirbtuvių stiliumi (grupės po 4) | iki 120'],['tp-didz-4','Grupės po 6–8 | Apvalūs stalai | iki 140'],['tp-didz-5','Teatro stiliumi (šonu) | iki 175'],['tp-didz-6','Stovimas renginys | Kūrybinė laisvė | iki 225']]},

  {id:'tp-maz', loc:'park', name:'Mažoji salė', area:'90 m²', theatre:70, outdoor:false,
   lead:'Kompaktiška salė mokymams, posėdžiams ir pristatymams mažesnėms grupėms.',
   layouts:[['Teatro',70],['Klasės (po 2)',40],['Dirbtuvių (po 4)',30],['U-forma',25],['Posėdžių',20],['Stovimas',70]],
   equip:TP_EQUIP,
   photos:[['tp-maz-1','Teatro stiliumi | iki 70'],['tp-maz-2','Klasės stiliumi (grupės po 2) | iki 40'],['tp-maz-3','Dirbtuvių stiliumi (grupės po 4) | iki 30'],['tp-maz-4','U-forma | iki 25'],['tp-maz-5','Posėdžių | iki 20'],['tp-maz-6','Stovimas renginys | iki 70']]},

  {id:'tp-terasa', loc:'park', name:'Didžioji terasa + kiemas', area:'400 m² terasa + 1 200 m² kiemas', theatre:750, outdoor:true,
   lead:'XIX a. pastatų apsuptas kiemas su medine terasa — vasaros šventėms, koncertams ir išleistuvėms iki 750 dalyvių.',
   layouts:[['Lauko renginys',750]],
   equip:['Garso ir vaizdo įranga pagal užsakymą','Lauko elektros įvadai ir vandens tiekimas','Lauko paletiniai baldai','Maisto furgonėlių, BBQ ir paviljonų sprendimai per partnerius','Uždengimas tentu pagal užsakymą'],
   photos:[['tp-terasa-1','Medinė terasa palei pastatą'],['tp-terasa-2','Vidinis kiemas Sapiegų parke'],['tp-terasa-3','Terasa ir kiemas iš arti'],['tp-terasa-4','Išleistuvės kieme'],['tp-terasa-5','Koncertas su scena kieme'],['tp-terasa-6','Renginys po tentu']]},

  {id:'tp-mterasa', loc:'park', name:'Mažoji terasa + kiemas', area:'100 m² terasa + 800 m² kiemas', theatre:500, outdoor:true,
   lead:'Ramesnis kiemas su terasa šalia salių — kavos pertraukoms, priėmimams ir vasaros vakarėliams.',
   note:'Įeina į vidaus erdvių nuomą ir nuomojama tik kartu su vidaus erdvėmis.',
   layouts:[['Lauko renginys',500]],
   equip:['Garso ir vaizdo įranga pagal užsakymą','Lauko elektros įvadai ir vandens tiekimas','Lauko paletiniai baldai','Maisto furgonėlių ir BBQ sprendimai per partnerius'],
   photos:[['tp-mterasa-1','Terasa palei stiklinį korpusą'],['tp-mterasa-2','Terasa ir kiemas'],['tp-mterasa-3','Vaizdas į kiemą nuo terasos'],['tp-mterasa-4','Vasaros šventė su paviljonais'],['tp-mterasa-5','Priėmimas prie įėjimo'],['tp-mterasa-6','Svečiai kieme']]},

  /* ── TECH ARTS ── */
  {id:'ta-galerija', loc:'arts', name:'Didžioji galerija', area:'274 m²', theatre:250, outdoor:false,
   lead:'Universali galerija prie pat Neries su tiesioginiu patekimu į terasą. Holas ir skaitykla įeina į kainą.',
   layouts:[['Teatras',250],['Klasė / grupėmis',180],['Banketas',180],['Stovimas',250]],
   equip:TA_EQUIP,
   photos:[['ta-galerija-1','Teatro stiliumi | iki 250'],['ta-galerija-2','Tiesioginis patekimas į terasą, daug šviesos'],['ta-galerija-3','Stovimas renginys | Kūrybinė laisvė | iki 250'],['ta-galerija-4','Podiumas'],['ta-galerija-5','Banketo stilius / darbas grupėse | iki 200'],['ta-galerija-6','Erdvus holas maitinimui']]},

  {id:'ta-mgalerija', loc:'arts', name:'Mažoji galerija', area:'157 m²', theatre:100, outdoor:false,
   lead:'Didžioji galerija, padalinta stumdoma sienele. Rinkitės lango pusę (daugiau šviesos, patekimas į terasą) arba sienos pusę (integruotas projektorius).',
   layouts:[['Teatras',100],['Klasė / grupėmis',80],['Banketas',80],['Stovimas',120]],
   equip:TA_EQUIP,
   photos:[['ta-mgalerija-1','Sienos pusė: teatru | iki 100'],['ta-mgalerija-2','Galerija padalijama stumdoma sienele'],['ta-mgalerija-3','Lango pusė: U-forma | iki 60'],['ta-mgalerija-4','Sienos pusė: su projektoriumi | iki 100'],['ta-mgalerija-5','Atskiriama salė skirtingoms renginio funkcijoms'],['ta-mgalerija-6','Lango pusė: galimas mobilus TV prezentacijoms']]},

  {id:'ta-kambarys', loc:'arts', name:'Susitikimų kambarys', area:'32 m²', theatre:30, outdoor:false,
   lead:'Šviesus kambarys posėdžiams, komandiniam darbui ir „workation" dienoms — integruotas projektorius.',
   layouts:[['Teatras',30],['Klasė / grupėmis',24],['Posėdis (aplink stalą)',24],['Posėdis (U-forma)',22]],
   equip:TA_EQUIP,
   photos:[['ta-kambarys-1','Darbas grupėse: du stalai po 12 asm. | iki 24'],['ta-kambarys-2','Daug natūralios šviesos | Posėdis | iki 24'],['ta-kambarys-3','Integruotas projektorius | Teatro išdėstymas'],['ta-kambarys-4','„Workation" — komandinis darbas kitur'],['ta-kambarys-5','Posėdis: U-forma | iki 22'],['ta-kambarys-6','Teatras | iki 30']]},

  {id:'ta-skaitykla', loc:'arts', name:'Skaitykla', area:'51 m²', theatre:60, outdoor:false,
   lead:'Jauki svetainė su vaizdu į gamtą ir tiesioginiu patekimu į terasą — pertraukėlėms, maitinimui ar kameriniam renginiui.',
   note:'Skaitykla nėra privati erdvė, tačiau žmonių srautas joje minimalus.',
   layouts:[['Teatras',60],['Klasė / grupėmis',50],['Posėdis (aplink stalą)',30],['Stovimas',60]],
   equip:TA_EQUIP,
   photos:[['ta-skaitykla-1','Svetainė — jauki vieta pertraukėlėms'],['ta-skaitykla-2','Daug natūralios šviesos ir gamtos, jaukūs baldai'],['ta-skaitykla-3','Terasa už lango | tiesioginis patekimas į terasą'],['ta-skaitykla-4','Patogus srautas iš Galerijos pro holą iki Skaityklos'],['ta-skaitykla-5','Teatras, sieninis TV | iki 50'],['ta-skaitykla-6','Stovimas / sėdimas renginys']]},

  {id:'ta-terasa', loc:'arts', name:'Terasa + kiemas', area:'500 m²', theatre:350, outdoor:true,
   lead:'Terasa su tiesioginiu patekimu iš renginių salių, didžiulis kiemas prie upės kranto, teniso, padelio ir paplūdimio tinklinio aikštelės.',
   layouts:[['Lauko renginys (su galerija)',350]],
   equip:['Garso ir vaizdo įranga pagal užsakymą','Trifazis ir elektros įvadai, lauko vandens tiekimas','Teniso, padelio ir paplūdimio tinklinio aikštelės','Maisto furgonėlių ir BBQ sprendimai per partnerius','Renginiai apdrausti nuo permainingų orų — paviljonai per partnerius'],
   photos:[['ta-terasa-1','Terasa su tiesioginiu patekimu iš renginių salių'],['ta-terasa-2','Renginiai apdrausti nuo permainingų orų'],['ta-terasa-3','Stovimas renginys kieme su maitinimu'],['ta-terasa-4','Gamtos apsuptyje prie upės kranto paplūdimio'],['ta-terasa-5','Teniso, padelio ir paplūdimio tinklinio aikštelės'],['ta-terasa-6','Didžiulis kiemas įvairiems lauko renginiams']]},

  /* ── TECH ZITY VILNIUS · SAMSUNG KONFERENCIJŲ CENTRAS ── */
  {id:'skc-a', loc:'zity', name:'Didžioji salė A', area:'470 m²', theatre:500, outdoor:false, dir:'skc',
   lead:'Didžiausia salė po 1947 m. medinių santvarų skliautu — 7 m aukščio, be kolonų. Samsung 2,5 mm LED siena, scena ir koncertams suderinta akustika.',
   layouts:[['Teatro',500],['Vakarienės',270],['Klasės',230],['Kabareto',210],['Prie stalelių',355],['Be baldų',570]],
   equip:['SAMSUNG 2,5 mm LED ekranas 6 720 × 3 780 mm, valdymas AVoIP sistema','Iki 6 × 65" dubliavimo ekranų','8 kolonėlių garso sistema','5 × Shure MXW2/BETA58 ir 2 × TH53/O-MTQG mikrofonai','12 × „wash" prožektorių, DMX valdiklis','Valdomas RGB stogo skliauto apšvietimas','Scena 3 × 10 m (Hexa danga, 60–80 cm aukštis)'],
   photos:[['hall-a-1','Didžioji salė A — medinių santvarų skliautas ir scena'],['hall-a-2','Vaizdas nuo scenos į salę'],['lobby-2a-2','Įėjimas į A salę iš antro aukšto holo']]},

  {id:'skc-bc', loc:'zity', name:'Vidutinė salė B+C', area:'250 m²', theatre:220, outdoor:false, dir:'skc',
   lead:'Sujungtos B ir C salės su LED siena ir scena — konferencijoms iki 220 dalyvių arba vakarienei iki 140 svečių.',
   layouts:[['Teatro',220],['Vakarienės',140],['Klasės',110],['Kabareto',95],['Prie stalelių',190],['Be baldų',300]],
   equip:['SAMSUNG 2,5 mm LED ekranas 5 760 × 3 240 mm, valdymas AVoIP sistema','Iki 4 × 65" dubliavimo ekranų','6 kolonėlių garso sistema','4 × MXW2/BETA58 ir 2 × TH53/O-MTQG mikrofonai','4 × „wash" prožektoriai, DMX valdiklis','Valdomas RGB skliauto apšvietimas','Scena 3 × 10 m (Hexa danga, 60–80 cm aukštis)'],
   photos:[['hall-bc-1','Vidutinė salė B+C — sujungtos salės su scena'],['hall-bc-2','Vaizdas link durų']]},

  {id:'skc-c', loc:'zity', name:'Mažoji salė C', area:'140 m²', theatre:130, outdoor:false, dir:'skc',
   lead:'Juodos sienos scenografija posėdžiams, pristatymams ir kamerinėms diskusijoms.',
   layouts:[['Teatro',130],['Vakarienės',80],['Klasės',75],['Kabareto',65],['Prie stalelių',105],['Be baldų',170]],
   equip:['Valdomas RGB stogo skliauto apšvietimas','Įranga komplektuojama pagal renginį — mobilūs LED ekranai, garso sistema'],
   photos:[['hall-c-1','Mažoji salė C — juodos sienos scenografija']]},

  {id:'skc-b', loc:'zity', name:'Mažoji salė B', area:'110 m²', theatre:90, outdoor:false, dir:'skc',
   lead:'Kompaktiška salė seminarams, mokymams ir pristatymams — 130" mobilus Samsung LED ekranas ir AVoIP valdymas.',
   layouts:[['Teatro',90],['Vakarienės',65],['Klasės',60],['Kabareto',45],['Prie stalelių',85],['Be baldų',130]],
   equip:['130" SAMSUNG mobilus LED ekranas, valdymas AVoIP sistema','Iki 2 × 65" dubliavimo ekranų','2 kolonėlių garso sistema','2 × Shure MXW2/BETA58 mikrofonai','Valdomas RGB stogo skliauto apšvietimas'],
   photos:[['hall-b-1','Mažoji salė B — mobilus Samsung LED ekranas']]},

  {id:'skc-d', loc:'zity', name:'Oranžerija + Kiemas', area:'390 + 300 m²', theatre:400, outdoor:true, dir:'skc',
   lead:'Skaidraus tento paviljonas ir žalias kiemas — lauko renginiams iki 550 svečių.',
   layouts:[['Teatro',400],['Vakarienės',220],['Klasės',260],['Kabareto',170],['Prie stalelių',300],['Be baldų',550]],
   equip:['Skaidraus tento paviljonas (apie 10 m pločio)','Lauko elektros įvadai ir kabinimo taškai','Mobilios garso kolonėlės laukui','Paviljono nuoma ne vasaros sezonu — 400 € / renginio dienai'],
   photos:[['orangery-1','Oranžerija — skaidraus tento paviljonas su svečiais'],['orangery-decor','Dekoravimo pavyzdys su apvaliais stalais'],['orangery-2','Paviljono vidus']]},

  {id:'skc-abcd', loc:'zity', name:'Visas centras (buy-out)', area:'2 650 m²', theatre:1000, outdoor:false, dir:'skc',
   lead:'Privatus viso pastato naudojimas: visos salės, holai, restoranas „Gastrolės" ir kiemas — iki 1 000 dalyvių viename renginyje.',
   note:'Holas 1A ir Holas 2A (stovimi priėmimai iki 360 ir 270 svečių) bei restoranas „Gastrolės" (vakarienės iki 190) nuomojami tik kartu su salėmis.',
   layouts:[['Teatro',1000],['Vakarienės',775],['Klasės',725],['Kabareto',585],['Prie stalelių',1000],['Be baldų',1000]],
   equip:['Visa A, BC ir B salių integruota Samsung įranga','Bendrosios erdvės, restoranas ir kiemas','Integruoti reklaminiai ekranai rėmėjų aktyvacijoms','Užkulisių kambariai ir grimerinė'],
   photos:[['entrance-1','Pagrindinis įėjimas į konferencijų centrą'],['lobby-2a-1','Antro aukšto holas — registratūra'],['lobby-1a-1','Pirmo aukšto holas — laiptai ir lounge zona'],['courtyard-1','Restoranų kiemas Tech Zity miestelyje']]}
];

/* photos: [failas, matoma antraštė (be pasikartojančio scenarijaus pavadinimo), pilnas alt tekstas] */
const SCEN = [
  {k:'konferencija', label:'Konferencijos', photos:[['scen-tp-1','Tech Park','Konferencija · Tech Park'],['scen-ta-1','Tech Arts','Konferencija · Tech Arts'],['scen-tp-3','Seminaras · Tech Park'],['scen-ta-6','Mokymai · Tech Arts']], size:'m'},
  {k:'hakatonas', label:'Hakatonai ir mokymai', photos:[['scen-tp-3','Tech Park','Hakatonas · Tech Park'],['scen-ta-6','Tech Arts','Mokymai · Tech Arts'],['scen-tp-2','Off-site · Tech Park'],['scen-ta-7','Dirbtuvės · Tech Arts']], size:'m'},
  {k:'vakarelis', label:'Įmonių vakarėliai', photos:[['scen-tp-4','Tech Park','Įmonės vakarėlis · Tech Park'],['scen-ta-5','Priėmimas · Tech Arts'],['scen-tp-6','Vakaro šventė · Tech Park'],['scen-ta-3','Vakarienė · Tech Arts']], size:'l'},
  {k:'koncertas', label:'Koncertai', photos:[['scen-tp-4','Tech Park','Koncertas · Tech Park'],['tp-terasa-5','Kieme · Tech Park','Koncertas kieme · Tech Park'],['scen-tp-6','Scena ir apšvietimas'],['scen-ta-5','Gyvas pasirodymas · Tech Arts']], size:'l'},
  {k:'lauko', label:'Lauko renginiai', photos:[['scen-tp-9','Vasara kieme · Tech Park','Vasaros renginys kieme · Tech Park'],['tp-terasa-4','Šventė kieme · Tech Park'],['ta-terasa-4','Kiemas prie Neries · Tech Arts'],['scen-ta-2','Gamtoje · Tech Arts','Renginys gamtoje · Tech Arts']], size:'l'},
  {k:'isleistuves', label:'Išleistuvės', photos:[['scen-tp-5','Kieme · Tech Park','Išleistuvės kieme · Tech Park'],['tp-terasa-4','Kepurių metimas · Tech Park'],['scen-ta-3','Vakarienė · Tech Arts'],['scen-tp-6','Šventinis vakaras']], size:'l'},
  {k:'vestuves', label:'Vestuvės', photos:[['scen-ta-4','Tech Arts','Vestuvės · Tech Arts'],['scen-ta-3','Vakarienė · Tech Arts','Vestuvių vakarienė · Tech Arts'],['ta-terasa-3','Ceremonija kieme · Tech Arts'],['scen-tp-6','Šventė salėje · Tech Park']], size:'m'},
  {k:'paroda', label:'Parodos ir pristatymai', photos:[['scen-tp-2','Tech Park','Paroda · Tech Park'],['scen-tp-7','Produkto pristatymas · Tech Park'],['scen-ta-7','Meno instaliacija · Tech Arts'],['scen-tp-8','Unikalus renginys · Tech Park']], size:'m'}
];

const MAPDATA = {
  park:{
    name:'Tech Park', addr:'Antakalnio g. 17, 10312 Vilnius', color:'var(--park)', ink:'var(--park-ink)',
    desc:'Startuolių miestelis Sapiegų parke — XIX a. pastatų konversija, menanti Sapiegų rūmų didybę. Konferencijų centras, dvi salės ir didžiosios terasos su kiemais.',
    dist:[['3 min','automobiliu iki Senamiesčio'],['20 min','pėsčiomis iki Katedros'],['Stotelė','L. Sapiegos — artimiausia viešojo transporto stotelė']],
    park:'Iš anksto sutarus suteikiame iki 5 parkavimo vietų vidinėje aikštelėje. Dalyviams — vieša miesto aikštelė kelios minutės pėsčiomis, žalioje zonoje.',
    maps:'https://www.google.com/maps/dir/?api=1&destination=Antakalnio+g.+17,+Vilnius'
  },
  arts:{
    name:'Tech Arts', addr:'Vaidilutės g. 79, 10100 Vilnius', color:'var(--arts)', ink:'var(--arts-ink)',
    desc:'Valakampiuose prie pat Neries, gražiausiame Vilniaus rajone — nostalgiškas vaikystės paplūdimio kampelis, išvystytas į kūrybos ir sveikatingumo epicentrą.',
    dist:[['15 min','automobiliu nuo Senamiesčio'],['~100','nemokamų parkavimo vietų šalia pastato'],['Stotelė','„Antrasis paplūdimys" — 15 autobusas']],
    park:'Didelė vieša aikštelė priešais pastatą: nemokama šaltuoju sezonu (10-01–05-31), mokama šiltuoju (06-01–09-30, geltonoji zona). Iki 3 vietų vidinėje aikštelėje su šlagbaumu. Bolt Drive / CityBee / Spark zona.',
    maps:'https://www.google.com/maps/dir/?api=1&destination=Vaidilut%C4%97s+g.+79,+Vilnius'
  },
  zity:{
    name:'Tech Zity Vilnius', addr:'Panerių g. 43, 03202 Vilnius', color:'var(--zity)', ink:'var(--zity-ink)',
    desc:'Mūsų flagmanas Naujamiestyje — 55 000 m² technologijų miestelis su Samsung konferencijų centru buvusiame 1947 m. „Lelijos" siuvyklos pastate. 8 restoranai, 4 žali kiemai.',
    dist:[['15 min','pėsčiomis iki senamiesčio ir stoties'],['10 min','automobiliu iki oro uosto'],['2 min','iki pietinio aplinkkelio']],
    park:'Parkavimas miestelio teritorijoje. Patogus privažiavimas iš pietinio aplinkkelio — logistika renginio technikai ir dekoracijoms.',
    maps:'https://www.google.com/maps/dir/?api=1&destination=Paneri%C5%B3+g.+43,+Vilnius'
  }
};

/* Pradinio puslapio klientų juosta. Kol nėra logotipų failų, rodomi vardų ženkleliai —
   gavus logotipus, `site.js` juostoje `<span>` keičiamas į `<img>`. Pilni sąrašai — atsiliepimai.html. */
const CLIENTS_FEATURED = ['Google','Meta','LTG','Vinted','Wix','Swedbank','Surfshark','Nord Security',
  'Hostinger','Luminor','Ignitis','EY','Go Vilnius','Delfi','Turing College','Havas','Plug&Play','Ermitažas'];
