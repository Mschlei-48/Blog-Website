import { useState, useEffect } from "react";
import "./register.css";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../Redux/authSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { GoogleLogin, googleLogout, useGoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { googleLogin } from "../Redux/authSlice.js";

function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const dispatch = useDispatch();
  const { Email, Username, Password, error, loading } = useSelector(
    (state) => state.auth
  );

  const navLogin = () => {
    return navigate("/login");
  };
  const handleRegister = () => {
    registerUser(dispatch, email, password, username, navigate);
  };
  return (
    <div className="register-main-container">
      <div className="register-form-container">
        <img
          src="../src/assets/file.png"
          alt="No Logo to Display"
          style={{ width: "25%"}}
        />
        <h2>Create your account!</h2>
        <p>Please enter your details below to register.</p>
        <div id="google-register-container">
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              const token = jwtDecode(credentialResponse.credential);
              googleLogin(token.email, token.name, dispatch)
                .then(() => {
                  navigate("/home");
                  alert("Successfully Logged In");
                })
                .catch((error) => {
                  console.log("Error Logging In", error);
                });
            }}
            onError={() => alert("Logging in Failed")}
            id="google-register"
            auto_select={true}
          />
        </div>
        <br></br>
        <div style={{width:"92%",display:"flex",justifyContent:"center",alignItems:"flex-start"}}>
          <hr style={{width:"45.5%",color:"rgb(192, 190, 190)"}}></hr>
          <span style={{color:"rgb(192, 190, 190)"}}>OR</span>
          <hr style={{width:"41%",color:"rgb(192, 190, 190)"}}></hr>
          </div>
          <br></br>
        {/* <label for="username">
          Username<label style={{ color: "red" }}> *</label>
        </label> */}
        <br></br>
        <input
          type="username"
          name="username"
          placeholder="Enter Username"
          required
          onChange={(event) => setUsername(event.target.value)}
        ></input>
        <br></br>
        {/* <label for="email">
          Email<label style={{ color: "red" }}> *</label>
        </label> */}
        <br></br>
        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          required
          onChange={(event) => setEmail(event.target.value)}
        ></input>
        <br></br>
        {/* <label for="password">
          Password<label style={{ color: "red" }}> *</label>
        </label> */}
        <br></br>
        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          required
          onChange={(event) => setPassword(event.target.value)}
        ></input>
        <br></br>
        <button className="register-button" onClick={() => handleRegister()}>
          Register
        </button>
        <div style={{width:"100%",display:"flex",justifyContent:"flex-start",alignItems:"flex-start"}}>
        <p>
          Already have an account? <a onClick={() => navLogin()}>Login here</a>
        </p>
        </div>

      </div>
      <div className="register-image-container">
        <img
          src="../src/assets/back-login.jpg"
          alt="No Image to Display"
          className="register-side-image"
        />
      </div>
    </div>
  );
}
export default Register;
