export default function projectPlanButton({...props}) {
    const {plan} = props
    return <div className="h-[25px] font-regular border-[1px] border-black px-2 rounded-md">{plan.toUpperCase()}</div>
}