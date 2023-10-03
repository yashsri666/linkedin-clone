import React, { useState } from 'react';
import { RegisterAPI, GoogleSignInAPI } from '../API/AuthAPI';
import { AiFillLinkedin } from 'react-icons/ai';
import '../Sass/loginComponent.scss';
import { postUserData } from '../API/FirestoreAPI';
import GoogleButton from 'react-google-button'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getUniqueID } from '../helpers/getUniqueID';
import user from '../assets/user.png'

export default function RegisterComponent() {
  let navigate = useNavigate();
  const [credentials, setCredentials] = useState({})
  const register = async () => {
    try{
      let res = await RegisterAPI(credentials.email, credentials.password);
      toast.success('Signed Up Successfully!');
      postUserData({
        userID: getUniqueID(),
        email: credentials.email,
        name: credentials.name,
        imageLink: user, });
      navigate("/home");
      localStorage.setItem('userEmail', res.user.email);
    }
    catch(err){
      console.log(err);
      toast.error('Cannot create account. Please try again.');
    }
  };

const googleSignIn = async () => {
  try{
    let response = await GoogleSignInAPI();
    toast.success('Signed Up Successfully!');
    navigate("/home");
}
  catch(err){
    console.log(err);
    toast.error('Cannot create account. Please try again.');
  }
}

  return (
    <div className='login-wrapper' >
      <AiFillLinkedin className='linkedinLogo' alt='linkedin-logo' size={60} />
      <div className='login-wrapper-inner'>
      <h1 className='heading'>
        Make the most of your professional life
        </h1>
        <div className='auth-inputs'>
        <input
          onChange={(event) =>
            setCredentials({ ...credentials, name: event.target.value })
          }
            className='common-input'
            type='text'
            placeholder='Enter your full name'
        />
        <input
          onChange={(event) =>
            setCredentials({ ...credentials, email: event.target.value })}
            className='common-input'
            type='email'
            placeholder='Email'
        />
        <input
          onChange={(event) =>
            setCredentials({ ...credentials, password: event.target.value })}
            className='common-input'
            type='password'
            placeholder='Password (6 or more characters)'
        />
      </div>
      <button onClick={register} className='login-btn'>
        Agree & Join
        </button>
        </div>
        <hr className='hr-text' data-content='or' />
        <div className='google-btn-container'>
        <GoogleButton className='google-btn' onClick={googleSignIn}/>
        <p className='go-to-signup'>
          Already on LinkedIn? <span className='join-now' onClick={() => navigate("/")}>
            Sign In
          </span>
        </p>
        </div>
    </div>
  );
}

