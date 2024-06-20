import { Button } from "antd";
import Main01 from "../../assets/images/main/Main01.svg";
import Main02 from "../../assets/images/main/Main02.svg";
import Main03 from "../../assets/images/main/Main03.svg";

export default function MainRightSection() {
    return <div className="w-full h-full">
        <div className="overflow-hidden py-2 border-b-[1px] border-gray0">
            <div className="w-full flex flex-row relative animate-slider">
                <div className="text-center px-3 whitespace-nowrap">Scroll to View</div>
                <div className="text-center px-3 whitespace-nowrap">Scroll to View</div>
                <div className="text-center px-3 whitespace-nowrap">Scroll to View</div>
                <div className="text-center px-3 whitespace-nowrap">Scroll to View</div>
                <div className="text-center px-3 whitespace-nowrap">Scroll to View</div>
                <div className="text-center px-3 whitespace-nowrap">Scroll to View</div>
                <div className="text-center px-3 whitespace-nowrap">Scroll to View</div>
                <div className="text-center px-3 whitespace-nowrap">Scroll to View</div>
                <div className="text-center px-3 whitespace-nowrap">Scroll to View</div>
                <div className="text-center px-3 whitespace-nowrap">Scroll to View</div>
            </div>
        </div>
        <div className="w-full h-[578px] overflow-auto py-10">
            <p className="px-10">
                <span className="font-extrabold text-3xl">Builzer</span><span className="text-gray8">는 백엔드 개발자들을 위한 </span><span className="font-bold">백엔드 클라우드입니다.</span>
            </p>
            <div className="flex flex-col gap-20">
                <div className="flex flex-row p-10">
                    <div className="w-1/2">
                        <img src={Main01} alt="메인 이미지01" />
                    </div>
                    <div className="w-1/2 text-right text-gray8">
                        <p>개인화된 프로젝트를 보다 신속하게 <br/>구축, 확장할 수 있습니다.</p>
                        <p className="mt-5">몇 번의 클릭만으로 <span className="text-black font-bold">쉽고 빠르게 <br />깃 프로젝트를 배포</span>할 수 있습니다.</p>
                    </div>
                </div>
                <div className="flex flex-row p-10 gap-5">
                    <div className="w-1/2 text-gray8">
                        <p><span className="font-bold text-black">팀원을 초대해 </span><br/>프로젝트를 함께 관리해보세요.</p>
                        <p className="mt-5">팀원과 함께 <span className="text-black font-bold">실시간 로그와 <br />사용량 그래프</span>를 확인할 수 있습니다.</p>
                    </div>
                    <div className="w-1/2">
                        <img src={Main02} alt="메인 이미지02" />
                    </div>
                </div>
                <div className="flex flex-row p-10 gap-5">
                    <div className="w-1/2">
                        <img src={Main03} alt="메인 이미지03" />
                    </div>
                    <div className="w-1/2 text-gray8 mt-5">
                        <p>신규가입 시 <br /> Builzer를 체험해볼 수 있는</p>
                        <p className="font-bold text-black my-3 text-xl">무료 크레딧이 제공됩니다.</p>
                        <Button type='primary' className='w-full h-12 font-bold text-xl bg-black mt-5' href="/login">깃허브로 시작하기</Button>
                    </div>
                </div>
            </div>
        </div>
    </div>
}