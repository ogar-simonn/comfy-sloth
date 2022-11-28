import axios from "axios";
import React, { useContext, useEffect, useReducer } from "react";
import reducer from "../reducers/products_reducer";
import { products_url as url } from "../utils/constants";
import {
  SIDEBAR_OPEN,
  SIDEBAR_CLOSE,
  GET_PRODUCTS_BEGIN,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_ERROR,
  GET_SINGLE_PRODUCT_BEGIN,
  GET_SINGLE_PRODUCT_SUCCESS,
  GET_SINGLE_PRODUCT_ERROR,
} from "../actions";

const initialState = {
  isSidebarOpen: false,
  loading: true,
  products: [],
  errorMsg: "",
  singleProduct: {},
};

const ProductsContext = React.createContext();

export const ProductsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const closeSidebar = () => {
    dispatch({ type: SIDEBAR_CLOSE });
  };
  const openSidebar = () => {
    dispatch({ type: SIDEBAR_OPEN });
  };
  const fetchProducts = async () => {
    dispatch({ type: GET_PRODUCTS_BEGIN });
    await axios
      .get(url)
      .then((response) => {
        const { data } = response;
        if (data.length > 0) {
          dispatch({ type: GET_PRODUCTS_SUCCESS, payload: data });
        }
      })
      .catch((err) => dispatch({ type: GET_PRODUCTS_ERROR }));
  };
  const fetchSingleProduct = async (url) => {
    dispatch({ type: GET_SINGLE_PRODUCT_BEGIN });
    await axios
      .get(url)
      .then((response) => {
        if (response.data) {
          dispatch({
            type: GET_SINGLE_PRODUCT_SUCCESS,
            payload: response.data,
          });
        }
      })
      .catch((err) => dispatch({ type: GET_SINGLE_PRODUCT_ERROR }));
  };
  return (
    <ProductsContext.Provider
      value={{
        ...state,
        closeSidebar,
        openSidebar,
        fetchProducts,
        fetchSingleProduct,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
// make sure use
export const useProductsContext = () => {
  return useContext(ProductsContext);
};
