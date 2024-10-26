import {useState} from 'react'

function resetPasswordEmailSet(){
    return(
        <div className="main-content-reset-password-email-sent" style={{width:"100vw",height:"100vh",backgroundColor:"white"}}>
            <img
                src="../src/assets/file.png"
                alt="No Logo to Display"
                style={{ width: "12%", height: "22%", marginRight: "2%" }}
            />
            <h2>Check your email</h2>
            <p>Please check your email address for an email to reset your password.</p>
            <button>Resend Email</button>
        </div>
    )
}

export default  resetPasswordEmailSet;