import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";


const Navbar = ({username}) => {

    const location = useLocation()
    const navigate = useNavigate()

    const handleClick = () => {
        localStorage.removeItem("token");
        navigate("/auth");
        
    }

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
                    <li className={`${location.pathname == '/dashboard' ? "active to-slate-700/80 from-slate-800/80 border-cyan-400 bg-gradient-to-r" : ""}`}><a  href="/dashboard"><span className='nav-item-inline'><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-home text-cyan-400 group-hover:scale-110 transition-transform duration-200"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg> Overview</span></a></li>
                    <li className={`${location.pathname == '/finances' ? "active to-slate-700/80 from-slate-800/80 border-cyan-400 bg-gradient-to-r" : ""}`}><a  href="/finances"><span className='nav-item-inline'><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-dollar-sign text-emerald-400 group-hover:scale-110 transition-transform duration-200"><line x1="12" x2="12" y1="2" y2="22"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg> Income & Expenses</span></a></li>
                    <li className={`${location.pathname == '/goals' ? "active to-slate-700/80 from-slate-800/80 border-cyan-400 bg-gradient-to-r" : ""}`}><a href="/goals"><span className='nav-item-inline'><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-target text-purple-400 group-hover:scale-110 transition-transform duration-200"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></svg> Goals</span></a></li>
                    <li className={`${location.pathname == '/budget' ? "active to-slate-700/80 from-slate-800/80 border-cyan-400 bg-gradient-to-r" : ""}`}><a href="/budget"><span className='nav-item-inline'><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-bar-chart3 text-pink-400 group-hover:scale-110 transition-transform duration-200"><path d="M3 3v18h18"></path><path d="M18 17V9"></path><path d="M13 17V5"></path><path d="M8 17v-3"></path></svg> Budget Analyis</span></a></li>
                    <li className={`${location.pathname == '/ai-finance' ? "active to-slate-700/80 from-slate-800/80 border-cyan-400 bg-gradient-to-r" : ""}`}><a href="/ai-finance"><span className='nav-item-inline'><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-bot text-blue-400 group-hover:scale-110 transition-transform duration-200"><path d="M12 8V4H8"></path><rect width="16" height="12" x="4" y="8" rx="2"></rect><path d="M2 14h2"></path><path d="M20 14h2"></path><path d="M15 13v2"></path><path d="M9 13v2"></path></svg> AI Assistant</span></a></li>
                </ul>
                <button onClick={handleClick}>Logoout</button>
            </div>
        </div>
        </>
    )
}

export default Navbar