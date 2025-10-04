import {defineStore} from "pinia";
import { ref } from "vue";
import type { ICar } from "./carTypes.ts";

export const useCarStore = defineStore('car' ,() => {
    const cars = ref<ICar[] | null>([]);
    const isLoading = ref(false);

    // const getCars = async () => {
    //     isLoading.value = true;
    //     const response = await fetch('https://ofc-test-01.tspb.su/test-task/vehicles')
    //     const carsJSON = await response.json()
    //     cars.value = JSON.stringify(carsJSON)
    // };

    return {
        cars,
        isLoading,
        // getCars,
    }
})