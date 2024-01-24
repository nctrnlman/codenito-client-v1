import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: "192.168.0.249",
    port: 8000,
  },
  plugins: [react()],
});
