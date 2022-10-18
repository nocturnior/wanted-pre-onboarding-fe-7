import React, { useEffect } from 'react';
import styled from 'styled-components';
import { MdDone, MdDelete, MdEdit } from 'react-icons/md';
import TodoEdit from './TodoEdit';

import { userApis } from './../apis/auth';

const TodoEl = ({ id, todos, setTodos, onRemove, onEdit }) => {
  const [isTodo, setIsTodo] = React.useState(todos);
  const [isCompleted, setIsCompleted] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);


  const onToggle = id => {
    setTodos(
      todos.map(todo => {
        return todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo;
      })
    );
  };

  return (
    <div className='todoitem'>
      <ItemBlock>
        <CheckCircle isCompleted={isCompleted} onClick={() => onToggle(id)}>
          {isCompleted && <MdDone />}
        </CheckCircle>

        <Title isCompleted={isCompleted}>{todos.todo}</Title>

        <Edit onClick={() => onEdit(id)}>
          <MdEdit />
        </Edit>

        <Remove onClick={() => onRemove(isTodo.id)}>
          <MdDelete />
        </Remove>
      </ItemBlock>
    </div>
  );
};

export default TodoEl;

const Edit = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: red;
  cursor: pointer;
  &:hover {
    color: #f70d1a;
  }
  display: none;
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
  display: none;
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
`;

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
