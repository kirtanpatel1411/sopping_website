import { createContext, useState, useContext } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItem, setCartItem] = useState([]);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
      setOpen(false);
  };

  return (
    <CartContext.Provider value={{ cartItem, setCartItem, open, handleOpen, handleClose }}>
      {children}
    </CartContext.Provider>
  );
};
