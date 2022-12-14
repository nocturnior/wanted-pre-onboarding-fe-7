import React from 'react';
import styled from 'styled-components';

const TodoHeader = ({ todos }) => {
  const undoneTasks = todos.filter(todo => !todo.isCompleted);

  const today = new Date();

  const dateString = today.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const dayName = today.toLocaleDateString('ko-KR', { weekday: 'long' });

  return (
    <HeaderWrap>
      <Title>π²μ€λ ν  μΌπ²</Title>
      <Day>{dateString}</Day>
      <Dow>{dayName}</Dow>
      <Task>π {undoneTasks.length}κ° λ¨μμ</Task>
    </HeaderWrap>
  );
};

export default TodoHeader;

const HeaderWrap = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: baseline;
  margin: auto;
`;

const Title = styled.div`
  text-align: center;
  font-size: 1.875rem;
  font-weight: 700;
  color: #2c2f33;
  padding: 30px;
`;

const Day = styled.div`
  font-size: 25px;
  text-align: right;
  padding: 30px;
  color: #2c2f33;
  font-weight: 800;
`;

const Dow = styled.div``;

const Task = styled.div`
  display: block;
  font-size: 1rem;
  color: #2c2f33;
  padding: 30px;
`;