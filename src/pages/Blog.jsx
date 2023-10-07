import React, { useEffect, useState } from 'react'
import formatDistance from 'date-fns/formatDistance'
import { Link } from 'react-router-dom'
const Blog = ({data}) => {
  return (
    <div className='w-full flex items-start justify-start flex-col'>
        <div className='xs:w-full lg:w-9/12 mx-auto'>
            <h1 className='my-2 bg-gray-300 p-2 w-fit rounded-3xl shadow-md tracking-wider cursor-pointer hover:shadow-rose-200 transition duration-300 text-[10px] font-bold'>To edit or delete the post please click the post image</h1>
        </div>
        <div className='flex items-center justify-center flex-col w-full'>
            <div className='font-Roboto xs:flex-col lg:flex-row xl:w-9/12 mx-auto flex items-start my-2 justify-center lg:odd:flex-row-reverse shadow-md p-2'>
                <Link to={`/singlePost/${data._id}`} className='w-full p-1 shadow-md bg-gray-100 rounded-md mr-5'>
                    <img className='w-full h-full object-contain' src={data?.postImage} alt="" />
                </Link>
                <div className='xs:w-full xl:w-9/12 mx-auto'>
                    <h1 className='text-4xl mb-1'>{data?.title}</h1>
                    <p className='text-gray-600 mb-2 font-medium font-Roboto xs:text-[12px] smtext-sm'>&nbsp;&nbsp;&nbsp;&nbsp;{
                        (`${data?.body}`)
                        
                    }
                    </p>
                    <div className='w-full flex items-center justify-between xl:w-11/12 mx-auto xs:mt-4 xl:mt-0'>
                        <div className='flex xl:items-center xl:justify-center xs:flex-col sm:flex-row  xs:justify-start xs:items-start font-bold'>
                            <p className='text-gray-500 text-xs'>CreatedAt : </p>
                            <p className='xl:ml-2 xs:text-[9px] sm:text-xs'>{formatDistance (new Date(data?.createdAt === data?.updatedAt ? data?.createdAt : data?.updatedAt),  new Date(), { addSuffix: true })}</p>
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
        </div>
    </div>
  )
}

export default Blog