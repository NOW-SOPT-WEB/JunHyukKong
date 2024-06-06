import styled from "styled-components";

interface HeaderProptTypes {
  showInitBtn: boolean;
  handleClickInitBtn: React.MouseEventHandler<HTMLButtonElement>;
}

const Header = ({ showInitBtn, handleClickInitBtn }: HeaderProptTypes) => {
  return (
    <HeaderWrapper>
      <HeaderText>앱잼 팀원 추천</HeaderText>
      {showInitBtn && <InitBtn onClick={handleClickInitBtn}>처음으로</InitBtn>}
    </HeaderWrapper>
  );
};

export default Header;

const HeaderWrapper = styled.header`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100vw;
  height: 15vh;
  background-color: pink;
`;

const HeaderText = styled.span`
  ${({ theme }) => theme.fonts.title_26pt_Bold};
  color: black;
`;

const InitBtn = styled.button`
  display: inline-block;
  position: absolute;
  right: 1.5rem;
  width: 10vw;
  height: 80%;
  ${({ theme }) => theme.fonts.sub_14pt};
  background-color: ${({ theme }) => theme.colors.Gray_stroke};
  &:hover {
    background-color: antiquewhite;
  }
`;
