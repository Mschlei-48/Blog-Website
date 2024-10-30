import {useState,useEffect} from 'react'
import './login.css'
import {useNavigate} from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux'
import {signInUser} from '../Redux/authSlice.js' 

function Login(){

    const stateData=useSelector((state)=>state.auth)

    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")

    const dispatch=useDispatch()
    useEffect(()=>{
        console.log(stateData)
    })
    const navigate=useNavigate()
    const navRegister=(()=>{
        return navigate('/register')
    })

    const forgotPasswordNav=(()=>{
        return navigate("forgot-password")
    })

    // const handleLoginNav=(()=>{
    //     if(stateData.loggedIn===true){
    //         navigate("/landing-page")
    //     }
    // })
    return(
        <div className='login-main-container'>
            <div className='login-form-container'>
                <img src='../src/assets/file.png' alt="No Logo to Display" style={{width:"30%"}}/>
                <h1>Welcome Back!</h1>
                <p>Please enter your details below to login.</p>
                <label for='email'>Email<label style={{color:"red"}}> *</label></label>
                <br></br>
                <input type='email' name='email' placeholder="Enter Email" onChange={(event)=>setEmail(event.target.value)}></input>
                <br></br>
                <label for="password">Password<label style={{color:"red"}}> *</label></label>
                <br></br>
                <input type="password" name='password' placeholder="Enter Password" onChange={(event)=>setPassword(event.target.value)}></input>
                <br></br>
                <a style={{marginLeft:"307px"}} onClick={()=>forgotPasswordNav()}>Forgot password?</a>
                <br></br>
                <button className="login-button" onClick={()=>signInUser(dispatch,email,password)}>Log in</button>
                <p style={{marginLeft:"84px"}}>Don't have an account? <a onClick={()=>navRegister()}>Register here</a></p>
            </div>
            <div className='logn-image-container'>
                <img src="../src/assets/back-login.jpg" alt="No Image to Display" className="login-side-image"/>
            </div>

        </div>
    )
}

export default Login;