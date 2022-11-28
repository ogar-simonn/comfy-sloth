import React, { useEffect, useContext, useReducer } from "react";
import reducer from "../reducers/cart_reducer";
import axios from "axios";
import {
  ADD_TO_CART,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
  CLEAR_CART,
  COUNT_CART_TOTALS,
} from "../actions";

const initialState = {
  cart: [],
  totalItems: 0,
  totalAmount: 0,
};

const CartContext = React.createContext();

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // add to cart function
  const addToCart = (id, product, amount) => {
    dispatch({ type: ADD_TO_CART, payload: { id, product, amount } });
  };

  // remove from cart function
  const removeFromCart = (id) => {
    dispatch({ type: REMOVE_CART_ITEM, payload: id });
  };
  const toggleAmount = (id, type) => {
    if (type === "decrease")
      dispatch({ type: TOGGLE_CART_ITEM_AMOUNT, payload: { id, type } });
    if (type === "increase")
      dispatch({ type: TOGGLE_CART_ITEM_AMOUNT, payload: { id, type } });
  };

  //clear cart
  const clearCart = () => {
    dispatch({ type: CLEAR_CART });
  };

  return (
    <CartContext.Provider
      value={{ ...state, addToCart, removeFromCart, toggleAmount, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
// make sure use
export const useCartContext = () => {
  return useContext(CartContext);
};
