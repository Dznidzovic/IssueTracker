import React from 'react'
import '../../styles/Administration/administration.css'
import { useState,useRef,useEffect } from 'react';
import { useNavigate} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faBug,faTv,faTicket,faBook,faBars,faArrowLeft,faArrowRight,faEllipsis} from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';



const Administration = () => {

  const token = window.sessionStorage.getItem("token");
  const navigate = useNavigate();
  const [width, setwidth] = useState(0);
  const [isAdmin,setisAdmin] = useState(false);
  const [currentLoggedIn, setcurrentLoggedIn] = useState("");
  const [accessAllowedState, setaccessAllowedState] = useState(false);
  const [menuState, setmenuState] = useState("administrator");
  const [storeUsers, setstoreUsers] = useState();
  const [selectedUser, setselectedUser] = useState();
  const [firstName, setfirstName] = useState("");
  const [secondName, setSecondName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [authorizationLevel, setauthorizationLevel] = useState("admin");
  const [errorMessage,setErrorMessage] = useState("");
  const [errorMessageSecond, seterrorMessageSecond] = useState()

  useEffect(()=>{
    const configuration = {
      method:"get",
      url:"http://localhost:4000/dashboard/get-users"
    }
    axios(configuration)
    .then(res=>{
      console.log(res)
      setstoreUsers(res.data.users);
    })
    .catch(err=>{
      console.log(err);
    });
  },[])

//Making sure the first letter of the names is capital, regardles of what the user types in
const firstLetterCapital = (info)=>{
  return info.charAt(0).toUpperCase() + info.slice(1,info.length);
}

  const onSubmitFnc = (e)=>{
    const previousName = e.target.parentNode.parentNode.children[1].children[0].textContent;

    
    const id = selectedUser._id;
    if(authorizationLevel==="admin"){
      var admin = true;
    }
    else{
      admin = false;
    }

    if(firstName.length===0 || secondName.length===0 || phoneNumber.length ===0 || email.length===0){
      setErrorMessage(true);
      return;
    }
    //Trim empty spaces
    const firstNametrimmed = firstName.trim();
    const secondNametrimmed = secondName.trim();
          
    //Making sure names start with a capital letter
    const firstname = firstLetterCapital(firstNametrimmed);
    const secondname = firstLetterCapital(secondNametrimmed);

    const configuration = {
      method:"put",
      url:"http://localhost:4000/administration/edit-user",
      data:{
        previousName,
        id,
        firstname,
        secondname,
        phoneNumber,
        email,
        admin
      }
    }
    axios(configuration)
    .then((res)=>{
      console.log(res);
      setstoreUsers(res.data.allusers);
      setselectedUser();
      seterrorMessageSecond(false);
      setErrorMessage(false);
      setfirstName("");
      setSecondName("");
      setPhoneNumber("");
      setEmail("");
      
    })
    .catch((err)=>{
      console.log(err);
      setErrorMessage(true);
    })
  }
  const deleteUserFunction = () =>{
      const username  = selectedUser.firstName + " " + selectedUser.secondName;
      const id = selectedUser._id;
      if(username === currentLoggedIn){
      console.log("isti su")
      seterrorMessageSecond(true);
      setErrorMessage(true);
      return;
    }
    const configuration = {
      method:"delete",
      url:"http://localhost:4000/administration/delete-user",
      data:{
        id
      }
    }
    axios(configuration)
    .then((res)=>{
      console.log(res);
      setstoreUsers(res.data.allusers)
      setselectedUser();
    })
    .catch((err=>{
      
      console.log(err);
    }))
  }

  useEffect(() => {
    
    const configuration = {
        method: "get",
        url: "http://localhost:4000/auth-endpoint",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      axios(configuration)
    .then((res)=>{
      console.log(res)
      const currentUser = res.data.firstName+" "+res.data.secondName;
      setcurrentLoggedIn(currentUser);
      setisAdmin(res.data.admin);
      setaccessAllowedState(true);
    })
    .catch((err)=>{
      console.log(err)
      setaccessAllowedState(false);
    })
    
  
}, [])


  //Fetching current window dimensions
function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}
//Returns window dimensions when the page size changes
function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
      setwidth(getWindowDimensions().width);
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
      setwidth(getWindowDimensions().width);
      
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [])
  
return windowDimensions.width;
};
useWindowDimensions();

const logOutFunction = ()=>{
  window.sessionStorage.setItem("token","");
  navigate("/login");
}
 const changeMenuState = (value)=>{
  setmenuState(value);
}

