import { createGlobalStyle } from "styled-components";
import palette from "./lib/styles/palette";
const GlobalStyles = createGlobalStyle`
body {
  display: flex;
  justify-content: center;
  background-color: ${palette.background1};
  margin: 0;
  padding: 0;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -ms-user-select: none; 
  -moz-user-select: -moz-none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  user-select: none;
}

* {
  box-sizing: inherit;
}

html, body, #root {
  height: 100%;
  width: 100%;
  color: #262626;
  font-size: 100%;
  font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;
  font-style: normal;
  font-weight: normal;
}
a {
  text-decoration: none;
}
`;

export default GlobalStyles;
