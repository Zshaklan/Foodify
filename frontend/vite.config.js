import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://foodify-backend-two.vercel.app
// http://localhost:5000

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // server: {
  //   proxy: {
  //     "/api": "https://foodify-backend-two.vercel.app",
  //   },
  // },
  build: {
    outDir: "dist",
    rollupOptions: {
      external: ["mongoose", "express", "bcryptjs", "jsonwebtoken"],
    },
  },
});
