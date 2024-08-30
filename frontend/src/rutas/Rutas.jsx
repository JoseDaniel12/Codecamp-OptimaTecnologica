import { Routes, Route } from 'react-router-dom';
import Dashboard from '@/components/UI/Dashboard';

import Login from '@/components/Auth/Login';
import Registro from '@/components/Auth/Registro';
import { useAuth } from '@/hooks/useAuth';

function Rutas() {
    const { loginData, rutasAutorizadas } = useAuth();

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
                    </Route>
                )
            }
        </Routes>
    );
}

export default Rutas;
