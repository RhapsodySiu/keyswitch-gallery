<script setup lang="ts">
import { reactive, toRefs, watch } from 'vue'
import ColorButtons from './ColorButtons.vue'
import { getDefaultFilterState } from '../util'

import type { FilterState } from '../types'

const props = defineProps<{
    filterState: FilterState,
}>()
const emits = defineEmits<{
    'update-filter': [FilterState],
    'reset-filter': [void]
}>()

const filterData = reactive(props.filterState)
const {
    force: filterForce,
    type: filterType,
    silentOnly: filterSilent,
    lightingOnly: filterRgb,
    speedyOnly: filterSpeedy,
    durableOnly: filterDurable,
    price: filterPrice,
    colors: filterColors,
} = toRefs(filterData)

watch(
    filterData,
    (newValue) => {
        emits('update-filter', newValue)
    },
)

const reset = () => {
    const {
        force,
        type,
        silentOnly,
        lightingOnly,
        speedyOnly,
        durableOnly,
        price,
        colors,
    } = getDefaultFilterState()

    filterForce.value = force
    filterType.value = type
    filterSilent.value = silentOnly
    filterRgb.value = lightingOnly
    filterDurable.value = durableOnly
    filterSpeedy.value = speedyOnly
    filterPrice.value = price
    filterColors.value = colors

    emits('reset-filter')
}

const forceOptions = [
    { value: 'light', tooltip: 'F < 45g' },
    { value: 'normal', tooltip: '45g <= F < 60g'},
    { value: 'heavy', tooltip: 'F >= 60g'},
]
</script>

<template>
<div class="filter-grid">
    <div class="filter-block" id="filterForce">
        <label>Force</label>
        <el-radio-group v-model="filterForce">
            <el-tooltip
            v-for="(item, idx) in forceOptions" 
            :key="idx"
            :content="item.tooltip" 
            placement="bottom" 
            effect="light"
            >
                <el-radio-button :label="item.value" />
            </el-tooltip>
        </el-radio-group>
    </div>
    <div class="filter-block" id="filterType">
        <label>Type</label>
        <el-radio-group v-model="filterType">
            <el-radio-button label="Linear" />
            <el-radio-button label="Tactile" />
            <el-radio-button label="Clicky" />
        </el-radio-group>
    </div>
    <div class="filter-block" id="filterSilent">
        <el-switch v-model="filterSilent" active-text="Silent" />
    </div>
    <div class="filter-block" id="filterLight">
        <el-switch v-model="filterRgb" active-text="RGB friendly" />
    </div>
    <div class="filter-block" id="filterDurable">
        <el-switch v-model="filterDurable" active-text="Durable" />
    </div>
    <div class="filter-block" id="filterSpeedy">
        <el-switch v-model="filterSpeedy" active-text="Speedy" />
    </div>
    <div class="filter-block" id="filterPrice">
        <label>Price</label>
        <el-radio-group v-model="filterPrice">
            <el-radio-button label="Economic" />
            <el-radio-button label="Average" />
            <el-radio-button label="High-end" />
        </el-radio-group>
    </div>
    <div class="filter-block" id="filterColors">
        <label>Colors</label>
        <ColorButtons v-model="filterColors" />
    </div>
</div>
<button class="filter-reset-btn" @click="reset">Reset</button>
</template>

<style scoped lang="scss">
.filter-grid {
    display: grid;
    gap: 5px;
    grid-template-columns: [col] 1fr [col] 1fr [col] 1fr [col] 1fr [col] 1fr;
    grid-template-rows: [row] auto [row] auto [row] auto [row] auto [row] auto [row] auto;
}

#filterForce {
    grid-column: col / span 5;
    grid-row: row;
}

#filterType {
    grid-column: col / span 5;
    grid-row: row 2;
}

#filterPrice {
    grid-column: col /span 5;
    grid-row: row 3;
}

#filterSilent {
    grid-column: col / span 2;
    grid-row: row 4;
}
#filterLight {
    grid-column: col 3 / span 3;
    grid-row: row 4;
}
#filterSpeedy {
    grid-column: col /span 2;
    grid-row: row 5;
}
#filterDurable {
    grid-column: col 3 /span 3;
    grid-row: row 5;
}

#filterColors {
    grid-column: col / span 5;
    grid-row: row 6;
}

.filter-block {
  display: flex;
  flex-wrap: wrap;

  > label {
    margin-right: 5px;
  }
  .el-radio-button {
    text-transform: capitalize;
  }
}

.filter-reset-btn {
    height: 28px;
    width: 50px;
    float: right;
    border: none;
    border-radius: 2px;
    background-color: var(--eg-bg-color);
}

@media (min-width: 769px) {
    .filter-grid {
        display: grid;
        gap: 5px;
        grid-template-columns: [col] 1fr [col] 1fr [col] 1fr [col] 1fr [col] 1fr;
        grid-template-rows: [row] auto [row] auto [row] auto [row] auto;
    }

    #filterForce {
        grid-column: col / span 2;
        grid-row: row;
    }
    #filterType {
        grid-column: col 4 / span 2;
        grid-row: row;
    }
    #filterPrice {
        grid-column: col /span 3;
        grid-row: row 2;
    }

    #filterSilent {
        grid-column: col / span 1;
        grid-row: row 3;
    }
    #filterLight {
        grid-column: col 3 / span 1;
        grid-row: row 3;
    }
    #filterSpeedy {
        grid-column: col 2 /span 1;
        grid-row: row 3;
    }
    #filterDurable {
        grid-column: col 4 /span 1;
        grid-row: row 3;
    }

    #filterColors {
        grid-column: col / span 5;
        grid-row: row 4;
    }
}
</style>