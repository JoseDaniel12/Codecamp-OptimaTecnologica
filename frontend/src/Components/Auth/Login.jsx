import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useForm } from 'react-hook-form';
import  { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import { TextField } from '@mui/material';
import { Button } from '@mui/material';
import useFetchWithAuth from '@/hooks/useFetchWithAuth';

import { useToast } from '@/hooks/useToast';

function Login() {
    const { setLoginData } = useAuth();
    const toast = useToast();
    const navigate = useNavigate();
    const fetchWithAuth = useFetchWithAuth();

    const schema = yup.object().shape({
        correo: yup.string().email('Formato de correo invalido.').required('Correo es requerido.'),
        contrasenia: yup.string().required('Contraseña es requerida.'),
    });

    const form = useForm({
        defaultValues: {
            correo: '',
            contrasenia: '',
        },
        resolver: yupResolver(schema),
        mode: 'onSubmit'
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = form;

    const handleLogin = async (datos) => {
        const { correo, contrasenia } = datos;
        const response = await fetchWithAuth('/autenticacion/login', {
            method: 'POST',
            body: JSON.stringify({ 
                correo_electronico: correo, 
                password: contrasenia
            }),
        })
        const data = await response.json();

        if (!response.ok) {
            setLoginData(null);
            toast.show({
                severity: 'error',
                title: 'Error',
                message: data.error,
                life: 3000,
            })
        } else {
            setLoginData(data);
            navigate('/');
        }
    };

    return (
        <Container component='main' maxWidth='xs'>
            <Box
                sx={{
                    marginTop: '5rem',
                    backgroundColor: 'whitesmoke',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: '20px',
                    borderRadius: '10px',
                }}
            >
                <Typography component='h1' variant='h5'>
                    Login
                </Typography>

                <Box sx={{ mt: 1 }}>
                    <TextField
                        required
                        fullWidth
                        margin='normal'
                        id='correo'
                        name='correo'
                        label='Correo'
                        autoComplete='email'
                        autoFocus
                        {...register('correo')}
                        error={!!errors.correo}
                        helperText={errors.correo?.message}
                    />
                    <TextField
                        required
                        type='password'
                        fullWidth
                        margin='normal'
                        id='contrasenia'
                        name='contrasenia'
                        label='Contraseña'
                        {...register('contrasenia')}
                        error={!!errors.contrasenia}
                        helperText={errors.contrasenia?.message}
                    />
                    <Button
                        variant='contained'
                        fullWidth
                        sx={{ my: 2 }}
                        onClick={handleSubmit(handleLogin)}
                    >
                        Iniciar Sesion
                    </Button>
                </Box>
                <Typography
                    component='a'
                    variant='body2'
                    sx={{ cursor: 'pointer', color: '#1976d2' }}
                    onClick={() => navigate('/registro')}
                >
                    ¿No tienes una cuenta? Registrate
                </Typography>
            </Box>
        </Container>
    );
}

export default Login;
