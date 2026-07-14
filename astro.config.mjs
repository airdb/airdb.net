import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://airdb.net",
  output: "static",
  publicDir: "static",
  integrations: [sitemap()],
});
