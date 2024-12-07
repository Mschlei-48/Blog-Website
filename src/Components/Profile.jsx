import { useState, useEffect } from "react";
import NavBar from "./Navbar";
import "./profile.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { fetchProfile, updateProfile, uploadImage } from "../Redux/dataSlice.js";

function Profile() {
  const stateData = useSelector((state) => state.auth);
  const profileState = useSelector((state) => state.db);
  console.log(profileState);
  const dispatch = useDispatch();
  const [profilePic, setProfilePic] = useState("");

  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [bio, setBio] = useState("");

  const [imageFile,setImageFile]=useState(null)

  const handleFile=((event)=>{
    const file=event.target.files
    setImageFile(file)
    console.log("Selected File:",file)
  })
  const handleImageUpload=async(email,file)=>{
    if(file && email){
        try{
            const url=await uploadImage(file,email)
            alert("Image uploaded successfully")
        }
        catch(error){
            console.log(error)
        }
    }
  }

  useEffect(() => {
    // Note that to prevent getting a promise pending for asunc functions as an output
    // You must use .then and .catch when calling the function so that
    // it knows what to do once the promise is done or if there
    // is an error. You are basically telling it what to do after the prmise is
    // done loading, because if you dont,it will return the pending promise
    fetchProfile(stateData.email, dispatch);
  }, []);
  return (
    <div className="profile-main-content">
      {<NavBar />}
      <div className="profile-content">
        <h1 style={{ margin: "0" }}>Profile Information</h1>
        <div id="profile-picture-section">
          {profilePic === "" ? (
            <FontAwesomeIcon
              icon={faUser}
              style={{ width: "5%", height: "7%" }}
            />
          ) : (
            <img src={profilePic} alt="No image to display" />
          )}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "15px",
              justifyContent: "flex-start",
              alignItems: "flex-start",
            }}
          >
            <span>Your photo</span>
            <div style={{ position: "relative", display: "inline-block" }}>
              <span
                style={{
                  position: "absolute",
                  zIndex: "2",
                  whiteSpace: "nowrap",
                  border: "2px blue solid",
                  padding: "12px",
                  backgroundColor: "white",
                  borderRadius: "5px",
                  color: "blue",
                }}
              >
                Change Photo
              </span>
              <input
                type="file"
                accept="image/*"
                style={{ position: "absolute", zIndex: "1", opacity: "0",cursor:"pointer"}}
                onChange={(event)=>{handleFile(event);handleImageUpload(imageFile,profileState.email)}}
              ></input>
            </div>
          </div>
        </div>
        <div className="content">
          <div className="info-profile-content">
            <div style={{ textAlign: "start" }}>
              <label for="name">First Name</label>
              <br></br>
              <br></br>
              <input
                name="name"
                type="text"
                onChange={(event) => setFirstName(event.target.value)}
              ></input>
            </div>
            <div style={{ textAlign: "start" }}>
              <label for="last-name">Last Name</label>
              <br></br>
              <br></br>
              <input
                name="last-name"
                type="text"
                onChange={(event) => setLastName(event.target.value)}
              ></input>
            </div>
          </div>
          <div className="info-profile-content">
            <div style={{ textAlign: "start" }}>
              <label for="username">Username</label>
              <br></br>
              <br></br>
              <input
                name="username"
                type="text"
                value={profileState.username}
                readonly
              ></input>
            </div>
            <div style={{ textAlign: "start" }}>
              <label for="email">Email</label>
              <br></br>
              <br></br>
              <input
                name="email"
                type="email"
                value={profileState.email}
                readonly
              ></input>
            </div>
          </div>
          <div id="bio">
            <textarea
              onChange={(event) => setBio(event.target.value)}
            ></textarea>
          </div>
          <div id="save-profile-changes">
            <button
              onClick={() =>
                updateProfile(
                  profileState.email,
                  profileState.username,
                  firstName,
                  lastName,
                  bio
                )
              }
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
