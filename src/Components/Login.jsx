import {useeState,useEffect} from 'react'
import './login.css'
import {useNavigate} from 'react-router-dom'
import {useSelector} from 'react-redux'

function Login(){

    const stateData=useSelector((state)=>state.auth)

    useEffect(()=>{
        console.log(stateData)
    })
    const navigate=useNavigate()
    const navRegister=(()=>{
        return navigate('/register')
    })
    return(
        <div className='login-main-container'>
            <div className='login-form-container'>
                <img src='../src/assets/file.png' alt="No Logo to Display" style={{width:"30%"}}/>
                <h1>Welcome Back!</h1>
                <p>Please enter your details below to login.</p>
                <label for='email'>Email<label style={{color:"red"}}> *</label></label>
                <br></br>
                <input type='email' name='email' placeholder="Enter Email"></input>
                <br></br>
                <label for="password">Password<label style={{color:"red"}}> *</label></label>
                <br></br>
                <input type="password" name='password' placeholder="Enter Password"></input>
                <br></br>
                <a style={{marginLeft:"307px"}}>Forgot password?</a>
                <br></br>
                <button className="login-button">Log in</button>
                <p style={{marginLeft:"84px"}}>Don't have an account? <a onClick={()=>navRegister()}>Register here</a></p>
            </div>
            <div className='logn-image-container'>
                <img src="../src/assets/back-login.jpg" alt="No Image to Display" className="login-side-image"/>
            </div>

        </div>
    )
}

export default Login;