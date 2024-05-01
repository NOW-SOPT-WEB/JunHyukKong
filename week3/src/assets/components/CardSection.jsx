import { useState } from 'react'
import styled from 'styled-components';
import theme from '../../theme';
import Card from './Card';

function CardSection({renderedCards, clickedCards, selectCard}){

  return (
  <StyledCardSection>
    {renderedCards.map((obj, idx)=>{
      return(
          <Card 
          key ={`card-${idx}`} 
          idx = {`${idx}`} 
          selectCard ={clickedCards.length < 2 ? selectCard: null} 
          imgSrc={obj.imgSrc} 
          isFlipped = {renderedCards[idx].status}
          clickedCards = {clickedCards}
          />
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