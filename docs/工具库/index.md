---
aside: true 
---
# 工具库

<script setup>
import { NAV_DATA } from './data'
</script>
<style src="./index.scss"></style>

<MNavLinks v-for="{title, items} in NAV_DATA" :title="title" :items="items"/>
