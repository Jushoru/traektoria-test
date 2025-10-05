<script setup lang="ts">
import { ref } from "vue";

const dialogRef = ref<HTMLDialogElement | null>(null);
const showDialog = () => dialogRef.value?.showModal();
const closeDialog = () => dialogRef.value?.close();

defineExpose ({
  show: showDialog,
  close: closeDialog,
});

function closeFromEvent(e: Event): void {
  if (e.currentTarget === e.target) {
    closeDialog();
  }
}
</script>

<template>
  <dialog class="app-dialog"
      ref="dialogRef"
      @click="closeFromEvent"
  >
    <div class="app-dialog__content">
      <a class="app-dialog__close"
          @click="closeDialog"
          aria-label="Закрыть модальное окно"
      >
        <img src="../icons/xModal.svg" alt="закрыть модальное окно" />
      </a>
      <slot />
    </div>
  </dialog>
</template>

<style scoped lang="scss">
$mobile: 768px;
$tablet: 1024px;
$desktop: 1280px;

.app-dialog {
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: 0;
  padding: 0;
  border: none;

  min-height: 100dvh;
  min-width: 100vw;
  border-radius: 0;

  @media (min-width: #{$mobile}) {
    min-height: min-content;
    min-width: min-content;
    max-height: 90vh;
    max-width: 90vw;
    border-radius: 1rem;
  }

  &__content {
    padding: 1.25rem 0;

    @media (min-width: #{$mobile}) {
      padding: 2rem;
      min-height: min-content;
    }
  }

  &__close {
    position: absolute;
    width: 1.5rem;
    height: 1.5rem;
    top: 1rem;
    right: 1rem;
    cursor: pointer;

    @media (min-width: #{$mobile}) {
      top: 2rem;
      right: 2rem;
    }
  }
}

dialog::before,
dialog::after {
  content: none;
  padding: 0;
}
</style>
