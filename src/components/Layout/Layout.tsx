import React, { ReactNode, PropsWithChildren, useState } from 'react';
import { Header } from '../Header';
import { Sidebar } from '../Sidebar';
import './Layout.pcss';
import '../../constants/constants.pcss';

interface Props {
  selectedRoute?: string;
}

const Layout = ({ children, selectedRoute}: PropsWithChildren<Props>) => {
  const [sideBarExpanded, setSideBarExpanded] = useState(true);

  return (
    <>
      <Header isLogoSmall={!sideBarExpanded} />
      <div className="content">
        <Sidebar
          isExpanded={sideBarExpanded}
          onChangeSidebar={setSideBarExpanded}
          selectedRoute={selectedRoute}
        />
        {children}
      </div>
    </>
  );
};

export default Layout;
