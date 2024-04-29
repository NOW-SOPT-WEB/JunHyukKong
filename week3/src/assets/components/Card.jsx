import { useState } from 'react'
import styled from 'styled-components';

//filp = true/false (매칭여부에 따라서 결정된 값)
function Card({uniqueId, id, imgSrc, isOpen, onCardFunc, flipedCards}) {  
  /*if(filp === false(매칭이 안됨)면 -> 뒷면, true면 앞면) -> 카드의 상태를 유지하는데 사용될것(뒷면인 상태로 '되돌아가게 하는데 사용해야할 것 같음',)
  만약 참이었다면, (매칭된거니까) - 쭉, 건드릴수도 없게, 계속 앞면 상태 유지.*/

  const [isFront, setIsFront] = useState(isOpen); //카드가 앞면인지 뒷면인지 -> 별로 좋은 코드는 아님(props로 상태를 받아오는게 좋지는 않음)
  const cantFilp = isOpen; //다시 뒤집을 수 있는지 저장하는 변수 (true일시, 다시는 뒤집을 수 없음)
  
  if(!cantFilp){ //포함되어 있는게 아니라면
    console.log("현재 카드가 렌더링될 때 flipCards 배열은", flipedCards);
    let willFilp = false;
    if(flipedCards.includes(uniqueId))
    {
      willFilp= true;
      flipedCards = [];
    }
    if (willFilp) {
      console.log("0.5초 뒤,",uniqueId,"를 가진 카드는 다시 뒤집힙니다.");
      setTimeout(() => {
        setIsFront(false); // 
      }, 500); // 적절한 시간 간격을 설정하여 원하는 시간 후에 다시 뒤집히도록 함
    }
  }


  const handleCard = () => 
  {
    if(!cantFilp)
    {
      console.log(uniqueId,"를 가진 카드 선택함");
      setIsFront(!isFront);
      onCardFunc(id, uniqueId);
    }
  }

  return (
    <>
      <CardWrapper onClick={handleCard}>
      {isFront ? (
        <FrontImg src={imgSrc} alt='front'/>
      ) : (
      <BackImg src = "/src/assets/react.svg" alt="back"/>
      )}
      </CardWrapper>
    </>
  );
}

const CardWrapper = styled.div`
  width: 10rem;
  height: 10rem;
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

