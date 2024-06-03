import styled from "styled-components";
import { webber } from "../../../../constants/webber";

interface ResultStepPropTypes {
  chooseObj: any[];
}

const ResultStep = ({ chooseObj }: ResultStepPropTypes) => {
  console.log(chooseObj);

  // chooseObj 예시: ['fun', true, false, true]
  const filteredPerson = webber.find(
    (person) =>
      person.personality === chooseObj[0] &&
      person.isMorning === chooseObj[1] &&
      person.isJ === chooseObj[2] &&
      person.isSkil === chooseObj[3]
  );

  if (!filteredPerson) {
    return <div>No matching person found</div>;
  }

  return (
    <PersonWrapper>
      <Pic src={filteredPerson.imgSrc} alt={filteredPerson.personName} />
      <Name>{filteredPerson.personName}</Name>
    </PersonWrapper>
  );
};

export default ResultStep;

const PersonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
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
