import { useEffect, useState } from "react";
import API from "../api";

export default function Dashboard() {
    const [user, setUser] = useState(null)

    useEffect(() => {
        API.get('/users/me')
        .then(res => setUser(res.data))
        .catch(err => {
            console.log("Not authorized")
        })
    }, [])


    return (
        <>
        <h1>Dashboard</h1>
        {user ? (<p>Welcome, {user.name}</p>)
        : (<p>Loading user info...</p>)    
    }
        </>
    )
}