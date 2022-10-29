import React from 'react'
import "../../../styles/LandingPage/ProjectDetails/project-details-2.css"
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faArrowRight,faArrowLeft,faTrash,faTrashCan} from '@fortawesome/free-solid-svg-icons'
import { useEffect,useState,useRef} from 'react'
import axios from 'axios'
import NewMember from './NewMember'
import NewTicket from './NewTicket'

//SEARCHING AND DELETING TICKETS WORKS THE SAME WAY AS PROJECTS SO IF CONFUSED READ THAT FIRST

const ProjectDetails = ({width,currentProjectName,addNewMemberState,changeNewMemberState,projectUsers,changeProjectUsers,
tickets,setNewTickets,newTicketState,changeNewTicketState,currentLoggedIn,saveAllTickets}) => {
  const [leftArrowState,setLeftArrowState] = useState(false);
  const [rightArrowState, setrightArrowState] = useState(false);
  const [indexesForDisplay, setindexesForDisplay] = useState([0,1,2]);
  const projectDetailsRef = useRef();
  const [maximumDevs, setmaximumDevs] = useState(false);
  const [searchState, setsearchState] = useState(false);
  const [emptySearchState, setemptySearchState] = useState(false);
  const [ticketInfoState, setticketInfoState] = useState(false);
  const [ticketInfoData, setticketInfoData] = useState();
  const [commentText, setcommentText] = useState("");
  const [comments, setcomments] = useState();
  const [commentIndexesForDisplay, setcommentIndexesForDisplay] = useState([0,1,2]);
  const [leftArrowCommentState, setLeftArrowCommentState] = useState(false);
  const [rightArrowCommentState, setRightArrowCommentState] = useState(false);

  //Used to store string from comment input and change based on input of the user
  const changeCommentText = (e)=>{
    setcommentText(e.target.value);
  }
  
 
 
  //Used to display info of the ticket we clicked on
  const changeTicketInfo = (e)=>{
    if(e.target.children[0]){
      
      const ticketTitle = e.target.children[0].textContent;
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
      const ticketTitle = e.target.parentNode.children[0].textContent;
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

  //Used to display maximum number of devs to be added
  const changeMaximumDevs = (value) =>{
    setmaximumDevs(value);
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
      
      console.log(res);
      const contributors = res.data.project.contributors;
      console.log("ovo su contributori",contributors);
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
  //Get all the tickets, then filter them based on project name and finally display them
  useEffect(() => {
    const ticketsToDisplay = []
    const configuration = {
        method:"get",
        url:"http://localhost:4000/dashboard/project-details/get-tickets"
    }
    axios(configuration)
    .then((res)=>{

      const tickets = res.data.tickets

      for(let i = 0;i<tickets.length;i++){
        if(tickets[i].projectName===currentProjectName){
          ticketsToDisplay.push(tickets[i]);
        }
      }

      //setleft arrow state to false since we are on the first page
      setLeftArrowState(false);
      //Update both tickets and saveAllTickets
      setNewTickets(ticketsToDisplay);
      if(ticketsToDisplay.length>3){
        setrightArrowState(true);
      }
    
    })

  
}, [])
//Used to fetch the comment and display them upon loading
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
    //Enable right arrow
    setRightArrowCommentState(true);
    //Disable left arrow
    setLeftArrowCommentState(false);
  })
  .catch(err=>{
    console.log(err);
  });
}, [])

  
//Maximum 3 tickets per page, we swap pages based on indexesFordisplay array.
//When we want to change the page we +3 every item in the indexesForDisplay array.
//The rest of the code here is used to enable and disable arrows depending if we are on the last or first page
const changeIndexesForDisplayNext = ()=>{
  if(!tickets[indexesForDisplay[2]]){
    return;
  }
  if(!tickets[indexesForDisplay[2]+4]){
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
//Based on the currentProjectName we find the project and than based on member we delete it from the database. Then we return updatedProjects from the database and display it
const deleteMember = (e)=>{
  const member = e.target.parentNode.parentNode.parentNode.children[0].textContent;
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
//This one works a little bit different from project deletion, it's easier to understand this way.
//Basically we divide it to 2 cases, one is when nothing is being searched, the other one is when search is initiated.
//When nothing is being searched, tickets for display and tickets in the database will be the same.
//That means tickets and saveALLTickets will be the same and therefore we delete the same items from them.
//We do not pass any parameters to setNewTicket and delete both the arrays the same.(Read comments on how it works in dashboard component)
//If search is initiated, tickets for display and tickets in database won't be the same, since they were filtered by searching.
//That means that we will have different tickets and saveAllTicketsArray, and we need to delete the same ticket from both of them.
//We pass the corrseponding parameters to setNewTickets function.
const ticketDelete = (e)=>{
  const ticket = e.target.parentNode.parentNode.parentNode.children[0].textContent;
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
      if(!ticketsForDisplay[indexesForDisplay[0]] && indexesForDisplay[0]!==0 ){
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
    <div style={width>1100?{}:{display:"none"}} className='project-details-container'>
    <h1 className='project-name-h1'>{currentProjectName}</h1>
    <section  ref={projectDetailsRef}   className='project-details'>
    
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
        {projectUsers?projectUsers.map((user,id)=>{
        
       
        return <div key={`div${id}`} className="div3">
        <p key={`contributor${id}`}>{user[0].firstName} {user[0].secondName}</p>
        <p key={`contributordesc${id}`} className='middle-paragraph'>{user[0].email}</p>
        <div className='phone-container'>
        <p key={`contributornum${id}`}>{user[0].phoneNumber}</p>
        <FontAwesomeIcon onClick={(e)=>{
          deleteMember(e);
        }} className='phone-icon' icon={faTrash}/>
        </div>
        </div>
        
       }):""}
       {maximumDevs?<p style={{color:"red", fontSize:"0.8em"}}>Maximum 5 developers</p>:""}
      </div>
      {projectUsers.length<1?<div>
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
          setNewTickets(tmpArray,true);
        }} />
        <button onClick={changeNewTicketState} className='new-ticket-btn'>New Ticket</button>
      </div>
      <div className="div2">
        <p>Ticket Title</p>
        <p>Description</p>
        <p>Ticket Author</p>
      </div>
      {tickets?!tickets[0]?<p className='add-new-tickets-p'>{emptySearchState?"No Tickets Found":"Add New Tickets"}</p>:"":""}
      {tickets?tickets[indexesForDisplay[0]]?
      <div onClick={changeTicketInfo}   className='div3'>
        <p>{tickets[indexesForDisplay[0]].ticketTitle}</p>
        <p>{tickets[indexesForDisplay[0]].description}</p>
        <div className='author-container'>
        <p>{tickets[indexesForDisplay[0]].ticketAuthor}</p>
        <FontAwesomeIcon onClick={ticketDelete} className='trash-icon' icon={faTrash}/>
        </div>
      </div>
      :""
      :""}
      {tickets?tickets[indexesForDisplay[1]]?
      <div onClick={changeTicketInfo} className='div3'>
        <p>{tickets[indexesForDisplay[1]].ticketTitle}</p>
        <p>{tickets[indexesForDisplay[1]].description}</p>
        <div className='author-container'>
        <p>{tickets[indexesForDisplay[1]].ticketAuthor}</p>
        <FontAwesomeIcon onClick={ticketDelete}  className='trash-icon' icon={faTrash}/>
        </div>
      </div>
      :""
      :""}
      {tickets?tickets[indexesForDisplay[2]]?
      <div onClick={changeTicketInfo} className='div3'>
        <p>{tickets[indexesForDisplay[2]].ticketTitle}</p>
        <p>{tickets[indexesForDisplay[2]].description}</p>
        <div className='author-container'>
        <p>{tickets[indexesForDisplay[2]].ticketAuthor}</p>
        <FontAwesomeIcon onClick={ticketDelete}  className='trash-icon' icon={faTrash}/>
        </div>
      </div>
      :""
      :""}
      
    
      {tickets?!tickets[0]?"":<div className="div4">
        <FontAwesomeIcon onClick={changeIndexesForDisplayPrevious} className={`div4-arrow-left ${leftArrowState?`arrow-enable`:`arrow-disable`}`} icon={faArrowLeft}/>
        <FontAwesomeIcon onClick={changeIndexesForDisplayNext} className={`div4-arrow-left ${rightArrowState?`arrow-enable`:`arrow-disable`}`} icon={faArrowRight}/>
      </div>:""}
    </div>
    </div>
    
  </section>
  <section className='ticket-info'>
 
  <div className='ticket-info-container'>
    <h1>Selected Ticket Info</h1>
    {ticketInfoState?ticketInfoData?
    
    <div className='ticket-info-container-display'>
    <div className='div1'>
        <div>
            <p>Ticket Title</p>
            <p className='ticket-title-paragraph'>{ticketInfoData.ticketTitle}</p>
        </div>
        <div>
            <p>Author</p>
            <p className='ticket-author-paragraph'>{ticketInfoData.ticketAuthor}</p>
        </div>
        <div>
            <p>Description</p>
            <p className='ticket-description-paragraph'>{ticketInfoData.description}</p>
        </div>
    </div>
    <div className='div1'>
        <div>
            <p>Status</p>
            <p className='ticket-status-paragraph'>{ticketInfoData.status}</p>
        </div>
        <div>
            <p>Priority</p>
            <p className='ticket-priority-paragraph'>{ticketInfoData.priority}</p>
        </div>
        <div>
            <p>Type</p>
            <p className='ticket-type-paragraph'>{ticketInfoData.type}</p>
        </div>
    </div>
    <div className="div1">
        <div>
            <p>Assigned Devs:</p>
            <div>
              {ticketInfoData.assignedDevs.map((dev,id)=>{
                return <p key={`dev${id}`} className='dev-paragraph'>{dev}</p>
              })}
            </div>
        </div>
    </div>
    </div>:<div className='no-tickets-selected-container'>
    <p>No Tickets Selected</p>
    
    </div>:""
    }
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
            onCommentSubmit();
          }}>
            <input type="text" placeholder='Enter Comment Here' onChange={(e)=>{
              changeCommentText(e);
            }} value={commentText} />
            <input className='input-submit' type="submit" value='Comment' />
          </form>
        </div>
        {comments?comments.length>0?<div className="div4">
            <FontAwesomeIcon  onClick={changeCommentIndexesForDisplayPrevious} className={` div4-arrow-left ${leftArrowCommentState?`arrow-enable`:`arrow-disable`} `} icon={faArrowLeft}/>
            <FontAwesomeIcon  onClick={changeCommentIndexesForDisplayNext} className={` div4-arrow-right ${rightArrowCommentState?`arrow-enable`:`arrow-disable`}`} icon={faArrowRight}/>
        </div>:"":""}
      </div>
    
  </section>
  {addNewMemberState?<NewMember  setMaximumDevs={changeMaximumDevs} referencePc={projectDetailsRef} changeProjectUsers={changeProjectUsers} currentProjectName={currentProjectName} currentUsers={projectUsers} addNewMemberState={addNewMemberState} changeNewMemberState={changeNewMemberState}/>:""}
  {newTicketState?<NewTicket setindexesForDisplay={setindexesForDisplay} changeTickets={setNewTickets} setRightArrowState={setrightArrowState} tickets={tickets}  changeNewTicketState={changeNewTicketState} currentProjectName={currentProjectName} ticketAuthor={currentLoggedIn} />:""}
  </div>

)
  
}

export default ProjectDetails