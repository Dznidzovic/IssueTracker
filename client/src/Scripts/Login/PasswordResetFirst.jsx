import React from 'react';
import '../../styles/passreset/pass-reset.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faGraduationCap} from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

//Checks if the email is valid and an account registered to it exists
//After that sends a password reset link to our email
const PasswordReset = () => {
    const [email, setEmail] = useState("");
    const [errorMessage,setErrorMessage] = useState("");
    const [sendOnce,setsendOnce] = useState(0);

    const emailChange = (event)=>{
        setEmail(event.target.value);
    }
    const onSubmit = async(e)=>{
        if(sendOnce!==0){
            return;
        }
        try{
        e.preventDefault();
        //regex for emailcheck
        var emailCheck = /\S+@\S+\.\S+/;
        if(!emailCheck.test(email)){
            setErrorMessage("invalid");
            console.log(errorMessage)
            return;
        }
        let ifexistsConfiguration = {
            method:"post",
            url: "http://localhost:4000/emailexists",
            data:{
                email
            }
        }; 
        
        const ifExists = await axios(ifexistsConfiguration)
     
        const configuration = {
            method:"post",
            url:"http://localhost:4000/password-reset",
            data:{
                email
            }
        };
        const response = await axios(configuration);

        setErrorMessage("sent");
        setsendOnce(1);
    }
    catch(err){
        if(err.response.data.message === "User not found"){
            setErrorMessage("notexist");
        }
        
    }
    }

  return (
    <section className='pass-reset-section'>
        <h1>Issue Tracker</h1>
        <div  className='pass-reset-container'>
            <p className='pr-paragraph'>Password Reset</p>
            
            <form className='form' action="submit" onSubmit={onSubmit}>
                
                <div className='username'>
                    <FontAwesomeIcon className='icon' icon={faGraduationCap} />
                    <input type="text" placeholder='Email' onChange={emailChange} value={email}/>
                </div>
                <div className='form-submit'>
                    {errorMessage==="sent"?<h4 className='email-sent-paragraph'>Reset link has been sent</h4>:""}
                    {errorMessage==="invalid"?<h4 className='invalid-mail-paragraph'>Invalid mail</h4>:""}
                    {errorMessage==="notexist"?<h4 className='acccount-doesentexist-paragraph'>Account doesen't exist</h4>:""}
                    <input className='btn' type="submit" value='Send' />
                    <br />
                    <Link className='login-paragraph' to="/login">Log in?</Link>
                </div>

                
            </form>
        </div>
       <h2 className="footer">@ 2022 <span>Stefan Nidzovic</span></h2>
    </section>
  )
}

export default PasswordReset