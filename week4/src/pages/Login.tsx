import React, { useState } from "react";
import axios from "axios";
import { useEffect, useRef } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";

interface LoginPropTypes{
  //만들면서 필요한 것 작성해나갈 예정
}

function Login(props: LoginPropTypes) : JSX.Element
{
  const [userId, setUserId] = useState("");
  const [userPw, setUserPw] = useState(""); 
  const [isEmptyId, setIsEmptyId] = useState(false);
  const [isEmptyPw, setIsEmptyPw] = useState(false);
  const idInput = useRef<HTMLInputElement>();
  const pwInput = useRef<HTMLInputElement>();
  const idInputText = useRef<HTMLParagraphElement>();
  const pwInputText = useRef<HTMLParagraphElement>();

  
  useEffect(()=>{
    console.log(1);
    if(isEmptyId === true){
      alert("id 입력하세요.");
      idInput.current.focus(); //idInput.current는 undefined일 수 있습니다..?
      idInputText.current.innerText = "아이디를 입력하세요.";
      pwInputText.current.innerText = "";

    }
    else if(isEmptyPw){
      alert("pw 입력하세요.");
      pwInput.current.focus();
      pwInputText.current.innerText = "비밀번호를 입력하세요.";
      idInputText.current.innerText = "";

    }
  },[isEmptyId, isEmptyPw])
  


  function handleSubmitForm(e:React.FormEvent) //제출을 할 시, API 요청으로 정보 입력하고 받아오는 과정 
  {
    e.preventDefault();
    console.log(2);

    const fetchData = async() => {
      if(userId === "")
      {
        setIsEmptyId(true);
        setTimeout(()=>setIsEmptyId(false),500); //이걸 해줘야만, 계속 경고문구가 뜨게 할 수 있다.
        console.log(3);
      }
      else if(userPw ==="")
      {
        setIsEmptyPw(true);
        setTimeout(()=>setIsEmptyPw(false),500);
        console.log(4);
      }
      else
      {
        console.log(5);
        try {
          console.log(6);
          const data = await axios.post(`http://34.64.233.12:8080/member/login`
          ,{
            authenticationId : userId,
            password : userPw 
          }
          );
          //console.log("진행은 잘됨",data);
        }
        catch(error:any){ //만약 틀려먹었을 경우, 에러 객체를 던져줌. (그걸 콘솔에 찍어보고, 필요한 데이터를 뽑아내면 됨)
          console.log(error);
          console.log(error.response.status);
          console.log(error.response.data.message);
        }
        
      }
      
    }
    fetchData();
        
      
  }

  function handleChangeIdInput(e: React.ChangeEvent<HTMLInputElement>)
  {
    setUserId((prev)=>e.target.value);
    console.log(userId);
  }

  function handleChangePwInput(e: React.ChangeEvent<HTMLInputElement>)
  {
    setUserPw((prev)=>e.target.value);
    console.log(userPw);
  }
  

  return (
    <LoginPage>
      
      <LoginForm onSubmit={handleSubmitForm}>
      <LoginHeader>
        <h1>Login</h1>
        <FontAwesomeIcon icon={faRightToBracket} fontSize={`4rem`} fade/> {/*individual import를 잘 살피기! 추가로 공식 문서 잘 읽기) https://docs.fontawesome.com/web/style/size */}
      </LoginHeader>
      <LoginLogic>
        <IdInput ref={idInput} onChange={handleChangeIdInput}  type="text" placeholder="Id 입력해주세요" required/>
        <Styledp ref={idInputText}></Styledp>
        <PwInput ref={pwInput} type="password" onChange={handleChangePwInput} type="text" placeholder="Pw 입력해주세요" required/>
        <Styledp ref={pwInputText}></Styledp>
        <BtnWrapper>
          <LoginBtn onClick={handleSubmitForm}>로그인</LoginBtn> 
          <SignUpBtn>회원가입</SignUpBtn>
        </BtnWrapper>
        
      </LoginLogic>
        
      </LoginForm>
      
    </LoginPage>
  );
}

export default Login;


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

  width: 30vw;
  height: 70vh;
  background-image: conic-gradient(from -38deg at 50% 50%, #fff 0deg, #999 360deg);

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
    border: 1px solid red;
  }
`;

const BtnWrapper = styled.div`
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
`;

const SignUpBtn = styled.button`
  width: 5rem;
  height: 2rem;

  width: 20%;
  height: 10%;

  border: 1px dotted grey;
  border-radius: 0.5rem;
  margin-top: 1rem;
`;

const Styledp = styled.p`
  margin-top: 0.2rem;
  font-size: 1.5rem;
  font-weight: 500;
 
  color: #e73030;

`;
