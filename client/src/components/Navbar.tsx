import { useState, useEffect } from 'react';
import i18n from 'i18next';
import { CloseOutlined, DownOutlined } from '@ant-design/icons';
import { Drawer, Button, Dropdown } from 'antd';
import MenuIcon from "../assets/stack.png";
import { useNavigate, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Logo from '../assets/LOGO.png';
import DropDown from './Auth/DropDown';

function Navbar() {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [language, setLanguage] = useState('English');
  const navigate = useNavigate();
  const { user } = useSelector((state: any) => state.user);

  const items = [
    { label: 'Home', key: 'home', route: '/' },
    { label: 'Docs', key: 'docs', route: '/docs' },
    { label: 'Market', key: 'market', route: '/market' },
  ];

  const advancedToolsItems = [
    { label: 'Fire Predictor', key: 'tool1', route: '/fire-predictor' },
    { label: 'Fertilizer Predictor', key: 'tool2', route: '/detection/crop' },
  ];

  const languageItems = [
    { label: 'English', key: 'en' },
    { label: 'हिन्दी', key: 'hi' },
  ];

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

  const handleDrawerOpen = () => setDrawerVisible(true);
  const handleDrawerClose = () => setDrawerVisible(false);

  const handleLanguageChange = (key: string) => {
    setLanguage(key === 'en' ? 'English' : 'हिन्दी');
  };
  
  const handleAdvancedToolsClick = (route: string) => {
    navigate(route);
  };

  const handleLogoClick = () => {
    navigate('/');
  };

  return (
    <nav className="bg-[#16302B] border-b border-gray-700 z-50 fixed w-full top-0 left-0 right-0">
      <div className="container mx-auto flex items-center justify-between p-4">
        <div className="flex items-center cursor-pointer" onClick={handleLogoClick}>
          <img src={Logo} alt="Logo" className="h-10 mr-3" />
          <h1 className="text-white text-2xl font-bold">AgroZenith</h1>
        </div>

        <ul className="hidden md:flex space-x-6 text-white">
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

        <div className="hidden md:flex items-center space-x-3">
          <Dropdown
            overlay={
              <ul className="bg-white shadow-lg rounded-lg p-2">
                {languageItems.map((item) => (
                  <li
                    key={item.key}
                    className="p-2 hover:bg-gray-200 cursor-pointer"
                    onClick={() => handleLanguageChange(item.key)}
                  >
                    {item.label}
                  </li>
                ))}
              </ul>
            }
          >
            <Button size="large" className="bg-gray-800 text-white">
              {language}
            </Button>
          </Dropdown>
          <Dropdown
            overlay={
              <ul className="bg-white shadow-lg rounded-lg p-2">
                {advancedToolsItems.map((item) => (
                  <li
                    key={item.key}
                    className="p-2 hover:bg-gray-200 cursor-pointer"
                    onClick={() => handleAdvancedToolsClick(item.route)}
                  >
                    {item.label}
                  </li>
                ))}
              </ul>
            }
          >
            <Button size="large" className="bg-gray-800 text-white">
              Advanced Tools
              <DownOutlined />
            </Button>
          </Dropdown>
          <div>
            {user ? (
              <DropDown />
            ) : (
              <a href="https://hackout2024-1.onrender.com/auth/google">
                <Button type="primary" size="large">Login</Button>
              </a>
            )}
          </div>
        </div>

        <button
          onClick={handleDrawerOpen}
          className="md:hidden text-white hover:text-gray-300"
        >
          <img 
            src={MenuIcon}
            alt="Menu"
            className="h-7 w-7"
          />
        </button>
      </div>
      <Drawer
        title="AgroZenith"
        placement="right"
        onClose={handleDrawerClose}
        visible={drawerVisible}
        closeIcon={<CloseOutlined />}
        className="md:hidden"
      >
        <ul className="space-y-4">
          {items.map((item) => (
            <li key={item.key} onClick={handleDrawerClose}>
              <NavLink
                to={item.route}
                className="block py-2 px-4 rounded-lg transition-colors duration-300 hover:bg-gray-200"
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
        <div className="mt-6 space-y-4">
          <Dropdown
            overlay={
              <ul className="bg-white shadow-lg rounded-lg p-2">
                {languageItems.map((item) => (
                  <li
                    key={item.key}
                    className="p-2 hover:bg-gray-200 cursor-pointer"
                    onClick={() => handleLanguageChange(item.key)}
                  >
                    {item.label}
                  </li>
                ))}
              </ul>
            }
          >
            <Button size="large" className="w-full bg-gray-800 text-white">
              {language}
            </Button>
          </Dropdown>
          <Dropdown
            overlay={
              <ul className="bg-white shadow-lg rounded-lg p-2">
                {advancedToolsItems.map((item) => (
                  <li
                    key={item.key}
                    className="p-2 hover:bg-gray-200 cursor-pointer"
                    onClick={() => handleAdvancedToolsClick(item.route)}
                  >
                    {item.label}
                  </li>
                ))}
              </ul>
            }
          >
            <Button size="large" className="w-full bg-gray-800 text-white">
              Advanced Tools
              <DownOutlined />
            </Button>
          </Dropdown>
          <div>
            {user ? (
              <DropDown />
            ) : (
              <a href="https://hackout2024-1.onrender.com/auth/google">
                <Button type="primary" size="large" className="w-full">Login</Button>
              </a>
            )}
          </div>
        </div>
      </Drawer>
    </nav>
  );
}

export default Navbar;