import styled from 'styled-components';
import Card from './Card';

function CardSection({renderedCards, clickedCards, selectCard}){

  return (
  <StyledCardSection>
    {renderedCards.map((obj, idx)=>{ {/*map해서 card 리턴하는 로직 */}
      return(
          <Card 
          key ={`card-${idx}`} 
          idx = {`${idx}`} 
          selectCard ={clickedCards.length < 2 && selectCard} /*단락 평가 이용, fasly만 나면 해당 피연산자 반환하고, truthy일 경우 오른쪽 피 연산자를 반환한다*/
          imgSrc={obj.imgSrc} 
          isFlipped = {renderedCards[idx].status} /*상태에 따라 플립 여부가 결정 */
          />
      );
    })}
  </StyledCardSection>); 
}


const StyledCardSection = styled.section`

  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;

  width: 100vw;
  min-height: 70vh;

  //position: relative;
  //top: 30vh;
  margin-top: 30vh;
  
`;
export default CardSection;