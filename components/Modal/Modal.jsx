import React, { useCallback, useEffect, useState } from 'react'
import {AiOutlineClose } from 'react-icons/ai'
import Button from './Button'
const Modal = ({width, open = false, disabled, label ,onClose, title, subTitle, body, footer, onSubmit }) => {
    let [showModal,setShowModal] = useState(open);
    useEffect(() => {
        setShowModal(open)
    },[open])
    let handleClose = useCallback(() => {
        if(disabled) return;
        setShowModal(false)
        setTimeout(() => {
            onClose()
        },300)
    },[onClose,disabled])
    let handleonSubmit = useCallback(() => {
        if(disabled) return;
        onSubmit()
    },[disabled,onSubmit])
  return (
    <div className={`${showModal ? 'bg-neutral-800/70 z-[999]' : 'bg-transparent -z-[999]'} transform fixed w-full flex items-center justify-center left-0 top-0 h-full`}>
        <div className={`
            transform
            shadow-md
            rounded-lg
            ${showModal ? 'translate-y-0' : '-translate-y-full'}
            ${showModal ? 'opacity-100' : 'opacity-0'}
            bg-white 
            p-3
            transition-all duration-500
            ${width}
            mx-auto
        `}>
            <li onClick={handleClose} className='absolute cursor-pointer rounded-full top-2 right-2 flex items-center justify-center w-6 h-6 hover:bg-gray-200'>
                <AiOutlineClose />
            </li>
            <div className='w-full flex my-2 flex-col items-center justify-center'>
                <h1 className='text-center text-2xl font-bold border-solid border-b-[1px] border-gray-200  w-full'>{title}</h1>
                <h2 className='text-[18px] my-3 text-gray-800 text-sm font-medium'>{subTitle}</h2>
            </div>
            <div>
                {body}
            </div>
            <Button onClick={handleonSubmit} disabled={disabled} label={label} />
            {footer}
        </div>
    </div>
  )
}

export default Modal