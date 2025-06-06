import { createContext, useState } from "react";

export const ProductContext = createContext();
export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState(null);

  return (
    <ProductContext.Provider value={{ products, setProducts }}>
      {children}
    </ProductContext.Provider>
  );
};
