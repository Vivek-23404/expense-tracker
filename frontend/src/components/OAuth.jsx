import {GoogleAuthProvider, signInWithPopup, getAuth} from "firebase/auth"
import app from "../firebase"

import { useDispatch } from "react-redux"
import { loginSuccess } from "../redux/auth/authSlice"
import { useNavigate } from "react-router-dom"


export const OAuth = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const googleClick = async () =>{

    try {
      

      const provider = new GoogleAuthProvider()

      const auth = getAuth(app)

      const result = await signInWithPopup(auth, provider)

      const res = await fetch("/api/user/google",{
        method : "POST",
        headers : {
          "Content-Type" : "application/json"
        },
        body : JSON.stringify({
          name : result.user.displayName,
          email : result.user.email,
          photo : result.user.photoURL
        })
      })

      console.log(result);
      
      const data = await res.json()

      console.log(data);

      dispatch(loginSuccess(data))
      navigate("/")

      

    } catch (error) {
      console.log("Could not Login with google", error);
    }
  }




  return (
    <button type='button' onClick={googleClick} className='bg-blue-500 text-white rounded-lg p-3 font-semibold uppercase hover:opacity-90' >
      Continue with Google
    </button>
  )
}
