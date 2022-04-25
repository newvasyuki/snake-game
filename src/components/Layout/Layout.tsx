import React, { ReactNode } from "react";
import Header from "../Header";
import Sidebar from "../Sidebar";
import Footer from "../Footer";

interface Props {
  children: ReactNode
}

export default function Layout({children}: Props) {
  return <div>
    <Header />
    <div>
      <Sidebar />
      {children}
    </div>
    <Footer />
  </div>
}
