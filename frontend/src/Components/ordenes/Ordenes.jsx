import { useState, useEffect } from "react";
import Grid from '@mui/material/Grid2';
import Orden from "@/Components/ordenes/Orden";

import rolesUsuario from "@/types/rolesUsuario";
import useFetchWithAuth from '@/hooks/useFetchWithAuth';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/useToast';


function Ordenes() {
    const { loginData: {
        usuario: { rol_idrol }
    } } = useAuth();
    const fetchWithAuth = useFetchWithAuth();
    const toast = useToast();

    const [ordenes, setOrdenes] = useState([]);

    const obtenerOrdenes = async () => {
        let url = '/ordenes';
        if (rol_idrol === rolesUsuario.CLIENTE) {
            url += `?onlyMyOrders=true`;
        }

        try {
            const response = await fetchWithAuth(url);
            const data = await response.json();
            if (response.ok) {
                setOrdenes(data.ordenes);
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


    useEffect(() => {
        obtenerOrdenes();
    }, []);


    return (
        <>
            <Grid container columnSpacing={2} rowSpacing={2}>
                {
                    ordenes.map(orden => (
                        <Grid size={{ sm: 12, md: 6 }} key={orden.idOrden}>
                            <Orden key={orden.idOrdenes} orden={orden} />
                        </Grid>
                    ))
                }
            </Grid>
        </>
    );
}

export default Ordenes;
