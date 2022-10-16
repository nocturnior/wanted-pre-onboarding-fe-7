import React, { useEffect } from 'react';
import TodoEl from './TodoEl';

import { userApis } from '../apis/auth';

const TodoList = ({ todos, onToggle, onRemove }) => {

  // useEffect(() => {
  //   userApis.getTodo().then(res => {
  //     console.log(res);
  //   });
  // }, []);

  return (
    <div id='todoboard_wrap'>
      <div className='todos'>
        {todos.map(todos => {
          return <TodoEl todos={todos} key={todos.id} onRemove={onRemove} onToggle={onToggle} />;
        })}
      </div>
    </div>
  );
};

export default TodoList;
