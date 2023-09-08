<script setup lang="ts">
import { reactive, toRef, watch } from 'vue'

import FilterContent from './FilterContent.vue'

import type { FilterState } from '../types'

const props = defineProps<{
    showFilter: boolean,
    filterState: FilterState,
}>()
const emits = defineEmits<{
    'update-filter': [FilterState],
    'reset-filter': [void],
    'click-filter-btn': [void],
}>()

const filterData = reactive(props.filterState)
const searchValue = toRef(filterData, 'searchText')

watch(filterData, (newValue) => {
    emits('update-filter', newValue)
})

const resetFilter = () => {
    searchValue.value = ''
    emits('reset-filter')
}
</script>

<template>
    <div class="menu">
        <el-input class="menu__search" type="text" v-model="searchValue" placeholder="Search by name, brand etc..." />
        <button class="menu__filter-button" @click="$emit('click-filter-btn')">
            <font-awesome-icon icon="fa-solid fa-filter" />
        </button>
        <Transition name="panel">
            <div v-if="showFilter" class="menu__filter-panel">
                <FilterContent
                    :filter-state="filterState"
                    @reset-filter="resetFilter"
                    @update-filter="$emit('update-filter')"
                />
            </div>
        </Transition>
    </div>
</template>

<style lang="scss" scoped>
.menu {
    &__filter-panel {
        background-color: #6bb694;
    }

    &__filter-button {
        height: 28px;
        width: 28px;
        border: none;
        border-radius: 2px;
        background-color: var(--eg-bg-color);
        margin-left: 5px;
    }

    &__search {
        max-width: 320px;
    }

    @media (max-width: 768px) {
        &__filter-panel {
            display: none;
        }
    }

    @media (min-width: 769px) {
        &__filter-panel {
            transition: all 0.3s ease;
            height: 250px;
            padding: 70px 20px 0 20px;
            margin-top: -50px;
            outline: 1px solid #fff;
            overflow: hidden;
            background-color: #9f98c137;
            box-sizing: border-box;
        }
    }
}

.panel-enter-from, .panel-leave-to {
  opacity: 0;
  height: 0;
  padding-top: 0;
  margin-top: 0;
  overflow: hidden;
}
</style>