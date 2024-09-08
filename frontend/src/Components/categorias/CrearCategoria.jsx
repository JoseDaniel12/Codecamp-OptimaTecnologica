import { useForm, Controller } from 'react-hook-form';
import  { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Grid from '@mui/material/Grid2';
import { Card, CardContent, Typography, Button, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import { useToast } from "@/hooks/useToast";
import useFetchWithAuth from '@/hooks/useFetchWithAuth';

function CrearCategoria({ onCategoriaCreada }) {
    const fetchWithAuth = useFetchWithAuth();
    const toast = useToast();

    const formSchema = yup.object().shape({
        nombre: yup.string().required('El nombre es requerido'),
    });

    const form = useForm({
        defaultValues: {
            nombre: '',
        },
        resolver: yupResolver(formSchema),
    });

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = form;

    const handleEditarCategoria = async (datosCategoria) => {
        try {
            const response = await fetchWithAuth('/categorias/categoria', {
                method: 'POST',
                body: JSON.stringify(datosCategoria),
            });
            const data = await response.json();
            
            if (response.ok) {
                const categoriaCreada = data.categoria;
                toast.show({
                    title: 'Categoria creada',
                    message: 'La categoria se ha creado correctamente.',
                    severity: 'success',
                })
                form.reset();
                onCategoriaCreada(categoriaCreada);
            } else {
                toast.show({
                    title: 'Error al crear la categoria',
                    message: data.error,
                    severity: 'error',
                });
            }
        } catch (error) {
            toast.show({
                title: 'Error al crear la categoria',
                message: error.message,
                severity: 'error',
            });
        }
    }

    return (
        <Card>
            <CardContent>
                <Grid container spacing={2}>
                    <Grid size={12}>
                        <Typography variant='h5' component='h1'>
                            Crear Categoria
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
                    <Grid size={12}>
                        <Button
                            type='submit'
                            fullWidth
                            startIcon={<AddIcon />}
                            variant='contained'
                            color='primary'
                            onClick={handleSubmit(handleEditarCategoria)}
                        >
                            Crear
                        </Button>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
}

export default CrearCategoria;
