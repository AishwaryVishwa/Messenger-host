import React, { useState,useContext, useEffect } from 'react'
import { Box } from '@chakra-ui/react'
import { userContext } from '../Context/UserProvider'
import { useToast,Avatar,Text } from '@chakra-ui/react'
import axios from 'axios'
function MyChats() {

    const {userData}=useContext(userContext)
    const [chatList,setChatList]=useState()
    const toast=useToast();
    const fetchChats=async()=>{
        try {
            const chats=await axios.post('/fetchChats',{
                userId:userData._id
            })
            console.log(chats);
            if(chats.data.length>0)
            {
                setChatList(chats.data)
            }else
            {
                toast({
                    title: 'No chats',
                    description: "You have no chats.Start chatting now",
                    status: 'warning',
                    duration: 5000,
                    position:'top-center',
                    isClosable: true,
                })
            }
        } catch (error) {
            console.log(error.message);
        }
    }
    useEffect(() => {
        fetchChats()
    },[])
    
  return (

    
    <>
      <Box
        height='87vh'
        width='350px'
        p={2}
        m={2}
        bg='white'
        borderRadius='10'
      >
       
       {chatList && chatList.map((chats)=>{
        return (
            <Box 
            key={chats._id} 
            display='flex'
            alignItems='center'
            bg='gray.300'
            m='2'
            padding={2}
            borderRadius={10}
            
          >
              <Avatar name={chats.chatName} src={chats.groupAdmin.profImage} />
              <Text
               px={4}
              >{chats.chatName}</Text>
          </Box>

        )
       })}
         
      </Box>
    </>
  )
}

export default MyChats