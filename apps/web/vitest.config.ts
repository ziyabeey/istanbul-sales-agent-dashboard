import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@': resolve(__dirname, './src'),
        },
    },
    test: {
        environment: 'node',
        globals: true,
        include: ['**/__tests__/**/*.test.ts', '**/__tests__/**/*.test.tsx'],
        coverage: {
            reporter: ['text', 'lcov'],
            include: ['src/lib/**', 'src/utils/**'],
        },
    },
})
