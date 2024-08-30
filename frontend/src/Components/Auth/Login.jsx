import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useState } from 'react';
import Container from '@mui/material/Container';
import { Box } from '@mui/material';
import { Link, Typography } from '@mui/material';
import { TextField } from '@mui/material';
import { Button } from '@mui/material';
import useFetchWithAuth from '@/hooks/useFetchWithAuth';

function Login() {
    const { setLoginData } = useAuth();
    const navigate = useNavigate();
    const fetchWithAuth = useFetchWithAuth();

    const [correo, setCorreo] = useState('');
    const [contrasenia, setContrasenia] = useState('');

    const handleLogin = async e => {
        e.preventDefault();
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
            console.log(response.error);
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

                <Box component='form' onSubmit={handleLogin} noValidate sx={{ mt: 1 }}>
                    <TextField
                        required
                        fullWidth
                        margin='normal'
                        id='correo'
                        name='correo'
                        label='Correo'
                        autoComplete='email'
                        autoFocus
                        onChange={e => setCorreo(e.target.value)}
                    />
                    <TextField
                        required
                        type='password'
                        fullWidth
                        margin='normal'
                        id='contrasenia'
                        name='contrasenia'
                        label='Contraseña'
                        autoComplete='current-password'
                        onChange={e => setContrasenia(e.target.value)}
                    />
                    <Button
                        type='submit'
                        variant='contained'
                        fullWidth
                        sx={{ my: 2 }}
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
