const User = require("../Models/User")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const createUser = async (req, res)=>{
    const {name, email, password, numbers, letters, words, score, data} = req.body
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
        const newUser = new User({name, email, password: hashedPass, numbers, letters, words, score, data})
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
    const userId = req.params.userid
    try {
        const findUser = await User.findById(userId)
        if(!findUser) return res.status(404).json('No such a user')

        // const checkDone = () => {
            //     const lett = []
            // // if(received){
            //     for(let j = 1 ; i < 4 ; j++) {
            //         for (var i=0 ; i < findUser.letters[j - 1].length ; i++ ){
            //             const stat = findUser.letters[j - 1][i].status
            //             if(!stat){
            //                 lett.push(findUser.letters[j - 1][i])
            //             }
            //         }
            //     }
            
            // setCurrentCourse(lett[currentLetterIndex])
            // }
    //   }

        return res.status(200).json(findUser)
    } catch (error) {
        res.status(500).json(error)
    }
}
const updateLetters = async (req, res) => {
    const userId = req.params.userid
    const {letters, data} = req.body
    try {
        const editLetters = await User.findByIdAndUpdate(userId, {letters, data}, {new: true});

        if(!editLetters) return res.status(404).json("The package is not found")

        res.status(200).send(editLetters)
    } catch (error) {
        res.status(500).json(error);
    }
}
const updateNumbers = async (req, res) => {
    const userId = req.params.userid
    const {numbers, data} = req.body
    try {
        const editNumbers = await User.findByIdAndUpdate(userId, {numbers, data}, {new: true});

        if(!editNumbers) return res.status(404).json("The package is not found")

        return res.status(200).send("success")
    } catch (error) {
        res.status(500).json(error);
    }
}
const updateWords = async (req, res) => {
    const userId = req.params.userid
    const {words, data} = req.body
    try {
        const editWords = await User.findByIdAndUpdate(userId, {words, data}, {new: true});

        if(!editWords) return res.status(404).json("The package is not found")

        return res.status(200).send("success")
    } catch (error) {
        res.status(500).json(error);
    }
}
// const editPackage = async (req, res)=>{
//     const Id = req.params.id
//     const {name, description, services, price, visibility, template_name, template_id}= req.body;
//     try {
//         const editPackage = await Package.findByIdAndUpdate(Id,
//             {name, description, services, price, visibility, template_name, template_id},
//             {new: true});

//         if(!editPackage) return res.status(400).json('The Package was not edited')

//         res.status(200).json(editPackage);
//     } catch (error) {
//         res.status(500).json(error)
//     }
// }

module.exports={createUser, login, getUserData, updateLetters, updateNumbers, updateWords}
