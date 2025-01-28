import { useState, useEffect } from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signInUser } from "../Redux/authSlice.js";
import { GoogleLogin, googleLogout, useGoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import {googleLogin} from "../Redux/authSlice.js";

function Login() {
  const stateData = useSelector((state) => state.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  useEffect(() => {
    console.log(stateData);
    const navHomePage = () => {
      if (stateData.loggedIn === true) {
        navigate("/home");
      }
    };
    navHomePage();
  });
  const navigate = useNavigate();
  const navRegister = () => {
    return navigate("/register");
  };

  const handleLogin = (email) => {
    if (email === "") {
    }
  };

  const forgotPasswordNav = () => {
    return navigate("forgot-password");
  };

  // Google Login Setup

  return (
    <div className="login-main-container">
        <div className="login-form-container">
          <img
            src="../src/assets/file.png"
            alt="No Logo to Display"
            style={{ width: "30%" }}
          />
          <h2>Welcome Back!</h2>
          <p>Please enter your details to login.</p>
          <div id="google-login-container">
            <GoogleLogin
              onSuccess={(credentialResponse) => {
                const token=jwtDecode(credentialResponse.credential);
                googleLogin(token.email,token.name,dispatch).
                then(()=>{
                  navigate("/home");
                  alert("Successfully Logged In")
                }).
                catch((error)=>{
                  console.log("Error Logging In",error)
                })
              }}
              onError={() => alert("Logging in Failed")}
              id="google-login"
              auto_select={true}
            />
          </div>
          <br></br>
          {/* <hr>OR</hr> */}
          <div style={{width:"89%",display:"flex",justifyContent:"center",alignItems:"flex-start"}}>
          <hr style={{width:"43%",color:"rgb(192, 190, 190)"}}></hr>
          <span style={{color:"rgb(192, 190, 190)",paddingLeft:"1.5%",paddingRight:"1.5%"}}>OR</span>
          <hr style={{width:"43%",color:"rgb(210, 206, 206)"}}></hr>
          </div>
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
          <div id="forgot-password">
            <a onClick={() => forgotPasswordNav()}>Forgot password?</a>
          </div>
          <br></br>
          <button
            className="login-button"
            onClick={() => signInUser(dispatch, email, password)}
          >
            Log in
          </button>
          <div id="dont-have-account">
            <p>
              Don't have an account?{" "}
              <a onClick={() => navRegister()}>Register here</a>
            </p>
          </div>
        </div>
        <div className="logn-image-container">
          <img
            src="../src/assets/back-login.jpg"
            alt="No Image to Display"
            className="login-side-image"
          />
        </div>
    </div>
  );
}

export default Login;
