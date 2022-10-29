import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCheck} from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import { Link,useParams } from 'react-router-dom'
import { useEffect } from 'react'
import axios from 'axios'
import '../../styles/verifyemail/verifyemail.css'
//Once the user clicks on the link sent to their email, redirects them to the verification page, if the token is valid, gives us access
const VerifyEmail = () => {
    const [validURL, setvalidURL] = useState(false);
    const params = useParams();
    useEffect(()=>{
      const verifyEmailUrl = async()=>{
        try{
            const response = await axios.get(`http://localhost:4000/${params.id}/verify/${params.token}`);
            console.log(response);
            setvalidURL(true);
        }
        catch(err){
          setvalidURL(false);
        }
      }
      verifyEmailUrl();
    },[params])

  return (
    <div>
      {!validURL?<h1>Eror 404 Link has expired</h1>:<div className='verify-container'>
        <FontAwesomeIcon className='verify-icon' icon={faCheck}/>
        
        <Link to = "/login"><button className='verify-button'>Log in</button></Link>
      </div>}
</div>
  )
}

export default VerifyEmail