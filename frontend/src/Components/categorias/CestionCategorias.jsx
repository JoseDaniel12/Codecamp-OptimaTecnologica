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
        { field: 'nombre', headerName: 'Nombre', width: 200 },
        { field: 'estado', headerName: 'Estado' },
        { field: 'cantProductosActivos', headerName: 'Cant. Productos Activos', width: 180 },
        { 
            field: 'acciones',
            headerName: 'Acciones', 
            renderCell: ({row}) => (
                <IconButton
                    key={`edit-${row.idCategoriaProductos}`}
                    variant="contained"
                    size="small"
                    onClick={() => setCategoriaPorEditar(row)}
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
                const categoriasConId = categorias.map(categoria => {
                    return { ...categoria, id: categoria.idCategoriaProductos}
                });
                setCategorias(categoriasConId);
            })
            .catch(err => {
                toast.show({
                    title: 'Error al obtener las categorias',
                    message: err.message,
                    severity: 'error',
                });
            });
    }, [])

    return (
        <Grid container spacing={2}>
            <Grid size={{xs: 12, md: 5 }}>
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
            <Grid size={{ xs: 12, md: 7 }}>
                <Paper style={{ height: 470, width: '100%', overflow: 'auto' }}>
                    <DataGrid
                        rows={categorias}
                        columns={columns}
                        initialState={{ pagination: { paginationModel: { page: 0, pageSize: 10 } } }}
                        pageSizeOptions={[5, 10]}
                    />
                </Paper>
            </Grid>
        </Grid>
    );
}

export default CestionCategorias;
