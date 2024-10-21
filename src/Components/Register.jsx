import {useState,useEffect} from 'react'
import './register.css'
import {useNavigate} from 'react-router-dom'
import {registerUser} from '../Redux/authSlice.js' 
import {useDispatch,useSelector} from 'react-redux'

function Register(){
    const navigate=useNavigate()
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [username,setUsername]=useState("")
    const dispatch=useDispatch()
    const {Email,Username,Password,error,loading}=useSelector((state)=>state.auth)




    const navLogin=(()=>{
        return navigate("/")
    })
    const handleRegister=(()=>{
        registerUser(dispatch,email,password,username,navigate)
    })
    return(
        <div className='register-main-container'>
            <div className='register-form-container'>
                <img src='../src/assets/file.png' alt="No Logo to Display" style={{width:"25%"}}/>
                <h1>Create your account!</h1>
                <p>Please enter your details below to register.</p>
                <label for='username'>Username<label style={{color:"red"}}> *</label></label>
                <br></br>
                <input type='username' name='username' placeholder="Enter Username" onChange={(event)=>setUsername(event.target.value)}></input>
                <br></br>
                <label for='email'>Email<label style={{color:"red"}}> *</label></label>
                <br></br>
                <input type='email' name='email' placeholder="Enter Email" onChange={(event)=>setEmail(event.target.value)}></input>
                <br></br>
                <label for="password">Password<label style={{color:"red"}}> *</label></label>
                <br></br>
                <input type="password" name='password' placeholder="Enter Password" onChange={(event)=>setPassword(event.target.value)}></input>
                <br></br>
                <button className="register-button" onClick={()=>handleRegister()}>Register</button>
                <p style={{marginLeft:"84px"}}>Already have an account? <a onClick={()=>navLogin()}>Login here</a></p>
                {loading===true? (<h4 style={{marginLeft:"150px",fontWeight:"bold"}}>Loading...</h4>):(<h4></h4>)}
            </div>
            <div className='register-image-container'>
                <img src="../src/assets/back-login.jpg" alt="No Image to Display" className="register-side-image"/>
            </div>

        </div>
    )
}
export default Register;