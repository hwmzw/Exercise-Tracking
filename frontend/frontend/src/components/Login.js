import axios from 'axios'
import React, { useState } from 'react'
import { toast,Toaster } from 'react-hot-toast'

function Login() {
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')

    const handleLogin  = ()=>{
      if(!validateEmail(email)){
        return toast.error("Please enter Valid Email")
      }
      if(password.length<8){
        return toast.error("Enter Valid Password")
      }

//connecting frontend with backend

        axios.post("http://localhost:8081/login",{
            email,password
        }).then((res)=>{
            console.log(res)
            toast.success(res.data.message)
        }).catch((err)=>{
            toast.error("User not found")
        })
        console.log(email,password)
    }
//for email validation
    const validateEmail = (email) => {
      return String(email)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };

  return (
    <div className='container'>
    <h3>You can login here</h3>
    <h5>Enter Registered email and Password to login</h5>
      <div className='my-3'>
        <label>Enter Email</label>
        <input className='mx-5' type="email" name='email' value={email} onChange={e=>setEmail(e.target.value)}/>
      </div>
      <div>
        <label>Enter Password</label>
        <input className='mx-3' type="password" name='password' value={password} onChange={e=>setPassword(e.target.value)}/>
      </div>
      <div>
       <button className='d-flex justify-content-center' onClick={handleLogin}>Login</button>
      </div>
      <br/>
      <br/>
      <Toaster/>
    </div>
    
  )
}

export default Login
