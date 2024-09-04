import React, { useState } from 'react';
import { Button, Typography, Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';


import useCarrito from '@/hooks/useCarrito';

function Contador({
    producto,
    onIncrement,
    onDecrement,
}) {
    const { carrito, agregarProducto, eliminarProducto } = useCarrito();

    const count = carrito.find(p => p.idProductos === producto.idProductos)?.cantidad || 0; 
    
    const handleIncrement = () => {
        agregarProducto(producto);
    };

    const handleDecrement = () => {
        eliminarProducto(producto);
    };

    return (
        <Box display="flex" justifyContent='center' alignItems="center" border={1} borderRadius={1} borderColor="grey.300">
            <Button onClick={handleDecrement} disabled={count == 0}>
                <RemoveIcon />
            </Button>
            <Typography variant="body1" sx={{ mx: 2, minWidth: '20px', textAlign: 'center' }}>
                {count}
            </Typography>
            <Button onClick={handleIncrement} disabled={count >= producto.stock}>
                <AddIcon />
            </Button>
        </Box>
      );
}

export default Contador;
