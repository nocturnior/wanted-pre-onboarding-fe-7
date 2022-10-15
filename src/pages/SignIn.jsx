import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

// apis
import { userApis } from '../apis/auth';

// components
import EditInput from '../components/EditInput';
import MainButton from '../components/MainButton';

// hooks
import useInput from '../hooks/useInput';

const SignIn = () => {
  const navigate = useNavigate();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  // 이메일 / 비밀번호
  const [userInfo, setUserInfo] = useState({ email: '', pw: '' });

  // 버튼 활성/비활성
  const [isEnable, setIsEnable] = useState(true);

  // 로그인 핸들러
  const onSigninHandler = e => {
    e.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    const data = { email: enteredEmail, password: enteredPassword };

    userApis
      .signin(data)
      .then(res => {
        console.log(res);
        navigate('/todo');
      })
      .catch(err => {
        console.log(err);
        alert('아이디 비번을 확인하세요');
      });
  };

  useEffect(
    e => {
      userInfo.email && userInfo.pw ? setIsEnable(false) : setIsEnable(true);
    },
    [userInfo]
  );

  const ActiveIsPassedLogin = () => {
    return userInfo.email.includes('@') && userInfo.pw.length >= 5 ? isEnable(true) : isEnable(false);
  };

  return (
    <Wrap>
      <h1 style={{ fontSize: '30px', fontWeight: '700', textAlign: 'center', margin: '20px 0px' }}>로그인</h1>

      {/* 이메일 */}
      <EditInput inputLabel={'이메일'} placeholder={'이메일'} type={'email'} inref={emailInputRef} />

      {/* 비밀번호 */}
      <EditInput inputLabel={'비밀번호'} placeholder={'비밀번호'} type={'password'} minlength={'8'} inref={passwordInputRef} />

      {/* 회원가입으로 */}
      <GoSignup
        onClick={() => {
          navigate('/signup');
        }}>
        아직 회원이 아니신가요?
      </GoSignup>

      {/* 로그인버튼 */}
      <MainButton buttonName={'로그인하기'} onClick={onSigninHandler} />
    </Wrap>
  );
};

export default SignIn;

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 40%;
  margin: 90px auto;
  padding: 30px;
  border-radius: 20px;
  box-shadow: 7px 9px 44px -1px rgba(150, 150, 150, 0.31);
  /* .message {
    position: absolute;
    font-size: 1.4vh;
    font-weight: 500;
    &.success {
      color: #5e43ff;
    }
    &.error {
      color: #e94560;
    }
  } */
`;

const GoSignup = styled.div`
  text-align: center;
  color: #aaa;
  font-size: 0.875rem;
  margin: 30px auto;
`;
