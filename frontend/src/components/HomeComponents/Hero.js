import { useState } from "react";
import { Link } from "react-router-dom";
import img from '../assets/chainBlock.png';
import './HomeStyle.css'

const Hero = () => {
    const [isMobile, setIsMobile] = useState(true)

    return ( 
        <div className="Hero">
            <div className="hero-cont">
                { !isMobile ? 
                (  <>
                    <div className="right boxes">
                        <h2 className="hero-text">
                            Creating an Effective Algorand Listing System
                        </h2>
                        <Link to='/confirm'><button className="btn-green btn">Click here to Submit Token</button></Link>
                    </div>
                    <div className="left boxes">
                        <img src={img} alt="" />
                        <div className="box">
                            <div className="small-box">
                                <p className="box1">150</p>
                                <p>Active Token</p>
                            </div>
                            <div className="small-box">
                                <p className="box1">2</p>
                                <p>Upcoming Listings</p>
                            </div>
                        </div>
                    </div>
                    </> 
                ) : (
                    <div className="mobi-hero">
                        <img src={img} alt="" />
                        <h2 className="hero-text">
                            Creating an Effective Algorand Listing System
                        </h2>
                        <Link to='/confirm'><button className="btn btn-green">Click here to Submit Token</button></Link>
                        <div className="box">
                            <div className="small-box">
                            <p className="box1">150</p>
                            <p>Active Token</p>
                        </div>
                        <div className="small-box">
                            <p className="box1">2</p>
                            <p>Upcoming Listings</p>
                        </div>
                        </div>
                        
                    </div>
                ) }
           </div>
        </div>
     );
}
 
export default Hero;