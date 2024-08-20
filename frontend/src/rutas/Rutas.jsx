import { Routes, Route } from 'react-router-dom';
import Dashboard from '/src/Components/UI/Dashboard';
import Login from '/src/Components/Auth/Login';

function Rutas() {
    const rutas = (
        <>
            <Route index element={<Login/>} />
        </>
    );

    return (
        <Routes>
            <Route path="/" element={<Dashboard/>}>
                {rutas} 
            </Route>
        </Routes>
    );
}

export default Rutas;
