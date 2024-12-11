import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "阿万の博客",
  description: "wan",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "首页", link: "/" },
      { text: "知识记录", link: "/知识记录/index.md" },
      { text: "组件库", link: "/组件库/index.md" },
    ],
    sidebar: {
      "/知识记录/": [
        {
          text: "目录",
          items: [
            { text: "JavaScript", link: "/知识记录/JavaScript.md" },
            { text: "HTML", link: "/知识记录/HTML.md" },
          ],
        },
      ],
      "/组件库/": [
        {
          text: "目录",
        },
      ],
    },
    socialLinks: [
      { icon: "github", link: "https://github.com/vuejs/vitepress" },
    ],
  },
});
