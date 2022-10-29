import React from 'react'
import { useState,useRef,useEffect } from 'react';
import { useNavigate} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faBug,faTv,faTicket,faBook,faBars,faArrowLeft,faArrowRight,faEllipsis} from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';
import '../../styles/tickets/tickets.css'
import EditTicket from './EditTicket'

const Tickets = ({currentProjectName,setcurrentProjectName,setprojectDetailsState}) => {
const token = window.sessionStorage.getItem("token");
const navigate = useNavigate();
const [width, setwidth] = useState(0);
const [leftArrowState, setleftArrowState] = useState(false);
const [rightArrowState, setrightArrowState] = useState(false);
const [isAdmin,setisAdmin] = useState(false);
const [currentLoggedIn, setcurrentLoggedIn] = useState("");
const [accessAllowedState, setaccessAllowedState] = useState(false);
const [menuState, setmenuState] = useState("tickets");
const [userTickets, setuserTickets] = useState([]);
const [storeAllTickets, setstoreAllTickets] = useState([]);
const [indexesForDisplay, setindexesForDisplay] = useState([]);
const [editTicketState, seteditTicketState] = useState(false);
const [ticketAuthor, setticketAuthor] = useState();
const [currentTicketName, setcurrentTicketName] = useState();

 const pageRef = useRef();

const changeEditTicketState = ()=>{
  seteditTicketState(!editTicketState);
  if(!editTicketState){
    pageRef.current.style.pointerEvents = "none";
  }
  else{
    pageRef.current.style.pointerEvents = "all";
    pageRef.current.querySelectorAll(".tickets")[0].style.pointerEvents = "all";
  }


}

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
      
      const configuration={
        method:"post",
        url:"http://localhost:4000/tickets/user-tickets",
        data:{
          currentUser
        }
      }
      axios(configuration)
      .then(res=>{
        console.log(res);
        const indexesDisplay = [];
        for(let i = 0;i<10;i++){
          indexesDisplay.push(i);
        }
        setindexesForDisplay(indexesDisplay);
        setuserTickets(res.data.userTickets);
        setstoreAllTickets(res.data.userTickets);
        if(res.data.userTickets.length>10){
          setrightArrowState(true);
        }
        
      
      })
      .catch(err=>{
        console.log(err);
      })
    })
    .catch((err)=>{
      console.log(err)
      setaccessAllowedState(false);
    })
    
  
}, [])



const changeMenuState = (text)=>{
    setmenuState(text);
   
  }
  const logOutFunction = ()=>{
    window.sessionStorage.setItem("token","");
    navigate("/login");
  }
