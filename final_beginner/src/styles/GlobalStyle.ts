import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyles = createGlobalStyle`
    ${reset}
    a{
        text-decoration: none;
    }

    *{
        box-sizing: border-box;
    }

    html, body{
        
    }

    #root, body, html {
    margin: 0 auto;
    padding:0;

    font-size: 62.5%;
}

    body{
        line-height: 1;
    }

    ol, ul{
        list-style: none;
    }

    button {
        background: transparent;
        cursor: pointer;
        border: 0;
    }

    input {
        outline: none;
        border: none;
    }
`;

export default GlobalStyles;
