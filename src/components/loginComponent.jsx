import React, { useState } from 'react';
import { LoginAPI, GoogleSignInAPI } from '../API/AuthAPI';
// import LinkedinLogo from '../assets/linkedinlogo.png';
import { AiFillLinkedin } from 'react-icons/ai';
import '../Sass/loginComponent.scss';
import GoogleButton from 'react-google-button'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function LoginComponent() {
  let navigate = useNavigate();
  const [credentials, setCredentials] = useState({})
  const login = async () => {
    try{
      let res = await LoginAPI(credentials.email, credentials.password);
      toast.success('Login Successful');
      localStorage.setItem('userEmail', res.user.email);
      navigate("/home");
    }
    catch(err){
      console.log(err);
      toast.error('Please check your email and password and try again.');
    }
  };

const googleSignIn = async () => {
  try{
    let res = await GoogleSignInAPI();
    toast.success('Login Successful');
    navigate("/home");
  }
  catch(err){
    console.log(err);
    toast.error('Please check your email and password and try again.');
  }
}

  return (
    <div className='login-wrapper' >
      <AiFillLinkedin className='linkedinLogo' alt='linkedin-logo' size={60} />
      <div className='login-wrapper-inner'>
      <h1 className='heading'>
        Sign in
        </h1>
      <p className='sub-heading'>
        Stay updated on your professional world
        </p>
      <div className='auth-inputs'>
        <input
          onChange={(event) =>
            setCredentials({ ...credentials, email: event.target.value })}
            className='common-input'
            type='email'
            placeholder='Enter your Email'
        />
        <input
          onChange={(event) =>
            setCredentials({ ...credentials, password: event.target.value })}
            className='common-input'
            type='password'
            placeholder='Enter your Password'
        />
      </div>
      <button onClick={login} className='login-btn'>
        Sign in
        </button>
        </div>
        <hr className='hr-text' data-content='or' />
        <div className='google-btn-container'>
        <GoogleButton className='google-btn' onClick={googleSignIn}/>
        <p className='go-to-signup'>
          New to LinkedIn? <span className='join-now' onClick={() => navigate("/register")}>
            Join now
          </span>
        </p>
        </div>
    </div>
  )
}

