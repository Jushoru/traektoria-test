<script setup lang="ts">
import { ref, watch } from 'vue'
import AppButton from "@/shared/ui/AppButton.vue";
import { useCarStore } from "@/entities/car/carStore.ts";
import { carValidator } from "@/entities/car/carValidator.ts";
import AppDialog from "@/shared/ui/AppDialog.vue";
import type { ICar } from "@/entities/car/carTypes.ts";
import AppConfirmationDialog from "@/shared/ui/AppConfirmationDialog.vue";

const props = defineProps<{
  dialog: InstanceType<typeof AppDialog> | undefined;
  carData: ICar;
  index: number | null;
}>();

const dialogDeleteTarget = ref<InstanceType<typeof AppDialog>>()

const carStore = useCarStore();
const name = ref(props.carData.name);
const model = ref(props.carData.model)
const year = ref(props.carData.year)
const color = ref(props.carData.color)
const price = ref(props.carData.price)

watch(() => props.carData, (newCar) => {
  name.value = newCar.name
  model.value = newCar.model
  year.value = newCar.year
  color.value = newCar.color
  price.value = newCar.price
}, { immediate: true, deep: true })

const formSubmit = () => {
  carStore.clearErrors()

  let validation = carValidator(name.value, model.value, year.value, color.value, price.value, carStore.errors)

  if (!validation.hasError) {
    if (props.index !== null) {
      carStore.updateCar(props.index, name.value, model.value, year.value, color.value, price.value)
    }
    props.dialog?.close();

  } else {
    carStore.setErrors(validation.newErrors)
  }
};

const clearError = (field: keyof typeof carStore.errors) => {
  carStore.errors[field] = '';
};

const showDeleteDialog = () => {
  dialogDeleteTarget.value?.show()
}

const deleteCar = () => {
  carStore.deleteCar(props.index)
  dialogDeleteTarget.value?.close();
  props.dialog?.close()
}
</script>
<template>
  <div class="add-form">
    <h1 class="add-form__title">Добавить авто</h1>
    <p class="add-form__description">
        Заполните все поля и добавьте авто в список
    </p>

    <form class="add-form__body" @submit.prevent="formSubmit">
      <div class="add-form__field">
        <label class="add-form__label">Название</label>
        <input
            v-model="name"
            type="text"
            class="add-form__input"
            :class="{ 'add-form__input_invalid': carStore.errors.name }"
            placeholder="Название авто"
            @focus="clearError('name')"
        />
        <span v-if="carStore.errors.name" class="add-form__error">
          {{ carStore.errors.name }}
        </span>
      </div>

      <div class="add-form__field">
        <label class="add-form__label">Модель</label>
        <input
            v-model="model"
            type="text"
            class="add-form__input"
            :class="{ 'add-form__input_invalid': carStore.errors.model }"
            placeholder="Модель авто"
            @focus="clearError('model')"
        />
        <span v-if="carStore.errors.model" class="add-form__error">
          {{ carStore.errors.model }}
        </span>
      </div>

      <div class="add-form__field">
        <label class="add-form__label">Год</label>
        <input
            v-model="year"
            type="text"
            class="add-form__input"
            :class="{ 'add-form__input_invalid': carStore.errors.year }"
            placeholder="Год выпуска"
            @focus="clearError('year')"
        />
        <span v-if="carStore.errors.year" class="add-form__error">
          {{ carStore.errors.year }}
        </span>
      </div>

      <div class="add-form__field">
        <label class="add-form__label">Цвет</label>
        <input
            v-model="color"
            type="text"
            class="add-form__input"
            :class="{ 'add-form__input_invalid': carStore.errors.color }"
            placeholder="Цвет авто"
            @focus="clearError('color')"
        />
        <span v-if="carStore.errors.color" class="add-form__error">
          {{ carStore.errors.color }}
        </span>
      </div>

      <div class="add-form__field">
        <label class="add-form__label">Цена</label>
        <input
            v-model="price"
            type="text"
            class="add-form__input"
            :class="{ 'add-form__input_invalid': carStore.errors.price }"
            placeholder="Цена авто"
            @focus="clearError('price')"
        />
        <span v-if="carStore.errors.price" class="add-form__error">
          {{ carStore.errors.price }}
        </span>
      </div>

      <div class="add-form__buttons">
        <div class="add-form__action">
          <AppButton text="Сохранить" @btn-click="formSubmit"/>
        </div>
        <div class="add-form__delete"
             @click="showDeleteDialog()"
        >
          <img src="@/shared/icons/trash.svg"
               alt="удалить_книгу"
               width="20px"
          />
        </div>
      </div>
    </form>
  </div>
  <AppDialog ref="dialogDeleteTarget">
    <AppConfirmationDialog :title="`Удалить авто «${name} ${model}»`"
                           message="Вы уверены что хотите удалить это авто?"
                           @reject-click="dialogDeleteTarget?.close()"
                           @accept-click="deleteCar()"
    />
  </AppDialog>
</template>

<style scoped lang="scss">
$mobile: 768px;
$tablet: 1024px;

.add-form {
  background-color: #fff;
  margin: 0 auto;
  width: 280px;

  @media (min-width: #{$mobile}) {
    width: 424px;
  }

  @media (min-width: #{$tablet}) {
    width: 464px;
  }

  &__title {
    font-weight: 600;
    font-size: 1.125rem;
    line-height: 1.33;
    margin: 0;
  }

  &__description {
    margin-top: 0.5rem;
    font-size: 0.875rem;
    line-height: 1.43;
  }

  &__body {
    width: 100%;
    margin-top: 0.6rem;
  }

  &__field {
    margin-bottom: 0.6rem;
  }

  &__label {
    display: block;
    font-weight: 600;
    font-size: 0.875rem;
    line-height: 1.43;
    margin-bottom: 0.125rem;
  }

  &__input {
    width: 100%;
    height: 41px;
    padding: 0 0.75rem;
    background-color: var(--gray-col);
    border-radius: 0.5rem;
    font-size: 0.875rem;
    line-height: 1.43;
    border: 1px solid transparent;

    &:focus {
      outline: 2px solid var(--accent-blue-col);
      outline-offset: 0;
    }

    &_invalid {
      outline: 2px solid var(--error-col);
    }
  }

  &__error {
    display: block;
    margin-top: 0.25rem;
    margin-left: 0.75rem;
    font-size: 0.75rem;
    line-height: 1.42;
    color: var(--error-col);
  }

  &__buttons {
    display: flex;
    justify-content: flex-end;
    gap: 0.5rem;
    align-items: center;
  }

  &__action {
    margin-top: 1.25rem;

    @media (max-width: #{$mobile - 1}) {
      flex: 1;
    }
  }

  &__delete {
    width: 41px;
    height: 41px;
    background-color: #F7F8FA;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    margin-top: 1.25rem;

    &:hover {
      background-color: #E1E7EF;
    }
  }
}
</style>