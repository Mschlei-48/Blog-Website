// import { useState, useEffect, useRef } from "react";
// import EditorJS from "@editorjs/editorjs";
// import Header from "@editorjs/header";
// import ImageTool from "@editorjs/image";
// // import TableTool from '@editorjs/table'
// import NavBar from "./Navbar";
// import "./write.css";
// import { db } from "../Firebase/config";
// import { storage } from "../Firebase/config";
// import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
// import { useDispatch,useSelector } from "react-redux";
// import { getData } from "../Redux/dataSlice";

// function Write() {
//     const dataState=useSelector(state=>state.db)
//     console.log("Blogs are here:",dataState)
//     const dispatch=useDispatch()
//     const editorInstance = useRef(null)

//     const ejInstance = useRef()

//     const DEFAULT_INITIAL_DATA = {
//     time: new Date().getTime(), //For every blog we will have the time it was written
//     blocks: [
//       //Define the blocks for the data, the blocks are the individual components of the blog,e.g headers, paragraphs, images,etc.
//       {
//         //Here we are starting the first block
//         type: "header", //The type of the block is header
//         data: {
//           //Pass the data of the block
//           text: "Start writing...", //Then gve the content of the block which in this case is the text
//           level: 1, //Define level of the header, i.e., 1 for h1, 2 for h2,etc.
//         },
//       },
//     ],
//   };

//   const imageToolConfig = {
//     class: ImageTool,
//     config: {
//       // caption:true,
//       uploader: {
//         async uploadByFile(file) {
//           try {
//             const storageRef = ref(storage, `Blog-Images/mishi-first-image`);
//             const snapshot = await uploadBytes(storageRef, file);
//             const url = await getDownloadURL(snapshot.ref);

//             return {
//               success: 1,
//               file: {
//                 url,
//               },
//             };
//           } catch (error) {
//             console.error("File Upload Failed:", error);
//             return {
//               success: 0,
//               error: error.message,
//             };
//           }
//         },

//         async uploadByURL(url) {
//           try {
//             return {
//               success: 1,
//               file: {
//                 url,
//               },
//             };
//           } catch (error) {
//             console.error("Upload Failed", error);
//             return {
//               success: 0,
//               error: error.message,
//             };
//           }
//         },
//       },
//     },
//   };
//   const initEditor = () => {
//     const editor = new EditorJS({
//       holder: "editorjs",
//       onReady: () => {
//         ejInstance.current = editor;
//       },
//       autofocus: true,
//       data: DEFAULT_INITIAL_DATA,
//       onChange: async () => {
//         let content = await editor.saver.save();
//         console.log("Content is:", content.blocks);
//         dispatch(getData(content))
//       },
//       tools: {
//         header: Header,
//         // image: ImageTool,
//         image:imageToolConfig,
//         // list: List,
//         // quote: Quote,
//         // table: TableTool,
//         // checklist: Checklist,
//         // delimiter: Delimiter,
//         // embed: Embed,
//         // marker: Marker,
//       },
//     });
//   };

//   useEffect(() => {
//     if (ejInstance.current === null) {
//       //If the editor is not initialized yet, initialise it by calling te function to initialise
//       initEditor();
//     }
//     return () => {
//       ejInstance?.current?.destroy(); //If the component is refreshed, then the editor content should be destroyed/removed from memory/DOM.
//       ejInstance.current = null; //Then we set the ijInstance to null
//     };
//   }, []);
//   return (
//     <div className="write-main-content">
//       {<NavBar />}
//       <br></br>
//       <br></br>
//       <div className="write-container">
//         <div id="editorjs" style={{ width: "80vw", height: "80vh" }}></div>
//       </div>
//     </div>
//   );
// }
// export default Write;



import { useState, useEffect, useRef } from "react";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import ImageTool from "@editorjs/image";
import NavBar from "./Navbar";
import "./write.css";
import { db } from "../Firebase/config";
import { storage } from "../Firebase/config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useDispatch, useSelector } from "react-redux";
import { getData,pushBlogs } from "../Redux/dataSlice";

function Write() {
    const dataState = useSelector(state => state.db);
    console.log("Blogs are here:", dataState);
    const dispatch = useDispatch();
    const editorInstance = useRef(null);

    const ejInstance = useRef();

    const DEFAULT_INITIAL_DATA = {
        time: new Date().getTime(),
        blocks: [
            {
                type: "header",
                data: {
                    text: "Start writing...",
                    level: 1,
                },
            },
        ],
    };

    const imageToolConfig = {
        class: ImageTool,
        config: {
            caption: {
                placeholder: "Add a caption",
            },
            uploader: {
                async uploadByFile(file) {
                    try {
                        const storageRef = ref(storage, `Blog-Images/mishi-first-image`);
                        const snapshot = await uploadBytes(storageRef, file);
                        const url = await getDownloadURL(snapshot.ref);

                        return {
                            success: 1,
                            file: {
                                url,
                            },
                        };
                    } catch (error) {
                        console.error("File Upload Failed:", error);
                        return {
                            success: 0,
                            error: error.message,
                        };
                    }
                },

                async uploadByURL(url) {
                    try {
                        return {
                            success: 1,
                            file: {
                                url,
                            },
                        };
                    } catch (error) {
                        console.error("Upload Failed", error);
                        return {
                            success: 0,
                            error: error.message,
                        };
                    }
                },
            },
        },
    };

    const initEditor = () => {
        const editor = new EditorJS({
            holder: "editorjs",
            onReady: () => {
                ejInstance.current = editor;
            },
            autofocus: true,
            data: DEFAULT_INITIAL_DATA,
            onChange: async () => {
                try {
                    const content = await editor.save();
                    // Ensure the data is cloned before dispatching to avoid mutation issues
                    const clonedContent = JSON.parse(JSON.stringify(content));
                    console.log("Content is:", clonedContent.blocks);
                    dispatch(getData(clonedContent));
                } catch (error) {
                    console.error("Error saving content:", error);
                }
            },
            tools: {
                header: Header,
                image: imageToolConfig,
            },
        });
    };

    useEffect(() => {
        if (ejInstance.current === null) {
            initEditor();
        }
        return () => {
            ejInstance?.current?.destroy();
            ejInstance.current = null;
        };
    }, []);

    const handlePublish=()=>{
        pushBlogs(dataState.email,dataState.blogs)
        .then(()=>{
            alert("Blog added successfully")
        })
        .catch((error)=>{
            console.log("Error adding blog:",error)
    })
    }

    return (
        <div className="write-main-content">
            {<NavBar />}
            <br />
            <div className="submit-button" style={{width:"90%",display:"flex",justifyContent:"end",paddingLeft:"3%",paddingRight:"3%"}}>
                <button style={{backgroundColor:"green",color:"white",width:"10%"}} onClick={()=>handlePublish()}>Publish</button>
            </div>
            <br />
            <div className="write-container">
                <div id="editorjs" style={{ width: "80vw", height: "80vh" }}></div>
            </div>
        </div>
    );
}

export default Write;

