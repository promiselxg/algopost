import React from "react"
import './TokenStyles.css'

import rectangle16 from "../assets/rectangle16.svg"
import vector from "../assets/vector.svg"

const WatchListCard = (props) => {
  return (
      <div className="div-2">
        <span className="span-2">WATCHLIST</span>
        <div className="card-4">
          <div className="div-5">
            <img className="img-2" src={props.token_logo} />
            <div className="div-6">
            <span className="span-3">{props.token_name || "TacoCoin"}</span>
            <span className="span-3">{props.token_symbol || "TACOS"}</span>
          </div>
        </div>
        <img className="img-3" src={vector} />
        </div>
      </div>
  )
}
export default WatchListCard

