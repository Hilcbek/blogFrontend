import React from 'react'
import BeatLoader from 'react-spinners/BeatLoader'
const Button = ({label,onClick,disabled, color}) => {
  return (
     <button disabled={disabled} onClick={onClick} className={
        `${disabled ? 'bg-gray-200 cursor-not-allowed' : 'cursor-auto'} p-3 rounded-md text-white text-sm font-bold bg-rose-500 my-2 w-full flex items-center justify-center cursor-pointer hover:bg-rose-600`
     } color={color}>{ disabled ?  <BeatLoader color={'#fff'} loading={disabled} size={14} aria-label="Loading Spinner" data-testid="loader" /> :  label}</button>
  )
}

export default Button