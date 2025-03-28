import React from 'react'
import Button from "./Button";

const User = ({user}) => {

  return (
    <div className='flex justify-between'>
        <div className='flex items-center space-x-2'>
            <div className='size-12 rounded-full bg-slate-200 flex justify-center items-center'>
                <div className='text-xl'>{user.firstName[0]}</div>
            </div>
            <div className='text-lg'>
                {user.firstName} {user.lastName}
            </div>
        </div>
        <div className='flex flex-col items-center h-full w-28'>
                <Button label={"Send Money"} />
        </div>
    </div>
  )
}

export default User