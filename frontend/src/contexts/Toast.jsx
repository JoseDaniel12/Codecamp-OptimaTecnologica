import { useState, createContext } from 'react';
import { Snackbar, Alert } from '@mui/material';

export const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);

    const addToast = (toast) => {
        setToasts(prevToasts => [...prevToasts, { id: Date.now(), ...toast }]);
    };
    
    const removeToast = (id) => {
        setToasts(prevToasts => prevToasts.filter(t => t.id !== id));
    };

    return (
        <ToastContext.Provider value={{ addToast }}>
            {children}
            {toasts.map((toast, index) => (
                <Snackbar
                    key={toast.id}
                    open={true}
                    autoHideDuration={toast.life || 6000}
                    anchorOrigin={toast.position || { vertical: 'bottom', horizontal: 'right' }}
                    onClose={() => removeToast(toast.id)}
                >
                    <Alert
                        onClose={() => removeToast(toast.id)}
                        severity={toast.severity || 'info'}
                        sx={{ width: '100%' }}
                    >
                        <div>
                            <strong>{toast.title}</strong>
                            <div>{toast.message}</div>
                        </div>
                    </Alert>
                </Snackbar>
            ))}
        </ToastContext.Provider>
    )
}