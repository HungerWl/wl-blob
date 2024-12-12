import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
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
      { text: "个人笔记", link: "/个人笔记/JavaScript.md" },
    ],
    sidebar: {
      "/个人笔记/": [
        {
          text: "目录",
          items: [{ text: "JavaScript", link: "/个人笔记/JavaScript.md" }],
        },
      ],
    },
    socialLinks: [
      { icon: "github", link: "https://github.com/vuejs/vitepress" },
    ],
  },
});
