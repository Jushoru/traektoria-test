<script setup lang="ts">
defineProps<{
  text: string;
}>()
</script>
<template>
  <button class="button"
          type="button"
          @click="$emit('btnClick')"
  >
    {{ text }}
  </button>
</template>
<style lang="scss" scoped>
.button {
  width: 100%;
  min-width: max-content;
  min-height: 41px;
  border-radius: 0.5rem;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  font-weight: 400;
  color: white;
  border: none;
  padding: 0 1rem;
  background-color: var(--accent-blue-col);
  cursor: pointer;

  &:hover {
    opacity: 0.5;
  }
}
</style>