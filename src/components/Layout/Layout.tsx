import React, { ReactNode } from "react";
import Header from "../Header";
import Sidebar from "../Sidebar";
import Footer from "../Footer";
import './Layout.pcss';

interface Props {
  children: ReactNode
}

export default function Layout({children}: Props) {
  return <>
    <Header />
    <div className={'content'}>
      <Sidebar />
      {children}
    </div>
    {/* <Footer /> */}
  </>
}
