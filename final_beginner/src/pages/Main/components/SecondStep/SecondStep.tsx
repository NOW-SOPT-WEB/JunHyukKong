import { useEffect, useState } from "react";
import styled from "styled-components";

interface SecondStepPropTypes {
  handleClickNextBtn: () => void;
  handleClickPrevBtn: () => void;
  step: number;
  setChooseObj: (callBackFunc: (prevObj: any[]) => any[]) => void;
  chooseObj: any[];
}

const SecondStep = ({
  handleClickNextBtn,
  handleClickPrevBtn,
  step,
  setChooseObj,
  chooseObj,
}: SecondStepPropTypes) => {
  const [isAvail, setIsAvail] = useState<boolean>(false);
  const [isMorning, setisMorning] = useState<boolean | null>(null); //처음엔 아무것도 없으니 null

  useEffect(() => {
    //마운트시, 배열에 값이 있는지 확인하고 그 값으로 세팅함.
    if (chooseObj.length >= 2) {
      console.log("저장된거 불러온다~", chooseObj);

      setisMorning(chooseObj[1]);
      setIsAvail(true);
    }
  }, [chooseObj]);

  const handleClickMorning = () => {
    setChooseObj((prev) => {
      if (prev.length >= 2) {
        //만약 이미 들어있다면
        prev.pop(); //해당 마지막 항목 삭제
      }
      return [...prev, true]; //사실 ...prev는 필요없긴 하지만, 다음 스텝에서 코드 그대로 활용할거라 유지
    });
    setIsAvail(true);
    setisMorning(true);
  };
  const handleClickNight = () => {
    setChooseObj((prev) => {
      if (prev.length >= 2) {
        //만약 이미 들어있다면
        prev.pop(); //해당 마지막 항목 삭제
      }
      return [...prev, false]; //사실 ...prev는 필요없긴 하지만, 다음 스텝에서 코드 그대로 활용할거라 유지
    });
    setIsAvail(true);
    setisMorning(false);
  };

  //그리고 특별히, 뒤로 갈때는 Obj(배열 요소)를 삭제하는 로직도 필요함
  /*const handleClickBack = () => {
    handleClickPrevBtn();
    setChooseObj((prev) => {
      prev.pop();
      return [...prev];
    });
  };*/

  //삽질하며 깨달은 점 : 반드시 이 함수내에서 필요한 상태들 미리 업데이트 해주어야 한다.
  //또한,이를 위해, 비동기성을 고려하면 setChooseObj 함수 안에서 setIsAvail을 호출해주어야 한다.
  const handleClickBack = () => {
    setChooseObj((prev) => {
      const newObj = [...prev];
      newObj.pop();

      setIsAvail(newObj.length > 0);
      return newObj;
    });
    handleClickPrevBtn();
  };

  const cantClick = () => {
    console.log("선택지를 선택해주세요!");
  };
  return (
    <>
      <ArticleHeader>아침형 인간 vs 저녁형 인간 {`${step}/4`}</ArticleHeader>
      <RowFlex>
        <ArticleBody
          $isMorning={isMorning === true}
          $width="25%"
          $isTitle={true}
          $isAvail={isAvail}
          onClick={handleClickMorning}
        >
          아침형
        </ArticleBody>
        <ArticleBody
          $isMorning={!isMorning === true}
          $width="25%"
          $isTitle={true}
          $isAvail={isAvail}
          onClick={handleClickNight}
        >
          저녁형
        </ArticleBody>
      </RowFlex>

      <ButtonBox>
        <SelectBtn
          $isAvail={isAvail}
          onClick={isAvail ? handleClickBack : cantClick}
        >
          이전으로
        </SelectBtn>
        <SelectBtn
          $isAvail={isAvail}
          onClick={isAvail ? handleClickNextBtn : cantClick}
        >
          다음으로
        </SelectBtn>
      </ButtonBox>
    </>
  );
};

export default SecondStep;

const ArticleHeader = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80%;
  height: 20%;

  ${({ theme }) => theme.fonts.title_18pt_Bold};
  background-color: ${({ theme }) => theme.colors.UI_background};
`;

const ArticleBody = styled.article<{
  $width: string;
  $isTitle?: boolean;
  $isMorning: boolean | null;
  $isAvail: boolean;
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 1rem;
  width: ${(prop) => prop.$width};
  height: 90%;
  //트슈: 처음에 그냥 $isMoring만으로는 한쪽이 계속 켜지는 문제 발생(둘 중 하나는 false일때 켜지는데, null도 falsy로 평가되므로)
  //따라서, $isAvail까지 사용하여 해결.
  background-color: ${(props) =>
    props.$isAvail && props.$isMorning
      ? "#40ecc9"
      : props.theme.colors.Sub_green};

  cursor: pointer;
  &:hover {
    background-color: #40ecc9;
  }

  //문법 복잡해보이지만 차근 차근..!
  //참고로, optional prop이라서 없으면 none(혹은 undefined) => 18pt 선택됨.
  ${(prop) =>
    prop.$isTitle
      ? prop.theme.fonts.title_26pt_Bold
      : prop.theme.fonts.title_18pt_Bold}
`;

const ButtonBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 15vh;
  gap: 10rem;
`;

const SelectBtn = styled.button<{ $isAvail: boolean }>`
  width: 20%;
  height: 100%;
  border-radius: 1rem;
  background-color: ${(props) =>
    props.$isAvail ? props.theme.colors.Primary_orange : "#808080"};

  &:hover {
    background-color: ${(props) =>
      props.$isAvail ? props.theme.colors.Secondary_orange : "#808080"};
  }
`;

const RowFlex = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  gap: 5rem;
`;
