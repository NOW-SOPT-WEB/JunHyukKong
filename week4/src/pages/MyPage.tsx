import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useRef } from "react";
import Input from "../assets/Input";
import Info from "../assets/Info";
import axios from "axios";
import styled from "styled-components";



function MyPage()  : JSX.Element
{
  const {memberId} = useParams();

  const oldPw = useRef();
  const newPw = useRef();
  const confirmPw = useRef();
  
  let getdata : any;
  useEffect(()=>{
    const fetchData = async() => {
      try{
        const data = await axios.get("http://34.64.233.12:8080/member/info",
        {headers:{
          memberId : memberId
        }})
        console.log(data);
        return data;

      }
      catch(e:any){
        alert(e.response.data.message);
      }
    }
    getdata = fetchData();
  },[])
  console.log(getdata.data.message);

  

  return (
    <MyPageWrapper>
      <MyInfo>
        <Info name="ID" content={getdata.data.data.authenticationId}/>
        <Info name="닉네임" content={getdata.data.data.nickname}/>
        <Info name="전화번호" content={getdata.data.data.phone}/>

      </MyInfo>
      <ChangePw>
        <Input ref={oldPw} name="기존 비밀번호"/>
        <Input ref={newPw} name="새로운 비밀번호"/>
        <Input ref={confirmPw} name="비밀번호 확인"/>
        <PwChangeBtn/>
      </ChangePw>
      <HomeBtn/>
    </MyPageWrapper>
    
  );
}

const MyPageWrapper = styled.div`
  
`;

const MyInfo = styled.div`
  
`;

const ChangePw = styled.div`

`;



const HomeBtn = styled.button`
  

`;


const PwChangeBtn = styled.button`
  

`;


export default MyPage;