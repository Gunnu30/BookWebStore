import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  html, body {
    margin: 0;
    padding: 0;
    height: 100%;
    width: 100%;
    background-color: ${({ bgTheme }) => bgTheme};
  }
  *{
      background-color: ${({ bgTheme }) => bgTheme};

  }
  /* Dynamic H1 Styling */
  h1 {
    /* If background is dark (navy), use Gold or White. If Light, use Dark Grey. */
    color:#D4AF37;
    font-size: 2.5rem;
    margin-bottom: 1rem;
    font-weight: 700;
  }

  /* Dynamic P Styling */
  p {
    color: ${({ bgTheme }) => (bgTheme === '#0F1C3F' ? '#E0E0E0' : '#373737')};0F1C3F
    font-size: 1.1rem;
    line-height: 1.6;
    margin-bottom: 0.8rem;
  }
  button{
  cursor:pointer;
  }
`;
