// \wan-blob\docs\.vitepress\config.mts
import { defineConfig } from "vitepress";

export default defineConfig({
  base: "/wl-blob/", // 设置为你的 GitHub 仓库名称
  title: "阿万の博客",
  description: "wan",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    search: {
      provider: "local",
    },
    outline: "deep", // 默认显示较深的目录层级
    nav: [
      { text: "首页", link: "/" },
      {
        text: "前端物语",
        items: [
          { text: "JavaScript", link: "/前端物语/JavaScript.md" },
          { text: "HTML", link: "/前端物语/HTML.md" },
          { text: "Browser", link: "/前端物语/Browser.md" },
        ],
      },
      { text: "工作日记", link: "/工作日记/index.md" },
      { text: "工具库", link: "/工具库/index.md" },
    ],
    sidebar: {
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
          ],
        },
      ],
    },
    socialLinks: [{ icon: "github", link: "https://github.com/HungerWl" }],
  },
});
