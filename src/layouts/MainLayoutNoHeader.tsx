import { Outlet } from "react-router-dom";

export default function MainLayoutNoHeader() {
  return (
    <div className="w-screen h-full px-[60px] font-regular">
      <div className="w-[1200px] h-[620px] mt-16 border-[0.5px] border-gray1 m-auto">
        <Outlet />
      </div> 
    </div>
  );
}