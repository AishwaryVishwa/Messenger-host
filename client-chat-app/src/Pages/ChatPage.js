import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router';
function ChatPage() {
    const navigate=useNavigate()
    const [userDetails,setUserDetails]=useState({});
    useEffect(() => {
       fetch('/chatPage')
       .then((res)=>{
            if(res.status===300)
            {
                // window.alert("login first")
                navigate('/')
            }else{

                return res.json()
            }
       })
       .then((data)=>{
       setUserDetails(data)
       });
    },[])
    
  return (
    <>
    <h1>{userDetails.name}</h1>
    <h1>{userDetails.email}</h1>

    
    </>
  )
}

export default ChatPage