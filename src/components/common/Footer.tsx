import GitHubIcon from '@mui/icons-material/GitHub'

export default function Footer() {
    return <div className='flex flex-row mt-1 gap-2 float-right'>
        <GitHubIcon sx={{ fontSize: '1.7rem' }} className='cursor-pointer'/>
        <div className='w-7 h-7 cursor-pointer rounded-full bg-gray1 text-center text-[1.2rem]'>🔅</div>
        <div className='w-7 h-7 cursor-pointer rounded-full bg-white text-center text-[1.2rem]'>🌙</div>
    </div>
}