
const Navbar = ({username, balance}) => {
    return (
        <>
        <div className="navbarWrap">
            <div>
            {username ? (<p>Welcome {username}</p>) : (<p>Loading account info..</p>)}
            {balance ? (<p>Current balance:{balance}</p>) : (<p>Loading account info..</p>)}
            </div>
        </div>
        </>
    )
}

export default Navbar