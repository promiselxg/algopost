import { useState } from "react"
import { Link } from "react-router-dom"
import { FaBars, FaTimes } from 'react-icons/fa'
import './HomeStyle.css'

const AppBar = () => {
    const[click, setClick] = useState(false)
    const [isLoggedin, setIsLoggedin] = useState(true)
    const [color, setColor] = useState(false)

    const handleClick = () => setClick(!click)
    const handleLogout = () => setIsLoggedin(false)

        const changeColor =() => {
            if(window.scrollY >= 100) {
                setColor(true)
            } else {
                setColor(false)
            }
        }

        window.addEventListener('scroll', changeColor)


    return ( 
            <div className={color ? 'header header-bg' : 'header'}>
            <div className="nav-cont">
           <Link to='/'><h2 className="logo">ALGOPOT</h2></Link> 
           <ul className={click ? 'nav-menu active' : 'nav-menu'}>
               <li>
                   <Link className='nav-list' to='/list'>List Your Token</Link>
               </li>
               <li >
                   <Link to='/watchlist'>Watchlist</Link>
               </li>
               { isLoggedin ? (
               <div className="menu-grid">
               <li className="grid">
                    <Link to='/profile'>Profile</Link>
                </li>
                <li className="menu grid">
                    <Link to='/' onClick={handleLogout}>Loggout</Link>
                </li>
               </div>
                ) : (
                <div className="menu-grid">
                    <li className="grid">
                   <Link to='/signup'>Signup</Link>
               </li>
               <li className="grid">
                   <Link to='/login'>LogIn</Link>
               </li>
                </div>
                ) }
            </ul>
           <div className='hamburger' onClick={handleClick}>
            {click ? (<FaTimes size={20} style={{color: '#fff'}} />) : (<FaBars size={20} style={{color: '#fff'}} />)}     
           </div>
           </div>
        </div>
     );
}
 
export default AppBar;