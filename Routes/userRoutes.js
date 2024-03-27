const express = require('express')
const router = express.Router()

const {createUser, login, getUserData} = require('../Controllers/userController')

router.post('/login', login)
router.post('/register', createUser)