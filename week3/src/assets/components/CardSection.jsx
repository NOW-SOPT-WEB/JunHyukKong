import { useState } from 'react'
import styled from 'styled-components';
import theme from '../../theme';
import Card from './Card';

function CardSection({cardList, openCards, onCardFunc, flipedCards}){
  let isOpen = false;
  return (
  <StyledCardSection>
    {cardList.map((obj, idx)=>{
      openCards.includes(obj.id) ? isOpen = true : isOpen = false //만약 openCards 배열안에 obj.id가 포함되어 있다면
      return(
          <Card key ={`Card${idx}`} uniqueId={`Card${idx}`} id={obj.id} imgSrc={obj.imgSrc} isOpen={isOpen} onCardFunc = {onCardFunc} flipedCards = {flipedCards} />
      );
    })}
  </StyledCardSection>); //map해서 card 리턴하는 로직
}


const StyledCardSection = styled.section`

  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;

  width: 100vw;
  min-height: 70vh;

  position: relative;
  top: 30vh;
  
`;
export default CardSection;