<script setup lang="ts">
import Modal from './Modal.vue'
import FilterContent from './FilterContent.vue'
import type { FilterState } from '../types'

defineProps<{
    show: boolean,
    filterState: FilterState,
}>()
defineEmits<{
    'update-filter': [FilterState],
    'reset-filter': [void],
}>()
</script>

<template>
    <modal :show="show" @close="console.log('close')">
        <template #header>
            Filter
        </template>
        <template #body>
            <FilterContent 
                :filter-state="filterState" 
                @reset-filter="$emit('reset-filter')"
                @update-filter="$emit('update-filter', $event)"
            />
        </template>
    </modal>
</template>

