import React from 'react'
import '../../styles/login/login.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faGraduationCap,faMobile,faEnvelope,faLock} from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate,Link } from 'react-router-dom';


const Login = () => {
    
    window.sessionStorage.setItem("token","");
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage,setErrorMessage] = useState("");
    const [notVerified, setnotVerified] = useState(false);
    const emailChange = (event)=>{
        setEmail(event.target.value);
    }
    const passwordChange = (event)=>{
        setPassword(event.target.value);
    }
    //checks if provided email and password correspond to a user, than checks if the account is verified(if the json web token exists) and stores it in session storage
    //After that program navigates to a page which is protected and checks if a storage is valid by sending a http request which verifies the cookie
    //If all the requirements are met we are granted the access to the next page
    const onSubmit = (event)=>{
        event.preventDefault();
        const configuration = {
            method:"post",
            url: "http://localhost:4000/login",
            data:{
                email,
                password
            }
        }
        axios(configuration)
            .then(result=>{
                window.sessionStorage.setItem("token",result.data.accessToken,{
                    path:"/",
                });
                if(result.data.message === "Verification link has been sent"){
                    setnotVerified(true);
                    setErrorMessage("");
                    return;
                }
                if(!result.data.accessToken){
                    
                    setErrorMessage("");
                    return;
                }
                navigate("/auth");
                
            })
            .catch((err)=>{
              console.log(err);
                if(err.response.data.message==='User not verified, verification link has been sent.`'){
                    setnotVerified(true);
                    setErrorMessage("");
                }
                window.sessionStorage.setItem("token","",{
                    path:"/",
                })
                if(err.response.data.message==="User not found"){
                    setErrorMessage("email");
                }
                else if(err.response.data.message==="Passwords do not match"){
                    setErrorMessage("password");
                }
               
            });

        
    }

  return (
    <section className='login-section'>
        <h1>Issue Tracker</h1>
        <div  className='login-container'>
            <p>Log in</p>
            
            <form className='form' action="submit" onSubmit={onSubmit}>
                
                <div className='username'>
                    {errorMessage==="email"?<p className='error-paragraph'>Invalid Email</p>:""}
                    <FontAwesomeIcon className='icon' icon={faGraduationCap} />
                    <input type="text" placeholder='Email' onChange={emailChange} value={email}  />
                    </div>
                <div className='secondary-password'>
                    {errorMessage==="password"?<p className='error-paragraph'>Invalid Password</p>:""}
                    <FontAwesomeIcon className='icon' icon={faLock} />
                    <input type="password" placeholder='Password' onChange={passwordChange} value={password} />
                    </div>
                    <Link to="/password-reset" className='forgot-password-paragraph'>Forgot your Password?</Link>
                <div className='form-submit'>
                    <input className='btn' type="submit" value='Log In' />
                    {notVerified?<a className='not-verified-msg'>Please verify your account.</a>:""}
                    <Link to="/" className='register-paragraph'>Don't have an account?</Link>
                    
                </div>

                
            </form>
        </div>
       <h2 className="footer">@ 2022 <span>Stefan Nidzovic</span></h2>
    </section>
  )
}

export default Login