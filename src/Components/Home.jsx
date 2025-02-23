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
import { HomeBlogs } from "../Redux/dataSlice";
import { db } from "../Firebase/config";
import EditorJsParser from "editorjs-parser";
import DOMPurify from "dompurify";
import Footer from "./Footer.jsx";
import { useLocation } from "react-router-dom";

function Home() {
  const data = useSelector((state) => state.db);
  console.log(data.email);
  const [blogs, setBlogs] = useState([]);
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const parser = new EditorJsParser();

  useEffect(() => {
    HomeBlogs(data.email,dispatch)
      .then((blogs) => {
        setBlogs(blogs);
      })
      .catch((error) => {
        console.log("Error fetching blogs",error);
      });
  }, []);

  console.log("Blogs:", blogs);

  const formatDate = (dateString) => {
    const date = format(new Date(dateString), "dd MMMM yyyy");
    return date;
  };
  const handleParseDiv = (blog) => {
    console.log("Inside filter:",blog)
    const image = blog.blocks.filter((element) => element.type === "image");
    const header = blog.blocks.filter((element) => element.type === "header");
    const first_image = image[0];
    const first_header = header[0];
    const time = blogs.time;
    const parsedContent = parser.parse({ blocks: [first_image, first_header] });
    const finalHTML = DOMPurify.sanitize(parsedContent);
    return finalHTML;
  };
  const displayContent = (blog) => {
    const blogs = blog;
    const time = blog.blog.time;
    console.log("Times are here:",time)
    console.log("Blogs here:",blogs)
    const parsedContent = parser.parse({ blocks: blogs.blog.blocks });
    const finalHTML = DOMPurify.sanitize(parsedContent);
    navigate("/read", {
      state: { html: finalHTML, times: time,email:blog.blog.author,blogID:blog.blog.id},
    });
  };
  // Parse the blogs into HTML
  let html = "";
  const handleParsing = (blogs) => {
    if (!blogs || blogs.length === 0) {
      return <h2>No Data To Display</h2>;
    }
    if (data.loading) {
      return <h2>Loading...</h2>;
    }

    if (blogs.length > 0) {
      if (data.loading === false) {
        return (
          <>
            <div className="blog-display">
              {blogs.map((blog) => (
                <div
                  className="blog-content"
                  onClick={() => displayContent({blog})}
                >
                  <div
                    key={blog.id}
                    style={{ width: "100%", gap: "10px" }}
                    className="content"
                    dangerouslySetInnerHTML={{ __html: handleParseDiv(blog) }}
                  />
                  <span>{formatDate(blog.time)}</span>
                </div>
              ))}
            </div>
          </>
        );
      }
    }
  };
  return (
    <div className="home-main-content">
      <div>{<NavBar />}</div>
      <div>{handleParsing(blogs)}</div>
      <div>
        <Footer />
      </div>
    </div>
  );
}
export default Home;
