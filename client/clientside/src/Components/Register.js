import axios from 'axios'
import React, { useState } from 'react'
import './Register.css'

function Register() {
  const [userDetails, setUserDetails] = useState({First_Name:'',Last_Name:'',Password:'',Email:'',Phone:''})
  const registerUser = async () =>{
    await axios.post(`http://localhost:8080/users/signup`,userDetails)
    .then(res=>{console.log(res)
    if (res.status === 201 || res.status === 200){
      window.alert('Registration successfull')
      window.location.href = '/'
    }
  else{
    window.alert('Registration unsuccessful. User already exits/some input fields missing')
  }})

  }
  const logUser = ()=>{
    window.location.href = '/'
  }
  return (
    <div>
    <div className='reg-page'>
      Registration Page
    </div>
    <div className='main-parent'>
      <div className='left-half-reg'>
        <div className='iflogin'>Want to Login?</div>
        <div className='forloginbtn'><button className='log-btn' onClick={logUser}>Login</button></div>
      </div>
      <div className='right-half-reg'>
        <div className='eachinpfield'>
          <label className='eachlabel'>Firstname: </label>
          <input name='First_Name' className='fname' onChange={(e)=>{setUserDetails({...userDetails,[e.target.name]:e.target.value})}}/>
        </div> 
        <div className='eachinpfield'>
          <label className='eachlabel'>Lastname: </label>
          <br />
          <input name='Last_Name' className='fname' onChange={(e)=>{setUserDetails({...userDetails,[e.target.name]:e.target.value})}}/>
        </div> 
        <div className='eachinpfield'>
          <label className='eachlabel'>Password: </label>
          <br />
          <input name='Password' type="password" className='fname' onChange={(e)=>{setUserDetails({...userDetails,[e.target.name]:e.target.value})}}/>
        </div> 
        <div className='eachinpfield'>
          <label className='eachlabel'>Email: </label><br />
          <input name='Email' className='fname' onChange={(e)=>{setUserDetails({...userDetails,[e.target.name]:e.target.value})}}/>
        </div> 
        <div className='eachinpfield'>
          <label className='eachlabel'>Phone: </label><br />
          <input name='Phone' className='fname' onChange={(e)=>{setUserDetails({...userDetails,[e.target.name]:e.target.value})}}/>
        </div>
        <div className='eachinpfield'><button className='reg-btn' onClick={registerUser}>Register</button></div>        
      </div>
    </div>
    <div className='regfooter-page'>
      Catch us on Social Media
    </div>
  </div>
  )
}

export default Register