//Change next 10 tickets when clicked on right arrow
const changeNextPage = ()=>{
  const newIndexesForDisplay = [];
  if(!userTickets[indexesForDisplay[9]+1]){
    return;
  }
  if(!userTickets[indexesForDisplay[9]+11]){
    setrightArrowState(false);
  }
  setleftArrowState(true);
  for(let i = indexesForDisplay[9]+1;i<=indexesForDisplay[9]+10;i++){
    newIndexesForDisplay.push(i);
  }

  setindexesForDisplay(newIndexesForDisplay);

  

}
const changePreviousPage = ()=>{
  if(indexesForDisplay[0]===0){
    setleftArrowState(false);
    return;
  }
  if(indexesForDisplay[0]-10===0){
    setleftArrowState(false);
  }
  const newIndexesForDisplay = [];

  for(let i = indexesForDisplay[0]-10;i<=indexesForDisplay[9]-10;i++){
    newIndexesForDisplay.push(i);
  }
  setrightArrowState(true);


  setindexesForDisplay(newIndexesForDisplay);

}
  return (
    <div>
    <div ref={pageRef} className='ticket-page-container'>
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
           changeMenuState('tickets')
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
           navigate("/auth/administration") 
            }} >Administrator</p>
          </li>
        </ul>:""}
        </div>
        <button onClick={logOutFunction} className='log-out-button'>Log out</button>
      </div>
    </section>
    <section style={width<1100?menuState==="tickets"?{}:{display:"none"}:{}} className="upper">
        <div  className='header-container'>
            <FontAwesomeIcon onClick={()=>{
                changeMenuState("menu");
            }
                
            }  style={width>1100?{display:"none"}:{}} className='icon' icon={faBars}/>
            <h1>{currentLoggedIn.split(" ")[0]}'s Tickets</h1>
        </div>
        <div className="tickets">
            <div className="div1">
                <h1>Tickets</h1>
                <input type="text" onChange={(e)=>{
            
                  const displayIndexes = [];
                  for(let i = 0;i<10;i++){
                    displayIndexes.push(i);
                  }
                  setindexesForDisplay(displayIndexes);
                  const searchedTickets = [];
                  for(let i = 0;i<storeAllTickets.length;i++){
            
                    if(!(storeAllTickets[i].ticketTitle.toLowerCase().search(e.target.value.toLowerCase()))){
                       searchedTickets.push(storeAllTickets[i]); 
                    }
                  }
          
                  setuserTickets(searchedTickets);
                }} className='search-input' placeholder={"Search Tickets"}  />
            </div>
            <div className="div2">
                <p>Project</p>
                <p>Ticket</p>
                <p className='last-paragraph'>Author</p> 
            </div> 
            {userTickets?indexesForDisplay?indexesForDisplay.map((id)=>{
              if(userTickets[id]){
                return <div key={`ticketdiv${id}`} className="div3">
              <p onClick={(e)=>{
                setcurrentProjectName(e.target.textContent);
                setprojectDetailsState(true);
                navigate("/auth");
              }} key={`ticketproject${id}`} className="first-paragraph">{userTickets[id].projectName}</p>
              <p key={`ticketname${id}`} className="middle-paragraph">{userTickets[id].ticketTitle}</p>
              <div className="author-container">
                <p key={`ticketauthor${id}`}>{userTickets[id].ticketAuthor}</p>
                <FontAwesomeIcon onClick={(e)=>{
                
                  if((e.target.parentNode.parentNode.children[2])===undefined){
                  console.log("aaa")
                  changeEditTicketState();
                  setticketAuthor(e.target.parentNode.parentNode.parentNode.children[2].textContent);
                  setcurrentTicketName(e.target.parentNode.parentNode.parentNode.children[1].textContent);
                  setcurrentProjectName(e.target.parentNode.parentNode.parentNode.children[0].textContent);
                  e.target.parentNode.parentNode.parentNode.parentNode.style.pointerEvents = "none";
                   
                  return;
                  }
                  changeEditTicketState();
                  setticketAuthor(e.target.parentNode.parentNode.children[2].textContent);
                  setcurrentTicketName(e.target.parentNode.parentNode.children[1].textContent);
                  setcurrentProjectName(e.target.parentNode.parentNode.children[0].textContent);
                  e.target.parentNode.parentNode.parentNode.style.pointerEvents = "none";
                }} className='icon' icon={faEllipsis}/>
              </div>
            </div>
              }
            

            }):"":""}
            <div className="div4">
            <FontAwesomeIcon onClick={changePreviousPage} className={`div4-arrow-left ${leftArrowState?`arrow-enable`:`arrow-disable`}`}  icon={faArrowLeft}/>
            <FontAwesomeIcon onClick={changeNextPage} className={`div4-arrow-right ${rightArrowState?`arrow-enable`:`arrow-disable`}`}  icon={faArrowRight}/>
        </div>
        </div>
        
    </section>
   
    </div>
     {editTicketState?<EditTicket setrightArrowState={setrightArrowState} setleftArrowState={setleftArrowState} setIndexesForDisplay={setindexesForDisplay} currentUser={currentLoggedIn}  userTickets={userTickets} setUserTickets={setuserTickets} setStoreAllTickets={setstoreAllTickets} currentTicket={currentTicketName} changeNewTicketState={changeEditTicketState} currentProjectName={currentProjectName} ticketAuthor={ticketAuthor} setRightArrowState={setrightArrowState} />:""}
     </div>
  )
}

export default Tickets