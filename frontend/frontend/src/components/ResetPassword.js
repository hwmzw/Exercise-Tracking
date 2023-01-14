import React, { useState } from 'react'

function ResetPassword() {
    const [email, setEmail] = useState('')

  return (
    <div className='container'>
    <h3>Reset Your Password</h3>
      <label>Enter New Password</label>
      <input name= 'email' type='email' />
      <br/>
      <label className='mx-2 my-3' >Confirm Password</label>
      <input name= 'email' type='email' />
      <br/>
      <button type="button" className="mx-3">Reset Password</button>
    </div>
  )
}

export default ResetPassword
