import { useEffect, useState } from "react";
import styled from "styled-components";
import { webber } from "../../../../constants/webber";

const RandomStep = () => {
  const randomId = Math.floor(Math.random() * 24);
  const randomPerson = webber.find((person) => person.id === randomId);
  const [counter, setCounter] = useState<number>(3);

  useEffect(() => {
    if (counter > 0) {
      setTimeout(() => {
        //이유를 찾다가...... 결국 못 찾았다.. 뭔가 useEffect가 맞물리는 것 같기도 한데...
        setCounter(counter - 1); //처음에 (prev) => prev - 1 로 했는데 안됐다. (정확히는, 3->(2는 생략)->1->결과화면이 바로 나옴)
        console.log(counter);
      }, 1000);
    }
  }, [counter]);
  return (
    <>
      {counter > 0 ? (
        <Counter>{counter}</Counter>
      ) : (
        <PersonWrapper>
          <Pic src={randomPerson.imgSrc} alt={randomPerson.personName} />
          <Name>{randomPerson.personName}</Name>
        </PersonWrapper>
      )}
    </>
  );
};

export default RandomStep;

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

const Counter = styled.div`
  ${({ theme }) => theme.fonts.title_26pt_Bold};
`;
