import axios from "axios";
import React, { useState } from "react";
import './Login.css'

function Login() {
  const [data, setData] = useState({Email:'',Password:''})  
  const signin = (async() =>{
    console.log(data)
    await axios.post(`http://localhost:8080/users/login`,data).then(async(response) => {
      await localStorage.setItem('token',response.data.token)
      await localStorage.setItem('userID',response.data.user_id)
      if (response.data.address.length != 0){
        await localStorage.setItem('home',response.data.address[0].house_name)
        await localStorage.setItem('street',response.data.address[0].street_name)
        await localStorage.setItem('city',response.data.address[0].city_name)
        await localStorage.setItem('pincode',response.data.address[0].pin_code)
    }
      console.log(response)
      if (response.status === 200){
      window.location.href = '/productview'
    }else{
      window.location.href = '/'
    }
    })      
  })
  const regPage = () =>{
    window.location.href = '/register'
  }
  
  return (
    <div className="login-comp">
      <div className="title">Welcome to India's Best E-Commerce Website</div>
      <div className="second-part">
        <div className="reg-part">
          <div className="newuser">New User?</div>
          <div className="forreg"><button className="reg-btn" onClick={regPage}>Register</button></div>
        </div>
        <div className="login-part">
            <div className="login-one">
              <label htmlFor="email" className="foremail">Email</label>
              <input id="email" className="foremailinp" name="Email" placeholder="Email here" onChange={(e)=>{setData({...data,[e.target.name]:e.target.value})}}/>
            </div>
            <br />
            <div className="login-two">
              <label htmlFor="password" className="forpassword">Password</label>
              <input id="password" type="password" className="forpass" name="Password" placeholder="Password here" onChange={(e)=>{setData({...data,[e.target.name]:e.target.value})}} />
            </div>
            <br />
            <div className="login-three">
            <button className="forsignin-btn" onClick={signin}>Sign In</button>
            </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
