import type { NavLink } from "../.vitepress/theme/types";

type NavData = {
  title: string;
  items: NavLink[];
};

export const NAV_DATA: NavData[] = [
  {
    title: "",
    items: [
      {
        icon: "https://nextjs.org/static/favicon/safari-pinned-tab.svg",
        title: "Next.js & React SEO Best Practices",
        desc: "Next.js 提供了强大的服务端渲染 (SSR) 和静态站点生成 (SSG) 功能，使得 SEO 优化变得简单且高效。",
        link: "https://nextjs.org/", // Next.js SEO 官方文档链接
      },
      {
        icon: "https://nuxt.com/icon.png",
        title: "Nuxt 3 & Vue SEO Techniques",
        desc: "Nuxt 3 是 Vue.js 的服务端渲染框架，帮助开发者实现更好的 SEO 性能和结构化数据支持。",
        link: "https://nuxtjs.org/docs/2.x/features/seo", // Nuxt 3 SEO 官方文档链接
      },
    ],
  },
];
