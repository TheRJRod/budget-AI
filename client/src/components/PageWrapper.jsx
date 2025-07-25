import Navbar from "./Navbar";
import { useEffect, useState } from "react";
import API from "../api";
import { Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PageWrapper = ({customClass}) => {
const {user} = useAuth()



    return (
        <>
        <div className={`pageWrap ${customClass}`}>
          <div className="main-wrap bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
            <Navbar username={user?.name} />
            <Outlet />
            </div>
        </div>
        </>
    )
}

export default PageWrapper;