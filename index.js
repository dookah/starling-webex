// Import libraries
const express = require('express')
const Webex = require('webex');
const bodyParser = require('body-parser');
const log4js = require("log4js");
const helper = require('./helper');

// Instantiate Libraries
const app = express()
const logger = log4js.getLogger();
require('dotenv').config()

// Set up settings
const port = process.env.PORT || 8080;
const targetUser = 'joshudea@cisco.com'

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

  //endpoint for money being sent 
app.post('/recieveMoney', (req, res) => {
    webexMessage = helper.generateMessageInterface("transferIn", req.body)

    webex.messages.create({
        markdown: webexMessage,
        toPersonEmail: targetUser
    })

    res.sendStatus(200)
  })

//
app.post('/sendStanding', (req, res) => {
    webexMessage = helper.generateMessageInterface("standingOrder", req.body)

    webex.messages.create({
        markdown: webexMessage,
        toPersonEmail: targetUser
    })

    res.sendStatus(200)
})

app.listen(port, () => {
    console.log(`Starling listening at http://localhost:${port}`)
})