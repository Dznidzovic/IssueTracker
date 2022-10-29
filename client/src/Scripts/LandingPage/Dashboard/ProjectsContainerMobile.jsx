import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faArrowRight,faArrowLeft,faTrash} from '@fortawesome/free-solid-svg-icons'
import { useState,useEffect } from 'react'
import axios from 'axios'
import '../../../styles/LandingPage/Dashboard/projectContainerMobile.css'


//READ ALL THE COMMENTS IN THE PROJECTSCONTANER COMPONENT, THEY WORK THE SAME WAY, JUST DIFFERENT HTML DISPLAY.
const ProjectsContainerMobile = ({width,openProjectMenu,projects,setProjects,indexesForDisplay,setindexesForDisplay
  ,leftArrowState,setLeftArrowState,rightArrowState,setRightArrowState,changeProjectDetailsState,changeCurrentProjectName,saveAllProjects}) => {
    const [searchState, setsearchState] = useState(false);
    const [emptySearch, setemptySearch] = useState(false);
  useEffect(() => {
    const configuration={
      method:"get",
      url:"http://localhost:4000/dashboard/get-projects"
    }
    axios(configuration)
    .then((res)=>{
      setProjects(res.data.projects);
      if(!res.data.projects[2]){
        
        setRightArrowState(false);
      }
      else {
        
        setRightArrowState(true);
      }
      
    })
    .catch((err)=>console.log(err));

}, [])
  //If clicked on the arrow right, check if there are more projects and based on that allow display change or disable the button
  const changeIndexesForDisplayNext = ()=>{
    if(!projects[indexesForDisplay[0]+2]){
      
      return;
    }
    if(!projects[indexesForDisplay[0]+4]){
     
      setRightArrowState(false);
    }
    setLeftArrowState(true);
    setindexesForDisplay([indexesForDisplay[0]+2,indexesForDisplay[1]+2]);
  }
  //If clicked on the arrow left, to display previous project, change the indexes of the indexesForDisplay array
  const changeIndexesForDisplayPrevious = ()=>{
    
    if(indexesForDisplay[0]===0){
      
      return;
    }
    if(indexesForDisplay[0]-2===0){
     
      setLeftArrowState(false);
    }
    setRightArrowState(true);
    setindexesForDisplay([indexesForDisplay[0]-2,indexesForDisplay[1]-2]);
  }
  const deleteProject = (e)=>{
   
    
    const id = projects[indexesForDisplay[0]]._id;
    const configuration = {
      method:"delete",
      url:"http://localhost:4000/dashboard/delete-project",
      data:{
          id
      }
      
    }
    axios(configuration)
    .then(res=>{
      const newProjects = res.data.newProjects;
      console.log(res);
      const index = projects.indexOf(projects[indexesForDisplay[0]]);
      if(indexesForDisplay[0]===0){
        setLeftArrowState(false);
      }
      if(!newProjects[indexesForDisplay[0]] && indexesForDisplay[0]!==0){
        setindexesForDisplay([indexesForDisplay[0]-2,indexesForDisplay[1]-2]);
      }
      if(searchState && !projects[indexesForDisplay[1]] && indexesForDisplay[0]!==0){
        setindexesForDisplay([indexesForDisplay[0]-2,indexesForDisplay[1]-2]);
        setLeftArrowState(false);
      }
      if(!projects[indexesForDisplay[1]+2]){
        setRightArrowState(false);
      }
      setProjects([...projects.slice(0,index),...projects.slice(index+1,projects.length)],true,true,projects[indexesForDisplay[0]]);

    })
    .catch(err=>console.log(err));
    
  }
  const deleteProjectSecond = (e)=>{
   
    
    const id = projects[indexesForDisplay[1]]._id;
    const configuration = {
      method:"delete",
      url:"http://localhost:4000/dashboard/delete-project",
      data:{
          id
      }
      
    }
    axios(configuration)
    .then(res=>{
      console.log(res);
     
      const index = projects.indexOf(projects[indexesForDisplay[1]]);
      if(indexesForDisplay[0]===0){
        setLeftArrowState(false);
      }
      if(!projects[indexesForDisplay[1]+2]){
        setRightArrowState(false);
      }
      setProjects([...projects.slice(0,index),...projects.slice(index+1,projects.length)],true,true,projects[indexesForDisplay[1]]);

    })
    .catch(err=>console.log(err));
    
  }
  return (
    <section  className='project-mobile-section'>
      <div style={width<1100?{}:{display:"none"}}  className='projects-container'>
        <div className='div1'>
          <h1 className='div1-h1'>Projects</h1>
          <input type="text" placeholder='Search' className='search-input'  onChange={(e)=>{
              setLeftArrowState(false);
              setindexesForDisplay([0,1]);
              setsearchState(true);
              let tmpArray = [];

              saveAllProjects.forEach((project,id)=>{
                
                if(!(project.projectName.toLowerCase().search(e.target.value.toLowerCase()))){
                  
                  tmpArray.push(project);
                }
                if(tmpArray.length===0){
                  setemptySearch(true);
                }
                else{
                  setemptySearch(false);
                }
                if(e.target.value===""){
                  setsearchState(false);
                }
                if(tmpArray.length>2){
                  setRightArrowState(true);
                }
                if(tmpArray.length<3){
                  setRightArrowState(false);
                }
              }); 
              
              setProjects(tmpArray,true);
            }} />
          <button  onClick={openProjectMenu} className='div1-button'>New Project</button>
      </div>
        {!projects[0]?<p className='add-new-projects-paragraph'>{emptySearch?"No projects Found":"Add New Projects"}</p>:""}
        {projects[indexesForDisplay[0]]?<div className="project ">
        <div className="div2">
            <p >Name:</p>
            <p className='name' onClick={()=>{
              changeProjectDetailsState();
              changeCurrentProjectName(projects[indexesForDisplay[0]].projectName)
            }} >{projects[indexesForDisplay[0]].projectName}</p>
            <div onClick={(e)=>{
                deleteProject(e);
               }}><FontAwesomeIcon  className='trash-btn' icon={faTrash}/></div>
            
        </div>

        <div className="div2">
          
            <p>Description:</p>
            <p className='desc-p'>{projects[indexesForDisplay[0]].projectDescription}</p>
        
        </div>
       
        <div className="div2 contributors-div">
            <p>Contributors:</p>
            <div>
              {projects[indexesForDisplay[0]].contributors.map((contributor,id)=>{
                return <p key={`contributor${id}`}>{contributor}</p>
              })}
            </div>
        </div>
        </div>:""}
        
        
        {projects[indexesForDisplay[1]]?<div className="project project-2 ">
        <div className="div2">
            <p >Name:</p>
            <p  className='name'onClick={()=>{
              changeProjectDetailsState();
              changeCurrentProjectName(projects[indexesForDisplay[1]].projectName)
            }} >{projects[indexesForDisplay[1]].projectName}</p>
             <div onClick={(e)=>{
                deleteProjectSecond(e);
               }}><FontAwesomeIcon  className='trash-btn' icon={faTrash}/></div>
        </div>
        <div className="div2">
            <p>Description:</p>
            <p className=" desc-p">{projects[indexesForDisplay[1]].projectDescription}</p>
        </div>
        <div className="div2">
            <p>Contributors:</p>
              <div>
              {projects[indexesForDisplay[1]].contributors.map((contributor,id)=>{
                return <p key={`contributor${id}`}>{contributor}</p>
              })}
              </div>
        </div>
        </div>:""}
      
        <div style={projects[0]?{}:{display:"none"}} className="div4">
         <FontAwesomeIcon  onClick={changeIndexesForDisplayPrevious} icon={faArrowLeft} className={`div4-arrow-left ${leftArrowState?`div4-arrow-enable`:`div4-arrow-disable`}`}/>
         <FontAwesomeIcon  onClick={changeIndexesForDisplayNext} icon={faArrowRight} className={`div4-arrow-right ${rightArrowState?`div4-arrow-enable`:`div4-arrow-disable`}`}/>
        </div>
      </div>

    </section>
  )
}

export default ProjectsContainerMobile