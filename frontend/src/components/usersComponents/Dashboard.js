import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import './UserStyle.css'

const DashBoard = () => {
    return ( 
        <div className="dashboard">
            <div className="user">
                <FaUser size={35} style={{color: 'white'}} />
                <h2 className="Username">
                    Kelvin_Chiboy
                </h2>
                <p className="userId">
                    UNIQUE ID: 
                </p>
            </div>
            <div className="user-sub">
                <h3>
                Token Submitted:
                </h3>
                <h3 className="submitted"> 3 </h3>
            </div>
                <div className="db-btn"> 
                <Link to='/'><button className="btn btn-dashboard">View Submitted Token</button></Link>
                <Link to='/submit'><button className="btn btn-dashboard">Submitted Token</button></Link>
                <Link to='/watchlist'><button className="btn btn-dashboard">My Watchlist</button></Link>
                <Link to='/submitted'><button className="btn btn-dashboard">Account Subscription</button></Link>
                <Link to='/'><button className="btn btn-dashboard">KYC</button></Link>
                <div className="btn-grid"><Link to='/'><button className="btn btn-dashboard grid">Change Username</button></Link>
                <Link to='/'><button className="btn btn-dashboard grid">Change Password</button></Link>
               </div>
                 </div>
           </div>
     );
}
 
export default DashBoard;