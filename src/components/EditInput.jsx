import React from 'react';
import styled from 'styled-components';

const EditInput = ({ inputLabel, name, type, value, onChange, disabled, placeholder, minlength, inref, onKeyUp }) => {
  const [inputValue, setInputValue] = React.useState('');

  return (
    <StyleWrap>
      <label style={{ fontWeight: '600', fontSize: '16px', lineHeight: '24px', marginBottom: '10px' }} htmlFor='userEditInput'>
        {inputLabel}
      </label>

      <input type={type} name={name} value={value} onChange={onChange} required disabled={disabled} placeholder={placeholder} minLength={minlength} ref={inref} onKeyUp={onKeyUp}></input>
    </StyleWrap>
  );
};

const StyleWrap = styled.div`
  display: flex;
  flex-direction: column;
  margin: 12px 0 20px 0;

  & > input {
    height: 42px;
    padding: 10px;
    background: #ffffff;
    border: 0.5px solid #eaeaea;
    border-radius: 30px;

    :disabled {
      background-color: #eaeaea;
      color: #b0b0b0;
    }

    :focus {
      outline: 2px solid #22438a;
    }
  }
`;

export default EditInput;
