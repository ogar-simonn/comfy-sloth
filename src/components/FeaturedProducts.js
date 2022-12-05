import React from "react";
import { useProductsContext } from "../context/products_context";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Error from "./Error";
import Loading from "./Loading";
import Product from "./Product";
import { useEffect } from "react";

const FeaturedProducts = () => {
  const { loading, fetchProducts, products, error } = useProductsContext();
  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <Wrapper>
        <Loading />
      </Wrapper>
    );
  }
  if (error) {
    return (
      <Wrapper>
        <Error func={fetchProducts} />
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <div className="section-center">
        <div className="title">
          <h2>featured</h2>
          <div className="underline"></div>
        </div>

        <div className="featured">
          {products.slice(0, 4).map((product) => {
            return <Product {...product} key={product.id} />;
          })}
        </div>
        <Link to="/products" className="btn">
          All Products
        </Link>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  background: var(--clr-grey-10);
  .featured {
    margin: 1rem auto;
    display: grid;
    gap: 1rem;
    justify-content: center;
    margin-bottom: 0;
    img {
      height: 225px;
    }
  }
  .btn {
    display: block;
    width: 148px;
    margin: 0 auto;
    text-align: center;
  }
  @media (min-width: 576px) {
    .featured {
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    }
  }
`;

export default FeaturedProducts;
