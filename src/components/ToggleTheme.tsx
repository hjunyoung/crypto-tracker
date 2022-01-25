import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { isDarkAtom } from '../atoms';

const Btn = styled.button`
  ${(props) => props.theme.buttonStyle};
  background-color: ${(props) => props.theme.sectionColor};

  position: absolute;
  right: 0;
  top: 0;
  margin-right: 24px;

  &:hover {
    color: ${(props) => props.theme.accentColor};
    &:active {
      color: ${(props) => props.theme.textColor};
    }
  }
`;

const ToggleTheme = () => {
  const [isDark, setIsDark] = useRecoilState(isDarkAtom);
  const toggleTheme = () => setIsDark((current) => !current);
  return <Btn onClick={toggleTheme}>{isDark ? 'Dark Mode' : 'Light Mode'}</Btn>;
};

export default ToggleTheme;
