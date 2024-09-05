import { useEffect } from "react";
import Grid from '@mui/material/Grid2';
import { FormControl, InputLabel, FormHelperText, Select, MenuItem, Card, CardContent, CardMedia, Typography, Chip, Button, Box, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useForm, Controller } from 'react-hook-form';
import  { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { useToast } from "@/hooks/useToast";
import useFetchWithAuth from '@/hooks/useFetchWithAuth';
import { default as tiposEstados }  from '@/types/estados';
import { ArrowBack, Edit } from "@mui/icons-material";

function EditarCategoria({ categoria, onCancelEdit, onCategoriaEditada }) {
    const fetchWithAuth = useFetchWithAuth();
    const toast = useToast();

    const formSchema = yup.object().shape({
        nombre: yup.string().required('El nombre es requerido'),
        estados_idestados: yup.number().required('El estado es requerido'),
    });

    const form = useForm({
        defaultValues: {
            nombre: categoria.nombre,
            estados_idestados: categoria.estados_idestados
        },
        resolver: yupResolver(formSchema),
    });

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = form;

    const estados = [
        { idestados: tiposEstados.ACTIVO, nombre: 'Activo' },
        { idestados: tiposEstados.INACTIVO, nombre: 'Inactivo' }
    ];

    const handleEditarCategoria = async (datosCategoriaEditada) => {
        try {
            const response = await fetchWithAuth(`/categorias/categoria/${categoria.idCategoriaProductos}`, {
                method: 'PUT',
                body: JSON.stringify({
                    ...categoria,
                    ...datosCategoriaEditada
                }),
            });
            const data = await response.json();
            
            if (response.ok) {
                const categoriaEditada = data.categoria;
                toast.show({
                    title: 'Categoria editada',
                    message: 'La categoria se ha editado correctamente.',
                    severity: 'success',
                })
                categoriaEditada.id = categoriaEditada.idCategoriaProductos;
                form.reset(categoriaEditada);
                onCategoriaEditada(categoriaEditada);
            } else {
                toast.show({
                    title: 'Error al editar categoria',
                    message: data.error,
                    severity: 'error',
                });
            }
        } catch (error) {
            toast.show({
                title: 'Error al editar categoria',
                message: error.message,
                severity: 'error',
            });
        }
    }


    useEffect(() => {
        form.reset(categoria);
    }, [categoria]);

    return (
        <Card>
            <CardContent>
                <Grid container rowSpacing={2} columnSpacing={1}>
                    <Grid size={12}>
                        <Typography variant='h5' component='h1'>
                            Editar Categoria
                        </Typography>
                    </Grid>

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

                    {
                        categoria.cantProductosActivos === 0 &&
                        <Grid size={12}>
                            <FormControl fullWidth error={!!errors.estados_idestados}>
                                <InputLabel id='estado-label'>Estado</InputLabel>
                                <Controller
                                    name='estados_idestados'
                                    control={form.control}
                                    render = {({ field }) => (
                                        <Select
                                            fullWidth
                                            id='estados_idestados'
                                            label='Estado'
                                            {...field}
                                        >
                                            {
                                                estados.map(estado => (
                                                    <MenuItem key={estado.idestados} value={estado.idestados}>
                                                        {estado.nombre}
                                                    </MenuItem>
                                                ))
                                            }
                                        </Select>
                                    )}
                                />
                                <FormHelperText>{errors.estados_idestados?.message}</FormHelperText>
                            </FormControl>
                        </Grid>
                    }


                    <Grid size={{ xs: 12, md: 6}}>
                        <Button
                            type='submit'
                            fullWidth
                            startIcon={<ArrowBack />}
                            variant='contained'
                            color='primary'
                            onClick={onCancelEdit}
                        >
                            Voler
                        </Button>
                    </Grid>
                    <Grid size={{ xs: 12, md: 6}}>
                        <Button
                            type='submit'
                            fullWidth
                            startIcon={<Edit />}
                            variant='contained'
                            color='primary'
                            onClick={handleSubmit(handleEditarCategoria)}
                        >
                            Editar
                        </Button>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
}

export default EditarCategoria;
