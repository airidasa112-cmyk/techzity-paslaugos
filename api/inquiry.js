// Vercel serverless funkcija — renginio užklausos forma (uzklausa.html).
// Užklausa keliauja į tą pačią HubSpot formą, kurią naudojo senas WordPress puslapis
// „Domina mūsų renginių erdvės?“ (portalas 20121518, forma 9aa7a350-…): kontaktai patenka į kliento
// HubSpot CRM, pranešimus siunčia HubSpot pagal formos nustatymus. Raktų nereikia — formos ID vieši.
// Pagal samsungkc.lt api/contact.js (honeypot `hp`, laiko patikra `elapsed`).

const T = {
  method: "Naudokite POST.",
  required: "Įveskite vardą, el. paštą, telefoną ir dalyvių skaičių.",
  invalid: "Patikrinkite įvestus duomenis.",
  sendFail: "Nepavyko išsiųsti. Parašykite events@techzity.com arba paskambinkite +370 671 86 572.",
  limit: "Per daug užklausų. Pabandykite vėliau arba parašykite events@techzity.com.",
  tooFast: "Forma pateikta per greitai. Palaukite kelias sekundes ir bandykite dar kartą."
};

// laukų ilgio ribos — ilgesnė įvestis atmetama, ne trumpinama
const MAX = { name: 120, org: 160, email: 200, phone: 40, date: 20, guests: 6, space: 160, message: 4000 };


// Sena HubSpot forma (techzity.com/paslaugos/renginiu-erdves/, iki 2026-10-26)
const HS_URL = "https://api.hsforms.com/submissions/v3/integration/submit/20121518/9aa7a350-eaa9-4381-877c-addc562322bc";
// HubSpot laukas venue_interest priima tik šias reikšmes; Tech Zity Vilnius salės jame nėra — jos lieka žinutėje
const venue = (space) => {
  if (!space) return "Domina konsultacija dėl erdvės";
  if (space.startsWith("Tech Park")) return "Tech Park";
  return "";
};

// Leidžiami puslapiai, iš kurių priimama forma (naršyklė POST užklausoje visada siunčia Origin)
const ORIGINS = ["https://techzity.com", "https://techzity-demo.vercel.app"];

// Užklausų riba: iki 5 per 10 min. iš vieno IP ir iki 40 per valandą iš viso.
// Atmintis vienos funkcijos instancijos (best effort); papildomai riboja Cloudflare taisyklė.
const hits = new Map();
let total = [];
const limited = (ip) => {
  const now = Date.now();
  total = total.filter((t) => now - t < 3600000);
  const mine = (hits.get(ip) || []).filter((t) => now - t < 600000);
  if (mine.length >= 5 || total.length >= 40) return true;
  mine.push(now); total.push(now); hits.set(ip, mine);
  if (hits.size > 5000) hits.clear();
  return false;
};

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, error: T.method });
  }

  if (!ORIGINS.includes(req.headers.origin)) {
    return res.status(403).json({ ok: false, error: T.invalid });
  }
  const ip = String(req.headers["cf-connecting-ip"] || req.headers["x-real-ip"] || "").slice(0, 64);
  if (limited(ip)) {
    console.warn("inquiry: rate limit");
    return res.status(429).json({ ok: false, error: T.limit });
  }

  let body = req.body;
  if (typeof body === "string") { try { body = JSON.parse(body || "{}"); } catch (e) { body = {}; } }
  if (!body || typeof body !== "object") body = {};

  // Honeypot — botams tyli „sėkmė" be siuntimo; suveikimas registruojamas be asmens duomenų
  if (body.hp) { console.warn("inquiry: honeypot"); return res.status(200).json({ ok: true }); }
  // Per greitas pateikimas — tikra, pakartojama klaida (ne netikra sėkmė)
  const elapsed = parseInt(body.elapsed, 10);
  if (!Number.isFinite(elapsed) || elapsed < 3000) {
    console.warn("inquiry: too fast", { elapsed });
    return res.status(429).json({ ok: false, error: T.tooFast });
  }

  const f = {};
  for (const k of Object.keys(MAX)) f[k] = String(body[k] == null ? "" : body[k]).trim();

  if (!f.name || !f.email || !f.phone || !f.guests || body.consent !== true) {
    return res.status(400).json({ ok: false, error: T.required });
  }
  const tooLong = Object.keys(MAX).some((k) => f[k].length > MAX[k]);
  const badMail = !/^[^\s@<>"]+@[^\s@<>"]+\.[^\s@<>"]+$/.test(f.email);
  const badGuests = !/^\d{1,6}$/.test(f.guests) || Number(f.guests) < 1;
  const badDate = f.date && !/^\d{4}-\d{2}-\d{2}$/.test(f.date);
  const badPhone = !/^[+\d][\d\s()-]{4,39}$/.test(f.phone);
  if (tooLong || badMail || badGuests || badDate || badPhone) {
    return res.status(400).json({ ok: false, error: T.invalid });
  }

  // Data ir tiksli erdvė — žinutėje, nes senoje formoje tokių laukų nėra
  const extra = [
    f.date && `Renginio data: ${f.date}`,
    `Dominanti erdvė: ${f.space || "Konsultacija / patarimas"}`,
    "Sutikimas su privatumo politika pažymėtas."
  ].filter(Boolean).join("\n");
  const fields = [
    ["firstname", f.name],
    ["company", f.org],
    ["email", f.email],
    ["phone", f.phone],
    ["venue_interest", venue(f.space)],
    ["number_of_participants", f.guests],
    ["message", (f.message ? f.message + "\n\n" : "") + extra]
  ].filter(([, v]) => v).map(([name, value]) => ({ objectTypeId: "0-1", name, value }));

  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 8000);
  try {
    const r = await fetch(HS_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fields,
        context: {
          pageUri: "https://techzity.com/paslaugos/renginiu-erdves/uzklausa.html",
          pageName: "Renginio užklausa | Tech Zity Events"
        }
      }),
      signal: ctrl.signal
    });
    if (!r.ok) {
      // tik klaidų tipai, be įvestų duomenų
      const j = await r.json().catch(() => ({}));
      console.error("inquiry: HubSpot klaida", r.status, (j.errors || []).map((e) => e.errorType).join(","));
      return res.status(502).json({ ok: false, error: T.sendFail });
    }
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("inquiry: siuntimo klaida", err && err.name);
    return res.status(502).json({ ok: false, error: T.sendFail });
  } finally {
    clearTimeout(timer);
  }
};
