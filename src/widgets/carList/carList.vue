<script setup lang="ts">
import { useCarStore } from "@/entities/car/carStore.ts";
import { onMounted, ref } from "vue";
import AppDialog from "@/shared/ui/AppDialog.vue";
import EditCar from "@/features/edit-car/editCar.vue";
import type { ICar } from "@/entities/car/carTypes.ts";

const carStore = useCarStore();
const editedCar = ref<ICar>({
  id: '',
  name: '',
  model: '',
  year: '',
  color: '',
  price: '',
  latitude: '',
  longitude: '',
});
const editedCarId = ref<number | null>(null);
const dialogEditTarget = ref<InstanceType<typeof AppDialog>>()

const showEditDialog = (book: ICar, id: number) => {
  editedCar.value = book;
  editedCarId.value = id;
  dialogEditTarget.value?.show()
}

onMounted(() => {
  carStore.getCars()
})
</script>

<template>
  <ul class="cars-list" >
    <li class="cars-list__item"
        v-for="(car, index) in carStore.cars"
        :key="index"
    >
      <div class="cars-list__header">
        <h4 class="cars-list__title">
          {{ car.name }} {{ car.model }}
        </h4>
        <img src="@/shared/icons/fileEdit.svg"
             alt="Изменить описание автомобиля"
             class="cars-list__edit-icon"
             @click="showEditDialog(car, index)"
        />
      </div>

      <div class="cars-list__details">
        <span class="cars-list__detail cars-list__detail_year">{{ 'год выпуска: ' + car.year }}</span>
        <span class="cars-list__detail cars-list__detail_price">{{ 'цена: ' + car.price }}</span>
        <span class="cars-list__detail cars-list__detail_color">{{'цвет: ' + car.color }}</span>
      </div>
    </li>
  </ul>
  <AppDialog ref="dialogEditTarget">
    <EditCar :dialog="dialogEditTarget" :car-data="editedCar" :index="editedCarId"/>
  </AppDialog>
</template>

<style scoped lang="scss">
.cars-list {
  width: 100%;
  height: 100%;

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
      max-width: 345px;
    }

    @media (max-width: 1024px) {
      max-width: 550px;
    }

    @media (min-width: 1280px) {
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
    gap: 1rem;
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