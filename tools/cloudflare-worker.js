// Cloudflare Worker – techzity.com/paslaugos/renginiu-erdves/* rodo mūsų puslapį iš Vercel.
// Maršrutas (Workers Routes): techzity.com/paslaugos/renginiu-erdves*
// WP puslapis tuo adresu neištrinamas – pašalinus maršrutą vėl rodomas WP.
// Kreipiasi tik į fiksuotą ORIGIN (ne į vartotojo nurodytą adresą).

const PREFIX = "/paslaugos/renginiu-erdves";
const ORIGIN = "https://techzity-demo.vercel.app";
const PASS = ["accept", "accept-language", "content-type", "origin", "user-agent", "if-none-match", "if-modified-since", "range"];

export default {
  async fetch(request) {
    const url = new URL(request.url);
    if (url.pathname === PREFIX || url.pathname === PREFIX + "/index.html") {
      return Response.redirect(url.origin + PREFIX + "/" + url.search, 301);
    }
    if (!url.pathname.startsWith(PREFIX + "/")) return fetch(request);

    const rest = url.pathname.slice(PREFIX.length);
    const isApi = rest === "/api/inquiry";
    const m = request.method;
    if (!(m === "GET" || m === "HEAD" || (isApi && m === "POST"))) {
      return new Response("Method Not Allowed", { status: 405, headers: { Allow: isApi ? "POST" : "GET, HEAD" } });
    }
    if (isApi && Number(request.headers.get("content-length") || 0) > 20000) {
      return new Response("Payload Too Large", { status: 413 });
    }

    const headers = new Headers();
    for (const k of PASS) { const v = request.headers.get(k); if (v) headers.set(k, v); }
    headers.set("cf-connecting-ip", request.headers.get("cf-connecting-ip") || "");

    const upstream = await fetch(ORIGIN + rest + url.search, {
      method: m,
      headers,
      body: m === "POST" ? request.body : undefined,
      redirect: "manual"
    });

    const out = new Headers(upstream.headers);
    out.delete("x-robots-tag");
    out.delete("x-vercel-id");
    out.delete("x-vercel-cache");
    out.delete("server");
    const loc = out.get("location");
    if (loc && loc.startsWith(ORIGIN)) out.set("location", url.origin + PREFIX + loc.slice(ORIGIN.length));
    else if (loc && loc.startsWith("/")) out.set("location", PREFIX + loc);
    return new Response(upstream.body, { status: upstream.status, statusText: upstream.statusText, headers: out });
  }
};
