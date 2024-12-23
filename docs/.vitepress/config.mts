// \wan-blob\docs\.vitepress\config.mts
import { defineConfig } from "vitepress";
import { nav } from "./nav"
import { sidebar } from "./sidebar"

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
    nav: nav,
    sidebar: sidebar,
    socialLinks: [{ icon: "github", link: "https://github.com/HungerWl" }],
  },
});
