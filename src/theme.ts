// my-theme.ts
import { DefaultTheme } from 'styled-components';

const theme = {
  borderRadius: `14px`,
};

const darkTheme: DefaultTheme = {
  textColor: '#f5f6fa',
  bgColor: '#2f3640',
  accentColor: '#e1b12c',
  sectionColor: 'rgba(0, 0, 0, 0.5)',
  ...theme,
};

const lightTheme: DefaultTheme = {
  textColor: '#2f3640',
  bgColor: 'whitesmoke',
  accentColor: '#e1b12c',
  sectionColor: 'rgba(255, 255, 255, 0.5)',
  ...theme,
};

export { darkTheme, lightTheme };
