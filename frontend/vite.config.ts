import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// If deploying to https://<user>.github.io/<repo>/ (no custom domain),
// set BASE_PATH=/<repo>/ as an env var during build. With a custom
// domain (e.g. otakupulse.com) + CNAME file, leave it as "/".
export default defineConfig({
  plugins: [react()],
  base: process.env.BASE_PATH || "/",
  build: {
    outDir: "dist",
    sourcemap: false,
  },
});
