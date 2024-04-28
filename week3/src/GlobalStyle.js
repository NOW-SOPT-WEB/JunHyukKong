import { createGlobalStyle, css } from "styled-components";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`
${reset}
*{
  font-size: 62.5%; //1rem = 10px;가 되도록 설정.
}
button{
  cursor: pointer;
}

`;

export default GlobalStyle;

