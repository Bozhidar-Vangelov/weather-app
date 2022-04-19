import './App.scss';
import MainPage from './modules/MainPage/MainPage';
import ThemeProvider from './shared/components/ThemeProvider/ThemeProvider';

const App = () => {
  return (
    <>
      <ThemeProvider>
        <MainPage />
      </ThemeProvider>
    </>
  );
};

export default App;
