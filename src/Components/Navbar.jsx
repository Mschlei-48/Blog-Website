import {useState} from 'react'
import './navbar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch,faPenToSquare,faBell,faUser,faBook,faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import Popup from 'reactjs-popup'
import {useNavigate} from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux'
import {setUser} from '../Redux/authSlice.js'
import {persistor} from '../Redux/store.js'

function NavBar(){
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const logOut=(()=>{
        dispatch(setUser({"email":"","password":"","username":"","loggedIn":false}))
        persistor.purge()
        navigate("/")
        persistor.purge()
    })
    const handleWriteNav=(()=>{
        return navigate("/write")
    })
    return (
        <div className="nav-bar">
        <div style={{display:"flex",justifyContent:"start",alignItems:"flex-start",gap:"25px"}}>
            <span style={{fontSize:"2.7rem",fontFamily:"Roboto",fontWeight:"bold"}}>Infinity</span>
            <input type="text" placeholder="Search..." style={{height:"45px",width:"205px",border:"none",borderRadius:"17px",paddingLeft:"10px",backgroundColor:"rgb(248, 247, 247)"}}></input>
        </div>
        <div style={{display:"flex",gap:"45px"}}>
            <a className="nav-a" onClick={()=>handleWriteNav()}>
                <FontAwesomeIcon icon={faPenToSquare} className="nav-icons"/>
            </a>
            <a className="nav-a">
                <FontAwesomeIcon icon={faBell} className="nav-icons"/>
            </a>
        <Popup className="popup" trigger={<a id="user" className="nav-a"><FontAwesomeIcon icon={faUser} className="nav-icons" style={{color:"white",backgroundColor:"black",borderRadius:"25px",padding:"25%",width:"30px",height:"28px"}}/></a>}>
            <div className="prfile-dropdown-content">
                <a onClick={()=>navigate("/profile")}><FontAwesomeIcon icon={faUser} />  Profile</a>
                <a><FontAwesomeIcon icon={faBook} />  Stories</a>
                <a onClick={()=>logOut()}><FontAwesomeIcon icon={faRightFromBracket} />  Logout</a>
            </div>
        </Popup>
        </div>

        </div>
    )
}

export default NavBar;

