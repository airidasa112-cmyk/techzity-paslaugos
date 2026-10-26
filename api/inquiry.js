// Vercel serverless funkcija — renginio užklausos forma (uzklausa.html).
// Kliento pastaba 2026-10-23: „visos užklausos turi ateiti į events@techzity.com".
// Laišką siunčia per Resend (https://resend.com). Aplinkos kintamieji (Vercel → Settings → Environment Variables):
//   RESEND_API_KEY  — Resend API raktas (tik serveryje, niekada kode ar naršyklėje)
//   CONTACT_TO      — gavėjas (numatytasis events@techzity.com)
//   CONTACT_FROM    — patvirtintas siuntėjas, pvz. „Tech Zity svetainė <forma@techzity.com>"
// Be RESEND_API_KEY funkcija grąžina klaidą (fail closed) — naršyklė parodo el. pašto / telefono alternatyvą.
// Pagal samsungkc.lt api/contact.js (honeypot `hp`, laiko patikra `elapsed`).

const T = {
  method: "Naudokite POST.",
  required: "Įveskite vardą, el. paštą ir dalyvių skaičių.",
  invalid: "Patikrinkite įvestus duomenis.",
  notReady: "Forma kol kas nesukonfigūruota. Parašykite events@techzity.com arba paskambinkite +370 671 86 572.",
  sendFail: "Nepavyko išsiųsti. Parašykite events@techzity.com arba paskambinkite +370 671 86 572.",
  limit: "Per daug užklausų. Pabandykite vėliau arba parašykite events@techzity.com.",
  tooFast: "Forma pateikta per greitai. Palaukite kelias sekundes ir bandykite dar kartą."
};

// laukų ilgio ribos — ilgesnė įvestis atmetama, ne trumpinama
const MAX = { name: 120, org: 160, email: 200, phone: 40, date: 20, guests: 6, space: 160, message: 4000 };

const esc = (s) => String(s).replace(/[<>&"']/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", '"': "&quot;", "'": "&#39;" }[c]));
const oneLine = (s) => String(s).replace(/[\r\n\t]+/g, " ");

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

  if (!f.name || !f.email || !f.guests || body.consent !== true) {
    return res.status(400).json({ ok: false, error: T.required });
  }
  const tooLong = Object.keys(MAX).some((k) => f[k].length > MAX[k]);
  const badMail = !/^[^\s@<>"]+@[^\s@<>"]+\.[^\s@<>"]+$/.test(f.email);
  const badGuests = !/^\d{1,6}$/.test(f.guests) || Number(f.guests) < 1;
  const badDate = f.date && !/^\d{4}-\d{2}-\d{2}$/.test(f.date);
  if (tooLong || badMail || badGuests || badDate) {
    return res.status(400).json({ ok: false, error: T.invalid });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO || "events@techzity.com";
  const from = process.env.CONTACT_FROM || "Tech Zity svetainė <onboarding@resend.dev>";
  if (!apiKey) {
    console.error("inquiry: RESEND_API_KEY nenustatytas");
    return res.status(503).json({ ok: false, error: T.notReady });
  }

  const row = (label, v) => (v ? `<p><strong>${label}:</strong> ${esc(v)}</p>` : "");
  const html =
    `<h2>Nauja renginio užklausa iš svetainės</h2>` +
    row("Vardas", f.name) +
    row("Įmonė", f.org) +
    row("El. paštas", f.email) +
    row("Telefonas", f.phone) +
    row("Renginio data", f.date) +
    row("Dalyvių skaičius", f.guests) +
    row("Dominanti erdvė", f.space || "Konsultacija / patarimas") +
    (f.message ? `<p><strong>Žinutė:</strong><br>${esc(f.message).replace(/\n/g, "<br>")}</p>` : "") +
    `<p style="color:#666">Sutikimas su privatumo politika pažymėtas.</p>`;

  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 8000);
  try {
    const r = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: f.email,
        subject: oneLine(`Renginio užklausa — ${f.name}${f.org ? ", " + f.org : ""} (${f.guests} dalyv.)`),
        html
      }),
      signal: ctrl.signal
    });
    if (!r.ok) {
      console.error("inquiry: Resend klaida", r.status);
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
