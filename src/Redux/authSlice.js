import {createSlice} from '@reduxjs/toolkit'
import {createUserWithEmailAndPassword,signInWithEmailAndPassword,sendEmailVerification,onAuthStateChanged,sendPasswordResetEmail} from 'firebase/auth'
import {auth} from '../Firebase/config.js'
import {getDocs,collection,doc,addDoc,query,limit,where,updateDoc} from 'firebase/firestore'
import {db} from '../Firebase/config'
import { getDownloadURL,getStorage, uploadBytes } from 'firebase/storage'
import {setProfile} from './dataSlice.js'


const initialState={
    email:"",
    username:"",
    password:"",
    error:null,
    loading:false,
    loggedIn:false
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
            state.loggedIn=action.payload.loggedIn
        }
    }
})

export const {setLoading,setError,setUser}=authSlice.actions;
export default authSlice.reducer;

const googleLogin=async(email,name,dispatch,navigate)=>{
    const profiles=collection(db,"Profiles");
    const q=query(profiles,where("email","==",email));
    const results=await getDocs(q)
    if(results.empty){
        createProfile(email,name)
        dispatch(setUser({"email":email,"username":name}))
        dispatch(setProfile({"email":email,"username":name,"bio":""}))
    }
    else{
        dispatch(setUser({"email":email,"username":name}))
        dispatch(setProfile({"email":email,"username":name,"bio":""}))
    }
}

const registerUser=async (dispatch,email,password,username,navigate)=>{
    dispatch(setLoading())
    createUserWithEmailAndPassword(auth,email,password)
    .then((userCredential)=>{
        const user=userCredential.user;
        alert("User Created Sucessfully")
        dispatch(setUser({"email":email,"username":username}))
        navigate('/')
        createProfile(email,username)
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



const signInUser=async(dispatch,email,password)=>{
    dispatch(setLoading())
    signInWithEmailAndPassword(auth,email,password)
    .then((userCredential)=>{
        const user=userCredential.user
        if(user.emailVerified){
            alert("User signed in suceessfully")
            
            dispatch(setUser({"email":email,"loggedIn":true}))
            
        }
        else{
            auth.signOut()
            alert("Please verify your email before signing in")
        }

    })
    .catch((error)=>{
        dispatch(setError(error.message))
        if(error.message.includes("auth/invalid-email")){
            alert("Please enter valid email")
        }
        else if(error.message.includes("auth/invalid-credential")){
            alert("Incorrect email or password")
        }
        else if(error.message.includes("auth/missing-password")){
            alert("Please enter password")
        }
        // alert(error.message)
    })
}


const resetPassword=async(dispatch,email)=>{
    dispatch(setLoading())
    sendPasswordResetEmail(auth,email)
    .then(()=>{
        alert("Email for resetting password is sent!")
    })
    .catch((error)=>{
        dispatch(setError(error.message))
        alert(error.message)
    })
}

const createProfile = async (email, username) => {
    console.log(email, username);
    try {
        // Add a new document to the "Profiles" collection
        const profileRef = await addDoc(collection(db, "Profiles"), {
            email: email,
            username: username,
            // firstName: "",
            // lastName: "",
            bio: ""
        });

        // Create a "Blogs" collection for the newly added profile
        const blogsCollectionRef = collection(profileRef, "Blogs");
        const blogDocRef=await addDoc(blogsCollectionRef, {
            title: "Welcome Blog",
            content: "This is your first blog! Edit or delete it to get started.",
            createdAt: new Date(),
        });

        const likesCollectionRef = collection(db, "Profiles", profileRef.id, "Blogs", blogDocRef.id, "Likes");
        await addDoc(likesCollectionRef, {
            count: 0,
            names: ["Mishi Makade"]
        });

        const followersCollection=collection(profileRef,"Followers");
        await addDoc(followersCollection,{
            count:0,
            names:["Mishi Makade"]
        });
        console.log("Profile and Blogs collection created successfully");
    } catch (error) {
        console.log(error);
        alert(error);
    }
};



export {registerUser,signInUser,resetPassword,createProfile,googleLogin};
















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