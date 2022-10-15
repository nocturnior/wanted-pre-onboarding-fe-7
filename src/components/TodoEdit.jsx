import React, { useState } from 'react';
import styled from 'styled-components';
import useInput from '../hooks/useInput';

// Components
import MainButton from './MainButton';

const TodoEdit = ({ setIsOpen, title, content, id, tag }) => {
  console.log('🚀 ~ tag', Array.isArray(tag));
  // const dispatch = React.useDispatch();

  const closeModal = () => {
    setIsOpen(false);
  };

  const [editTitle, onChangeEditTitle, titleReset] = useInput();
  const [editComment, onChangeEditComment, commentReset] = useInput();
  const [check, setCheck] = useState([]);

  // onCheck -> 배열을 JOIN으로 문자열로 바꾼다...
  const onCheck = selected => {
    setCheck([...check, selected]);
  };
  const onUnCheck = selected => {
    setCheck(check.filter(el => el !== selected));
  };

  const onSubmit = () => {
    titleReset();
    commentReset();
    closeModal();
    // dispatch(__editTodo({ id: id, title: editTitle, content: editComment, tag: check.join(',') }));
  };

  return (
    <ModalBack onClick={closeModal}>
      <ModalBox variants={CreateAnimation} initial='start' animate='end' onClick={e => e.stopPropagation()}>
        <ModalHeader>
          <ModalLable size={35}>수정하기</ModalLable>
        </ModalHeader>

        <ModalCon>
          <ModalTitle onChange={onChangeEditTitle} placeholder={title}></ModalTitle>

          <div style={{display:'flex', justifyContent:'space-around'}}>
            <MainButton buttonName={'수정하기'} onClick={onSubmit} />
            <MainButton buttonName={'취소'} onClick={closeModal} />
          </div>
        </ModalCon>
      </ModalBox>
    </ModalBack>
  );
};

const ModalBack = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

const ModalBox = styled.div`
  border: 1px solid lightgray;
  border-radius: 10px;
  background-color: white;
  width: 700px;
  height: auto;
  padding: 40px 40px 30px 40px;
  z-index: 999;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ModalTitle = styled.input`
  width: 60%;
  height: 40px;
  border: 0.5px solid #6d6158;
  border-radius: 20px;
  box-shadow: 0px 15px 25px -4px rgba(150, 150, 150, 0.24);
  margin-right: 30px;
  padding: 10px;
  font-weight: 500;
  font-size: 20px;
  color: #2f2f2f;
`;


const ModalLable = styled.div`
  font-size: ${props => props.size}px;
  margin-bottom: 20px;
`;

const CloseModal = styled.div`
  color: gray;
`;

const ModalCon = styled.div`
  display: flex;
  align-items: center;
`;

const CreateAnimation = {
  start: { opacity: 0, scale: 0.5 },
  end: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
};

export default TodoEdit;
