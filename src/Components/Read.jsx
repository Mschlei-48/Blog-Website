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
import { getBlogs } from "../Redux/dataSlice.js";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Popup from "reactjs-popup";
import { useNavigate } from "react-router-dom";
import NavBar from "./Navbar.jsx";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import ImageTool from "@editorjs/image";
import { createReactEditorJS } from "react-editor-js";
import { format } from "date-fns";
import { getImage } from "../Redux/dataSlice.js";
import { fetchBlogs } from "../Redux/dataSlice.js";
import { db } from "../Firebase/config.js";
import EditorJsParser from "editorjs-parser";
import DOMPurify from "dompurify";
import Footer from './Footer.jsx'
import {useLocation} from 'react-router-dom'
import './read.css'

function Read(){

  const location=useLocation()
  console.log(location.state)
    return(
        <div className="read-main-content">
          <NavBar/>
          <div>
            <hr></hr>
          </div>
          
          <div dangerouslySetInnerHTML={{__html:location.state.html}} style={{width:"50%",height:"50%"}}/>
        </div>
    )
}

export default Read;