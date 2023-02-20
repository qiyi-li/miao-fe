import {defineConfig} from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import Components from 'unplugin-vue-components/vite';
import {VantResolver} from 'unplugin-vue-components/resolvers';
// @ts-nocheck
import {svgstore} from './src/vite_plugins/svgstore';

// https://vitejs.dev/config/
const defaultConfig = {
  plugins: [
    vue(),
    vueJsx({
      transformOn: true,
      mergeProps: true,
    }),
    Components({
      resolvers: [VantResolver()],
    }),
    svgstore(),
  ],
}

export default defineConfig(({ command, mode }) => {
  if (command === 'serve') {
    const isDev = mode === 'development'

    return {
      ...defaultConfig,
      server: {
        proxy: {
          '/api/v1': {
            target: 'http://121.196.236.94:3000/'
          }
        }
      }
    }
  } else {
    return defaultConfig
  }
})
