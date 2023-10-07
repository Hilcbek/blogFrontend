import React from 'react'
const MenuItem = ({label,onClick,Icon,status}) => {
  return (
    <button className={`${status ? 'flex' : 'hidden'} w-full hover:bg-gray-50 p-2 items-center justify-start cursor-pointer font-medium text-left text-xs rounded-sm`} onClick={onClick}>
       <li className='mr-1'>{Icon}</li>{label}
    </button>
  )
}

export default MenuItem