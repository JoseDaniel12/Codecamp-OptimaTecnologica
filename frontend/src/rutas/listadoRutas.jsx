import rolesUsuario from '@/types/rolesUsuario'
import CatalogoProductos from '@/Components/productos/CatalogoProductos';
import Carrito from '@/Components/carrito/Carrito';
import Ordenes from '@/Components/ordenes/Ordenes';
import DetallesOrden from '@/Components/ordenes/DetallesOrden';
import EditarProducto from '@/Components/productos/EditarProducto';
import CrearProducto from '@/Components/productos/CrearProducto';
import GestionCategorias from '@/Components/categorias/CestionCategorias';

const listadoRutas = [
    {
        path: 'productos',
        element: <CatalogoProductos />,
    },
    {
        path : 'carrito',
        element: <Carrito />,
        roles: [rolesUsuario.CLIENTE]
    },
    {
        path: 'ordenes',
        element: <Ordenes />,
    },
    {
        path: 'detalles-orden/:idOrden',
        element: <DetallesOrden />,
    },
    {
        path: 'productos/editar/:idProducto',
        element: <EditarProducto />,
        roles: [rolesUsuario.ADMIN]
    },
    {
        path: 'crear-producto',
        element: <CrearProducto />,
        roles: [rolesUsuario.ADMIN]
    },
    {
        path: 'categorias',
        element: <GestionCategorias />,
        roles: [rolesUsuario.ADMIN]
    }
];

export default listadoRutas;