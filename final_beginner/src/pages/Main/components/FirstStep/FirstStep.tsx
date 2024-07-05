import { useEffect, useState } from "react";
import styled from "styled-components";

interface FirstStepPropTypes {
  handleClickNextBtn: () => void;
  handleClickPrevBtn: () => void;
  step: number;
  setChooseObj: (callBackFunc: (prevObj: any[]) => any[]) => void;
  chooseObj: any[];
}

const FirstStep = ({
  handleClickNextBtn,
  handleClickPrevBtn,
  step,
  setChooseObj,
  chooseObj,
}: FirstStepPropTypes) => {
  const [isAvail, setIsAvail] = useState<boolean>(false);
  const [selected, setSelected] = useState<string | null>(null); //처음엔 아무것도 없으니 null

  useEffect(() => {
    //마운트시, 배열에 값이 있는지 확인하고 그 값으로 세팅함.
    if (chooseObj.length >= 1) {
      console.log("저장된거 불러온다~", chooseObj);

      setSelected(chooseObj[0]);
      setIsAvail(true);
    }
  }, [chooseObj]);

  const handleClickKind = () => {
    setChooseObj((prev) => {
      if (prev.length >= 1) {
        //만약 이미 들어있다면
        prev.pop(); //해당 마지막 항목 삭제
      }
      return [...prev, "kind"]; //사실 ...prev는 필요없긴 하지만, 다음 스텝에서 코드 그대로 활용할거라 유지
    });
    setIsAvail(true);
    setSelected("kind");
  };
  const handleClickFun = () => {
    setChooseObj((prev) => {
      if (prev.length >= 1) {
        //만약 이미 들어있다면
        prev.pop(); //해당 마지막 항목 삭제
      }
      return [...prev, "fun"]; //사실 ...prev는 필요없긴 하지만, 다음 스텝에서 코드 그대로 활용할거라 유지
    });
    setIsAvail(true);
    setSelected("fun");
  };
  const handleClickPassion = () => {
    setChooseObj((prev) => {
      if (prev.length >= 1) {
        //만약 이미 들어있다면
        prev.pop(); //해당 마지막 항목 삭제
      }
      return [...prev, "passion"]; //사실 ...prev는 필요없긴 하지만, 다음 스텝에서 코드 그대로 활용할거라 유지
    });
    setIsAvail(true);
    setSelected("passion");
  };

  //그리고 특별히, 뒤로 갈때는 Obj(배열 요소)를 삭제하는 로직도 필요함
  /*const handleClickBack = () => {
    handleClickPrevBtn();
    setChooseObj((prev) => {
      prev.pop();
      return [...prev];
    });
  };*/

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
      <ArticleHeader>당신이 원하는 성격은?! {`${step}/4`}</ArticleHeader>
      <RowFlex>
        <ArticleBody
          $selected={selected === "kind"}
          $width="25%"
          $isTitle={true}
          onClick={handleClickKind}
        >
          친절
        </ArticleBody>
        <ArticleBody
          $selected={selected === "fun"}
          $width="25%"
          $isTitle={true}
          onClick={handleClickFun}
        >
          재미
        </ArticleBody>
        <ArticleBody
          $selected={selected === "passion"}
          $width="25%"
          $isTitle={true}
          onClick={handleClickPassion}
        >
          열정
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

export default FirstStep;

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
  $selected: boolean;
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 1rem;
  width: ${(prop) => prop.$width};
  height: 90%;
  background-color: ${(props) =>
    props.$selected ? "#40ecc9" : props.theme.colors.Sub_green};

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
