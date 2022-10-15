import styled from 'styled-components';

const Modal = ({ message, visibility }) => {
  return (
    <ModalContainer $visibility={visibility}>
      <ModalBox>
        <p>{message}</p>
      </ModalBox>
    </ModalContainer>
  );
};

export default Modal;

const ModalContainer = styled.div`
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  max-width: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: ${props => (props.$visibility ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;
`;

const ModalBox = styled.div`
  width: 450px;
  background-color: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px;

  p {
    text-align: center;
    font-size: 1.2rem;
    line-height: 1.5;
  }
`;
