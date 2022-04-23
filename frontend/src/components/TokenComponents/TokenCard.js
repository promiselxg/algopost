import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { putBookmarkToken, putUpvoteToken } from '../../Redux/Actions/tokenActions'

import { FaArrowDown, FaArrowUp, FaPlusCircle, FaStar } from "react-icons/fa";
import img from '../assets/chainBlock.png'
import './TokenStyles.css'


const Card = (props) => {
    const dispatch = useDispatch();

    const { logo, Id, description, token_name, token_symbol, short_name, long_name, token_description, algo_price, usd_price, price_direction, total_votes} = props
    
    const [isUp, setIsUp] = useState(true);
    const [ isBookMarked, setIsBookmarked] = useState(false);
    const isBookmark = useSelector((state) => state.bookmarkToken);
    const isUpvote = useSelector((state) => state.upvoteToken);
    const { loading: upvoting, error: notUpvote, success: upvoted} = isUpvote;
    const { loading: Bookmarking, error: notBookmark, success: Bookmarked} = isBookmark;

    
    const { successMsg, setSuccessMsg } = useState("");
    const {errorMsg, setErrorMsg}  = useState("");

    const handleBookmark = async (event) => {
        event.preventDefault();
        dispatch(putBookmarkToken(Id))
    }

 const handleUpvote = async (event) => {
        event.preventDefault();
        dispatch(putUpvoteToken(Id))
    }


    return ( 
        <div className="Card">
            <div className="card-head">
                <div className="card-flex1">
                    <img src={logo} alt="" />
                    <h3>{token_symbol || short_name}</h3>
                </div>
                <div className="card-flex2">
                    <h3 className="tok-name">{token_name || long_name}</h3>
                  {isBookMarked ? (  <FaStar onClick={handleBookmark} id="star" size={30} style={{ color: 'white'}} />
                ) : ( 
                  <FaStar onClick={handleBookmark} id="star" size={30} style={{ color: 'white'}} />) }
                </div>
                <div className="description">
                    <p className="tok-desc">
                        {token_description || description }
                    </p>
                </div>
                <div className="card-flex3">
                    <div className="algo">
                        <h3>Algo Price</h3>
                        <p>{algo_price}</p>
                    </div>
                    <div className="usd">
                        <h3>Usd Price</h3>
                        <p>{usd_price}</p>
                    </div>
                    <div className="dir">
                        <h3>24h Change</h3>
                      { isUp ?  ( <FaArrowUp id="up" size={20} style={{ color: 'white'}}/> 
                      ) : (
                          <FaArrowDown id="up" size={20} style={{ color: 'white'}}/>
                      ) }
                    </div>
                </div>
                <div className="card-flex2">
                    <div className="vote">
                        <FaPlusCircle onClick={handleUpvote} id="vote" size={20} style={{ color: 'white'}} /> <h3>Vote</h3>
                    </div>
                    <div className="votes">
                        <h3>Total Votes</h3>
                        <p>{total_votes}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default Card;