import { useState, useReducer, createContext } from 'react';
import { carritoReducer, carritoInitialState, CARRITO_ACTION_TYPES } from '@/reducers/CarritoReducer';

import { useToast } from '@/hooks/useToast';

export const CarritoContext = createContext();


export function CarritoProvider ({children}) {
    const toast = useToast();
    const [carrito, dispatch] = useReducer(carritoReducer, carritoInitialState);

    const cantProductos = carrito.reduce((acc, item) => acc + item.cantidad, 0);

    const totalCarrito = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

    const agregarProducto = product => dispatch({
        type: CARRITO_ACTION_TYPES.ADD_TO_CART,
        payload: product
    });
    
    const eliminarProducto = product => dispatch({
        type: CARRITO_ACTION_TYPES.REMOVE_FROM_CART,
        payload: product
    });

    const quitarProducto = product => dispatch({
        type: CARRITO_ACTION_TYPES.DELETE_FROM_CART,
        payload: product
    });

    const limpiarCarrito = () => dispatch({ type: CARRITO_ACTION_TYPES.CLEAR_CART });
    
    return (
        <CarritoContext.Provider value={{
            carrito,
            cantProductos,
            totalCarrito,
            agregarProducto,
            eliminarProducto,
            quitarProducto,
            limpiarCarrito
        }}>
            {children}
        </CarritoContext.Provider>
    );
}