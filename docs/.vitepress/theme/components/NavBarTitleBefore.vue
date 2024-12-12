<!-- docs/.vitepress/components/NavBarTitleBefore.vue -->
<script setup>
import { onMounted } from "vue";
import lottie from "lottie-web";

onMounted(() => {
    const animationContainer = document.getElementById("lottieAnimation");
    lottie.loadAnimation({
        container: animationContainer,
        renderer: "svg",
        loop: true,
        autoplay: true,
        path: `${import.meta.env.BASE_URL}lottie/lottie-start.json`, // 引用 public 目录中的路径
    });
});
</script>

<template>
    <div id="navBarTitleBefore">
        <div id="lottieAnimation" style="width: 50px; height: 50px; margin-right: 10px;"></div>
    </div>
</template>
