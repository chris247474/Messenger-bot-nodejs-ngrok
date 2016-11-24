'use strict'
const http = require('http')
const Bot = require('messenger-bot')

var GETSTARTEDSTRING = "Get Started"

let bot = new Bot({
  token: 'EAAX2onbWfdMBANegZCTWtaOevrJ2nDtrQaC0EBbaU3ZBAkW4diZACLo2ffh9jnKDY2fTDaSTY98aXdkGyTI7hSZCxhNpc9felpyQsN6VB2o5kNQb8wLiNZCMKyZAPfbPSRR1XT4U3ZC8neS9O0CF5wOJjM6kCwgrZCNole4qq6uBOQZDZD',
  verify: 'token'
})

//////////////////////////////// Messaging event handlers

bot.on('error', (err) => {
  console.log(err.message)
})

bot.on('message', (payload, reply) => {
  //When 'Get Started' message is sent from user, show available Secret Files
  if(payload.message.text == GETSTARTEDSTRING){
    ShowSecretFilesSubscriptions(payload, reply)
  }else{// just echo for now
    sendDoesntUnderstandYet(payload, reply)
  }

})

bot.on('postback', (payload, reply, actions) => {
  console.log('messaging_postbacks event received: payload type: ' + payload.template_type)
  console.log('payload contents: '+ payload)
  //check if payload is a susbcribe action from ShowSecretFilesSubscriptions
})

///////////////////////////////

/////////////////////////////// Helper functions

function sendDoesntUnderstandYet(payload, reply){
  bot.getProfile(payload.sender.id, (err, profile) => {
        let text = "Sorry! I don't understand that kind of message yet"
        if (err) throw err

        reply({ text }, (err) => {//first argument should be 'text' or 'attachment' objects in payload.message
          if (err) throw err

          console.log(`Echoed back to ${profile.first_name} ${profile.last_name}: ${text}`)
        })
      })
}

function createButtonForArray_DeveloperDefinedPayload(type, title){
  return {
    "type":type,
    "title":title,
    "payload":"DEVELOPER_DEFINED_PAYLOAD"
  }
}

function createElementForPayloadForAttachmentForMessage(title, subtitle, mainImageURL, exactImageURL, buttonsArray){
  return {
            "title":title,
            "item_url":mainImageURL,
            "image_url":exactImageURL,
            "subtitle":subtitle,
            "buttons": buttonsArray
          }
}

function createGenericPayloadForMessage(elementsArray){
  return {
    "template_type": "generic",
    "elements": elementsArray
  }
}

function createTemplateAttachmentForMessage(elementsArray){
  return {
          "type":"template",
          "payload": createGenericPayloadForMessage(elementsArray)
      }
}

function ShowSecretFilesSubscriptions(payload, reply){
      bot.getProfile(payload.sender.id, (err, profile) => {
        if (err) {
          console.log(err.message)
          throw err
        }

        var elements = [//add call to db
          createElementForPayloadForAttachmentForMessage(
              "DLSU Secret Files", 
              "DLSU Secret File\'s New Home", 
              "https://4.bp.blogspot.com", 
              "https://4.bp.blogspot.com/-BB8-tshB9fk/WA9IvvztmfI/AAAAAAAAcHU/hwMnPbAM4lUx8FtCTiSp7IpIes-S0RkLgCLcB/s640/dlsu-campus.jpg", 
              [
                createButtonForArray_DeveloperDefinedPayload("postback", "Subscribe")
              ]
          ),
          createElementForPayloadForAttachmentForMessage(
              "DLSU Secret Files", 
              "DLSU Secret File\'s New Home", 
              "https://4.bp.blogspot.com", 
              "https://4.bp.blogspot.com/-BB8-tshB9fk/WA9IvvztmfI/AAAAAAAAcHU/hwMnPbAM4lUx8FtCTiSp7IpIes-S0RkLgCLcB/s640/dlsu-campus.jpg", 
              [
                createButtonForArray_DeveloperDefinedPayload("postback", "Subscribe")
              ]
          )    
        ]

        //invoke bot.sendMessage to user who sent initial message (payload.sender.id) with param being either 'text' or 'attachment' objects of message object
        reply({ 
              attachment:createTemplateAttachmentForMessage(elements)
        }, (err) => {
          if (err) {
            console.log(err.message)
            throw err
          }

          console.log(`Showing Secret Files subscription list to user `+ payload.sender.id)
        })
      })

    
}
/////////////////////////////////////////////////




////////////////////////////// Start server

http.createServer(bot.middleware()).listen(5000)
console.log('Echo bot server running at port 5000.')

//////////////////////////////////

//account for opt-in events using "messaging_optins"

//function to send welcome message -- how to test?
/*function SendWelcomeMessage(recipient, callback){
  bot.sendMessage(recipient, new payload({
    "setting_type":"greeting",
    "greeting":{
      "text":"Shout to the world. No one will know"
    }
  }), callback);
}*/