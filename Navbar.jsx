import React from 'react'
import { Link } from 'react-router'

const Navbar = () => {
    
    return (
        <div className='  w-[100%] h-[13vh]  flex justify-center items-center sticky top-0 z-20'>
            <nav className="bg-gradient-to-r from-[var(--blue)] to-purple-900 p-4 text-white flex justify-between items-center sticky top-0 z-20  w-[100%] ">
                <div className='flex items-center justify-center'>
                    <div>
                       <Link to='/'><img className='w-[70px]' src="public/images/Education-removebg-preview.png" alt="" /></Link> 
                    </div>
                    <div className='pl-4'>
                        <h1 className="xl:text-3xl lg:text-2xl md:text-xl sm:text-[1rem] font-bold">E-Vote</h1>
                        <p className='xl:text-2xl lg:text-xl md:text-[0.8rem] sm:text-[0.5rem]'>An Online Platform to cast your Vote</p>
                    </div>
                </div>
                <ul className="flex space-x-4">
                    <li><Link to='/login' className='2xl:p-3 xl:p-3 lg:p-3 md:p-3 sm:p-2 border-1 border-white 2xl:rounded-[25px] xl:rounded-[25px] lg:rounded-[25px] md:rounded-[25px] sm:rounded-[7px] hover:bg-white hover:text-purple-950'>Sign In/Up </Link></li>
                    {/* <li><Link to='/signUp' className='2xl:p-3 xl:p-3 lg:p-3 md:p-3 sm:p-2 border-1 border-white 2xl:rounded-[25px] xl:rounded-[25px] lg:rounded-[25px] md:rounded-[25px] sm:rounded-[7px] hover:bg-white hover:text-purple-950'>Sign Up</Link></li> */}
                </ul>
            </nav>
        </div>
    )
}

export default Navbar
