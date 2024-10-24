import {createSlice} from '@reduxjs/toolkit'
import {createUserWithEmailAndPassword,signInWithEmailAndPassword,sendEmailVerification,onAuthStateChanged,sendPasswordResetEmail} from 'firebase/auth'
import {auth} from '../Firebase/config.js'


const initialState={
    email:"",
    username:"",
    password:"",
    error:null,
    loading:false
}

const authSlice=createSlice({
    name:"authentication",
    initialState,
    reducers:{
        setLoading(state,action){
            state.loading=true,
            state.error=null
        },
        setError(state,action){
            state.loading=false,
            state.error=action.payload.error
        },
        setUser(state,action){
            state.email=action.payload.email,
            state.password=action.payload.password,
            state.username=action.payload.username
        }
    }
})

export const {setLoading,setError,setUser}=authSlice.actions;
export default authSlice.reducer;

const registerUser=async (dispatch,email,password,username,navigate)=>{
    dispatch(setLoading())
    createUserWithEmailAndPassword(auth,email,password)
    .then((userCredential)=>{
        const user=userCredential.user;
        alert("User Created Sucessfully")
        dispatch(setUser({"email":email,"password":password,"username":username}))
        navigate('/')
        // Send email verification
        sendEmailVerification(user)
        .then(()=>{
            alert("Email verification sent, please check your email to verify")
        })
        .catch((error)=>{
            alert.error("Error sending verification email:",error);
        });
    })
    .catch((error)=>{
        if(error.message.includes("email-already-in-use")){
            alert("Email already in use")
        }
        else if(error.message.includes("invalid-email")){
            alert("Invalid email,enter valid email")
        }
        else if(error.message.includes("Password should be at least 6 characters (auth/weak-password)")){
            alert("Password should be at least 6 characters")
        }
        alert(error.message)
        
        dispatch(setError(error.message))
    })

}



const signInUser=((dispatch,email,password,username,navigate)=>{
    dispatch(setLoading())
    signInWithEmailAndPassword(auth,email,password)
    .then((userCredential)=>{
        const user=userCredential.user
        if(user.emailVerified){
            alert("User signed in suceessfully")
            dispatch(setUser({"email":email,"password":password}))
        }
        else{
            auth.signOut()
            alert("Please verify your email before signing in")
        }

    })
    .catch((error)=>{
        dispatch(setError(error.message))
        alert(error.message)
    })
})


const resetPassword=((dispatch,email)=>{
    dispatch(setLoading())
    sendPasswordResetEmail(auth,email)
    .then(()=>{
        alert("Email for resetting password is sent!")
    })
    .catch((error)=>{
        dispatch(setError(error.message))
        alert(error.message)
    })
})


export {registerUser,signInUser};
















// import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, onAuthStateChanged } from "firebase/auth";

// // Create a new user
// const auth = getAuth();
// createUserWithEmailAndPassword(auth, email, password)
//   .then((userCredential) => {
//     const user = userCredential.user;
//     console.log("User created:", user);
//     sendEmailVerification(user)
//       .then(() => {
//         console.log("Verification email sent");
//       })
//       .catch((error) => {
//         console.error("Error sending verification email:", error);
//       });
//   })
//   .catch((error) => {
//     console.error("Error creating user:", error);
//   });
// onAuthStateChanged(auth, (user) => {
//   if (user) {
//     if (user.emailVerified) {
//       // Access protected features
//     } else {
//       // Email verification is pending
//     }
//   } else {
//     // User is signed out
//   }
// });