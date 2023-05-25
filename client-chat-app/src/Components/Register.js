import React, { useState } from 'react'
import axios from 'axios'
import { Stack, HStack, VStack, Box } from '@chakra-ui/react'
import { Button, ButtonGroup } from '@chakra-ui/react'
import {
    FormControl,
    FormLabel,
    Input
} from '@chakra-ui/react'
function Register() {

    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [passW, setPassW] = useState()
    const [pic, setPic] = useState()

    const user = {
        name: name,
        email: email,
        password: passW,
        profImage: pic
    }
    // let options = {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify(userData)
    // }
    const postImage = (pic) => {
        if (pic == undefined) {
            window.alert('profile image is not selected');
            return;
        }

        if (pic.type === 'image/jpg' || 'image/png') {
            const data = new FormData();
            data.append('file', pic);
            data.append('upload_preset', 'orderProject');
            data.append('cloud_name', 'dribibm8y')

            fetch('https://api.cloudinary.com/v1_1/dribibm8y/image/upload', {
                method: 'post',
                body: data
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log(data.secure_url);
                   setPic(data.secure_url)
                })
                .catch((err) => console.log(err))
        }
    }
    const submitHandler = async () => {

       const res=await axios.post('/register',user);

       if(res.status===201)
       window.alert(res.message)

       window.alert('User is registered')


        // console.log(res);
    }

    return (
        <div>
            <VStack
                spacing='5px'
                align='stretch'
            >

                <FormControl >
                    <FormLabel>Name</FormLabel>
                    <Input onChange={(e) => setName(e.target.value)} placeholder='Your name' />
                </FormControl>


                <FormControl>
                    <FormLabel>Email Id</FormLabel>
                    <Input onChange={(e) => setEmail(e.target.value)} type='email' placeholder='example@email.com' />
                </FormControl>


                <FormControl>
                    <FormLabel>Password</FormLabel>
                    <Input onChange={(e) => setPassW(e.target.value)} type='password' placeholder='password' />
                </FormControl>

                <FormControl w='-moz-max-content'>
                    <FormLabel>Upload Image</FormLabel>
                    <Input p='1' onChange={(e) => postImage(e.target.files[0])} type='file' accept='image/*' placeholder='password' />
                </FormControl>

                <Button colorScheme='blue' onClick={submitHandler}>

                    Sign up

                </Button>

            </VStack>
        </div>
    )
}

export default Register