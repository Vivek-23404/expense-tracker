import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage';
import app from "../firebase"

import { updateUserStart,updateUserSuccess,updateUserFailuer, deleteUserStart, deleteUserFailuer, deleteUserSuccess } from '../redux/auth/authSlice';
import { message } from 'antd';
import { axiosUrl } from '../main';



export const EditProfile = () => {

    const fileRef = useRef()
    const dispatch = useDispatch()

    const [image, setImage] = useState(undefined)
    const [imagePercent, setImagePercent] = useState(0)
    // console.log(imagePercent);
    const [imageError, setImageError] = useState(null)
    const [formData, setFormData] = useState({})


    const [updateButtonSuccess, setupdateButtonSuccess] = useState(false)


    
    
    const {currentUser, loading, error} = useSelector((state) => state.auth)


    // console.log(currentUser);

    
    useEffect(()=>{
        if(image){
            handleFileUpload(image)
        }
    },[image])
    
    const handleFileUpload = async (image) =>{

        const storage = getStorage(app)
        const fileName = new Date().getTime() + image.name
        const storageRef = ref(storage,fileName)

        const upLoadTask = uploadBytesResumable(storageRef,image)
        upLoadTask.on(
            "state_changed",
            (snapshot)=>{
                const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
                console.log("Upload is " + progress + "% done");
                setImagePercent(progress)
            },

            (error)=>{
                setImageError(true)
            },
            ()=>{
                getDownloadURL(upLoadTask.snapshot.ref)
                    .then((downloadURL)=>{
                        setFormData({...formData, profilePicture:downloadURL})
                    })
            }
        );



    }


    const handleChange = (e) =>{
        setFormData({...formData, [e.target.id]: e.target.value})
    }
    console.log(formData);

    const handleSubmit = async (e) =>{
        e.preventDefault()

        try {

            dispatch(updateUserStart())
            
            // const res = await fetch(`/api/user/update/${currentUser.rest._id}`,{
            //     method : "POST",
            //     headers : {
            //         "Content-Type" : "application/json"
            //     },
            //     body : JSON.stringify(formData)
            // })

            // const data = await res.json()

            const res = await axiosUrl.post(`/api/user/update/${currentUser.rest._id}`, formData)
            const data = await res.data
            console.log(data);

            if(data.success === false){
                dispatch(updateUserFailuer(data))
                return
            }

            dispatch(updateUserSuccess(data))
            message.success(data.message)
        } catch (error) {
            dispatch(updateUserFailuer(error))
            message.error(data.message)
        }
    }


    const handleDeleteAccount = async () =>{

        try {
            dispatch(deleteUserStart())
        const res = await fetch(`/api/user/delete/${currentUser.rest._id}`,{
            method : "DELETE"
        }) 

        const data = await res.json()

        message.success(data.message)

        if(data.success === false){
            dispatch(deleteUserFailuer(data))
            return;
        }

        dispatch(deleteUserSuccess(data))
        } catch (error) {
            dispatch(deleteUserFailuer(error))
        }
    }
    


  return (
<div className="flex flex-col items-center h-screen w-full justify-center gap-3">

    <div className="w-96">

        <input type="file" ref={fileRef} hidden accept='image/.*' onChange={(e)=>setImage(e.target.files[0])}  />
        

        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
          <img src={formData.profilePicture || currentUser.rest.profilePicture} 
          alt="Profile Picture"
          className='cursor-pointer rounded-full h-24 w-24 self-center'
          onClick={()=>{fileRef.current.click(); setImageError(false);}}
           />

           <p className='text-sm self-center'>
            {   imageError 
            ? (
                <span className='text-red-500'> Uploading Image Error (Image must be less then 2MB)</span>
            ) 
            : imagePercent > 0 && imagePercent < 100
                    ? (
                        <span>{`Image Uploading ${imagePercent} %`}</span>
                        ) 
                    : imagePercent === 100 ?  
                        ( <span className='text-green-500'>Image Uploaded Successfully</span> ) : ""
            }
           </p>

           <input 
           type="text"
           id='name'
           placeholder='Name'
           className='bg-slate-100 rounded-lg w-full p-3'
           defaultValue={currentUser.rest.name}
           onChange={handleChange}
            />
           <input 
           type="email"
           id='email'
           placeholder='Email'
           className='bg-slate-100 rounded-lg w-full p-3'
           defaultValue={currentUser.rest.email}
           onChange={handleChange}
            />
           <input 
           type="password"
           id='password'
           placeholder='Password'
           className='bg-slate-100 rounded-lg w-full p-3'
           onChange={handleChange}
            />

            <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-90 disabled:opacity-80'>
                {loading ? "Loading..." : "Update"}
            </button>
        </form>


        <button onClick={handleDeleteAccount} className='mt-5 text-red-600'>delete account</button>

    </div>


</div>
  )
}


// "https://www.gravatar.com/avatar/2acfb745ecf9d4dccb3364752d17f65f?s=260&d=mp"



// <div className="bg-white shadow-xl rounded-lg py-3">
//             <div className="photo-wrapper p-2">

//                 {currentUser ? (

//                 <img className="w-32 h-32 rounded-full mx-auto" src={currentUser.rest.profilePicture} alt="dawdw" />
//                 ) : (
//                     <h1>img</h1>
                    
//                 )}
//             </div>
//             <div className="p-2">
//                 <h3 className="text-center text-xl text-gray-900 font-medium leading-8">{currentUser.rest.name}</h3>
//                 <div className="text-center text-gray-400 text-xs font-semibold">
//                     <p>Web Developer</p>
//                 </div>
//                 <table className="text-xs my-3">
//                     <tbody>
//                         <tr>
//                             <td className="px-2 py-2 text-gray-500 font-semibold">Address</td>
//                             <td className="px-2 py-2"> Gujarat, India</td>
//                         </tr>
//                         <tr>
//                             <td className="px-2 py-2 text-gray-500 font-semibold">Phone</td>
//                             <td className="px-2 py-2">+91 9979255XXXX</td>
//                         </tr>
//                         <tr>
//                             <td className="px-2 py-2 text-gray-500 font-semibold">Email</td>
//                             <td className="px-2 py-2">{currentUser.rest.email}</td>
//                         </tr>
//                 </tbody>
//                 </table>

//                 <div className="text-center my-3">
//                     <Link to="/edit-profile">
//                     <p className="text-xs text-indigo-500 italic hover:underline hover:text-indigo-600 font-medium">
//                         Edit Profile
//                     </p>
//                     </Link>
//                 </div>

//             </div>
//         </div>