import React from 'react'

const Balance = ({balance}) => {
  return (
    <div className='flex items-center space-x-4'>
        <div className='font-bold text-lg'>Your balance</div> 
        <div className='text-lg font-semibold'>Rs {balance}</div>
    </div>
  )
}

export default Balance