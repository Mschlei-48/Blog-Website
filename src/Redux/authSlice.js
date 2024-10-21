import {createSlice} from '@reduxjs/toolkit'
import {createUserWithEmailAndPassword,signInWithEmailAndPassword,sendEmailVerification} from 'firebase/auth'
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
    .then(()=>{
        alert("User Created Sucessfully")
        dispatch(setUser({"email":email,"password":password,"username":username}))
        navigate('/')
    })
    .catch((error)=>{
        alert(error.message)
        dispatch(setError(error.message))
    })

}
export {registerUser};