/* ═══════════════ DUOMENYS ═══════════════
   Šaltiniai: „2026 Tech PARK Renginių erdvės LT",
   „Samsung Konferencijų centras LT 2026" (bendra salių lentelė),
   kliento pastabos 2026-10-15 (PASTABOS-2026-10-15.md).
   Kainų, mokesčių ir sutarties sąlygų svetainėje nerodome (2026-10-15 sprendimas — mažina pardavimus):
   tik minimali trukmė ir kas įskaičiuota; kaina — pasiūlyme.
   Tech Arts išimta visiškai (renginiai nebevyksta nuo 2026-10-06, prierašo klientas nepageidauja).
   Erdvių yra 8; `combo` pažymi 3 jų derinius (Didžioji + Mažoji, B + C, visas centras) —
   jie rodomi kaip atskiros kortelės, bet į erdvių skaičių neįeina. */
const LOC = {
  park: {name:'Tech Park', addr:'Antakalnio g. 17', color:'var(--park)', ink:'var(--park-ink)'},
  zity: {name:'Tech Zity Vilnius', addr:'Panerių g. 43', color:'var(--zity)', ink:'var(--zity-ink)'}
};

const TP_EQUIP = [
  'Integruota garso sistema',
  '2 projektoriai su ekranais',
  '3 bevieliai „hand-held" ir 2 „headset" mikrofonai',
  '2 skaidrių prezenteriai, 3 mikrofonų laikikliai',
  'Wi-Fi, LAN, trifazės jungtys',
  '250 kėdžių, 5 kavos staliukai, 2 baltos lentos',
  '2 stumdomi TV ekranai — pagal užklausą'
];
/* Sąlygos skiriasi pagal lokaciją. Tech Park — 2026 pristatymo „Sąlygos" skaidrė (p. 11),
   SKC — SKC pristatymas (samsungkc.lt „Į kainą įskaičiuota"); minimali SKC trukmė — kliento pastaba 2026-10-15. */
const TERMS = {
  park: {
    min: 'Minimali rezervacija — 3 renginio valandos.',
    included: 'Į kainą įskaičiuota: erdvės nuoma, turima įranga, turimi baldai ir jų išdėstymas prieš atvykstant, erdvių valymas prieš atvykstant ir kontaktinis žmogus nuomos metu.'
  },
  zity: {
    min: 'Minimali nuoma — pusė dienos.',
    included: 'Į kainą įskaičiuota: renginio erdvė, integruota garso, vaizdo ir apšvietimo įranga, 3 belaidžiai mikrofonai, renginio koordinatorius, turimų baldų išdėstymas teatro stiliumi, valymas prieš renginį ir bendrosios erdvės.'
  }
};

