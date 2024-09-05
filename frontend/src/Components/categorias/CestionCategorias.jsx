import { useState, useEffect } from "react";
import Grid from '@mui/material/Grid2';
import { Paper, IconButton } from '@mui/material';
import { Edit } from "@mui/icons-material";
import { DataGrid } from '@mui/x-data-grid';
import CrearCategoria from "@/Components/categorias/CrearCategoria";
import EditarCategoria from "@/Components/categorias/EditarCategoria";

import { useToast } from "@/hooks/useToast";
import useFetchWithAuth from '@/hooks/useFetchWithAuth';

function CestionCategorias() {
    const fetchWithAuth = useFetchWithAuth();
    const toast = useToast();

    const [categorias, setCategorias] = useState([]);
    const [categoriaPorEditar, setCategoriaPorEditar] = useState(null);
    

    const columns = [
        { field: 'nombre', headerName: 'Nombre' },
        { field: 'estado', headerName: 'Estado' },
        { field: 'cantProductosActivos', headerName: 'Cant. Productos Activos' },
        { 
            headerName: 'Acciones', 
            renderCell: ({ row }) => (
                <IconButton
                    variant="contained"
                    size="small"
                    onClick={() => {
                        setCategoriaPorEditar(row);
                    }}
                >
                    <Edit />
                </IconButton>
            )
        },
    ];

    const onCancelEdit = () => {
        setCategoriaPorEditar(null);
    };

    const onCategoriaCreada = (categoriaCreada) => {
        categoriaCreada.id = categoriaCreada.idCategoriaProductos;
        setCategorias(prevCategorias => [categoriaCreada, ...prevCategorias]);
    };

    const onCategoriaEditada = (categoriaEditada) => {
        const index = categorias.findIndex(c => c.idCategoriaProductos === categoriaEditada.idCategoriaProductos);
        setCategorias(prevCategorias => {
            const newCategorias = [...prevCategorias];
            newCategorias[index] = categoriaEditada;
            return newCategorias;
        });
    }

    useEffect(() => {
        fetchWithAuth('/categorias')
            .then(res => res.json())
            .then (data => {
                const categorias = data.categorias;
                categorias.map(categoria => {
                    categoria.id = categoria.idCategoriaProductos;
                    return categoria;
                });
                setCategorias(categorias);
            })
            .catch(err => {
                toast.show({
                    title: 'Error al obtener las categorias',
                    message: err.message,
                    type: 'error',
                });
            });
    }, [])

    return (
        <Grid container spacing={2}>
            <Grid size={{xs: 12, md:4 }}>
                {
                    categoriaPorEditar ? (
                        <EditarCategoria
                            categoria={categoriaPorEditar}
                            onCancelEdit={onCancelEdit}
                            onCategoriaEditada={onCategoriaEditada}
                        />
                    ) : (
                        <CrearCategoria 
                            onCategoriaCreada={onCategoriaCreada}
                        />
                    )
                }

            </Grid>
            <Grid size={{ xs: 12, md:8 }}>
                <Paper>
                    <DataGrid
                        rows={categorias}
                        columns={columns}
                        initialState={{ pagination: { paginationModel: { page: 0, pageSize: 5 } } }}
                        pageSizeOptions={[5, 10]}
                    />
                </Paper>
            </Grid>
        </Grid>
    );
}

export default CestionCategorias;
