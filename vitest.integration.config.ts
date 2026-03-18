// vitest.integration.config.ts — Integration tests (Firebase Emulator)

import { defineConfig } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    globals: true,
    include: ['test/integration/**/*.{test,spec}.ts'],
    testTimeout: 30000,
    hookTimeout: 30000,
  },
})
