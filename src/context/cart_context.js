import React, { useEffect, useContext, useReducer } from "react";
import reducer from "../reducers/cart_reducer";
import {
  ADD_TO_CART,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
  CLEAR_CART,
  COUNT_CART_TOTALS,
} from "../actions";

const getLocalStorage = () => {
  let cart = localStorage.getItem("cart");
  if (cart) {
    return JSON.parse(localStorage.getItem("cart"));
  } else {
    return [];
  }
};

const initialState = {
  cart: getLocalStorage(),
  totalItems: 0,
  totalAmount: 0,
  shippingFee: 100,
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

  // toggle cart amount
  const toggleAmount = (id, type) => {
    if (type === "decrease")
      dispatch({ type: TOGGLE_CART_ITEM_AMOUNT, payload: { id, type } });
    if (type === "increase")
      dispatch({ type: TOGGLE_CART_ITEM_AMOUNT, payload: { id, type } });
  };

  const countCountTotal = () => {
    dispatch({ type: COUNT_CART_TOTALS });
  };
  //clear cart
  const clearCart = () => {
    dispatch({ type: CLEAR_CART });
  };

  useEffect(() => {
    countCountTotal();
    localStorage.setItem("cart", JSON.stringify(state.cart));
  }, [state.cart]);

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
