const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const router = express.Router();
const jwt=require('jsonwebtoken')
const {generateToken} =require('./authenticator')
require('../DATABASE/dbConnect')

const UserModel = require('../DATABASE/Models/UserModel');

router.post('/register', async (req, res) => {

    const { name, email, password, profImage } = req.body;

    const isPresent = await UserModel.findOne({ email: email });
    if (isPresent) {
        res.status(404).send({ message: "user already present" })
    } else {
        const newUser = await UserModel.create(req.body);
        res.status(200).send({
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            password: newUser.password,
            profImage: newUser.profImage,
            token:newUser.token
        })
    }


})

router.post('/login',async (req,res)=>{

    try {
        const {email,password}=req.body;
        if(!email || !password)
        {
            res.status(404).send({message:"fill information"})
        }
        const isPresent=await UserModel.findOne({email:email});

        if(isPresent){
                  const verified=await bcrypt.compare(password,isPresent.password);
                   console.log(verified);
                  if(verified){
                    const token=isPresent.generateToken();
                    res.cookie('userToken',token)
                    res.status(200).send({message:"user is loggined successful"})
                  }else
                  {
                    res.send({message:"wrong credentials"})
                  }
        }else{
            res.send({message:"user is not present"})
        }
        
    } catch (error) {
        console.log(error);
        res.status(404).send(error)
    }
    


})

module.exports = router