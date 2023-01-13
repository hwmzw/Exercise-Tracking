import './App.css';
function App() {
  return (
      <form method='post'>

      <div className='container'>
      <h2>SignUp Form</h2>
   
    <label className="form-label">First Name</label>
    <input type="fname" className="form-control" name="firstname"/>


    <label className="form-label">Last Name</label>
    <input type="lname" className="form-control" name="lastname"/>


    <label className="form-label">Email address</label>
    <input type="email" className="form-control" name="email"/>


    <label className="form-label">Password</label>
    <input type="password" className="form-control" name="password"/>

 
    <label className="form-label">Confirm Password</label>
    <input type="confirmpassword" className="form-control" name="confirmPassword"/>
 
    <div>
        <button type="submit" className="btn btn-danger my-3" >Submit</button> 
    </div>

</div>
</form>
  
  );
}

export default App;
