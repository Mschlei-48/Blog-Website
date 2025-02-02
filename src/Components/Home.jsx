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

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const dataState = useSelector((state) => state.db);
  const data = useSelector((state) => state.db);
  // console.log("Blogs are here:", data);

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
    // const par=blog.blocks.filter((element)=>element.type==="paragraph")
    console.log("Testing",image[0])
    console.log("Testing 2",header[0])
    // console.log("Testing 3",par[0].data.text.slice(0,101))
    const first_image=image[0]
    const first_header=header[0]
    const time=blog.time
    const parsedContent = parser.parse({ blocks: [first_image,first_header]});
    const finalHTML = DOMPurify.sanitize(parsedContent);
    console.log("Testing final:",finalHTML)
    return finalHTML
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
        // const parser = new EditorJsParser();
        // const parsedContent = parser.parse({ blocks: data.blogs[1].blocks});
        // html = Array.isArray(parsedContent)
        //   ? parsedContent.join("")
        //   : parsedContent;
        // const finalHTML = DOMPurify.sanitize(html);
        // console.log(typeof html);
      
      if (data.loading === false) {
        return (
          <>
          
            <div className="blog-display">
            {data.blogs.slice(1).map(blog=>(
              <div className="blog-content">
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

  // console.log(html)
  {
    /* Check if the html exist and the loading is done. Then also check if the loader is still loading. */
  }
  {
    /* If it is still loading say "Loading Blogs" */
  }
  {
    /* But if it is not and the html is empty then show "No Blogs to Display" */
  }
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
    </div>
  );
}
export default Home;
