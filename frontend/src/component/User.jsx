import React from 'react'
import Button from "./Button";
import {useNavigate} from "react-router-dom";

const User = ({user}) => {
  const navigate=useNavigate();

  return (
    <div className='flex justify-between'>
        <div className='flex items-center space-x-2'>
            <div className='size-12 rounded-full bg-slate-200 flex justify-center items-center'>
                <div className='text-xl'>{user.firstName[0].toUpperCase()}</div>
            </div>
            <div className='text-lg'>
                {user.firstName} {user.lastName}
            </div>
        </div>
        <div className='flex flex-col items-center h-full w-28'>
          <Button onClick={()=>{navigate(`/send?id=${user.id}&name=${user.firstName}`)}} to={"send"} label={"Send Money"} />
        </div>
    </div>
  )
}

export default User