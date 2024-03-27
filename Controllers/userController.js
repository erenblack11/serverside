const User = require("../Models/User")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const createUser = async (req, res)=>{
    const {name, email, password, notion} = req.body
    try {
        const findEmail = await User.findOne({email})
        const findName = await User.findOne({name})

        if(findEmail){
            return res.status(444).json({error:"User email already exists"})
        }
        if(findName){
            return res.status(444).json({error: "Username is already in use."})
        }

        const hashedPass = await bcrypt.hash(password, 10)
        const newUser = new User({name, email, password: hashedPass, notion})
        const saveUser = await newUser.save()

        res.status(200).json({message: "User registered successfully"})

    } catch (error) {
        console.error(error)
    }
}
const login = async (req, res)=>{
    const {email, password} = req.body
    try {
        const findEmail = await User.findOne({email})
        if(!findEmail){
            return res.status(404).json({error:"Invalid Email"})
        }
        const hashedPass = await bcrypt.compare(password, findEmail.password)
        if(!hashedPass){
            return res.status(401).json({error:"Invalid Password"})
        }

        // If email and password are valid, generate JWT token
        const token = jwt.sign({ userId: findEmail._id }, 'sensinaty', { expiresIn: "7d" });
        res.status(200).json({ message: "Success", token, id: findEmail._id, name: findEmail.name, auth: findEmail.notion });
    } catch (error) {
        console.error(error)
    }
}

const getUserData = async (req, res)=>{
    const userId = req.params.userId
    try {
        const findUser = await User.findById(userId)
        if(!findUser) return res.status(404).json('No such a user')

        return res.status(200).json(findUser)
    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports={createUser, login, getUserData}