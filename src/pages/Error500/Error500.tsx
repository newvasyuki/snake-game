import React, {useState} from "react";
import {Header} from "../../components/Header";
import {Sidebar} from "../../components/Sidebar";
import './Error500.pcss';

const Error404 = () => {
  const [sideBarExpanded, setSideBarExpanded] = useState(true);

  return (
    <>
      <Header isLogoSmall={!sideBarExpanded} />
      <div className="content">
        <Sidebar isExpanded={sideBarExpanded} onChangeSidebar={setSideBarExpanded} />
        <div className="block-error500">
          <div className="block-error500__title">Ошибка 500</div>
          <div className="block-error500__description">Внутренняя ошибка сервера.</div>
        </div>
      </div>
    </>
  );
};

export default Error404;
