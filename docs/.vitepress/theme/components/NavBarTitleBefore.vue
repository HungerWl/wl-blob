```docs/.vitepress/components/NavBarTitleBefore.vue
<script setup>
import { ref, onMounted } from 'vue';
import lottie from 'lottie-web';

onMounted(() => {
    const animationContainer = document.getElementById('lottieAnimation');
    lottie.loadAnimation({
        container: animationContainer, // 指定动画容器
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: '/lottie-start.json' // 替换为你的动画文件路径
    });
});
</script>

<template>
    <div id="navBarTitleBefore">
        <div id="lottieAnimation" style="width: 50px; height: 50px;margin-right: 10px;"></div> <!-- 添加 Lottie 动画容器 -->
    </div>
</template>