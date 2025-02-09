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
    email:"",
    bio:"",
}

const dataSlice=createSlice({
    name:"data",
    initialState,
    reducers:{
        getData:(state,action)=>{
        state.blogs=action.payload
        state.loading=false
        state.error=null
        },
        stopLoading:(state,action)=>{
            state.loading=false;
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
            state.email=action.payload.email,
            state.bio=action.payload.bio
        }
    }
})

export const {getData,setError,setLoading,setProfile,stopLoading}=dataSlice.actions;
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
      const storageRef = ref(storage, `Profile-Pictures/${email}`);
  
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

  export const getProfilePicture=async(email)=>{
    const storage=getStorage();
    const fileRef=ref(storage,`Profile-Pictures/${email}`)
    try{
        const downloadURL=await getDownloadURL(fileRef);
        return downloadURL;
    }
    catch(error){
        if(error.code==="storage/object-not-found"){
            return null
        }
        else{
            console.log(error)
        }
            
    }
  }


export const pushBlogs=async(email,blogs)=>{
    console.log("Email:",email)
    const profilesCollection = collection(db, "Profiles");
    const q = query(profilesCollection, where("email", "==", email));
    const querySnapshot = await getDocs(q);
    const docId = querySnapshot.docs[0].id;
    
    // console.log(docId)
    try{
        const subcollectionRef=collection(db,"Profiles",docId,"Blogs")
        const docR4ef=await addDoc(subcollectionRef,blogs)
         console.log("Blog addedd successfully")
    }
    catch(error){ 
      console.error("Error adding the blog:",error)    
    }
}

export const fetchBlogs=async(dispatch,email)=>{
    dispatch(setLoading())
    try{
    // Get the ID of the user profile by querying the firestore using the email
    const profilesCollection = collection(db, "Profiles");
    const q = query(profilesCollection, where("email", "==", email));
    const querySnapshot = await getDocs(q);

    if(querySnapshot.empty){
        console.log("No matching document found for the email:",email)
        return [];
    }

    const docId=querySnapshot.docs[0].id
    
    // Fetch the blogs using the ID obtained above
    const blogsSubcollectionRef=collection(db,"Profiles",docId,"Blogs");
    const blogsSnapshot=await getDocs(blogsSubcollectionRef);
    const blogs=blogsSnapshot.docs.map((doc)=>({
        id:doc.id,
        ...doc.data(),
    }))
    console.log("Blogs fetched successfully",blogs.slice(1))
    dispatch(stopLoading())
    if(blogs.length>1){
        dispatch(getData(blogs.slice(1)))
    }
    else{
        dispatch(stopLoading())
    }
    
    return blogs.slice(1)
    }
    catch(error){
        console.log("Error fetching blogs:",error)
        return [];
    }



}
    