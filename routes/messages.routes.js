const {Router} = require('express') 
const Message = require('../models/Message')  
const router = Router() 

router.post(
    '/sendMess',
    async (req, res) => {
    try{
        const {senderIdUser, recipientIdUser, date, text} = req.body 
        const mes = new Message({senderIdUser, recipientIdUser, date, text})
        await mes.save() 
        res.json({
            id: mes.id,
            senderIdUser, 
            recipientIdUser, 
            date, 
            text
        })
        res.status(202).json({message: "Message send!"})  
    } catch (e) {
        res.status(500).json({message: "its Error, try again!"})  
    }
})


router.get(
    '/messages/:id/:activeId',
    async (req, res) => {
    try{
        const {id, activeId} = req.params

        let messages = await Message.find()
        messages = messages
            .filter(message => (
                (message.senderIdUser === id &&
                message.recipientIdUser === activeId)  ||
                (message.senderIdUser === activeId && 
                message.recipientIdUser === id)
            ))
        res.json(messages)  
    } catch (e) {
        res.status(500).json({message: "its Error, try again!"})  
    }
})

module.exports = router