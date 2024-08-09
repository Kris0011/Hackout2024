import React, { useState } from "react";
import { Button, Grid, Menu, Dropdown, theme } from "antd";
import { MenuOutlined, UserOutlined } from "@ant-design/icons";
import Logo from "../assets/LOGO.png";
import { useNavigate } from "react-router-dom";

const { useToken } = theme;
const { useBreakpoint } = Grid;

function Navbar() {
  const { token } = useToken();
  const screens = useBreakpoint();
  const [current, setCurrent] = useState("home");
  const navigate = useNavigate();

  const menuItems = [
    {
      label: "Home",
      key: "home",
    },
    {
      label: "Dashboard",
      key: "dashboard",
    },
    {
      label: "Detection",
      key: "SubMenu",
      children: [
        {
          label: "Crop detection",
          key: "cropDetection",
        },
        {
          label: "Plant disease detection",
          key: "plantDiseaseDetection",
        },
      ],
    },
    {
      label: "Auction",
      key: "auction",
    },
  ];

  const profileMenuItems = [
    {
      label: "Logout",
      key: "logout",
    },
    {
      label: "Login with other email",
      key: "loginWithOtherEmail",
    },
  ];

  const onClick = (e: any) => {
    console.log("click ", e);
    setCurrent(e.key);

    switch (e.key) {
      case "home":
        navigate("/");
        break;
      case "dashboard":
        navigate("/dashboard");
        break;
      case "cropDetection":
        navigate("/detection/crop");
        break;
      case "plantDiseaseDetection":
        navigate("/detection/plant-disease");
        break;
      case "auction":
        navigate("/auction");
        break;
      case "logout":
        //TODO Handle logout
        console.log("Logging out");
        break;
      case "loginWithOtherEmail":
        //TODO Add func for login again
        console.log("Login with other email");
        break;
      default:
        navigate("/");
    }
  };

  const styles: { [key: string]: React.CSSProperties } = {
    container: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      margin: "0 auto",
      maxWidth: token.screenXL,
      padding: `0 ${token.paddingLG}px`,
    },
    header: {
      backgroundColor: token.colorBgContainer,
      borderBottom: `${token.lineWidth}px ${token.lineType} ${token.colorSplit}`,
      position: "relative",
    },
    logo: {
      display: "flex",
      alignItems: "center",
      height: token.sizeLG,
    },
    logoImg: {
      height: "40px",
      marginRight: "10px",
    },
    logoText: {
      fontSize: "1.5rem",
      color: token.colorTextBase,
      fontWeight: "bold",
    },
    menu: {
      flex: 1,
      margin: "0 20px",
      lineHeight: screens.sm ? "4rem" : "3.5rem",
    },
    menuContainer: {
      display: "flex",
      alignItems: "center",
      gap: token.size,
    },
    buttonGroup: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
    },
  };

  return (
    <nav style={styles.header}>
      <div style={styles.container}>
        <div style={styles.logo}>
          <img src={Logo} alt="Logo" style={styles.logoImg} />
          <h1 style={styles.logoText}>DevBlogs</h1>
        </div>
        <Menu
          style={styles.menu}
          mode="horizontal"
          items={menuItems}
          onClick={onClick}
          selectedKeys={[current]}
          overflowedIndicator={<Button type="text" icon={<MenuOutlined />} />}
        />
        <div style={styles.buttonGroup}>
          <Dropdown
            overlay={<Menu items={profileMenuItems} onClick={onClick} />}
            trigger={['click']}
          >
            <Button type="text" icon={<UserOutlined />} />
          </Dropdown>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
