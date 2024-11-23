import React from 'react'
import './Login.css'
import assets from '../../assets/assets'

const Login = () => {
  return (
    <div className='login'>
        <img src={assets.logo_big} alt="logo" className='logo'></img>
        <form className='login-form'>
          <h2>Sign up</h2>
          <input type="text" placeholder='username' className="form-input" required/>
          <input type="email" placeholder='email address' className="form-input" />
          <input type="password" placeholder='password' className="form-input" />
          <button type='submit'>Sign up</button>
          <div className="login-term">
            <input type='checkbox'/>
            <p>agree to terms & policies</p>
          </div>
          <div className="login-forgot">
            <p className="login-toggle">already have an acc <span>click here</span></p>
          </div>
        </form>
    </div>
  )
}

export default Login