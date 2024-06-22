import SendIcon from '@mui/icons-material/Send';
import {Dropdown} from "antd";
import type {MenuProps} from 'antd';

export default function ProjectSelectMenu() {
    const items: MenuProps['items'] = [
        {
            key: '1',
            label: (
                <div>
                    propect01
                </div>
            ),
        },
    ]
    return <div>
        <Dropdown menu={{items}} overlayClassName="w-[200px]" overlayStyle={{marginLeft: "-50px"}}>
            <div className="cursor-pointer px-3 text-white absolute ml-[-50px] mt-2 w-[200px] h-[40px] bg-black rounded-md font-light">
                <div className="flex flex-row justify-between">
                    <p className="text-xl justify-center py-2">Select Project</p>
                    <span className="py-2"><SendIcon/></span>
                </div>
            </div>
        </Dropdown>
    </div>
}