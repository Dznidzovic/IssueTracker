/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react'
import '../../../styles/LandingPage/Dashboard/landingpage.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faBug,faTv,faTicket,faBook,faBars} from '@fortawesome/free-solid-svg-icons'
import PieChart from './PieChart'
import { useState,useEffect,useRef } from 'react'
import ProjectsContainer from './ProjectsContainer'
import axios from 'axios';
import { Link, useNavigate} from 'react-router-dom';
import ProjectsContainerMobile from './ProjectsContainerMobile'
import NewProject from './NewProject'
import ProjectDetailsMobile from '../ProjectDetails/ProjectDetailsMobile'
import ProjectDetails from '../ProjectDetails/ProjectDetails'


//if the page width is under 1100px, sidebar container will go hidden and can be accessed through burger menu button at the top
//Project container will also change its layout so it fits smaller devices better
//We have 2 different project containers, depending on the page width
const AuthComponent = ({projectDetailsState,setprojectDetailsState,currentProjectName,setcurrentProjectName}) => {
  const token = window.sessionStorage.getItem("token");
  const navigate = useNavigate();
  const [currentLoggedIn, setcurrentLoggedIn] = useState("");
  const [accessAllowedState, setaccessAllowedState] = useState(false);
  const [width, setwidth] = useState(2000);
  const [menuState, setmenuState] = useState("dashboard");
  const [isAdmin,setisAdmin] = useState(false);
  const [newProjectMenuState, setnewProjectMenuState] = useState(false);
  const [selectedContributors,setSelectedContributors] = useState([]);
  const [projects, setProjects] = useState([]);
  const [indexesForDisplay, setindexesForDisplay] = useState([0,1]);
  const [leftArrowState, setLeftArrowState] = useState(false);
  const [rightArrowState, setRightArrowState] = useState(false);
  const [addNewMemberState, setaddNewMemberState] = useState(false);
  const [projectUsers, setprojectUsers] = useState([]);
  const [tickets, settickets] = useState();
  const [ticketsForCharts, setticketsForCharts] = useState();
 
  const [saveAllTickets, setsaveAllTickets] = useState();
  const [saveAllProjects, setsaveAllProjects] = useState([]);
  const [newTicketState, setnewTicketState] = useState(false);
  






  const upperContainer = useRef();
  const sideBarContainer = useRef();
  //Send a request that validates if the token in the storage corresponds to the jwt assigned with the login
  //If the request is successfull allow access to the page, if not redirect to error page
  useEffect(()=> {
    setwidth(getWindowDimensions().width);
    
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

  //get all the tickets to change the pie charts 
  useEffect(() => {

      const configuration = {
        method:"get",
        url:"http://localhost:4000/dashboard/get-tickets"
      }
      axios(configuration)
      .then(res=>{
        let resolved = 0;
        let pending = 0;
        let newtickets = 0;
        let statusCounter = 0;

        let bug = 0;
        let feature = 0;
        let issue = 0;
        let typeCounter = 0;

        let immidiate = 0;
        let high = 0;
        let low = 0;
        let priorityCounter = 0;
        setticketsForCharts(res.data.tickets);
        for(let i = 0;i<res.data.tickets.length;i++){
          if(res.data.tickets[i].status){
            statusCounter++;
            if(res.data.tickets[i].status==="Pending") pending++;
            if(res.data.tickets[i].status==="Resolved")resolved++;
            if(res.data.tickets[i].status==="New")newtickets++;

          }
          if(res.data.tickets[i].type){
            typeCounter++;
            if(res.data.tickets[i].type==="Bug") bug++;
            if(res.data.tickets[i].type==="Feature")feature++;
            if(res.data.tickets[i].type==="Issue")issue++;

          }
          if(res.data.tickets[i].priority){
            priorityCounter++;
            if(res.data.tickets[i].priority==="Immidiate") immidiate++;
            if(res.data.tickets[i].priority==="High")high++;
            if(res.data.tickets[i].priority==="Low")low++;

          }
        }
        const ticketsForChartsPercentages = [[issue/typeCounter,bug/typeCounter,feature/typeCounter],
        [immidiate/priorityCounter,high/priorityCounter,low/priorityCounter],
        [resolved/statusCounter,newtickets/statusCounter,pending/statusCounter]]
       
        setticketsForCharts(ticketsForChartsPercentages);
      })
      .catch(err=>{
        console.log(err);
      });

   
  }, [])
  

  const changeMenuState = (text)=>{
    setmenuState(text);
    console.log(menuState)
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
  //empty the storrage and redirect to login page, that way denying the access to this page until further successfull logins
  const logOutFunction = ()=>{
    window.sessionStorage.setItem("token","");
    navigate("/login");
  }
  //When choosing contributors for new project, change the color when selected and add them to the selected contributors list, and vice-versa
  const addNewMemberColorChange = (e)=>{
    if(e.target.style.color !== 'white'){
     
      e.target.style.backgroundColor = '#6699CC';
      e.target.style.color = 'white';
      setSelectedContributors([...selectedContributors,e.target.textContent]);
      return;
    }
   
    let index = selectedContributors.indexOf(e.target.textContent)
    setSelectedContributors([...selectedContributors.slice(0,index),...selectedContributors.slice(index+1,selectedContributors.length)]);
    e.target.style.backgroundColor = 'white';
    e.target.style.color = '#707070';
   
  }
  //Once clicked on new project button, opens the new project menu, and disables the rest of the page
  const openProjectMenu = ()=>{
    setnewProjectMenuState(true);
    sideBarContainer.current.style.pointerEvents = "none"
    upperContainer.current.style.pointerEvents = "none";
    
  }
  //Close the new project menu and enable the rest of the page
  const closeProjectMenu = ()=>{
    setnewProjectMenuState(false);
    upperContainer.current.style.pointerEvents = "";
    sideBarContainer.current.style.pointerEvents = "";
  }
  /*projects array is used for displaying projects everywhere in the UI. However when we perform searching we need another array to
  hold all the projects from the database, while projects array is temporarily changed. saveAllProjects array is used for that.
  In the following function, when state and deletion are false, saveAllProjects array and projects array are updated evenly.
  When state=true and deletion = false, Only the projets array is being updated, and saveAllProjects array keeps original content.
  When both are true, projects are updated, but save All projects just delete one item(deletedProject) parameter.
  */
  
  const setNewProjects = (projects,state=false,deletion=false,deletedProject)=>{
    setProjects(projects);
    if(deletion){
      const index = saveAllProjects.indexOf(deletedProject);
      setsaveAllProjects([...saveAllProjects.slice(0,index),...saveAllProjects.slice(index+1,saveAllProjects.length)]);

    }
    if(state){
      return;
    }
    setsaveAllProjects(projects);
    
  }
  //Read comment above that applies to setNewProjects fnc. Logic is prett much the same.
  const setNewTickets = (tickets,state=false,deletion=false,deletedTicket,addwhensearch=false,newTicket)=>{
    settickets(tickets);
    if(addwhensearch){
      return setsaveAllTickets([...saveAllTickets,newTicket]);
    }
    if(deletion){
      let index = 0;
      saveAllTickets.forEach((ticket,id)=>{
        if(ticket.ticketTitle===deletedTicket.ticketTitle){
          index = id;
        }
      })
      setsaveAllTickets([...saveAllTickets.slice(0,index),...saveAllTickets.slice(index+1,saveAllTickets.length)]);

    }
    if(state){
      return;
    }
    setsaveAllTickets(tickets);

  }
  //If clicked on project name change this state and go to project details window
  const changeProjectDetailsState = ()=>{
    setprojectDetailsState(true);
    
  }
  //exit project details window by clicking on Dashboard h1
  const exitProjectDetails = ()=>{
    setprojectDetailsState(false);
  }
  //Change the current project name when clicking on the project name
  const changeCurrentProjectName = (name)=>{
    setcurrentProjectName(name);
    
  } 
  //Change a state that controls opening and closing window for adding new members
  const changeNewMemberState = ()=>{
    setaddNewMemberState(!addNewMemberState);
  }
  //Changes the array that holds users for display in project-details window
  const changeProjectUsers = (updatedUsers)=>{
    setprojectUsers(updatedUsers);
  }
  //Changes a state that opens and closes new ticket window used for adding new tickets
  const changeNewTicketState = ()=>{
    setnewTicketState(!newTicketState);
  }
  //When going from project details do dashboard update the tickets
  const updateTicketCharts = ()=>{
    const configuration = {
      method:"get",
      url:"http://localhost:4000/dashboard/get-tickets"
    }
    axios(configuration)
    .then(res=>{
      let resolved = 0;
      let pending = 0;
      let newtickets = 0;
      let statusCounter = 0;
  
      let bug = 0;
      let feature = 0;
      let issue = 0;
      let typeCounter = 0;
  
      let immidiate = 0;
      let high = 0;
      let low = 0;
      let priorityCounter = 0;
      setticketsForCharts(res.data.tickets);
      for(let i = 0;i<res.data.tickets.length;i++){
        if(res.data.tickets[i].status){
          statusCounter++;
          if(res.data.tickets[i].status==="Pending") pending++;
          if(res.data.tickets[i].status==="Resolved")resolved++;
          if(res.data.tickets[i].status==="New")newtickets++;
  
        }
        if(res.data.tickets[i].type){
          typeCounter++;
          if(res.data.tickets[i].type==="Bug") bug++;
          if(res.data.tickets[i].type==="Feature")feature++;
          if(res.data.tickets[i].type==="Issue")issue++;
  
        }
        if(res.data.tickets[i].priority){
          priorityCounter++;
          if(res.data.tickets[i].priority==="Immidiate") immidiate++;
          if(res.data.tickets[i].priority==="High")high++;
          if(res.data.tickets[i].priority==="Low")low++;
  
        }
      }
      const ticketsForChartsPercentages = [[issue/typeCounter,bug/typeCounter,feature/typeCounter],
      [immidiate/priorityCounter,high/priorityCounter,low/priorityCounter],
      [resolved/statusCounter,newtickets/statusCounter,pending/statusCounter]]
      
      setticketsForCharts(ticketsForChartsPercentages);
    })
    .catch(err=>{
      console.log(err);
    });
  
  }

  return (
    
    !accessAllowedState?<div>Error 404</div>:<div  className='landing-page-container'>
    <section ref={sideBarContainer} style={width>1100?{}:menuState==="menu"?{}:{display:"none"}}  className='sidebar-section'>
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
            changeMenuState("dashboard");
          }}>
            <p>Dashboard</p>
          </li>
        </ul>
        <ul className='sidebar2-ul'>
          <li className='sidebar2-li'>
          <FontAwesomeIcon className='icon' icon={faTicket}/>
          </li>
          <li onClick={()=>{
           navigate('/auth/tickets')
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
   
    
    <section  ref={upperContainer} style={width<1100?menuState==="dashboard"?{}:{display:"none"}:{}} className='upper'>
      <ul className="upper-header">
        <li className="upper-header-menu" onClick={()=>{
          changeMenuState("menu");
        }}><FontAwesomeIcon style={width>1100?{display:"none"}:{}} icon={faBars}/></li>
        <li className='dashboard-h1'><h1 onClick={()=>{
          exitProjectDetails();
          updateTicketCharts();
        }} >DASHBOARD</h1></li>
      </ul>
      <div>
        {projectDetailsState?<div>
          <ProjectDetailsMobile saveAllTickets={saveAllTickets} currentLoggedIn={currentLoggedIn} newTicketState={newTicketState} changeNewTicketState={changeNewTicketState} tickets={tickets} setNewTickets={setNewTickets} projectUsers={projectUsers} changeProjectUsers={changeProjectUsers} addNewMemberState={addNewMemberState} changeNewMemberState={changeNewMemberState} width={width} currentProjectName={currentProjectName}/>
          <ProjectDetails saveAllTickets={saveAllTickets} currentLoggedIn={currentLoggedIn} changeNewTicketState={changeNewTicketState} newTicketState={newTicketState} tickets={tickets} setNewTickets={setNewTickets} projectUsers={projectUsers} changeProjectUsers={changeProjectUsers} addNewMemberState={addNewMemberState} changeNewMemberState={changeNewMemberState} width={width} currentProjectName={currentProjectName}/>
          </div>:
        <><ProjectsContainer  changecurrentProjectName={changeCurrentProjectName} changeProjectDetailsState={changeProjectDetailsState} indexesForDisplay={indexesForDisplay} setindexesForDisplay={setindexesForDisplay} leftArrowState={leftArrowState}
              setLeftArrowState={setLeftArrowState} rightArrowState={rightArrowState} setRightArrowState={setRightArrowState}
              projects={projects} saveAllProjects={saveAllProjects} setProjects={setNewProjects} openProjectMenu={openProjectMenu} width={width} /><ProjectsContainerMobile  saveAllProjects={saveAllProjects} changeCurrentProjectName={changeCurrentProjectName} changeProjectDetailsState={changeProjectDetailsState} indexesForDisplay={indexesForDisplay} setindexesForDisplay={setindexesForDisplay} leftArrowState={leftArrowState}
                setLeftArrowState={setLeftArrowState} rightArrowState={rightArrowState} setRightArrowState={setRightArrowState} projects={projects} setProjects={setNewProjects} openProjectMenu={openProjectMenu} width={width} />
                <div className='statistics-container'>
                  {ticketsForCharts?<div className='stat-container'>
                    <div className='div1'>
                      <h1 className='div1-h1'>Tickets by Type</h1>
                      <div className="pie"><PieChart labels={["Issues", "Bug", "Features"]}
                       series={ticketsForCharts[0]} colors={['#F44336', '#E91E63', '#9C27B0']}
                      width={width > 1700 ? 350 : width > 1500 ? 330 : width > 1300 ? 300 : width > 1100 ? 280 : width > 950 ? 360 : width > 750 ? 360 : width < 375 ? 285 : 320} fontSize={width < 1300 ? 10 : width > 1700 ? 14 : width > 1300 ? 10 : 12} className='div2-pie-chart pie-chart' /></div>
                    </div>
                  </div>:""}
                  {ticketsForCharts?<div className='stat-container'>
                    <div className='div2'>
                      <h1 className='div2-h1'>Tickets by Priority</h1>
                      <div className="pie"><PieChart labels={[" Extreme  ", "High", "Low"]} 
                      series={ticketsForCharts[1]} colors={["#33b2df",
                      "#546E7A",
                      "#d4526e",]}
                      width={width > 1700 ? 350 : width > 1500 ? 330 : width > 1300 ? 300 : width > 1100 ? 280 : width > 950 ? 360 : width > 750 ? 360 : width < 375 ? 285 : 320} fontSize={width < 1300 ? 10 : width > 1700 ? 14 : width > 1300 ? 10 : 12} className='div2-pie-chart pie-chart' /></div>

                    </div>
                  </div>:""}
                  {ticketsForCharts?<div className='stat-container'>
                    <div className='div3'>
                      <h1 className='div3-h1'>Tickets by Status</h1>
                      <div className="pie"><PieChart labels={["Resolved", "New", "Pending"]}
                       series={ticketsForCharts[2]} colors={['#800080', '#66DA26', '#546E7A']}
                      width={width > 1700 ? 350 : width > 1500 ? 330 : width > 1300 ? 300 : width > 1100 ? 280 : width > 950 ? 360 : width > 750 ? 360 : width < 375 ? 285 : 320} fontSize={width < 1300 ? 10 : width > 1700 ? 14 : width > 1300 ? 10 : 12} className='div3-pie-chart pie-chart' /></div>
                    </div>
                  </div>:""}

              </div></>}
      </div>
    </section>
    <NewProject indexesForDisplay={indexesForDisplay} rightArrowState={rightArrowState} setRightArrowState={setRightArrowState}  setSelectedContributors={setSelectedContributors} setNewProjects={setNewProjects} closeWindowFnc={closeProjectMenu} selectedContributors={selectedContributors} newProjectMenuState={newProjectMenuState} closeProjectMenu={closeProjectMenu} addNewMemberColorChange={addNewMemberColorChange}  />
  </div>
  )
}

export default AuthComponent;

