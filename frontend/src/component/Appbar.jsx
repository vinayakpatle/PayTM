import React from 'react'
import {useState} from "react";

const Appbar = ({authUser}) => {
    const [isDropdownOpen,setIsDropdownopen]=useState(false);

  return (
    <div className='h-14 w-screen shadow flex justify-between'>
        <div className='h-full flex items-center ml-4 font-semibold'>
            PayTM App
        </div>
        <div className='flex space-x-4 items-center mr-4'>
            <div className=''>
                Hello
            </div>
            <div onMouseEnter={()=>setIsDropdownopen(true)} onMouseLeave={()=>setIsDropdownopen(false)} className='ralative inline-block size-12 rounded-full flex items-center justify-center  bg-slate-200'>
                <span className='text-xl'>
                    {authUser.firstName[0].toUpperCase()}
                </span>
            </div>
            {isDropdownOpen && <div className='absolute top-14 right-0 w-20 py-2 shadow-md rounded-md'>
                <button className='w-full px-2 text-left hover:bg-gray-400'>
                    Update
                </button>
                <button className='w-full px-2 text-left text-red-500 hover:bg-gray-400'>
                    Logout
                </button>
            </div>}
        </div>
    </div>
  )
}

export default Appbar