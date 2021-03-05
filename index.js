const express = require('express')
const Webex = require('webex');
const bodyParser = require('body-parser');
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
    let messageHeader = "# 💸 Payment Out Alert! 💸 \n"
    let messageDivider = "--- \n"
    let messageContent = "A Faster Payment of £" + (req.body.content.amount)*-1 +" has just been sent to **_" + req.body.content.counterParty + "_**. \n"
    let messageReferenceIntro = "Payment Reference: \n"
    let messageReference = "``` \n" + req.body.content.reference + "\n ```"

    webex.messages.create({
        markdown: messageHeader + messageDivider + messageContent + messageReferenceIntro + messageReference,
        toPersonEmail: targetUser
    })

    res.status(201);
  })

//endpoint for standing order transaction
app.post('/standingOrder', (req,res) => {
    console.log (req.body)

})

app.listen(port, () => {
    console.log(`Starling listening at http://localhost:${port}`)
})