import { useNavigate } from 'react-router-dom';
import { Button, Container, Typography, Box } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

function NotFound() {
    const navigate = useNavigate();

    return (
        <Container maxWidth='sm'>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100vh'
                }}
            >
                <ErrorOutlineIcon sx={{ fontSize: 100, color: 'error.main', mb: 4 }} />
                <Typography variant='h1' gutterBottom>
                    404
                </Typography>
                <Typography variant='h5' gutterBottom>
                    Oops! Página no encontrada.
                </Typography>
                <Typography variant='body1' component='p' marginY={2}>
                    Lo sentimos, la página que estás buscando no existe o ha sido movida.
                </Typography>
                <Button
                    variant='contained'
                    onClick={() => navigate('/')}
                    sx={{ mt: 2 }}
                >
                    Volver a la página principal
                </Button>
            </Box>
        </Container>
    );
}

export default NotFound;