import { defineConfig } from '@ripple/cli'

export default defineConfig({
  mode: 'spa',
  plugins: [],
  css: {
    framework: 'tailwind',
    config: {
      theme: {
        extend: {
          fontFamily: {
            display: ['Inter', 'system-ui', 'sans-serif']
          }
        }
      }
    }
  }
})
