import { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {

  const [cartItems, setCartItems] = useState(() => {
    try {
      const savedCart = localStorage.getItem('elmnt_cart');
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error("Error al cargar localStorage:", error);
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('elmnt_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
  setCartItems((prevItems) => {
    const existingItem = prevItems.find((item) => item.id === product.id);
    if (existingItem) {
      if (existingItem.quantity < product.stock) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return prevItems;
      }
    }
    return product.stock > 0 
      ? [...prevItems, { ...product, quantity: 1 }] 
      : prevItems;
  });
};

const updateQuantity = (productId, newQuantity) => {
    setCartItems((prevItems) => {
      return prevItems.map((item) => {
        if (item.id === productId) {
          const validatedQuantity = Math.max(1, Math.min(newQuantity, item.stock));
          return { ...item, quantity: validatedQuantity };
        }
        return item;
      });
    });
  };

  const removeItem = (productId) => {
    setCartItems((prevItems) => prevItems.filter(item => item.id !== productId));
  };

  const clearCart = () => setCartItems([]);
  const toggleCart = () => setIsCartOpen(!isCartOpen);

  return (
    <CartContext.Provider value={{ 
      cartItems, 
      isCartOpen, 
      addToCart, 
      updateQuantity, 
      removeItem,
      clearCart,     
      toggleCart
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => useContext(CartContext);