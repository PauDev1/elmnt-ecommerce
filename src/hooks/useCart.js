import { useCartContext } from '../context/CartContext';

export const useCart = () => {
  const context = useCartContext();
  
  if (!context) {
    throw new Error('useCart debe ser usado dentro de un CartProvider');
  }
  
  return context;
};