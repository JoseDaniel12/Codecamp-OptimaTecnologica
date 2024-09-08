import { useAuth } from '@/hooks/useAuth';
import requestSettings, { backendUrl } from '@/api/requestSettings';

const useFetchWithAuth = () => {
    const { loginData } = useAuth();
    const access_token = loginData?.access_token;

    return async (path, options = {}) => {   
        const headers = {
            ...requestSettings.headers,
            ...options.headers
        };

        if (options.formData) delete headers['Content-Type'];

        if (access_token) headers.access_token = access_token;

        options = {
            ...requestSettings,
            ...options,
            headers
        };
        
        const url = `${backendUrl}${path}`;
        const response = await fetch(url, options);

        return response;
    };
};

export default useFetchWithAuth;