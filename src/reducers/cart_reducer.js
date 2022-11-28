import { FaAcquisitionsIncorporated } from "react-icons/fa";
import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
  UPDATE_FILTERS,
} from "../actions";

const cart_reducer = (state, action) => {
  if (action.type === ADD_TO_CART) {
    const { id, product, amount } = action.payload;
    const tempItem = state.cart.find((item) => item.id === id);
    if (tempItem) {
      const tempCart = state.cart.map((item) => {
        if (item.id === id) {
          let newAmount = item.amount + amount;
          if (newAmount > item.max) newAmount = item.max;
          return { ...item, amount: newAmount };
        } else {
          return item;
        }
      });
      return { ...state, cart: tempCart, totalItem: state.cart.length };
    } else {
      const newCartItem = {
        id,
        name: product.name,
        amount,
        image: product.images[0].url,
        price: product.price,
        max: product.stock,
      };
      return {
        ...state,
        cart: [...state.cart, newCartItem],
        totalItem: state.cart.length,
      };
    }
  } else if (action.type === REMOVE_CART_ITEM) {
    const cartArr = state.cart.filter((item) => item.id === action.payload.id);
    console.log(cartArr);
    return { ...state, cart: cartArr };
  } else if (action.type === TOGGLE_CART_ITEM_AMOUNT) {
    const { id, type } = action.payload;
    const tempCart = state.cart.map((item) => {
      if (item.id === id) {
        if (type === "increase") {
          let newAmount = item.amount + 1;
          if (newAmount > item.max) {
            newAmount = item.max;
          }
          return { ...item, amount: newAmount };
        } else if (type === "decrease") {
          let newAmount = item.amount - 1;
          if (newAmount < 1) {
            newAmount = 1;
          }
          return { ...item, amount: newAmount };
        }
      }
      return item;
    });
    return { ...state, cart: tempCart };
  } else if (action.type === CLEAR_CART) {
    return { ...state, cart: [] };
  }
  return state;
  // throw new Error(`No Matching "${action.type}" - action type`);
};

export default cart_reducer;
