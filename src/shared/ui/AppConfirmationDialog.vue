<script setup lang="ts">
import AppButton from "@/shared/ui/AppButton.vue";

defineProps<{
  title: string
  message: string
}>()

defineEmits<{
  (e: 'rejectClick'): void
  (e: 'acceptClick'): void
}>()
</script>

<template>
  <div class="confirmation-dialog">
    <h1 class="confirmation-dialog__title">{{ title }}</h1>
    <p class="confirmation-dialog__message">{{ message }}</p>
    <div class="confirmation-dialog__actions">
      <div class="confirmation-dialog__action">
        <AppButton color="var(--button-blue)" text="Нет" @btn-click="$emit('rejectClick')" />
      </div>
      <div class="confirmation-dialog__action">
        <AppButton text="Да" @btn-click="$emit('acceptClick')" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
$mobile: 768px;
$tablet: 1024px;
$desktop: 1280px;

.confirmation-dialog {
  background-color: #fff;
  margin-left: auto;
  margin-right: auto;
  width: 280px;

  @media (min-width: #{$mobile}) {
    width: 360px;
  }

  @media (min-width: #{$tablet}) {
    width: 400px;
  }

  &__title {
    font-weight: 600;
    font-size: 1.25rem;
    line-height: 1.25;
    max-width: 93%;
  }

  &__message {
    margin-top: 0.5rem;
    line-height: 1.25;
  }

  &__actions {
    margin-top: 1rem;
    display: flex;
    justify-content: flex-end;
    gap: 0.5rem;
  }

  &__action {
    width: 80px;
  }
}
</style>