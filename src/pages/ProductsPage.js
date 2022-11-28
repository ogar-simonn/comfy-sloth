import React, { useEffect } from "react";
import { useFilterContext } from "../context/filter_context";
import styled from "styled-components";
import { Filters, ProductList, Sort, PageHero } from "../components";

const ProductsPage = () => {
  const { fetchProducts, products } = useFilterContext();
  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <Wrapper className="section-center">
      <Sort />
      <div className="products">
        <Filters />
        <ProductList />
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .products {
    display: grid;
    gap: 3rem 1.5rem;
    margin: 4rem auto;
  }
  @media (min-width: 768px) {
    .products {
      grid-template-columns: 200px 1fr;
    }
  }
`;

export default ProductsPage;
