<script setup lang="ts">
import { ref } from 'vue'

const searchValue = ref('')
const isFilterVisible = ref(false)

const toggleFilter = () => {
    isFilterVisible.value = !isFilterVisible.value
}
</script>

<template>
    <div class="menu">
        <input class="menu__search" type="text" v-model="searchValue" placeholder="Search by name..." />
        <button class="menu__filter-button" @click="toggleFilter">F</button>
        <div :class="{'menu__filter-panel': true, 'menu__filter-panel--open': isFilterVisible}">
            <div>
                <label>Force</label>
            </div>
            <div>
                <label>Travel distance</label>
            </div>
            <div>
                <label>Colors</label>
            </div>
            <div>
                <label>Type</label>
            </div>
            <div>
                <label>Customization</label>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.menu {
    &__filter-panel {
        background-color: #6bb694;
        transition: 0.3s ease-out;
    }

    @media (max-width: 768px) {
        &__filter-panel {
            display: none;
        }
    }

    @media (min-width: 769px) {
        &__filter-panel {
            height: 0px;
            border: none;

            overflow: hidden;
            background-color: #9f98c137;
            box-sizing: border-box;
            
            &--open {
                border: 1px solid #fff;
                height: 400px;
            }
        }
    }
}
</style>