const SPACES = [
  /* ── TECH PARK ── */
  /* Teatro talpa 250 (kliento pastaba 2026-10-15: „Teatru sodiname 250 žmonių"; pristatyme buvo 300) */
  {id:'tp-kc', loc:'park', name:'Konferencijų centras', combo:'Didžioji + Mažoji salės', area:'300 m²', theatre:250, outdoor:false,
   lead:'Didžioji ir Mažoji salės kartu — universaliausia Tech Park erdvė konferencijoms su maitinimu ir kūrybine laisve.',
   layouts:[['Teatro',250],['Teatro (šonu)',225],['Klasės (po 2)',200],['Dirbtuvių (po 4)',175],['Vakarienės (po 6–8)',180],['Stovimas',325]],
   equip:TP_EQUIP,
   hero:'tz-kc', photos:[['tp-kc-1','Teatro stiliumi | iki 250'],['tp-kc-4','Grupės po 6–8 | Vakarienės | iki 180'],['tp-kc-5','Teatro stiliumi (šonu) | iki 225'],['tp-kc-7','Stalai darbui grupėmis'],['tp-kc-8','Laisva erdvė per visą salės ilgį'],['tp-kc-2','Klasės stiliumi (grupės po 2) | iki 200'],['tp-kc-3','Dirbtuvių stiliumi (grupės po 4) | iki 175'],['tp-kc-6','Stovimas renginys | Kūrybinė laisvė | iki 325']]},

  {id:'tp-didz', loc:'park', name:'Didžioji salė', area:'210 m²', theatre:190, outdoor:false,
   lead:'Šviesi salė su didžiuliais langais į Sapiegų parką — konferencijoms, pristatymams ir vakarienėms.',
   layouts:[['Teatro',190],['Teatro (šonu)',175],['Klasės (po 2)',120],['Dirbtuvių (po 4)',120],['Apvalūs stalai',140],['Stovimas',225]],
   equip:TP_EQUIP,
   photos:[['tp-didz-0','Didžioji salė su stalais'],['tp-didz-9','Darbas grupėse renginio metu'],['tp-didz-1','Teatro stiliumi | iki 190'],['tp-didz-2','Klasės stiliumi (grupės po 2) | iki 120'],['tp-didz-3','Dirbtuvių stiliumi (grupės po 4) | iki 120'],['tp-didz-4','Grupės po 6–8 | Apvalūs stalai | iki 140'],['tp-didz-5','Teatro stiliumi (šonu) | iki 175'],['tp-didz-6','Stovimas renginys | Kūrybinė laisvė | iki 225']]},

  {id:'tp-maz', loc:'park', name:'Mažoji salė', area:'90 m²', theatre:70, outdoor:false,
   lead:'Kompaktiška salė mokymams, posėdžiams, workation ir pristatymams mažesnėms grupėms.',
   layouts:[['Teatro',70],['Klasės (po 2)',40],['Dirbtuvių (po 4)',30],['U-forma',25],['Posėdžių',20],['Stovimas',70]],
   equip:TP_EQUIP,
   photos:[['tp-maz-1','Teatro stiliumi | iki 70'],['tp-maz-7','Stalai posėdžiui'],['tp-maz-8','Ilgi stalai darbui'],['tp-maz-2','Klasės stiliumi (grupės po 2) | iki 40'],['tp-maz-3','Dirbtuvių stiliumi (grupės po 4) | iki 30'],['tp-maz-4','U-forma | iki 25'],['tp-maz-5','Posėdžių | iki 20'],['tp-maz-6','Stovimas renginys | iki 70']]},

  {id:'tp-terasa', loc:'park', name:'Didžioji terasa + kiemas', area:'400 m² terasa + 1 200 m² kiemas', theatre:750, outdoor:true,
   lead:'XIX a. pastatų apsuptas kiemas su medine terasa — vasaros šventėms, koncertams ir išleistuvėms iki 750 dalyvių.',
   layouts:[['Lauko renginys',750]],
   equip:['Garso ir vaizdo įranga pagal užsakymą','Lauko elektros įvadai ir vandens tiekimas','Lauko paletiniai baldai','Maisto furgonėlių, BBQ ir paviljonų sprendimai per partnerius','Uždengimas tentu pagal užsakymą'],
   photos:[['tp-terasa-1','Medinė terasa palei pastatą'],['tp-terasa-2','Vidinis kiemas Sapiegų parke'],['tp-terasa-7','Medinė terasa ir kiemas'],['tp-terasa-6','Renginys po tentu'],['tp-terasa-3','Terasa ir kiemas iš arti'],['tp-terasa-4','Išleistuvės kieme'],['tp-terasa-5','Koncertas su scena kieme']]},

  {id:'tp-mterasa', loc:'park', name:'Mažoji terasa + kiemas', area:'100 m² terasa + 800 m² kiemas', theatre:500, outdoor:true,
   lead:'Ramesnis kiemas su terasa šalia salių — kavos pertraukoms, priėmimams ir vasaros vakarėliams.',
   note:'Įeina į vidaus erdvių nuomą ir nuomojama tik kartu su vidaus erdvėmis.',
   layouts:[['Lauko renginys',500]],
   equip:['Garso ir vaizdo įranga pagal užsakymą','Lauko elektros įvadai ir vandens tiekimas','Lauko paletiniai baldai','Maisto furgonėlių ir BBQ sprendimai per partnerius'],
   photos:[['tp-mterasa-1','Terasa palei stiklinį korpusą'],['tp-mterasa-2','Terasa ir kiemas'],['tp-mterasa-3','Vaizdas į kiemą nuo terasos'],['tp-mterasa-5','Priėmimas prie įėjimo'],['tp-mterasa-6','Svečiai kieme'],['tp-mterasa-4','Vasaros šventė su paviljonais']]},

  /* ── TECH ZITY VILNIUS · SAMSUNG KONFERENCIJŲ CENTRAS ──
     2026-10-16 kliento pastaba „visos SKC nuotraukos — tokios pačios kaip SKC web": nuotraukos, jų parašai ir
     įranga — kaip samsungkc.lt (halls.json, gyva versija 95b3d92). Ten B ir C salių įranga sukeista pagal kliento
     sąrašą (2026-09-10): B — LED siena ir scena, C — 130" mobilus LED; todėl B rodo hall-c-1, C — hall-b-1.
     Parašuose kabutės tipografinės (nepatenka į alt atributą kaip ").  */
  {id:'skc-a', loc:'zity', name:'Didžioji salė A', area:'470 m²', theatre:500, outdoor:false, dir:'skc',
   lead:'Didžiausia salė po 1947 m. medinių santvarų skliautu — 7 m aukščio, be kolonų. „Samsung" 2,5 mm LED siena, scena ir koncertams suderinta akustika.',
   layouts:[['Teatro',500],['Vakarienės',270],['Klasės',230],['Kabareto',210],['Prie stalelių',355],['Be baldų',570]],
   equip:['„Samsung" 2,5 mm LED ekranas 6 720 × 3 780 mm, valdymas AVoIP sistema','Iki 6 × 65" dubliavimo ekranų','8 kolonėlių garso sistema','5 × „Shure" MXW2/BETA58 ir 2 × TH53/O-MTQG mikrofonai','12 × „wash" prožektorių, DMX valdiklis','Valdomas RGB stogo skliauto apšvietimas','Scena 3 × 10 m (2 × 1 m segmentai, Hexa danga, 60–80 cm aukštis)'],
   photos:[['hall-a-1','Didžioji salė A — medinių santvarų skliautas ir scena'],['hall-a-2','Vaizdas nuo scenos į salę'],['lobby-2a-2','Įėjimas į A salę iš antro aukšto holo']]},

  {id:'skc-bc', loc:'zity', name:'Vidutinė salė B+C', combo:'B + C salės', area:'250 m²', theatre:220, outdoor:false, dir:'skc',
   lead:'Sujungtos B ir C salės su LED siena ir scena — konferencijoms iki 220 dalyvių arba vakarienei iki 140 svečių.',
   layouts:[['Teatro',220],['Vakarienės',140],['Klasės',110],['Kabareto',95],['Prie stalelių',190],['Be baldų',300]],
   equip:['„Samsung" 2,5 mm LED ekranas 5 760 × 3 240 mm, valdymas AVoIP sistema','Iki 4 × 65" dubliavimo ekranų','6 kolonėlių garso sistema','4 × MXW2/BETA58 ir 2 × TH53/O-MTQG mikrofonai','4 × „wash" prožektoriai, DMX valdiklis','Valdomas RGB skliauto apšvietimas','Scena 3 × 10 m (2 × 1 m segmentai, Hexa danga, 60–80 cm aukštis)'],
   photos:[['hall-bc-1','Vidutinė salė B+C — sujungtos salės su scena'],['hall-bc-2','Vaizdas link durų']]},

  {id:'skc-c', loc:'zity', name:'Mažoji salė C', area:'140 m²', theatre:130, outdoor:false, dir:'skc',
   lead:'Juodos sienos scenografija posėdžiams, pristatymams ir kamerinėms diskusijoms — 130" mobilus „Samsung" LED ekranas ir AVoIP valdymas.',
   layouts:[['Teatro',130],['Vakarienės',80],['Klasės',75],['Kabareto',65],['Prie stalelių',105],['Be baldų',170]],
   equip:['130" „Samsung" mobilus LED ekranas, valdymas AVoIP sistema','2 kolonėlių garso sistema','2 × „Shure" MXW2/BETA58 mikrofonai','Valdomas RGB stogo skliauto apšvietimas'],
   photos:[['hall-b-1','Mažoji salė C — 130″ mobilus „Samsung“ LED ekranas'],['hall-bc-1','Sujungta B+C konfigūracija — salė atsidaro su scena'],['hall-bc-2','Sujungta B+C konfigūracija — vaizdas link durų']]},

  {id:'skc-b', loc:'zity', name:'Mažoji salė B', area:'110 m²', theatre:90, outdoor:false, dir:'skc',
   lead:'Kompaktiška salė seminarams, mokymams ir pristatymams — „Samsung" 2,5 mm LED siena 5,8 × 3,2 m, scena ir AVoIP valdymas.',
   layouts:[['Teatro',90],['Vakarienės',65],['Klasės',60],['Kabareto',45],['Prie stalelių',85],['Be baldų',130]],
   equip:['„Samsung" 2,5 mm LED ekranas 5 760 × 3 240 mm, valdymas AVoIP sistema','2 × 65" dubliavimo ekranai','4 kolonėlių garso sistema','2 × „Shure" MXW2/BETA58 mikrofonai','4 × „wash" prožektoriai, DMX valdiklis','Valdomas RGB stogo skliauto apšvietimas','Scena 3 × 10 m (2 × 1 m segmentai, Hexa danga, 60–80 cm aukštis)'],
   photos:[['hall-c-1','Mažoji salė B — juodos sienos ir uždaryta mobili pertvara'],['hall-bc-1','Sujungta B+C konfigūracija — salė atsidaro su scena'],['hall-bc-2','Sujungta B+C konfigūracija — vaizdas link durų']]},

  {id:'skc-d', loc:'zity', name:'Oranžerija + Kiemas', area:'390 + 300 m²', theatre:400, outdoor:true, dir:'skc',
   lead:'Skaidraus tento paviljonas ir žalias kiemas — lauko renginiams iki 550 svečių.',
   layouts:[['Teatro',400],['Vakarienės',220],['Klasės',260],['Kabareto',170],['Prie stalelių',300],['Be baldų',550]],
   equip:['Skaidraus tento paviljonas (apie 10 m pločio)','Lauko elektros įvadai ir kabinimo taškai','Mobilios garso kolonėlės laukui — derinama pagal renginį','Paviljono nuoma ne vasaros sezonu — derinama pagal renginį'],
   photos:[['f-oranz-diena','Paviljonas kieme — 35 m stiklinė pastato dalis prie fabriko korpuso'],['f-oranz-isore','Paviljonas vakare — stiklinė pastato dalis šviečia iš vidaus'],['f-oranz-vidus','Vakarienė paviljone — 385 m² po stikliniu stogu']]},

  {id:'skc-abcd', loc:'zity', name:'Visas centras (buy-out)', combo:'visos salės, holai ir kiemas', area:'2 650 m²', theatre:1000, outdoor:false, dir:'skc',
   lead:'Privatus viso pastato naudojimas: visos salės, holai, restoranas „Gastrolės" ir kiemas — iki 1 000 dalyvių viename renginyje.',
   note:'Holas 1A ir Holas 2A (stovimi priėmimai iki 360 ir 270 svečių) bei restoranas „Gastrolės" (vakarienės iki 190) nuomojami tik kartu su salėmis.',
   layouts:[['Teatro',1000],['Vakarienės',775],['Klasės',725],['Kabareto',585],['Prie stalelių',1000],['Be baldų',1000]],
   equip:['Visa A, BC ir D salių integruota „Samsung" įranga','Bendrosios erdvės, restoranas ir kiemas','Integruoti reklaminiai ekranai rėmėjų aktyvacijoms','Užkulisių kambariai ir grimerinė'],
   photos:[['entrance-1','Pagrindinis įėjimas į konferencijų centrą'],['lobby-2a-1','Antro aukšto holas — registratūra ir TECH:ZITY ekranas'],['lobby-1a-1','Pirmo aukšto holas — laiptai ir poilsio zona'],['courtyard-1','Restoranų kiemas Tech Zity miestelyje']]}
];

