import { useState, useEffect} from "react";
import { useNavigate } from 'react-router-dom';
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import {Box} from "@mui/material";

function Registro() {
    const [roles, setRoles] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // fetch('/roles')
        //     .then(response => response.json())
        //     .then(data => setRoles(data))
        //     .catch(error => console.error(error));
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
                            id='correo'
                            name='correo'
                            label='Nombre Completo'
                            autoComplete='email'
                            autoFocus
                            onChange={e => {}}
                        />
                    </Box>
                </Grid>
                <Grid item md={12}>
                    <Box>
                        <TextField
                            required
                            fullWidth
                            id='correo'
                            name='correo'
                            label='Correo'
                            autoComplete='email'
                            onChange={e => {}}
                        />
                    </Box>
                </Grid>
                <Grid item md={6}>
                    <Box>
                        <TextField
                            required
                            fullWidth
                            id='correo'
                            name='correo'
                            label='Contraseña'
                            autoComplete='email'
                            onChange={e => {}}
                        />
                    </Box>
                </Grid>
                <Grid item md={6}>
                    <Box>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={10}
                            label="Age"
                            fullWidth
                            onChange={() =>{}}
                        >
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                    </Box>
                </Grid>
                <Grid item md={12}>
                    <Box>
                        <TextField
                            required
                            fullWidth
                            id='correo'
                            name='correo'
                            label='Dirección'
                            autoComplete='email'
                            onChange={e => {}}
                        />
                    </Box>
                </Grid>
                <Grid item md={6}>
                    <Box>
                        <TextField
                            required
                            fullWidth
                            id='correo'
                            name='correo'
                            label='Telefono'
                            autoComplete='email'
                            onChange={e => {}}
                        />
                    </Box>
                </Grid>
                <Grid item md={6}>
                    <LocalizationProvider dateAdapter={ AdapterDayjs }>
                    <DatePicker
                            label="Fecha de Nacimiento"
                            value={null}
                            onChange={(newValue) => {}}
                        />
                    </LocalizationProvider>
                </Grid>
                <Grid item md={12}>
                    <Button
                        type='submit'
                        variant='contained'
                        fullWidth
                        maxWidth
                        sx={{ mt: 1 }}
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
