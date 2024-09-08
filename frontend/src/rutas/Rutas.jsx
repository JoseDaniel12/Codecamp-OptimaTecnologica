import { Routes, Route } from 'react-router-dom';
import Dashboard from '@/components/UI/Dashboard';

import Login from '@/components/Auth/Login';
import Registro from '@/components/Auth/Registro';
import rolesUsuario from '@/types/rolesUsuario';
import NotFound from '@/Components/UI/NotFound';

import { useAuth } from '@/hooks/useAuth';
import CatalogoProductos from '@/Components/productos/CatalogoProductos';
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
                    <Route index element={<Login />} />
                ) : (
                    <Route path='/' element={<Dashboard />}>
                        {
                            usuario.rol_idrol === rolesUsuario.ADMIN ? (
                                <Route index element={<Ordenes />} />
                            ) : (
                                <Route index element={<CatalogoProductos />} />
                            )
                        }   
                        {
                            rutasAutorizadas.map(ruta => (
                                <Route key={ruta.path} path={ruta.path} element={ruta.element} />
                            ))
                        }            
                    </Route>
                )
            }
            <Route path='/*' element={<NotFound />} />
        </Routes>
    );
}

export default Rutas;
