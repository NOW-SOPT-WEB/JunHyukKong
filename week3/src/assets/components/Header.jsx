import { useState } from 'react'
import styled from 'styled-components';

function Header(){

  return(
  <>
    <CardGameHeader>
      앨범 카드 맞추기 게임
    </CardGameHeader>
    
  </>); //헤더 관련된 내용들을 리턴하는 형식
}

const CardGameHeader = styled.header`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  width: 100vw;
  height: 20vh;
  
  position:fixed;
  top:0px;
  
  background-color: black;
  color: white;
  
`;

export default Header;