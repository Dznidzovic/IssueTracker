import React from 'react';
import '../../styles/passreset/pass-reset-second.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faLock} from '@fortawesome/free-solid-svg-icons';
import {useState, useEffect} from 'react';
import axios from 'axios';
import {Link, useParams} from 'react-router-dom';

//Once the link in the email is clicked, redirects us to this page, sends a http request to the server and checks if the token corresponds to the token in the url
//If that is the case, it gives us the access to this page, and let's us choose a new password
//Once finished sends a http request to change the password and let's us now when it's done
const PasswordReset = () => {
    const params = useParams();
    const [password, setPassword] = useState("");
    const [passwordrepeat, setPasswordrepeat] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [urlValid, seturlValid] = useState(false);
    const [sendOnce,setsendOnce] = useState(0);

    useEffect(()=>{
        const verifyEmailUrl = async()=>{
          var token = params.token;
          var urlId = params.id;
          try{
            const configuration = {
                method:'post',
                url:'http://localhost:4000/token-exists',
                data:{
                     token
                }
            }
            const response = await axios(configuration);
            if(response.data.message!=="Token found"){
                seturlValid(false);
                return console.log("Token invalid")
            }
            seturlValid(true);
            
          }
          catch(err){
            console.log(err);
            seturlValid(false);
          }
        }
        verifyEmailUrl();
      },[params])

    const passwordChange = (event)=>{
        setPassword(event.target.value);
    }
    const passwordRepeatChange = (event)=>{
        setPasswordrepeat(event.target.value);
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
    //First checks if the new password meets the requirements, after that sends a http request to change the current password
    const onSubmit = async(e)=>{
        if(sendOnce!==0){
            return;
        }
        e.preventDefault();
        try{
        var hasNumber = /\d/; 
        e.preventDefault();
        if(password.length<6 || !checkForCapitalinPassword(password) || !hasNumber.test(password)){
            setErrorMessage("password");
            return;
        }
        
        console.log(password,passwordrepeat);
        if(password !== passwordrepeat){
            setErrorMessage("repeat");
            return;
        }
        const configuration = {
            method:'post',
            url:'http://localhost:4000/userexists',
            data:{
                id:params.id
            }
        }
        const response = await axios(configuration);
        if(response.data.message!=="User found"){
            setErrorMessage("error");
            return console.log("user not found");
        }
        const updateConfiguration = {
            method:'post',
            url:`http://localhost:4000/${params.id}/password-reset/${params.token}`,
            data:{
                password
            }
        }
        
        const updatePassword = await axios(updateConfiguration);
        
        setErrorMessage("sent");
        setsendOnce(1);

        
    }
    catch(err){
        console.log(err);
    }
    }


  return (
    <div>
    {urlValid?<section className='pass-reset-section'>
    <h1>Issue Tracker</h1>
    <div  className='pass-reset-container'>
        <h4 className='pr-paragraph'>Password Reset</h4>
        
        <form className='form' action="submit" onSubmit={onSubmit}>
            <div className='password'>
                {errorMessage==='password'?<p  className='error-paragraph'>Password must contain a number, a capital Letter, and be under 6 characters</p>:""}
                <FontAwesomeIcon className='icon' icon={faLock} />
                <input type="password" placeholder='New password' onChange={passwordChange} value={password} />
                </div>
            <div className='secondary-password'>
                {errorMessage==='repeat'?<p  className='error-paragraph'>Passwords do not match</p>:""}
                <FontAwesomeIcon className='icon' icon={faLock} />
                <input type="password" placeholder='Repeat' onChange={passwordRepeatChange} value={passwordrepeat}  />
                </div>
            <div className='form-submit'>
                {errorMessage==='error'?<p  className='error-paragraph'>Error occured, please try again later</p>:""}
                {errorMessage==='sent'?<h4 className='password-changed-paragraph'>Password sucessfully changed</h4>:""}
                <input className='btn' type="submit" value='Continue' />
                <br />
                <Link className='login-paragraph' to="/login">Log in?</Link>
            </div>

            
        </form>
    </div>
   <h2 className="footer">@ 2022 <span>Stefan Nidzovic</span></h2>
</section>:<h1>Error404 Link has expired</h1>}
</div>
  )
}

export default PasswordReset