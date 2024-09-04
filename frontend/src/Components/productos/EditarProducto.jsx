import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import  { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Box, Typography, Button, TextField, FormControl, Select, InputLabel, MenuItem } from '@mui/material'
import Grid from '@mui/material/Grid2'

function EditarProducto() {
    const [selectedImage, setSelectedImage] = useState(null);

    const schema = yup.object().shape({
        nombre: yup.string().required('Nombre requerido'),
        marca: yup.string().required('Marca Requerida'),
        stock: yup.number().required('Stock requerido'),
        precio: yup.number().required('Precio es requerido'),
        CategoriaProductos_idCategoriaProductos: yup.string().required('Categoria requerida')
    });

    const form = useForm({
        defaultValues: {
            nombre_completo: '',
            correo_electronico: '',
            password: '',
            rol_idrol: '',
            direccion: '',
            telefono: '',
            fecha_nacimiento: null
        },
        resolver: yupResolver(schema),
        mode: 'onSumbit'
    });

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = form;

    const handleCambiarImagen = e => {
        const file = e.target.files[0];

        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setSelectedImage(imageUrl);
        }
    };

    return (
        <Box width={500} backgroundColor='#f1f3f4' padding={2} borderRadius={1} mx='auto'>
            <Typography align='center' component='h1' variant='h5' sx={{ mb: 1 }}>
                Editar Producto
            </Typography>

            <Grid container rowSpacing={2} columnSpacing={1}>
                <Grid size={12}>
                    <TextField
                        required
                        fullWidth
                        id='nombre'
                        name='nombre'
                        label='Nombre'
                        autoFocus
                    />
                </Grid>

                <Grid size={6}>
                    <TextField
                        required
                        fullWidth
                        id='marca'
                        name='marca'
                        label='Marca'
                        autoComplete='marca'
                    />
                </Grid>

                <Grid size={6}>
                    <TextField
                        required
                        fullWidth
                        id='codigo'
                        name='codigo'
                        label='Codigo'
                    />
                </Grid>

                <Grid size={6}>
                    <TextField
                        required
                        type="number"
                        fullWidth
                        id='stock'
                        name='stock'
                        label='Stock'
                        slotProps={{
                            inputMode: 'numeric',
                            pattern: '[0-9]*'
                        }}
                    />
                </Grid>

                <Grid size={6}>
                    <TextField
                        required
                        type="number"
                        fullWidth
                        id='nombre'
                        name='nombre'
                        label='Precio'
                        slotProps={{
                            inputMode: 'numeric',
                            pattern: '[0-9]*'
                        }}
                    />
                </Grid>

                <Grid size={12}>
                    <FormControl fullWidth>
                        <InputLabel id="categoria-label">Categoria</InputLabel>
                        <Controller
                            name='CategoriaProductos_idCategoriaProductos'
                            control={form.control}
                            render = {({ field }) => (
                                <Select
                                    fullWidth
                                    id='CategoriaProductos_idCategoriaProductos'
                                    label="Categoria"
                                    {...field}
                                >
                                    <MenuItem value={1}>Categoria 1</MenuItem>
                                    <MenuItem value={2}>Categoria 2</MenuItem>
                                    <MenuItem value={3}>Categoria 3</MenuItem>
                                </Select>
                            )}
                        />
                    </FormControl>
                </Grid>

                <Grid size={12} >
                    <Box sx={{ mt: 2, maxWidth: '100%', overflow: 'hidden' }}>
                        <img src={selectedImage || 'https://via.placeholder.com/200'} alt="Imagen seleccionada" style={{ maxWidth: '100%', height: 'auto' }} />
                    </Box>
                    <input
                        accept="image/*"
                        style={{ display: 'none' }}
                        id="image-upload"
                        type="file"
                        onChange={handleCambiarImagen}
                    />
                    <label htmlFor="image-upload">
                        <Button variant="contained" component="span" sx={{ mt: 1 }}>
                            Seleccionar Imagen
                        </Button>
                    </label>
                </Grid>

                <Grid size={12}>
                    <Button
                        type='submit'
                        fullWidth
                        variant='contained'
                        color='primary'
                    >
                        Guardar
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
}

export default EditarProducto;
