import React from "react";
import styled from "styled-components";
import { formatPrice } from "../utils/helpers";
import { Link } from "react-router-dom";

const Product = ({ id, price, name, image }) => {
  return (
    <Wrapper>
      <Link to={`/single-product/${id}`} className="link">
        <img src={image} alt={name} />
        <footer>
          <h5>{name}</h5>
          <p>{formatPrice(price)}</p>
        </footer>
      </Link>
    </Wrapper>
  );
};

const Wrapper = styled.article`
  .link {
    width: 18rem;
    height: 18rem;
    display: block;
    color: black;
    position: relative;
  }
  img {
    width: 100%;
    height: 18rem;
    display: block;
    object-fit: cover;
    border-radius: var(--radius);
  }

  footer {
    margin-top: 0.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  footer h5,
  footer p {
    margin-bottom: 0;
    font-weight: 400;
  }

  footer p {
    color: var(--clr-primary-5);
    letter-spacing: var(--spacing);
  }
`;
export default Product;
