import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faArrowRight,faArrowLeft,faTrash} from '@fortawesome/free-solid-svg-icons'
import { useState,useEffect,useRef} from 'react'
import axios from 'axios'
import "../../../styles/LandingPage/Dashboard/projectContainer.css"
//Container for larger devices(>1100px width)
const ProjectsContainer = ({width,openProjectMenu,projects,setProjects,indexesForDisplay,setindexesForDisplay
,leftArrowState,setLeftArrowState,rightArrowState,setRightArrowState,changeProjectDetailsState,changecurrentProjectName,saveAllProjects}) => {  
  
 const [searchState, setsearchState] = useState(false);
 const [emptySearch, setemptySearch] = useState(false);
 
  

  //Fetch all the users in the database, store them in a list to later display them when choosing new project
  useEffect(() => {
      const configuration={
        method:"get",
        url:"http://localhost:4000/dashboard/get-projects"
      }
      axios(configuration)
      .then((res)=>{
        setProjects(res.data.projects);
        if(res.data.projects.length<2){
          
          setRightArrowState(false);
        }
        else {
          
          setRightArrowState(true);
        }
        
      })
      .catch((err)=>console.log(err));

  }, [])
  //If clicked on the arrow right, to display next project, change the indexes of the indexesForDisplay array
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
  /*This function is fired when the first project in the UI is deleted. Ticket is deleted based on index
  After that UI is updated in 2 ways depending if the project is deleted while searching was active or not.

  */
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
      //Get projects after deletion
      const newProjects = res.data.newProjects;
      //Get index based on indexesfordisplay array
      const index = projects.indexOf(projects[indexesForDisplay[0]]);
      console.log(index)
      //if inndexesForDisplay[0]==0,we then know we are on the first page, therefore disable the left arrow so we can't go back.
      if(indexesForDisplay[0]===0){
        setLeftArrowState(false);
 
      }
      //If a project doesen't exist at index=indexesForDisplay[0] and indexesForDisplay[0]!==0 which means we are not on the first page, that means no projects are left on that page, therefore we revert indexes for display to previous page
      if(!newProjects[indexesForDisplay[0]] && indexesForDisplay[0]!==0){
        setindexesForDisplay([indexesForDisplay[0]-2,indexesForDisplay[1]-2]);
      }
      //projects array is not updated yet, so if the item on index 1 doesen't exist, that means that project array had only one item, therefore thepage will be empty so we rever indexesForDisplay
      if(searchState && !projects[indexesForDisplay[1]] && indexesForDisplay[0]!==0){
        setindexesForDisplay([indexesForDisplay[0]-2,indexesForDisplay[1]-2]);
        setLeftArrowState(false);
      }
      //This means there was only one project on the next page, therefore now the next page will be empty so we disable right arrow
      if(!projects[indexesForDisplay[1]+2]){
        setRightArrowState(false);
      }
      //When search is not active, projects and newProjects array are the same, therefore saveAllprojects array get deleted the same as projects array.
      //When search is active, projects arrray will depend on the search, we don't want search to influence our saveAllProjects array.
      //Therefore we pass the given parameters so that only the given project is deleted from saveAllProjects array.
      setProjects([...projects.slice(0,index),...projects.slice(index+1,projects.length)],true,true,projects[indexesForDisplay[0]]);

    })
    .catch(err=>console.log(err));
    
  }
  //Read comments  for the function above, works pretty much the same way, except we don't have to cover the case when there are no more projects left on the page
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
      const index = projects.indexOf(projects[indexesForDisplay[1]])
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
    <section className='projects-section'>
      <div  style={width<1100?{display:"none"}:{}} className='projects-container'>
        <div className='div1'>
            <h1>Projects</h1>
            <input className='search-input' type="text" placeholder='Search' onChange={(e)=>{
              //Revert indexes to display the first page
              setindexesForDisplay([0,1]);
              //Set left arrow to disabled since it's on the first page
              setLeftArrowState(false);
              //Tell the program we are in searching state
              setsearchState(true);
              //array that will temporarily store searched items
              let tmpArray = [];
              //saveAllProjects array holds all the projects from the database, therefore we will always search for items in it, and use projects array to display it in the UI
              saveAllProjects.forEach((project,id)=>{
                if(!(project.projectName.toLowerCase().search(e.target.value.toLowerCase()))){
                  //if whatever is written in the search bar is a substring of any of the project names, add it to tmparray
                  tmpArray.push(project);
                }
                if(tmpArray.length===0){
                  //if nothing is added to tmparray that means nothing was found by the search
                  //This state is used to display no projects found message  on the UI
                  setemptySearch(true);
                }
                else{
                  setemptySearch(false);
                }
                if(e.target.value===""){
                  //This means searchbar is empty therefore we disable search state
                  setsearchState(false);

                }
                if(tmpArray.length>2){
                  //if tmparray has more then 2 elements, that means more pages will be available, so we enable right arrow
                  setRightArrowState(true);
                }
                if(tmpArray.length<3){
                  //Vice versa if tmparray holds less than 3 elements, that means only one page will be allowed, so we disable right arrow
                  setRightArrowState(false);
                }
              }); 
              //We update projects and provide true value for state parameter. This means only projects array will be updated, and saveAllProjects won't be touched
              setProjects(tmpArray,true);
            }} 
             />
            <button onClick={openProjectMenu} >New Project</button>
        </div>
          {projects[0]?"":<p className='add-new-projects-paragraph'>{emptySearch?"No Projects Found":"Add new projects"}</p>}
          
          {projects[indexesForDisplay[0]]?
          <div className="project">
          <div className="div2">
              <p >Project</p>
              <p className="middle-paragraph">Description</p>
              <p>Contributors</p>
          </div>
       
          <div className="div3">
            
             <div className="name-container">
             <p className='name' onClick={()=>{
                changeProjectDetailsState();
                changecurrentProjectName(projects[indexesForDisplay[0]].projectName);

              }} >{projects[indexesForDisplay[0]]?projects[indexesForDisplay[0]].projectName:""} </p>
              <div onClick={(e)=>{
                
                deleteProject(e);
               }} ><FontAwesomeIcon  className='trash-btn' icon={faTrash}/></div>
             </div>
              <p className='desc'>{projects[indexesForDisplay[0]]?projects[indexesForDisplay[0]].projectDescription:""}</p>
              <div>
              {projects[indexesForDisplay[0]].contributors.map((contributor,id)=>{
                return <p key={`contributor${id}`}>{contributor}</p>
              })}
              
              </div>
              
              
              
          </div>

          </div>:""}
      
          {projects[indexesForDisplay[1]]?
          <div className="project">

          <div className="div3 div3-2">
              <div className="name-container">
              <p className='name' onClick={()=>{
                  changeProjectDetailsState();
                  changecurrentProjectName(projects[indexesForDisplay[1]].projectName);                
              }} >{projects[indexesForDisplay[1]]?projects[indexesForDisplay[1]].projectName:""}</p>
               <div onClick={(e)=>{
                deleteProjectSecond(e);
               }} ><FontAwesomeIcon  className='trash-btn' icon={faTrash}/></div>
              </div>
              <p className='desc'>{projects[indexesForDisplay[1]]?projects[indexesForDisplay[1]].projectDescription:""}</p>
              <div>
              {projects[indexesForDisplay[1]].contributors.map((contributor,id)=>{
                return <p key={`contributor${id}`} >{contributor}</p>
              })}
              </div>
              
          </div>
     
          </div>:""}
      
          <div style={projects[0]?{}:{display:"none"}} className="div4">
           <FontAwesomeIcon  onClick={changeIndexesForDisplayPrevious} icon={faArrowLeft} className={`div4-arrow-left ${leftArrowState?`div4-arrow-enable`:`div4-arrow-disable`}`} />
           <FontAwesomeIcon  onClick={changeIndexesForDisplayNext}  icon={faArrowRight} className={`div4-arrow-right ${rightArrowState?`div4-arrow-enable`:`div4-arrow-disable`}`}/>
          </div>
        </div>
    </section>
    
  )
}

export default ProjectsContainer