/* photos: [failas, matoma antraštė (be pasikartojančio scenarijaus pavadinimo), pilnas alt tekstas]
   2026-10-23 (pastabos-3): scen-gd-* — kliento Google Drive kadrai pagal scenarijus; scen-tp-danske
   perkelta į Koncertus, scen-tp-8 apkirpta simetriškai. Kur vieta nenustatyta — parašas be lokacijos.
   Pirma nuotrauka — didelės raiškos (2026-10-15: techzity.com originalai; scen-tp-danske/koncertas/
   diplomai/grupes — tikri Tech Park renginių kadrai iš techzity.com galerijos).
   Tech Arts kadrai pakeisti tik tikromis Tech Park nuotraukomis: SKC scn-* ir oranžerijos
   failai yra renderiai / dekoravimo pavyzdžiai, o čia žadamos „tikros akimirkos". Kur kadras
   nėra to scenarijaus renginys (tuščia salė), alt aprašo tai, kas matyti, o ne scenarijų. */
const SCEN = [
  {k:'konferencija', label:'Konferencijos', photos:[['scen-gd-konf-1','Pranešimas scenoje · Tech Park','Pranešėja scenoje konferencijoje · Tech Park'],['scen-gd-konf-2','Konferencija · Tech Park','Dalyviai konferencijų salėje · Tech Park'],['scen-gd-konf-3','Pranešimas dideliame ekrane · Samsung KC','Pilna salė klausosi pranešimo, vaizdas dideliame ekrane · Samsung konferencijų centras'],['scen-gd-konf-4','Pilna salė · Samsung KC','Pilna salė dalyvių renginio metu · Samsung konferencijų centras']], size:'m'},
  {k:'hakatonas', label:'Hakatonai ir workation', photos:[['scen-gd-hak-1','Hakatonas · Tech Park','Hakatono komandos dirba prie kompiuterių, ekrane laikmatis · Tech Park'],['scen-gd-hak-2','Darbas grupėse · Tech Park','Darbas grupėmis Didžiojoje konferencijų salėje · Tech Park'],['scen-gd-hak-3','Susitikimai prie stalų · Tech Park','Dalyviai dirba poromis prie stalų · Tech Park'],['scen-gd-hak-4','Workation erdvė · Tech Park','Salė su stalais darbui ir vaizdu į kiemą · Tech Park']], size:'m'},
  {k:'vakarelis', label:'Įmonių vakarėliai', photos:[['scen-gd-vak-1','Vakaro šventė · Tech Park','Įmonės vakarėlis salėje su spalvotu apšvietimu · Tech Park'],['scen-gd-vak-2','Vakarėlis · Samsung KC','Įmonės vakarėlis salėje su LED ekranais · Samsung konferencijų centras'],['scen-gd-vak-3','Svečiai prie dekoracijų · Samsung KC','Svečiai prie šviečiančių stalo dekoracijų · Samsung konferencijų centras'],['scen-gd-vak-4','Terasoje · Tech Park','Svečiai terasoje ir kieme · Tech Park']], size:'l'},
  {k:'koncertas', label:'Koncertai', photos:[['scen-tp-danske','Tech Park','Koncertas salėje, publika prie scenos · Tech Park'],['scen-gd-konc-2','Gyvas pasirodymas · Tech Park','Grupė groja scenoje · Tech Park'],['scen-gd-konc-3','Šokiai prie scenos · Tech Park','Publika šoka prie scenos · Tech Park'],['scen-gd-konc-4','Scena ir apšvietimas · Samsung KC','Scena su šviesų efektais · Samsung konferencijų centras']], size:'l'},
  {k:'lauko', label:'Lauko renginiai', photos:[['scen-gd-lau-1','Po tentu · Tech Park','Vaišės po tentu terasoje · Tech Park'],['scen-gd-lau-2','Maisto furgonai kieme · Tech Park','Renginys kieme su maisto furgonais · Tech Park'],['scen-gd-lau-3','Tentas kieme · Tech Park','Renginys tente kieme · Tech Park'],['scen-gd-lau-4','Kiemas prie paviljono · Tech Park','Dalyviai kieme prie stiklinio paviljono · Tech Park']], size:'l'},
  {k:'isleistuves', label:'Išleistuvės', photos:[['scen-gd-isl-1','Kepurių metimas · Tech Park','Absolventai meta kepures terasoje · Tech Park'],['scen-gd-isl-2','Diplomų įteikimas · Tech Park','Diplomų įteikimo ceremonija kieme · Tech Park'],['scen-gd-isl-3','Po ceremonijos · Tech Park','Absolventai ir svečiai kieme · Tech Park'],['scen-gd-isl-4','Medinė terasa · Tech Park','Medinė terasa prie pastato · Tech Park']], size:'l'},
  {k:'vestuves', label:'Vestuvės', photos:[['scen-gd-ves-1','Šventinė vakarienė · Tech Park','Šventinė vakarienė prie apvalių stalų · Tech Park'],['scen-gd-ves-2','Vakarienė tente · Tech Park','Serviruoti apvalūs stalai tente · Tech Park'],['scen-gd-ves-3','Terasa prie paviljono · Tech Park','Medinė terasa prie stiklinio paviljono · Tech Park'],['scen-gd-ves-4','Šventinis vakaras','Apvalūs stalai su skaidriomis kėdėmis ir šviečiančiais vainikais']], size:'m'},
  {k:'paroda', label:'Parodos ir pristatymai', photos:[['scen-tp-2','Paroda · Tech Park','Paroda koridoriuje prie stendų · Tech Park'],['scen-tp-7','Produkto pristatymas · Tech Park','Produkto pristatymas · Tech Park'],['scen-gd-par-3','Stendai koridoriuje · Tech Park','Partnerių stendai ir vaišių stalas koridoriuje · Tech Park'],['scen-tp-8','Unikalus renginys · Tech Park','Unikalus renginys · Tech Park']], size:'m'}
];

