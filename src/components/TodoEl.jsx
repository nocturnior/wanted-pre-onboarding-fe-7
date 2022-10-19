import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { MdDone, MdDelete, MdEdit } from 'react-icons/md';

import TodoEdit from './TodoEdit';
import { userApis } from '../apis/auth';

const TodoEl = ({ todos, setTodos, onRemove }) => {
  const [isTodo, setIsTodo] = React.useState(todos);
  const [isCompleted, setIsCompleted] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);
  const { id } = useParams();

  const onToggle = () => {
    setIsCompleted(todos.id === id ? !todos.isCompleted : !todos.isCompleted);
    userApis.updateTodo(todos).then(res => {
      console.log('🚀 ⁝ onToggle ⁝ res', res);
    });
    userApis.getTodo().then(res => {
      setIsTodo(res.data);
    });
    // setTodos(
    //   todoArr.map(todo => {
    //     return todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo;
    //   })
    // );
  };

  const onEdit = () => {
    setIsOpen(true);
  };

  return (
    <div className='todoitem'>
      <ItemBlock>
        <CheckCircle isCompleted={isCompleted} onClick={() => onToggle(todos.id)}>
          {isCompleted && <MdDone />}
        </CheckCircle>

        <Title isCompleted={isCompleted}>{todos.todo}</Title>

        <Edit>
          <MdEdit onClick={() => onEdit()} />
        </Edit>

        <Remove onClick={() => onRemove(todos.id)}>
          <MdDelete />
        </Remove>

        {isOpen && <TodoEdit id={todos.id} placeholder={todos.todo} todos={todos} setTodos={setTodos} setIsOpen={setIsOpen} isCompleted={isCompleted} setIsCompleted={setIsCompleted} onToggle={onToggle} />}
      </ItemBlock>
    </div>
  );
};

export default TodoEl;

const CheckCircle = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 16px;
  border: ${props => (props.isCompleted ? `1px solid #008080` : `1px solid #43BFC7`)};
  font-size: 16px;
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 15px;
  cursor: pointer;
  color: ${props => props.isCompleted && `#4C787E`};
`;

const Edit = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: red;
  cursor: pointer;
  &:hover {
    color: #f70d1a;
  }
  /* display: none; */
`;

const Remove = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: red;
  cursor: pointer;
  &:hover {
    color: #f70d1a;
  }
  /* display: none; */
`;

const ItemBlock = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-wrap: wrap;
  width: 300px;
  padding-top: 12px;
  padding-bottom: 12px;
  &:hover {
    ${Remove} {
      display: initial;
    }
  }
  &:hover {
    ${Edit} {
      display: initial;
    }
  }
`;

// const CheckCircle = styled.div`
//   width: 32px;
//   height: 32px;
//   border-radius: 16px;
//   border: ${props => (props.isCompleted ? `1px solid #008080` : `1px solid #43BFC7`)};
//   font-size: 16px;
//   font-weight: 800;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   margin-right: 15px;
//   cursor: pointer;
//   color: ${props => props.isCompleted && `#4C787E`};
// `;

const Title = styled.span`
  flex: 1;
  font-size: 16px;
  font-weight: 600;
  margin-right: 10px;
  color: ${props => (props.isCompleted ? `gray` : `#2c2f33`)};
  text-decoration-line: ${props => props.isCompleted && `line-through`};
`;

const Con = styled.span`
  // flex: 1;
  font-size: 14px;
  margin-right: 20px;
  color: ${props => (props.isCompleted ? `gray` : `#2c2f33`)};
  text-decoration-line: ${props => props.isCompleted && `line-through`};
`;
