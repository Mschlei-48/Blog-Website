import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './Components/Login'
import Register from './Components/Register'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Layout from './Layout.jsx'
import ForgotPassword from './Components/ForgotPassword.jsx'
import ResetPasswordEmailSet from './Components/resetPasswordEmailSent.jsx' 
import LandingPage from './Components/LandingPage.jsx'
import Home from './Components/Home.jsx'
import Profile from './Components/Profile.jsx'
import Write from './Components/Write.jsx'



function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Layout/>}>
      <Route index element={<LandingPage/>}/>
      <Route path="register" element={<Register/>}/>
      <Route path="passwordresetemailsent" element={<ResetPasswordEmailSet/>}/>
      <Route path="forgot-password" element={<ForgotPassword/>}/>
      <Route path="login" element={<Login/>}/>
      <Route path="home" element={<Home/>}/>
      <Route path="profile" element={<Profile/>}/>
      <Route path="write" element={<Write/>}/>
      </Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App;
