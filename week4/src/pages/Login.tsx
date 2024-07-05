import React, { useState } from "react";
import axios from "axios";
import { useEffect, useRef } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import useLogin from "../hooks/useLogin";

interface LoginPropTypes{
  //만들면서 필요한 것 작성해나갈 예정
}

function Login(props: LoginPropTypes) : JSX.Element
{
  const {
    userId,
    userPw,
    isEmptyId,
    isEmptyPw,
    idInput,
    pwInput,
    idInputText,
    pwInputText,
    handleSubmitForm,
    handleChangeIdInput,
    handleChangePwInput,
    handleClickBtn
  } = useLogin();


  return (
    <LoginPage>
      <SignUpWrapper>
        <LoginHeader>
          <h1>Login</h1>
          <FontAwesomeIcon icon={faRightToBracket} fontSize={`4rem`} fade/> {/*individual import를 잘 살피기! 추가로 공식 문서 잘 읽기) https://docs.fontawesome.com/web/style/size */}
        </LoginHeader>
        <LoginForm onSubmit={handleSubmitForm}>
          <LoginLogic>
            <IdInput ref={idInput} onChange={handleChangeIdInput}  type="text" placeholder="Id 입력해주세요" required/>
            <Styledp ref={idInputText}></Styledp>
            <PwInput ref={pwInput} type="password" onChange={handleChangePwInput} type="text" placeholder="Pw 입력해주세요" required/>
            <Styledp ref={pwInputText}></Styledp>
          </LoginLogic>
        </LoginForm>
        <BtnWrapper>
          <LoginBtn onClick={handleSubmitForm}>로그인</LoginBtn> 
          <SignUpBtn onClick={handleClickBtn}>회원가입</SignUpBtn>
        </BtnWrapper>
      </SignUpWrapper>
    </LoginPage>
  );
}

export default Login;


const SignUpWrapper = styled.div`
position: relative;

display: flex;
flex-direction: column;
justify-content: center;
align-items: center;

width: 30vw;
height: 70vh;
background-image: conic-gradient(from -38deg at 50% 50%, #fff 0deg, #999 360deg);

`;

const LoginLogic = styled.div`
  position: absolute;
  bottom: 10rem;

  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const LoginHeader = styled.header`
  position: absolute;
  top: 3rem;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 3rem; //간단하게 아이템간의 거리(갭) 퉁쳐버림

  & > h1{
    font-size: 4rem;
  }
`;



const LoginForm = styled.form`
  position: relative;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;
  

`;

const LoginPage = styled.div`
  position: relative;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  background-color: aliceblue;
  width: 100vw;
  height: 100vh;
`;

const IdInput = styled.input`
  width: 15rem;
  height: 5rem;
  margin: 1rem;

  &:focus{
    outline: none;
    border: 2px solid red;
  }
`;

const PwInput = styled.input`
  width: 15rem;
  height: 5rem;
  margin: 1rem;

  &:focus{
    outline: none;
    border: 2px solid red;
  }
`;

const BtnWrapper = styled.div`
  position: absolute;
  bottom: 3rem;

  display: flex;
  width: 100%;
  
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;

const LoginBtn = styled.button`
  width: 5rem;
  height: 2rem;

  width: 20%;
  height: 10%;

  border: 1px dotted grey;
  border-radius: 0.5rem;
  margin-top: 1rem;

  &:hover{
    background-color: silver;
  }
`;

const SignUpBtn = styled.button`
  width: 5rem;
  height: 2rem;

  width: 20%;
  height: 100%;

  border: 1px dotted grey;
  border-radius: 0.5rem;
  margin-top: 1rem;

  &:hover{
    background-color: silver;
  }
`;

const Styledp = styled.p`
  margin-top: 0.2rem;
  font-size: 1.5rem;
  font-weight: 500;
 
  color: #e73030;

`;
