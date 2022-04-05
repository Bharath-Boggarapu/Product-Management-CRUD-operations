import React from 'react'
import './Cartprod.css'
import { useState } from 'react'
import Cancelpopup from './Cancelpopup'
import axios from 'axios'

function Cartprod(props) {    
  const [isCancel, setIsCancel] = useState(false)
  const currUser = localStorage.getItem("userID")
  const currToken = localStorage.getItem("token")
  const config = {headers:{
    token : currToken
  }}
  const cancelHandler = () =>{
    setIsCancel(!isCancel)
  }
  const updateStatus=()=>{
    axios.delete(`http://localhost:8080/deleteitem?id=${props.Product_ID}&userID=${currUser}`,config)
    .then(res=>{
      console.log(res)
      cancelHandler()
      window.location.href = '/cartlist'
    })
  }
  return (
    <div className='parentofall'>
        <div className='child-parent'>
            <div className='onechild'><img src={props.image} className='imageprod' /></div>
            <div className='twochild'>{props.product_name}<br/> Rs.{props.price}</div>
            <div className='threechild'><button className='removeitem-btn' onClick={cancelHandler}>Remove Item</button></div>
        </div>
        {isCancel && <Cancelpopup
        content={<>
        <div className="purpleheader"></div>
        <div className="alertheader">Alert</div>
        <div className="suretocancel">Are you sure you want to cancel the order containing {props.product_name} of worth Rs.{props.price}</div>
        {/* <img className="alert-image" src={alert}></img> */}
        <br></br>
        <button className='proceed-btn' onClick={updateStatus}>Proceed</button>
      </>}
      handleClose={cancelHandler}
    />}
    {/* {address=='' ? <button className='for-addingaddress'>Add Address</button>
    :<button className='for-addingaddress'>Edit Address</button>} */}
    </div>
  )
}

export default Cartprod