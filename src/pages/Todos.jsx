import React, { useEffect } from 'react';
import styled from 'styled-components';

// Components
import TodoHeader from '../components/TodoHeader';
import TodoForm from '../components/TodoForm';
import TodoList from '../components/TodoList';
import TodoEdit from '../components/TodoEdit';
import { userApis } from './../apis/auth';

const Todos = () => {
  const [todos, setTodos] = React.useState([]);
  const [isOpen, setIsOpen] = React.useState(false);

  const onToggle = id => {
    setTodos(
      todos.map(todo => {
        return todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo;
      })
    );
  };

  const onEdit = id => {
    setIsOpen(true);
  };

  const onRemove = id => {
    setTodos(todos.filter(todos => todos.id !== id));
  };

  return (
    <Wrap>
      <TodoHeader todos={todos} setTodos={setTodos} />
      <TodoForm todos={todos} setTodos={setTodos} />
      <TodoList todos={todos} onToggle={onToggle} onEdit={onEdit} onRemove={onRemove} />
      {isOpen && <TodoEdit setIsOpen={setIsOpen} />}
    </Wrap>
  );
};

export default Todos;

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin: auto;
`;
