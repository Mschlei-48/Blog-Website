import {useState} from 'react'
import './landing-page.css'
import {useNavigate} from 'react-router-dom'
import Login from './Login.jsx'
import Popup from 'reactjs-popup'

function LandingPage(){
    const navigate=useNavigate()
    const [read,setRead]=useState(false)
    return(
        <div className="landing-page-main-content">
            <div className="landing-page-nav-bar">
            <Popup trigger={read}>
                <div>
                  <h1>Hi</h1>
                </div>
            </Popup>
                <h2 style={{fontWeight:"45px",fontFamily:"Roboto",fontSize:"35px"}}>Infinity</h2>
                <div className="landing-page-nav-list">
                    <button style={{color:"white"}} id="start-reading" onClick={()=>setRead(true)}>Start Reading</button>
                    <button style={{backgroundColor:"blue",color:"white"}} id="sign-in" onClick={()=>navigate("/login")}>Sign in</button>
                    <button style={{backgroundColor:"black",color:"white"}} id="start-up" onClick={()=>navigate("/register")}>Sign up</button>
                </div>
            </div>
            <hr></hr>
            <div className="landing-page-middle-content">
                <div style={{width:"55%",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"flex-start",marginTop:"75px",paddingLeft:"70px"}}>
                    <h1 style={{fontSize:"4.5rem",lineHeight:"0px"}}>Byte-Sized</h1>
                    <h1 style={{fontSize:"4.5rem",lineHeight:"0px"}}>Tech</h1>
                    <p style={{fontSize:"1.5rem",width:"70%",lineHeight:"0px"}}>A place to explore the digital frontier, where</p>
                    <p style={{fontSize:"1.5rem",lineHeight:"0px"}}>technology meets curiosity.</p>
                </div>
                <div style={{width:"45%",marginLeft:"8px"}}>
                    <video style={{width:"500px",marginTop:"55px"}} autoPlay loop muted playsInline>
                        <source src="../src/assets/animation.mp4" type="video/mp4"/>
                    </video>
                </div>
            </div>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <hr></hr>
            <div className="landing-page-footer">
                <ul>
                    <li>Help</li>

                    <li>Status</li>

                    <li>About</li>

                    <li>Careers</li>

                    <li>Press</li>

                    <li>Blog</li>

                    <li>Privacy</li>

                    <li>Terms</li>

                    <li>Text to speech</li>

                    <li>Teams</li>
                </ul>
            </div>

        </div>
    )
}

// backgroundColor:"rgb(178, 6, 178)",
export default LandingPage;