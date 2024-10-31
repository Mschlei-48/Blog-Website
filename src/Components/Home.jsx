import {useState,useEffect} from 'react'
import "./home.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch,faPenToSquare,faBell,faUser,faBook,faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { getBlogs } from '../Redux/dataSlice';
import {useSelector} from 'react-redux'
import {useDispatch} from 'react-redux';
import Popup from 'reactjs-popup'
import {useNavigate} from 'react-router-dom'
import NavBar from './Navbar';

function Home(){
    const dispatch=useDispatch()
    const navigate=useNavigate()
    // useEffect(()=>{
    //     getBlogs(dispatch)
    // })
    // const data=useSelector((state)=>state.db.blogs)
    
    // const publishers=data.map((item)=>item.publication);
    // const uniquePublishers=[...new Set(publishers)];
    // console.log("Publications:",uniquePublishers)

    return(
        <div className="home-main-content">
            {<NavBar/>}
        </div>
    )
}
export default Home;