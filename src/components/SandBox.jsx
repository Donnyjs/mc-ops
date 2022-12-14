import React from "react";
import "../css/sandBox.css";
import { Outlet } from "react-router-dom";
import SideMenu from "./SideMenu";
import TopHeader from "./TopHeader";
import { Layout } from "antd";

const { Content } = Layout;

export default function SandBox() {


  return (
    <Layout>
      <SideMenu></SideMenu>
      <Layout className="site-layout">
        <TopHeader></TopHeader>
        <Content
          className="site-layout-background"
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
          }}
        >
          <Outlet/>
        </Content>
      </Layout>
    </Layout>
  );
}
