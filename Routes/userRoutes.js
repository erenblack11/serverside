const express = require('express')
const router = express.Router()

const {createUser, login, getUserData, updateLetters, updateWords, updateNumbers} = require('../Controllers/userController')

router.post('/login', login)
router.post('/register', createUser)
router.get('/getuserdata/:userid', getUserData)
router.put('/putletters/:userid', updateLetters)
router.put('/putnumbers/:userid', updateNumbers)
router.put('/putwords/:userid', updateWords)

module.exports = router