import { Card, CardContent, CardHeader, Typography, Box, CardActions, Button, Chip } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { styled } from '@mui/material/styles';
import { CalendarToday, Person, LocationOn, Phone, Email, LocalShipping, AttachMoney, CheckCircle, ThumbDown } from '@mui/icons-material';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import { useNavigate } from 'react-router-dom';

import estados from '@/types/estados';

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

    const renderEstado = () => {
        switch (orden.estados_idestados) {
            case estados.CONFIRMADO:
                return <Chip label="Confirmado" color="warning"  icon={<HourglassTopIcon fontSize='small' />}/>;
            case estados.ENTREGADO:
                return <Chip label="Entregado" color="success" icon={<CheckCircle />} />;
            case estados.RECHAZADO:
                return <Chip label="Rechazado" color="error" icon={<ThumbDown fontSize='small'/>} />;
        }

    }

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
                            <Typography variant="body2">{orden.fecha_entrega || 'Sin Entregar'}</Typography>
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
                            {renderEstado()}
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
