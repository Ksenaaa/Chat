const express = require('express')
const config = require('config')
const mongoose = require('mongoose')

const app = express()

console.log('Okkk 1')
app.use(express.json({extended: true}))
app.use('/api/auth', require('../routes/auth.routes'))
app.use('/api/messages', require('../routes/messages.routes'))
const PORT = config.get('port')

const start = async () => {
    try {
        await mongoose.connect(config.get('mongoUri'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        app.listen(PORT, () => console.log(`Port: ${PORT}`))
    } catch (e) {
        console.log(e, 'error')
        process.exit(1)
    }
}

start()



// const path = require('path')
// const { ppid } = require('process')

// if (process.env.NODE_ENV === 'production') {
//     app.use('/', express.static(path.join(__dirname, 'client', 'build')))
//     app.get('*', (req, res) => {
//         res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
//     })
// }


