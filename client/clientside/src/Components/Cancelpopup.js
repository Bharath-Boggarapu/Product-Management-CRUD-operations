import React from "react";
import './Cancelpopup.css'
 
const Cancelpopup = props => {
  return (
    <div>
        <div className="popup-box">
      <div className="box">
        <span className="close-icon" onClick={props.handleClose}>x</span>
        {props.content}
      </div>
    </div>
    </div>
  );
};
 
export default Cancelpopup;