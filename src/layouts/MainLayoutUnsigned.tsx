import React from 'react'
import {NavLink, Outlet} from 'react-router-dom'
import Footer from "../components/common/Footer"
export default function MainLayoutSigned() {
    return (
        <div className='max-w-[1920px] min-w-[1400px] h-full font-regular'>
            <div className='w-[1200px] text-right mt-8 mx-auto pb-2'>
                <NavLink to='/' style={({isActive}) => (isActive ? {fontFamily: 'bold', fontColor: 'black'} : {color: '#CCCCCC'})}>HOME</NavLink>
                <NavLink className='ml-5' to='/login' style={({isActive}) => (isActive ? {fontFamily: 'bold', fontColor: 'black'} : {color: '#CCCCCC'})}>LOGIN</NavLink>
            </div>
            <div className='w-[1200px] m-auto'>
                <div className='h-[620px] border-[0.5px] border-gray1'>
                    <Outlet/>
                </div>
                <Footer />
            </div>
        </div>
    )
}