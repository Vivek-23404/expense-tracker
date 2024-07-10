import React, { useState } from 'react'
import { message} from "antd"
import { Link, useNavigate } from 'react-router-dom'
import { loginStart,loginSuccess,loginFailure } from '../../redux/auth/authSlice'
import { useDispatch, useSelector } from 'react-redux'
import { OAuth } from '../../components/OAuth'
import { axiosUrl } from '../../main'

export const Login = () => {



  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({})



  const {error , loading} = useSelector((state) => state.auth)


  const handleChange = (e) =>{
    setFormData({...formData, [e.target.id]:e.target.value})
  }
  // console.log(formData);
  // console.log(JSON.stringify(formData));



  const submitHandler = async (e) =>{

    e.preventDefault()
    

    try {

      dispatch(loginStart())

      // setting full url in fetch on login page
      // const result  = await fetch(`${baseURL}/api/user/login`,{
      //   method : "POST",
      //   headers : {
      //     "Content-Type" : "application/json"
      //   },
      //   body : JSON.stringify(formData)
      // })
      // const data = await result.json()

      const result = await axiosUrl.post("/api/user/login", formData)
      const data = await result.data


      
      // console.log(result);
      console.log(data);
      
      
      if(data.success === true){
        message.success(data.message)
        navigate("/")
        dispatch(loginSuccess(data))
      }
      
      if(data.success === false){
        message.error(data.message)
        dispatch(loginFailure(data.message))
      }
      
      
      
    } catch (error) {
      message.error()
      dispatch(loginFailure(error))

    }

     
  }


  return (
    <>
      <div className='p-3 w-96 mx-auto h-screen flex flex-col items-center justify-center gap-10'>
        <h1 className='text-3xl text-center w-full'>Login Form</h1>
        <form onSubmit={submitHandler} className='flex flex-col gap-4 w-full'>

          <input 
          type="email" 
          placeholder='Email'
          id='email' 
          className='bg-slate-100 p-3 rounded-lg'
          onChange={handleChange} 
          required
          />
          <input 
          type="password" 
          placeholder='Password'
          id='password' 
          className='bg-slate-100 p-3 rounded-lg'
          onChange={handleChange} 
          required
          />


          <button disabled={loading} className='bg-slate-700 p-3 rounded-lg text-white uppercase hover:opacity-90 disabled:opacity-80'>
                {loading ? "Loading... " : "Login"}
          </button>
        <OAuth/>
        </form>


        <div className='w-full flex justify-between'>
          <p>do not have an account ?</p>
          <Link to="/register">
            <span className='text-blue-500'>
              Register Here
            </span>
          </Link>
        </div>

      </div>
    </>
  )
}
