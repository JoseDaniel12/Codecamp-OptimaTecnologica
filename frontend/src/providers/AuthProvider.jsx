import { useLocalStorage } from '@/hooks/useLocalStorage';
import listadoRutas from '@/rutas/listadoRutas';

import AuthContext from '@/contexts/Auth';

export const AuthProvider = ({ children }) => {
    const [loginData, setLoginData] = useLocalStorage('loginDataOptimaTecnologia', null);

    const logOut = () => {
        setLoginData(null);
        localStorage.removeItem('loginDataOptimaTecnologia');
    }

    const rutasAutorizadas = loginData ? listadoRutas.filter(ruta => {
        if (ruta.roles && ruta.roles.length) return ruta.roles.includes(loginData.usuario.rol_idrol);
        return true;
    }) : [];


    return (
        <AuthContext.Provider value={{ loginData, logOut, setLoginData, rutasAutorizadas }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;