const MAPDATA = {
  park:{
    name:'Tech Park', addr:'Antakalnio g. 17, 10312 Vilnius', color:'var(--park)', ink:'var(--park-ink)',
    url:'https://techzity.com/lokacijos/tech-park/', img:'park', services:['Biurų nuoma','Co-working erdvės','Renginių erdvės','Restoranai'],
    desc:'Startuolių miestelis Sapiegų parke — XIX a. pastatų konversija, menanti Sapiegų rūmų didybę. Konferencijų centras, dvi salės ir didžiosios terasos su kiemais.',
    dist:[['3 min','automobiliu iki Senamiesčio'],['20 min','pėsčiomis iki Katedros'],['Stotelė','L. Sapiegos — artimiausia viešojo transporto stotelė']],
    park:'Iš anksto sutarus suteikiame iki 3 parkavimo vietų vidiniame parkinge. Dalyviams — vieša miesto aikštelė kelios minutės pėsčiomis, žalioje zonoje.',
    maps:'https://www.google.com/maps/dir/?api=1&destination=Antakalnio+g.+17,+Vilnius',
    embed:'https://maps.google.com/maps?q=Antakalnio+g.+17,+Vilnius&hl=lt&z=15&output=embed'
  },
  zity:{
    name:'Tech Zity Vilnius', addr:'Panerių g. 43, 03202 Vilnius', color:'var(--zity)', ink:'var(--zity-ink)',
    url:'https://techzity.com/lokacijos/tech-zity-vilnius/', img:'zity', services:['Biurų nuoma','SAMSUNG konferencijų centras','Renginių erdvės','Restoranai'],
    desc:'Mūsų flagmanas Naujamiestyje — 55 000 m² technologijų miestelis su Samsung konferencijų centru buvusiame 1947 m. „Lelijos" siuvyklos pastate. 8 restoranai, 4 žali kiemai.',
    dist:[['15 min','pėsčiomis iki senamiesčio ir stoties'],['10 min','automobiliu iki oro uosto'],['2 min','iki pietinio aplinkkelio']],
    park:'Samsung konferencijų centrui priklauso 5 parkavimo vietos miestelio teritorijoje. Patogus privažiavimas iš pietinio aplinkkelio — logistika renginio technikai ir dekoracijoms.',
    maps:'https://www.google.com/maps/dir/?api=1&destination=Paneri%C5%B3+g.+43,+Vilnius',
    embed:'https://maps.google.com/maps?q=Paneri%C5%B3+g.+43,+Vilnius&hl=lt&z=15&output=embed'
  }
};

