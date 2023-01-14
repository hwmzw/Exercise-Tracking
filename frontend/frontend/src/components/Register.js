import React, {useState} from "react";
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';


function Register() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    
    const registers = ()=>{
        if(!firstName || !email || !password || !confirmPassword) {
            return toast.error("Please fill all fields");  
        }
        if(password.length < 8) {
            return toast.error("Password should be at least 8 characters!")
        }
        if(!validateEmail(email)) {
            return toast.error("Please enter valid email")
        }

        if(password !== confirmPassword) {
            return toast.error("Password should be same as confirm password")
        }

        axios.post('http://localhost:8081/register', {
            firstName, lastName, email, password
          })
          .then(function (response) {
            console.log(response);
            const data = response.data;
            if(data.status) {
                toast.success(data.message)
            }
            else {
                toast.error(data.message)
            }
          })
          .catch(function (error) {
            console.log(error);
          });

    }

    const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

    return(
        <>
        <div className="container my-3">
        <h1>Create Your account here</h1>
        <label>First Name</label>
        <input className="mx-3 my-2" type="text" value={firstName} onChange={(e)=>setFirstName(e.target.value)}/>
        <br/>
        <label>Last Name</label>
        <input className="mx-3 " type="text" value={lastName} onChange={(e)=>setLastName(e.target.value)}/>
        <br/>
        <label>Email</label>
        <input className="mx-5 my-3" type="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
        <br/>
        <label>Password</label>
        <input className="mx-3 " type="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
        <br/>
        <label>Confirm Password</label>
        <input className="mx-3" type="password" value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)}/>
        <br/>
        <button type="button" className="mx-3" onClick={registers}>Signup</button>
        <Toaster/>
        </div>
        </>
    )   
}

export default Register