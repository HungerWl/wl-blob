export const sidebar = {
    "/前端物语/": [
        {
            text: "前端物语",
            items: [
                { text: "JavaScript", link: "/前端物语/JavaScript.md" },
                { text: "HTML", link: "/前端物语/HTML.md" },
                { text: "Browser", link: "/前端物语/Browser.md" },
            ],
        },
    ],
    "/工作日记/": [
        {
            text: "工作日记",
            items: [
                {
                    text: "性能优化专题",
                    collapsed: true,
                    items: [
                        { text: "前端如何把 SEO 做到极致", link: "/工作日记/index.md" },
                        { text: "SEO框架推荐", link: "/工作日记/SEO框架推荐.md" },
                    ],
                },
                {
                    text: "框架踩坑",
                    collapsed: true,
                    items: [
                        { text: "vue2-elementui", link: "/工作日记/element.md" },

                    ],
                },
                {
                    text: "Echarts图表大屏适配方案",
                    link: "/工作日记/echarts.md"
                }
            ],
        },
    ],
}