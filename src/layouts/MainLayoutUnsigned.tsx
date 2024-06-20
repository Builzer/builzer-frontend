import { Outlet } from "react-router-dom";
import GitHubIcon from '@mui/icons-material/GitHub'
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
export default function MainLayoutUnsigned() {
  return (
    <div className="max-w-[1920px] min-w-[1400px] h-full font-regular">
      <div className="w-[1200px] text-right mt-8 mx-auto">
          <a href="/" className="text-right text-gray3 hover:text-gray8">HOME</a>
          <a href="/login" className="text-right text-gray3 ml-5 hover:text-gray8">LOG IN</a>
        </div>
      <div className="w-[1200px] h-[620px]  border-[0.5px] border-gray1 m-auto">
        <Outlet />
        <div className="flex flex-row mt-1 gap-2 float-right">
          <GitHubIcon className="cursor-pointer" />
          <LightModeOutlinedIcon className="cursor-pointer rounded-full bg-gray5" />
          <DarkModeOutlinedIcon className="cursor-pointer" />
        </div>
      </div>
    </div>
  );
}