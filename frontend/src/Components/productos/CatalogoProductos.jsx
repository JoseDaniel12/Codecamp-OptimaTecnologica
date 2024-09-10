import {  useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useFetchWithAuth from '@/hooks/useFetchWithAuth';
import Producto from '@/Components/productos/Producto';
import TextField from '@mui/material/TextField';
import InputAdornment, { inputAdornmentClasses } from '@mui/material/InputAdornment';
import { Search } from '@mui/icons-material';
import { Box } from '@mui/system';
import Button from '@mui/material/Button';
import { Add } from '@mui/icons-material';
import Grid from '@mui/material/Grid2';
import { clean } from 'diacritic';
import { useAuth } from '@/hooks/useAuth';
import rolesUsuario from '@/types/rolesUsuario';

import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';


import useDebounce from '@/hooks/useDebounce';

function CatalogoProductos() {
    const { loginData: {
        usuario: { rol_idrol }
    } } = useAuth();
    const navigate = useNavigate();
    const fetchWithAuth = useFetchWithAuth();

    const [productos, setProductos] = useState([]);
    const [productosFiltrados, setProductosFiltrados] = useState([]);
    const [search, setSearch] = useState('');
    const debounceSearch = useDebounce(search);

    const [currentPage, setCurrentPage] = useState(1);
    const [currentPageBackup, setCurrentPageBackup] = useState(1);
    const [productsPerPage, setProductsPerPage] = useState(8);
    const lastProductIndex = currentPage * productsPerPage;
    const firstProductIndex = lastProductIndex - productsPerPage;

    const handleClearSearch = () => {
        setCurrentPage(currentPageBackup);
        setProductosFiltrados(productos);
    }

    const handleSearch = (searchValue) => {
        if (currentPageBackup !== currentPage) {
            setCurrentPageBackup(currentPage);
        }
        const filteredProducts = productos.filter(p =>
            clean(p.nombre.toLowerCase()).includes(clean(searchValue.toLowerCase()))
        );
        setProductosFiltrados(filteredProducts);
        setCurrentPage(1);
    };


    const paginator = (
        <Grid size={12} >
            <Stack direction='row' justifyContent='center'>
                <Pagination 
                    count={Math.ceil(productosFiltrados.length / productsPerPage)}
                    page={currentPage}
                    onChange={(e, page) => setCurrentPage(page)}
                />
            </Stack>
        </Grid>
    );
    
    
    useEffect(() => {
        if (debounceSearch === '') {
            handleClearSearch();
        } else {
            handleSearch(debounceSearch);
        }
    }, [debounceSearch]);


    useEffect(() => {
        fetchWithAuth('/productos')
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    console.error(data.error);
                    return;
                } else {
                    const productos = data.productos;
                    setProductos(productos);
                    setProductosFiltrados(productos);
                }
            });
    }, []);

    
    return (
        <Box>
            <Grid container spacing={1} mb={4}>
                <Grid size={{ xs: 12, md: rol_idrol === rolesUsuario.ADMIN? 'grow' : 12 }} >
                    <TextField
                        variant='outlined'
                        size='small'
                        fullWidth
                        label='Buscar Producto por Nombre'
                        sx={{ '& .MuiInputBase-root': {
                            backgroundColor: 'whitesmoke'
                        } }}
                        slotProps={{
                            input: {
                                endAdornment: (
                                    <InputAdornment position='end'>
                                        <Search />
                                    </InputAdornment>
                                )
                            }
                        }}
                        autoComplete='off'
                        onChange={e => setSearch(e.target.value)}
                    />
                </Grid>
                
                <Grid size={{ xs: 12, md: 'auto'}}>
                    {
                        rol_idrol === rolesUsuario.ADMIN && (
                            <Button 
                                fullWidth
                                variant='contained' color='success'
                                onClick={() => navigate('/crear-producto')}
                                startIcon={<Add />} 
                                sx={{ height: '100%' }}
                            >
                                Crear Producto
                            </Button>
                        )
                    }   
                </Grid>
            </Grid>


            <Grid container spacing={3} >
                {paginator}

                {
                    productosFiltrados.slice(firstProductIndex, lastProductIndex).map(producto => (
                        <Grid  key={producto.idProductos} sx={{
                            margin: {
                                xs: '0 auto',
                                md: 0
                            }
                        }}>
                            <Producto producto={producto} />
                        </Grid>
                    ))
                }

                {!!productosFiltrados.length && paginator}
            </Grid>
        </Box>
    );
}

export default CatalogoProductos;
