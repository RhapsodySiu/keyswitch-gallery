<script setup lang="ts">
import { ref, reactive, onMounted, onUnmounted, computed, toRef } from 'vue'

import Hero from './components/Hero.vue'
import FilterModal from './components/FilterModal.vue'
import Menu from './components/Menu.vue'
import Gallery from './components/Gallery.vue'

 import { getDefaultFilterState, getKeyswitchesData } from './util'

import type { FilterState, Keyswitch } from './types'

const state = reactive({
  filter: getDefaultFilterState()
})
const filter = toRef(state, 'filter')

const switchesData = ref(getKeyswitchesData() as Keyswitch[])

const showFilter = ref(false)

const screenWidth = ref(window.innerWidth)
const isModalMode = computed(() => screenWidth.value < 769)

const onFilterBtnClicked = () => {
  showFilter.value = !showFilter.value;
}
const resetFilter = () => {
  filter.value = getDefaultFilterState()
}

const updateFilter = (data: FilterState) => {
  filter.value = data
}

const handleResize = () => {
    screenWidth.value = window.innerWidth;
}

onMounted(() => {
  window.addEventListener('resize', handleResize);
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
})


</script>

<template>
  <Hero />
  <FilterModal 
    :show="showFilter && isModalMode"
    :filter-state="filter"
    @reset-filter="resetFilter"
    @update-filter="updateFilter"
    @close="onFilterBtnClicked"
  />
  <Menu
    class="app-menu"
    @click-filter-btn="onFilterBtnClicked" 
    :filter-state="state.filter"
    :show-filter="showFilter && !isModalMode"
  />
  <Gallery :switches-data=switchesData />
  
  <footer>
    <pre>
      Built with Vite + Vue 3 + Typescript
      rhapsody.siu@2023

      Credits:
      - https://kizu.dev
      - http://www.ttcswitch.cn/
      - https://zhuanlan.zhihu.com/p/105927020
    </pre>
  </footer>
</template>

<style scoped>
.app-menu {
  margin-bottom: 50px;
}
footer {
  text-align: left;
}
</style>
