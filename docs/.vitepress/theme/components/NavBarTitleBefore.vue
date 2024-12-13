<script setup>
import { onMounted, watch, ref, nextTick, computed } from "vue";
import lottie from "lottie-web";
import { useData } from "vitepress";

const { isDark } = useData();
let animationInstance = ref(null); // 动画实例

const lottieName = computed(() => (isDark.value ? "lottie-start.json" : "lottie-flower.json"));

const loadAnimation = () => {
    const animationContainer = document.getElementById("lottieAnimation");
    // 如果动画实例已经存在，则更新路径
    if (animationInstance.value) {
        animationInstance.value.destroy();  // 销毁之前的动画
        animationInstance.value = null;
    }
    // 加载新的动画
    animationInstance.value = lottie.loadAnimation({
        container: animationContainer,
        renderer: "svg",
        loop: true,
        autoplay: true,
        path: `${import.meta.env.BASE_URL}lottie/${lottieName.value}`, // 动态路径
    });
};

// 初次加载动画
onMounted(() => {
    nextTick(() => {
        loadAnimation();
    });
});

// 监听暗黑模式变化，更新动画路径
watch(isDark, () => {
    nextTick(() => {
        loadAnimation();
    });
});
</script>

<template>
    <div id="navBarTitleBefore">
        <div id="lottieAnimation" style="width: 50px; height: 50px; margin-right: 10px;"></div>
    </div>
</template>
