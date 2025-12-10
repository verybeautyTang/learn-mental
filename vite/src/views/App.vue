<template>
  <div>
    Hello This World

    <img :src="OnePng" />
    <img :src="SevenPng" alt="" />
    <HelloWorld />
    <component :is="HelloWorld" />
  </div>
</template>

<script setup>
// 这里如果 OnePng小于 4kb 的话，就不会被单独打包出来生成一个 png 文件，而是直接被内联在 js 里面
// 解决办法：import OnePng from '@/assets/img/1.png?inline' 显式的告诉vite，我这个转化成 base64
import OnePng from '@/assets/img/1.png'
// 小于 4kb 的会自动内联为 base64 的编码，可以在 build.assetsInlineLimit改
import SevenPng from '@/assets/img/7.png'

import HelloWorld from './HelloWorld.vue'
</script>
