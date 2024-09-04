import {  useState, useEffect } from 'react';
import useFetchWithAuth from '@/hooks/useFetchWithAuth';
import Producto from '@/Components/productos/Producto';
import { Box } from '@mui/system';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid2';
import { useAuth } from '@/hooks/useAuth';
import rolesUsuario from '@/types/rolesUsuario';

function CatalogoProductos() {
    const { loginData: {
        usuario: { rol_idrol }
    } } = useAuth();
    const fetchWithAuth = useFetchWithAuth();
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        fetchWithAuth('/productos')
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    //console.error(data.error);
                    return;
                } else {
                    setProductos(data.productos);
                }
            });
    }, []);

    return (
        <>
            {
                rol_idrol === rolesUsuario.ADMIN && (
                    <Box display='flex' justifyContent='end' sx={{ mb: 3 }}>
                        <Button variant='contained' color='success' >Nuevo Producto</Button>
                    </Box>
                )
            }

            <Grid container spacing={3}>
                {productos.map(producto => (
                    <Grid xs={12} sm={6} md={4} lg={3} key={producto.idProductos}>
                        <Producto key={producto.id} producto={producto} />
                    </Grid>
                ))}
            </Grid>
        </>
    );
}

export default CatalogoProductos;
