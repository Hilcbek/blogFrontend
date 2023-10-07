import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Nav from '../components/Nav'
import Modal from '../components/Modal/Modal'
import Register from './pages/Register'
import { Toaster } from 'react-hot-toast'
import Login from './pages/Login'
import Home from './pages/Home'
import AddPost from './pages/AddPost'
import Blogs from './pages/Blogs'
import SinglePost from './pages/SinglePost'
import UsersPosts from './pages/UsersPosts'
import OwnPosts from './pages/OwnPosts'
import { useSelector } from 'react-redux'
function App() {
  let { id } = useSelector((state) => state.user);
  return (
   <>
      <BrowserRouter>
      <Nav />
      <Toaster position='top-center' containerStyle={{ marginTop : 100}} />
        <Routes>
          <Route path={'/'} element={<Home />} />
          <Route path={'/singlePost/:id'} element={id ? <SinglePost /> : <Navigate to={'/'} />} />
          <Route path='/userRelatedPosts/:name' element={id ? <UsersPosts /> : <Navigate to={'/'} />} />
          <Route path='/ownPost' element={id ? <OwnPosts /> : <Navigate to={'/'} />} />
        </Routes>
      <Register />
      <Login />
      <AddPost />
      </BrowserRouter>
   </>
  )
}

export default App
