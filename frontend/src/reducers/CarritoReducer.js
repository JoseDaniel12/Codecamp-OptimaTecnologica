export const carritoInitialState = JSON.parse(window.localStorage.getItem('cart')) || [];

const updateCarritoLocalStorage = state => {
    window.localStorage.setItem('cart', JSON.stringify(state));
};

export const CARRITO_ACTION_TYPES = {
  ADD_TO_CART: 'ADD_TO_CART',
  REMOVE_FROM_CART: 'REMOVE_FROM_CART',
  DELETE_FROM_CART: 'DELETE_FROM_CART',
  CLEAR_CART: 'CLEAR_CART'
};

const UPDATE_STATE_BY_ACTION = {
    [CARRITO_ACTION_TYPES.ADD_TO_CART]: (state, action) => {
        if (action.payload.stock === 0) return state;

        const { idProductos: id } = action.payload;
        const productInCartIndex = state.findIndex(item => item.idProductos === id)

        let newState = []
        if (productInCartIndex === -1) {
            newState = [
                ...state,
                {
                    ...action.payload, // producto por agregar
                    stock: action.payload.stock - 1,
                    cantidad: 1
                }
            ];
        } else  {
            if (state[productInCartIndex].stock === 0) return state;
            newState = [
                ...state.slice(0, productInCartIndex),
                { 
                    ...state[productInCartIndex],
                    stock: state[productInCartIndex].stock - 1,
                    cantidad: state[productInCartIndex].cantidad + 1
                },
                ...state.slice(productInCartIndex + 1)
            ]
        }

        updateCarritoLocalStorage(newState)
        return newState
    },

    [CARRITO_ACTION_TYPES.REMOVE_FROM_CART]: (state, action) => {
        const { idProductos: id } = action.payload;
        const productInCartIndex = state.findIndex(item => item.idProductos === id);

        if (productInCartIndex === -1) return state;
        const producto = {
            ...state[productInCartIndex],
            stock: state[productInCartIndex].stock + 1,
            cantidad: state[productInCartIndex].cantidad - 1
        }

        let newState = [];
        if (producto.cantidad > 0) {
            newState = [
                ...state.slice(0, productInCartIndex),
                producto,
                ...state.slice(productInCartIndex + 1)
            ];
        } else {
            newState = [
                ...state.slice(0, productInCartIndex),
                ...state.slice(productInCartIndex + 1)
            ];
        }

        updateCarritoLocalStorage(newState);
        return newState;
    },

    [CARRITO_ACTION_TYPES.DELETE_FROM_CART]: (state, action) => {
        const { idProductos: id } = action.payload;
        const productInCartIndex = state.findIndex(item => item.idProductos === id);
        if (productInCartIndex === -1) return state;
        const newState = [
            ...state.slice(0, productInCartIndex),
            ...state.slice(productInCartIndex + 1)
        ]
        updateCarritoLocalStorage(newState);
        return newState;
    },

    [CARRITO_ACTION_TYPES.CLEAR_CART]: () => {
        updateCarritoLocalStorage([]);
        return [];
    }
};

export const carritoReducer = (state, action) => {
    const { type: actionType } = action;
    const updateState = UPDATE_STATE_BY_ACTION[actionType];
    return updateState ? updateState(state, action) : state;
};