<script setup lang="ts">
defineProps({
    modelValue: Array,
})

defineEmits(['update:modelValue'])

const colorsOptions: [string, string][] = [
    ['red', 'red'],
    ['orange', 'orange'],
    ['yellow', 'yellow'],
    ['green', 'green'],
    ['lime', 'lime'],
    ['cyan', 'cyan'],
    ['blue', 'blue'],
    ['purple', 'purple'],
    ['pink', 'pink'],
    ['brown', '#6d4f4b'],
    ['gray', 'gray'],
    ['black', '#000'],
    ['white', '#fff'],
    ['transparent', 'rgba(0, 0, 0, 0)'],
]
</script>

<template>
  <el-tooltip
    v-for="(item, idx) in colorsOptions" 
    :key="idx"
    :content="item[0].charAt(0).toLocaleUpperCase() + item[0].slice(1)" 
    placement="top" 
    effect="light"
  >
    <button
      class="filter-color-btn"
      :class="{ active: modelValue?.includes(item[0]) }" 
      :style="{ 'background-color': item[1] }"
      @click="$emit('update:modelValue', modelValue?.includes(item[0]) ? modelValue.filter((v) => v !== item[0]) : [item[0], ...(modelValue ?? [])])"
  >
      <div v-if="item[0] === 'Transparent'" class="line"></div>
  </button>
  </el-tooltip>
</template>

<style scoped lang="scss">

.filter-color-btn {
  position: relative;
  width: 20px;
  height: 20px;
  padding: 0;
  margin: 2px 3px;
  border-radius: 0;
  border: 1px solid transparent;
  outline: 1px solid #888;
  opacity: 0.3;

  &.active {
    outline: 2px solid #fff;
    opacity: 1;
  }

  .line {
    width: calc(1.414 * 20px);
    transform: rotate(45deg);
    transform-origin: 0 0;
    border-top: 1px solid #888;
    position: absolute;
    top: -1px;
    left: -1px;
    box-sizing: border-box;
  }
}
</style>