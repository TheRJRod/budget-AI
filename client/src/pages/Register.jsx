import { useState } from "react";
import API from "../api";

const Register = () => {
    const [form, setForm] = useState({name:'', email:'', password:''});
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await API.post('/auth/register', form)
            localStorage.setItem('token', res.data.token);
            console.log('Registration complete')
        } catch(err) {
            setError(err.response?.data?.message || "Something went wrong")
        }
    }


    return (
        <form onSubmit={handleSubmit}> 
            <input name="name" onChange={handleChange} placeholder="Name" />
            <input name="email" onChange={handleChange} placeholder="Email" />
            <input name="password" type="password" onChange={handleChange} placeholder="Password" />
            <button type="submit">Register</button>
            {error && <p>{error}</p>}
        </form>
    )
}

export default Register;