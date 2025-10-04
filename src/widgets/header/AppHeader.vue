<script setup lang="ts">
import AppButton from "@/shared/ui/AppButton.vue";

const showModal = () => {
  console.log('модалочка пошла')
}
</script>

<template>
  <header class="header">
    <div class="header__inner">
      <div class="header__static-row">
        <img class="header__logo"
               src="./img/logo.png"
               alt="лого"
        />
        <h1 class="header__title">Каталог авто</h1>
      </div>
      <div class="header__controls-row">
        <div class="header__button-container">
          <AppButton text="Добавить авто" @btn-click="showModal"/>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped lang="scss">
.header {
  width: 100%;
  padding: 1rem 0;
  display: flex;
  background-color: var(--gray-col);
  justify-content: center;

  &__inner {
    display: flex;
    flex-direction: column;
    width: 944px;
    margin: 0 1rem;
    justify-content: center;
    align-items: center;
  }

  &__static-row {
    width: 100%;
    display: flex;
    align-items: center;
    margin-bottom: 0.6rem;
  }

  &__logo {
    width: 55px;
  }

  &__title {
    font-family: 'Inter', sans-serif;
    font-weight: 600;
    font-size: 1.2rem;
    text-transform: uppercase;
    margin-left: 8px;
  }

  &__controls-row {
    display: flex;
    width: 100%;
    justify-content: space-between;
  }

}
</style>