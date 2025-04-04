import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import * as path from 'node:path';
// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
        },
    },
    css: {
        modules: {
            localsConvention: 'camelCase',
            generateScopedName: '[path][name]__[local]--[hash:base64:5]',
        },
    },
    base: '/news_test/',
});
