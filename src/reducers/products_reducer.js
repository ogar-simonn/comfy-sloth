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

const products_reducer = (state, action) => {
  if (action.type === SIDEBAR_CLOSE) {
    return { ...state, isSidebarOpen: false };
  } else if (action.type === SIDEBAR_OPEN) {
    return { ...state, isSidebarOpen: true };
  } else if (action.type === GET_PRODUCTS_BEGIN) {
    return { ...state, loading: true };
  } else if (action.type === GET_PRODUCTS_SUCCESS) {
    return { ...state, loading: false, products: action.payload };
  } else if (action.type === GET_PRODUCTS_ERROR) {
    return { ...state, loading: false, error: true };
  } else if (action.type === GET_SINGLE_PRODUCT_BEGIN) {
    return { ...state, loading: true };
  } else if (action.type === GET_SINGLE_PRODUCT_SUCCESS) {
    return { ...state, loading: false, singleProduct: action.payload };
  } else if (action.type === GET_SINGLE_PRODUCT_ERROR) {
    return { ...state, loading: false, error: true };
  }
  return state;
  // throw new Error(`No Matching "${action.type}" - action type`);
};

export default products_reducer;
