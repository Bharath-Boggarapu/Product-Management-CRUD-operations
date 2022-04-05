import React, { useState } from "react";
import axios from "axios";

function Eachprod(props) {

  const currToken = localStorage.getItem("token")
    const config = {headers:{
      token : currToken
  }}
  const [show, setShow] = useState(true)
  const userid = localStorage.getItem("userID")
    const addToCart =  () => {
      setShow(false)
      axios.post(`http://localhost:8080/addtocart?id=${props.Product_ID}&userID=${userid}`,props,config)
      .then(console.log('added to cart'))
    }
  return (
    <div className="each-prod">
      <div className="prod">
        <div className="first-child">
          <img src={props.image} className="prod-img" />
        </div>
        <div className="second-child">
          <div className="left-child">
            <div className="prod-name">{props.product_name}</div>
            <div className="prod-price">Rs.{props.price}</div>
          </div>
          <div className="right-child">
            {show && <button className="add-btn" onClick={addToCart}>
              Add to Cart
            </button>}
          </div>
        </div>
      </div>
    </div>
  );
}





export default Eachprod;