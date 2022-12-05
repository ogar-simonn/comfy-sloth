import React from "react";
import styled from "styled-components";
import { CartContent, PageHero } from "../components";
import { useCartContext } from "../context/cart_context";
import { Link } from "react-router-dom";

const CartPage = () => {
  const { cart } = useCartContext();
  if (cart.length < 1) {
    return (
      <main className="page">
        <Wrapper>
          <div className="empty">
            <h3>Your cart is empty</h3>
            <Link to="/" className="btn">
              Fill it
            </Link>
          </div>
        </Wrapper>
      </main>
    );
  }
  return (
    <main>
      <PageHero title="cart" />
      <Wrapper className="page">
        <CartContent />
      </Wrapper>
    </main>
  );
};

const Wrapper = styled.main`
  padding-top: 2rem;
  .empty {
    text-align: center;
    h2 {
      margin-bottom: 1rem;
      text-transform: none;
    }
  }
`;

export default CartPage;
