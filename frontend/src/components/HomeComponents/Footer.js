import { FaTelegram, FaTwitter } from 'react-icons/fa'

const Footer = () => {
    return ( 
        <div className="footer">
            <div className="footer-cont">
                <div className="g2">
                    <h3>
                        Useful Links
                    </h3>
                    <ul>
                    <li> <a>Delisting Policy </a> </li>
                        <li> <a>About Us </a> </li>
                        <li> <a>Privacy Policy </a> </li>
                        <li> <a>Whitepaper </a> </li>
                    </ul>
                
                </div>
                <div className="g2">
                    <h3>
                        Token List
                    </h3>
                    <ul>
                        <li> <a>Active Tokens</a> </li>
                        <li> <a>Upcoming Tokens</a> </li>
                        <li> <a>Trending Tokens</a> </li>
                    </ul>
                </div>
                <div className="g2">
                    <h3>
                        Resource
                    </h3>
                    <ul>
                        <li> <a>Help & Support</a> </li>
                        <li> <a>Submit Token</a> </li>
                    </ul>
                </div>
                <div className="g2">
                    <h3>
                        Socials
                    </h3>
                    <FaTelegram size={30} style={{ color: '#ffffff', marginRight: '1rem' }} />
                    <FaTwitter size={30} style={{ color: '#ffffff', marginRight: '1rem' }} />
                </div>
            </div>
        </div>
     );
}
 
export default Footer;