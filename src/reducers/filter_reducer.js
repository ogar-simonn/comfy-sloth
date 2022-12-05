import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from "../actions";

const filter_reducer = (state, action) => {
  if (action.type === SET_GRIDVIEW) {
    return { ...state, view: "grid-view" };
  } else if (action.type === SET_LISTVIEW) {
    return { ...state, view: "list-view" };
  } else if (action.type === LOAD_PRODUCTS) {
    const prices = action.payload.map((item) => item.price);
    const highestPrice = Math.max(...prices);
    return {
      ...state,
      allProducts: [...action.payload],
      filteredProducts: [...action.payload],
      filters: { ...state.filters, highestPrice: highestPrice },
    };
  }
  if (action.type === UPDATE_FILTERS) {
    const { name, value } = action.payload;
    return { ...state, filters: { ...state.filters, [name]: value } };
  } else if (action.type === FILTER_PRODUCTS) {
    const { allProducts } = state;
    const { text, company, category, shipping } = state.filters;
    let tempProducts = [...allProducts];
    if (text) {
      tempProducts = tempProducts.filter((product) => {
        return product.name.toLowerCase().startsWith(text);
      });
    }
    if (category !== "all") {
      tempProducts = tempProducts.filter(
        (product) => product.category === category
      );
    }
    if (company !== "all") {
      tempProducts = tempProducts.filter(
        (product) => product.company === company
      );
    }
    if (shipping) {
      tempProducts = tempProducts.filter(
        (product) => product.shipping === true
      );
    }
    return { ...state, filteredProducts: tempProducts };
  } else if (action.type === CLEAR_FILTERS) {
    return {
      ...state,
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
  } else if (action.type === SORT_PRODUCTS) {
    const value = action.payload;
    let products = [...state.filteredProducts];

    if (value === "price-lowest") {
      products = products.sort((a, b) => {
        if (a.name > b.name) {
          return 1;
        } else if (a.name < b.name) {
          return -1;
        } else {
          return 0;
        }
      });
    } else if (value === "price-highest") {
      products = products.sort((a, b) => {
        return b.price - a.price;
      });
    } else if (value === "name-a") {
      products = products.sort((a, b) => a.name.localeCompare(b.name));
    } else if (value === "name-z") {
      products = products.sort((a, b) => b.name.localeCompare(a.name));
    }

    return { ...state, filteredProducts: products };
  } else if (action.type === UPDATE_SORT) {
    const { value } = action.payload;
    return { ...state, sort: value, filters: { ...state.filters } };
  }
  throw new Error(`No Matching "${action.type}" - action type`);
};

export default filter_reducer;
