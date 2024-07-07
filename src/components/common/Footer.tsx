import GitHubIcon from "@mui/icons-material/GitHub";
import { useRecoilState } from "recoil";
import { isLightModeState } from "../../recoil/atoms/common";

export default function Footer() {
  const [isLightMode, setIsLightMode] =
    useRecoilState<boolean>(isLightModeState);

  return (
    <div className="flex flex-row mt-1 gap-2 float-right">
      <GitHubIcon sx={{ fontSize: "1.7rem" }} className="cursor-pointer" />
      <div
        className={`w-7 h-7 cursor-pointer rounded-full text-center text-[1.2rem] ${
          isLightMode ? "bg-gray1" : ""
        }`}
        onClick={() => setIsLightMode(true)}
      >
        🔅
      </div>
      <div
        className={`w-7 h-7 cursor-pointer rounded-full text-center text-[1.2rem] ${
          isLightMode ? "" : "bg-gray1"
        }`}
        onClick={() => setIsLightMode(false)}
      >
        🌙
      </div>
    </div>
  );
}
