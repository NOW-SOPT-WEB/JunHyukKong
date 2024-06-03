//가장 중요한 트러블 슈팅 : 모든 파일 저장 잘해주기 ㅋㅋ (아니면 undefined가 뜸)

import styled from "styled-components";
import FirstStep from "../FirstStep/FirstStep";
import FourthStep from "../FourthStep/FourthStep";
import RandomStep from "../RandomStep/RandomStep";
import ResultStep from "../ResultStep/ResultStep";
import SecondStep from "../SecondStep/SecondStep";
import ThirdStep from "../ThirdStep/ThirdStep";

interface BodyPropTypes {
  isInit: boolean;
  //혹은, 곧바로 넘겨주고 싶으면 이처럼 작성
  setShowInitBtn: (isShow: boolean) => void;
  setInit: (isInit: boolean) => void;
  setChooseObj: (callBackFunc: (prevObj: Array<any>) => Array<any>) => void;
  setStep: (callBackFunc: (prevStep: number) => number) => void;
  step: number;
  chooseObj: any[];
}

/*
  트러블 슈팅 : onClick에 넣을 때 그냥 setInit(false)하면 안되고,
  ()=>setInit(false) 와 같은 정적인 상태의 함수를 넘겨줘야 한다. 계속 까먹는데.. 까먹지 말자.
*/

const Body = ({
  isInit,
  setShowInitBtn,
  setInit,
  setChooseObj,
  setStep,
  step,
  chooseObj,
}: BodyPropTypes) => {
  const handleClickNextBtn = () => {
    setStep((prev) => prev + 1);
  };

  const handleClickPrevBtn = () => {
    setStep((prev) => prev - 1);
  };

  //단계별로 렌더링할 컴포넌트가 달라짐
  const renderStep = (step: number) => {
    console.log(step);
    switch (step) {
      case -2:
        return <RandomStep setStep={setStep} />;
      case -1:
        return (
          <>
            <ArticleHeader>원하는 추천 방식을 고르세요!</ArticleHeader>
            <ArticleBody $width="70%" $isTitle={true}>
              랜덤추천
            </ArticleBody>
            <ButtonBox>
              <SelectBtn onClick={handleClickPrevBtn}>시작하기</SelectBtn>
            </ButtonBox>
          </>
        );
      case 0:
        return (
          <>
            <ArticleHeader>원하는 추천 방식을 고르세요!</ArticleHeader>
            <ArticleBody $width="70%" $isTitle={true}>
              취향대로 추천
            </ArticleBody>
            <ButtonBox>
              <SelectBtn onClick={handleClickNextBtn}>시작하기</SelectBtn>
            </ButtonBox>
          </>
        );
      case 1:
        return (
          <FirstStep
            handleClickNextBtn={handleClickNextBtn}
            handleClickPrevBtn={handleClickPrevBtn}
            step={step}
            setChooseObj={setChooseObj}
            chooseObj={chooseObj}
          />
        );
      case 2:
        return (
          <SecondStep
            handleClickNextBtn={handleClickNextBtn}
            handleClickPrevBtn={handleClickPrevBtn}
            step={step}
            setChooseObj={setChooseObj}
            chooseObj={chooseObj}
          />
        );
      case 3:
        return (
          <ThirdStep
            handleClickNextBtn={handleClickNextBtn}
            handleClickPrevBtn={handleClickPrevBtn}
            step={step}
            setChooseObj={setChooseObj}
            chooseObj={chooseObj}
          />
        );
      case 4:
        return (
          <FourthStep
            handleClickNextBtn={handleClickNextBtn}
            handleClickPrevBtn={handleClickPrevBtn}
            step={step}
            setChooseObj={setChooseObj}
            chooseObj={chooseObj}
          />
        );
      case 5:
        return (
          <ResultStep
            chooseObj={chooseObj}
            setStep={setStep}
            setChooseObj={setChooseObj}
          />
        );
      default:
        return <div>에러</div>;
    }
  };

  /*
  const handleResultObj = () => {
    setChooseObj((prev)=> [...prev, 어쩌구])
  }
  */

  const handleClickInitArticle = () => {
    setInit(false);
    setShowInitBtn(true);
  };

  const handleClickRandomArticle = () => {
    handleClickInitArticle();
    handleClickPrevBtn();
  };

  return (
    <BodyMain>
      <BodySection>
        {isInit ? (
          <ArticleWrapper>
            <ArticleHeader>원하는 추천 방식을 고르세요!</ArticleHeader>
            <RowFlex>
              <ArticleBody
                $width="40%"
                $isTitle={false}
                onClick={handleClickInitArticle}
              >
                취향대로 추천
              </ArticleBody>
              <ArticleBody
                $width="40%"
                $isTitle={false}
                onClick={handleClickRandomArticle}
              >
                랜덤 추천
              </ArticleBody>
            </RowFlex>
          </ArticleWrapper>
        ) : (
          <ArticleWrapper>{renderStep(step)}</ArticleWrapper>
        )}
      </BodySection>
    </BodyMain>
  );
};

export default Body;

const RowFlex = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  gap: 5rem;
`;

const BodyMain = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 85vh;
  background-color: ${({ theme }) => theme.colors.UI_03};
`;

const BodySection = styled.section`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: 1rem;
  gap: 5rem;

  width: 80%;
  height: 80%;
  background-color: ${({ theme }) => theme.colors.UI_02};
`;

const ArticleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 3rem;
  width: 100%;
  height: 100%;
`;

const ArticleHeader = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80%;
  height: 20%;

  ${({ theme }) => theme.fonts.title_18pt_Bold};
  background-color: ${({ theme }) => theme.colors.UI_background};
`;

const ArticleBody = styled.article<{ $width: string; $isTitle?: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 1rem;
  width: ${(prop) => prop.$width};
  height: 90%;
  background-color: ${({ theme }) => theme.colors.Sub_green};

  cursor: pointer;
  &:hover {
    background-color: rgb(64, 236, 201);
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

const SelectBtn = styled.button`
  width: 20%;
  height: 100%;
  border-radius: 1rem;
  background-color: ${({ theme }) => theme.colors.Primary_orange};

  &:hover {
    background-color: ${({ theme }) => theme.colors.Secondary_orange};
  }
`;
