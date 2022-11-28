import React, { useEffect, useContext, useReducer } from "react";
import reducer from "../reducers/filter_reducer";
import {
  LOAD_PRODUCTS,
  SET_GRIDVIEW,
  SET_LISTVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from "../actions";
import { useProductsContext } from "./products_context";
import GridView from "../components/GridView";

const initialState = {
  loading: true,
  view: "list-view",
  active: 1,
  filteredProducts: [],
  allProducts: [],
  filters: {
    text: "",
    company: "all",
    category: "all",
    color: "all",
    min_price: 0,
    max_price: 0,
    price: 0,
    shipping: false,
  },
};

const FilterContext = React.createContext();

export const FilterProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { products, fetchProducts } = useProductsContext();
  useEffect(() => {
    dispatch({ type: FILTER_PRODUCTS });
  }, [state.filter, products]);
  useEffect(() => {
    dispatch({ type: LOAD_PRODUCTS, payload: products });
  }, [products]);

  const displayGridView = () => {
    dispatch({ type: SET_GRIDVIEW });
  };
  const displayListView = () => {
    dispatch({ type: SET_LISTVIEW });
  };
  const updateFilter = (e) => {
    const name = e.target.name;
    let value = e.target.value;
    if (name === "category") {
      value = e.target.textContent;
    }
    if (name === "shipping") {
      value = e.target.checked;
    }
    dispatch({ type: UPDATE_FILTERS, payload: { value, name } });
  };
  return (
    <FilterContext.Provider
      value={{
        ...state,
        products,
        displayListView,
        displayGridView,
        fetchProducts,
        updateFilter,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};
// make sure use
export const useFilterContext = () => {
  return useContext(FilterContext);
};
