import {createSlice} from '@reduxjs/toolkit'
import {getDocs,collection,doc,addDoc,query,limit,where,updateDoc,increment,arrayUnion,getDoc} from 'firebase/firestore'
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
        setLoading:(state)=>{
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

export const fetchProfileRead=async(email,dispatch)=>{
    const profileCollection=collection(db,"Profiles")
    try{
        const q=query(profileCollection,where("email","==",email));
        const querySnapShot=await getDocs(q)

        const profileData=[];
        querySnapShot.forEach((doc)=>{
            profileData.push({...doc.data()})
        });
        // console.log("Profile Data:",profileData)
        // dispatch(setProfile({username:profileData[0].username,
        //     email:profileData[0].email,
        //     bio:profileData[0].bio}))
        return profileData[0].username;
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


// export const pushBlogs=async(email,blogs)=>{
//     console.log("Email:",email)
//     const profilesCollection = collection(db, "Profiles");
//     const q = query(profilesCollection, where("email", "==", email));
//     const querySnapshot = await getDocs(q);
//     const docId = querySnapshot.docs[0].id;
    
//     // console.log(docId)
//     try{
//         const subcollectionRef=collection(db,"Profiles",docId,"Blogs")
//         const docR4ef=await addDoc(subcollectionRef,blogs)
//          console.log("Blog addedd successfully")
//     }
//     catch(error){ 
//       console.error("Error adding the blog:",error)    
//     }
// }
export const pushBlogs = async (email, blogs) => {
    console.log("Email:", email);

    // Get the Profiles collection reference
    const profilesCollection = collection(db, "Profiles");
    
    // Query to find the profile document that matches the email
    const q = query(profilesCollection, where("email", "==", email));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
        console.error("No profile found for this email.");
        return;
    }

    const profileRef = querySnapshot.docs[0]; // Get the first matching profile
    const docId = profileRef.id; // Get the profile document ID

    try {
        // Reference to the Blogs subcollection inside the user's profile
        const subcollectionRef = collection(db, "Profiles", docId, "Blogs");
        
        // Add the new blog document
        const blogDocRef = await addDoc(subcollectionRef, blogs);
        console.log("Blog added successfully!");

        // Create a Likes subcollection for the blog
        const likesCollectionRef = collection(db, "Profiles", docId, "Blogs", blogDocRef.id, "Likes");

        // Add an initial likes document with default values
        await addDoc(likesCollectionRef, {
            count: 0,
            names: ["Mishi Makade"]
        });

        console.log("Likes subcollection initialized for the blog!");
    } catch (error) {
        console.error("Error adding the blog:", error);
    }
};

export const fetchLikesData = async (email, blogId) => {
    console.log("Fetching likes for blog:", blogId);

    // Get the Profiles collection reference
    const profilesCollection = collection(db, "Profiles");
    
    // Query to find the profile document that matches the email
    const q = query(profilesCollection, where("email", "==", email));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
        console.error("No profile found for this email.");
        return;
    }

    const profileRef = querySnapshot.docs[0]; // Get the first matching profile
    const docId = profileRef.id; // Get the profile document ID

    try {
        // Reference to the Likes subcollection inside the specific blog
        const likesCollectionRef = collection(db, "Profiles", docId, "Blogs", blogId, "Likes");

        // Get the Likes document (assuming there is only one document)
        const likesSnapshot = await getDocs(likesCollectionRef);

        if (likesSnapshot.empty) {
            console.log("No likes data found for this blog.");
            return { count: 0, names: [] };
        }

        const likesData = likesSnapshot.docs[0].data(); // Get the first document's data
        console.log("Likes Data:", likesData);

        return likesData; // Returns { count: 0, names: ["Mishi Makade"] }
    } catch (error) {
        console.error("Error fetching likes data:", error);
        return { count: 0, names: [] };
    }
};

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
    console.log("Blogs fetched successfully",blogs)
    dispatch(stopLoading())
    if(blogs.length>1){
        // dispatch(getData(blogs.slice(1)))
        dispatch(getData(blogs))

    }
    else{
        dispatch(getData(blogs)) //Introduced this new line
        dispatch(stopLoading())
    }
    
    // return blogs.slice(1)
    return blogs
    }
    catch(error){
        console.log("Error fetching blogs:",error)
        return [];
    }
}


