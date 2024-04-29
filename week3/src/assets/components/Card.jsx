import { useState } from 'react'
import styled from 'styled-components';


function Card({key, id, imgSrc, isOpen, onCardFunc}) {  
  const [isFront, setIsFront] = useState(isOpen); //카드가 앞면인지 뒷면인지
 const cantFilp = isOpen; //다시 뒤집을 수 있는지 저장하는 변수 (true일시, 다시는 뒤집을 수 없음)
  
  const handleCard = () => 
  {
    console.log("Card 클릭");
    if(!cantFilp)
    {
      setIsFront(!isFront);
      onCardFunc(id, key);
    }
  }
  return (
    <>
      <CardWrapper onClick={handleCard}>
      {isFront ? (
        <FrontImg src={imgSrc} alt='front'/>
      ) : (
      <BackImg src = "/src/assets/react.svg" alt="back"/>
      )};
      </CardWrapper>
    </>
  );
}

const CardWrapper = styled.div`
  width: 20rem;
  height: 20rem;
  border: 2px solid pink;
`;

const FrontImg = styled.img`
  width: 10rem;
  height: 10rem;
`;

const BackImg = styled.img`
  width: 10rem;
  height: 10rem;
`;

export default Card;

