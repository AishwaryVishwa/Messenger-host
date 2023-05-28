import React, { useContext } from 'react'
import { Box, Image, Text } from '@chakra-ui/react'
import { userContext } from '../Context/UserProvider'
import { BsThreeDotsVertical } from 'react-icons/bs';
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
import UpdateGroupModal from './UpdateGroupModal';
import SenderDetails from './SenderDetails';
function Chats() {
  const { userData, chatList, setChatList, selectedChat, setSelectedChat } = useContext(userContext)
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <Box
        height='87vh'
        width='350px'
        p={2}
        m={2}
        bg='white'
        w='8xl'
        borderRadius='10'
      >

        {
          !selectedChat ?
            <Box
              display='flex'
              alignItems='center'
              justifyContent='center'
              height='85vh'
              fontSize='30px'
            //  bg='aqua'
            >
              <Text>Select someone to start chat.</Text>
            </Box>
            :
            <Box>

              <Box
                bg='aliceblue'
                height='60px'
                borderTopRadius='10px'
                p='8px'
                display='flex'
                alignItems='center'
                justifyContent='space-between'
              >
                <Text>

                  {(selectedChat.isGroupChat) ? selectedChat.chatName : selectedChat.users[0]._id === userData._id ? selectedChat.users[1].name : selectedChat.users[0].name}

                </Text>

                <BsThreeDotsVertical
                  cursor='pointer'
                  onClick={onOpen}
                />


                <Modal isOpen={isOpen} onClose={onClose}>
                  <ModalOverlay />
                  <ModalContent>
                    <ModalHeader>{(selectedChat.isGroupChat) ? selectedChat.chatName : selectedChat.users[0]._id === userData._id ? selectedChat.users[1].name : selectedChat.users[0].name}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {
                          (selectedChat.isGroupChat)?
                          <UpdateGroupModal selectedChat={selectedChat} />
                          :
                          <SenderDetails sender={selectedChat.users[0]._id === userData._id ? selectedChat.users[1] : selectedChat.users[0]} />
                        }
                    </ModalBody>

                    <ModalFooter>
                      
                    </ModalFooter>
                  </ModalContent>
                </Modal>

              </Box>


            </Box>
        }

      </Box>
    </>
  )
}

export default Chats