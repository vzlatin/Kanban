import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import fs from "fs";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    https: {
      key: fs.readFileSync("./localhost.key"),
      cert: fs.readFileSync("./localhost.crt"),
    },
    port: 5173,
    host: "127.0.0.1",
    //proxy: {
    //  "/api": {
    //    target: "https://127.0.0.1:5000",
    //    changeOrigin: true,
    //    secure: false, // Allow self-signed certs
    //    rewrite: (path) => path.replace(/^\/api/, ""),
    //  },
    //},
  },
});
