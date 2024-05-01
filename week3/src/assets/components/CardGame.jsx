import { useCallback, useEffect, useRef, useState } from 'react'
import styled from 'styled-components';
import theme from '../../theme';
import Header from './Header';
import CardSection from './CardSection';
import ModeBtn from './ModeBtn';
import CARDLIST from '../js/utils/CARDLIST';
import CompleteModal from './CompleteModal';

/*깊은 복사 얕은 복사 주의....... */

function CardGame(){
  //useState의 init값은 아무리 리렌더링 된다고 해도 '딱 첫 렌더링에만' 초기값(init)이 할당된다.
  const [mode, setMode] = useState("easy"); //배열이기 때문에, const 선언 가능
  const [score, setScore] = useState(0); //처음에는 useRef사용할까 했는데.. 계속 변해야하니까 상태가 맞음
  const [renderedCards, setRenderedCards] = useState([]); //렌더링될 카드 객체들
  const [clickedCards, setClickedCards] = useState([]); //idx만 담음
  const [complete, setComplete] = useState(false); //성공 여부


  //cardList가 변할때(아예 mode가 변하면서 리렌더링될 때)
  const getRandomList = useCallback((mode, CARDLIST) => {
    const CARDLIST_len = 16;
    //const initCards = [...CARDLIST]; //이거 필수! 아니면 참조에 의한 호출로, 상수 데이터가 변함 -> 요소가 객체이므로 얕은 복사가 일어남!! 주의!!
    //const initCards = Object.assign([], CARDLIST); -> 객체의 중첩이면 여전히 얕은 복사
    const initCards = JSON.parse(JSON.stringify(CARDLIST)); //따라서 아예, 내용물 전체를 문자열화시킨 뒤 다시 되돌리는 방식으로 사용하자.

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
    const modeCards = [];
  
    while(modeCards.length < length) //length만큼 채울 때까지 반복
    {
      const index = Math.floor(Math.random() * CARDLIST_len); 
      const randomCard = initCards[index];

      if(!modeCards.includes(randomCard)){ //해당 카드가 이미 포함되어 있다면 추가 과정 생략
        modeCards.push(initCards[index]);
      }
    }
    return modeCards;
  },[]);

 
  const shuffleArr = useCallback((arr)=> {
    arr.sort(()=>Math.random() - 0.5); //0이상 1미만 까지의 숫자이므로 -0.5~0.5의 값을 이용하낟.
  }
  ,[])

  useEffect(()=> { //mode가 변할때마다 새롭게 renderedCards 구성
    let modeCards = getRandomList(mode, CARDLIST);//랜덤으로 현재 mode에 맞게 카드 개수를 맞춰 뽑아옴
    modeCards.push(...modeCards); //2배로 복사
    shuffleArr(modeCards); //랜덤으로 섞어줌

    setRenderedCards(modeCards);//렌더링할 카드 최종 설정
    setClickedCards([]);
    setComplete(false);
    setScore(0);
  }
  , [mode]); 

  function resetCurrentMode(){
    let modeCards = getRandomList(mode, CARDLIST);//랜덤으로 현재 mode에 맞게 카드 개수를 맞춰 뽑아옴
    modeCards.push(...modeCards); //2배로 복사
    shuffleArr(modeCards); //랜덤으로 섞어줌

    setRenderedCards(modeCards);//렌더링할 카드 최종 설정
    setClickedCards([]);
    setComplete(false);
    setScore(0);
  }

  //clickedCards가 변할때마다, renderedCards의 모든 구성물이 true인지 파악해봄
  useEffect(()=>{
    if(renderedCards.every((obj)=>obj.status === true)) {
      setComplete(true);
      console.log("전부 맞췄습니다.");
    }
  }, [renderedCards])

  /*
  useEffect(()=>{    
    if(score === goal) {
      setComplete(true);
      console.log("전부 맞췄습니다.");
    }
  }, [score]);
  */

  //complete 플래그가 변하면, 성공 모달을 띄우거나 내림.
  useEffect(()=> {
    //작성 필요
  },[complete])

  /*
    계속 renderedCards[clickedCards[1]].id에 에러 생김 .......................
  */

  const selectCard = (idx) => { //idx값을 key값으로 받았을 거임가지고 있을거임
    console.log("selectCard 호출!");
    if(clickedCards.length === 0) //아직 2개가 안되었다면
    {
      console.log("1번쨰 카드 들어간다~");
      setClickedCards((prev)=> [...prev, idx]); //딱 렌더링된 카드의 번호를 넣어줌
      console.log("추가된 clickedCards: ",clickedCards);
    }
    else if(clickedCards.length === 1) //1개가 들어갔으면
    {
      if(!clickedCards.includes(idx)) //눌려진적 없는 카드라면(첫번째때 누른 카드가 아니라면)
      {
        console.log("2번쨰 카드 들어간다~");
        setClickedCards((prev)=> [...prev, idx]); //딱 렌더링된 카드의 번호를 넣어줌
        console.log("추가된 clickedCards: ",clickedCards);
        console.log("renderedCards[clickedCards[0]].id: ",renderedCards[clickedCards[0]].id, typeof(renderedCards[clickedCards[0]].id));
        //console.log("renderedCards[clickedCards[1]].id: ",renderedCards[clickedCards[1]].id, typeof(renderedCards[clickedCards[1]].id));
      }
    }
    
  };

  //clickedCards 지켜보고 있다가, 길이가 2가 되는 순간 로직 실행 (필수임. 렌더링 흐름과 달리, 즉시 반영함.)
  useEffect(()=> {
    if(clickedCards.length === 1)
    {
      console.log("현재 renderedCards: ", renderedCards);
      //const updatedCards = [...renderedCards];
      const updatedCards = JSON.parse(JSON.stringify(renderedCards));
      console.log("현재 clickedCards[0]: ", clickedCards[0]);
      console.log("현재 updatedCards: ", updatedCards);
      updatedCards[clickedCards[0]].status = true;
      setRenderedCards(updatedCards);
      console.log("이펙트에서 업데이트된 RederedCards", renderedCards);
    }
    else if(clickedCards.length === 2)
    {
      //const updatedCards = [...renderedCards];
      const updatedCards = JSON.parse(JSON.stringify(renderedCards));
      updatedCards[clickedCards[1]].status = true;
      setRenderedCards(updatedCards);

      if(renderedCards[clickedCards[0]].id === renderedCards[clickedCards[1]].id)
        {
          //해당 idx에서의 카드 둘이 같은 id값을 가지고 있다면(일치한다면)
          //const updatedCards = [...renderedCards];
          const updatedCards = JSON.parse(JSON.stringify(renderedCards));
          updatedCards[clickedCards[0]].status = true;
          updatedCards[clickedCards[1]].status = true;
          console.log("true로 몇개 바뀐 updatedCards: ", updatedCards);
          setRenderedCards(updatedCards);
          setScore((prev)=>prev+1);
          //renderedCards(clickedCards[1]).status = true; 애초에 잘못됨. 인덱스는 []로 접근해야지..
        }
      else
      {
        //둘이 다른 id값을 가지고 있다면(다르다면)
        setTimeout(()=>{
          //const updatedCards = [...renderedCards]; 
          const updatedCards = JSON.parse(JSON.stringify(renderedCards));
          updatedCards[clickedCards[0]].status = false;
          updatedCards[clickedCards[1]].status = false;
          console.log("false로 몇개 바뀐 updatedCards: ", updatedCards);
          setRenderedCards(updatedCards);
        }
        ,500)
      }
      setClickedCards([]); //빈 배열로 초기화 (이러면서, Card가 갱신되고 새로운 render가 들어가지니까 열린 상태같은게 유지될거임 아마?)
    }
    console.log("clickedCard: ", clickedCards);
    console.log("renderedCard: ", renderedCards);
  },[clickedCards])


  const goal = useRef(5); //점수 매번 초기화 되지 않도록(렌더링에 상관없이 유지하도록) useRef 활용 (매번 반영되어야하면 state로)
  const modeHandle = useCallback((e) => { //매번 함수 렌더링될때마다 정의하지 않도록 useCallback 사용
    setMode(e.currentTarget.innerText); //해당 모드로 변경
    setScore(0); //점수도 초기화
    
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


  /*
   {complete && (
        <CompleteModal
          resetCurrentMode = {resetCurrentMode}
        />
    )}
   */
  console.log(complete);
  return (
    <CardGameWrapper>
      <CompleteModalWrapper>
        {complete && (
          <CompleteModal
            resetCurrentMode={resetCurrentMode}
        />
        )}
      </CompleteModalWrapper>
      <Header score={score} goal={goal.current} resetCurrentMode = {resetCurrentMode}/>
      <ModeSelect>
        <ModeBtn modeString={"easy"} modeHandle={modeHandle} />
        <ModeBtn modeString={"normal"} modeHandle={modeHandle} />
        <ModeBtn modeString={"hard"} modeHandle={modeHandle} />
      </ModeSelect>
      <CardSection renderedCards={renderedCards} clickedCards={clickedCards} selectCard={selectCard}  />
    </CardGameWrapper>
  );
}

const CompleteModalWrapper = styled.div`
  position: absolute;
  top: 0;

  z-index: 100;
`;

//트러블슈팅(Troble Shotting) 왜 이 div의 height가 자식요소에 맞게 완전히 커지지 않는가? 
const CardGameWrapper = styled.div`
  position: relative;
  background-color: ${theme.colors.aliceblue};
`;

const ModeSelect = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  position: fixed;
  top: 20vh;
  
  width: 100vw;
  height: 10vh;

  z-index: 1;

  font-size: ${theme.fonts.md};
`;


export default CardGame;