const {Router} = require('express') 
const config = require('config') 
const jwt = require('jsonwebtoken') 
const {check, validationResult} = require('express-validator') 
const User = require('../models/User')  
// const { equal } = require('assert/strict')
const router = Router() 

router.post(
    '/register', 
    [
        check('login', 'Faithless login!').isLength({min:3}), 
        check('password', 'Minimum password length 3 characters!').isLength({min:3}), 
        check('checkPassword', 'Minimum password length 3 characters!').isLength({min:3}), 
    ],
    async (req, res) => {
    try{
        const errors = validationResult(req)

        if(!errors.isEmpty()){ 
            return res.status(400).json({ 
                errors: errors.array(), 
                message: 'Incorrect registration data!' 
            })
        }
        
        const {login, password, checkPassword} = req.body 
        const candidate = await User.findOne({login})  
        if(candidate) {  
            return res.status(400).json({message: 'This user are exists!'})  
        }
        if(password !== checkPassword) {  
            return res.status(400).json({message: 'Passwords do not match!'})  
        }
        const icon = 'https://cdn-icons-png.flaticon.com/512/4123/4123763.png'
        const user = new User({login, password, icon})
        await user.save() 

        res.status(201).json({message: "User are created!"})  
    } catch (e) {
        res.status(500).json({message: "its Error, try again!"})  
    }
})

router.post(
    '/login', 
    [
        check('login', 'Enter correct login!').isLength({min:3}),
        check('password', 'Enter correct password!').exists()
    ],
    async (req, res) => {
    try{
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({
                errors: errors.array(),
                message: 'Incorrect registration data at the entrance of the sistem!'
            })
        }
        const {login, password} = req.body 
        const user = await User.findOne({login})
        if(!user) {
            return res.status(400).json({message: 'User is not found!'})
        }
        if(password !== user.password) {
            return res.status(400).json({message: 'Incorrect password!'})
        }

        const token = jwt.sign(
            {userId: user.id},
            config.get('jwtSecret'),
            {expiresIn: '1h'}
        )

        res.json({
            token, 
            userId: user.id, 
            userIcon: user.icon, 
            userName: user.login
        })
    } catch (e) {
        res.status(500).json({message: "its Error, try again, LOGIN!"})
    }
})

router.get(
    '/friends/:id',
    async (req, res) => {
    try {
        const { id } = req.params
        let friends = await User.find()
        friends = friends.filter(friend => friend.id !== id).map(friend => ({
            id: friend.id,
            name: friend.login,
            icon: friend.icon
        })) 
        
        res.json(friends)
    } catch (e) {
        res.status(500).json({message: "its Error, try again!"})
    }
})

module.exports = router