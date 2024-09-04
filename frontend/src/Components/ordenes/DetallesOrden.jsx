import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Card, CardContent, Typography, Button, Box, CardActionArea } from '@mui/material';
import Grid from '@mui/material/Grid2';

import useFetchWithAuth from '@/hooks/useFetchWithAuth';
import { useAuth } from '@/hooks/useAuth'
import { useToast } from '@/hooks/useToast';
import estados from '@/types/estados'
import rolesUsuario from '@/types/rolesUsuario';

function DetallesOrden() {
    const location = useLocation();
    let orden = location.state.orden;

    const { loginData: { usuario } } = useAuth();

    const fetchWithAuth = useFetchWithAuth();
    const toast = useToast();

    const [detalles, setDetalles] = useState([]);

    const obtenerDetallesOrden = async () => {
        try {
            const response = await fetchWithAuth(`/ordenes/orden/${orden.idOrden}/detalles`);
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
                orden.estados_idestados = ordenProcesada.estados_idestados;
                orden.fecha_entrega = ordenProcesada.fecha_entrega;
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
    }

    useEffect(() => {
        obtenerDetallesOrden();
    }, []);

    return (
        <Grid container spacing={2}>
            <Grid size={{ sm: 12, md: 8 }}>
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
                                    <TableRow key={detalle.idProductos} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
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

            
            <Grid size={{ sm: 12, md: 4 }}>
                <Card sx={{ maxWidth: 300 }}>
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
                        <Box>
                            {
                                orden.estados_idestados === estados.CONFIRMADO ? (
                                    <>
                                        <Button
                                            variant="contained"
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
                                        <Button
                                            variant="contained"
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
                                    </>

                                ) : (
                                    <>
                                        <Box
                                            sx={{
                                                backgroundColor: orden.estados_idestados === estados.ENTREGADO ? '#85a458' : '#c16262',
                                                color: 'white',
                                                textAlign: 'center',
                                                borderRadius: 1,
                                                p: 1
                                            }}
                                        >
                                            <Typography variant="body1">
                                                {orden.estados_idestados === estados.ENTREGADO ? 'Entregada' : 'Rechazada'}
                                            </Typography>
                                        </Box>
                                    </>
                                )

                            }

                        </Box>

                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
}

export default DetallesOrden;
