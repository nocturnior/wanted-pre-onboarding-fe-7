import React, { useEffect } from 'react';
import TodoEl from './TodoEl';
import { useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { userApis } from '../apis/auth';

import TodoEdit from '../components/TodoEdit';

const TodoList = ({ todos, setTodos }) => {
  useEffect(() => {
    userApis.getTodo().then(res => {
      setTodos(res.data);
    });
  }, []);

  const onRemove = id => {
    // setTodos(todos.filter(todo => todo.id !== id));
    userApis
      .deleteTodo(id)
      .then(res => {
        if (res.status === 204) {
          console.log('res', res);
          userApis.getTodo().then(res => {
            setTodos(res.data);
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <div id='todoboard_wrap'>
      <div className='todos'>
        {todos?.map(todos => {
          return <TodoEl id={todos.id} todos={todos} setTodos={setTodos} key={uuidv4()} onRemove={onRemove} />;
        })}
      </div>
    </div>
  );
};

export default TodoList;
