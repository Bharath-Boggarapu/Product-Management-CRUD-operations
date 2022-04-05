import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Cartprod from './Cartprod'
import './Cartlist.css'
// import Addresscomp from './Addresspopup'
import Addresspopup from './Addresspopup'

function Cartlist() {
    const home = localStorage.getItem("home")
    // console.log(typeof(home))

    const street = localStorage.getItem("street")
    const city = localStorage.getItem("city")
    const pincode = localStorage.getItem("pincode")
    const currUser = localStorage.getItem("userID")
    const currToken = localStorage.getItem("token")
    const [cartProducts, setCartProducts] = useState([])
    const [prodLen, setProdLen] = useState(0)
    const [show, setShow] = useState(false)
    const [address, setAddress] = useState({house_name:'',street_name:'',city_name:'',pin_code:''})
    const [editAddress, setEditAddress] = useState({house_name:home,street_name:street,city_name:city,pin_code:pincode})
    const [editShow, setEditShow] = useState(false)

    const config = {headers:{
      token : currToken
    }}

    const addAddressHandler = () =>{
      setShow(!show)
    }
    const addingAddress = () =>{
      axios.post(`http://localhost:8080/addhomeaddress?id=${currUser}`,address,config)
      .then((res)=>{console.log("address added");
      setShow(!show)
      localStorage.setItem("home",address.house_name)
      localStorage.setItem("street",address.street_name)
      localStorage.setItem("city",address.city_name)
      localStorage.setItem("pincode",address.pin_code)
      window.location.href = '/cartlist'
    })
    }

    const editingAddress = () =>{
      axios.put(`http://localhost:8080/edithomeaddress?id=${currUser}`,editAddress,config)
      .then((res)=>{console.log("address added");
      setEditShow(!editShow)
      localStorage.setItem("home",editAddress.house_name)
      localStorage.setItem("street",editAddress.street_name)
      localStorage.setItem("city",editAddress.city_name)
      localStorage.setItem("pincode",editAddress.pin_code)
      window.location.href = '/cartlist'
    })
    }
    const editAddressHandler = () =>{
      setEditShow(!editShow)
    }
    const routeToAllProd = () =>{
      window.location.href = '/productview'
    }
    const logoutUser = () =>{
      localStorage.clear()
      window.location.href = '/'
      
    }
    
    useEffect(async()=>{
        await axios.get(`http://localhost:8080/cartitems?id=${currUser}`,config)
        .then((res)=>{console.log(res)
        setCartProducts(res.data)
        setProdLen(res.data.length)})
    },[])
  return (
    <div className='parentcont'>
        
        {prodLen ? <div><div className='head-listcart'>Your Cart is here
        <button className="forgotocartbtn" onClick={logoutUser}>Logout</button></div>
        
        <div>{cartProducts.map((cartprod)=>{return <Cartprod {...cartprod} />})}</div>
        <div className='parent-address'>        
        <div className='address'>
        <div className='home-add'>Delivery Address</div>
        <br></br>
        <div><span className='home-add'>Home: {home}</span></div>
        <br /><br />
        <div><span className='home-add'>Street: {street}</span></div>
        <br /><br />
        <div><span className='home-add'>City: {city}</span></div>
        <br /><br />
        <div><span className='home-add'>Pincode: {pincode}</span></div>
        <br /><br />
        </div>
        {home==null||home==''?<button onClick={addAddressHandler} className="forhandlingaddress">Add Address</button>:<button className="forhandlingaddress" onClick={editAddressHandler}>Edit Address</button>}
        {home==null||home==''?<div>please select an address to deliver</div>:<button className="forhandlingaddress">Place Order</button>}
        </div>
        {show && <Addresspopup
        content={<>
        <label>Home:</label>
        <input className='housenum' name='house_name' onChange={(e)=>{setAddress({...address,[e.target.name]:e.target.value})}}/>
        <br /><br />
        <label>Street:</label>
        <input className='streetname' name='street_name' onChange={(e)=>{setAddress({...address,[e.target.name]:e.target.value})}}/>
        <br /><br />
        <label>City:</label>
        <input className='cityname' name='city_name' onChange={(e)=>{setAddress({...address,[e.target.name]:e.target.value})}}/>
        <br /><br />
        <label>Pincode:</label>
        <input className='pincodee' name='pin_code' onChange={(e)=>{setAddress({...address,[e.target.name]:e.target.value})}}/>
        <br /><br />
        <button onClick={addingAddress}>proceed</button>
        </>}
      handleClose={addAddressHandler}
    />}
    {editShow && <Addresspopup
        content={<>
        <label>Home:</label>
        <input className='housenum' name='house_name' value={editAddress.house_name} onChange={(e)=>{setEditAddress({...editAddress,[e.target.name]:e.target.value})}}/>
        <br /><br />
        <label>Street:</label>
        <input className='streetname' name='street_name' value={editAddress.street_name}onChange={(e)=>{setEditAddress({...editAddress,[e.target.name]:e.target.value})}}/>
        <br /><br />
        <label>City:</label>
        <input className='cityname' name='city_name' value={editAddress.city_name} onChange={(e)=>{setEditAddress({...editAddress,[e.target.name]:e.target.value})}}/>
        <br /><br />
        <label>Pincode:</label>
        <input className='pincodee' name='pin_code' value={editAddress.pin_code} onChange={(e)=>{setEditAddress({...editAddress,[e.target.name]:e.target.value})}}/>
        <br /><br />
        <button onClick={editingAddress}>proceed</button>
        </>}
      handleClose={editAddressHandler}
    />}
        </div>
        :<div className='emptycart'>Oops, your Cart Is Empty......
        <div className='add-prod'>Want to Add few products from store into your cart?<button className='clickme-btn' onClick={routeToAllProd}>Click Here</button></div></div>}
        <div className='foraddress-btn'>        
        </div>


    </div>
  )
}

export default Cartlist