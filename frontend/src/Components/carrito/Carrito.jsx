import React from 'react'
import Grid from '@mui/material/Grid2';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Card, CardContent, Typography, Button, Box } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import Contador from '@/Components/productos/Contador';

import useCarrito from '@/hooks/useCarrito';
import useFetchWithAuth from '@/hooks/useFetchWithAuth';
import { useToast } from '@/hooks/useToast';
import { RemoveShoppingCart, ShoppingBag } from '@mui/icons-material';

const Carrito = () => {
    const fetchWithAuth = useFetchWithAuth();
    const toast = useToast();
    const { carrito, limpiarCarrito, totalCarrito, quitarProducto } = useCarrito();

    const handleGenerarOrden = async () => {
        if (carrito.length === 0) {
            toast.show({
                severity: 'info',
                title: 'Carrito Vacío',
                message: 'No hay productos en el carrito'
            });
            return;
        }

        const detallesOrden = carrito.map(producto => ({
            idProductos: producto.idProductos,
            cantidad: producto.cantidad
        }));

        try {
            const response = await fetchWithAuth('/ordenes/orden', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ detallesOrden })
            });
            const data = await response.json();

            if (response.ok) {
                toast.show({
                    severity: 'success',
                    title: 'Orden Generada',
                    message: 'La orden fue generada exitosamente'
                });
                limpiarCarrito();
            } else {
                toast.show({
                    severity: 'error',
                    title: 'Error',
                    message: data.error
                });
            }

        } catch(error) {
            console.error(error);
            toast.show({
                severity: 'error',
                title: 'Error',
                message: 'Ocurrió un error al generar la orden'
            });
        }
    };

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
                                <TableCell>Subtotal</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                carrito.map(producto => (
                                    <TableRow key={producto.idProductos} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                        <TableCell sx={{ display: 'flex', alignItems: 'center', gap: 1}}>
                                            <img height={50} width={60} src={producto.foto ? `data:image/png;base64,${producto.foto}` : 'https://via.placeholder.com/60x50'}/>
                                            {producto.nombre}
                                        </TableCell>
                                        <TableCell>{producto.precio}</TableCell>
                                        <TableCell>
                                            <Contador producto={producto} />
                                        </TableCell>
                                        <TableCell>{producto.precio * producto.cantidad}</TableCell>
                                        <TableCell>
                                            <Button onClick={() => quitarProducto(producto)}>
                                                <ClearIcon />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            }
                            <TableRow>
                                <TableCell colSpan={3} sx={{ textAlign: 'right' }}>Total:</TableCell>
                                <TableCell> {totalCarrito}</TableCell>
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
                                $ {totalCarrito}
                            </Typography>
                        </Box>
                        <Button
                            variant="contained"
                            startIcon={<ShoppingBag />}
                            fullWidth
                            sx={{
                                backgroundColor: '#8DC63F',
                                '&:hover': {
                                backgroundColor: '#7AB62F',
                                },
                                mb: 1
                            }}
                            onClick={handleGenerarOrden}
                        >
                            Generar Orden
                        </Button>
                        <Button
                            variant="contained"
                            startIcon={<RemoveShoppingCart />}
                            fullWidth
                            sx={{
                                backgroundColor: '#FF5C5C',
                                '&:hover': {
                                backgroundColor: '#FF4C4C',
                                },
                            }}
                            onClick={() => limpiarCarrito()}
                        >
                            Vaciar Carrito
                        </Button>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
}

export default Carrito;
