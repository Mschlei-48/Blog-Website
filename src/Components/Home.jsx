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
import {HomeBlogs} from "../Redux/dataSlice";
import { db } from "../Firebase/config";
import EditorJsParser from "editorjs-parser";
import DOMPurify from "dompurify";
import Footer from './Footer.jsx'
import {useLocation} from 'react-router-dom'

function Home() {
  const data = useSelector((state) => state.db);
  console.log(data.email)
  const [blogs,setBlogs]=useState([])
  useEffect(()=>{
    HomeBlogs(data.email)
    .then((blogs)=>{
      setBlogs(blogs)
    })
    .catch((error)=>{
      console.log("Error fetching blogs")
    })
  },[])
  console.log(blogs)
  return (
    <div className="home-main-content">
      {<NavBar />}
      <Footer/>
    </div>
  );
}
export default Home;
