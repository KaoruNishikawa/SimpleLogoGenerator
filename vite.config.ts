import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";


export default defineConfig(async () => ({
    plugins: [react()],
    base: "./",

    clearScreen: false,
    server: {
        port: 1421,
        strictPort: true,
    },
    envPrefix: ["VITE_"]
}));
