import { Outlet } from "react-router-dom";
import SignedHeader from "../components/common/SignedHeader";
import React from "react";
import Footer from "../components/common/Footer";
import ProjectSelectMenu from "../components/common/ProjectSelectMenu";
export default function MainLayoutSigned() {
  return (
      <div className="max-w-[1920px] min-w-[1400px] h-full font-regular">
          <div className="w-[1200px] mt-8 mx-auto pb-2">
              <SignedHeader />
          </div>
          <div className="w-[1200px] m-auto">
              <div className="h-[620px] border-[0.5px] border-gray1 relative">
                  <ProjectSelectMenu />
                  <Outlet/>
              </div>
              <Footer />
          </div>
      </div>
  );
}