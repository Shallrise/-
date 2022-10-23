import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Icons from 'unplugin-icons/vite'
import  IconsResolver  from 'unplugin-icons/resolver'
import Components from 'unplugin-vue-components/vite'


export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers:[
        IconsResolver({
          prefix:'Icon'
        })
      ]
    }),
    Components({
      resolvers:[
        IconsResolver({
          enabledCollections:['ep']
        })
      ]
    }),
    Icons({
      autoInstall:true
    })
  ],
  server: {
    proxy: {
      '/api': {
        target: 'http://106.52.150.170:8001/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '') // 不可以省略rewrite
      }
    }
  }
})


