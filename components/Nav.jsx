import React, { useCallback, useEffect, useState } from 'react'
import Button from './Modal/Button'
import RegisterModal from '../Hooks/RegisterModal'
import {BiLogIn, BiLogOut, BiMenu} from 'react-icons/bi'
import MenuItem from './Modal/MenuItem'
import LoginModal from '../Hooks/LoginModal'
import { MdAccountCircle, MdOutlineDesignServices, MdOutlinePermContactCalendar } from 'react-icons/md'
import {Link} from 'react-router-dom'
import { BsFillFilePostFill, BsInfoCircle } from 'react-icons/bs'
import {ImProfile} from 'react-icons/im'
import {GrBlog} from 'react-icons/gr'
import {FiEdit2} from 'react-icons/fi'
import AddModal from '../Hooks/AddModal'
import { useDispatch, useSelector } from 'react-redux'
import Reloader from '../Hooks/NavReloader'
import { Axios } from '../libs/Axios'
import { LOGOUT } from '../Toolkit/User_Reducer'
const Nav = () => {
    let userLogged = true
    let reload = Reloader()
    let register = RegisterModal()
    let addModal = AddModal()
    let login = LoginModal()
    let [show,setShow] = useState(false)
    let handleShow = useCallback(() => {
        setShow((show) =>  !show)
    },[])
    let [scroll,setScroll] = useState(false);
    useEffect(() => {
        let Scroll = () => {
            if(window.scrollY > 200){
                setScroll(true)
            }else{
                setScroll(false)
            }
        }
        window.addEventListener('scroll',Scroll)
        return () => window.removeEventListener('scroll',Scroll);

    },[])
    let { profile } = useSelector((state) => state.user);
    let dispatcher = useDispatch()
    let handleLogout = async () => {
        await Axios.post('/auth/logout');
        dispatcher(LOGOUT())
        reload.onReload()
    }
  return (
    <nav className={`${scroll ? 'shadow-md' : 'shadow-none'} fixed mb-10 bg-white w-full xs:px-2 xl:px-10 flex items-center justify-between py-2`}>
        <Link to={'/'} className='w-14 h-14 flex items-center justify-center'>
            <img src="/logo.png" className='w-12 h-12 object-contain' alt="none" />
        </Link>
        <ul className='flex items-center justify-center'>
            {(reload.reload && profile) && <button onClick={addModal.onOpen} className='mr-2 p-3 flex items-center justify-center rounded-3xl shadow-lg text-xs font-semibold'><BsFillFilePostFill className='mr-2' /> Add Blog</button>}
            <div onClick={handleShow} className='p-2 z-[99] rounded-3xl shadow-md flex items-center justify-center cursor-pointer relative'>
                <BiMenu className='mr-1 text-xl' />
                <div className='w-8 h-8 ml-1 border-solid border-gray-500 border-[1px] rounded-full'>
                    <img src={(reload.reload && profile) ? profile : '/logo.png'} alt="none" className='w-full h-full object-cover rounded-full' />
                </div>
                {(reload.reload && profile) ? 
                    (
                        <div className={`${show ? 'translate-y-0 opacity-100' : '-translate-y-[10px] opacity-0'} transition duration-300 transform absolute rounded-md top-14 p-2 w-40 right-2 shadow-md bg-white flex items-start justify-start flex-col`}>
                            <MenuItem status={show} Icon={<ImProfile  size={19}/>} label={'Profile'} onClick={register.onOpen} />
                            <MenuItem status={show} Icon={<FiEdit2 size={19} />} label={'Edit Profile'} onClick={register.onOpen} />
                            <MenuItem status={show} Icon={<MdOutlineDesignServices size={19} />} label={'Services'} onClick={register.onOpen} />
                            <Link to={'/ownPost'} className={`${show ? 'flex' : 'hidden'} w-full hover:bg-gray-50 p-2 items-center justify-start cursor-pointer font-medium text-left text-xs rounded-sm`}>
                                <GrBlog size={19} className='mr-1' /> My Blogs
                            </Link>
                            <MenuItem status={show} Icon={<MdOutlinePermContactCalendar size={19} />} label={'Contact'} onClick={register.onOpen} />
                            <MenuItem status={show} Icon={<BiLogOut size={19} />} label={'Logout'} onClick={handleLogout} />
                        </div>
                    ) : (
                        <div className={`${show ? 'translate-y-0 opacity-100 z-[9999]' : '-translate-y-[10px] -z-[9999] opacity-0'} transition duration-300 transform absolute rounded-md top-14 p-2 w-40 right-2 shadow-md bg-white flex items-start justify-start flex-col`}>
                            <MenuItem status={show} Icon={<MdAccountCircle size={19} />} label={'Register'} onClick={register.onOpen} />
                            <MenuItem status={show} Icon={<BiLogIn size={19} />} label={'Login'} onClick={login.onOpen} />
                        </div>
                    )
                }
            </div>
        </ul>
    </nav>
  )
}

export default Nav