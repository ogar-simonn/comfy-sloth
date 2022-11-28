import React from "react";
import styled from "styled-components";
import { useFilterContext } from "../context/filter_context";
import { formatPrice } from "../utils/helpers";
import { Link } from "react-router-dom";
const ListView = () => {
  const { products } = useFilterContext();
  return (
    <Wrapper>
      <div className="products-container">
        {products.map((product) => {
          const { name, price, id, description, image } = product;
          return (
            <article>
              <img src={image} alt={name} />
              <div>
                <h4>{name}</h4>
                <p className="price">{price}</p>
                <p>{description}</p>
                <Link to={`/single-product/${id}`} className="btn">
                  Details
                </Link>
              </div>
            </article>
          );
        })}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  display: grid;
  row-gap: 3rem;

  img {
    width: 100%;
    display: block;
    height: 200px;
    object-fit: cover;
    border-radius: var(--radius);
    margin-bottom: 1rem;
  }
  article {
    margin-bottom: 0.7rem;
  }
  h4 {
    margin-bottom: 0.5rem;
  }
  .price {
    color: var(--clr-primary-6);
    margin-bottom: 0.75rem;
  }
  p {
    max-width: 45em;
    margin-bottom: 0.5rem;
  }
  .btn {
    font-size: 0.6rem;
    padding: 0.25rem 0.5rem;
  }
  @media (min-width: 992px) {
    img {
      width: 300px;
    }
    article {
      display: grid;
      grid-template-columns: auto 1fr;
      column-gap: 2rem;
      align-items: center;
    }
  }
`;

export default ListView;
