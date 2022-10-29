import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faXmark} from '@fortawesome/free-solid-svg-icons'
import '../../../styles/LandingPage/ProjectDetails/new-tickets.css'
import { useState,useEffect,useRef} from 'react'
import axios from 'axios'
const EditTicket = ({ticketAuthor,currentProjectName,changeNewTicketState,tickets,changeTickets,setRightArrowState}) => {
  const [selectedMembers, setselectedMembers] = useState([]);
  const [statusPriorityTypeArray, setstatusPriorityTypeArray] = useState(["Resolved","Immidiate","Issue"]);
  const [ticketTitle, setticketTitle] = useState("");
  const [ticketDescription, setticketDescription] = useState("");
  const [errorMessageState, seterrorMessageState] = useState(false);
  const [developers, setdevelopers] = useState();

  const statusRef = useRef();
  const PriorityRef = useRef();
  const TypeRef = useRef();

  useEffect(() => {
    const configuration = {
      method:"post",
      url:"http://localhost:4000/dashboard/project-details/get-users-for-tickets",
      data:{
        currentProjectName
      }
    }
    axios(configuration)
    .then(res=>{
      console.log(res);
      const usersForTicket = res.data.usersForTicket;
      setdevelopers(usersForTicket);

    })
    .catch(err=>{
      console.log(err);
    });
  
    
  }, [])
  

  const changeTicketTitle = (e)=>{
    setticketTitle(e.target.value);
  }
  const changeTicketdescription = (e)=>{
    setticketDescription(e.target.value);
  }
  //Adds deletes and changes the display of add developers panel
  const changeColorFnc = (e)=>{
    if(e.target.style.color==="white"){
      e.target.style.backgroundColor = "white";
      e.target.style.color = "#707070";
      const index = selectedMembers.indexOf(e.target.textContent);
      setselectedMembers([...selectedMembers.slice(0,index),...selectedMembers.slice(index+1,selectedMembers.length)])
      return;
    }
    setselectedMembers([...selectedMembers,e.target.textContent]);
    e.target.style.backgroundColor = "#6699CC";
    e.target.style.color = "white";
    

  }
  
//Add new ticket ot the database
  const onSubmit = ()=>{
      const status = statusPriorityTypeArray[0];
      const priority = statusPriorityTypeArray[1];
      const type = statusPriorityTypeArray[2];
      const projectName = currentProjectName;
      const assignedDevs = selectedMembers;
      const configuration = {
        method:"post",
        url:"http://localhost:4000/dashboard/project-details/create-ticket",
        data:{
          projectName,
          ticketTitle,
          ticketAuthor,
          ticketDescription,
          status,
          priority,
          type,
          assignedDevs
        }
      }
      console.log(configuration.data);
      axios(configuration)
      .then((res)=>{
        seterrorMessageState(false);
        //Automatically updated the UI
        changeTickets([...tickets,res.data.newTicket],false,false,[],true,res.data.newTicket);

        //Closes the window once submited
        changeNewTicketState();
        
        //If there are less than 4 tickets on the page, disable the right arrow state 
        if(tickets.length+1<4){
          setRightArrowState(false);
          return;
        }
        //When the new page is initiated based on the number of tickets allow right arrow state
        if ((tickets.length+1)%3===1){
          setRightArrowState(true);
          
        }
      })
      .catch(err=>{
        console.log(err);
        seterrorMessageState(true);
      });
  }

 

  return (
    <section className='new-ticket-section' >
        <div className="new-ticket-container">
          
            <div className="div1">
                <h1>New ticket</h1>
                <FontAwesomeIcon onClick={changeNewTicketState} className='exit-btn' icon={faXmark} />
            </div>
            {errorMessageState?<p className='error-message'>Form either not filled or ticket with this name and description exists</p>:""}
            <div className="div2">
              <label htmlFor="developers">Add Developers</label>
              <div className='developers' id='developers'>
                {developers?developers.map((dev,id)=>{
                  return <p key={`dev${id}`} onClick={changeColorFnc}>{dev.firstName} {dev.secondName}</p>
                })
                :""}
              </div>
            <div className='div3'>
              <select onChange={(e)=>{
                setstatusPriorityTypeArray([e.target.value,statusPriorityTypeArray[1],statusPriorityTypeArray[2]]);
              }} ref={statusRef} className='Status' name="Status" id="status">
                <option value="Resolved">Resolved</option>
                <option value="Pending">Pending</option>
                <option value="New">New</option>              
              </select>
              <select onChange={(e)=>{
                setstatusPriorityTypeArray([statusPriorityTypeArray[0],e.target.value,statusPriorityTypeArray[2]]);
              }} ref={PriorityRef} className='Priority' name="Priority" id="Priority">
                <option value="Immidiate">Immidiate</option>
                <option value="High">High</option>              
                <option value="Low">Low</option>
              </select>
              <select  onChange={(e)=>{
                setstatusPriorityTypeArray([statusPriorityTypeArray[0],statusPriorityTypeArray[1],e.target.value]);
              }}  ref={TypeRef} className='Type' name="Type" id="Type">
                <option  value="Issue">Issue</option>
                <option  value="Bug">Bug</option>              
                <option  value="Feature">Feature</option>
              </select>
            </div>
            <div className="div4">
              <label htmlFor="title">Ticket Title</label>
              <input type="text" id='title' placeholder='Ticket Title' onChange={(e)=>{
                changeTicketTitle(e);
              }} value={ticketTitle} />

          </div>
          <div className="div5">
            <label htmlFor="desc">Ticket Description</label>
            <input type="text" id='desc' placeholder='Ticket Description' onChange={(e)=>{
              changeTicketdescription(e);
            }} value={ticketDescription}/>
          </div>
            <input  onClick={onSubmit} className='submit-btn' type="submit" value={"Submit"} />
            </div>
        </div>
    </section>
  )
}

export default EditTicket