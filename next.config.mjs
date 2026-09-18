/** @type {import('next').NextConfig} */
const nextConfig = {
  // Deployed via @opennextjs/cloudflare. `standalone` output is required so
  // that the `postbuild` step (`opennextjs-cloudflare build --skipNextBuild`)
  // can bundle the already-built `.next/standalone` directory without
  // re-invoking `next build` itself (which would recurse through `npm run
  // build` -> `postbuild` -> ... forever).
  output: "standalone",
};

export default nextConfig;
