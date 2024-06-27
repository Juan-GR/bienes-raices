export const validationSchema = {
    title (value) {
        if (value?.length >= 6 ) return true
        return 'El titulo de la propiedad es obligatorio o muy corto'
    },
    price (value) {
        if (/^[0-9]+$/.test(value)) return true
        return 'El Precio solo deben ser números'
    },
    rooms (value) {
        if (value) return true
        return 'Selecciona una Cantidad'
    },
    wc (value) {
        if (value) return true
        return 'Selecciona una Cantidad'
    },
    parking (value) {
        if (value) return true
        return 'Selecciona una Cantidad'
    },
    description (value) {
        if (value) return true
        return 'Agrega una Descripción'
    }
}

export const imageSchema = {
    image (value) {
        if (value) return true
        return 'La Imagen es Obligatoria'
    },
}