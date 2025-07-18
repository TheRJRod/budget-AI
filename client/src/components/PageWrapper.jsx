import Navbar from "./Navbar";
import { useEffect, useState } from "react";
import API from "../api";
import { Outlet } from "react-router-dom";

const PageWrapper = ({customClass}) => {
const [user, setUser] = useState(null);

  useEffect(() => {
    API.get("/users/me")
      .then((res) => setUser(res.data))
      .catch((err) => {
        console.log(err, "Not authorized");
      });
  }, []);



    return (
        <>
        <div className={`pageWrap ${customClass}`}>
          <div className="main-wrap bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
            <Navbar username={user?.name} balance="3000" />
            <Outlet />
            </div>
        </div>
        </>
    )
}

export default PageWrapper;