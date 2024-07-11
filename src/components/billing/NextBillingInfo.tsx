import { useQuery } from "react-query";
import { getNextBilling } from "../../apis/billing";
import CreditImg from "../../assets/images/Credit.svg";

export default function NextBillingInfo({ ...props }) {
  const { projectId } = props.projectId;

  const { data, isLoading } = useQuery({
    queryKey: ["getNextBilling", projectId],
    queryFn: () => getNextBilling(projectId),
  });

  if (!data || isLoading) return <></>;

  return (
    <div>
      <p className="text-xl">{data.nextPayments.projectName}</p>
      <p className="font-thin text-end text-gray8">
        {data.nextPayments.nextPaymentDate}
      </p>
      <div className="w-full flex flex-row gap-3 text-xl">
        <div className="w-1/5">
          <p className="p-3">서버</p>
          <p className="p-3">데이터베이스</p>
          <p className="p-3">프로젝트 플랜</p>
          <p className="p-3 text-2xl">총 금액</p>
        </div>
        <div className="w-1/5">
          <p className="p-3">{data.nextPayments.serverSpec.name}</p>
          <p className="p-3">{data.nextPayments.dbSpec.dbType}</p>
          <p className="p-3">{data.nextPayments.projectPlan.planName}</p>
        </div>
        <div className="w-1/5">
          <p className="p-3 font-light">{data.nextPayments.serverSpec.cpu}</p>
          <p className="p-3 font-light">{data.nextPayments.dbSpec.dbVersion}</p>
        </div>
        <div className="w-1/5">
          <p className="p-3 font-light">
            {data.nextPayments.serverSpec.memory} GIB Memory
          </p>
        </div>
        <div className="w-1/5 font-bold">
          <p className="p-3 flex flex-row gap-3 justify-end">
            <img src={CreditImg} alt="크레딧 이미지" className="w-7" />
            {data.nextPayments.serverSpec.cost}
          </p>
          <p className="p-3 invisible">데이터베이스</p>
          <p className="p-3 flex flex-row gap-3 justify-end">
            <img src={CreditImg} alt="크레딧 이미지" className="w-7" />
            {data.nextPayments.projectPlan.cost}
          </p>
          <p className="p-3 flex flex-row gap-3 text-2xl justify-end">
            <img src={CreditImg} alt="크레딧 이미지" className="w-9" />
            <span className="mt-1">
              {data.nextPayments.serverSpec.cost +
                data.nextPayments.projectPlan.cost}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
