const jwt=require('jsonwebtoken')

const generateToken=async (id)=>{
    const token=jwt.sign(id,process.env.JWT_SECRETKEY)
     return token
}

module.exports={generateToken}