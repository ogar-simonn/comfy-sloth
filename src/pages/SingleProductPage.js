import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useProductsContext } from "../context/products_context";
import { single_product_url as url } from "../utils/constants";
import { formatPrice } from "../utils/helpers";
import {
  Loading,
  Error,
  ProductImages,
  AddToCart,
  PageHero,
} from "../components";
import styled from "styled-components";

const SingleProductPage = () => {
  const { id } = useParams();
  const { fetchSingleProduct, loading, singleProduct, error } =
    useProductsContext();
  useEffect(() => {
    fetchSingleProduct(`${url}${id}`);
  }, [id]);
  if (loading) {
    return <Loading />;
  }
  if (error) {
    return (
      <Wrapper className="page-100">
        <Error func={fetchSingleProduct} id={id} url={url} />
      </Wrapper>
    );
  }
  if (!singleProduct) {
    return <Error func={fetchSingleProduct} id={id} url={url} />;
  }
  const { name, description, images, stock, price, company } = singleProduct;
  return (
    <Wrapper className="section-center page-100">
      <PageHero title={name} product={name} />
      <div className="product-center">
        <ProductImages images={images} />
        <div>
          <h4>{name}</h4>
          <h5 className="price">{formatPrice(price)}</h5>
          <p>{description}</p>
          <p className="info">
            <span>Available:</span> {stock > 0 ? "In stock" : "Not in stock"}
          </p>
          <p className="info">
            <span>SKU</span> {id}
          </p>
          <p className="info">
            <span>Brand: </span> {company}
          </p>
          <AddToCart product={singleProduct} id={id} />
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  .product-center {
    display: grid;
    gap: 4rem;
    margin-top: 2rem;
  }
  .price {
    color: var(--clr-primary-5);
  }
  .desc {
    line-height: 2;
    max-width: 45em;
  }
  .info {
    text-transform: capitalize;
    width: 300px;
    display: grid;
    grid-template-columns: 125px 1fr;
    span {
      font-weight: 700;
    }
  }

  @media (min-width: 992px) {
    .product-center {
      grid-template-columns: 1fr 1fr;
      align-items: center;
    }
    .price {
      font-size: 1.25rem;
    }
  }
`;

export default SingleProductPage;
