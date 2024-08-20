import { useState, useEffect } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Menu, Button, Dropdown } from 'antd';
import Logo from '../assets/LOGO.png';
import DropDown from './Auth/DropDown';
import i18n from 'i18next';
import { DownOutlined } from '@ant-design/icons';

function Navbar() {
  const [language, setLanguage] = useState('English');
  const navigate = useNavigate();

  const { user } = useSelector((state: any) => state.user);

  const advancedToolsItems = [
    { label: 'Fire Predictor', key: 'tool1', route: '/fire-predictor' },
    { label: 'Fertilizer Predictor', key: 'tool2', route: '/detection/crop' },
  ];

  const items = [
    { label: 'Home', key: 'home', route: '/' },
    { label: 'Docs', key: 'docs', route: '/docs' },
    { label: 'Market', key: 'market', route: '/market' },
  ];

  const languageItems = [
    { label: 'English', key: 'en' },
    { label: 'हिन्दी', key: 'hi' },
  ];

  const handleAdvancedToolsClick = (route: string) => {
    navigate(route);
  };

  const handleLanguageChange = ({ key }: { key: string }) => {
    setLanguage(key === 'en' ? 'English' : 'हिन्दी');
  };

  useEffect(() => {
    let languageCode;
    if (language === 'English') {
        languageCode = 'en';
    } else {
        languageCode = 'hi';
    }

    i18n.changeLanguage(languageCode);
    console.log(languageCode);
  }, [language]);

  const advancedToolsMenu = (
    <Menu>
      {advancedToolsItems.map(item => (
        <Menu.Item key={item.key} onClick={() => handleAdvancedToolsClick(item.route)}>
          {item.label}
        </Menu.Item>
      ))}
    </Menu>
  );

  const languageMenu = (
    <Menu onClick={handleLanguageChange}>
      {languageItems.map(item => (
        <Menu.Item key={item.key}>
          {item.label}
        </Menu.Item>
      ))}
    </Menu>
  );

  const handleLogoClick = () => {
    navigate('/'); 
  };

  return (
    <nav className="bg-[#16302B] border-b border-gray-700 z-50 fixed w-full top-0 left-0 right-0">
      <div className="container mx-auto flex items-center justify-between p-4">
        <div className="flex items-center cursor-pointer" onClick={handleLogoClick}>
          <img src={Logo} alt="Logo" className="h-10 mr-3" />
          <h1 className="text-white text-2xl font-bold">Agro Zenith</h1>
        </div>
        <ul className="flex space-x-6 text-white">
          {items.map((item) => (
            <li key={item.key}>
              <NavLink
                to={item.route}
                className={({ isActive }) =>
                  `py-2 px-4 rounded-lg transition-colors duration-300 ${
                    isActive ? 'bg-indigo-600 text-white' : 'hover:bg-gray-700 text-gray-300'
                  }`
                }
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
        <div className="flex items-center space-x-3">
          <Dropdown overlay={languageMenu}>
            <Button size="large" className="bg-gray-800 text-white">
              {language}
            </Button>
          </Dropdown>
          <Dropdown overlay={advancedToolsMenu}>
            <Button size='large' className="bg-gray-800 text-white">
              Advanced Tools
              <DownOutlined />
            </Button>
          </Dropdown>
          <div>
            {user ? (
              <DropDown />
            ) : (
              <a href="http://localhost:3000/auth/google">
                <Button type="primary" size='large'>Login</Button>
              </a>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
