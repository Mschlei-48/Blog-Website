import {useState,useEffect,useRef} from 'react'
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header'
import ImageTool from '@editorjs/image'
import NavBar from './Navbar';
import './write.css'

function Write(){
    const editorInstance=useRef(null);
    
    const ejInstance=useRef();

    const DEFAULT_INITIAL_DATA={
        "time":new Date().getTime(), //For every blog we will have the time it was written
        "blocks":[                     //Define the blocks for the data, the blocks are the individual components of the blog,e.g headers, paragraphs, images,etc.
            {                          //Here we are starting the first block
                "type":"header",       //The type of the block is header
                "data":{               //Pass the data of the block
                    "text":"Start writing...",  //Then gve the content of the block which in this case is the text
                    "level":1                           //Define level of the header, i.e., 1 for h1, 2 for h2,etc.
                }
            }
        ]
    }
        const initEditor=()=>{
            const editor=new EditorJS({
                holder:"editorjs",
                onReady:()=>{
                    ejInstance.current=editor;
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
                },
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
    return(
        <div className="write-main-content">
            {<NavBar/>}
            <br></br>
            <br></br>
            <div className="write-container">
                <div id="editorjs" style={{width:"80vw",height:"80vh"}}>
            </div>
            
            </div>
        </div>
    )
}
export default Write;