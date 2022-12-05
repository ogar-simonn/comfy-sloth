import React from "react";
import Loading from "./Loading";
import styled from "styled-components";

const UserProfile = ({ isLoading, myUser }) => {
  if (isLoading) {
    return <Loading />;
  }
  if (myUser === null || myUser === undefined || myUser.length < 1) {
    return null;
  }
  // if (myUser.length < 1) {
  //   return null;
  // }
  return (
    <Wrapper>
      {myUser ? (
        <div>
          <div className="user-details">
            <img src={myUser.picture} alt={myUser.name} />
            {/* <h4>{myUser.name}</h4> */}
          </div>
        </div>
      ) : (
        ""
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 1rem;
  .user-details {
    display: flex;
    align-items: center;
  }
  p {
    margin-bottom: 0.5rem;
  }
  .user-details img {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    display: block;
    margin-right: 0.5rem;
  }
`;

export default UserProfile;
