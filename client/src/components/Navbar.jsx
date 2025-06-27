
const Navbar = ({username, balance}) => {
    return (
        <>
        <div>
            {username ? (<p>Welcome {username}</p>) : (<p>Loading account info..</p>)}
            {balance ? (<p>Current balance:{balance}</p>) : (<p>Loading account info..</p>)}
            
        </div>
        </>
    )
}

export default Navbar