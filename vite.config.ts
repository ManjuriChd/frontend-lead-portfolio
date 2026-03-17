import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  // Moved Vitest config to 'test' field for defineConfig's second argument, not root.
  // Remove from here. Instead, create a vitest.config.ts with:
  //
  // import { defineConfig } from 'vitest/config';
  // export default defineConfig({
  //   test: {
  //     environment: 'jsdom',
  //     globals: true,
  //     include: ['src/**/*.spec.ts']
  //   }
  // });
});

