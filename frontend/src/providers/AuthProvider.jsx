import { useLocalStorage } from '@/hooks/useLocalStorage';
import listadoRutas from '@/rutas/listadoRutas';

import AuthContext from '@/contexts/Auth';

export const AuthProvider = ({ children }) => {
    const [loginData, setLoginData] = useLocalStorage('loginDataOptimaTecnologia', null);

    const rutasAutorizadas = loginData ? listadoRutas.filter(ruta => {
        if (ruta.roles && ruta.roles.length) return ruta.roles.includes(loginData.usuario.rol_idrol);
        return true;
    }) : [];


    return (
        <AuthContext.Provider value={{ loginData, setLoginData, rutasAutorizadas }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;