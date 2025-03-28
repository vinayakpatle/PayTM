import React from 'react'

const Appbar = () => {
  return (
    <div className='h-14 w-screen shadow flex justify-between'>
        <div className='h-full flex items-center ml-4 font-semibold'>
            PayTM App
        </div>
        <div className='flex space-x-4 items-center mr-4'>
            <div className=''>
                Hello
            </div>
            <div className='size-12 rounded-full flex items-center justify-center  bg-slate-200'>
                <span className='text-xl'>
                    U
                </span>
            </div>
        </div>
    </div>
  )
}

export default Appbar