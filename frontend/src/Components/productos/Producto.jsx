import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardMedia, Typography, Chip, Button, Box } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { Category, AttachMoney, Inventory, Edit} from '@mui/icons-material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Contador from '@/Components/productos/Contador';

import { useAuth } from '@/hooks/useAuth';
import useCarrito from '@/hooks/useCarrito';
import rolesUsuario from '@/types/rolesUsuario';
import estados from '@/types/estados';
import formatFecha from '@/utils/formatters';

function Producto({ producto }) {
    const { loginData: { usuario } } = useAuth();
    const { carrito, agregarProducto } = useCarrito();
    const navigate = useNavigate();

    const estaActivo = producto.estados_idestados === estados.ACTIVO;
    const fechaCreacionFormateada = formatFecha(producto.fecha_creacion);
    const productoEnCarrito = carrito.find(p => p.idProductos === producto.idProductos);

    const renderAccionesProducto = () => {
        if (usuario.rol_idrol === rolesUsuario.ADMIN) {
            return (
                <Button
                    variant='outlined' color='primary'
                    startIcon={<Edit />}
                    fullWidth
                    onClick={() => navigate(`/productos/editar/${producto.idProductos}`)}
                >
                    Editar
                </Button>
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
                startIcon={<AddShoppingCartIcon />}
                onClick={() => agregarProducto(producto)}
                disabled={producto.stock === 0}
            >
                Añadir a Carrito
            </Button>
        );
    };


    return (
        <Card sx={{ width: 270, minHeight: 490 }}>
            <img
                component='img'
                style={{ width: 270, height: 200, boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}
                src={producto.foto ? `data:image/png;base64,${producto.foto}` : 'https://via.placeholder.com/270x200'}
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

                    {
                        usuario.rol_idrol === rolesUsuario.ADMIN && (
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
                        )
                    }

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
