import styled from "styled-components";
import { webber } from "../../../../constants/webber";

interface ResultStepPropTypes {
  chooseObj: any[];
  setStep: (num: number) => void;
  setChooseObj: (obj: any[]) => void;
}

const ResultStep = ({
  chooseObj,
  setStep,
  setChooseObj,
}: ResultStepPropTypes) => {
  console.log(chooseObj);

  const handleClickRetry = () => {
    setStep(0);
    setChooseObj([]);
  };

  // chooseObj 예시: ['fun', true, false, true]
  const filteredPerson = webber.find(
    (person) =>
      person.personality === chooseObj[0] &&
      person.isMorning === chooseObj[1] &&
      person.isJ === chooseObj[2] &&
      person.isSkil === chooseObj[3]
  );

  if (!filteredPerson) {
    return <div>사람이 없습니다!</div>;
  }

  return (
    <>
      <PersonWrapper>
        <Pic src={filteredPerson.imgSrc} alt={filteredPerson.personName} />
        <Name>{filteredPerson.personName}</Name>
      </PersonWrapper>
      <SelectBtn onClick={handleClickRetry}>다시하기</SelectBtn>
    </>
  );
};

export default ResultStep;

const PersonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 70%;
`;

const Pic = styled.img`
  width: 40%;
  max-height: 80%;
`;

const Name = styled.div`
  width: 30%;
  text-align: center;
  ${({ theme }) => theme.fonts.title_18pt_Bold};
  margin-top: 3rem;
  border: red 3px solid;
`;

const SelectBtn = styled.button`
  width: 10%;
  height: 15%;
  border-radius: 1rem;
  background-color: ${(props) => props.theme.colors.Primary_orange};

  &:hover {
    background-color: red;
  }
`;
