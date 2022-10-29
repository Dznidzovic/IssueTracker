import Registration from "./Scripts/Registration/Registration";
import Login from "./Scripts/Login/Login";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import { useState } from "react";
import Dashboard from "./Scripts/LandingPage/Dashboard/Dashboard";
import ProtectedRoutes from "./Scripts/ProtectedRoutes";
import VerifyEmail from "./Scripts/Registration/VerifyEmail";
import PasswordResetFirst from "./Scripts/Login/PasswordResetFirst";
import PasswordResetSecond from "./Scripts/Login/PasswordResetSecond";
import Tickets from "./Scripts/Tickets/Tickets";
import Administration from "./Scripts/Administration/Administration";
function App() {

  const [projectDetailsState, setprojectDetailsState] = useState(false);
  const [currentProjectName, setcurrentProjectName] = useState("");
  return (
    <div className="App">
      <BrowserRouter>
  
        <Routes>
          <Route element={<Login/>} path="/login"/>
          <Route element={<ProtectedRoutes/>}>
            <Route element={<Dashboard projectDetailsState={projectDetailsState} setprojectDetailsState={setprojectDetailsState}
            currentProjectName={currentProjectName} setcurrentProjectName={setcurrentProjectName} />} path="/auth" />
            <Route element={<Tickets currentProjectName={currentProjectName} setcurrentProjectName={setcurrentProjectName} setprojectDetailsState={setprojectDetailsState} />} path="/auth/tickets" />
            <Route element={<Administration/>} path="/auth/administration"  />
          </Route>
          <Route element={<PasswordResetSecond/>} path="/:id/password-reset/:token"/>
          <Route element={<PasswordResetFirst/>} path="/password-reset"></Route>
          <Route element={<VerifyEmail/>} path="/:id/verify/:token"/>
          <Route index element={<Registration/>}/>
          <Route path="*" element={<div><p>Error 404 Page Not Found</p></div>}/>
        </Routes>
        
      </BrowserRouter>
    
    </div>
  );
}

export default App;
