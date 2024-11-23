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

function Home(){
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const editorInstance=useRef(null);
    const ReactEditorJS=createReactEditorJS()
    const [image,setImage]=useState("")
    
    const ejInstance=useRef();
    // useEffect(()=>{
    //     getImage("1.png")
    // })

    const DEFAULT_INITIAL_DATA={
        "time":new Date().getTime(), //For every blog we will have the time it was written
        "blocks":[                     //Define the blocks for the data, the blocks are the individual components of the blog,e.g headers, paragraphs, images,etc.
            {                          //Here we are starting the first block
                "type":"header",       //The type of the block is header
                "data":{               //Pass the data of the block
                    "text":"This is my awesome editor",  //Then gve the content of the block which in this case is the text
                    "level":2                            //Define level of the header, i.e., 1 for h1, 2 for h2,etc.
                }
            }
        ]
    }
        const initEditor=()=>{
            const editor=new EditorJS({
                holder:"editorjs",
                onReady:()=>{
                    ejInstance.current=editor;s
                },
                autofocus:true,
                data:DEFAULT_INITIAL_DATA,
                onChange:async()=>{
                    let content=await editor.saver.save();
                    console.log(content)
                },
                tools:{
                    header:Header,
                    image:ImageTool,
                }
            })
        }

        useEffect(()=>{
            if(ejInstance.current===null){  //If the editor is not initialized yet, initialise it by calling te function to initialise
                initEditor();
            }
            return()=>{
                ejInstance?.current?.destroy(); //If the component is refreshed, then the editor content should be destroyed/removed from memory/DOM.
                ejInstance.current=null; //Then we set the ijInstance to null
            }
        },[])

    useEffect(()=>{
        getBlogs(dispatch)
    },[])
    const data=useSelector((state)=>state.db.blogs)
    const generateNumber=(()=>{
        return Math.floor(Math.random()*(2998-0+1))+0;
    })

    const formatDate=(dateString)=>{
        const date=format(new Date(dateString),'dd MMMM yyyy');
        return date
    }
    useEffect(()=>{
        const fetchImage=async()=>{
            const url=await getImage("1.png")
            setImage(url)
        }
        fetchImage()
    },[])

    console.log("Fetched State:",data)
    // console.log(data[0],generateNumber())
    
    // const publishers=data.map((item)=>item.publication);
    // const uniquePublishers=[...new Set(publishers)];
    // console.log("Publications:",uniquePublishers)

    return(
        <div className="home-main-content">
            {<NavBar/>}
            <h1>Most Popular</h1>
            <div className="most-popular-blog-container">
                <>
                {data.length>0?(
                    <>
                    <div>
                    <p>{formatDate(data[0].date)}</p>
                   <h1>{data[0].title}</h1>
                   <p>In an age where technology and biology merge, becoming a cyborg blurs the lines between human and machine. It’s not just about augmenting the body with devices; it’s about transforming the way we experience and interact with the world.</p>
                   <div>
                        <span style={{padding:"7.5%",backgroundColor:"#445963",color:"white",borderRadius:"60px"}}>MM</span>
                        <span>Mishi Makade</span>
                   </div>
                   </div>
                   <div>
                    {image!==""?(<img src={image}/>):(<p>Loading Image...</p>)}
                   </div>
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