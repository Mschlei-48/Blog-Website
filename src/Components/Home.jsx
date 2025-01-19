import {useState,useEffect,useRef} from 'react'
import "./home.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch,faPenToSquare,faBell,faUser,faBook,faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { getBlogs } from '../Redux/dataSlice';
import {useSelector} from 'react-redux'
import {useDispatch} from 'react-redux';
import Popup from 'reactjs-popup'
import {useNavigate} from 'react-router-dom'
import NavBar from './Navbar';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header'
import ImageTool from '@editorjs/image'
import {createReactEditorJS} from 'react-editor-js'
import {format} from 'date-fns'
import { getImage } from '../Redux/dataSlice';
import {fetchBlogs} from "../Redux/dataSlice";
import { db } from "../Firebase/config";
import EditorJsParser from 'editorjs-parser';
import DOMPurify from "dompurify"


function Home(){


      
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const dataState = useSelector(state => state.db);
    // console.log("Blogs are here:", dataState);



    useEffect(()=>{
        fetchBlogs(dispatch,dataState.email)
        .then((blogs)=>{
            // console.log("Blogs are Fetched")
            // console.log(dataState.blogs)
        })
        .catch((error)=>{
            console.log("Error fetching blogs:",error)
        })
    },[])
    const data=useSelector((state)=>state.db)

    // const htmlBlogs=editorjsHTML.parse(dataState.blogs)
    const formatDate=(dateString)=>{
        const date=format(new Date(dateString),'dd MMMM yyyy');
        return date
    }


    console.log("Fetched State:",data)
    
    // console.log("Data type is:",data.blogs[0].blocks)
    

    // Parse the blogs into HTML
    const parser=new EditorJsParser();
    let html=""
    const parsedContent=parser.parse({blocks: data.blogs[0].blocks})
    html=Array.isArray(parsedContent)?parsedContent.join(""):parsedContent;
    const finalHTML=DOMPurify.sanitize(html)
    console.log(typeof(html))


    return(
        <div className="home-main-content">
            {<NavBar/>}
            <h1>Most Popular</h1>
            <div className="most-popular-blog-container">
                <>
                {html?(
                    <>
                    <div
                            className="blog-content"
                            dangerouslySetInnerHTML={{ __html: finalHTML }}
                            />
                   </>
                ):
                (<h2>Loading Blogs...</h2>)
                } 
                </>
            </div>
            <div id="categories-container" style={{width:"80vw",height:"50vh"}}>
            <button></button>
            </div>
        </div>
    )
}
export default Home;