<script setup lang="ts">
import CarList from '@/widgets/carList/carList.vue';

</script>

<template>
  <main class="main">
    <div class="main__inner">
      <CarList/>
    </div>
  </main>
</template>

<style scoped lang="scss">
.main {
  width: 100%;
  display: flex;
  justify-content: center;
  position: relative;
  max-width: 100%;
  overflow-y: auto;
  margin-top: 1rem;
  margin-bottom: 2rem;

  &__inner {
    position: relative;
    display: flex;
    flex-direction: column;
    width: 944px;
    justify-content: center;
    align-items: center;
    margin: 0 1rem 0 1rem;
  }
}
</style>