import React from 'react'
import {Link} from 'react-router-dom';

const BottomWarning = ({label,buttonText,to}) => {
  return (
    <div className='flex items-center justify-center text-sm pb-3 space-x-1'>
        <div>
            {label}
        </div>
        <Link className='cusrsor-pointer pointer underline' to={to} >
            {buttonText}
        </Link>
    </div>
  )
}

export default BottomWarning
