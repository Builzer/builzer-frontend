import {useRecoilState} from "recoil";
import {headerMenuState} from "../../recoil/atoms/common";
import CreditImg from "../../assets/images/Credit.svg";
import {Badge} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import {NavLink} from "react-router-dom";

export default function SignedHeader() {
    return <div className="w-full flex justify-between">
        <div className="flex flex-row gap-5">
            <NavLink to="/overview" style={({isActive}) => (isActive ? {fontFamily: "bold", fontColor: "black"} : {color: "#CCCCCC"})}>OVERVIEW</NavLink>
            <NavLink to="/management" style={({isActive}) => (isActive ? {fontFamily: "bold", color: "black"} : {color: "#CCCCCC"})}>MANAGEMENT</NavLink>
            <NavLink to="/monitoring" style={({isActive}) => (isActive ? {fontFamily: "bold", color: "black"} : {color: "#CCCCCC"})}>MONITORING</NavLink>
            <NavLink to="/pipelines" style={({isActive}) => (isActive ? {fontFamily: "bold", color: "black"} : {color: "#CCCCCC"})}>PIPELINES</NavLink>
            <NavLink to="/settings" style={({isActive}) => (isActive ? {fontFamily: "bold", color: "black"} : {color: "#CCCCCC"})}>SETTINGS</NavLink>
        </div>
        <div className="flex flex-row gap-6">
            <div className="flex w-6">
                <img src={CreditImg} alt="크레딧 이미지"/>
                <span>10</span>
            </div>
            <div className="ml-2">
                <Badge badgeContent=" " color="warning" variant="dot">
                    <NotificationsIcon fontSize="medium" />
                </Badge>
            </div>
            <div className="w-6 h-6 rounded-full bg-black">

            </div>
        </div>
    </div>


}