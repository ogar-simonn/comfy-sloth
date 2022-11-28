import React from "react";
import styled from "styled-components";
import logo from "../assets/logo.svg";
import { FaBars } from "react-icons/fa";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { Link } from "react-router-dom";
import { links } from "../utils/constants";
import AuthButton from "./AuthButton";
import { useProductsContext } from "../context/products_context";
import { useUserContext } from "../context/user_context";
import { useCartContext } from "../context/cart_context";
const Nav = () => {
  const { totalItems } = useCartContext();
  const { openSidebar } = useProductsContext();
  return (
    <NavContainer>
      <nav className="nav">
        <div className="nav-center">
          <div className="nav-header">
            <button className="nav-toggle" onClick={openSidebar}>
              <FaBars />
            </button>
            <img src={logo} alt="comfy slot" />
            <div className="nav-links">
              {links.map((link) => {
                const { id, text, url } = link;
                return (
                  <li key={id}>
                    <a href={url}>{text}</a>
                  </li>
                );
              })}
            </div>
            <Link to="/checkout" className="cart-container">
              <AiOutlineShoppingCart className="cart-btn" />
              <p className="cart-value">{totalItems}</p>
            </Link>
          </div>
        </div>
      </nav>
    </NavContainer>
  );
};

const NavContainer = styled.nav`
  height: 5rem;
  display: flex;
  align-items: center;
  justify-content: center;

  .nav-center {
    width: 90vw;
    margin: 0 auto;
    max-width: var(--max-width);
  }
  .nav-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    img {
      width: 175px;
      margin-left: -15px;
    }
  }
  .nav-toggle {
    background: transparent;
    border: transparent;
    color: #262626;
    cursor: pointer;
    svg {
      font-size: 2rem;
    }
  }
  .cart-container {
    display: flex;
    align-items: center;
    position: relative;
    svg {
      height: 1.6rem;
      margin-left: 5px;
    }
  }
  .cart-btn {
    color: var(--clr-grey-1);
    font-size: 1.5rem;
    letter-spacing: var(--spacing);
    color: var(--clr-grey-1);
    display: flex;

    align-items: center;
  }
  .cart-value {
    position: absolute;
    top: -10px;
    right: -16px;
    background: var(--clr-primary-5);
    width: 16px;
    height: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    font-size: 0.75rem;
    color: var(--clr-white);
    padding: 12px;
  }

  .nav-links {
    display: none;
  }
  .cart-btn-wrapper {
    display: none;
  }
  @media (min-width: 992px) {
    .nav-toggle {
      display: none;
    }
    .nav-center {
      display: grid;
      grid-template-columns: auto 1fr auto;
      align-items: center;
    }
    .nav-header {
      width: 90vw;
      margin: 0 auto;
      max-width: var(--max-width);
    }
    .nav-links {
      display: flex;
      justify-content: center;
      li {
        margin: 0 0.5rem;
        list-style-type: none;
      }
      a {
        color: var(--clr-grey-3);
        font-size: 1rem;
        text-transform: capitalize;
        letter-spacing: var(--spacing);
        padding: 0.5rem;
        &:hover {
          border-bottom: 2px solid var(--clr-primary-7);
        }
      }
    }
    .cart-btn-wrapper {
      display: grid;
    }
  }
`;

export default Nav;
