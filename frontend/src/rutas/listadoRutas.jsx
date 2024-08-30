import rolesUsuario from '@/types/rolesUsuario'

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
        roles: [rolesUsuario.ADMINs],
        element: <h1>Ruta 2</h1>,
    }
];

export default listadoRutas;