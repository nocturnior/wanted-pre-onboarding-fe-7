import React, { useEffect } from 'react';
import TodoEl from './TodoEl';

import { userApis } from '../apis/auth';

const TodoList = ({ todos, onToggle, onRemove }) => {
  const [myTodos, setMyTodos] = React.useState([]);

  useEffect(() => {
    userApis.getTodo().then(res => {
      console.log('All Todos', res.data);
      setMyTodos(res.data);
    });
  }, []);

  return (
    <div id='todoboard_wrap'>
      <div className='todos'>
        {myTodos?.map((todos) => {
          return <TodoEl todos={todos} key={todos.id} onRemove={onRemove} onToggle={onToggle} />;
        })}
      </div>
    </div>
  );
};

export default TodoList;
