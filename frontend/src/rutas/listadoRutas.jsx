import rolesUsuario from '@/types/rolesUsuario'
import CatalogoProductos from '@/Components/productos/CatalogoProductos';
import Carrito from '@/Components/carrito/Carrito';
import Ordenes from '@/Components/ordenes/Ordenes';
import DetallesOrden from '@/Components/ordenes/DetallesOrden';

const listadoRutas = [
    {
        label: 'Ruta 1',
        path: 'usuarios',
        roles: [rolesUsuario.ADMIN],
        element: <h1>Ruta 1</h1>,
    },
    {
        label: 'Ruta 2',
        path: 'ruta2',
        roles: [rolesUsuario.ADMIN],
        element: <h1>Ruta 2</h1>,
    },
    {
        label: 'Productos',
        path: 'productos',
        element: <CatalogoProductos />,
    },
    {
        label: 'Carrito',
        path : 'carrito',
        element: <Carrito />,
    },
    {
        label: 'Ordenes',
        path: 'ordenes',
        element: <Ordenes />,
    },
    {
        label: 'Detalles Orden',
        path: 'detalles-orden',
        element: <DetallesOrden />,
    }
];

export default listadoRutas;