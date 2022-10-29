import React from 'react'
import '../../styles/registration/registration.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faGraduationCap,faMobile,faEnvelope,faLock} from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import axios from 'axios'
import validator from 'validator'
import {Link } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { useEffect } from 'react'

const Registration = () => {
    const [firstName, setfirstName] = useState("");
    const [secondName, setSecondName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword,setRepeatPassword] = useState("");
    const [errorMessage,setErrorMessage] = useState("");
    const [emailSent, setemailSent] = useState(false);
    
    useEffect(() => {
        window.sessionStorage.setItem("token","");
    }, []);
    
    

    //Changing the value of info as soon as the changes in the input fields are registered
    const firstNameChange = (event)=>{
        setfirstName(event.target.value);
    }
    const secondNameChange = (event)=>{
        setSecondName(event.target.value);
    }
    const phoneNumberChange = (event)=>{
        setPhoneNumber(event.target.value);
    }
    const emailChange = (event)=>{
        setEmail(event.target.value);
    }
    const passwordChange = (event)=>{
        setPassword(event.target.value);
    }
    const passwordRepeatChange = (event)=>{
        setRepeatPassword(event.target.value);
    }
 
    //Making sure the first letter of the names is capital, regardles of what the user types in
    const firstLetterCapital = (info)=>{
        return info.charAt(0).toUpperCase() + info.slice(1,info.length);
    }
    const checkForCapitalinPassword = (password)=>{
        var hasCapitalLetter = /^[A-Z]*$/;
        for(let i = 0;i<password.length;i++){
            if(hasCapitalLetter.test(password[i])){
                return true;
            }
        }
        return false;
    }

    const onSubmit = (event)=>{
        setemailSent(false);
        event.preventDefault();
        //Checking if a Names are a single letter or contain a number
        var hasNumber = /\d/; 
        //regex for emailcheck
        var emailCheck = /\S+@\S+\.\S+/;
        //checking if password contains a number or a capital letter
         //Idea is to set error message as a string of which information is invalid, Then using ternary expresssion display the message on screen
        if(firstName===""||secondName===""||phoneNumber===""||email===""){
            setErrorMessage("empty")
            return;
        }
        else if(firstName.length<2 || hasNumber.test(firstName)){
            
            setErrorMessage("name");
        }
        else if(secondName.length<2 || hasNumber.test(secondName)){
            setErrorMessage("name");
        }
        //Checking if a phone number is valid
        else if(!validator.isMobilePhone(phoneNumber)){
            setErrorMessage("phone");
        }
        //Checking if the email is valid
        else if(!emailCheck.test(email)){
            setErrorMessage("email");
        }
        //Checking if the password is valid
        else if(password.length<6 || !checkForCapitalinPassword(password) || !hasNumber.test(password)){
            setErrorMessage("password");
        }
        //Checking if the passwords match
        else if(password !== repeatPassword){
            setErrorMessage("repeat");
        }
        
        else{
            setErrorMessage("")
            //Trim empty spaces
            const firstNametrimmed = firstName.trim();
            const secondNametrimmed = secondName.trim();
                  
            //Making sure names start with a capital letter
            const firstNameFinal = firstLetterCapital(firstNametrimmed);
            const secondNameFinal = firstLetterCapital(secondNametrimmed);

            
            //configuration for http request
            const configuration = {
            method:"post",
            url:"http://localhost:4000/register",
            data:{
                firstName:firstNameFinal,
                secondName:secondNameFinal,
                phoneNumber:phoneNumber,
                email:email,
                password:password,
            }
        }
        axios(configuration)
            .then((result)=>{
                setemailSent(true);
            })
            .catch((err)=>{
                if(err.response.data.error.keyPattern.phoneNumber===1){
                    setErrorMessage("phoneused");
                }
                else if(err.response.data.error.keyPattern.email===1){
                    setErrorMessage("emailused")
                }
            })
        }  
    }
 
  return (
    <section className='registration-section'>
        <h1>Bug Tracker</h1>
        <div style={emailSent?{height:'60vh'}:{height:"53vh"}} className='registration-container'>
            <p>Sign Up</p>
            
            <form className='form' action="submit" onSubmit={onSubmit}>
                <div className='first-name'>
                    {errorMessage==='empty'?<p className='error-paragraph'>Fields can't be empty</p>:errorMessage==="name"?<p className='error-paragraph'>Invalid Name</p>:""}
                 
                    <FontAwesomeIcon className='icon' icon={faGraduationCap} />
                    <input type="text" placeholder='First Name' onChange={firstNameChange} value={firstName} /></div>
                    <div className='second-name'>
                    <FontAwesomeIcon className='icon' icon={faGraduationCap} />
                    <input type="text" placeholder='Second Name'  onChange={secondNameChange} value={secondName} />
                </div>
                <div className='phone-number' >
                    {errorMessage==="phoneused"?<p  className='error-paragraph'>Phone Number is already in use</p>:
                    errorMessage==="phone"?<p  className='error-paragraph'>Invalid Phone Number</p>:""}
                    <FontAwesomeIcon className='icon' icon={faMobile} />
                    <input type="text" placeholder='Phone number'  onChange={phoneNumberChange} value={phoneNumber}/>
                    </div>
                <div className='email'>
                    {errorMessage==="emailused"?<p  className='error-paragraph'>Email is already in use</p>
                    :errorMessage==="email"?<p  className='error-paragraph'>Invalid Email</p>:""}
                    
                    <FontAwesomeIcon className='icon' icon={faEnvelope} />
                    <input type="text" name="foo" placeholder='Email'  onChange={emailChange} value={email} />
                    </div>
                <div className='password'>
                    {errorMessage==="password"?<p  className='error-paragraph'>Password must contain a number, a capital Letter, and be under 6 characters.</p>:""}
                    <FontAwesomeIcon className='icon' icon={faLock} />
                    <input type="password" placeholder='Password'  onChange={passwordChange} value={password}  />
                    </div>
                <div className='secondary-password'>
                    {errorMessage==="repeat"?<p  className='error-paragraph'>Passwords do not match</p>:""}
                    <FontAwesomeIcon className='icon' icon={faLock} />
                    <input type="password" placeholder='Repeat' onChange={passwordRepeatChange} value={repeatPassword} />
                    </div>
                <div className='form-submit'>
                    <input type="submit" value='Register'/>
                   {emailSent?<h3  className="verify">A link has been sent to your email, please verify the account and proceed to log in.</h3>:""}
                   <Link onClick={()=>{
                        setemailSent(false);
                }} to="/login"  className="login-paragraph"  >Already have an Account?</Link>
                </div>
            </form>
        </div>
        <h2 className="footer">@ 2022 <span>Stefan Nidzovic</span></h2>
    </section>
  )
}

export default Registration