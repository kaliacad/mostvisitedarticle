import { defineConfig } from 'vite'; // Assurez-vous d'importer defineConfig
import react from '@vitejs/plugin-react';
import tailwindcss from 'tailwindcss'; // Importer tailwindcss si vous l'utilisez

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    css: {
        postcss: {
            plugins: [tailwindcss()],
        },
    },
});
