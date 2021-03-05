const express = require('express')
const Webex = require('webex');
const bodyParser = require('body-parser');
const helper = require('./helper');
const app = express()
const port = process.env.PORT || 8080;


require('dotenv').config()

let targetUser = 'joshudea@cisco.com'

console.log(process.env.BOT_KEY)

const webex = Webex.init({
    credentials: {
      access_token: process.env.BOT_KEY
    }
});

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
  

//endpoint for money being sent 
app.post('/sendMoney', (req, res) => {
    webexMessage = helper.generateMessageInterface("transferOut", req.body)

    webex.messages.create({
        markdown: webexMessage,
        toPersonEmail: targetUser
    })

    res.sendStatus(200)
  })

//
app.post('/sendStanding', (req, res) => {

    res.sendStatus(200)
})

app.listen(port, () => {
    console.log(`Starling listening at http://localhost:${port}`)
})