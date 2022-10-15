import React from 'react';
import TodoEl from './TodoEl';

function TodoList({ todos, onToggle, onRemove }) {
  return (
    <div id='todoboard_wrap'>
      <div className='todos'>
        {todos.map(todos => {
          return <TodoEl todos={todos} key={todos.id} onRemove={onRemove} onToggle={onToggle} />;
        })}
      </div>
    </div>
  );
}

export default TodoList;
