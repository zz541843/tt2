export default {
    title: 'VitePress12',
    description: "asdfasdf",
    markdown: {
        lineNumbers: true,
        config: (md:any) => {
            // 添加DemoBlock插槽
            const { demoBlockPlugin } = require('vitepress-theme-demoblock')
            md.use(demoBlockPlugin)
        }
    },
    themeConfig: {
        nav: [
            {
                text: 'Guide',
                link: '/guide'
            },
            {
                text: 'Configs',
                link: '/configs'
            },
            {
                text: 'Changelog',
                link: 'https://github.com/...'
            },
            {
                text: 'Dropdown Menu',
                items: [
                    {text: 'Item A', link: '/item-1'},
                    {text: 'Item B', link: '/item-2'},
                    {text: 'Item C', link: '/item-3'}
                ]
            }
        ],
        sidebar: {
            '/guide/': [
                {
                    text: 'Guide',
                    collapsible: true,
                    // collapsed: true,
                    items: [
                        // This shows `/guide/index.md` page.
                        { text: "JzForm 表单", link: "/guide/JzForm"},
                        { text: "JzTopSearch 筛选项", link: "/guide/JzTopSearch/JzTopSearch"},
                    ]
                }
            ],
            // This sidebar gets displayed when user is
            // under `config` directory.
            '/config/': [
                {
                    text: 'Config',
                    items: [
                        // This shows `/config/index.md` page.
                        { text: 'Index', link: '/config/' }, // /config/index.md
                        { text: 'Three', link: '/config/three' }, // /config/three.md
                        { text: 'Four', link: '/config/four' } // /config/four.md
                    ]
                }
            ]
        }
    }
}
