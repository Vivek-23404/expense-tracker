import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logOutUser } from '../../redux/auth/authSlice'
import { message } from 'antd'

export const Account = () => {


    const dispatch = useDispatch()
    const {currentUser} = useSelector((state) => state.auth)
    console.log(currentUser);


    const handleLogout = async () =>{

        try {
            const res = await fetch("/api/user/logout")
            dispatch(logOutUser())
            const data = await res.json()
            message.success(data.message)
        } catch (error) {
            console.log(error);
        }
    }


  return (
<div className="flex flex-col items-center h-screen w-full justify-center gap-3">

    <div className="w-72">
        <div className="bg-white shadow-xl rounded-lg py-3">
            <div className="photo-wrapper p-2">

                {currentUser ? (

                <img className="w-32 h-32 rounded-full mx-auto" src={currentUser.rest.profilePicture} alt="dawdw" />
                ) : (
                    <h1>img</h1>
                    
                )}
            </div>
            <div className="p-2">
                <h3 className="text-center text-xl text-gray-900 font-medium leading-8">{currentUser.rest.name}</h3>
                <div className="text-center text-gray-400 text-xs font-semibold">
                    <p>Web Developer</p>
                </div>
                <table className="text-xs my-3">
                    <tbody>
                        <tr>
                            <td className="px-2 py-2 text-gray-500 font-semibold">Address</td>
                            <td className="px-2 py-2"> Gujarat, India</td>
                        </tr>
                        <tr>
                            <td className="px-2 py-2 text-gray-500 font-semibold">Phone</td>
                            <td className="px-2 py-2">+91 9979255XXXX</td>
                        </tr>
                        <tr>
                            <td className="px-2 py-2 text-gray-500 font-semibold">Email</td>
                            <td className="px-2 py-2">{currentUser.rest.email}</td>
                        </tr>
                </tbody>
                </table>

                <div className="text-center my-3">
                    <Link to="/edit-profile">
                    <p className="text-xs text-indigo-500 italic hover:underline hover:text-indigo-600 font-medium">
                        Edit Profile
                    </p>
                    </Link>
                </div>

            </div>
        </div>

    </div>

    <button onClick={handleLogout} className=''>log out</button>

</div>
  )
}


// "https://www.gravatar.com/avatar/2acfb745ecf9d4dccb3364752d17f65f?s=260&d=mp"