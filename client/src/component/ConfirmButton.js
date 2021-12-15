import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import UsersContext from "./UsersContext";

const ConfirmButton = ({ friendPending, handleConfirmFriend }) => {
  console.log("pending friend in confirm button - ", friendPending);

  return (
    <div>
      <Button onClick={handleConfirmFriend}>Confirm</Button>
    </div>
  );
};

const Button = styled.button`
  align-items: center;
  margin-left: 20px;
  @extend .center-content;
  padding: 10px 10px;
  font-size: 18px;
  cursor: pointer;

  border-radius: 7px;
  border-bottom-left-radius: 0;

  background-color: var(--feedback-secondary-color);
  color: var(--feedback-primary-color);

  transition: all 0.3s;

  &:hover {
    border-radius: 0px;

    color: var(--feedback-primary-color);
    background-color: var(--background-color);
    background-image: url("data:image/svg+xml,%3Csvg width='52' height='26' viewBox='0 0 52 26' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffacac' fill-opacity='0.4'%3E%3Cpath d='M10 10c0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6h2c0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4v2c-3.314 0-6-2.686-6-6 0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6zm25.464-1.95l8.486 8.486-1.414 1.414-8.486-8.486 1.414-1.414z' /%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
    animation: animatedBackground 5s linear infinite alternate;
  }

  @keyframes animatedBackground {
    from {
      background-position: 0 0;
    }
    to {
      background-position: 100% 0;
    }
  }
`;

export default ConfirmButton;
