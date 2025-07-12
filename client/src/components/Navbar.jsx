
const Navbar = ({username}) => {
    return (
        <>
        <div className="navbarWrap">
            <div className="nav-logo">
                <a href="/dashboard"><img src="/vite.svg" /></a>
            </div>
            <div>
            {username ? (<p>Welcome {username}</p>) : (<p>Loading account info..</p>)}
            </div>
            <div className="nav-links">
                <ul>
                    <li><a href="/finances">Income & Expenses</a></li>
                    <li><a href="/goals">Goals</a></li>
                    <li><a href="/budget">Budget Analyis</a></li>
                    <li><a href="/ai-finance">AI Recommendations</a></li>
                </ul>
            </div>
        </div>
        </>
    )
}

export default Navbar