import {createSlice} from '@reduxjs/toolkit'
import {getDocs,collection,doc,addDoc,query,limit} from 'firebase/firestore'
import {db} from '../Firebase/config'
import {storage} from '../Firebase/config'
import { ref } from 'firebase/storage'
import { getDownloadURL } from 'firebase/storage'

const initialState={
    blogs:[],
    error:null,
    loading:false
}

const dataSlice=createSlice({
    name:"data",
    initialState,
    reducers:{
        getData:(state,action)=>{
        state.blogs=action.payload
        },
        setError:(state,action)=>{
            state.error=action.payload
            state.loading=false
        },
        setLoading:(state,action)=>{
            state.loading=true
            state.error=null
        }
    }
})

export const {getData,setError,setLoading}=dataSlice.actions;
export default dataSlice.reducer;


export const getBlogs=async(dispatch)=>{
    dispatch(setLoading())
    try{
       const querySnapShot=await getDocs(
        query(
            collection(db,"Medium-Blogs"),
            limit(50)
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
        // alert(error.message)
        console.log(error.message)
        dispatch(setError(error.message))
    }
}

export const getImage=async(imageName)=>{
    try{
        const imageRef=ref(storage,`Images/${imageName}`)
        const url=await getDownloadURL(imageRef);
        console.log("Image URL:",url)
        return url
    }
    // const storageRef=storage.ref();
    

    // imageRef.getDownloadURL()
    // .then((url)=>{
    //     console.log("Image URL:",url)
    // })
    catch(error){
        console.log(error.message)
        return null
    }
}
