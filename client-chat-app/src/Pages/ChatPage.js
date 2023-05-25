import React, { useEffect, useState,useContext } from 'react'
import UserProvider from '../Context/UserProvider';
import {userContext} from '../Context/UserProvider';
import SideBar from '../Components/SideBar';
import { Box } from '@chakra-ui/react';
import MyChats from '../Components/MyChats';
import Chats from '../Components/Chats';

import { useNavigate } from 'react-router';
function ChatPage() {
    const navigate=useNavigate()
    const {userData, setuserData}=useContext(userContext)
   
    useEffect( () => {
          
        const user=localStorage.getItem('userInfo');

        if(!user)
        {
          navigate('/')
        }else{
          setuserData(JSON.parse(user))
        }

    },[])
    
  return (
    <>
    
    
      {userData && <SideBar/>}
      <Box
         display='flex'
         
      >
      {userData && <MyChats/>}
      {userData && <Chats/>} 
      </Box>
    
    </>
  )
}

export default ChatPage