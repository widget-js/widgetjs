import {resolve} from 'path'
import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from "vite-plugin-dts";
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { viteStaticCopy } from 'vite-plugin-static-copy'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export default defineConfig({
    plugins: [
        dts(), vue(),
        AutoImport({
            resolvers: [ElementPlusResolver()],
        }),
        Components({
            resolvers: [ElementPlusResolver()],
        }),
        viteStaticCopy({
            targets: [
                {
                    src: './mingcute_icon/',
                    dest: './'
                }
            ]
        })
    ],
    resolve: {
        alias: {
            '@': resolve(__dirname, './src'),
            'vue': resolve(__dirname, './node_modules/vue')
        },
    },
    optimizeDeps: {
        include: ['@widget-js/core'],
    },
    build: {
        commonjsOptions: { include: [/@widget-js\/core/, /node_modules/] },
        outDir: 'dist',
        lib: {
            entry: resolve(__dirname, './src/index.ts'),
            name: '@widget-js/vue3',
            fileName: (format) => `vue3.${format}.js`,
        },
        rollupOptions: {
            // 确保外部化处理那些你不想打包进库的依赖
            external: ['vue'],
            output: {
                // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
                globals: {
                    vue: 'Vue'
                }
            }
        }
    }
})

