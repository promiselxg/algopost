import { Link } from 'react-router-dom';
import img from '../assets/reg-img.png';
import './HomeStyle.css'

const CTA = () => {
    return ( 
        <div className="cta">
            <div className="container">
                <img src={img} alt="" />
                <h3>
                    Find your next investment in Algorand Tokens
                </h3>
                <p>
                    Create an Account and Sign up to our industry news and Token launch list
                    and get your next investment opportunity direct to your inbox on a weekly basis.
                </p>
                <Link to='/signup'><button className='btn'>Register Now</button></Link>
            </div>
        </div>
     );
}
 
export default CTA;