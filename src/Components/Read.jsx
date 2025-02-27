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
  faHeart,
  faComment,
  faShareFromSquare,
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
import { fetchBlogs, isFollowing } from "../Redux/dataSlice.js";
import { db } from "../Firebase/config.js";
import { Follow } from "../Redux/dataSlice.js";
import { fetchProfileRead } from "../Redux/dataSlice.js";
import EditorJsParser from "editorjs-parser";
import DOMPurify from "dompurify";
import Footer from "./Footer.jsx";
import { useLocation } from "react-router-dom";
import "./read.css";
import {
  fetchProfile,
  updateProfile,
  uploadImage,
  getProfilePicture,
  Like,
  fetchLikesData,
  fetchComments,
} from "../Redux/dataSlice.js";

function Read() {
  // Next Stets
  // Make the Blog display nicely
  // Add floow buttom
  // Add a share button
  // Add comments and likes button
  // Ensure taht when a person follows you they can see your posts on their timeline
  const location = useLocation();
  const [profilePic, setProfilePic] = useState("");
  const [username, setUsername] = useState("");
  const [commentsUser, setCommentsUser] = useState("");
  const dispatch = useDispatch();
  const [Follows, setFollows] = useState(false);

  const data = useSelector((state) => state.db);
  console.log("Data:", data);
  console.log("State is:", location.state);

  const formatDate = (dateString) => {
    const date = format(new Date(dateString), "dd MMMM yyyy");
    return date;
  };
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  useEffect(() => {
    fetchProfileRead(location.state.email, dispatch)
      .then((name) => {
        setUsername(name);
        return name;
      })
      .catch((error) => {
        console.log("Error getting the username:", error);
      });
  });

  useEffect(() => {
    isFollowing(location.state.email, data.email)
      .then((isFollow) => {
        setFollows(isFollow);
      })
      .catch((error) => {
        console.log("Error checking following:", error);
      });
  });

  useEffect(() => {
    getProfilePicture(location.state.email)
      .then((url) => {
        if (url) {
          setProfilePic(url);
        } else {
          console.log("Url does not exist");
        }
      })
      .catch((error) =>
        console.error("error checking for profile picture:", error)
      );
  }, []);

  const CommentProfile = ({ email }) => {
    const [profilePic, setProfilePic] = useState(null);

    useEffect(() => {
      const fetchProfilePic = async () => {
        try {
          const url = await getProfilePicture(email); // Fetch the profile picture
          setProfilePic(url || "https://via.placeholder.com/50"); // Set default image if no URL found
        } catch (error) {
          console.error("Error fetching profile picture:", error);
        }
      };

      fetchProfilePic();
    }, [email]);

    return (
      <img
        src={profilePic}
        alt="Profile"
        style={{
          width: "40px",
          height: "40px",
          objectFit: "cover",
          borderRadius: "50%",
        }}
      />
    );
  };
  const CommentUsername = ({ email }) => {
    const [Username, setUsername] = useState("");

    useEffect(() => {
      const fetcUsername = async () => {
        try {
          const username = await fetchProfileRead(email); // Fetch the profile picture
          setUsername(username); // Set default image if no URL found
        } catch (error) {
          console.error("Error fetching profile username:", error);
        }
      };
      fetcUsername();
    }, [email]);

    return (
      <p
        style={{
          width: "100%",
          height: "20px",
          margin: "0",
          textAlign: "start",
        }}
      >
        {Username}
      </p>
    );
  };

  const formatCommentDate = (timestamp) => {
    const date = new Date(timestamp.seconds * 1000); // Convert seconds to milliseconds
    return format(date, "dd MMMM yyyy"); // Format to "23 February 2025"
  };

  const CommentsSection = (comments) => {
    return (
      <div         style={{
        width: "50%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "start",
        alignItems: "flex-start",
        gap: "0",
      }}>
         {comments.map((comment) => (
      <>
      <div
        style={{
          width: "50%",
          height:"50px",
          display: "flex",
          flexDirection: "row",
          justifyContent: "start",
          alignItems: "flex-start",
          gap: "0",
        }}
      >
            <div
              key={comment.email}
              style={{ width: "100px", height: "50px" }}
            >
              <CommentProfile email={comment.email} />
            </div>
            <div
              style={{
                width: "100px",
                height: "100px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "start",
                alignItems: "flex-start",
              }}
            >
              <div>
                <CommentUsername email={comment.email} />
              </div>
              <div style={{ width: "150px", height: "20px" }}>
                <p style={{ margin: "0", textAlign: "start" }}>
                  {formatCommentDate(comment.timestamp)}
                </p>
              </div>
            </div>
      </div>
      <div style={{width:"100%",textAlign:"start"}}>
      <p style={{marginLeft:"4%",textAlign:"start"}}>{comment.comment}</p>
    </div>
    </>
      ))}
      </div>
    );
  };

  const handleFollow = () => {
    Follow(data.email, location.state.email, data.username)
      .then(() => {
        alert(`Successfully followed ${data.username}`);
      })
      .catch(() => {
        console.log("Error following user", error);
      });
  };

  const handleLike = () => {
    Like(location.state.email, location.state.blogID, data.email, data.username)
      .then(() => {
        alert(`${data.username} Successfully Likes Blog`);
      })
      .catch((error) => {
        alert("Error Liking Blog");
      });
  };
  const [likesCount, setLikesCount] = useState(0);

  useEffect(() => {
    fetchLikesData(location.state.email, location.state.blogID)
      .then((likesData) => {
        setLikesCount(likesData.count);
      })
      .catch((error) => {
        console.log("Error fetching likes count", error);
      });
  }, []);

  const [comments, setComments] = useState([]);
  useEffect(() => {
    fetchComments(location.state.email, location.state.blogID)
      .then((comments) => {
        console.log("Comments:", comments);
        setComments([...comments]);
      })
      .catch((error) => {
        console.log("Error fetching comments", error);
      });
  }, []);

  console.log(
    "Testing",
    comments.map((comment) => comment.email)
  );

  return (
    <div className="read-main-content">
      <NavBar />
      <div>
        <hr></hr>
      </div>
      <br></br>
      <br></br>
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "start",
          textAlign: "start",
          gap: "0%",
        }}
      >
        <div style={{ width: "8%" }}>
          <img
            src={profilePic}
            alt="No Image to Display"
            style={{
              width: "80px",
              height: "80px",
              objectFit: "cover",
              borderRadius: "50%",
            }}
          />
        </div>
        <div style={{ width: "10%", marginTop: "1.5%" }}>
          <h3 style={{ margin: "0" }}>{username}</h3>
          <p style={{ marginTop: "5%", color: "grey" }}>5 mins read</p>
        </div>
        <div
          style={{
            width: "10%",
            textAlign: "start",
            marginTop: "1.6%",
            marginLeft: "1.5%",
          }}
        >
          {Follows ? (
            <p
              style={{ margin: "0", color: "grey", cursor: "pointer" }}
              onClick={() => handleFollow()}
            >
              Following
            </p>
          ) : (
            <p
              style={{ margin: "0", color: "grey", cursor: "pointer" }}
              onClick={() => handleFollow()}
            >
              Follow
            </p>
          )}

          <p style={{ marginTop: "7.5%", color: "grey" }}>
            {formatDate(location.state.times)}
          </p>
        </div>
      </div>
      <br></br>
      <br></br>
      <div
        className="actions"
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div style={{ width: "55%" }}>
          <hr></hr>
        </div>
        <div style={{ display: "flex", flexDirection: "row", gap: "25px" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              gap: "3px",
            }}
          >
            <FontAwesomeIcon
              icon={faHeart}
              className="icon"
              onClick={() => handleLike()}
            />
            <p className="count">{likesCount}</p>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              gap: "3px",
            }}
          >
            <FontAwesomeIcon icon={faComment} className="icon" />
            <p className="count">0</p>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <FontAwesomeIcon icon={faShareFromSquare} className="icon" />
          </div>
        </div>
        <div style={{ width: "55%" }}>
          <hr></hr>
        </div>
      </div>
      <div className="read-content">
        <div
          className="read-html"
          dangerouslySetInnerHTML={{ __html: location.state.html }}
          style={{ width: "50%", height: "50%" }}
        />
      </div>
      <div>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
      </div>
      <div style={{ width: "100%" }}>
        <hr style={{ width: "55%" }}></hr>
      </div>
      <div
        style={{
          width: "100%",
          position: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div>
          <textarea
            placeholder="What is on your mind?"
            style={{
              width: "52%",
              paddingBottom: "5%",
              paddingLeft: "2%",
              border: "none",
              outline: "none",
            }}
          ></textarea>
        </div>
      </div>
      <div
        style={{
          width: "100%",
          height: "500px",
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          marginTop: "3%",
        }}
      >
        {CommentsSection(comments)}
      </div>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <div>
        <hr></hr>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default Read;
