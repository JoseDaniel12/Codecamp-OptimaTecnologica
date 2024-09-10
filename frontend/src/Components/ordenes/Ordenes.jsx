import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Grid from '@mui/material/Grid2';
import Orden from '@/Components/ordenes/Orden';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

import rolesUsuario from '@/types/rolesUsuario';
import useFetchWithAuth from '@/hooks/useFetchWithAuth';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/useToast';

import estados from '@/types/estados';
import { parse } from 'date-fns';

function Ordenes() {
    const { loginData: {
        usuario: { rol_idrol }
    } } = useAuth();
    const fetchWithAuth = useFetchWithAuth();
    const toast = useToast();

    const [ordenes, setOrdenes] = useState([]);
    const [ordenesFiltradas, setOrdenesFiltradas] = useState([]);

    const [searchParams, setSearchParams] = useSearchParams();
    const tipoEstado = (function () {
        const tipoEstado = searchParams.get('tipoEstado');
        if (!tipoEstado) {
            if (rol_idrol === rolesUsuario.ADMIN) {
                return estados.CONFIRMADO;
            } 
            return 0;
        }
        return parseInt(tipoEstado);
    })();

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(6);
    const lastItemIndex = currentPage * itemsPerPage;
    const firstItemIndex = lastItemIndex - itemsPerPage;


    const handleChangeTipoEstado = (e, value) => {
        setSearchParams(prev => ({
            ...prev,
            tipoEstado: value,
        }));
        setCurrentPage(1);
    };


    const obtenerOrdenes = async () => {
        try {
            const response = await fetchWithAuth('/ordenes');
            const data = await response.json();
            if (response.ok) {
                const ordenes = data.ordenes;
                setOrdenes(ordenes);
            } else {
                toast.show({
                    title: 'Error al obtener las ordenes',
                    message: data.error,
                    type: 'error',
                });
            }
        } catch (error) {
            toast.show({
                title: 'Error al obtener las ordenes',
                message: error.message,
                type: 'error',
            });
        }
    };


    const paginator = (
        <Grid size={12} >
            <Stack direction='row' justifyContent='center'>
                <Pagination 
                    count={Math.ceil(ordenesFiltradas.length / itemsPerPage)}
                    page={currentPage}
                    onChange={(e, page) => setCurrentPage(page)}
                />
            </Stack>
        </Grid>
    );


    useEffect(() => {
        if (tipoEstado === 0) {
            setOrdenesFiltradas(ordenes);
            return;
        }
        setOrdenesFiltradas(ordenes.filter(orden => orden.estados_idestados === tipoEstado));
    }, [tipoEstado, ordenes]);


    useEffect(() => {
        obtenerOrdenes();
    }, []);


    return (
        <>
            <Box borderBottom={1} borderColor='divider' mb={2}>
                <Tabs value={parseInt(tipoEstado)} onChange={handleChangeTipoEstado}>
                    <Tab label='Confirmadas' value={estados.CONFIRMADO}/>
                    <Tab label='Entregadas' value={estados.ENTREGADO}/>
                    <Tab label='Rechazadas' value={estados.RECHAZADO}/>
                    <Tab label='Todas' value={0}/>
                </Tabs>
            </Box>

            <Grid container columnSpacing={2} rowSpacing={2}>
                {paginator}

                {
                    ordenesFiltradas.slice(firstItemIndex, lastItemIndex).map(orden => (
                        <Grid size={{ sm: 12, md: 6 }} key={orden.idOrden}>
                            <Orden key={orden.idOrdenes} orden={orden} />
                        </Grid>
                    ))
                }

                {!!ordenesFiltradas.length && paginator}
            </Grid>
        </>
    );
}

export default Ordenes;
