import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import Badge from '@mui/material/Badge'
import { Tooltip } from '@mui/material';

import { useAuth } from '@/hooks/useAuth';
import useCarrito from '@/hooks/useCarrito';
import navbarOptions from './navbarOptions';
import rolesUsuario from '@/types/rolesUsuario';
import logo from '@/assets/don-arturo.jpg';
import { set } from 'date-fns';

function Navbar() {
    const { limpiarCarrito, cantProductos } = useCarrito();
    const { loginData, logOut } = useAuth();
    const usuario = loginData ? loginData.usuario : null;
    const navigate = useNavigate();

    const [pestania, setPestania] = useState(() => {
        if (usuario.rol_idrol === rolesUsuario.CLIENTE) {
            return 'Productos';
        }
        return 'Ordenes';
    });

    const rutasAutorizadas = navbarOptions.filter(ruta => {
        if (ruta.roles?.length && ruta.roles.includes(usuario.rol_idrol)) {
            return true;
        } else if (!ruta.roles) {
            return true;
        }
        return false;
    });

    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);

    const handleOpenNavMenu = event => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleOpenUserMenu = event => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleCerrarSesion = () => {
        limpiarCarrito();
        logOut();
        navigate('/login');
    };


    return (
        <AppBar position="static" sx={{color: 'blue', marginBottom: 2, position:'sticky', top: 0, zIndex: 1000 }}>
            <Toolbar>
                <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                    <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleOpenNavMenu}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorElNav}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                        open={Boolean(anchorElNav)}
                        onClose={handleCloseNavMenu}
                        sx={{
                            display: { xs: 'block', md: 'none' },
                        }}
                    >
                        {rutasAutorizadas.map((ruta) => (
                            <MenuItem key={ruta.label} onClick={() => {
                                handleCloseNavMenu();
                                navigate(ruta.path);
                            }}>
                                <Typography textAlign="center">{ruta.label}</Typography>
                            </MenuItem>
                        ))}
                    </Menu>
                </Box>


                <Box sx={{  display: { xs: 'none', md: 'block' }, mr:2 }} onClick={() => {
                    navigate('/')
                    if (usuario.rol_idrol === rolesUsuario.CLIENTE) {
                        setPestania('Productos');
                    } else {
                        setPestania('Ordenes');
                    }
                }}>
                    <img
                        src={logo}
                        width={50}
                        style={{ borderRadius: '5px' }}
                    />
                </Box>

                <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                    {rutasAutorizadas.map(ruta => (
                        <Button
                            key={ruta.label}
                            onClick={() => {
                                setPestania(ruta.label);
                                navigate(ruta.path);
                            }
                            }
                            sx={{ 
                                my: 2, 
                                color: ruta.label === pestania ? '#cae2f2' : 'white',
                            }}
                        >
                            {ruta.label}
                        </Button>
                    ))}
                </Box>

                <Box sx={{ml: 'auto', display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                    {
                        usuario.rol_idrol === rolesUsuario.CLIENTE && (
                            <Tooltip title='Carrito de Compras'>
                                <IconButton onClick={() =>{ setPestania('');  navigate('/carrito'); }} sx={{mr: 1}}>
                                    <Badge badgeContent={cantProductos} color='error'>
                                        <LocalGroceryStoreIcon fontSize='large'/>
                                    </Badge>
                                </IconButton>
                            </Tooltip>
                        )
                    }

                    <Typography 
                        variant='h6' 
                        sx={{color: 'white'}}
                        onClick={handleOpenUserMenu}
                    >
                        {usuario?.nombre_completo}
                    </Typography>
                    <Menu
                        id="menu-user"
                        anchorEl={anchorElUser}
                        open={Boolean(anchorElUser)}
                        onClose={handleCloseUserMenu}
                    >
                        <MenuItem onClick={handleCerrarSesion}>Cerrar Sesion</MenuItem>
                    </Menu>
                </Box>
            </Toolbar>
        </AppBar>

    );
}

export default Navbar;
