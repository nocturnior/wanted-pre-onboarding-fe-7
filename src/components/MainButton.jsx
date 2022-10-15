import React from 'react';
import styled from 'styled-components';

const MainButton = ({ buttonName, onClick, disabled }) => {
  return (
    <>
      <StyledButton type='submit' onClick={onClick} disabled={disabled}>
        {buttonName}
      </StyledButton>
    </>
  );
};

const StyledButton = styled.button`
  cursor: pointer;
  min-width: 120px;
  height: 46px;
  background: #22438a;
  border: 1px solid #22438a;
  border-radius: 30px;
  font-weight: 400;
  color: #fff;
  /* margin-top: 60px; */
  :disabled {
    cursor: unset;
    background-color: #ccc;
    border: 1px solid #ccc;
  }
`;

export default MainButton;
