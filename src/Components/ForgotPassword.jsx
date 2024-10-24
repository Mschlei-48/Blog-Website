import {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import "./forgotPassword.css"

function ForgotPassword(){
    const navigate=useNavigate()
    const navLogin=(()=>{
        return navigate("/")
    })
    return(
        <div className="main-content-forgot-password">
            <div style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",width:"98.7vw",backgroundColor:"white",height:"102vh"}}>
            <img src='../src/assets/file.png' alt="No Logo to Display" style={{width:"12%",height:"22%",marginRight:"2%"}}/>
            <br></br>
            <br></br>
                <h2 style={{fontSize:"2.3rem",lineHeight:"0rem"}}>Reset your password</h2>
                <p style={{fontSize:"1rem",width:"30%",lineHeight:"1.5rem"}}>Enter your email address below and instructions on how to reset the password will be sent to the email you entered.</p>
                <br></br>
                <label for="forgot-password-email" style={{fontSize:"1rem",fontWeight:"bold",marginRight:"20%",lineHeight:"0"}}>Email address<span style={{color:"red"}}>*</span></label>
                <br></br>
                <br></br>
                <input name="forgot-password-email" type="email" style={{width:"28%",height:"44px",borderRadius:"10px",border:"1.5px solid rgb(178, 6, 178)",paddingLeft:"14px"}} placeholder="Enter email address"></input>
                <br></br>
                <br></br>
                <button style={{width:"30%",height:"44px",color:"white",backgroundColor:"rgb(178, 6, 178)"}}>Continue</button>
                <br></br>
                <br></br>
                <a onClick={()=>navLogin()} style={{fontSize:"1rem"}}>Back to login page</a>
            </div>
        </div>
    )
}

export default ForgotPassword