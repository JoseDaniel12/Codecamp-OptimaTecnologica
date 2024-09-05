import { Routes, Route } from 'react-router-dom';
import Dashboard from '@/components/UI/Dashboard';

import Login from '@/components/Auth/Login';
import Registro from '@/components/Auth/Registro';
import rolesUsuario from '@/types/rolesUsuario';
import { useAuth } from '@/hooks/useAuth';

import CatalogoProductos from '@/Components/productos/CatalogoProductos';
import EditarProducto from '@/Components/productos/EditarProducto';
import CrearProducto from '@/Components/productos/CrearProducto';
import Ordenes from '@/Components/ordenes/Ordenes';

function Rutas() {
    const { loginData, rutasAutorizadas } = useAuth();
    const usuario = loginData?.usuario;

    return (
        <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/registro' element={<Registro />} />
            {
                !loginData ? (
                    <>
                        <Route index element={<Login />} />
                    </>
                ) : (
                    <Route path='/' element={<Dashboard />}>
                        {
                            rutasAutorizadas.map(ruta => (
                                <Route key={ruta.path} path={ruta.path} element={ruta.element} />
                            ))
                        }
                        {
                            usuario.rol_idrol === rolesUsuario.ADMIN ? (
                                <Route index element={<Ordenes />} />
                            ) : (
                                <Route index element={<CatalogoProductos />} />
                            )
                        }
                        <Route path='/productos/editar/:idProducto' element={<EditarProducto />} />
                        <Route path='/crear-producto' element={<CrearProducto />} />
                    </Route>
                )
            }
        </Routes>
    );
}

export default Rutas;
