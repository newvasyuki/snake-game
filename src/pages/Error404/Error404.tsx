import React, {useState} from "react";
import {Header} from "../../components/Header";
import {Sidebar} from "../../components/Sidebar";
import './Error404.pcss';

const Error404 = () => {
  const [sideBarExpanded, setSideBarExpanded] = useState(true);

  return (
    <>
      <Header isLogoSmall={!sideBarExpanded} />
      <div className="content">
        <Sidebar isExpanded={sideBarExpanded} onChangeSidebar={setSideBarExpanded} />
        <div className="block-error404">
          <div className="block-error404__title">Ошибка 404</div>
          <div className="block-error404__description">Страница не найдена. Воспользуйтесь навигацией слева</div>
        </div>
      </div>
    </>
  );
};

export default Error404;
