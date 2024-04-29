import { useCallback, useEffect, useRef, useState } from 'react'
import styled from 'styled-components';
import theme from '../../theme';
import Header from './Header';
import CardSection from './CardSection';
import ModeBtn from './ModeBtn';
import CARDLIST from '../js/utils/CARDLIST';



function CardGame(){
  //useState의 init값은 아무리 리렌더링 된다고 해도 '딱 첫 렌더링에만' 초기값(init)이 할당된다.
  const [mode, setMode] = useState("easy"); //배열이기 때문에, const 선언 가능
  const [cardList, setCardList] = useState([]);
  const [firstCard, setFirstCard] = useState(null);
  const [secondCard, setSecondCard] = useState(null);
  const [score, setScore] = useState(0); //처음에는 useRef사용할까 했는데.. 계속 변해야하니까 상태가 맞음

  /************** 이 부분 정의 해야함 *********
  //cardList가 변할때(아예 mode가 변하면서 리렌더링될 때)
  useEffect(()=> {}
  , [cardList]);

  //firstCard, secondCard 상태가 변할 때마다 둘이 같은지 체크해보는 로직
  useEffect(()=>{
  }
  , [firstCard, secondCard]);


  // 현재 선택된 카드의 id를 확인하여, firstCard 혹은 secondCard 상태에 넣어둠 -> prop으로 쭉 내려줘서 Card 컴포넌트에서 사용할 예정
  const selectCard = (id) => {
    firstCard[0] ? setSecondCard(id) : setFirstCard(id);  
  };
  *************************************/
  const goal = useRef(5); //점수 매번 초기화 되지 않도록(렌더링에 상관없이 유지하도록) useRef 활용
  const modeHandle = useCallback((e) => { //매번 함수 렌더링될때마다 정의하지 않도록 useCallback 사용
    setMode(e.currentTarget.innerText);
    switch(e.currentTarget.innerText)
    {
      case "easy" :
        goal.current = 5;
        break;
      case "normal":
        goal.current = 7;
        break;
      case "hard":
        goal.current = 9;
        break;
    }
    console.log(`${e.currentTarget.innerText}로 mode 설정(state)`);
    console.log(`현재 목표 점수는 : ${goal.current} 이다.`);
  }, []);

  return (
    <>
      <Header score={score} goal={goal.current}/>
      <ModeSelect>
        <ModeBtn modeString={"easy"} modeHandle={modeHandle} />
        <ModeBtn modeString={"normal"} modeHandle={modeHandle} />
        <ModeBtn modeString={"hard"} modeHandle={modeHandle} />
      </ModeSelect>
      <CardSection/>
    </>
  );
}

const ModeSelect = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  position: fixed;
  top: 20vh;
  
  width: 100vw;
  height: 20vh;

  font-size: ${theme.fonts.md};
`;


export default CardGame;