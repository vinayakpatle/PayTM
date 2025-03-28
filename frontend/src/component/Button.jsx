import React from 'react'
import {Loader} from "lucide-react";

const Button = ({label,onClick,loading}) => {
  return (
    <button onClick={onClick} className='w-full bg-gray-800 my-4 py-2.5 mt-5 rounded-lg text-white text-sm font-medium hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 flex justify-center items-center'>
        {loading ? <Loader className='animate-spin size-6' /> : label}
    </button>
  )
}

export default Button