import React from 'react'
import "../../../styles/LandingPage/ProjectDetails/project-details.css"
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faArrowRight,faArrowLeft,faTrashCan, faTicketAlt,faTrash} from '@fortawesome/free-solid-svg-icons'
import { useState,useEffect } from 'react'
import axios from 'axios'
import NewMember from './NewMember'
import { useRef } from 'react'
import NewTicket from './NewTicket'

const ProjectDetailsMobile = ({width,currentProjectName,addNewMemberState,changeNewMemberState,projectUsers,changeProjectUsers,
tickets,changeNewTicketState,newTicketState,setNewTickets,currentLoggedIn,saveAllTickets}) => {
  const [leftArrowState,setLeftArrowState] = useState(false);
  const [rightArrowState, setrightArrowState] = useState(false);
  const [indexesForDisplay, setindexesForDisplay] = useState([0,1,2]);
  const projectDetailsRef = useRef();
  const [maximumDevs, setmaximumDevs] = useState(false);
  const [searchState, setsearchState] = useState(false);
  const [emptySearchState, setemptySearchState] = useState(false);
  const [ticketInfoState, setticketInfoState] = useState(false);
  const [ticketInfoData, setticketInfoData] = useState();
  const [addClassState, setaddClassState] = useState([false,false,false]);
  const [commentText, setcommentText] = useState("");
  const [comments, setcomments] = useState();
  const [commentIndexesForDisplay, setcommentIndexesForDisplay] = useState([0,1,2]);
  const [leftArrowCommentState, setLeftArrowCommentState] = useState(false);
  const [rightArrowCommentState, setRightArrowCommentState] = useState(false);

  
//Used to store string from comment input and change based on input of the user
const changeCommentText = (e)=>{
  setcommentText(e.target.value);
}


  const changeMaximumDevs = (value) =>{
    console.log(value);
    setmaximumDevs(value);
    console.log(maximumDevs)
  }


//Used to display info of the ticket we clicked on
const changeTicketInfo = (e)=>{
  
  if(e.target.parentNode.children[0].children[1]){
    
    setaddClassState([true,false,false]);
    const ticketTitle = e.target.parentNode.children[0].children[1].children[0].textContent;
    setticketInfoState(true);
    
    const configuration = {
      method:"get",
      url:"http://localhost:4000/dashboard/project-details/get-tickets",
      
    }
    //fetch the ticket and see if it matches the ticketwe clicked on
    axios(configuration)
    .then(res=>{
  
      const tickets = res.data.tickets;
      tickets.forEach((ticket)=>{
        if(ticket.ticketTitle===ticketTitle){
          setticketInfoData(ticket);
        }
      })
    })
    .catch(err=>console.log(err));
    }
}
//Once the user clicks on the ticket, display the chosen ticket in the ticket info container and change the background color of the di
const changeTicketInfoSecond = (e)=>{
  
  if(e.target.parentNode.children[0].children[1]){
    
    setaddClassState([false,true,false]);
    const ticketTitle = e.target.parentNode.children[0].children[1].children[0].textContent;
    setticketInfoState(true);
    
    const configuration = {
      method:"get",
      url:"http://localhost:4000/dashboard/project-details/get-tickets",
      
    }
    //fetch the ticket and see if it matches the ticketwe clicked on
    axios(configuration)
    .then(res=>{
  
      const tickets = res.data.tickets;
      tickets.forEach((ticket)=>{
        if(ticket.ticketTitle===ticketTitle){
          setticketInfoData(ticket);
        }
      })
    })
    .catch(err=>console.log(err));
    }
    else{

    }
}
const changeTicketInfoThird = (e)=>{
  
  if(e.target.parentNode.children[0].children[1]){
    
    setaddClassState([false,false,true]);
    const ticketTitle = e.target.parentNode.children[0].children[1].children[0].textContent;
    setticketInfoState(true);
    
    const configuration = {
      method:"get",
      url:"http://localhost:4000/dashboard/project-details/get-tickets",
      
    }
    //fetch the ticket and see if it matches the ticketwe clicked on
    axios(configuration)
    .then(res=>{
  
      const tickets = res.data.tickets;
      tickets.forEach((ticket)=>{
        if(ticket.ticketTitle===ticketTitle){
          setticketInfoData(ticket);
        }
      })
    })
    .catch(err=>console.log(err));
    }
}

//Managing display indexes for comments
const changeCommentIndexesForDisplayNext = ()=>{
  if(!comments[commentIndexesForDisplay[2]+1]){
    return;
  }
  if(!comments[commentIndexesForDisplay[2]+4]){
    setRightArrowCommentState(false);
   
  }
  setLeftArrowCommentState(true);
  setcommentIndexesForDisplay([commentIndexesForDisplay[0]+3,commentIndexesForDisplay[1]+3,commentIndexesForDisplay[2]+3]);
}
const changeCommentIndexesForDisplayPrevious = ()=>{
  if(commentIndexesForDisplay[0]-3===0){
    setLeftArrowCommentState(false);
    
  }
  if(commentIndexesForDisplay[0]===0){
    return;
  }
  
  setRightArrowCommentState(true);
  setcommentIndexesForDisplay([commentIndexesForDisplay[0]-3,commentIndexesForDisplay[1]-3,commentIndexesForDisplay[2]-3]);
}

const onCommentSubmit = () =>{
  const text = commentText;
  const author = currentLoggedIn;
  const configuration = {
    method:"post",
    url:"http://localhost:4000/dashboard/project-details/create-comment",
    data:{
      currentProjectName,
      author,
      text
    }
  }
  axios(configuration)
  .then(res=>{
    console.log(res)
    if((comments.length+1)%3===1){
      setRightArrowCommentState(true); 
    }
    setcomments([...comments,res.data.newComment]);
    setcommentText("");
  })
  .catch(err=>console.log(err));
}



  //Get the project based on currentProjectName, then based on project contributors get all the users which names correspond to contributors and display those users
  useEffect(() => {
  
    const funkcija = ()=>{
      const configuration = {
      url:"http://localhost:4000/dashboard/project-details/get-project",
      method:"post",
      data:{
        currentProjectName
      }
    }
    axios(configuration)
    .then((res)=>{
      

      const contributors = res.data.project.contributors;
    
      const configuration  = {
        url:"http://localhost:4000/dashboard/project-details/get-users-contributors",
        method:"post",
        data:{
          contributors
        }
      }
      axios(configuration)
      .then((res)=>{
        if(!res.data.users[2]){
         
        }
      
        changeProjectUsers(res.data.users);
      })
      .catch(err=>{
        console.log(err);
      })
        })
    .catch(err=>console.log(err));
    }
    funkcija();
   
  }, [])
//Get all the tickets
useEffect(() => {

    const configuration = {
        method:"get",
        url:"http://localhost:4000/dashboard/project-details/get-tickets"
    }
    axios(configuration)
    .then((res)=>{
      const ticketsToDisplay = [];
      const tickets = res.data.tickets
      for(let i = 0;i<tickets.length;i++){
        if(tickets[i].projectName===currentProjectName){
          ticketsToDisplay.push(tickets[i]);
        }
      }
      setNewTickets(ticketsToDisplay);
      setLeftArrowState(false);
      if(ticketsToDisplay.length>3){
        setrightArrowState(true);
      }
      else{
        setrightArrowState(false);
      }
    })

  
}, [])

useEffect(() => {
  const configuration = {
    method:"post",
    url:"http://localhost:4000/dashboard/project-details/get-comments",
    data:{
      currentProjectName
    }
  }
  axios(configuration)
  .then(res=>{
    console.log(res);
    setcomments(res.data.comments);
     
    const length = res.data.comments.length-1;
    //Following code is for making sure comments are displayed from the most recent one to the lates
    if(length===-1){
      setcommentIndexesForDisplay([0,1,2]);
    }
    
    else if((length+1)%3===0){
      setcommentIndexesForDisplay([length-2,length-1,length]);
    }
    else if((length+1)%3===1){
      
      setcommentIndexesForDisplay([length,length+1,length+2]);
    }
    else if((length+1)%3===2){
      setcommentIndexesForDisplay([length-1,length,length+1]);
    }
    //Disable right arrow
    setRightArrowCommentState(false);
    //Enable left arrow
    if(length>=3){
      setLeftArrowCommentState(true);
    }
  })
  .catch(err=>{
    console.log(err);
  });
}, [])

const changeIndexesForDisplayNext = ()=>{
  if(!tickets[indexesForDisplay[2]]){
    return;
  }
  if(!tickets[indexesForDisplay[2]+3]){
    setrightArrowState(false);
   
  }
  setLeftArrowState(true);
  setindexesForDisplay([indexesForDisplay[0]+3,indexesForDisplay[1]+3,indexesForDisplay[2]+3]);
}
const changeIndexesForDisplayPrevious = ()=>{
  if(indexesForDisplay[0]-3===0){
    setLeftArrowState(false);
    
  }
  if(indexesForDisplay[0]===0){
    return;
  }
  
  setrightArrowState(true);
  setindexesForDisplay([indexesForDisplay[0]-3,indexesForDisplay[1]-3,indexesForDisplay[2]-3]);
}
const deleteMember = (e)=>{
  const member = e.target.parentNode.parentNode.parentNode.children[0].textContent;
  console.log(member);
 const configuration = {
    method:"delete",
    url:"http://localhost:4000/dashboard/project-details/delete-member",
    data:{
      currentProjectName,
      member
    }
  }
  axios(configuration)
  .then((res)=>{
   changeProjectUsers(res.data.updatedProjectUsers);
  })
  .catch(err=>console.log(err));
}
const ticketDelete = (e)=>{
  let ticket = ''
  if(!e.target.parentNode.parentNode.parentNode.children[1]){
    console.log("aaaa")
    return;
  }
  
  ticket = e.target.parentNode.parentNode.parentNode.children[1].textContent;

  const configuration = {
    method:"delete",
    url:"http://localhost:4000/dashboard/project-details/ticket-delete",
    data:{
        ticket
    }
  }
  axios(configuration)
  .then(res=>{
    const newTickets = [];
    const deletedTicket = res.data.deletedTicket;
    //Remove ticket info display when the ticket is deleted
    if(ticketInfoData){
      if(deletedTicket.ticketTitle===ticketInfoData.ticketTitle){
        setticketInfoData();
      }
    }
   //Filter tickets for display based on the project they belong to
    res.data.newTickets.forEach(ticket=>{
      if(ticket.projectName===currentProjectName){
        newTickets.push(ticket);
      }
    })
    if(res.data.newTickets.length===0){
      
    }
    //If the only ticket on the page is deleted, update indexesForDisplay and arrowleft
    if(!newTickets[indexesForDisplay[0]] && indexesForDisplay[0]!==0){
      setindexesForDisplay([indexesForDisplay[0]-3,indexesForDisplay[1]-3,indexesForDisplay[2]-3]);
      if(indexesForDisplay[0]-3===0){
        setLeftArrowState(false);
      }
    }

    if(!newTickets[indexesForDisplay[0]+3]){
      setrightArrowState(false);
    }
    //If search is initiated, find the index of the ticket to be deleted, than remove it from the array and change the tickets and saveAllTickets array
    if(searchState){
      let index = 0;
      tickets.forEach((ticket,id)=>{
        if(ticket.ticketTitle===deletedTicket.ticketTitle){
          index = id;
        }
      })
      const ticketsForDisplay = [...tickets.slice(0,index),...tickets.slice(index+1,tickets.length)];
      if(!ticketsForDisplay[indexesForDisplay[0]] && indexesForDisplay[0]!=0){
        setindexesForDisplay([indexesForDisplay[0]-3,indexesForDisplay[1]-3,indexesForDisplay[2]-3]);
        if(indexesForDisplay[0]-3===0){
          setLeftArrowState(false);
        }
      }
      if(!ticketsForDisplay[indexesForDisplay[0]+3]){
        setrightArrowState(false);
      }
      console.log(ticketsForDisplay);
      setNewTickets(ticketsForDisplay,true,true,deletedTicket);
      return;
      
    }
    setNewTickets(newTickets);
    
  })
  .catch(err=>console.log(err));
    
}
const deleteComment = (e)=>{
  let id = 0;
  const commentText = e.target.parentNode.parentNode.children[0].children[1].textContent;

  for(let i = 0 ;i<comments.length;i++){
    if(commentText===comments[i].text){

      id = comments[i]._id;
   }
  }
  console.log(id);
  const configuration = {
    method:"delete",
    url:"http://localhost:4000/dashboard/project-details/delete-comment",
    data:{
      id
    }
  }
  axios(configuration)
  .then(res=>{
    const deletedComment = res.data.deletedComment;
    let id = 0;
    for(let i = 0;i<comments.length;i++){
      if(comments[i]._id===deletedComment._id){
        id = i;
      }
    }
    console.log("indeks je",id);
    //if the only comment on the page is deleted revert to previous page automatically
    if(!comments[commentIndexesForDisplay[1]] && commentIndexesForDisplay[0]!==0){
      setcommentIndexesForDisplay([commentIndexesForDisplay[0]-3,commentIndexesForDisplay[1]-3,commentIndexesForDisplay[2]-3]);
    }
    setcomments([...comments.slice(0,id),...comments.slice(id+1,comments.length)]);

  })
  .catch(err=>console.log(err));
}


  return (
    <div>
    <section  ref={projectDetailsRef} style={width<1100?{}:{display:"none"}} className='project-details-mobile'>
      <h1 className="project-name">{currentProjectName}</h1>
      <div className='container-1'>
        
        <div className="contributors">
          <div className='div1'>
          <h1 className='contributors-h1'>Team</h1>
          
          <button onClick={()=>{
            changeNewMemberState();
            
            projectDetailsRef.current.style.pointerEvents = "none";
          
            
          }} className='new-member-btn'>New Member</button>
          </div>
          
          <div className="div2">
            <p>Name</p>
            <p className='middle-paragraph'>Email</p>
            <p>Phone</p>
          </div>
          {projectUsers?projectUsers[0]?projectUsers.map((user,id)=>{
        
       
        return <div key={`div${id}`}  className="div3">
        <p key={`contributor${id}`} >{user[0].firstName} {user[0].secondName}</p>
        <p key={`contributordesc${id}`} className='middle-paragraph'>{user[0].email}</p>
        <div className='phone-container'>
        <p key={`contributornum${id}`}>{user[0].phoneNumber}</p>
        <FontAwesomeIcon onClick={(e)=>{
          deleteMember(e);
        }} className='phone-icon' icon={faTrash}/>
        </div>
        </div>
        
       }):"":""}
       {maximumDevs?<p style={{color:"red", fontSize:"0.8em", zIndex:"9999"}}>Maximum 5 developers</p>:""}
        </div>
       {projectUsers.length<1? <div>
        <p className='add-contributors-for-project'>Add contributors for the project</p>
        </div>:""}
      </div>
      
      <div className="container-2">
      <div className='tickets'>
        <div className="div1">
          <h1 className='tickets-h1'>Tickets</h1>
          <input type="text" placeholder='Search' className='search-input' onChange={(e)=>{
          //Search works the same way as project search, so read that first
          setsearchState(true);
          setaddClassState([false,false,false]);
          setLeftArrowState(false);
          setindexesForDisplay([0,1,2]);
       
          const tmpArray = [];
          
          saveAllTickets.forEach((ticket)=>{
            if(!(ticket.ticketTitle.toLowerCase().search(e.target.value.toLowerCase()))){
           
              tmpArray.push(ticket);
            }
          })
          if(tmpArray.length===0){
            setemptySearchState(true);
          }
          else{
            setemptySearchState(false);
          }
          if(e.target.value===""){
            setsearchState(false);
            setemptySearchState(false);
          }
          if(tmpArray.length>3){
            setrightArrowState(true);
          }
          if(tmpArray.length<4){
            setrightArrowState(false);
          }
          setNewTickets(tmpArray,true);}} />
          <button onClick={changeNewTicketState} className='new-ticket-btn'>New Ticket</button>
        </div>
        {tickets?!tickets[0]?<p className='add-new-tickets-p'>{emptySearchState?"No Tickets Found":"Add New Tickets"}</p>:"":""}
        {tickets?tickets[indexesForDisplay[0]]?
        <div className={`${addClassState[0]?`div2-clicked`:``}`}>
          <div onClick={changeTicketInfo} className="div2">
            <p >Ticket Title:</p>
            <div className="title-container">
            <p>{tickets[indexesForDisplay[0]]?tickets[indexesForDisplay[0]].ticketTitle:""}</p>
            <FontAwesomeIcon onClick={ticketDelete} className='trash-icon' icon={faTrash} />
            </div>
          </div>
          <div className='div2'>
            <p >Description:</p>
            <p >{tickets[indexesForDisplay[0]]?tickets[indexesForDisplay[0]].description:""}</p>
          </div>
          <div  className="div2 div2-bottom">
            <p >Ticket Author:</p>
            <p >{tickets[indexesForDisplay[0]]?tickets[indexesForDisplay[0]].ticketAuthor:""}</p>
          </div>
          </div>
          :"":""}
           {tickets?tickets[indexesForDisplay[1]]?<div className={`${addClassState[1]?`div2-clicked`:``}`} >
          <div onClick={changeTicketInfoSecond}  className="div2">
            <p >Ticket Title:</p>
            <div className="title-container">
            <p>{tickets[indexesForDisplay[1]]?tickets[indexesForDisplay[1]].ticketTitle:""}</p>
            <FontAwesomeIcon onClick={ticketDelete} className='trash-icon' icon={faTrash} />
            </div>
          </div>
          <div  className="div2">
            <p >Description:</p>
            <p >{tickets[indexesForDisplay[1]]?tickets[indexesForDisplay[1]].description:""}</p>
          </div>
          <div  className="div2 div2-bottom">
            <p >Ticket Author:</p>
            <p >{tickets[indexesForDisplay[1]]?tickets[indexesForDisplay[1]].ticketAuthor:""}</p>
          </div>
          </div>
          :"":""}
           {tickets?tickets[indexesForDisplay[2]]?<div className={`${addClassState[2]?`div2-clicked`:``}`} >
          <div onClick={changeTicketInfoThird}  className="div2">
            <p >Ticket Title:</p>
            <div className="title-container">
            <p>{tickets[indexesForDisplay[2]]?tickets[indexesForDisplay[2]].ticketTitle:""}</p>
            <FontAwesomeIcon  onClick={ticketDelete} className='trash-icon' icon={faTrash} />
            </div>
          </div>
          <div  className="div2">
            <p >Description:</p>
            <p >{tickets[indexesForDisplay[2]]?tickets[indexesForDisplay[2]].description:""}</p>
          </div>
          <div  className="div2 div2-bottom">
            <p >Ticket Author:</p>
            <p >{tickets[indexesForDisplay[2]]?tickets[indexesForDisplay[2]].ticketAuthor:""}</p>
          </div>
          </div>
          :"":""}
      
          
        {tickets?!tickets[0]?"":<div key={`div$4{id}`} className="div4">
              <FontAwesomeIcon onClick={changeIndexesForDisplayPrevious} className={`div4-arrow-left ${leftArrowState?`arrow-enable`:`arrow-disable`}`} icon={faArrowLeft}/>
              <FontAwesomeIcon onClick={changeIndexesForDisplayNext} className={`div4-arrow-left ${rightArrowState?`arrow-enable`:`arrow-disable`}`} icon={faArrowRight}/>
        </div>:""}
      </div>
      </div>
      <div className='container-3'>
        <h1>Selected Ticket Info</h1>
        {ticketInfoState?ticketInfoData?
        <div className="ticket-info">
          <div className="div1">
            <p>Ticket Title</p>
            <p>{ticketInfoData.ticketTitle}</p>            
          </div>
          <div className="div1">
            <p>Author:</p>
            <p>{ticketInfoData.ticketAuthor}</p>            
          </div>
          <div className="div1">
            <p>Description:</p>
            <p>{ticketInfoData.description}</p>            
          </div>
          <div className="div1">
            <p>Assigned Devs:</p>
            <div>
              {ticketInfoData.assignedDevs.map((dev,id)=>{
                return <p key={`dev${id}`}>{dev}</p>
              })}
          </div>
          </div>
          <div className="div1">
            <div>
              <p>Status</p>
              <p className='state-p'>{ticketInfoData.status}</p>
            </div>
            <div>
              <p>Priority</p>
              <p className='state-p'>{ticketInfoData.priority}</p>
            </div> 
            <div>
              <p>type</p>
              <p className='state-p'>{ticketInfoData.type}</p>
            </div>            
          </div>      

        </div>:<div style={{textAlign:"center"}}>No ticket Selected</div>:""}
      </div>
      <div className="container-4">
        <h1>Comments</h1>
        {comments?
        <div className='comments'>

        {comments[commentIndexesForDisplay[0]]?<div className="comment">
          <div>
              <p>{comments[commentIndexesForDisplay[0]].author}<span>◉{comments[commentIndexesForDisplay[0]].createdAt}</span></p>
              <p className='comment-text'>{comments[commentIndexesForDisplay[0]].text}</p>
          </div>
          <FontAwesomeIcon onClick={deleteComment} className='trash-can-icon'  icon={faTrashCan}/>
        </div>:""}
        {comments[commentIndexesForDisplay[1]]?<div className="comment">
          <div>
              <p>{comments[commentIndexesForDisplay[1]].author}<span>◉{comments[commentIndexesForDisplay[1]].createdAt}</span></p>
              <p className='comment-text'>{comments[commentIndexesForDisplay[1]].text}</p>
          </div>
          <FontAwesomeIcon  onClick={deleteComment} className='trash-can-icon'  icon={faTrashCan}/>
        </div>:""}
        {comments[commentIndexesForDisplay[2]]?<div className="comment">
          <div>
              <p>{comments[commentIndexesForDisplay[2]].author}<span>◉{comments[commentIndexesForDisplay[2]].createdAt}</span></p>
              <p className='comment-text'>{comments[commentIndexesForDisplay[2]].text}</p>
          </div>
          <FontAwesomeIcon onClick={deleteComment} className='trash-can-icon' icon={faTrashCan}/>
        </div>:""}
        </div>:""}
        <div className="input">
          <form action="submit" onSubmit={(e)=>{
            e.preventDefault();
          }} >
            <input type="text" placeholder='Enter Comment Here' onChange={(e)=>{
              changeCommentText(e);
            }} value={commentText} />
            <input className='input-submit' type="submit" onClick={()=>{
              onCommentSubmit();
            }} value='Comment' />
          </form>
        </div>
        {comments?comments.length>0?<div className="div4">
            <FontAwesomeIcon  onClick={changeCommentIndexesForDisplayPrevious} className={` div4-arrow-left ${leftArrowCommentState?`arrow-enable`:`arrow-disable`} `} icon={faArrowLeft}/>
            <FontAwesomeIcon  onClick={changeCommentIndexesForDisplayNext} className={` div4-arrow-right ${rightArrowCommentState?`arrow-enable`:`arrow-disable`}`} icon={faArrowRight}/>
        </div>:"":""}
      </div>
    </section>
    {addNewMemberState?<NewMember setMaximumDevsMobile={changeMaximumDevs} referenceMobile={projectDetailsRef} changeProjectUsers={changeProjectUsers} currentProjectName={currentProjectName} currentUsers={projectUsers} addNewMemberState={addNewMemberState} changeNewMemberState={changeNewMemberState}/>:""}
    {newTicketState?<NewTicket changeTickets={setNewTickets} setRightArrowState={setrightArrowState}  tickets={tickets}  changeNewTicketState={changeNewTicketState} currentProjectName={currentProjectName} ticketAuthor={currentLoggedIn} />:""}
    </div>

  )
}

export default ProjectDetailsMobile