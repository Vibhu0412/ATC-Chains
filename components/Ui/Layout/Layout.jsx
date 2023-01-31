import React from "react";
import FooterSection from "../Footer/FooterSection";
import NavBar from "../NavBar/NavBar";

const Layout = ({ children }) => {
  return (
    <div className=" z-0 absolute bg-primary/10 w-full ">
      <div className=" bg-gridLine overflow-hidden">
        <NavBar />
        {children}
        <FooterSection />
      </div>
    </div>
  );
};

export default Layout;
