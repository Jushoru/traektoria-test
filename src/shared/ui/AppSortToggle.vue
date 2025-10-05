<script setup lang="ts">
import type { SortFieldType } from "@/shared/types/sorted.ts";
import { useCarStore } from "@/entities/car/carStore.ts";

defineProps<{
  text: string;
  type: SortFieldType;
}>()

const carStore = useCarStore()
</script>

<template>
  <button class="toggle"
          @click="type === 'year' ? carStore.sortCarsByYear() : carStore.sortCarsByPrice()"
  >
    {{ text }}
    <span v-if="type === carStore.currentSortField">
      {{ carStore.currentSortDirection === 'asc' ? '↑' : '↓' }}
    </span>
  </button>
</template>

<style scoped lang="scss">
.toggle {
  width: 100%;
  min-width: max-content;
  max-width: max-content;
  min-height: 41px;
  border-radius: 0.5rem;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  font-weight: 400;
  color: white;
  border: none;
  padding: 0 1rem;
  background-color: var(--accent-green-col);
  cursor: pointer;

  &:hover {
    opacity: 0.5;
  }
}
</style>