# Echats

::: warning 问题
● 每个图表需要从头到尾写一遍完整的 option 配置，十分冗余<br>
● 在同一个项目中，各类图表设计十分相似，甚至是相同，没必要一直做重复工作<br>
● 窗口缩放时的适应问题<br>
● 在项目中如何按需引入 echarts 图表 减少打包体积的大小<br>
:::

### 设计稿

```text
假设设计稿尺寸为 1920*1080（做之前一定问清楚 ui 设计稿的尺寸）

即：
网页宽度=1920px
网页高度=1080px

我们都知道
网页宽度=100vw
网页宽度=100vh

所以，在 1920px*1080px 的屏幕分辨率下

1920px = 100vw

1080px = 100vh

这样一来，以一个宽 300px 和 200px 的 div 来说，其所占的宽高，以 vw 和 vh 为单位，计算方式如下:

vwDiv = (300px / 1920px ) * 100vw
vhDiv = (200px / 1080px ) * 100vh

所以，就在 1920*1080 的屏幕分辨率下，计算出了单个 div 的宽高

当屏幕放大或者缩小时，div 还是以 vw 和 vh 作为宽高的，就会自动适应不同分辨率的屏幕
```

### Sass

```css
// 使用 scss 的 math 函数，https://sass-lang.com/documentation/breaking-changes/slash-div
@use "sass:math";

// 默认设计稿的宽度
$designWidth: 1920;
// 默认设计稿的高度
$designHeight: 1080;

// px 转为 vw 的函数
@function vw($px) {
  @return math.div($px, $designWidth) * 100vw;
}

// px 转为 vh 的函数
@function vh($px) {
  @return math.div($px, $designHeight) * 100vh;
}
```

### Less

```css
@charset "utf-8";

// 默认设计稿的宽度
@designWidth: 1920;

// 默认设计稿的高度
@designHeight: 1080;

.px2vw(@name, @px) {
  @{name}: (@px / @designWidth) * 100vw;
}

.px2vh(@name, @px) {
  @{name}: (@px / @designHeight) * 100vh;
}

.px2font(@px) {
  font-size: (@px / @designWidth) * 100vw;
}
```

```js
// 定义设计稿的宽高
const designWidth = 1920;
const designHeight = 1080;

// px转vw
export const px2vw = (_px) => {
  return (_px * 100.0) / designWidth + "vw";
};

export const px2vh = (_px) => {
  return (_px * 100.0) / designHeight + "vh";
};

export const px2font = (_px) => {
  return (_px * 100.0) / designWidth + "vw";
};
```

### Scale

```html
<div className="screen-wrapper">
  <div className="screen" id="screen"></div>
</div>
```

```js
<script>
  export default {
    mounted() {
      // 初始化自适应  ----在刚显示的时候就开始适配一次
      handleScreenAuto();
      // 绑定自适应函数   ---防止浏览器栏变化后不再适配
      window.onresize = () => handleScreenAuto();
    },
    deleted() {
      window.onresize = null;
    },
    methods: {
      // 数据大屏自适应函数
      handleScreenAuto() {
        const designDraftWidth = 1920; //设计稿的宽度
        const designDraftHeight = 960; //设计稿的高度
        // 根据屏幕的变化适配的比例
        const scale =
          document.documentElement.clientWidth /
          document.documentElement.clientHeight <
          designDraftWidth / designDraftHeight
          ? document.documentElement.clientWidth / designDraftWidth
          : document.documentElement.clientHeight / designDraftHeight;
        // 缩放比例
        document.querySelector(
          '#screen',
        ).style.transform = `scale(${scale}) translate(-50%, -50%)`;
      },
    },
  };
</script>
```

```css
/*
除了设计稿的宽高是根据您自己的设计稿决定以外，其他复制粘贴就完事
*/
.screen-root {
  height: 100%;
  width: 100%;
  .screen {
    display: inline-block;
    width: 1920px; //设计稿的宽度
    height: 960px; //设计稿的高度
    transform-origin: 0 0;
    position: absolute;
    left: 50%;
    top: -50%;
  }
}
```

```js
const scale =
  document.documentElement.clientWidth / document.documentElement.clientHeight <
  designDraftWidth / designDraftHeight
    ? document.documentElement.clientWidth / designDraftWidth
    : document.documentElement.clientHeight / designDraftHeight;
```
