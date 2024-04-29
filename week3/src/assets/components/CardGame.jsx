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
  const [checkArr, setCheckArr] = useState([]); //두개의 카드의 id,key값을 넣어 선택 가능한지, 등등 넣을 예정
  const [openCards, setOpenCards] = useState([]); //열린 카드(정답을 맞춘 카드)의 id를 저장할 배열
  const [score, setScore] = useState(0); //처음에는 useRef사용할까 했는데.. 계속 변해야하니까 상태가 맞음

  //cardList가 변할때(아예 mode가 변하면서 리렌더링될 때)
  const getRandomList = useCallback((mode, CARDLIST) => {
    const CARDLIST_len = 16;
    let length;
    switch(mode)
    {
      case "easy":
        length = 5;
        break;
      case "normal":
        length = 7;
        break;
      case "hard":
        length = 9;
        break;
      default:
        console.log("Error in getRandomList");
        break;
    }
    
    const returnArr = [];
    console.log(returnArr.length);
    console.log(length);
    console.log(returnArr.length < length);
    
    while(returnArr.length < length) //length만큼 채울 때까지 반복 -> 무한 루프...발생
    {
      const index = Math.floor(Math.random() * CARDLIST_len); //알고보니 index문제 때문이었음
      const randomCard = CARDLIST[index];
      console.log("여기까진 이상 무");

      if(!returnArr.includes(randomCard)){ //해당 카드가 이미 포함되어 있다면 추가 과정 생략
        returnArr.push(CARDLIST[index]);
      }
    }
    return returnArr;
  },[]);

  /*
    반환값이 음수일 때, a가 b보다 앞에 있어야한다.
    반환값이 0일 때, 순서를 바꾸지 않는다.
    반환값이 양수일 떄, b가 a보다 앞에 있는다
    C++은 단순 true/false로 비교함수를 사용하는데 js는 조금 다른가보다.
   */
  const shuffleArr = useCallback((arr)=> {
    arr.sort(()=>Math.random() - 0.5); //0이상 1미만 까지의 숫자이므로 -0.5~0.5의 값을 이용하낟.
  }
  ,[])

  useEffect(()=> {
    let nowCardList = getRandomList(mode, CARDLIST);//랜덤으로 현재 mode에 맞게 카드 개수를 맞춰 뽑아옴
    nowCardList.push(...nowCardList); //2배로 복사
    shuffleArr(nowCardList); //랜덤으로 섞어줌

    setCardList(nowCardList);//카드 설정
  }
  , [mode]); //변할 때를 잘 작성을 해주어야 경고가 안 뜸. 또한, 내부에서 변경하는 값을 dependency로 하면 무한 루프 발생.

  // Card 컴포넌트까지 prop으로 내려줄 함수.
  // 현재 선택된 카드의 id를 확인하여, firstCard 혹은 secondCard 상태에 넣어둠 -> prop으로 쭉 내려줘서 Card 컴포넌트에서 사용할 예정
  const selectCard = (id,key) => {
    if(checkArr.length === 0)
    {
      checkArr.push({id,key});
    }
    else if(checkArr.length ===1) //만약 이미 1개는 들어가 있다면
    {
      if(checkArr[0].key !== key) //첫번째 카드와 key값이 같은지 비교 (다를 때 넣어줌)
      {
        checkArr.push({id, key});

        (checkArr[0].id === checkArr[1].id) ? //선택한 둘의 카드 id가 같다면 score++; 해당 카드 객체를 openCards에 추가, 그리고 checkArr 초기화.
        (setScore((prev)=>(prev+1)), setOpenCards((openCards)=>{openCards.push(checkArr[0].id)}), console.log(openCards, checkArr), setCheckArr([]))  
        : 
        (setCheckArr([]), console.log(openCards, checkArr)); 
      }
    }
  };

  const goal = useRef(5); //점수 매번 초기화 되지 않도록(렌더링에 상관없이 유지하도록) useRef 활용 (매번 반영되어야하면 state로)
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
      <CardSection cardList={cardList} openCards={openCards} onCardFunc = {selectCard}  />
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