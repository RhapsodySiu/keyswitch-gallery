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

const switchesData = computed(() => {
  const keyswitches: Keyswitch[] = getKeyswitchesData()
  console.log(keyswitches.length)
  const {
    force,
    type,
    price,
    colors,
    silentOnly,
    lightingOnly,
    speedyOnly,
    durableOnly,
    searchText,
  } = filter.value

  const isDefault = force === '' && type === '' &&
    price === '' && colors.length === 0 && searchText === '' &&
    !silentOnly && !speedyOnly && !durableOnly && !lightingOnly

  if (isDefault) {
    return keyswitches
  }

  return keyswitches.filter((keyswitch) => {
    if (searchText && !JSON.stringify(keyswitch).includes(searchText)) {
      console.log('return false of text')

      return false
    }

    if (force !== '') {
      if (!keyswitch.trigger_force_g) {
        return false
      }

      switch (force) {
        case 'light':
          if (keyswitch.trigger_force_g >= 45) {
            return false
          }
          break
        case 'normal':
          if (keyswitch.trigger_force_g < 45 || keyswitch.trigger_force_g >= 60) {
            return false
          }
          break
        case 'heavy':
          if (keyswitch.trigger_force_g < 60) {
            return false
          }
      }
    }

    if (type && keyswitch.type !== type.toLocaleLowerCase()) {
      return false
    }

    if (price) {
      if (!keyswitch.price) {
        return false
      }

      switch (price) {
        case 'Economic':
          if (keyswitch.price > 1) {
            return false
          }
          break
        case 'Average':
          if (keyswitch.price <= 1 || keyswitch.price >= 4) {
            return false
          }
          break
        case 'High-end':
          if (keyswitch.price < 4) {
            return false
          }
      }
    }

    if (colors.length && !keyswitch.colors?.some((c) => colors.includes(c))) {
      console.log('return false on color:', colors.includes('red'))
      return false
    }

    if (silentOnly && !keyswitch.is_silent) {
      console.log('return false of silent')
      return false
    }

    if (durableOnly && (!keyswitch.life || keyswitch.life < 80000000)) {
      console.log('return false of life')
      return false
    }

    if (lightingOnly && !keyswitch.lighting_support?.length) {
      console.log('return false of lighting')
      return false
    }

    if (speedyOnly && !keyswitch.is_speedy) {
      return false
    }

    return true
  })
})

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
  <span v-show="switchesData.length === 0">No result</span>
  <Gallery :switches-data=switchesData />
  
  <footer>
    <pre>
      Built with Vite + Vue 3 + Typescript
      rhapsody.siu@2023

      Credits:
      - https://kizu.dev
      - http://www.kailh.com/
      - http://www.ttcswitch.cn/
      - https://www.zfrontier.com/
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
