const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    login: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    checkPassword: {type: String, required: false},
    icon: {type: String, required: true},
})

module.exports = model('User', schema)

//   icon: 'https://cdn-icons-png.flaticon.com/512/4123/4123763.png',
