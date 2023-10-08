import React, { useCallback, useEffect, useState } from 'react'
import RegisterModal from '../../Hooks/RegisterModal'
import Modal from '../../components/Modal/Modal';
import Input from '../../components/Modal/Input';
import { useForm } from 'react-hook-form'
import { Axios, UploadImage } from '../../libs/Axios';
import toast from 'react-hot-toast';
import LoginModal from '../../Hooks/LoginModal';
import { Link, useNavigate } from 'react-router-dom';
const Register = () => {
    let [loading,setLoading] = useState(false)
    let registerModal = RegisterModal();
    let loginModal = LoginModal();
    let [image,setImage] = useState('https://www.nicepng.com/png/full/128-1280406_view-user-icon-png-user-circle-icon-png.png')
    const {
        register,
        reset,
        handleSubmit,
        formState : {
            errors,
            isSubmitSuccessful
        }
    } = useForm()
    let onSubmit = async (data) => {
        try {
            setLoading(true)
            let result = String(image)?.includes("https") ? true : false
            let upload = ''
            if(result){
                upload = image;
            }else{
                upload = await UploadImage(image);
            }
            let { username, password , email } = data;
            let res = await Axios.post('/auth/register',{ username, email, password, profile : upload });
            if(res.data){
                toast.success('Registerd Successfully!')
                registerModal.onClose()
                setTimeout(() => {
                    loginModal.onOpen()
                },300)
            }
            reset()
        } catch (error) {
            toast.error(error.response.data.error)
        }finally{
            setLoading(false)
        }
    }
    useEffect(() => {
        reset()
    },[isSubmitSuccessful,reset])
    let body = (
        <div className='w-full'>
            <label htmlFor="profile" className='rounded-full my-1 mx-auto flex items-center justify-center'>
                <img className='w-14 h-14 object-cover rounded-full  border-solid border-gray-400 border-[1px]' src={String(image)?.includes("https") ? image : URL.createObjectURL(image)} alt="" />
                <input onChange={(e) => setImage(e.target.files[0])} type="file" className='hidden' id='profile' />
            </label>
            <Input  disabled={loading} errors={errors} id="username" register={register} type={'text'} label={'username'} />
            <Input  disabled={loading} errors={errors} id="email" register={register} type={'email'} label={'email-address'} />
            <Input  disabled={loading} errors={errors} id="password" register={register} type={'password'} label={'password'} />
        </div>
    )
    let handleFooterButton = useCallback(() => {
        reset({})
        loginModal.onOpen();
        registerModal.onClose();
    },[])
    let Footer = (
        <div className='my-2 w-full flex items-center justify-center'>
            <p className='mx-1 text-xs'>Already have an Account ? </p>
            <button onClick={handleFooterButton} className='mx-1 hover:text-rose-500 text-xs'>Login</button>
        </div>
    )
  return (
    <Modal 
    width={'xs:w-11/12 mx-auto lg:w-3/12'}
    open={registerModal.open} 
    title='Meri Blog'
    subTitle='Create an Account!'
    onClose={registerModal.onClose}
    body={body}
    onSubmit={handleSubmit(onSubmit)}
    footer={Footer}
    disabled={loading}
    label={'Register'}
    />
  )
}

export default Register