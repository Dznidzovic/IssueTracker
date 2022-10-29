import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faBug,faTv,faTicket,faBook,faXmark,faArrowRight,faArrowLeft,faBars} from '@fortawesome/free-solid-svg-icons'
import { useState,useEffect,useRef } from 'react'
import axios from 'axios';

//Gets the information from the input fields and sends a request to store the new project in the database
const NewProject = ({newProjectMenuState,closeProjectMenu,addNewMemberColorChange,selectedContributors,setSelectedContributors,
  closeWindowFnc,setNewProjects,indexesForDisplay,setRightArrowState}) => {
    const [projectName, setprojectName] = useState("");
    const [projectDescription, setprojectDescription] = useState("");
    const [contributors, setContributors] = useState([]);
    const [errorMessageState, seterrorMessageState] = useState(false);
    const contributorsDivRef = useRef();
    
   
    //Fetch all the current users and store them in the contributors list
    useEffect(()=> {
        const configuration = {
            method: "get",
            url: "http://localhost:4000/dashboard/get-users",
          };
        axios(configuration)
        .then((res)=>{
            setContributors(res.data.users);
        })
        .catch(err=>console.log(err));
      }, [])
    //Updates and stores the value of project name input field
    const changeProjectName = (e)=>{
        
        setprojectName(e.target.value);
    }
    //Updates and stores the value of project description input field
    const changeProjectDescription = (e)=>{
        
        setprojectDescription(e.target.value);
    }
    //Once submitted send a request to store the new project in the database
    const onSubmit = (e)=>{
      console.log(selectedContributors);
      e.preventDefault();
      const configuration = {
        method: "post",
        url: "http://localhost:4000/dashboard/new-project",
        data:{
          projectName,
          projectDescription,
          selectedContributors
        }
        
      };
      axios(configuration)
      .then((res)=>{
        
        //if the request was succcessfull update the projects in project container but fetchin them 
        const configuration = {
          method:"get",
          url:"http://localhost:4000/dashboard/get-projects"
        }
        axios(configuration)
        .then((res)=>{
          setNewProjects(res.data.projects);
          if(!res.data.projects[indexesForDisplay[1]+1]){
            setRightArrowState(false);
          }
          else{
            setRightArrowState(true);
          }
         
        })
        //if the request was successfull close the window
        setprojectName("");
        setprojectDescription("");
        setSelectedContributors([]);
        
        let arrayOfParagraphs = contributorsDivRef.current.querySelectorAll("p");
        for(let i = 0;i<arrayOfParagraphs.length;i++){
          
          arrayOfParagraphs[i].style.color = '#707070';
          arrayOfParagraphs[i].style.backgroundColor = 'white'
        }
        seterrorMessageState(false);
        closeWindowFnc();
        
      
      })
      .catch((err)=>{
        console.log(err);
        seterrorMessageState(true);
      });
    }


  return (
    <div style={newProjectMenuState?{}:{display:"none"}} className='new-project  '>
      <ul className='header-ul'>
        <h1>Add New Project</h1>
        <FontAwesomeIcon className='header-icon' onClick={closeProjectMenu} icon={faXmark}/>
      </ul>
      
      <form action="submit" onSubmit={(e)=>{
        onSubmit(e);
      }}>
        {errorMessageState?<h1 style={{clear:"left" ,color:"#BA0021",fontSize:"0.7em",marginLeft:"1.2em"}} className='error-message'>Can't create projects with the same details</h1>:""}
        <div className="project-name">
          <label htmlFor="project-name">Project Name</label>
          <input type="text" id='project-name' onChange={(e)=>{changeProjectName(e);}} value={projectName} placeholder='Enter Project Name'/>
        </div>
        <div className="project-description">
          <label htmlFor="project-description">Project Description</label>
          <input className='project-description' onChange={(e)=>{changeProjectDescription(e);}} value={projectDescription} placeholder='Enter Project Description' type="text" id='project-description' />
        </div>
        <div className="add-new-team-members">
          <label htmlFor="add-new-team-members" >Add New Team Members</label>
          <div ref={contributorsDivRef} className='add-new-team-members' id="add-new-team-members">
            {contributors.map((contributor,id)=>{
              if(id===0)return <p  onClick={addNewMemberColorChange} key={`contributor${id+1}`} className='first-paragraph'>{contributor.firstName} {contributor.secondName}</p>;
              else if(id!==0)return <p onClick={addNewMemberColorChange} key={`contributor${id+1}`}  >{contributor.firstName} {contributor.secondName}</p>;
            })}
          </div>
        </div>
        <input type="submit" className='new-project-submit-btn' value="Submit" />
      </form>
      
    </div>
  )
}

export default NewProject