const changeDivColorOnClick = (e)=>{
  if(!e.target.children[0]){
    const currentUser = e.target.textContent;
    storeUsers.forEach(user => {
      const fullUserName = user.firstName + " " + user.secondName;
      if(fullUserName===currentUser){
        setselectedUser(user)
      }
      });
    const usersDivs = document.querySelectorAll(".div2");
    for (let i = 0;i<usersDivs.length;i++){
    if(usersDivs[i].children[0].textContent===currentUser){
      usersDivs[i].style.backgroundColor =  '#7CB9E8';
      usersDivs[i].children[0].style.color = "white";
    }
    else{
      usersDivs[i].style.backgroundColor = 'white';
      usersDivs[i].children[0].style.color = "#707070"
    }
  }
    return;
  }

  const currentUser = e.target.children[0].textContent;
  storeUsers.forEach(user => {
    console.log(user);
    const fullUserName = user.firstName + " " + user.secondName;
    if(fullUserName===currentUser){
      setselectedUser(user);
      console.log(user);
    }
    });
  const usersDivs = document.querySelectorAll(".div2");
  for (let i = 0;i<usersDivs.length;i++){
    if(usersDivs[i].children[0].textContent===currentUser){
      usersDivs[i].style.backgroundColor =  '#7CB9E8';
      usersDivs[i].children[0].style.color = "white";
    }
    else{
      usersDivs[i].style.backgroundColor = 'white';
      usersDivs[i].children[0].style.color = "#707070"
    }
  }

  }
  const authorizationChange = (e)=>{
    setauthorizationLevel(e.target.value);
    console.log(e.target.value);
  }

  return (
    <div  className='administrator-page-container'>
     <section style={width>1100?{}:menuState==="menu"?{}:{display:"none"}}  className='sidebar-section'>
      <div className='sidebar-container'>
        <div className='sidebar-logo'>
          <ul className='logo-ul'>
            <li>
            <FontAwesomeIcon className='bug-icon' icon={faBug}/>
            </li>
            <li>
              <h1>Bug Tracker</h1>
            </li>
          </ul>
        </div>
        <div className="sidebar-ul">
        <ul className='sidebar1-ul'>
          <li className='sidebar1-li'>
            <FontAwesomeIcon className='icon' icon={faTv}/>
          </li>
          <li className='sidebar1-li' onClick={()=>{
            navigate('/auth')
          }}>
            <p>Dashboard</p>
          </li>
        </ul>
        <ul className='sidebar2-ul'>
          <li className='sidebar2-li'>
          <FontAwesomeIcon className='icon' icon={faTicket}/>
          </li>
          <li onClick={()=>{
           navigate('/auth/tickets');
          }} className='sidebar2-li'>
            <p>Tickets</p>
          </li>
        </ul>
        {isAdmin?<ul  className='sidebar3-ul'>
          <li className='sidebar3-li'>
            <FontAwesomeIcon className='icon' icon={faBook}/>
          </li>
          <li className='sidebar3-li'>
            <p onClick={()=>{
           changeMenuState('administrator');
            }} >Administrator</p>
          </li>
        </ul>:""}
        </div>
        <button onClick={logOutFunction} className='log-out-button'>Log out</button>
      </div>
    </section>
    <section className="upper" style={width<1100?menuState==="administrator"?{}:{display:"none"}:{}} >
    <div  className='header-container'>
            <FontAwesomeIcon onClick={()=>{
                changeMenuState("menu");
            }
                
            }  style={width>1100?{display:"none"}:{}} className='icon' icon={faBars}/>
            <h1>Administration </h1>
        </div>
    <div className='administrator-container'>
      <div className='devs-container'>
            <div className="div1">
              <h1>Organization</h1>
            </div>
         
           {storeUsers?storeUsers.map((users,id)=>{
             return <div onClick={changeDivColorOnClick} key={`div${id}`} className="div2">
              <p key={`paragraph${id}`}>{users.firstName} {users.secondName}</p>
            </div>
            }):""}  

      </div>

    </div>
    <div className="edit-user-container">
      <div className="edit-div1">
        <h1>Edit user Information</h1>
      </div>
      <div className="edit-div2">
        {selectedUser?<h1>{selectedUser.firstName+" "+selectedUser.secondName}</h1>:""}
        {errorMessage?!errorMessageSecond?<h1 style={{color:"red"}} >Either the form is empty or details are already used</h1>:<h1 style={{color:"red"}}>Can't delete yourself</h1>:""}
      </div>
    
    {selectedUser?
    <div className="edit-div3">
      <div className="input1">
        <label htmlFor="firstName">First Name</label>
        <input onChange={(e)=>{
          setfirstName(e.target.value)
        }} value={firstName} type="text" placeholder={selectedUser.firstName} />
      </div>
      <div className="input2">
        <label htmlFor="firstName">Second Name</label>
        <input onChange={(e)=>{
          setSecondName(e.target.value);
        }} value={secondName} type="text" placeholder={selectedUser.secondName} />
      </div>
    </div>:""}
    {selectedUser?
    <div className="edit-div3">
      <div className="input1">
        <label htmlFor="firstName">Phone</label>
        <input onChange={(e)=>{
          setPhoneNumber(e.target.value)
        }} value={phoneNumber} type="text" placeholder={selectedUser.phoneNumber} />
      </div>
      <div className="input2">
        <label htmlFor="authorization">Authorization </label>
        <select onChange={(e)=>{
          authorizationChange(e);
        }}  name="authorization" id="authorization">
          <option className='option' value="admin">Admin</option>
          <option value="developer">Developer</option>
        </select>
      </div>

    </div>:""}
    {selectedUser?
    <div className="edit-div3">
      <div className="input1">
        <label htmlFor="firstName">Email</label>
        <input onChange={(e)=>{
          setEmail(e.target.value);
        }} value={email} className='email' type="text" placeholder={selectedUser.email} />
      </div>
    </div>:""}
    {selectedUser?
    <div className='edit-div4'>
      <button className='button-1' onClick={onSubmitFnc}>Submit</button>
      <button className='button-2' onClick={deleteUserFunction}>Remove</button>
    </div>:""}
    </div>
    </section>
    </div>
  )
}

export default Administration