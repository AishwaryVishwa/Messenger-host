import React, { useState } from 'react'
import { Stack, HStack, VStack, Box } from '@chakra-ui/react'
import { Button, ButtonGroup } from '@chakra-ui/react'
import {
    FormControl,
    FormLabel,
    Input
} from '@chakra-ui/react'
function Register() {

    const [name,setName]=useState()
    const [email,setEmail]=useState()
    const [passW,setPassW]=useState()
    const [pic,setPic]=useState()
    const submitHandler=()=>{

    }
    return (
        <div>
            <VStack
                spacing='5px'
                align='stretch'
            >
                
                    <FormControl >
                        <FormLabel>Name</FormLabel>
                        <Input onChange={(e)=>setName(e.target.value)} placeholder='Your name' />
                    </FormControl>
               
                
                    <FormControl>
                        <FormLabel>Email Id</FormLabel>
                        <Input onChange={(e)=>setEmail(e.target.value)} type='email' placeholder='example@email.com' />
                    </FormControl>
                
                
                    <FormControl>
                        <FormLabel>Password</FormLabel>
                        <Input onChange={(e)=>setPassW(e.target.value)} type='password' placeholder='password' />
                    </FormControl>

                    <FormControl w='fit-content'>
                        <FormLabel>Upload Image</FormLabel>
                        <Input p='1' onChange={(e)=>setPic(e.target.files[0])} type='file' accept='image/*' placeholder='password' />
                    </FormControl>
              
                   <Button colorScheme='blue' onClick={submitHandler}>

                         Sign up

                   </Button>
                     
            </VStack>
        </div>
    )
}

export default Register