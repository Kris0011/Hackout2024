import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { useDispatch, useSelector } from 'react-redux';
import { Menu, Button, Dropdown } from 'antd';
import Logo from '../assets/LOGO.png';
import DropDown from './Auth/DropDown';
import i18n from 'i18next';
import Icon from '@ant-design/icons/lib/components/Icon';
import { DownOutlined } from '@ant-design/icons';

function Navbar() {
  const [current, setCurrent] = useState('home');
  const [language, setLanguage] = useState('English');
  const navigate = useNavigate(); 
  const { user } = useSelector((state: any) => state.user);
  const { lang } = useSelector((state: any) => state.user);

  const dispatch = useDispatch(); 

  const advancedToolsItems = [
    { label: 'Fire Predictor', key: 'tool1', route: '/fire-predictor' },
    { label: 'Fertilizer Predictor', key: 'tool2', route: '/detection/crop' },
    { label: 'Plant Disease Predictor', key: 'tool3', route: '/detection/plant-disease' },
  ];

  const items = [
    { label: 'Home', key: 'home', route: '/' },
    { label: 'Dashboard', key: 'dashboard', route: '/dashboard' },
    { label: 'Market', key: 'market', route: '/market' },
  ];

  const languageItems = [
    { label: 'English', key: 'en' },
    { label: 'हिन्दी', key: 'hi' },
  ];

  const handleAdvancedToolsClick = (route: string) => {
    setCurrent('tool');
    navigate(route);
  };

  const handleClick = (key: string, route: string) => {
    setCurrent(key);
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

  return (
    <nav className="bg-[#16302B] border-b border-gray-700">
      <div className="container mx-auto flex items-center justify-between p-4">
        <div className="flex items-center">
          <img src={Logo} alt="Logo" className="h-10 mr-3" />
          <h1 className="text-white text-2xl font-bold">DevBlogs</h1>
        </div>
        <ul className="flex space-x-4 text-white">
          {items.map((item) => (
            <li
              key={item.key}
              className={`cursor-pointer py-2 px-4 rounded-lg transition-colors duration-300  ${
                current === item.key ? 'bg-gray-600' : 'hover:bg-gray-700'
              }`}
              onClick={() => handleClick(item.key, item.route)}
            >
              {item.label}
            </li>
          ))}
        </ul>
        <div className='flex flex-row space-x-3'>
          <Dropdown overlay={languageMenu}>
            <Button size="large">
              {language}
            </Button>
          </Dropdown>
          <Dropdown overlay={advancedToolsMenu}>
            <Button size='large'>
              Advanced Tools
              <DownOutlined />
            </Button>
          </Dropdown>
          <div>
            {user ? (
              <DropDown />
            ) : (
              <a href="http://localhost:3000/login">
                <Button type="primary">Login</Button>
              </a>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
