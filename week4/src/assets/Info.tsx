import styled from "styled-components";


interface InfoProps{
  //만들면서 필요한 것 작성해나갈 예정
  name: string;
  content: string;
}

function Info({name, content}: InfoProps) : JSX.Element
{

  return(
    <FlexBox>
      <SName>{name}</SName>
      <SInfo>{content}</SInfo>
    </FlexBox>
    
  );
}

const FlexBox = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;

  flex: 1;
`;

const SName = styled.div`
  width: 30%;
  font-size: 2rem;
`;

const SInfo = styled.div`
  width  : 50%;
  height : 10%;
  
`;


export default Info;