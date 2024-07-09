import './app.css';
import Login from './lib/components/login/login';
import LanguageWrapper from './lib/i18n/language-wrapper';

function App() {
  return (
    <LanguageWrapper>
      <Login />
    </LanguageWrapper>
  );
}

export default App;
