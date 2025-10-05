<script setup lang="ts">
import AppButton from "@/shared/ui/AppButton.vue";
import AppSortToggle from "@/shared/ui/AppSortToggle.vue";

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
        <div class="header__filter-container">
          <AppSortToggle text="Сортировать по цене" type="price"/>
          <AppSortToggle text="Сортировать по году" type="year"/>
        </div>
        <div class="header__button-container">
          <AppButton text="Добавить авто" @btn-click="$emit('showDialog')"/>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped lang="scss">
$mobile: 530px;

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

  &__filter-container {
    display: flex;
    justify-content: space-between;
    gap: 0.5rem;

    @media (max-width: #{$mobile}) {
      flex-direction: column;
      width: 100%;
      gap: 0.75rem;
    }

  }

  &__button-container {
    margin-left: 0.5rem;
  }

}
</style>