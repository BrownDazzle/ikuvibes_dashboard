"use client"
// useClient.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from 'react-hot-toast';

interface Product {
  _id: string;
  name: string;
  price: number;
  quantity?: number;
}

interface ContextProps {
  cartItems: Product[];
  totalPrice: number;
  totalQuantities: number;
  qty: number;
  incQty: () => void;
  decQty: () => void;
  onAdd: (product: Product, quantity: number) => void;
  toggleCartItemQuanitity: (id: string, value: 'inc' | 'dec') => void;
  onRemove: (product: Product) => void;
  setCartItems: React.Dispatch<React.SetStateAction<Product[]>>;
  setTotalPrice: React.Dispatch<React.SetStateAction<number>>;
  setTotalQuantities: React.Dispatch<React.SetStateAction<number>>;
}

const Context = createContext<ContextProps | undefined>(undefined);

interface StateContextProps {
  children: ReactNode;
}

export const StateContext: React.FC<StateContextProps> = ({ children }) => {
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [qty, setQty] = useState(1);

  let foundProduct: Product | undefined;
  let index: number | undefined;

  const onAdd = (product: Product, quantity: number) => {
    const checkProductInCart = cartItems.find((item) => item._id === product._id);

    setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity);
    setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);

    if (checkProductInCart) {
      const updatedCartItems = cartItems.map((cartProduct) => {
        if (cartProduct._id === product._id) {
          return {
            ...cartProduct,
            quantity: (cartProduct.quantity || 0) + quantity,
          };
        }
        return cartProduct;
      });

      setCartItems(updatedCartItems);
    } else {
      product.quantity = quantity;

      setCartItems([...cartItems, { ...product }]);
    }

    toast.success(`${qty} ${product.name} added to the cart.`);
  };

  const onRemove = (product: Product) => {
    foundProduct = cartItems.find((item) => item._id === product._id);
    const newCartItems = cartItems.filter((item) => item._id !== product._id);

    setTotalPrice((prevTotalPrice) => prevTotalPrice - (foundProduct?.price || 0) * (foundProduct?.quantity || 0));
    setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - (foundProduct?.quantity || 0));
    setCartItems(newCartItems);
  };

  const toggleCartItemQuanitity = (id: string, value: 'inc' | 'dec') => {
    foundProduct = cartItems.find((item) => item._id === id);
    index = cartItems.findIndex((product) => product._id === id);
    const newCartItems = cartItems.filter((item) => item._id !== id);

    if (foundProduct) {
      if (value === 'inc') {
        setCartItems([
          ...newCartItems,
          { ...foundProduct, quantity: (foundProduct.quantity || 0) + 1 },
        ]);
        setTotalPrice((prevTotalPrice) => prevTotalPrice + (foundProduct?.price || 0));
        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + 1);
      } else if (value === 'dec') {
        if (foundProduct.quantity && foundProduct.quantity > 1) {
          setCartItems([
            ...newCartItems,
            { ...foundProduct, quantity: (foundProduct.quantity || 0) - 1 },
          ]);
          setTotalPrice((prevTotalPrice) => prevTotalPrice - (foundProduct?.price || 0));
          setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - 1);
        }
      }
    }
  };

  const incQty = () => {
    setQty((prevQty) => prevQty + 1);
  };

  const decQty = () => {
    setQty((prevQty) => (prevQty - 1 < 1 ? 1 : prevQty - 1));
  };

  return (
    <Context.Provider
      value={{
        cartItems,
        totalPrice,
        totalQuantities,
        qty,
        incQty,
        decQty,
        onAdd,
        toggleCartItemQuanitity,
        onRemove,
        setCartItems,
        setTotalPrice,
        setTotalQuantities,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => {
  const context = useContext(Context);
  if (!context) {
    throw new Error('useStateContext must be used within a StateContext');
  }
  return context;
};
