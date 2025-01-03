import {createSlice} from '@reduxjs/toolkit'
import {getDocs,collection,doc,addDoc,query,limit,where,updateDoc} from 'firebase/firestore'
import {db} from '../Firebase/config'
import {storage} from '../Firebase/config'
import { ref } from 'firebase/storage'
import { getDownloadURL,getStorage, uploadBytes } from 'firebase/storage'

const initialState={
    blogs:[],
    error:null,
    loading:false,
    username:"",
    FirstName:"",
    LastName:"",
    email:"",
    bio:""
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
        },
        setProfile:(state,action)=>{
            state.username=action.payload.username,
            state.FirstName=action.payload.FirstName,
            state.LastName=action.payload.LastName,
            state.email=action.payload.email,
            state.bio=action.payload.bio
        }
    }
})

export const {getData,setError,setLoading,setProfile}=dataSlice.actions;
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
    catch(error){
        console.log(error.message)
        return null
    }
}

export const fetchProfile=async(email,dispatch)=>{
    const profileCollection=collection(db,"Profiles")
    try{
        const q=query(profileCollection,where("email","==",email));
        const querySnapShot=await getDocs(q)

        const profileData=[];
        querySnapShot.forEach((doc)=>{
            profileData.push({...doc.data()})
        });
        // console.log("Profile Data:",profileData)
        dispatch(setProfile({username:profileData[0].username,
            FirstName:profileData[0].firstName,
            LastName:profileData[0].lastName,
            email:profileData[0].email,
            bio:profileData[0].bio}))
        return profileData;
    }
    catch(error){
        console.log(error)
    }
}

export const updateProfile = async (email, username, firstName, lastName, bio) => {
    const profilesCollection = collection(db, "Profiles");
    const q = query(profilesCollection, where("email", "==", email));
    
    try {
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        // Assuming only one document matches
        const docId = querySnapshot.docs[0].id;
        const profileRef = doc(db, "Profiles", docId);
        
        // Update the document
        await updateDoc(profileRef, {
          email: email,
          username: username,
          firstName: firstName,
          lastName: lastName,
          bio: bio,
        });
        alert("Profile updated successfully");
      } else {
        alert("No profile found for the given email.");
      }
    } catch (error) {
      alert(`Error updating profile: ${error.message}`);
    }
  };
  

//   export const uploadImage = async (file, email) => {
//     if (!file || !email) {
//       throw new Error("File and email are required for uploading an image.");
//     }
  
//     try {
//       // Initialize Firebase Storage
//       const storage = getStorage();
  
//       // Create a storage reference using the email as the ID
//       const storageRef = ref(storage, `Profile-Pictures/${email}`);
  
//       // Upload the file to Firebase Storage
//       const snapshot = await uploadBytes(storageRef, file);
//       console.log("Image uploaded successfully:", snapshot.metadata.fullPath);
  
//       // Get the download URL of the uploaded image
//       const downloadURL = await getDownloadURL(storageRef);
//       console.log("Image download URL:", downloadURL);
  
//       // Return the URL for further use
//       return downloadURL;
//     } catch (error) {
//       console.error("Error uploading image:", error.message);
//       throw error;
//     }
//   };

export const uploadImage = async (file, email) => {
    if (!file || !email) {
      throw new Error("File and email are required for uploading an image.");
    }
  
    try {
      // Initialize Firebase Storage
      const storage = getStorage();
  
      // Create a storage reference using the email as the ID
      const storageRef = ref(storage, `profileImages/${email}`);
  
      // Upload the file to Firebase Storage
      const snapshot = await uploadBytes(storageRef, file);
  
      console.log("Image uploaded successfully:", snapshot.metadata.fullPath);
  
      // Get the download URL of the uploaded image
      const downloadURL = await getDownloadURL(storageRef);
      console.log("Image download URL:", downloadURL);
  
      return downloadURL; // Return the URL for further use
    } catch (error) {
      console.error("Error uploading image:", error.message);
      throw error;
    }
  };