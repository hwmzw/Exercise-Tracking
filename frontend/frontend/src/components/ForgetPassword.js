import React, { useState } from "react";
// import toast, { Toaster } from 'react-hot-toast';

function ForgetPassword() {
// const [password, setPassword] = useState('')
const [email,setEmail] = useState('')

const reset = () => {

//axios here

};
  return (
    <div className="container">
    <h4>Forget Password?</h4>
    <h5>Enter Registered email below to reset your password</h5>
    <label>Enter Email</label>
    <input type="email" className="mx-3" value={email} onChange={e=>setEmail(e.target.value)}/>
    <br/>

    <button className="my-3" onClick={reset}>Send Reset Email</button>
    </div>
  );
}

export default ForgetPassword;
