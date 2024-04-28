import { useState } from 'react'
import styled from 'styled-components';


function Card() {  
  const [isFront, setIsFront] = useState(true); //카드가 앞면인지 뒷면인지
 
  
  const handleBtn = () => 
  {
    setIsFront(!isFront);
    alert("버튼 클릭");
  }
  return (
    <>
      <div>
      {isFront ? (
        <FrontImg src='/src/assets/예시.jpg' alt='예시'/>
      ) : (
      <BackImg src = "/src/assets/react.svg" alt="리액트"></BackImg>
      )};
        
        <button type='button' onClick={handleBtn}>
          사진 변경 버튼
        </button>
      </div>
    </>
  );
}

const FrontImg = styled.img`
  width: 10rem;
  height: 10rem;
`;

const BackImg = styled.img`
  width: 10rem;
  height: 10rem;
`;

export default Card;

