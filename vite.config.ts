import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const config = {
    plugins: [
      react(),
      dts({
        insertTypesEntry: true,
      }),
    ],
  }

  if (mode === 'demo') {
    return {
      ...config,
      root: 'examples',
    }
  }

  if (command === 'build') {
    return {
      ...config,
      build: {
        lib: {
          entry: resolve(__dirname, 'src/index.ts'),
          name: 'ReactMarquee',
          formats: ['es', 'umd'],
          fileName: (format) => `react-marquee.${format}.js`,
        },
        rollupOptions: {
          external: ['react', 'react-dom'],
          output: {
            globals: {
              react: 'React',
              'react-dom': 'ReactDOM',
            },
          },
        },
      },
    }
  }

  return config
})