/* Klientų juostos (karuselės): pradiniame — CLIENTS_FEATURED, atsiliepimų puslapyje — CLIENTS grupės.
   Kol logotipo failo nėra, rodomas vardo ženklelis; logotipai — LOGOS (vardas → failas assets/img/logos/). */
const CLIENTS_FEATURED = ['Google','Meta','LTG','Vinted','Wix','Swedbank','Surfshark','Nord Security',
  'Hostinger','Luminor','Ignitis','EY','Go Vilnius','Delfi','Turing College','Havas','Plug&Play','Ermitažas'];

const CLIENTS = {
  verslas:['Google','Meta','LTG','Vinted','Wix','Citus','Reefo','Deeper','Swedbank','JUDU','Surfshark','Nord Security','Verslo Žinios','Delfi','Naresta','Hostinger','Luminor','Capitalica','Gym+','Ermitažas','Turing College','SIRIN','Ignitis','EY'],
  agenturos:['361 Forma','Pirmoji Kava','MVP Sprendimai','Jump Agency','Correctus','Propeller','Rekūrai','Neimai','Estravel','Fabula','Havas','One More','Partizanas','Time2','Seven Live','Agency UP'],
  organizacijos:['APVA','Architektūros Fondas','Plug&Play','Agata','Go Vilnius','Inovacijų Agentūra','Lithuania AI','SCCL','Idialogue','Antakalnio Poliklinika','Lietuvos Junior Achievement','Šauliai']
};
/* 2026-10-15: be logotipo vardai nerodomi visai. Išimti — Civita, Creativa, Eventum, EPP, VVK
   (organizacija neatpažinta arba oficialaus logotipo failo nėra); žr. PASTABOS-2026-10-15.md. */

