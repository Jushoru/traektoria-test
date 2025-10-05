<script setup lang="ts">
import { useCarStore } from "@/entities/car/carStore.ts";
import { onMounted } from "vue";

const carStore = useCarStore();

onMounted(() => {
  carStore.getCars()
})
</script>

<template>
  <ul class="cars-list">
    <li class="cars-list__item"
        v-for="(car, id) in carStore.cars"
        :key="id"
    >
      <div class="cars-list__header">
        <h4 class="cars-list__title">
          {{ car.name }} {{ car.model }}
        </h4>
        <img src="@/shared/icons/fileEdit.svg"
             alt="Изменить описание автомобиля"
             class="cars-list__edit-icon"
        />
      </div>

      <div class="cars-list__details">
        <span class="cars-list__detail cars-list__detail_year">{{ car.year }}</span>
        <span class="cars-list__detail cars-list__detail_price">{{ car.price }}</span>
        <span class="cars-list__detail cars-list__detail_color">{{ car.color }}</span>
      </div>
    </li>
  </ul>
</template>

<style scoped lang="scss">
.cars-list {
  width: 100%;

  &__item {
    padding: 1rem;
    margin-bottom: 1rem;
    border: 2px solid var(--gray-col);
    border-radius: 1rem;

    &:hover {
      background-color: var(--gray-col);
    }
  }
  &__header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 1rem;
  }

  &__title {
    font-size: 16px;
    line-height: 1.25;
    word-break: break-word;
    overflow-wrap: break-word;
    flex: 1 1 0;
    max-width: 205px;

    @media (max-width: 768px) {
      // mobile
      max-width: 345px;
    }

    @media (max-width: 1024px) {
      // tablet
      max-width: 550px;
    }

    @media (min-width: 1280px) {
      // desktop
      max-width: 876px;
    }
  }

  &__edit-icon {
    flex-shrink: 0;
    cursor: pointer;
    width: auto;
    height: auto;
  }

  &__details {
    display: flex;
    gap: 0.5rem;
    margin-top: 0.5rem;
  }

  &__detail {
    font-size: 14px;
    white-space: nowrap;

    &_year,
    &_color {
      max-width: 41%;
      overflow: hidden;
      text-overflow: ellipsis;
    }

  }
}
</style>