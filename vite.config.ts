
import { defineConfig } from 'vite';

export default defineConfig({
    // Repo name
    base: '/rest-countries-api/',
    build: {
        rollupOptions: {
        input: {
            main: 'index.html',
            detail: 'detail.html',
        },
        },
    },
});