import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// base "./" es obligatorio para itch.io: los ficheros se sirven desde una ruta relativa.
export default defineConfig({ plugins: [react()], base: "./" });
