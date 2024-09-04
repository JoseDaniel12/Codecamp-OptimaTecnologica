import { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import  { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';

import { useToast } from '@/hooks/useToast';
import useFetchWithAuth from '@/hooks/useFetchWithAuth';

function Registro() {
    const toast = useToast();
    const [roles, setRoles] = useState([]);
    const navigate = useNavigate();
    const fetchWithAuth = useFetchWithAuth();

    const schema = yup.object().shape({
        nombre_completo: yup.string().required('El nombre es requerido'),
        correo_electronico: yup.string().email('El correo no es valido').required('El correo es requerido'),
        password: yup.string().required('La contraseña es requerida'),
        rol_idrol: yup.number().required('El rol es requerido'),
        direccion: yup.string().required('La dirección es requerida'),
        telefono: yup.string().required('El telefono es requerido'),
        fecha_nacimiento: yup.date('Fecha no valida').required('Fehca de nacimiento requerida')
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


    const handleRegistro = async (datos) => {
        try {
            const response = await fetchWithAuth('/usuarios/usuario', {
                method: 'POST',
                body: JSON.stringify(datos)
            });

            const data = await response.json();
            if (response.ok) {
                toast.show({
                    severity: 'success',
                    title: 'Registro Exitoso',
                    message: 'Usuario registrado correctamente.',
                    life: 4000
                });
                form.reset();
            } else {
                toast.show({
                    severity: 'error',
                    title: 'Registro Fallido',
                    message: data.error,
                    life: 5000
                });
            }

        } catch (error) {
            console.error(error);
        }
    };


    useEffect(() => {
        fetchWithAuth('/roles')
            .then(response => response.json())
            .then(data => {
                setRoles(data);
            })
            .catch(error => console.error(error));
    }, []);


    return (
        <Box width={450} backgroundColor='#f1f3f4' padding={2} borderRadius={1} mx='auto' my='2rem'>

            <Typography align='center' component='h1' variant='h5' sx={{ mb: 1 }}>
                Registro
            </Typography>

            <Grid container rowSpacing={2} columnSpacing={1}>
                <Grid item md={12}>
                    <Box>
                        <TextField
                            required
                            fullWidth
                            id='nombre_completo'
                            name='nombre_completo'
                            label='Nombre Completo'
                            autoComplete='nombre_completo'
                            autoFocus
                            {...register('nombre_completo')}
                            error={!!errors.nombre_completo}
                            helperText={errors.nombre_completo?.message}
                        />
                    </Box>
                </Grid>
                <Grid item md={12}>
                    <Box>
                        <TextField
                            required
                            fullWidth
                            id='correo_electronico'
                            name='correo_electronico'
                            label='correo_electronico'
                            autoComplete='correo_electronico'
                            {...register('correo_electronico')}
                            error={!!errors.correo_electronico}
                            helperText={errors.correo_electronico?.message}
                        />
                    </Box>
                </Grid>
                <Grid item md={6}>
                    <Box>
                        <TextField
                            required
                            fullWidth
                            id='password'
                            name='password'
                            label='Contraseña'
                            autoComplete='password'
                            {...register('password')}
                            error={!!errors.password}
                            helperText={errors.password?.message}
                        />
                    </Box>
                </Grid>
                <Grid item sm={6} md={6}>
                    <Box>
                        <FormControl fullWidth error={!!errors.rol_idrol}>
                            <InputLabel id="demo-simple-select-label">Rol</InputLabel>
                            <Controller
                                name='rol_idrol'
                                control={form.control}
                                render={({ field }) => (
                                    <Select
                                        fullWidth
                                        id='rol_idrol'
                                        label='Rol'
                                        {...field}
                                    >
                                        {
                                            roles.map(rol => (
                                                <MenuItem key={rol.idrol} value={rol.idrol}>{rol.nombre}</MenuItem>
                                            ))
                                        }
                                    </Select>
                                )}
                            />
                            <FormHelperText>{errors.rol_idrol?.message}</FormHelperText>
                        </FormControl>
                    </Box>
                </Grid>
                <Grid item sm={12} md={12}>
                    <Box>
                        <TextField
                            required
                            fullWidth
                            id='direccion'
                            name='direccion'
                            label='Dirección'
                            autoComplete='direccion'
                            {...register('direccion')}
                            error={!!errors.direccion}
                            helperText={errors.direccion?.message}
                        />
                    </Box>
                </Grid>
                <Grid item sm={6} md={6}>
                    <Box>
                        <TextField
                            required
                            fullWidth
                            id='telefono'
                            name='telefono'
                            label='Telefono'
                            autoComplete='telefono'
                            {...register('telefono')}
                            error={!!errors.telefono}
                            helperText={errors.telefono?.message}
                        />
                    </Box>
                </Grid>
                <Grid item sm={6} md={6}>
                    <LocalizationProvider dateAdapter={ AdapterDayjs }>
                        <Controller
                            name='fecha_nacimiento'
                            control={form.control}
                            render={({ field }) => (
                                <DatePicker
                                    {...field}
                                    id='fecha_nacimiento'
                                    label='Fecha de Nacimiento'
                                    slotProps={{
                                        textField: {
                                            error: !!errors.fecha_nacimiento,
                                            helperText: errors.fecha_nacimiento?.message
                                        }
                                    }}
                                />
                            )}
                        />
                    </LocalizationProvider>
                </Grid>
                <Grid item sm={12} md={12}>
                    <Button
                        type='submit'
                        variant='contained'
                        fullWidth
                        onClick={handleSubmit(handleRegistro,handleRegistro )}
                        sx={{ mt: 1, }}
                    >
                        Registrarse
                    </Button>
                </Grid>
                <Grid item md={12} sx={{ display: 'flex', justifyContent: 'center'  }}>
                    <Typography
                        component='a'
                        variant='body2'
                        sx={{ cursor: 'pointer', color: '#1976d2' }}
                        onClick={() => navigate('/login') }
                    >
                        Iniciar Sesion
                    </Typography>
                </Grid>
            </Grid>
        </Box>
    );
}

export default Registro;
