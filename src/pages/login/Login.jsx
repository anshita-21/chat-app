import React, { useState } from 'react'
import './Login.css'
import assets from '../../assets/assets'

const Login = () => {

  //created a state variable and initialized it with text sign up
  const [currState, setCurrState] = useState("Sign Up");


  return (
    <div className='login'>
        <img src={assets.logo_big} alt="logo" className='logo'></img>
        <form className='login-form'>
          <h2>{currState}</h2> 
          {currState === "Sign Up"
          ? <input type="text" placeholder='username' className="form-input" required/>
          : null}
          <input type="email" placeholder='email address' className="form-input" required/>
          <input type="password" placeholder='password' className="form-input" required/>
          <button type='submit'>{ currState === "Sign Up" ? "Create account" : "Login here"}</button>
          <div className="login-term">
            <input type='checkbox'/>
            <p>Agree to terms & policies</p>
          </div>
          <div className="login-forgot">
            {currState === "Sign Up"
            ? <p className="login-toggle">Already have an account <span onClick={()=>setCurrState("Login")}>Login here</span></p>
            : <p className="login-toggle">Create an account <span onClick={()=>setCurrState("Sign Up")}>click here</span></p> 
            }
          </div>
        </form>
    </div>
  )
}

export default Login