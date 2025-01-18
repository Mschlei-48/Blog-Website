import { useState, useEffect } from "react";
import NavBar from "./Navbar";
import "./profile.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchProfile,
  updateProfile,
  uploadImage,
  getProfilePicture,
} from "../Redux/dataSlice.js";

// We can upload the image to the storage
// We have to do:
// Upload the url to the database if it is not there
// Fetch the url from the databse if it there already

function Profile() {
  const profileState = useSelector((state) => state.db);
  const authState = useSelector((state) => state.auth);
  console.log(profileState);
  const dispatch = useDispatch();
  const [profilePic, setProfilePic] = useState("");

  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [bio, setBio] = useState("");

  const [selectedFile, setSelectedFile] = useState(null);

  const [edit, setEdit] = useState(false);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  const handleUpload = async () => {
    if (selectedFile) {
      try {
        const downloadURL = await uploadImage(selectedFile, profileState.email); // Replace with actual email
        console.log("Image uploaded successfully:", downloadURL);
        // Use the downloadURL for further processing, e.g., updating user profile
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  useEffect(() => {
    // Note that to prevent getting a promise pending for asunc functions as an output
    // You must use .then and .catch when calling the function so that
    // it knows what to do once the promise is done or if there
    // is an error. You are basically telling it what to do after the prmise is
    // done loading, because if you dont,it will return the pending promise
    fetchProfile(authState.email, dispatch);
    // Fetch the profile picture of the person logged in
    getProfilePicture(profileState.email)
      .then((url) => {
        if (url) {
          console.log("Profile Picture url is:", url);
          setProfilePic(url);
        } else {
          console.log("Url does not exist");
        }
      })
      .catch((error) =>
        console.error("error checking for profile picture:", error)
      );
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
            <img
              src={profilePic}
              alt="No image to display"
              style={{ height: "110px", width: "110px", borderRadius: "50%" }}
            />
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
            <span
              style={{
                whiteSpace: "nowrap",
                border: "2px blue solid",
                padding: "12px",
                backgroundColor: "white",
                borderRadius: "5px",
                color: "blue",
              }}
              onClick={() => handleUpload()}
            >
              Save Photo
            </span>
            <input
              type="file"
              accept="image/*"
              style={{ opacity: "1", cursor: "pointer" }}
              onChange={handleFileChange}
            ></input>
          </div>
        </div>
        <div className="content">
          {edit === true ? (
            <>
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
                  onClick={() =>{
                    updateProfile(
                      profileState.email,
                      profileState.username,
                      firstName,
                      lastName,
                      bio
                    );setEdit(false)}
                  }
                >
                  Save
                </button>
              </div>
            </>
          ) : (
            <>
              <div style={{display:"flex",flexDirection:"row",gap:"85px"}}>
                <div style={{textAlign:"start"}}>
                  <h3>First Name:</h3>
                  <p>{profileState.FirstName}</p>
                  <h3>Username:</h3>
                  <p>{profileState.username}</p>
                  <h4>Bio:</h4>
                  <p>{profileState.bio}</p>
                </div>
                <div style={{textAlign:"start"}}>
                  <h3>Last Name:</h3>
                  <p>{profileState.LastName}</p>
                  <h3>Email Address:</h3>
                  <p>{profileState.email}</p>
                </div>
              </div>
              {/* <div style={{width:"100%",display:"flex",justifyContent:"center",alignItems:"center"}}>

              </div> */}
              <div id="edit-profile-content" style={{width:"100%",display:"flex",justifyContent:"center",alignItems:"center"}}>
                <button onClick={()=>setEdit(true)}>Edit</button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
