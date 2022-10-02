import React from "react";
import {Outlet} from "react-router-dom";
import Navbar from "./components/Navbar";
import BottomNav from "./components/BottomNav";

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <BottomNav />
    </>
  );
};

export default Layout;