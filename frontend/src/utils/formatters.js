import { format } from 'date-fns';


export const formatFecha = (fecha, formato  = 'dd/MM/yyyy') => {
    return format(fecha, formato);
}

export default formatFecha;