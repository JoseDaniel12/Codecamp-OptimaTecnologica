import { Card, CardContent, CardHeader, Typography, Box, CardActions, Button } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { styled } from '@mui/material/styles';
import { CalendarToday, Person, LocationOn, Phone, Email, LocalShipping, AttachMoney, CheckCircle } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '@/hooks/useAuth';

function Orden({ orden }) {
    const navigate = useNavigate();

    const IconWrapper = styled(Box)(({ theme }) => ({
        marginRight: theme.spacing(2),
        color: theme.palette.primary.main,
      }));

    const formatDate = (dateString) => {
        if (!dateString) return "No especificada";
        const date = new Date(dateString);
        return date.toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });
    };

    return (
        <Card>
            <CardContent>
                <Grid container spacing={1}>
                    <Grid xs={12}>
                        <Box display='flex' alignItems='center'>
                            <IconWrapper>
                                <CalendarToday />
                            </IconWrapper>
                            <Typography variant="body2">{formatDate(orden.fecha_creacion)}</Typography>
                        </Box>
                    </Grid>
                    <Grid size={12}>
                        <Box display='flex' alignItems='center'>
                            <IconWrapper>
                                <Person />
                            </IconWrapper>
                            <Typography variant="body2">{orden.nombre_completo}</Typography>
                        </Box>
                    </Grid>
                    <Grid size={12}>
                        <Box display='flex' alignItems='center'>
                            <IconWrapper>
                                <LocationOn />
                            </IconWrapper>
                            <Typography variant="body2">{orden.direccion}</Typography>
                        </Box>
                    </Grid>
                    <Grid size={12}>
                        <Box display='flex' alignItems='center'>
                            <IconWrapper>
                                <Phone />
                            </IconWrapper>
                            <Typography variant="body2">{orden.telefono}</Typography>
                        </Box>
                    </Grid>
                    <Grid size={12}>
                        <Box display='flex' alignItems='center'>
                            <IconWrapper>
                                <LocalShipping />
                            </IconWrapper>
                            <Typography variant="body2">{orden.fecha_entrega}</Typography>
                        </Box>
                    </Grid>
                    <Grid size={12}>
                        <Box display='flex' alignItems='center'>
                            <IconWrapper>
                                <AttachMoney />
                            </IconWrapper>
                            <Typography variant="body2">${orden.total_orden}</Typography>
                        </Box>
                    </Grid>
                    <Grid size={12}>
                        <Box display='flex' alignItems='center'>
                            <IconWrapper>
                                <CheckCircle />
                            </IconWrapper>
                            <Typography variant="body2">{orden.estado}</Typography>
                        </Box>
                    </Grid>
                </Grid>
            </CardContent>
            <CardActions sx={{ display: 'flex', justifyContent: 'center'}}>
                <Button size="small" onClick={() => navigate(`/detalles-orden/${orden.idOrden}`)}>
                    Ver Detalles
                </Button>
            </CardActions>
        </Card>
    );
}

export default Orden;
