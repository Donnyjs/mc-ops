import {
  AppstoreOutlined,
  MailOutlined,
  PieChartOutlined,
} from "@ant-design/icons";
import { Menu, Layout } from "antd";
import React, { useState } from "react";
import "../../node_modules/antd/dist/antd.min.css";
import "../css/sideMenu.css";
import { useNavigate, useLocation } from "react-router-dom";

const { Sider } = Layout;

export default function SideMeun() {
  const navigate = useNavigate();
  const location = useLocation()

  const [collapsed, setCollapsed] = useState(false);
  const [openKeys, setOpenKeys] = useState(["sub1"]);

  const selectKeys = location.pathname

  const spiltSelectKeys = (key)=>{
    const sliceKeys =  key.split("/")
    if (sliceKeys.length > 1 )  return sliceKeys[sliceKeys.length-1]
  }

  const onClick = (data) => {
    navigate(data.key);
  };

  const items = [
    getItem("首页", "home", <PieChartOutlined />),
    getItem("市值管理", "sub1", <MailOutlined />, [
      getItem("价格控制", "priceControl"),
      getItem("分散资金", "diversifyFunds"),
      getItem("归集资金", "recoveryFunds"),
    ]),
    getItem("钱包信息", "sub2", <AppstoreOutlined />, [
      getItem("钱包余额", "walletBalance"),
      getItem("交易记录", "txRecord"),
    ]),
  ];

  return (
    <Sider trigger={null} collapsible collapsed={collapsed}>
      <div style={{ display: "flex", height: "100%", "flexDirection": "column" }}>
        <div className="logo">spacekill运营</div>
        <div style={{flex:1, "overflow":"auto"}}>
          <Menu
            mode="inline"
            theme="dark"
            defaultOpenKeys={openKeys}
            defaultSelectedKeys={spiltSelectKeys(selectKeys)}
            onClick={onClick}
            style={{
              width: 200,
            }}
            items={items}
          />
        </div>
      </div>
    </Sider>
  );
}

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}
