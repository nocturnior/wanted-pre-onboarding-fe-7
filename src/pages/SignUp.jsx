import React from 'react';
import styled from 'styled-components';

// components
import EditInput from '../components/EditInput';
import Button from '../components/MainButton';
import { useNavigate } from 'react-router-dom';
import { userApis } from './../apis/auth';

const SignUp = () => {
  const navigate = useNavigate();
  const emailInputRef = React.useRef();
  const passwordInputRef = React.useRef();

  // 이메일 / 비밀번호
  const [userInfo, setUserInfo] = React.useState({ email: '', pw: '' });

  // 버튼 활성/비활성
  const [isEnable, setIsEnable] = React.useState(true);

  const onSignupHandler = e => {
    e.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    // validation
    if (isEnable) {
    } else {
      console.log('되나?');
      fetch('https://pre-onboarding-selection-task.shop/auth/signup', {
        method: 'POST',
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
          returnSecureToken: true,
          // withCredentials: true,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      }).then(res => {
        if (res.ok) {
          console.log(res.data);
        } else {
          return res.json().then(data => {
            // show an error modal
            console.log(data);
          });
        }
      });
    }
  };

  const onSubmitHandler = e => {
    e.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    const data = { email: enteredEmail, password: enteredPassword };

    userApis
      .signup(data)
      .then(res => {
        console.log(res);
        navigate('/');
      })
      .catch(err => {
        console.log(err);
        alert('아이디 비번을 확인하세요');
      });
  };

  return (
    <Wrap>
      <h1 style={{ fontSize: '30px', fontWeight: '700', textAlign: 'center', margin: '20px 0px' }}>회원가입</h1>
      <EditInput inputLabel={'이메일'} placeholder={'이메일'} type={'email'} inref={emailInputRef} />
      <EditInput inputLabel={'비밀번호'} placeholder={'비밀번호'} type={'password'} inref={passwordInputRef} minlength={8} />
      {/* <EditInput inputLabel={'비밀번호 확인'} placeholder={'비밀번호'} type={'password'} /> */}
      <GoSignup onClick={() => navigate('/')}>이미 회원이신가요?</GoSignup>
      <Button buttonName={'회원가입'} onClick={onSubmitHandler} />
    </Wrap>
  );
};

export default SignUp;

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 40%;
  margin: 90px auto;
  padding: 30px;
  border-radius: 20px;
  box-shadow: 7px 9px 44px -1px rgba(150, 150, 150, 0.31);
`;

const GoSignup = styled.div`
  cursor: pointer;
  text-align: center;
  color: #aaa;
  font-size: 0.875rem;
  margin: 30px auto;
  &:hover {
    color: #22438a;
  }
`;
