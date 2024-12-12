import { h } from "vue";
import type { Theme } from "vitepress";
import DefaultTheme from "vitepress/theme";
import NavBarTitleBefore from "./components/NavBarTitleBefore.vue";
import "./style.css";
export default {
  extends: DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      "nav-bar-title-before": () => h(NavBarTitleBefore),
    });
  },
  enhanceApp({ app, router, siteData }) {
  },
} satisfies Theme;
