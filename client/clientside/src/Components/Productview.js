import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Productview.css";
import Eachprod from "./Eachprod";

function Productview() {
  const userid = localStorage.getItem("userID")
  const [products, setProducts] = useState([]);
  const [prodLength, setProdLen] = useState(0);
  // const currToken = localStorage.getItem("token")
  const routeToCartList = () =>{
    window.location.href = '/cartlist'
  }
  const logoutUser = () =>{
    localStorage.clear()
    window.location.href = '/'
    
  }
  useEffect(() => {
    axios.get("http://localhost:8080/users/viewproducts").then((res) => {
      console.log(res);
      setProducts(res.data);
      setProdLen(res.data.length);
    });
  }, []);
  return (
    <div>
    {prodLength && 
    <div className="gotocart">
      <div className="availableprod">Hello, here are the products at store</div>
      <button className="forgotocartbtn" onClick={routeToCartList}>Go To Cart</button>
      <button className="forgotocartbtn" onClick={logoutUser}>Logout</button></div>}
      {prodLength &&      
        products.map((product) => {
          return (
              <Eachprod {...product} />
          );
        })}
    </div>
  );
}

export default Productview;
