import React, { useCallback, useEffect, useState } from 'react'
import Blog from './Blog'
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";
import { Axios } from '../../libs/Axios'
import toast from 'react-hot-toast'
import EditModal from '../../Hooks/EditModal';
import { useSelector } from 'react-redux';
import AddModal from '../../Hooks/AddModal';
import FetchRelaod from '../../Hooks/FetchReloader';

const Blogs = () => {
  let [data,setData] = useState([])
  let [loading,setLoading] = useState(false)
  let editModal = EditModal()
  let { id } = useSelector((state) => state.user)
  let addModal = AddModal()
  let fetchReload = FetchRelaod();
  let FetechData = useCallback(async () => {
      try {
        setLoading(true)
        let res = await Axios.get(`/post`);
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
  let openDialogBox = () => {
    if(id){
      addModal.onOpen()
    }
  }
  useEffect(() => {
    FetechData()
  },[editModal.open,fetchReload.refresh])
  return (
    <div className={`${loading ? 'items-center justify-center' : 'items-start justify-start'} flex-col pt-20 w-full flex min-h-screen`}>
        {
          loading ? <ClimbingBoxLoader color={'#009866'} loading={loading} size={50} aria-label="Loading Spinner" data-testid="loader" /> : data.length > 0 ? data?.map((blog) => (
            <Blog key={blog._id} data={blog} />
          )) :  <div className='w-full min-h-[75vh] flex items-center justify-center flex-col'>
              <h1 className='text-5xl text-rose-300'>No Post 🥺</h1>
              <button onClick={openDialogBox} className='text-xs font-bold text-gray-500 p-1 shadow-md rounded-3xl'>
                { 
                  id ? 'now! create some posts😊' : 'Login first! then create a post😊!'
                }
              </button>
          </div>
        }
    </div>
  )
}

export default Blogs