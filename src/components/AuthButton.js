import React from "react";
import styled from "styled-components";
import { useUserContext } from "../context/user_context";

const AuthButton = () => {
  const { myUser, loginWithRedirect, logout } = useUserContext();
  if (myUser === null || myUser === undefined || myUser.length < 1) {
    return (
      <Wrapper>
        <button className="btn auth-btn" onClick={loginWithRedirect}>
          login
        </button>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <div>
        <button
          className="btn auth-btn"
          onClick={() => {
            localStorage.removeItem("user");
            logout({ returnTo: window.location.origin });
          }}
        >
          logout
        </button>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 1rem;
  .auth-btn {
    display: flex;
    align-items: center;
    border-color: transparent;
    font-size: 1rem;
    cursor: pointer;
    letter-spacing: var(--spacing);
    svg {
      margin-left: 5px;
    }
  }
`;
export default AuthButton;
