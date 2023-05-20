const mongoose = require('mongoose')
const bcrypt = require('bcryptjs');
const jwt=require('jsonwebtoken')
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique:true
    },
    password: {
        type: String,
        required: true
    },
    profImage: {
        type: String,
        default: 'https://avatars.mds.yandex.net/i?id=07e6d2fd144c63f23e6b1b1b07f996fc55365889-9099210-images-thumbs&n=13'
    },
    token:{
        type:String
    }
},
{
    timestamps:true
}
);

userSchema.methods.generateToken=async function(){
    try {
        const token=jwt.sign(this.id,process.env.JWT_SECRETKEY)
        return token
    } catch (error) {
        console.log('error at userSchema methods ');
    }
}
userSchema.pre('save',async function (next){

    try {
        if(!this.isModified('password')){
            next()
        }
        
        this.password=await bcrypt.hash(this.password,10);
        this.token=jwt.sign(this.id,process.env.JWT_SECRETKEY)
        next();
    } catch (error) {
        console.log('error at userSchema pre method');
    }
     
})


const UserModel=mongoose.model("User",userSchema);

module.exports=UserModel