import React, { useEffect } from 'react';
import TodoEl from './TodoEl';
import { v4 as uuidv4 } from 'uuid';
import { userApis } from '../apis/auth';

const TodoList = ({ todos, setTodos, onToggle }) => {
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

  const onEdit = id => {
    userApis.updateTodo(res => {
      setTodos(
        todos.map(todo => {
          return todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo;
        })
      );
    });
    // setIsOpen(true);
  };

  return (
    <div id='todoboard_wrap'>
      <div className='todos'>
        {todos?.map(todos => {
          return <TodoEl todos={todos} key={uuidv4()} onRemove={onRemove} onEdit={onEdit} onToggle={onToggle} />;
        })}
      </div>
    </div>
  );
};

export default TodoList;
