import { useState } from 'react'
import styled from 'styled-components';

function App() {
  const [name, setName] = useState(""); //이건 테스트용~
  
  const [isFront, setIsFront] = useState(true); //카드가 앞면인지 뒷면인지
  // 카드를 맞췄을 때의 상태
  // SCORE도 변경되어야 하니까 상태
  // 내가 필요한 상태가 뭔지 설계하고 들어가기 ! 
  // 카드 두개가 맞았는지 틀렸는지를 판단하는 상태(TRUE면 다시 안 뒤집고.. FALSE면 다시 뒤집고.. 그런 거 )
  // 몇초동안 두었다가.. 다시 뒤집고 이런 것도 구현해볼까? 
  /*
    yarn install -> 폴더 생성함 (그 안에 yarn이 깔리는 것)
    cd 폴더이름
    code .
    yarn install styled-components
    yarn dev

    globalStyle을 만들어서 import해온 뒤, 컴포넌트처럼 둘러싸는 예시 - 전역 스타일 적용
    theme에 스타일을 작성해두고, 뽑아와서 사용하는 이유 - 같은 회색이어도 사람마다 선택하는게 다를 수 있으니, 미리 정해둠 
  */

  const handleInput = (e) => {
    setName(e.target.value);
    //setName((prev) => prev+1);
    console.log("메롱");
  };
  
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
        <input type='text' value={name} onChange={handleInput}/>
        <h1>너의 이름은 ? {name}</h1>
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

export default App
