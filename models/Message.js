const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    senderIdUser: {type: String, required: true},
    recipientIdUser: {type: String, required: true},
    date: {type: Date, required: true},
    text: {type: String, required: true}
})

module.exports = model('Message', schema)


