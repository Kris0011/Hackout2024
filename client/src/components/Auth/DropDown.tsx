import React from "react";
import { DownOutlined,  } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Button, Dropdown, Space } from "antd";
import { useSelector } from "react-redux";
import { Avatar } from "antd";



export default function DropDown() {
  const { user } = useSelector((state: any) => state.user.user);
  const UserAvatar: React.FC = () => (
    <Avatar size="default" src={user?.picture} className="mr-2" />
  );

  console.log(user?.picture);


  const logout = async() => {
    try{
     
        window.location.href = "http://localhost:3000/logout";

    }catch(err){
      console.error(err);

    }
  }

  const items: MenuProps["items"] = [
    {
      label: user?.email,
      key: "1",

    },
    {
      label: "Logout",
      key: "3",

      danger: true,

      onClick : logout

    },
   
  ];
  const menuProps = {
    items,
  };

  return (
    <div>
      <Space wrap>
        <Dropdown menu={menuProps} className="bg-gray-200">
          <Button className="p-5">
            <UserAvatar />

            {user?.name}
            <DownOutlined />
          </Button>
        </Dropdown>
      </Space>
    </div>
  );
}
