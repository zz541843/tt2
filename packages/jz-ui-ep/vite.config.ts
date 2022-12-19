import {fileURLToPath, URL} from 'url'

import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import AutoImport from 'unplugin-auto-import/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import IconsResolver from 'unplugin-icons/resolver'
import Icons from 'unplugin-icons/vite'
import Inspect from 'vite-plugin-inspect'

import ElementPlus from 'unplugin-element-plus/vite'

// import OptimizationPersist from 'vite-plugin-optimize-persist'
// import PkgConfig from 'vite-plugin-package-config'
import { visualizer } from 'rollup-plugin-visualizer';
import path from "path";
import VueSetupExtend from 'vite-plugin-vue-setup-extend'
import dts from 'vite-plugin-dts'
const outDir = "./dist"
// https://vitejs.dev/config/
export default defineConfig({
    build:{
        outDir: path.resolve(__dirname,outDir),
        // assetsDir: path.resolve(__dirname,outDir,"assets"),
        lib: {
            entry: path.resolve(__dirname, './src/index.ts'),
            name: 'jz-ui',
            fileName: (format:any) => {
                if(format==="es"){
                    return "index.js"
                }else{
                    return `index.${format}.js`
                }
            },
            formats: ['es','umd' ]
        },
        rollupOptions:{
            external: ['vue',"pinyin-pro","element-plus","axios"],
            output:{
                // manualChunks(id) {
                //     if (id.includes('src/jz-ui/components/Jz')) { // 把 components 文件里面的文件都打包到 components.js 中
                //         return 'all-components'
                //     }
                // },
                // inlineDynamicImports: false
            }
            // output: {
            //     chunkFileNames: 'static/js/[name]-[hash].js',
            //     entryFileNames: 'static/js/[name]-[hash].js',
            //     assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
            // }
            /*output: {
                // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
                globals: {
                    vue: 'Vue'
                },
                 inlineDynamicImports: true,
                // sourcemap: true,
                /!*entryFileNames: function (a) {
                    let curName = path.basename(a.facadeModuleId!)
                    if (curName === "index.ts") {
                        let prePath = path.resolve(a.facadeModuleId as string,"..")
                        if (path.basename(prePath) === "src"){
                            if( path.basename(path.resolve(prePath, "..","..")) === "components"){
                                return path.basename(path.resolve(prePath, "..")) +".js"
                            }
                        }
                    }
                    return "[name].js"
                }*!/
            }*/
        },
    },
    plugins: [
        // dts(),
        VueSetupExtend(),
        visualizer(),
        // PkgConfig(),
        // OptimizationPersist(),
        vue({reactivityTransform: true}),
        vueJsx(),
        AutoImport({
            include: [
                /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
                /\.vue$/, /\.vue\?vue/, // .vue
                /\.md$/, // .md
            ],
            imports: ['vue', 'vue/macros','@vueuse/core'],
            dts: './auto-imports.d.ts',
            resolvers: [
                ElementPlusResolver(),
                // 自动导入图标组件
                IconsResolver({
                    prefix: 'abc',
                    enabledCollections: ['ep','mdi'],
                }),
            ],
        }),
        Components({
            resolvers: [
                // 自动注册图标组件
                IconsResolver({
                    prefix: 'abc',
                    enabledCollections: ['ep','mdi'],
                }),
                // 自动导入 Element Plus 组件
                ElementPlusResolver({

                }),
            ],
            dirs: ["./src/components"],
            dts: './components.d.ts',
        }),
        ElementPlus({
            // importStyle: 'sass',
            // useSource: true,
        }),
        Icons({
            autoInstall: true,
        }),
        Inspect(),
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },
    server: {
        cors: true, // 默认启用并允许任何源
        open: false, // 在服务器启动时自动在浏览器中打开应用程序
        port: 3000,
        //反向代理配置，注意rewrite写法，开始没看文档在这里踩了坑
        proxy: {
            // '^/api': {
            //     target: 'https://jsonplaceholder.typicode.com/',
            //     changeOrigin: true,
            //     rewrite: (path) => path.replace(/^\/api/, '')
            // }
            // '/api': {
            //     target: 'www.baidu.com',   //代理接口
            //     changeOrigin: true,
            // }
            // "/api": "http://www.baidu.com/"
        }
    },
    // css: {
    //     //css预处理
    //     preprocessorOptions: {
    //         scss: {
    //             /*
    //             引入var.scss全局预定义变量，
    //             如果引入多个文件，
    //             可以使用
    //             '@import "@/assets/scss/globalVariable1.scss";@import "@/assets/scss/globalVariable2.scss";'
    //             这种格式
    //              */
    //             // additionalData: '@import "@/assets/scss/globalVariable.scss";'
    //         }
    //     }
    // }
})
