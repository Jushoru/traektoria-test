import type { carFieldsType} from "@/entities/car/carTypes.ts";

const currentData = new Date()

interface outErrors {
    hasError: boolean;
    newErrors: Record<carFieldsType, string>;
}

export function carValidator(name: string, model: string, year: string | number, color: string, price: string | number,
                              errors: Record<carFieldsType, string>): outErrors {
    const yearStr = String(year).trim();
    const priceStr = String(price).trim();
    let hasError = false

    if (!name.trim()) {
        errors.name = 'Введите название';
        hasError = true;
    } else if (name.length > 300) {
        errors.name = 'Слишком длинное название (макс. 100 символов)';
        hasError = true;
    }

    if (!model.trim()) {
        errors.model = 'Введите модель';
        hasError = true;
    } else if (model.length > 60) {
        errors.model = 'Слишком длинное имя модели (макс. 100 символов)';
        hasError = true;
    }

    if (!yearStr) {
        errors.year = 'Введите год';
        hasError = true;
    } else if (isNaN(Number(yearStr))) {
        errors.year = 'Год должен быть числом';
        hasError = true;
    } else if (Number(yearStr) > currentData.getFullYear() || Number(yearStr) < 1) {
        errors.year = `Год должен быть в диапазоне от 1 до ${currentData.getFullYear()}`;
        hasError = true;
    }

    if (!color.trim()) {
        errors.color = 'Введите цвет авто';
        hasError = true;
    } else if (color.length > 60) {
        errors.color = 'Слишком длинное название цвета (макс. 60 символов)';
        hasError = true;
    }

    if (!priceStr) {
        errors.price = 'Введите цену';
        hasError = true;
    } else if (isNaN(Number(priceStr))) {
        errors.price = 'Цена должна быть числом';
        hasError = true;
    } else if (Number(priceStr) > 1000000000000 || Number(priceStr) < 1) {
        errors.price = `Цена должна быть в диапазоне от 1 до 1000000000000`;
        hasError = true;
    }


    if (hasError) {
        return {
            hasError: true,
            newErrors: errors,
        }
    } else {
        return {
            hasError: false,
            newErrors: errors,
        }
    }
}