import Router from './Router';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import reset from 'styled-reset';
import { darkTheme, lightTheme } from './theme';
import { isDarkAtom } from './atoms';
import { useRecoilValue } from 'recoil';

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;400&display=swap');
  
  ${reset}
  
  * {
    margin:0;
    padding:0;
    box-sizing: border-box;
  }
  
  body {
    font-family: 'Source Sans Pro', sans-serif;
    background-color: ${(props) => props.theme.bgColor};
    color: ${(props) => props.theme.textColor};
  }
  
  
  a {
    text-decoration: none;
    color: inherit;
  }
`;

function App() {
  const isDark = useRecoilValue(isDarkAtom);
  return (
    <>
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        <GlobalStyle />
        <Router />
      </ThemeProvider>
    </>
  );
}

export default App;
