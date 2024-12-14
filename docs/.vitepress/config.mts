// \wan-blob\docs\.vitepress\config.mts
import { defineConfig } from "vitepress";

export default defineConfig({
  base: "/wl-blob/", // 设置为你的 GitHub 仓库名称
  title: "阿万の博客",
  description: "wan",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    search: {
      provider: 'local',
    },
    outline: "deep", // 默认显示较深的目录层级
    nav: [
      { text: "首页", link: "/" },
      {
        text: "前端物语",
        items: [
          { text: "JavaScript", link: "/前端物语/JavaScript.md" }
        ]
      },
      { text: "工作日记", link: "/工作日记/index.md" },
      { text: "工具库", link: "/工具库/index.md" },

    ],
    sidebar: {
      "/前端物语/": [
        {
          text: "JavaScript",
          items: [{ text: "", link: "/前端物语/JavaScript.md" }],
        },
      ],
      "/工作日记/": [
        {
          text: "工作日记",
          items: [{ text: "", link: "/工作日记/index.md" }],
        },
      ],
    },
    socialLinks: [
      { icon: "github", link: "https://github.com/HungerWl" },
    ],
  },
});
