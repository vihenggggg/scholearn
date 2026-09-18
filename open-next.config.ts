// open-next.config.ts for @opennextjs/cloudflare.
// No incremental cache override: every route in this app is fully static
// (no ISR, no dynamic server functions), so the default in-memory cache is enough.
import { defineCloudflareConfig } from "@opennextjs/cloudflare";

export default defineCloudflareConfig();
