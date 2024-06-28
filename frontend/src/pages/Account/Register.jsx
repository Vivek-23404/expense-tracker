import React, { useEffect, useState } from 'react'
import {Form,Input, message} from "antd"
import { Link, useNavigate } from 'react-router-dom'
import { OAuth } from '../../components/OAuth'


export const Register = () => {


  const navigate = useNavigate()
  const [formData, setFormData] = useState({})

  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)


  const handleChange = (e) =>{
    setFormData({...formData, [e.target.id]:e.target.value})
  }
  // console.log(formData);
  // console.log(JSON.stringify(formData));



  const submitHandler = async (e) =>{

    e.preventDefault()
    

    try {
      setLoading(true)

      const result  = await fetch(`/api/user/register`,{
        method : "POST",
        headers : {
          "Content-Type" : "application/json"
        },
        body : JSON.stringify(formData)
      })
      const data = await result.json()

      // console.log(result);
      // console.log(data);

      if(data.success === true){
        message.success("Registration Successfully")
        navigate("/login")
      }
      if(data.success === false){

        message.error("Something is wrong")
      }
      setLoading(false)

      setError(false)


    } catch (error) {

      setLoading(false)
      setError(true)
    }

     
  }





  return (
    <>
      <div className='p-3 w-96 mx-auto flex flex-col gap-10  items-center justify-center h-screen'>
        <h1 className='text-3xl text-center w-full'>Register Form</h1>

        <form onSubmit={submitHandler} className='flex flex-col gap-4 w-full'>

          <input 
          type="text" 
          placeholder='Name'
          id='name'
          className='bg-slate-100 p-3 rounded-lg'
          onChange={handleChange} 
          />
          <input 
          type="email" 
          placeholder='Email'
          id='email' 
          className='bg-slate-100 p-3 rounded-lg'
          onChange={handleChange} 
          />
          <input 
          type="password" 
          placeholder='Password'
          id='password' 
          className='bg-slate-100 p-3 rounded-lg'
          onChange={handleChange} 
          />


          <button disabled={loading} className='bg-slate-700 p-3 rounded-lg text-white uppercase hover:opacity-90 disabled:opacity-80'>
                {loading ? "Loading... " : "Register"}
          </button>
        <OAuth/>
        </form>


        <div className='w-full flex  justify-between'>
          <p>have an account ?</p>
          <Link to="/login">
            <span className='text-blue-500'>
              Login
            </span>
          </Link>
        </div>
.
      </div>
    </>
  )
}
