const express = require('express')
const Webex = require('webex');
let bodyParser = require('body-parser')
const app = express()
const port = process.env.PORT || 8080;

const webex = Webex.init({
    credentials: {
      access_token: ''
    }
});

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
  

let roomCredentials = {
    roomID : null
}

webex.rooms.create({ title: 'Starling Notifications'}).then(room => {
    return Promise.all([
        webex.memberships.create({
            roomId: room.id,
            personEmail: `joshudea@cisco.com`
        })   
   ]).then(() => {
       roomCredentials.roomID = room.id
   })
});


app.post('/sendMoney', (req, res) => {
   
    console.log(req.body)
   
    let messageHeader = "# 💸 Payment Out Alert! 💸 \n"
    let messageDivider = "--- \n"
    let messageContent = "A Faster Payment of £" + (req.body.content.amount)*-1 +" has just been sent to **_" + req.body.content.counterParty + "_**. \n"
    let messageReferenceIntro = "Payment Reference: \n"
    let messageReference = "``` \n" + req.body.content.reference + "\n ```"

    webex.messages.create({
        markdown: messageHeader + messageDivider + messageContent + messageReferenceIntro + messageReference,
        roomId: roomCredentials.roomID
    })
  })

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})