import React, { useState } from "react";
import { Button, Grid, Menu, theme } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import Logo from "../assets/LOGO.png";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const { useToken } = theme;
const { useBreakpoint } = Grid;

function Navbar() {
  const { token } = useToken();
  const screens = useBreakpoint();
  const [current, setCurrent] = useState("home");
  const navigate = useNavigate(); // Initialize useNavigate

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

  const onClick = (e: any) => {
    console.log("click ", e);
    setCurrent(e.key);

    // Perform navigation based on the menu item clicked
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
          {screens.md && <Button type="text">Log in</Button>}
          <Button type="primary">Sign up</Button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
