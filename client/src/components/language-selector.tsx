import { useTranslation } from 'react-i18next';

const LanguageSelector = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (language:string) => {
    i18n.changeLanguage(language);
    console.log(i18n.language);
  };

  return (
    <div>
      <button onClick={() => changeLanguage('en')}>English</button>
      <button onClick={() => changeLanguage('hi')}>हिंदी</button>
    </div>
  );
}

export default LanguageSelector;
