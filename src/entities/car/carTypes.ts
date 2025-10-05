export interface ICar {
    "id": string | number,
    "name": string,
    "model": string,
    "year": string | number,
    "color": string,
    "price": string | number,
    "latitude": string,
    "longitude": string
}

export type carFieldsType = 'name' | 'model' | 'year' | 'color' | 'price';