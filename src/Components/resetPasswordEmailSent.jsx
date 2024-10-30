import { useState } from "react";
import "./resetpassword.css";
import { useLocation } from "react-router-dom";
import {resetPassword} from "../Redux/authSlice.js";
import { useDispatch } from "react-redux";

function ResetPasswordEmailSet() {
    const passed_data=useLocation()
    const email=passed_data.state
    const dispatch=useDispatch()
    console.log("Passed email:",email)
  return (
    <div className="reset-password-email-sent-content">
        <div>
            <img
            src="../src/assets/file.png"
            alt="No Logo to Display"
            style={{ width: "75%", height: "42%", marginRight: "2%" }}
            />
        </div>
        <div>
            <span style={{color:"purple",fontSize:"140px",border:"3px solid purple",borderRadius:"95px",paddingLeft:"23px",paddingRight:"23px"}}>&#10003;</span>
        </div>
        <br></br>
        <div>
            <h2>Check your email</h2>
            <p>
                Please check your email address for an email to reset your password.
            </p>
            <button style={{width:"70%",color:"white",backgroundColor:"purple"}} onClick={()=>resetPassword(dispatch,email)}>Resend Email</button>
        </div>
    </div>
  );
}

export default ResetPasswordEmailSet;
