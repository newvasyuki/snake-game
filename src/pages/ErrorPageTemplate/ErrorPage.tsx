import React, {useState} from "react";
import {Header} from "../../components/Header";
import {Sidebar} from "../../components/Sidebar";
import bemCn from 'bem-cn-lite';
import './ErrorPage.pcss';

const block = bemCn('block-error404');

const ErrorPage = () => {
  const [sideBarExpanded, setSideBarExpanded] = useState(true);

  return (
    <>
      <Header isLogoSmall={!sideBarExpanded} />
      <div className="content">
        <Sidebar isExpanded={sideBarExpanded} onChangeSidebar={setSideBarExpanded} />
        <div className={block()}>
          <div className={'title'} />
          <div className={'description'} />
        </div>
      </div>
    </>
  );
};

export default ErrorPage;
