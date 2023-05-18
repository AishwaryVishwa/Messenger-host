const { hash } = require('bcryptjs')
const jwt = require('jsonwebtoken')
const mongoose=require('mongoose')

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    tokens:[{

        token: {
            type:String,
            required:true
        }
    }
    ]
})

// using jwt module for generating token number for user when it logins

userSchema.methods.generateToken=async function(){
    try {
        let token=jwt.sign({_id:this._id},process.env.JWT_SECRETKEY)
        this.tokens=this.tokens.concat({token:token})
        await this.save();
        return token;
    } catch (error) {
        console.log(error);
    }
}

/// hashing password enter by user

userSchema.pre('save', async function (next){
    console.log('inside pre middle ware')
    console.log(this)

    if(this.isModified)
    {
        const hashedpassword= await hash(this.password,10)
        this.password=hashedpassword
    }
    next()
})
const User=mongoose.model('users',userSchema);

module.exports=User








