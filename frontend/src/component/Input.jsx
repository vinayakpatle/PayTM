import React from 'react'

const Input = ({label,placeholder,type,onChange}) => {
  return (
    <div>
        <div className='text-sm font-medium text-left py-2'>{label}</div>
        <input onChange={onChange} className='w-full border border-slate-300 py-1 px-2 rounded' type={type} placeholder={placeholder} />
    </div>
  )
}

export default Input