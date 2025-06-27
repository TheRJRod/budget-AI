import { useState, useEffect } from "react"
import API from "../api"
const Income = () => {
    const [sources, setSources] = useState([])
    const [loading, setLoading] = useState(true)
    const [form, setForm] = useState({title:"", total:""})

   useEffect(() => {
    API.get("/income")
    .then((res) => {
        setSources(res.data)
        setLoading(false)
    })
    .catch((err) => {
        console.log("Error fetching income sources:", err);
        setLoading(false)
    })
   }, [])

   const handleSubmit = (e) => {
        e.preventDefault();
        API.post("/income", form)
        .then(res => setSources([...sources, res.data]))
   }

   const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value})
   }


    return (
        <>
        <h2>Income sources</h2>
        <form onSubmit={handleSubmit}>
            <input onChange={handleChange} name="title" />
            <input onChange={handleChange} name="total" type="number" />
            <button type="submit">Submit</button>
        </form>
        {loading ? (
            <p>Loading income sources...</p>
        ): sources.length > 0 ? (
            <ul>
                {sources.map((src) => {
                    return (
                    <li key={src.id}>
                        {src.title}: ${src.total}
                    </li>
                    )
                })}
            </ul>
        ) : (
            <p>No income sources yet..</p>
        )}
        </>
    )

}

export default Income