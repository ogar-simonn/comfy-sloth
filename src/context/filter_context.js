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

const initialState = {
  view: "list-view",
  filteredProducts: [],
  allProducts: [],
  sort: "price-lowest",
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
    dispatch({ type: SORT_PRODUCTS, payload: state.sort });
    dispatch({ type: FILTER_PRODUCTS });
  }, [state.filters, products, state.sort]);

  useEffect(() => {
    dispatch({ type: LOAD_PRODUCTS, payload: products });
  }, [products]);

  // view
  const displayGridView = () => {
    dispatch({ type: SET_GRIDVIEW });
  };
  const displayListView = () => {
    dispatch({ type: SET_LISTVIEW });
  };

  // update sort
  const updateSort = (e) => {
    const value = e.target.value;
    dispatch({ type: UPDATE_SORT, payload: { value } });
  };

  // update filter
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

  // clear filters
  const clearFilters = () => {
    dispatch({ type: CLEAR_FILTERS });
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
        clearFilters,
        updateSort,
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
