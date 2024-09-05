import rolesUsuario from '@/types/rolesUsuario';

const navbarOptions = [
    {
        label: 'Productos',
        path: 'productos',
    },
    {
        label: 'Ordenes',
        path: 'ordenes',
    },
    {
        label: 'Categorias',
        path: 'categorias',
        roles: [rolesUsuario.ADMIN],
    }
];

export default navbarOptions;