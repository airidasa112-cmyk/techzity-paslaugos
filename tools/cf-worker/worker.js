// Cloudflare Worker – techzity.com/paslaugos/renginiu-erdves/* rodo statinį renginių puslapį
// iš šio Worker'io failų (kliento Cloudflare paskyra; Vercel nebenaudojamas).
// Maršrutas (Workers Routes): techzity.com/paslaugos/renginiu-erdves*
// WP puslapis tuo adresu neištrinamas – pašalinus maršrutą vėl rodomas WP.
// Failai: public/paslaugos/renginiu-erdves/ (surenka ./build.sh). Forma siunčia tiesiai į HubSpot.

const PREFIX = "/paslaugos/renginiu-erdves";

const SECURITY = {
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "X-Frame-Options": "SAMEORIGIN",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
  "Content-Security-Policy": "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; media-src 'self'; connect-src 'self' https://api.hsforms.com; frame-src https://my.matterport.com https://maps.google.com https://www.google.com; form-action 'self'; base-uri 'self'; object-src 'none'; frame-ancestors 'self'; upgrade-insecure-requests"
};

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === PREFIX || url.pathname === PREFIX + "/index.html") {
      return Response.redirect(url.origin + PREFIX + "/" + url.search, 301);
    }
    if (!url.pathname.startsWith(PREFIX + "/")) return fetch(request);

    const m = request.method;
    if (m !== "GET" && m !== "HEAD") {
      return new Response("Method Not Allowed", { status: 405, headers: { Allow: "GET, HEAD" } });
    }

    const path = url.pathname.endsWith("/") ? url.pathname + "index.html" : url.pathname;
    const asset = await env.ASSETS.fetch(new Request(url.origin + path, { method: m, headers: request.headers }));

    const out = new Headers(asset.headers);
    for (const [k, v] of Object.entries(SECURITY)) out.set(k, v);
    const type = out.get("content-type") || "";
    // CSS/JS versijuojami ?v=, nuotraukos ir video — ne, todėl savaitė; HTML — visada tikrinamas
    out.set("Cache-Control", asset.status !== 200 ? "no-store" : type.startsWith("text/html") ? "no-cache" : "public, max-age=604800");
    if (asset.status === 404) {
      return new Response("Puslapis nerastas", { status: 404, headers: { ...SECURITY, "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store" } });
    }
    // Safari / iPhone video groja tik su dalinėmis užklausomis (206) — failų sistema jų neduoda, todėl pjaunam patys
    const range = request.headers.get("range");
    const rm = asset.status === 200 && range && /^bytes=(\d*)-(\d*)$/.exec(range.trim());
    if (rm && (rm[1] || rm[2])) {
      const buf = await asset.arrayBuffer();
      const size = buf.byteLength;
      let start = rm[1] ? Number(rm[1]) : Math.max(0, size - Number(rm[2]));
      let end = rm[1] && rm[2] ? Math.min(Number(rm[2]), size - 1) : size - 1;
      if (start >= size || start > end) {
        return new Response(null, { status: 416, headers: { ...SECURITY, "Content-Range": `bytes */${size}` } });
      }
      out.set("Content-Range", `bytes ${start}-${end}/${size}`);
      out.set("Content-Length", String(end - start + 1));
      out.set("Accept-Ranges", "bytes");
      return new Response(m === "HEAD" ? null : buf.slice(start, end + 1), { status: 206, headers: out });
    }
    out.set("Accept-Ranges", "bytes");
    return new Response(asset.body, { status: asset.status, statusText: asset.statusText, headers: out });
  }
};
