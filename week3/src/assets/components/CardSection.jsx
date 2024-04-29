import { useState } from 'react'
import styled from 'styled-components';
import theme from '../../theme';
import Card from './Card';

function CardSection({cardList, openCards, onCardFunc}){
  let isOpen = false;
  return (
  <StyledCardSection>
    {cardList.map((obj, idx)=>{
      openCards.includes(obj.id) ? isOpen = true : isOpen = false //만약 openCards 배열안에 obj.id가 포함되어 있다면
      //let randomKey = toString(Symbol());
      return(
          <Card key ={`Card${idx}`} uniqueId={`Card${idx}`} id={obj.id} imgSrc={obj.imgSrc} isOpen={isOpen} onCardFunc = {onCardFunc} />
      );
    })}
  </StyledCardSection>); //map해서 card 리턴하는 로직
}


const StyledCardSection = styled.section`

  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;

  width: 100vw;
  min-height: 60vh;

  position: fixed;
  top: 40vh;

  background-color: ${theme.colors.lightPurple};
`;

export default CardSection;