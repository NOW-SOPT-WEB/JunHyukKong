import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function useLogin() {
  const [userId, setUserId] = useState("");
  const [userPw, setUserPw] = useState(""); 
  const [isEmptyId, setIsEmptyId] = useState(false);
  const [isEmptyPw, setIsEmptyPw] = useState(false);
  const idInput = useRef<HTMLInputElement>();
  const pwInput = useRef<HTMLInputElement>();
  const idInputText = useRef<HTMLParagraphElement>();
  const pwInputText = useRef<HTMLParagraphElement>();
  const navigate = useNavigate();

  useEffect(()=>{
    console.log(1);
    if(isEmptyId === true){
      alert("id 입력하세요.");
      idInput.current?.focus(); //idInput.current는 undefined일 수 있습니다..?
      idInputText.current.value = "";
      //idInputText.current.innerText = "아이디를 입력하세요.";
      //pwInputText.current.innerText = "";

    }
    else if(isEmptyPw){
      alert("pw 입력하세요.");
      pwInput.current?.focus();
      pwInputText.current.value = "";
      //pwInputText.current.innerText = "비밀번호를 입력하세요.";
      //idInputText.current.innerText = "";

    }
  },[isEmptyId, isEmptyPw])

  function handleSubmitForm(e: React.FormEvent) {
    e.preventDefault();

    const fetchData = async () => {
      if (userId === "") {
        setIsEmptyId(true);
        setTimeout(() => setIsEmptyId(false), 500);
      } else if (userPw === "") {
        setIsEmptyPw(true);
        setTimeout(() => setIsEmptyPw(false), 500);
      } else {
        try {
          const data = await axios.post(`http://34.64.233.12:8080/member/login`, {
            authenticationId: userId,
            password: userPw 
          });
          const memberId = data.headers.location;
          alert(data.data.message);
          navigate(`/main/${memberId}`);
        } catch (error: any) {
          alert(error.response.data.message);
          idInput.current.value = ""; 
          pwInput.current.value = "";
          setUserId("");
          setUserPw("");
        }
      }
    }
    fetchData();
  }

  function handleChangeIdInput(e: React.ChangeEvent<HTMLInputElement>) {
    setUserId(e.target.value);
  }

  function handleChangePwInput(e: React.ChangeEvent<HTMLInputElement>) {
    setUserPw(e.target.value);
  }

  function handleClickBtn() {
    navigate("/signup");
  }

  return {
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
  };
}

export default useLogin;