/* vardas → [logotipo failas assets/img/logos/, pločio ir aukščio santykis, 1 = tik baltas (rodomas siluetu)]. Tik oficialūs failai
   (organizacijų svetainės — šaltiniai PASTABOS-2026-10-15.md). Santykis — optiniam
   dydžiui: kvadratiškas logotipas rodomas aukštesnis, ilgas — žemesnis (site.js clientItem). */
const LOGOS = {
  'Google':['google.svg',3.30],
  'Meta':['meta.svg',4.96],
  'LTG':['ltg.png',2.11],
  'Vinted':['vinted.svg',3.09],
  'Wix':['wix.svg',2.58],
  'Swedbank':['swedbank.svg',4.66],
  'Surfshark':['surfshark.svg',4.28],
  'Nord Security':['nord-security.svg',3.57],
  'Hostinger':['hostinger.svg',5.00],
  'Luminor':['luminor.svg',4.46],
  'Ignitis':['ignitis.svg',3.56],
  'EY':['ey-horizontal-white.svg',2.49,1],
  'Go Vilnius':['go-vilnius.png',7.90],
  'Delfi':['delfi.svg',2.83],
  'Turing College':['turing-college.svg',4.08],
  'Havas':['havas.svg',4.73],
  'Plug&Play':['plug-and-play.svg',5.32],
  'Ermitažas':['ermitazas-no-slogan.png',6.90],
  'Citus':['citus.svg',3.87],
  'Reefo':['reefo.svg',7.25],
  'Deeper':['deeper.svg',4.01],
  'JUDU':['judu.svg',4.40],
  'Verslo Žinios':['verslo-zinios.svg',7.88,1],
  'Naresta':['naresta.svg',5.89],
  'Capitalica':['capitalica.svg',8.18],
  'Gym+':['gym-plius.svg',4.30],
  'SIRIN':['sirin.svg',4.40],
  '361 Forma':['361-forma.svg',2.58],
  'MVP Sprendimai':['mvp-sprendimai.png',2.66],
  'Pirmoji Kava':['pirmoji-kava.png',2.07],
  'Jump Agency':['jump-agency.svg',1.97],
  'Correctus':['correctus.svg',4.18],
  'Propeller':['propeller.svg',5.02,1],
  'Rekūrai':['rekurai.svg',1.69,1],
  'Neimai':['neimai.png',0.96],
  'Estravel':['estravel.png',3.39],
  'Fabula':['fabula.svg',4.26],
  'One More':['one-more-wordmark.png',1.53],
  'Partizanas':['partizanas.png',1.00],
  'Time2':['time2.svg',5.23],
  'Seven Live':['seven-live.svg',1.18],
  'Agency UP':['agency-up.svg',4.48],
  'APVA':['apva.png',5.13],
  'Architektūros Fondas':['architekturos-fondas.svg',3.90],
  'Agata':['agata.png',6.42,1],
  'Inovacijų Agentūra':['inovaciju-agentura.svg',2.40],
  'Lithuania AI':['lithuania-ai.png',4.24],
  'SCCL':['sccl.png',1.72],
  'Idialogue':['idialogue.png',4.57],
  'Antakalnio Poliklinika':['antakalnio-poliklinika.png',1.50],
  'Lietuvos Junior Achievement':['lietuvos-junior-achievement.png',4.29],
  'Šauliai':['sauliu-sajunga.svg',2.01]
};

