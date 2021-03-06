import { createGlobalStyle } from 'styled-components'
import reset from 'styled-reset'

const GlobalStyles = createGlobalStyle`
  ${reset}
  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;700&family=Roboto:wght@400;700&display=swap');
  
  body {
    font-family: 'Noto Sans KR', sans-serif;
    font-family: 'Roboto', sans-serif;
  }
  
  a {
    text-decoration: none;
    color: black;
  }

  button {
    cursor: pointer;
  }

  input,
  textarea,
  button {
    border: none;
    background-color: transparent;
    font-family: 'Noto Sans KR', sans-serif;
    font-family: 'Roboto', sans-serif;
    outline: none;
  }
  
`
export default GlobalStyles
