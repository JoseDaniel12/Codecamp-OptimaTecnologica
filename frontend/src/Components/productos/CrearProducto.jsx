import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import  { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Box, Typography, Button, TextField, FormControl, FormHelperText, Select, InputLabel, MenuItem } from '@mui/material'
import Grid from '@mui/material/Grid2'

import useFetchWithAuth from '@/hooks/useFetchWithAuth';
import { useToast } from '@/hooks/useToast';
import { set } from 'date-fns';

function CrearProducto() {
    const toast = useToast();
    const navigate = useNavigate();
    const fetchWithAuth = useFetchWithAuth();

    const [categorias, setCategorias] = useState([]);
    const [selectedImageURL, setSelectedImageURL] = useState(null);
    const [foto, setFoto] = useState(null);

    const schema = yup.object().shape({
        CategoriaProductos_idCategoriaProductos: yup.number().positive().required('Categoria requerida'),
        nombre: yup.string().required('Nombre requerido'),
        marca: yup.string().required('Marca Requerida'),
        codigo: yup.string().required('Codigo requerido'),
        stock: yup.number().required('Stock requerido'),
        precio: yup.number().required('Precio requerido')
    });

    const form = useForm({
        defaultValues: {
            CategoriaProductos_idCategoriaProductos: '',
            nombre: '',
            marca: '',
            codigo: '',
            stock: '',
            precio: ''
        },
        resolver: yupResolver(schema),
        mode: 'onSumbit'
    });

    const {
        watch,
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = form;

    const handleCambiarImagen = e => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setFoto(file);
            setSelectedImageURL(imageUrl);
        }
    };

    const handleCrearProducto = async datosProducto => {
        try {
            const formData = new FormData();
            for (const key in datosProducto) {
                if (key === 'foto') continue;
                formData.set(key, datosProducto[key]);
            }
            if (foto) formData.set('foto', foto);

            const response = await fetchWithAuth('/productos/producto', {
                method: 'POST',
                body: formData,
                formData: true
            });
            const data = await response.json();

            if (response.ok) {
                form.reset();
                setSelectedImageURL(null);
                setFoto(null);
                toast.show({
                    severity: 'success',
                    title: 'Producto creado',
                    message: 'El producto se ha creado correctamente.'
                });
                navigate('/productos');
            } else {
                toast.show({
                    severity: 'error',
                    title: 'Error al crear producto',
                    message: data.error || 'Ha ocurrido un error al crear el producto.'
                });
            }   
        } catch (error) {
            toast.show({
                severity: 'error',
                title: 'Error al crear producto',
                message: 'Ha ocurrido un error al crear el producto.'
            });
        }
    };

    useEffect(() => {
        fetchWithAuth('/categorias')
            .then(response => response.json())
            .then(data => {
                setCategorias(data.categorias);
            })
            .catch(error => console.error(error));
    }, []);

    return (
        <Box width={800} backgroundColor='#f1f3f4' padding={2} borderRadius={1} mx='auto'>
            <Typography align='center' component='h1' variant='h5' sx={{ mb: 1 }}>
                Crear Producto
            </Typography>

            <Grid container spacing={1}>
                <Grid size={6} container rowSpacing={2} columnSpacing={1}>
                    <Grid size={12}>
                        <Controller
                            name='nombre'
                            control={form.control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    required
                                    fullWidth
                                    id='nombre'
                                    name='nombre'
                                    label='Nombre'
                                    autoFocus
                                    {...register('nombre')}
                                    error={!!errors.nombre}
                                    helperText={errors.nombre?.message}
                                />
                            )}
                        />  
                    </Grid>

                    <Grid size={6}>
                        <Controller
                            name='marca'
                            control={form.control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    required
                                    fullWidth
                                    id='marca'
                                    name='marca'
                                    label='Marca'
                                    autoComplete='marca'
                                    error={!!errors.marca}
                                    helperText={errors.marca?.message}
                                />
                            )}
                        />

                    </Grid>

                    <Grid size={6}>
                        <Controller
                            name='codigo'
                            control={form.control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    required
                                    fullWidth
                                    id='codigo'
                                    name='codigo'
                                    label='Codigo'
                                    autoComplete='codigo'
                                    error={!!errors.codigo}
                                    helperText={errors.codigo?.message}
                                />
                            )}
                        />
                    </Grid>

                    <Grid size={6}>
                        <Controller
                            name='stock'
                            control={form.control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    required
                                    type='number'
                                    fullWidth
                                    id='stock'
                                    name='stock'
                                    label='Stock'
                                    slotProps={{
                                        inputMode: 'numeric',
                                        pattern: '[0-9]*'
                                    }}
                                    error={!!errors.stock}
                                    helperText={errors.stock?.message}
                                />
                            )}
                        />
                    </Grid>

                    <Grid size={6}>
                        <Controller
                            name='precio'
                            control={form.control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    required
                                    type='number'
                                    fullWidth
                                    id='precio'
                                    name='precio'
                                    label='Precio'
                                    slotProps={{
                                        inputMode: 'numeric',
                                        pattern: '[0-9]*'
                                    }}
                                    error={!!errors.precio}
                                    helperText={errors.precio?.message}
                                />
                            )}
                        />

                    </Grid>

                    <Grid size={12}>
                        <FormControl fullWidth error={!!errors.CategoriaProductos_idCategoriaProductos}>
                            <InputLabel id='categoria-label'>Categoria</InputLabel>
                            <Controller
                                name='CategoriaProductos_idCategoriaProductos'
                                control={form.control}
                                render = {({ field }) => (
                                    <Select
                                        fullWidth
                                        id='CategoriaProductos_idCategoriaProductos'
                                        label='Categoria'
                                        {...field}
                                    >
                                        {
                                            categorias.map(categoria => (
                                                <MenuItem key={categoria.idCategoriaProductos} value={categoria.idCategoriaProductos}>
                                                    {categoria.nombre}
                                                </MenuItem>
                                            ))
                                        }
                                    </Select>
                                )}
                            />
                            <FormHelperText>{errors.CategoriaProductos_idCategoriaProductos?.message}</FormHelperText>
                        </FormControl>
                    </Grid>
                </Grid>

                <Grid size={6} >
                    <input
                        accept='image/*'
                        style={{ display: 'none' }}
                        id='image-upload'
                        type='file'
                        onChange={handleCambiarImagen}
                    />
                    <label htmlFor='image-upload'>
                        <Button  component='span' sx={{ mb: 1, width:'100%' }}>
                            Cambiar Foto
                        </Button>
                    </label>
                    <Box sx={{ maxWidth: '100%', overflow: 'hidden' }}>
                        <img 
                            src={selectedImageURL || 'https://via.placeholder.com/200'}
                            alt='Imagen seleccionada'
                            style={{ maxWidth: '100%', height: 'auto' }}
                        />
                    </Box>
                </Grid>

                <Grid size={12}>
                    <Button
                        type='submit'
                        fullWidth
                        variant='contained'
                        color='primary'
                        onClick={handleSubmit(handleCrearProducto)}
                    >
                        Crear
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
}

export default CrearProducto;
