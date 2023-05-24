const jwt = require('jsonwebtoken')
const UserModel = require('../DATABASE/Models/UserModel')

const generateToken = async (id) => {
    const token = jwt.sign(id, process.env.JWT_SECRETKEY)
    return token
}

const verifyToken = async (req, res, next) => {

    const token = req.cookies.userToken;

    if (!token){
        return res.status(300).send({ message: "token is not generated" })
    }


      const decoded=await jwt.verify(token,process.env.JWT_SECRETKEY)
      const user=await UserModel.findById(decoded)

      res.send(user)
      console.log(user);
    next()
}
module.exports = { generateToken, verifyToken }