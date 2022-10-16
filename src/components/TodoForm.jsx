import React, { useState } from 'react';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';

// Components
import EditInput from './EditInput';
import MainButton from './MainButton';
import { userApis } from './../apis/auth';

const TodoForm = ({ todos, setTodos }) => {
  // 제목, 내용 인풋 밸류 가져오기
  const [inputTitleValue, setInputTitleValue] = useState('');

  const data = { todo: inputTitleValue };

  const addItem = e => {
    e.preventDefault();

    // setTodos([...todos, { id: { uuidv4 }, todo: inputTitleValue, isCompleted: false }]);
    setInputTitleValue('');

    userApis
      .createTodo(data)
      .then(res => {
        console.log(res.data);
        // setTodos([...todos, { id: { uuidv4 }, todo: inputTitleValue, isCompleted: false }]);
      })
      .catch(err => {
        console.log('🚀 ⁝ addItem ⁝ err', err.message);
      });
  };

  const onChageHandlerT = event => {
    const inputTitle = event.target.value;
    setInputTitleValue(inputTitle);
  };

  return (
    <Wrap>
      <TodoTitle>
        <input type={'text'} name={'제목'} value={inputTitleValue} required onChange={onChageHandlerT} />
        <MainButton buttonName={'추가'} onClick={addItem} type='button' />
      </TodoTitle>
    </Wrap>
  );
};

export default TodoForm;

const Wrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TodoTitle = styled.div`
  display: flex;
  margin: 12px 0 20px 0;
  /* min-width: 350px; */

  & > input {
    width: 350px;
    height: 42px;
    margin-right: 1.25rem;
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
