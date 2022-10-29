import React from "react";

import { Outlet,Navigate } from 'react-router-dom'
//Verifies the sessionStorage, if the verification is achieved, gives us access to the corresponding protected route
const ProtectedRoutes = () => {
    
    console.log(window.sessionStorage.getItem("token"));
    return (
        window.sessionStorage.getItem("token").length<10?<Navigate to={'/login'}/>:<Outlet/>
    )
}

export default ProtectedRoutes