/* nuotraukų versija URL'e (?v=) — pakelti, kai failas pakeičiamas tuo pačiu vardu (žr. README „Nuotraukos") */
const IMG_V = 6;

/* nuotraukų pločiai atsakingiems variantams (site.js pic()); generuojama — žr. README „Nuotraukos" */
const IMGW = {
  'loc/park':[800,1600,2400],
  'loc/zity':[800,1600,2000],
  'scen/scen-gd-hak-1':[800,1600,2400],
  'scen/scen-gd-hak-2':[800,1600,2048],
  'scen/scen-gd-hak-3':[800,1600,2048],
  'scen/scen-gd-hak-4':[800,1600,2048],
  'scen/scen-gd-isl-1':[800,1600,2400],
  'scen/scen-gd-isl-2':[800,1600,2400],
  'scen/scen-gd-isl-3':[800,1600,2400],
  'scen/scen-gd-isl-4':[800,1600,2400],
  'scen/scen-gd-konc-2':[800,1600,2400],
  'scen/scen-gd-konc-3':[800,1600,2400],
  'scen/scen-gd-konc-4':[800,1600,2048],
  'scen/scen-gd-konf-1':[800,1600,2048],
  'scen/scen-gd-konf-2':[800,1600,2048],
  'scen/scen-gd-konf-3':[800,1600,2048],
  'scen/scen-gd-konf-4':[800,1600,2048],
  'scen/scen-gd-lau-1':[800,1600,2400],
  'scen/scen-gd-lau-2':[800,1600,2400],
  'scen/scen-gd-lau-3':[800,1600,2048],
  'scen/scen-gd-lau-4':[800,1600,2048],
  'scen/scen-gd-par-3':[800,1600,2048],
  'scen/scen-gd-vak-1':[800,1600,2400],
  'scen/scen-gd-vak-2':[800,1600,2048],
  'scen/scen-gd-vak-3':[800,1600,2048],
  'scen/scen-gd-vak-4':[800,1600,2048],
  'scen/scen-gd-ves-1':[800,1600,2400],
  'scen/scen-gd-ves-2':[800,1600,2400],
  'scen/scen-gd-ves-3':[800,1600,2400],
  'scen/scen-gd-ves-4':[800,1600,2390],
  'scen/scen-tp-2':[800,1600,2048],
  'scen/scen-tp-3':[800,1600],
  'scen/scen-tp-4':[800,1600,2400],
  'scen/scen-tp-5':[800,1600,2400],
  'scen/scen-tp-6':[800,1600,2355],
  'scen/scen-tp-7':[800,1600,2400],
  'scen/scen-tp-8':[800,1600,2221],
  'scen/scen-tp-9':[800,1600,2347],
  'scen/scen-tp-danske':[800,1600,2048],
  'scen/scen-tp-diplomai':[800,1600,2400],
  'scen/scen-tp-grupes':[800,1600,2048],
  'scen/scen-tp-koncertas':[800,1600,2400],
  'spaces/tp-didz-0':[800,1600,2400],
  'spaces/tp-didz-1':[800,1600,2400],
  'spaces/tp-didz-2':[800,1600,2400],
  'spaces/tp-didz-3':[800,1600,2400],
  'spaces/tp-didz-4':[800,1600,2400],
  'spaces/tp-didz-5':[800,1600,2400],
  'spaces/tp-didz-6':[800,1600,2400],
  'spaces/tp-didz-9':[800,1600,2048],
  'spaces/tp-kc-1':[800,1600,2400],
  'spaces/tp-kc-2':[800,1600,2400],
  'spaces/tp-kc-3':[800,1600,2400],
  'spaces/tp-kc-4':[800,1600,2400],
  'spaces/tp-kc-5':[800,1600,2400],
  'spaces/tp-kc-6':[800,1600,2400],
  'spaces/tp-kc-7':[800,1600,2400],
  'spaces/tp-kc-8':[800,1600,2400],
  'spaces/tp-maz-1':[800,1600,2400],
  'spaces/tp-maz-2':[800,1600,2400],
  'spaces/tp-maz-3':[800,1600,2400],
  'spaces/tp-maz-4':[800,1600,2400],
  'spaces/tp-maz-5':[800,1600,2400],
  'spaces/tp-maz-6':[800,1600,2400],
  'spaces/tp-maz-7':[800,1600,2400],
  'spaces/tp-maz-8':[800,1600,2400],
  'spaces/tp-mterasa-1':[800,1600,2400],
  'spaces/tp-mterasa-2':[800,1600,2400],
  'spaces/tp-mterasa-3':[800,1600,2400],
  'spaces/tp-mterasa-4':[800,1600,2400],
  'spaces/tp-mterasa-5':[800,1600,2400],
  'spaces/tp-mterasa-6':[800,1600,2048],
  'spaces/tp-terasa-1':[800,1600,2400],
  'spaces/tp-terasa-2':[800,1600,2400],
  'spaces/tp-terasa-3':[800,1600,2400],
  'spaces/tp-terasa-4':[800,1600,2400],
  'spaces/tp-terasa-5':[800,1600,2400],
  'spaces/tp-terasa-6':[800,1600,2048],
  'spaces/tp-terasa-7':[800,1600,2400],
  'spaces/tz-kc':[800,1600,2400],
  'skc/campus-3d':[800,1600,2048],
  'skc/courtyard-1':[800,1600,2048],
  'skc/entrance-1':[800,1600,2400],
  'skc/f-oranz-diena':[800,1600,2400],
  'skc/f-oranz-isore':[800,1600,2400],
  'skc/f-oranz-vidus':[800,1600,2400],
  'skc/hall-a-1':[800,1600,2400],
  'skc/hall-a-2':[800,1600],
  'skc/hall-b-1':[800,1600,2400],
  'skc/hall-bc-1':[800,1600],
  'skc/hall-bc-2':[800,1600,2400],
  'skc/hall-c-1':[800,1600,2400],
  'skc/lobby-1a-1':[800,1600,2400],
  'skc/lobby-2a-1':[800,1600,2400],
  'skc/lobby-2a-2':[800,1600,2048],
  'skc/scn-gala':[800,1392],
  'skc/scn-konferencija':[800,1392],
  'skc/scn-paroda':[800,1392],
  'skc/scn-vakarelis':[800,1392]
};
