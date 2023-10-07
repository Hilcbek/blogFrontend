import React, { useCallback, useState } from 'react'
import {FiEye} from 'react-icons/fi'
import {BsEyeSlash} from 'react-icons/bs'
const Input = ({type,label,defaultValue ,register, required, id,errors, disabled}) => {
  let [show,setShow] = useState(false)
  return (
    <div className='relative'>
        { type == "password" && <li onClick={() => setShow((prev) => !prev)} className='w-9 h-9 rounded-full hover:bg-gray-100 flex items-center justify-center absolute top-[15px] cursor-pointer right-2'>
            { show ? <BsEyeSlash /> : <FiEye />}
          </li>}
        <input defaultValue={defaultValue} disabled={disabled} {...register(id, {required})}  id={label} type={type === "password" ? show ? type = 'text' : 'password' : type} register={register} className={`
        placeholder placeholder-transparent  w-full text-xs my-2 p-4 peer rounded-md border-solid border-gray-300 border-[1px] outline-none
        ${errors[id] ? 'border-rose-500' : 'border-neutral-300'}
        ${errors[id] ? 'focus:border-rose-500' : 'focus:border-black'}}
        `} />
        {label && <label htmlFor={label} className={`
          ${errors[id] ? 'text-rose-500' : 'text-neutral-400'}
          cursor-text absolute text-xs top-3 peer-focus:text-md text-black/90 peer-focus:text-gray-500 peer-focus:-translate-y-[13px] peer-focus:bg-white peer-placeholder-shown:text-base transform duration-150 transition translate-y-0 left-3
          `}>
            {label}
        </label>}
    </div>
  )
}

export default Input