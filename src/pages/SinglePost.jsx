import  formatDistance  from 'date-fns/formatDistance'
import React, { useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Axios } from '../../libs/Axios'
import ClimbingBoxLoader from 'react-spinners/ClimbingBoxLoader'
import Modal from '../../components/Modal/Modal'
import EditModal from '../../Hooks/EditModal'
import { FiEdit2 } from 'react-icons/fi'
import { MdDeleteOutline } from 'react-icons/md'
import { useForm } from 'react-hook-form'
import Input from '../../components/Modal/Input'
import { useSelector } from 'react-redux'
import FetchRelaod from '../../Hooks/FetchReloader'

const SinglePost = () => {
    let location = useLocation().pathname.split("/")[2]
    let editModal = EditModal();
    let fetchReload = FetchRelaod()
    let [data,setData] = useState([])
  let [loading,setLoading] = useState(false)
  let { id } = useSelector((state) => state.user)
  const {
        register,
        handleSubmit,
        formState : {
            errors
        } 
    } = useForm({
      defaultValues : async () => {
           let res = await Axios.get(`/post/${location}`);
            return{
                title : res.data.data.title,
                body : res.data.data.body
            }
        }
    })
    let onSubmit = async (data) => {
      let { title, body } = data;
        try {
          setLoading(true)
          let res = await Axios.put(`/post/${location}`,{ title, body });
          if(res.data){
            toast.success('post edited successfully!')
            editModal.onClose();
            window.location.reload();
          }
        } catch (error) {
          toast.error(error.response.data.error)
        }finally{
          setLoading(false)
        }
    }
  let FetechData = useCallback(async () => {
      try {
        setLoading(true)
        let res = await Axios.get(`/post/${location}`);
        if(res.data){
          setData(res.data.data) 
        }else{
          toast.error('Error while fetching blogs!')
        }
      } catch (error) {
        toast.error(error.response.data.error)
      }finally{
        setLoading(false)
      }
  },[])
  let navigate = useNavigate()
  useEffect(() => {
    FetechData()
  },[editModal.open,fetchReload.refresh])
    let handleOpener = () => {
        editModal.onOpen()
    }
    let handleDelete = useCallback(async (id) => {
        try {
          setLoading(true)
          let res = await Axios.delete(`/post/${id}`)
          if(res.data){
            toast.success(res.data.data)
            navigate('/')
          }
        } catch (error) {
          toast.error(error.response.data.error)
        }finally{
          setLoading(false)
        }
    },[])
    let body = (
        <div>
            <Input label={'Edit title'} register={register} id={'title'} required disabled={loading} type={'text'} errors={errors} />
            <div className='relative'>
                <textarea {...register("body")} id='body' className='w-full p-4 peer outline-none border-solid border-[1px] border-gray-300 rounded-md resize-none break-words text-xs' rows={8}></textarea>
                <label htmlFor="body" className={`
                ${errors['body'] ? 'text-rose-500' : 'text-neutral-400'}
                cursor-text absolute text-xs top-0 peer-focus:text-md text-gray-500 peer-focus:-translate-y-[8px] peer-focus:bg-white peer-placeholder-shown:text-base transform duration-150 transition translate-y-0 left-3`}>Edit body</label>
            </div>
        </div>
    )
  return (
    <div className={`${loading ? 'items-center justify-center' : 'items-start justify-center'} flex-col pt-20 flex w-full min-h-screen`}>
      <Modal
            open={editModal.open}
            onSubmit={handleSubmit(onSubmit)}
            width={'xs:w-11/12 xl:w-8/12 mx-auto'}
            title={'Meri Blog'}
            subTitle={'Edit Post'}
            body={body}
            label={'Edit Post'}
            disabled={loading}
            onClose={editModal.onClose}
        />
      {data?.userName?._id === id && <div className='flex items-center justify-end xs:w-11/12 mx-auto xl:w-9/12 mb-5'>
          <button onClick={handleOpener} className='p-3 bg-emerald-500 mx-2 flex items-center justify-center text-xs text-white rounded-md hover:shadow-md transition duration-300'>Edit Post <FiEdit2 className='ml-2 text-xs' /></button>
          <button onClick={ () => handleDelete(location)} className='p-3 bg-rose-500 mx-2 flex items-center justify-center text-xs text-white rounded-md hover:shadow-md transition duration-300'>Delete Post <MdDeleteOutline className='ml-2 text-xs' /></button>
      </div>}
      {
        loading ? <ClimbingBoxLoader color={'#009866'} loading={loading} size={50} aria-label="Loading Spinner" data-testid="loader" /> : <div className='flex items-center justify-center w-11/12 mx-auto flex-col'>
          <div className='w-full h-[400px]'>
              <img  className={'w-full h-full object-contain'} src={data?.postImage} alt="" />
            </div>
            <div className='xs:w-full lg:w-9/12 mx-auto my-4'>
                <h1 className='text-4xl mb-1'>{data?.title}</h1>
                <p className='text-gray-600 font-medium font-Roboto text-sm'>&nbsp;&nbsp;&nbsp;&nbsp;{
                    (data?.body)   
                }
                </p>
                <div className='w-full flex items-center justify-between xs:mt-4 xl:mt-0'>
                    <div className='flex xl:items-center xl:justify-center xs:flex-col sm:flex-row  xs:justify-start xs:items-start font-bold'>
                        <p className='text-gray-500 text-xs'>CreatedAt : </p>
                       {/* <p className='xl:ml-2 xs:text-[9px] sm:text-xs'>{formatDistance (new Date(data?.createdAt === data?.updatedAt ? data?.createdAt : data?.updatedAt),  new Date(), { addSuffix: true })}</p> */}
                    </div>
                    <div className='flex items-center justify-center'>
                        <div className='xs:w-8 sm:w-10 xs:h-8 sm:h-10 rounded-full'>
                            <img src={data?.userName?.profile} className='rounded-full w-full h-full object-cover' alt="none" />
                        </div>
                        <Link to={`/userRelatedPosts/${data?.userName?.username}`} className='xs:text-[11px] sm:text-xs ml-1 font-bold'>{data?.userName?.username}</Link>
                    </div>
                </div>
            </div>
          </div>
        }
    </div>
  )
}

export default SinglePost