import React, { useCallback, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Axios } from '../../libs/Axios';
import toast from 'react-hot-toast';
import Blog from './Blog';
import ClimbingBoxLoader from 'react-spinners/ClimbingBoxLoader';

const UsersPosts = () => {
    let location = useLocation().pathname.split("/")[2];
    let [loading,setLoading] = useState(false)
    let [posts,setPosts] = useState([])
    let FetchRelatedPosts = useCallback(async () => {
        try {
            setLoading(true)
            let res = await Axios.get(`/post/relatedUserPost/${location}`);
            if(res.data){
                setPosts(res.data.data)
                toast.success(`All Posts of ${location}`)
            }
        } catch (error) {
            toast(error.response.data.error)
        }finally{
            setLoading(false)
        }
    },[location])
    useEffect(() => {
        FetchRelatedPosts()
    },[location])
  return (
     <div className={`${loading ? 'items-center justify-center' : 'items-start justify-start'} flex-col pt-20 w-full flex min-h-screen`}>
        {
          loading ? <ClimbingBoxLoader color={'#009866'} loading={loading} size={50} aria-label="Loading Spinner" data-testid="loader" /> :  posts?.map((blog) => (
            <Blog key={blog._id} data={blog} />
          ))
        }
    </div>
  )
}

export default UsersPosts