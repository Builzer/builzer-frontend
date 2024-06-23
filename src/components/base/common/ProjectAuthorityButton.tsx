export default function ProjectAuthorityButton({...props}) {
    const {authority} = props
    return <div className={`w-[110px] h-[25px] text-center font-regular px-2 bg-gradient-to-r rounded-md text-white ${authority === 'owner' ? 'from-[#F77062] to-[#FE5196]' : 'from-[#96DEDA] to-[#50C9C3]'}`}>{authority.toUpperCase()}</div>
}