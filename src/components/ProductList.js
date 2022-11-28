import React from "react";
import { useFilterContext } from "../context/filter_context";
import GridView from "./GridView";
import ListView from "./ListView";

const ProductList = () => {
  const { view, filteredProducts: products } = useFilterContext();
  if (view === "list-view") {
    return <ListView products={products}/>;
  }
  return <GridView products={products}/>;
};

export default ProductList;
