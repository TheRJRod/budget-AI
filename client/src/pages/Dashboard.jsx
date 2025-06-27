import { useEffect, useState } from "react";
import API from "../api";
import Navbar from "../components/Navbar";
import Income from "../components/Income";

export default function Dashboard() {
    const [user, setUser] = useState(null)

    useEffect(() => {
        API.get('/users/me')
        .then(res => setUser(res.data))
        .catch(err => {
            console.log(err, "Not authorized")
        })
    }, [])


    return (
        <>
        <Navbar username={user?.name} balance="3000" />
        <Income />
        </>
    )
}