import React from "react";
import styled from "styled-components";

const Error = ({ func, id, url }) => {
  return (
    <Wrapper>
      <div className="error-content">
        <h5>Oops! An error occured</h5>
        <button
          className="btn"
          onClick={() => {
            if (id && url) {
              func(`${url}${id}`);
            } else {
              func();
            }
          }}
        >
          Try again
        </button>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  .error-content {
    padding: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
`;

export default Error;
