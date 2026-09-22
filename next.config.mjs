// Fairly strict but not nonce-based: Next.js's own hydration bootstrap
// script is inline, and this app uses plenty of inline `style={{}}`
// (especially the PDF booklet), so script-src/style-src keep 'unsafe-inline'
// rather than risk breaking rendering with a blind nonce setup. Everything
// else (remote scripts, framing, objects, cross-origin connects) is locked
// to 'self' — the app never loads or calls out to any third-party origin.
const CSP = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data:",
  "font-src 'self' data:",
  "connect-src 'self'",
  "object-src 'none'",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
].join("; ");

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Deployed via @opennextjs/cloudflare. `standalone` output is required so
  // that the `postbuild` step (`opennextjs-cloudflare build --skipNextBuild`)
  // can bundle the already-built `.next/standalone` directory without
  // re-invoking `next build` itself (which would recurse through `npm run
  // build` -> `postbuild` -> ... forever).
  output: "standalone",

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          { key: "Content-Security-Policy", value: CSP },
        ],
      },
    ];
  },
};

export default nextConfig;

// Makes `getCloudflareContext()` (used by app/api/submit-result) resolve
// bindings/vars from .dev.vars when running the plain `next dev` server,
// not just under `wrangler dev`.
import("@opennextjs/cloudflare").then((m) => m.initOpenNextCloudflareForDev());
