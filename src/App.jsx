import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './Components/Login'
import Register from './Components/Register'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Layout from './Layout.jsx'
import ForgotPassword from './Components/ForgotPassword.jsx'

function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Layout/>}>
      <Route index element={<Login/>}/>
      <Route path="register" element={<Register/>}/>
      <Route path="forgot-password" element={<ForgotPassword/>}/>
      </Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App
