import React, { useEffect } from 'react';
import TodoEl from './TodoEl';
import { v4 as uuidv4 } from 'uuid';
import { userApis } from '../apis/auth';

import TodoEdit from '../components/TodoEdit';

const TodoList = ({ todos, setTodos, onToggle }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const onRemove = id => {
    userApis
      .deleteTodo(id)
      .then(res => {
        if (res.status === 204) {
          console.log('res', res);
          userApis.getTodo().then(res => {
            console.log('All Todos', res.data);
            setTodos(res.data);
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
    // setTodos([todos].filter(todo => todo.id !== id));
  };

  const onEdit = () => {
    setIsOpen(true);
  };

  return (
    <div id='todoboard_wrap'>
      <div className='todos'>
        {todos?.map(todos => {
          return <TodoEl todos={todos} key={uuidv4()} onRemove={onRemove} onEdit={onEdit} onToggle={onToggle} />;
        })}
        {/* {isOpen && <TodoEdit id={todos.id} todos={todos} setIsOpen={setIsOpen} />} */}
        {todos?.map(todos => {
          return isOpen && <TodoEdit id={todos.id} key={uuidv4()} todos={todos} setIsOpen={setIsOpen} />;
        })}
      </div>
    </div>
  );
};

export default TodoList;
