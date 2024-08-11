import React from 'react';
import { Layout, Menu } from 'antd';

const { Sider } = Layout;

interface SidebarProps {
  menuItems: { key: string; label: string }[];
  onMenuItemClick: (key: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ menuItems, onMenuItemClick }) => {
  return (
    <Sider width={200} className="site-layout-background">
      <Menu
        mode="inline"
        defaultSelectedKeys={[menuItems[0].key]}
        style={{ height: '100%', borderRight: 0 }}
        onClick={(e) => onMenuItemClick(e.key)}
        className='pt-10'
      >
        {menuItems.map((item) => (
          <Menu.Item key={item.key}>{item.label}</Menu.Item>
        ))}
      </Menu>
    </Sider>
  );
};

export default Sidebar;
