import React, { useEffect } from 'react';
import styled from 'styled-components';

// Components
import TodoHeader from '../components/TodoHeader';
import TodoForm from '../components/TodoForm';
import TodoList from '../components/TodoList';
import TodoEdit from '../components/TodoEdit';
import { userApis } from './../apis/auth';
import { useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

const Todos = () => {
  const [todos, setTodos] = React.useState([]);
  const [isOpen, setIsOpen] = React.useState(false);

  useEffect(() => {
    userApis.getTodo().then(res => {
      console.log('All Todos', res.data);
      setTodos(res.data);
    });
  }, []);

  return (
    <Wrap>
      <TodoHeader todos={todos} setTodos={setTodos} />
      <TodoForm todos={todos} setTodos={setTodos} />
      <TodoList id={todos.id} todos={todos} setTodos={setTodos} setIsOpen={setIsOpen} />
      {/* {isOpen && <TodoEdit id={todos.id} todos={todos} setIsOpen={setIsOpen} />} */}

      {/* {todos?.map((todo, idx) => {
        return isOpen && <TodoEdit id={idx} key={uuidv4()} todos={todo} setTodos={setTodos} setIsOpen={setIsOpen} />;
      })} */}
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
