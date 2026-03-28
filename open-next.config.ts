import { defineCloudflareConfig } from "@opennextjs/cloudflare";

// SnapLayout does not use ISR or on-demand revalidation, so the Cloudflare
// adapter can stay stateless and avoid self-referencing service bindings.
export default defineCloudflareConfig();
