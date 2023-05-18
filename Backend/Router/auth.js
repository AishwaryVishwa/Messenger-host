const express = require('express')
const mongoose = require('mongoose')
const bcrypt =require('bcryptjs')
const router = express.Router();


require('../DATABASE/dbConnect')
const Users = require('../DATABASE/userCollection')

// registration of new user
router.post('/register', async (req, res) => {

    const { name, email, phone, password } = req.body;

    try {

        const userExist = await Users.findOne({ email: email })

        //   throw new Error('yeahhh errorrr') // throwing error catch it also bt dont show in respose


        if (userExist) {
           return res.status(422).send({ message: "already exist" })
        }
        const newUser = new Users(req.body);
        await newUser.save();
          res.status(200).send({ message: "added new user" })
    }
    catch (err) {
        console.log(err);
         res.status(404).send(err)
    }

})


// now login of pre-existed user


router.post('/login',async (req,res)=>{
     
    const {name,email,phone,password}=req.body;
    let token;
    try{
        
        // throw new Error("hehe error")


        const user=await Users.findOne({email:email})
        
        if(!user)
        {
            console.log('user not exist');
             res.status(404).send({message:"user is not registered,register user first"})
        }else{
           
            /// decryption of password store in database and compare it with password entered by user
            const decrytedPassword= await bcrypt.compare(password,user.password)
            if(decrytedPassword)
            {
                token=user.generateToken();
                console.log(`login successful for user ${name}`);
                console.log(token);
                 res.status(200).send({message:`login successful for user ${name}`});
            }
            else
            {
                console.log('password is incorrect');
                res.status(404).send({message:'passwoed is incorrect '})
            }
        }
        
    }
    catch(err)
    {
        console.log(err);
        res.status(404).send({error:err})
    }
        
})



router.get('/', (req, res) => {
    res.send('Home page 2')
})


router.get('/about', (req, res) => {
    res.send(' about 2')
})

router.get('/signUp', (req, res) => {
    res.send(' signUp 2')
})


router.get('/login', (req, res) => {
    res.send(' login 2')
})

module.exports = router