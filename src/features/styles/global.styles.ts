import { createGlobalStyle } from "styled-components"

export const GlobalStyle = createGlobalStyle`
  :root {
    font-family: "Inter", "Segoe UI", system-ui, sans-serif;
  }

  *, *::before, *::after {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    min-height: 100vh;
    background-color: ${(props) => props.theme.bg.dark};
    color: ${(props) => props.theme.text.normal};
    line-height: 1.6;
  }

  #root {
    min-height: 100vh;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  button,
  input,
  textarea,
  select {
    font-family: inherit;
  }
`
