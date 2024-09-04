import { useContext } from 'react'
import { CarritoContext } from '@/contexts/Carrito'

export const useCart = () => {
  const context = useContext(CarritoContext)

  if (context === undefined) {
    throw new Error('useCarrito must be used within a CarritoProvider')
  }

  return context;
}

export default useCart;