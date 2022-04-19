import { useDispatch, useSelector } from 'react-redux';
import { setThemeState, themeSelector } from './themeProviderSlice';
import { Switch } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid, regular } from '@fortawesome/fontawesome-svg-core/import.macro';
import { useEffect } from 'react';

interface ThemeProviderProps {
  children: JSX.Element;
}

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const dispatch = useDispatch();
  const { currentTheme } = useSelector(themeSelector);

  useEffect(() => {
    document.body.classList.add(currentTheme);
  });

  const switchTheme = () => {
    if (currentTheme === 'light') {
      document.body.classList.remove('light');
      document.body.classList.add('dark');
    } else {
      document.body.classList.add('light');
      document.body.classList.remove('dark');
    }

    dispatch(setThemeState(currentTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <>
      <Switch
        onClick={switchTheme}
        checkedChildren={<FontAwesomeIcon icon={regular('sun')} />}
        unCheckedChildren={<FontAwesomeIcon icon={solid('sun')} />}
        defaultChecked={false}
      />
      {children}
    </>
  );
};

export default ThemeProvider;
