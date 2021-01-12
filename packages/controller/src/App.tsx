import React from "react";
import { createGlobalStyle } from "styled-components";
import Controller from "./views/Controller";

const GlobalStyle = createGlobalStyle`
  html {
    min-height: 100%;
  }
  body {
    background-color: lightblue;
  }
`;

function App() {
  return (
    <>
      <Controller />
      <GlobalStyle />
    </>
  );
}

export default App;
