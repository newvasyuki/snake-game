import React, {useState} from 'react';
import './Login.pcss';
import {Header} from "../../components/Header";
import {Sidebar} from "../../components/Sidebar";
import {Outlet} from "react-router-dom";

const Login = () => {
  const [sideBarExpanded, setSideBarExpanded] = useState(true);

  return (
    <>
      <Header isLogoSmall={!sideBarExpanded} />
      <div className="content">
        <Sidebar isExpanded={sideBarExpanded} onChangeSidebar={setSideBarExpanded} />
        <Outlet />
      </div>
    </>
  );
};

export default Login;