export const Follow = async (followerEmail,email,userName) => {
    const profilesCollection = collection(db, "Profiles");
    const profileQuery = query(profilesCollection, where("email", "==", email));
    const profileSnapshot = await getDocs(profileQuery);

    if (profileSnapshot.empty) {
        console.log("No user with that email exists");
        return;
    }

    const docId = profileSnapshot.docs[0].id; // Profile ID

    try {
        // Get the "Followers" subcollection
        const followersCollectionRef = collection(db, "Profiles", docId, "Followers");
        const followersSnapshot = await getDocs(followersCollectionRef);

        if (followersSnapshot.empty) {
            console.error("No followers document exists.");
            return;
        }

        // Get the ID of the single document inside "Followers"
        const followerDocId = followersSnapshot.docs[0].id;
        const followerDocRef = doc(db, "Profiles", docId, "Followers", followerDocId);

        // Update the document (increment count & add new follower)
        await updateDoc(followerDocRef, {
            count: increment(1),
            followers: arrayUnion({ email: followerEmail, username: userName })
        });

        alert(`${followerEmail} is now following ${email}`);
    } catch (error) {
        console.error(`Error following user ${email}`, error);
    }
};
export const Like = async (profileEmail, blogId, likerEmail, likerUsername) => {
    // Step 1: Find the profile ID based on the email
    const profilesCollection = collection(db, "Profiles");
    const profileQuery = query(profilesCollection, where("email", "==", profileEmail));
    const profileSnapshot = await getDocs(profileQuery);

    if (profileSnapshot.empty) {
        console.log("No user with that email exists");
        return;
    }

    const profileId = profileSnapshot.docs[0].id; // Profile ID

    try {
        // Step 2: Get the "Likes" subcollection of the specific blog
        const likesCollectionRef = collection(db, "Profiles", profileId, "Blogs", blogId, "Likes");
        const likesSnapshot = await getDocs(likesCollectionRef);

        if (likesSnapshot.empty) {
            console.error("No likes document exists.");
            return;
        }

        // Step 3: Get the ID of the single document inside "Likes"
        const likesDocId = likesSnapshot.docs[0].id;
        const likesDocRef = doc(db, "Profiles", profileId, "Blogs", blogId, "Likes", likesDocId);

        // Step 4: Update the document (increment count & add new liker)
        await updateDoc(likesDocRef, {
            count: increment(1),
            names: arrayUnion({ email: likerEmail, username: likerUsername })
        });

        alert(`${likerUsername} liked this blog!`);
    } catch (error) {
        console.error(`Error liking blog ${blogId}`, error);
    }
};

export const isFollowing = async (email, followerEmail) => {
    const profilesCollection = collection(db, "Profiles");
    const profileQuery = query(profilesCollection, where("email", "==", email));
    const profileSnapshot = await getDocs(profileQuery);


    const docId = profileSnapshot.docs[0].id; // Profile ID

    try {
        // Get the "Followers" subcollection
        const followersCollectionRef = collection(db, "Profiles", docId, "Followers");
        const followersSnapshot = await getDocs(followersCollectionRef);

        if (followersSnapshot.empty) {
            console.error("No followers document exists.");
            return false;
        }

        // Get the ID of the single document inside "Followers"
        const followerDocId = followersSnapshot.docs[0].id;
        const followerDocRef = doc(db, "Profiles", docId, "Followers", followerDocId);

        // Get the document data
        const followerDoc = await getDoc(followerDocRef);
        // if (!followerDoc.exists()) {
        //     console.log("Followers document does not exist");
        //     return false;
        // }

        const followersList = followerDoc.data().followers || [];

        // Check if the email exists in the followers array
        return followersList.some(follower => follower.email === followerEmail);

    } catch (error) {
        console.error(`Error checking follow status for ${email}`, error);
        return false;
    }
};

export const HomeBlogs=async(userEmail,dispatch)=>{
    dispatch(setLoading())
    try{
        const profilesCollection=collection(db,"Profiles")
        const profileQuery=query(profilesCollection,where("email","!==",userEmail))
        const profilesSnapshot=await getDocs(profilesCollection)

        let blogs=[]

        for(const doc of profilesSnapshot.docs){
            const profileId=doc.id

            const blogsCollection=collection(db,"Profiles",profileId,"Blogs");
            const blogsSnapshot=await getDocs(blogsCollection);

            blogsSnapshot.forEach(blogDoc=>{
                if(doc.data().email!==userEmail){
                    blogs.push({
                        id:blogDoc.id,
                        ...blogDoc.data(),
                        author:doc.data().email
                    });
                }
            });
        }
        dispatch(stopLoading())
        console.log("Fetched Blogs",blogs);
        return blogs
    }
    catch(error){
        console.log("Error fetching blogs",error)
        dispatch(setError(error))
        return []
    }
}

    