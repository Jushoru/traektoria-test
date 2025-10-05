import type { carFieldsType} from "@/entities/car/carTypes.ts";

const currentData = new Date()

interface outErrors {
    hasError: boolean;
    newErrors: Record<carFieldsType, string>;
}

export function carValidator(name: string, model: string, year: string, color: string, price: string,
                              errors: Record<carFieldsType, string>): outErrors {

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

    if (!year.trim()) {
        errors.year = 'Введите год';
        hasError = true;
    } else if (isNaN(Number(year))) {
        errors.year = 'Год должен быть числом';
        hasError = true;
    } else if (Number(year) > currentData.getFullYear() || Number(year) < 1) {
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

    if (!price.trim()) {
        errors.price = 'Введите цену авто';
        hasError = true;
    } else if (price.length > 10) {
        errors.price = 'Слишком большая цена (макс. 10 символов)';
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