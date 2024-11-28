import React, { useContext, useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Login from './pages/login/Login'
import Chat from './pages/chat/Chat'
import ProfileUpdate from './pages/profileUpdate/ProfileUpdate'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './config/firebase'
import { AppContext } from './context/AppContext'


const App = () => {

  const navigate = useNavigate();
  const {loadUserData} = useContext(AppContext);

  useEffect(() => {
    // method will be executed whenever we login or logout
    onAuthStateChanged(auth, async(user) => {
      if(user){
        navigate('/chat')
        await loadUserData(user.uid)  // load user data when user logs in or logs out
      }
      else{
        navigate('/')
      }
    })
  }, [])

  return (
    <>
    <ToastContainer/>
      <Routes>
        <Route path='/' element={<Login/>} />
        <Route path='/chat' element={<Chat/>} />
        <Route path='/profile' element={<ProfileUpdate/>} />
      </Routes>
    </>
  )
}

export default App