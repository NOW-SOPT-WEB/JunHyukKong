import styled from "styled-components";


interface InputProps{
  //만들면서 필요한 것 작성해나갈 예정
  name: string;
  ref: any;
}

function Input({name, ref}: InputProps) : JSX.Element
{



  return(
    <FlexBox>
      <SName>{name}</SName>
      <SInput ref={ref}/>
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

const SInput = styled.input`
  width  : 50%;
  height : 10%;
  
`;


export default Input;