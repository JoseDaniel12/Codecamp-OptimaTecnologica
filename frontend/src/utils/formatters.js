import dayjs from 'dayjs';


export const formatFecha = (fecha, formato = 'DD/MM/YYYY') => {
    return dayjs(fecha).format(formato);
}

export default formatFecha;