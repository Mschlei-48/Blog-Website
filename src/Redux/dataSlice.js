import {createSlice} from '@reduxjs/toolkit'
import {getDocs,collection,doc,addDoc,query,limit} from 'firebase/firestore'
import {db} from '../Firebase/config'

const initialState={
    blogs:[]
}

const dataSlice=createSlice({
    name:"data",
    initialState,
    reducers:{
        getData:(state,action)=>{
        state.blogs=action.payload
        } 
    }
})

export const {getData}=dataSlice.actions;
export default dataSlice.reducer;

export const getBlogs=async(dispatch)=>{
    try{
       const querySnapShot=await getDocs(
        query(
            collection(db,"Medium-Blogs"),
            limit(3000)
        )
        );

       const data=querySnapShot.docs.map((doc)=>(
        {id:doc.id,
            ...doc.data()
        }
        
    ))
    dispatch(getData(data))
    }

    catch(error){
        alert(error.message)
    }
}