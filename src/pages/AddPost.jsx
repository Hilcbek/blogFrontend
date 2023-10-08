import React, { useEffect, useState } from 'react'
import Modal from '../../components/Modal/Modal'
import AddModal from '../../Hooks/AddModal'
import { useForm } from 'react-hook-form'
import Input from '../../components/Modal/Input'
import toast from 'react-hot-toast'
import { Axios, UploadImage } from '../../libs/Axios'
import { useLocation, useNavigate } from 'react-router-dom'
import FetchRelaod from '../../Hooks/FetchReloader'
const AddPost = () => {
  let [loading,setLoading] = useState(false);
  let location = useLocation().pathname.split("/")[1]
  let [image,setImage] = useState('https://png.pngtree.com/png-clipart/20210606/original/pngtree-gray-network-placeholder-png-image_6398266.jpg')
  let addModal = AddModal();
  let navigate = useNavigate();
  const fetchReload = FetchRelaod();
  const {
      register,
      handleSubmit,
      reset,
      formState : {
        errors,
        isSubmitSuccessful
      }
  } = useForm();
  let onSubmit = async (data) => {
      try {
        setLoading(true)
        let { title, body } = data;
        let result = String(image)?.includes("https") ? true : false
          let upload = ''
          if(result){
              upload = image;
          }else{
              upload = await UploadImage(image);
          }
          let res = await Axios.post(`/post`,{ title, body, postImage : upload})
          if(res.data){
            addModal.onClose()
            if(location != ""){
              navigate('/')
            }else{
              fetchReload.ReloadNow()
            }
          }else{
            toast.error('unable to add post!')
          }
      } catch (error) {
        toast.error(error.response.data.error)
      }finally{
        setLoading(false)
      }
  } 
  let body = (
    <div>
      <Input label={'Title'} id={"title"} register={register} errors={errors} disabled={loading} type={'text'}  />
      <div className='relative'>
        <textarea {...register("body")} id='body' className='w-full p-4 peer outline-none border-solid border-[1px] border-gray-300 rounded-md resize-none break-words text-xs' rows={8}></textarea>
        <label htmlFor="body" className={`
          ${errors['body'] ? 'text-rose-500' : 'text-neutral-400'}
          cursor-text absolute text-xs top-0 peer-focus:text-md text-gray-500 peer-focus:-translate-y-[8px] peer-focus:bg-white peer-placeholder-shown:text-base transform duration-150 transition translate-y-0 left-3`}>body</label>
      </div>
      <label htmlFor="images" className='rounded-full my-1 mx-auto flex items-start justify-start'>
          <img className='w-full h-[200px] object-contain cursor-pointer  border-solid border-gray-400 border-[1px]' src={String(image)?.includes("https") ? image : URL.createObjectURL(image)} alt="" />
          <input onChange={(e) => setImage(e.target.files[0])} type="file" className='hidden' id='images' />
      </label>
    </div>
  )
  useEffect(() => {
        reset()
    },[isSubmitSuccessful,reset])
  return (
    <Modal
      open={addModal.open}
      onClose={addModal.onClose}
      disabled={loading}
      title={'Meri Blog'}
      subTitle={'Share as you thoughts,feelings,and mermories 😊...'}
      width={'xs:w-11/12 lg:w-8/12 mx-auto'}
      onSubmit={handleSubmit(onSubmit)}
      body={body}
      label={'Post'}
    />
  )
}

export default AddPost