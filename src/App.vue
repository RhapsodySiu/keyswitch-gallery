<script setup lang="ts">
import { ref } from 'vue';

import Hero from './components/Hero.vue';
// import Menu from './components/Menu.vue';
import Gallery from './components/Gallery.vue';

import type { Keyswitch } from './types';
import { getKeyswitchesData } from './util';

const switchesData = ref(getKeyswitchesData() as Keyswitch[]);
</script>

<template>
  <Hero />
  <!-- <Menu /> -->
  <Gallery :switchesData=switchesData />
  
  <footer>
    <pre>
      rhapsody.siu@2023

      Credits:
      - https://kizu.dev
      - http://www.ttcswitch.cn/
      - https://zhuanlan.zhihu.com/p/105927020
    </pre>
  </footer>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
