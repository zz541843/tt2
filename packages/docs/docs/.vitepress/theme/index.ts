import Layout from './Layout.vue'
import DefaultTheme from 'vitepress/theme'

// 主题样式
import 'vitepress-theme-demoblock/theme/styles/index.css'
// 插件的组件，主要是demo组件
import Demo from 'vitepress-theme-demoblock/components/Demo.vue'
import DemoBlock from 'vitepress-theme-demoblock/components/DemoBlock.vue'

import JzUI from "jz-ui-ep"
import "jz-ui-ep/dist/style.css"
export default {
    // root component to wrap each page
    ...DefaultTheme,
    // this is a Vue 3 functional component
    NotFound: () => 'custom 404',
    enhanceApp({ app, router, siteData }:any) {
        // app is the Vue 3 app instance from `createApp()`.
        // router is VitePress' custom router. `siteData` is
        // a `ref` of current site-level metadata.


        app.component('Demo', Demo)
        app.use(JzUI)
    }
}
