/** @type {import('next').NextConfig} */
const nextConfig = {
  // Fully static app (no API routes/server rendering) — export plain HTML/CSS/JS
  // so it can be served directly from Cloudflare Pages with no adapter.
  output: "export",
};

export default nextConfig;
