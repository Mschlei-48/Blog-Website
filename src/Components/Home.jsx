import { useState, useEffect, useRef } from "react";
import "./home.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faPenToSquare,
  faBell,
  faUser,
  faBook,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { getBlogs } from "../Redux/dataSlice";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Popup from "reactjs-popup";
import { useNavigate } from "react-router-dom";
import NavBar from "./Navbar";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import ImageTool from "@editorjs/image";
import { createReactEditorJS } from "react-editor-js";
import { format } from "date-fns";
import { getImage } from "../Redux/dataSlice";
import { fetchBlogs } from "../Redux/dataSlice";
import { db } from "../Firebase/config";
import EditorJsParser from "editorjs-parser";
import DOMPurify from "dompurify";
import Footer from './Footer.jsx'
import {useLocation} from 'react-router-dom'

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const data = useSelector((state) => state.db);


  useEffect(() => {
    fetchBlogs(dispatch, data.email)
      .then((blogs) => {
      })
      .catch((error) => {
        console.log("Error fetching blogs:", error);
      });
  }, []);
  


  // Experimental Code
  const formatDate = (dateString) => {
    const date = format(new Date(dateString), "dd MMMM yyyy");
    return date;
  };

  console.log("Fetched State:", data);
  const parser = new EditorJsParser();

  const handleParseDiv=(blog)=>{
    const image=blog.blocks.filter((element)=>element.type==="image")
    const header=blog.blocks.filter((element)=>element.type==="header")
    console.log("Testing",image[0])
    console.log("Testing 2",header[0])
    const first_image=image[0]
    const first_header=header[0]
    const time=blog.time
    const parsedContent = parser.parse({ blocks: [first_image,first_header]});
    const finalHTML = DOMPurify.sanitize(parsedContent);
    console.log("Testing final:",finalHTML)
    return finalHTML
  }

  const displayContent=(blog)=>{
    // console.log("Blog ID",blog.blog.id)
    // console.log("Blog Time",blog.time)
    const blogs=data.blogs.filter((content)=>content.id===blog.blog.id)
    console.log("Found Blog",blogs)
    const time=blogs[0].time
    console.log("Blocks",blogs[0].blocks)
    const parsedContent = parser.parse({ blocks: blogs[0].blocks});
    const finalHTML = DOMPurify.sanitize(parsedContent);
    console.log("Found HTML",finalHTML)
    navigate("/read",{
      state:{html:finalHTML,times:time}
    })
  }

  // Parse the blogs into HTML
  let html = "";
  const handleParsing = (data) => {
    if(!data.blogs || data.blogs.length===0){
      return <h2>No Data To Display</h2>
    }
    if(data.loading){
      return <h2>Loading...</h2>
    }

    if (data.blogs.length > 0) {
      if (data.loading === false) {
        return (
          <>
            <div className="blog-display">
            {data.blogs.slice(1).map(blog=>(
              <div className="blog-content" onClick={()=>displayContent({blog})}>
              <div
              key={blog.id}
              style={{width:"100%",gap:"10px"}}
              className="content"
              dangerouslySetInnerHTML={{ __html: handleParseDiv(blog) }}/>
              <span>{formatDate(blog.time)}</span>
            </div>
          ))
        }
            </div>
          </>
        );
      } 
  }
  };


  return (
    <div className="home-main-content">
      {<NavBar />}
      <h1>Most Popular</h1>
      <div>
          {
          handleParsing(data)
          }
      </div>
      <div id="categories-container" style={{ width: "80vw", height: "50vh" }}>
        <button></button>
      </div>
      <Footer/>
    </div>
  );
}
export default Home;
