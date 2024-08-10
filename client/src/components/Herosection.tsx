import { GithubFilled } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

const HeroSection = () => {
    const { t } = useTranslation();

    return (
          <div className="bg-white bg-opacity-80 p-8 rounded-lg max-w-4xl w-full text-center">
              <h1 className="text-4xl font-bold text-gray-800 mb-4">{t("Welcome to Our Project")}</h1>
              <p className="text-lg text-gray-600 mb-8">{t('description', { channel: 'RoadsideCoder' })}</p>
              <div className="flex justify-center gap-4">
                  <a href="/login" className="bg-orange-500 text-white py-2 px-6 rounded-lg font-bold hover:bg-orange-600 transition duration-300">Login</a>
                  <a href="https://github.com/Kris0011/Hackout2024" className="bg-gray-800 text-white py-2 px-6 rounded-lg font-bold hover:bg-gray-700 transition duration-300" target="_blank" rel="noopener noreferrer"><GithubFilled /> View on GitHub</a>
              </div>
          </div>
    );
}

export default HeroSection;
