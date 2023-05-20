import React, { useState } from 'react'
import {
    Button,
    VStack,
    FormControl,
    FormLabel,
    Input
} from '@chakra-ui/react'
function Login() {
    const [email,setEmail]=useState();
    const [passw,setPassw]=useState();
    return (
        <div>
            <VStack
                spacing='9px'
                align='stretch'
            >

               <FormControl>
                <FormLabel>Email</FormLabel>
                <Input onChange={(e)=>setEmail(e.target.value)} placeholder='example@email.com' ></Input>
               </FormControl>

               <FormControl>
                <FormLabel>Password</FormLabel>
                <Input onChange={(e)=>setPassw(e.target.value)} type='password' placeholder='password' ></Input>
               </FormControl>

               <Button colorScheme='blue' >
                  Sign in
               </Button>
            </VStack>
        </div>
    )
}

export default Login