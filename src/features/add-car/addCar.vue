<script setup lang="ts">
import { ref } from 'vue'
import AppButton from "@/shared/ui/AppButton.vue";
import { useCarStore } from "@/entities/car/carStore.ts";
import { carValidator } from "@/entities/car/carValidator.ts";
import AppDialog from "@/shared/ui/AppDialog.vue";

const props = defineProps<{
  dialog: InstanceType<typeof AppDialog> | undefined
}>();

const carStore = useCarStore();
const name = ref('')
const model = ref('')
const year = ref('')
const color = ref('')
const price = ref('')

const formSubmit = () => {
  carStore.clearErrors()

  let validation = carValidator(name.value, model.value, year.value, color.value, price.value, carStore.errors)

  if (!validation.hasError) {

    carStore.setCar(name.value, model.value, year.value, color.value, price.value)
    props.dialog?.close();

    name.value = ''
    model.value = ''
    year.value = ''
    color.value = ''
    price.value = ''

  } else {
    carStore.setErrors(validation.newErrors)
  }
};

const clearError = (field: keyof typeof carStore.errors) => {
  carStore.errors[field] = '';
};
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

      <div class="add-form__actions">
        <AppButton text="Добавить" @btn-click="formSubmit"/>
      </div>
    </form>
  </div>
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

  &__actions {
    display: flex;
    justify-content: flex-end;
    margin-top: 1.25rem;
    @media (max-width: #{$mobile - 1}) {
      justify-content: stretch;
    }
  }
}
</style>