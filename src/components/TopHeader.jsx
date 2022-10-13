import React, { useState } from "react";
import { Layout, Dropdown, Menu, Avatar, Statistic } from "antd";
import {
  SmileOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useInterval } from "../util/hook";
import { queryTokenPrice } from "../services/price";
import sksIcon from "../img/ast.svg"


const { Header } = Layout;

export default function TopHeader() {
  const navigate = useNavigate();

  const delay = 5000;
  const isRunning = true;
  const [tokenPrice, setTokenPrice] = useState("");

  useInterval(()=>{
    queryTokenPrice().then((data)=>{
      console.log(data)
      setTokenPrice(data.price)
    }).catch(function(error) {
      console.log(error);
    });
  }, isRunning ? delay : 0);


  const logout = ({ key }) => {
    console.log(key);
    if (key === "3") {
      console.log(key);
      localStorage.removeItem("token");
      navigate("/login");
    }
  };

  const menu = (
    <Menu
      onClick={logout}
      items={[
        {
          key: "1",
          label: (
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.antgroup.com"
            >
              1st menu
            </a>
          ),
        },
        {
          key: "2",
          label: (
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.aliyun.com"
            >
              2nd menu
            </a>
          ),
          icon: <SmileOutlined />,
          disabled: true,
        },
        {
          key: "3",
          danger: true,
          label: "退出",
        },
      ]}
    />
  );

  return (
    <Header
      className="site-layout-background"
      style={{
        padding: "0 16px",
      }}
    >
      <div style={{ float: "left"}}>
      <img src={sksIcon} alt="" style={{width:"50px", height:"50px"}} />
      </div>
      <div style={{ float: "left", margin: "3px 20px"}}>
      <Statistic title="SKS" value={tokenPrice} />
      </div>
      <div style={{ float: "right" }}>
        <span>欢迎admin</span>
        <Dropdown overlay={menu}>
          <Avatar src="https://joeschmoe.io/api/v1/random" />
        </Dropdown>
      </div>
    </Header>
  );
}
