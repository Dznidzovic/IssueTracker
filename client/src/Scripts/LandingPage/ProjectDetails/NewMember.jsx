import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faXmark} from '@fortawesome/free-solid-svg-icons'
import { useState,useEffect } from 'react'
import '../../../styles/LandingPage/ProjectDetails/new-member.css'
import axios from 'axios'

const NewMember = ({addNewMemberState,changeNewMemberState,currentUsers,currentProjectName,changeProjectUsers,referenceMobile,referencePc
,setMaximumDevs, setMaximumDevsMobile}) => {

  const [selectedMembersArray, setselectedMembersArray] = useState([]);
  const [availableMembers, setavailableMembers] = useState([]);
  const [allMembersArray, setAllMembersArray] = useState([])
  const [noAvailableMembers,setnoAvailableMembers] = useState(false);
  //Fetch all the available users and display them. If current users are of the same length as the whole database than all the memers are already taken
  useEffect(() => {
   
    const configuration = {
      method:"post",
      url:"http://localhost:4000/dashboard/project-details/get-available-users",
      data:{
        currentUsers
      }
    }
    axios(configuration)
    .then((res)=>{
    //Display available members
    setavailableMembers(res.data.availableUsers);
    const configuration = {
      method:"get",
      url:"http://localhost:4000/dashboard/get-users"
     

    }
    axios(configuration)
    .then((response)=>{
      //If all the users are already taken display no available members message
      if(currentUsers.length === response.data.users.length){
        setnoAvailableMembers(true);
      }
    })
    .catch(err=>console.log(err));
    })
    .catch(err=>console.log(err));

  
}, [])
  //Save the new member in the database. Max 5 developers are allowed per project.
  const onSubmit = ()=>{
      console.log(selectedMembersArray);
      const configuration = {
        method:"put",
        url:"http://localhost:4000/dashboard/project-details/update-contributors",
        data:{
          selectedMembersArray,
          currentProjectName
        }
      }
      axios(configuration)
      .then(res=>{
        //Close the window once submited
        changeNewMemberState();
        //Automatically updated UI when the member is added
        changeProjectUsers(res.data.returnUpdatedUsers);
        //Disable all the events in the background
        if(referenceMobile){
          referenceMobile.current.style.pointerEvents = "";
        }
        if(referencePc){
          referencePc.current.style.pointerEvents = ""
        }
       
    
      })
      .catch(err=>
        {console.log(err)
        
        if(err.response.data.message==="Maximum 5 developers"){
          if(setMaximumDevs){
            setMaximumDevs(true);
          }
          if(setMaximumDevsMobile){
            setMaximumDevsMobile(true);
          }
        }
      }
        );
    
  }
  const selectNewMember = (e)=>{
    if(e.target.style.color==="white"){
      e.target.style.color = "#707070";
      e.target.style.backgroundColor = "white";
      let index = selectedMembersArray.indexOf(e.target.textContent);
      
      setselectedMembersArray([...selectedMembersArray.slice(0,index),...selectedMembersArray.slice(index+1,selectedMembersArray.length)])
      return;
    }
    setselectedMembersArray([...selectedMembersArray,e.target.textContent]);
    e.target.style.color = "white";
    e.target.style.backgroundColor = "#6699CC";
  }

  return (
    <section style={addNewMemberState?{}:{display:"none"}} className='new-member-section'>
      <div className='new-member-container'>
        <div className='div1'>
          <h1>Add member</h1>
          <FontAwesomeIcon className='header-icon' onClick={()=>{
            if(setMaximumDevs){
              setMaximumDevs(false);
            }
            if(setMaximumDevsMobile){
              setMaximumDevsMobile(false);
            }
            changeNewMemberState();
            console.log(referencePc);
            if(referenceMobile){
              referenceMobile.current.style.pointerEvents = "";
            }
            if(referencePc){
              
              referencePc.current.style.pointerEvents = ""
            }
          }} icon={faXmark}/>
        </div>
        <div className="add-new-team-members">
          <label htmlFor="add-new-team-member" >Add New Team Members</label>
          <div  className='add-new-team-member' id="add-new-team-member">
            {noAvailableMembers?<p>Everyone is already working on this project</p>:""}
            {availableMembers.map((member,id)=>{
              return <p key={`member${id}`} onClick={selectNewMember}>{member.firstName} {member.secondName}</p>
            })}
          </div>
          
          <input onClick={onSubmit} className='input-submit' type="submit" value="Add member"/>
        </div>
      </div>
    </section>
  )
}

export default NewMember