import { useState, useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Card, CardContent, Typography, Button, Box, CardActionArea } from '@mui/material';
import { ArrowBack, LocalShipping, Block } from '@mui/icons-material';
import Grid from '@mui/material/Grid2';

import useFetchWithAuth from '@/hooks/useFetchWithAuth';
import { useAuth } from '@/hooks/useAuth'
import { useToast } from '@/hooks/useToast';
import estados from '@/types/estados'
import rolesUsuario from '@/types/rolesUsuario';

function DetallesOrden() {
    const navigate = useNavigate();
    const { idOrden } = useParams();

    const [orden, setOrden] = useState({});

    const { loginData: { usuario } } = useAuth();

    const fetchWithAuth = useFetchWithAuth();
    const toast = useToast();

    const [detalles, setDetalles] = useState([]);

    const obtenerDetallesOrden = async () => {
        try {
            const response = await fetchWithAuth(`/ordenes/orden/${idOrden}/detalles`);
            const data = await response.json();
            if (response.ok) {
                setDetalles(data.detallesOrden);
            } else {
                toast.show({
                    title: 'Error al obtener los detalles de la orden',
                    message: data.error,
                    type: 'error',
                });
            }
        } catch (error) {
            toast.show({
                title: 'Error al obtener los detalles de la orden',
                message: error.message,
                type: 'error',
            });
        }
    };

    const handleProcesarOrden = async (newStateId) => {
        try {
            const response = await fetchWithAuth(`/ordenes/orden/${orden.idOrden}/procesar`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ idEstado: newStateId }),
            });
            const data = await response.json();
            if (response.ok) {
                const ordenProcesada = data.orden;
                setOrden(prev => {
                    return {
                        ...prev,
                        estados_idestados: ordenProcesada.estados_idestados,
                        fecha_entrega: ordenProcesada.fecha_entrega,
                    };
                });
                toast.show({
                    title: 'Orden procesada',
                    message: 'La orden se ha procesado correctamente.',
                    type: 'success',
                });
            } else {
                toast.show({
                    title: 'Error al procesar la orden',
                    message: data.error,
                    type: 'error',
                });
            }
        } catch (error) {
            toast.show({
                title: 'Error al procesar la orden',
                message: error.message,
                type: 'error',
            });
        }
    };


    const renderEstadoOrden = () => {
        let color;
        let mensaje;
        switch (orden.estados_idestados) {
            case estados.ENTREGADO:
                color = '#85a458';
                mensaje = 'Entregada';
                break;
            case estados.RECHAZADO:
                color = '#c16262';
                mensaje = 'Rechazada';
                break;
            default:
                color = '#627fc1';
                mensaje = 'Confirmada';
                break;
        }

        return (
            <Box
                sx={{
                    backgroundColor: color,
                    color: 'white',
                    textAlign: 'center',
                    p: 1
                }}
            >
                <Typography variant="body1">
                    {mensaje}
                </Typography>
            </Box>
        );
    };

    const obtenerDatosOrden = async () => {
        try {
            const response = await fetchWithAuth(`/ordenes/orden/${idOrden}`);
            const data = await response.json();
            if (response.ok) {
                setOrden(data.orden);
            } else {
                toast.show({
                    title: 'Error al obtener los detalles de la orden',
                    message: data.error,
                    type: 'error',
                });
            }
        } catch (error) {
            toast.show({
                title: 'Error al obtener los detalles de la orden',
                message: error.message,
                type: 'error',
            });
        }
    }



    useEffect(() => {
        obtenerDatosOrden();
        obtenerDetallesOrden();
    }, []);

    return (
        <Grid container spacing={2}>

            <Grid size={12}>
                <Box>
                    <IconButton
                        variant='outlined'
                        color='primary'
                        onClick={() => navigate(-1)}
                        sx={{ 
                            position: 'absolute',
                      }}
                    >
                        <ArrowBack />
                    </IconButton>
                </Box>
                <Typography align='center' component='h1' variant='h5' sx={{ mb: 1 }}>
                    Detalles de Orden
                </Typography>
            </Grid>

            <Grid size={{ xs: 12, md: 8 }}>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Prodcuto</TableCell>
                                <TableCell>Precio</TableCell>
                                <TableCell>Cantidad</TableCell>
                                <TableCell>Total</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                detalles.map(detalle => (
                                    <TableRow key={detalle.idOrdenDetalles}>
                                        <TableCell>{detalle.producto}</TableCell>
                                        <TableCell>{detalle.precio}</TableCell>
                                        <TableCell>{detalle.cantidad}</TableCell>
                                        <TableCell>{detalle.precio * detalle.cantidad}</TableCell>
                                    </TableRow>
                                ))
                            }
                            <TableRow>
                                <TableCell colSpan={3} sx={{ textAlign: 'right' }}>Total:</TableCell>
                                <TableCell> {orden.total_orden}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>

            
            <Grid size={{ xs: 12, md: 4 }}>
                <Card>
                    <CardContent>
                        <Typography variant="h6" gutterBottom>
                            Resumen de la Orden
                        </Typography>

                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                            <Typography variant="body1">Total</Typography>
                            <Typography variant="body1" fontWeight="bold" color="primary">
                                $ {orden.total_orden}
                            </Typography>
                        </Box>

                        {renderEstadoOrden()}

                        {
                            usuario.rol_idrol === rolesUsuario.ADMIN && orden.estados_idestados === estados.CONFIRMADO &&
                            <Grid container spacing={1} mt={2}>
                                <Grid size={6}>
                                    <Button
                                        variant="contained"
                                        startIcon={<LocalShipping />}
                                        fullWidth
                                        sx={{
                                            backgroundColor: '#8DC63F',
                                            '&:hover': {
                                            backgroundColor: '#7AB62F',
                                            },
                                            mb: 1
                                        }}
                                        onClick={() => handleProcesarOrden(estados.ENTREGADO)}
                                    >
                                        Entregar
                                    </Button>
                                </Grid>
                                <Grid size={6}>
                                    <Button
                                        variant="contained"
                                        startIcon={<Block />}
                                        fullWidth
                                        sx={{
                                            backgroundColor: '#FF5C5C',
                                            '&:hover': {
                                            backgroundColor: '#FF4C4C',
                                            },
                                        }}
                                        onClick={() => handleProcesarOrden(estados.RECHAZADO)}
                                    >
                                        Rechazar
                                    </Button>
                                </Grid>
                            </Grid>
                        }


                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
}

export default DetallesOrden;
