import React, { PropsWithChildren, useState } from 'react';
import { Header } from '../Header';
import { Sidebar } from '../Sidebar';
import './Layout.pcss';
import '../../constants/constants.pcss';

const Layout = (props: PropsWithChildren<unknown>) => {
  const [sideBarExpanded, setSideBarExpanded] = useState(true);

  return (
    <>
      <Header isLogoSmall={!sideBarExpanded} />
      <div className="content">
        <Sidebar isExpanded={sideBarExpanded} onChangeSidebar={setSideBarExpanded} />
        {props.children}
      </div>
    </>
  );
};

export default Layout;
