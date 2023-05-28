import React, { useState,useContext } from 'react'
import { Text, Input,Box,Button } from '@chakra-ui/react'
import axios from 'axios'
import { userContext } from '../Context/UserProvider'
import { useToast, Avatar,Stack } from '@chakra-ui/react'
import { RxCross2 } from 'react-icons/rx';

import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure
  } from '@chakra-ui/react'
function UpdateGroupModal({selectedChat}) {
    const {userData}=useContext(userContext)
    const toast=useToast();
    const [groupName,setGroupName]=useState();
    const [userList, setUserList] = useState([])
    const [groupMember, setGroupMembers] = useState([])
    const searchApi = async (searchUser, userData) => {
        const { data } = await axios.get(`/searchUsers?search=${searchUser}&user=${userData}`);
        console.log(data);
        if (data.length === 0) {
          toast({
            title: 'Not found',
            description: "No such user found.",
            status: 'warning',
            duration: 5000,
            position: 'bottom-left',
            isClosable: true,
          })
        } else {
          setUserList(data)
        }
      }

      const removeMember=()=>{

      }


      const updateGroup=()=>{

      }
  return (
    <Box>
          <Stack>
                  <Box display='flex'
                  justifyContent='space-around'
                  alignItems='center'
                  w='300' >
                    {/* <Text>Name</Text> */}
                    <Input placeholder='Group name' onChange={(e)=>setGroupName(e.target.value)} />
                  </Box>
                  <Box display='flex' >
                    {/* <Text>Members</Text> */}
                    <Input placeholder='Search Members' onChange={(e) => searchApi(e.target.value, userData)} />
                  </Box>

                   <Box
                    display='flex'
                    flexWrap={true}
                   >
                     
                     {selectedChat.users?.map((member)=>{
                      return(
                         
                        <>
                           
                           <Box 
                           mx='1.3'
                           bg='green.300'
                           color='white'
                           padding='3px'
                           borderRadius='5px'
                           fontSize='17'
                           alignItems='center'
                           justifyContent='space-between'
                           fontFamily={['Inter','sans-serif']}

                           display={(member._id===userData._id)?"none":'flex'}
                          >
                             <Text>{member.name}</Text>
                             <RxCross2 
                               cursor='pointer'
                               fontSize='20'
                               onClick={()=>removeMember(member)}
                             />
                          </Box>
                           
                        </>
                            
                      )
                     })}

                   </Box>
                  <Box
                    overflowY='scroll'
                    maxH='200px'
                  >

                    

                  </Box>

                  <Button onClick={updateGroup} >Update group</Button>
                </Stack>
    </Box>
  )
}

export default UpdateGroupModal