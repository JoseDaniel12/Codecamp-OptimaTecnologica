import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardMedia, Typography, Chip, Button, Box } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { Category, AttachMoney, Inventory } from '@mui/icons-material';
import estados from '@/types/estados';
import  { formatFecha } from '@/utils/formatters';
import Contador from '@/Components/productos/Contador';

import useCarrito from '@/hooks/useCarrito';
import { useAuth } from '@/hooks/useAuth';
import rolesUsuario from '@/types/rolesUsuario';


function Producto({ producto }) {
    const { carrito, agregarProducto } = useCarrito();
    const { loginData: { usuario } } = useAuth();
    const navigate = useNavigate();

    const estaActivo = producto.estados_idestados === estados.ACTIVO;
    const fechaCreacionFormateada = formatFecha(producto.fecha_creacion);
    const productoEnCarrito = carrito.find(p => p.idProductos === producto.idProductos);

    const renderAccionesProducto = () => {
        if (usuario.rol_idrol === rolesUsuario.ADMIN) {
            return (
                <Box display='flex' justifyContent='space-between' mt={2}>
                    <Button variant='outlined' color='primary'
                        onClick={() => navigate(`/productos/editar/${producto.idProductos}`)}
                    >
                        Editar
                    </Button>
                    <Button variant='outlined' color='error'>
                        Eliminar
                    </Button>
                </Box>
            );
        } 

        if (productoEnCarrito) {
            return (
                <Contador producto={producto} />
            );
        }  
        
        return (
            <Button 
                variant='contained' color='success' fullWidth
                onClick={() => agregarProducto(producto)}
                disabled={producto.stock === 0}
            >
                Añadir a Carrito
            </Button>
        );
    };


    return (
        <Card sx={{ width: 270, height: 490 }}>
            <CardMedia
                component='img'
                height='200'
                image={producto.foto ? `data:image/png;base64,${producto.foto}` : 'https://via.placeholder.com/200'}
           
            />
            <CardContent>

                <Grid container spacing={1} mb={1}>
                    <Grid size={12} >
                        <Typography gutterBottom variant='h5' component='span'>
                            {producto.nombre}
                        </Typography>

                        <Box display='flex' alignItems='center' >
                            <Typography variant='body1' component='span'>
                                ({producto.marca})
                            </Typography>
                        </Box>
                    </Grid>

                    <Grid size={12} display='flex' alignItems='center' gap={1}>
                        <Typography variant='body2' color='text.secondary'>
                            Código: {producto.codigo}
                        </Typography>
                        <Chip 
                            label={estaActivo? 'Activo' : 'Inactivo'}
                            color={estaActivo ? 'success' : 'error'}
                            size='small'
                        />
                    </Grid>

                    <Grid size={12}>
                        <Box display='flex' alignItems='center' >
                            <Category/>
                            <Typography variant='body1' component='span' ml={1}>
                                {producto.categoria}
                            </Typography>
                        </Box>
                    </Grid>

                    <Grid size={12}>
                        <Box display='flex' alignItems='center' >
                            <AttachMoney/>
                            <Typography variant='body1' component='span' ml={1}>
                                {producto.precio}
                            </Typography>
                        </Box>
                    </Grid>

                    <Grid size={12}>
                        <Box display='flex' alignItems='center' >
                            <Inventory/>
                            <Typography variant='body1' component='span' ml={1}>
                                {producto.stock}
                            </Typography>
                        </Box>
                    </Grid>

                    <Grid size={12}>
                        <Typography variant='body2' color='text.secondary'>
                            Creado el {fechaCreacionFormateada}
                        </Typography>
                    </Grid>

    
                </Grid>

                {renderAccionesProducto()}
            </CardContent>
        </Card>
    );
}

export default Producto;
