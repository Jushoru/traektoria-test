import {defineStore} from "pinia";
import { ref } from "vue";
import type { ICar, carFieldsType } from "./carTypes.ts";
import type { SortFieldType, SortDirectionType } from "@/shared/types/sorted.ts";

const getNewID = (): string => {
    return `car_${Date.now()}_${Math.random().toString(36).slice(2, 11)}`;
}

export const useCarStore = defineStore('car' ,() => {
    const cars = ref<ICar[]>([]);
    const isLoading = ref(false);
    const currentSortField = ref<SortFieldType>(null);
    const currentSortDirection = ref<SortDirectionType>(null);
    const errors = ref<Record<carFieldsType, string>>({
        name: '',
        model: '',
        year: '',
        color: '',
        price: '',
    });

    const getCars = async () => {
        isLoading.value = true;
        try {
            const response = await fetch('https://ofc-test-01.tspb.su/test-task/vehicles');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            cars.value = await response.json();
        } catch (error) {
            console.error('Failed to fetch cars:', error);
            cars.value = [];
        } finally {
            isLoading.value = false;
            console.log(cars)
        }
    };

    const setCar = (name: string, model: string, year: string | number, color: string, price: string | number) => {
        cars.value.push({
            id: getNewID(),
            name: name,
            model: model,
            year: year,
            color: color,
            price: price,
            latitude: '-',
            longitude: '-'
        })
    }

    const updateCar = (index: number, name: string, model: string, year: string | number, color: string, price: string | number) => {
        if (cars.value[index]) {
            cars.value[index] = {
                ...cars.value[index],
                name,
                model,
                year,
                color,
                price
            };
        }
    };

    const deleteCar = (index: number | null) => {
        if (index !== null) cars.value.splice(index, 1);
    }

    const clearErrors = () => {
        errors.value = {
            name: '',
            model: '',
            year: '',
            color: '',
            price: '',
        }
    };

    const setErrors = (newErrors: Record<carFieldsType, string>) => {
        errors.value = newErrors
    };

    const compare = (a: ICar, b: ICar, field: SortFieldType): number => {
        if (field === 'year') return parseInt(a.year.toString()) - parseInt(b.year.toString());
        if (field === 'price') return parseInt(a.price.toString()) - parseInt(b.price.toString());
        return 0;
    };

    const sortCarsByYear = () => {
        if (currentSortField.value === 'year') {
            currentSortDirection.value = currentSortDirection.value === 'asc' ? 'desc' : 'asc';
        } else {
            currentSortField.value = 'year';
            currentSortDirection.value = 'asc';
        }
        const direction = currentSortDirection.value === 'asc' ? 1 : -1;
        cars.value.sort((a, b) => direction * compare(a, b, 'year'));
    };

    const sortCarsByPrice = () => {
        if (currentSortField.value === 'price') {
            currentSortDirection.value = currentSortDirection.value === 'asc' ? 'desc' : 'asc';
        } else {
            currentSortField.value = 'price';
            currentSortDirection.value = 'asc';
        }
        const direction = currentSortDirection.value === 'asc' ? 1 : -1;
        cars.value.sort((a, b) => direction * compare(a, b, 'price'));
    };

    return {
        cars,
        isLoading,
        currentSortField,
        currentSortDirection,
        errors,

        getCars,
        setCar,
        updateCar,
        deleteCar,
        clearErrors,
        setErrors,
        sortCarsByYear,
        sortCarsByPrice,
    }
})