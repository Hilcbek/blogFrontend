import React, { useCallback, useEffect, useState } from 'react'
import Modal from '../../components/Modal/Modal'
import LoginModal from '../../Hooks/LoginModal';
import { useForm } from 'react-hook-form';
import { Axios } from '../../libs/Axios';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../../components/Modal/Input';
import RegisterModal from '../../Hooks/RegisterModal';
import { useDispatch } from 'react-redux';
import { LOGIN } from '../../Toolkit/User_Reducer';
const Login = () => {
    let [loading,setLoading]  = useState(false)
    let loginModal = LoginModal();
    let registerModal = RegisterModal()
    let navigate = useNavigate()
    const {
        register,
        handleSubmit,
        reset,
        formState : {
            errors,
            isSubmitSuccessful
        }
    } = useForm()
    let dispatch = useDispatch()
    let onSubmit =  async (data) => {
        try {
            setLoading(true)
            let { useEmail ,password} = data;
            let res = await Axios.post('/auth/login',{ useEmail, password });
            if(res.data){
                dispatch(LOGIN({profile : res.data.data.profile, id : res.data.data._id}))
                toast.success('Logged Successfully!');
                loginModal.onClose()
                navigate('/')
            }
        reset()
        } catch (error) {
            toast.error(error.response.data.error)
        }finally{
            setLoading(false)
        }
    }
        let body = (
        <div className='w-full'>
            <Input disabled={loading} errors={errors}  id="useEmail" register={register} type={'email'} label={'username or email address'} />
            <Input disabled={loading} errors={errors}  id="password" register={register} type={'password'} label={'password'} />
        </div>
    )
    let handleFooterButton = useCallback(() => {
        reset({})
        registerModal.onOpen();
        loginModal.onClose();
    },[])
    let Footer = (
        <div className='my-2 w-full flex items-center justify-center'>
            <p className='mx-1 text-xs'>Don;t have an Account ? </p>
            <button onClick={handleFooterButton} className='mx-1 hover:text-rose-500 text-xs'>Register</button>
        </div>
    )
    useEffect(() => {
        reset()
    },[isSubmitSuccessful,reset])
  return (
    <Modal
        width={'xs:w-11/12 mx-auto lg:w-3/12'}
        open={loginModal.open}
        body={body}
        title={'Meri Blog'}
        subTitle={'Login to your Account'}
        onSubmit={handleSubmit(onSubmit)}
        onClose={loginModal.onClose}
        disabled={loading}
        label={'Login'}
        footer={Footer}
    />
  )
}

export default Login