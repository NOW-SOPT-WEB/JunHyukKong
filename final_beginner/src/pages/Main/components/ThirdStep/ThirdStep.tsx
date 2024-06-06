import { useEffect, useState } from "react";
import styled from "styled-components";

interface ThirdStepPropTypes {
  handleClickNextBtn: () => void;
  handleClickPrevBtn: () => void;
  step: number;
  setChooseObj: (callBackFunc: (prevObj: any[]) => any[]) => void;
  chooseObj: any[];
}

const ThirdStep = ({
  handleClickNextBtn,
  handleClickPrevBtn,
  step,
  setChooseObj,
  chooseObj,
}: ThirdStepPropTypes) => {
  const [isAvail, setIsAvail] = useState<boolean>(false);
  const [isJ, setisJ] = useState<boolean | null>(null); //처음엔 아무것도 없으니 null

  useEffect(() => {
    //마운트시, 배열에 값이 있는지 확인하고 그 값으로 세팅함.
    if (chooseObj.length >= 3) {
      console.log("저장된거 불러온다~", chooseObj);

      setisJ(chooseObj[2]);
      setIsAvail(true);
    }
  }, [chooseObj]);

  const handleClickJ = () => {
    setChooseObj((prev) => {
      if (prev.length >= 3) {
        //만약 이미 들어있다면
        prev.pop(); //해당 마지막 항목 삭제
      }
      return [...prev, true]; //사실 ...prev는 필요없긴 하지만, 다음 스텝에서 코드 그대로 활용할거라 유지
    });
    setIsAvail(true);
    setisJ(true);
  };
  const handleClickP = () => {
    setChooseObj((prev) => {
      if (prev.length >= 3) {
        //만약 이미 들어있다면
        prev.pop(); //해당 마지막 항목 삭제
      }
      return [...prev, false]; //사실 ...prev는 필요없긴 하지만, 다음 스텝에서 코드 그대로 활용할거라 유지
    });
    setIsAvail(true);
    setisJ(false);
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

      setIsAvail(newObj.length > 1);
      return newObj;
    });
    handleClickPrevBtn();
  };

  const cantClick = () => {
    console.log("선택지를 선택해주세요!");
  };
  return (
    <>
      <ArticleHeader>
        당신이 더 중요시 여기는 가치는?! {`${step}/4`}
      </ArticleHeader>
      <RowFlex>
        <ArticleBody
          $isJ={isJ}
          $width="25%"
          $isTitle={true}
          $isAvail={isAvail}
          onClick={handleClickJ}
        >
          계획성
        </ArticleBody>
        <ArticleBody
          $isJ={!isJ}
          $width="25%"
          $isTitle={true}
          $isAvail={isAvail}
          onClick={handleClickP}
        >
          융통성
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

export default ThirdStep;

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
  $isJ: boolean | null;
  $isAvail: boolean;
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 1rem;
  width: ${(prop) => prop.$width};
  height: 90%;
  background-color: ${(props) =>
    props.$isAvail && props.$isJ ? "#40ecc9" : props.theme.colors.Sub_green};

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
      props.$isAvail ? props.theme.colors.Thirdary_orange : "#808080"};
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
