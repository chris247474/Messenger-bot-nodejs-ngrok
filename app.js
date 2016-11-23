'use strict'
const http = require('http')
const Bot = require('messenger-bot')

var GETSTARTEDSTRING = "Get Started"

let bot = new Bot({
  token: 'EAAX2onbWfdMBACzZAAjjZBo2WUFfdqs8uqbQat77ZBIyytk08DHz1DHGXY1BlznwqJflaCxKutZCIprm911yAipMKPewno1UbwPUuXGkT5GfskbKdwXUP3BIXSyHeMBncuPcnsSQGURnMqqM79rGQoIr1O0K9erIt7rVT2iH1AZDZD',
  verify: 'token'
})

bot.on('error', (err) => {
  console.log(err.message)
})

bot.on('message', (payload, reply) => {
  let text = "nodejs server: "+payload.message.text

  bot.getProfile(payload.sender.id, (err, profile) => {
    if (err) throw err

    reply({ text }, (err) => {
      if (err) throw err

      console.log(`Echoed back to ${profile.first_name} ${profile.last_name}: ${text}`)
    })
  })
})

//account for opt-in events using "messaging_optins"

//function to send welcome message
function SendWelcomeMessage(recipient, callback){
  bot.sendMessage(recipient, new payload({
    "setting_type":"greeting",
    "greeting":{
      "text":"Shout to the world. No one will know"
    }
  }), callback);
}

bot.on("messaging_postbacks", (payload, reply) => {
  if(payload.message.text == GETSTARTEDSTRING){
    //bot.sendMessage(payload.)
  }
})

http.createServer(bot.middleware()).listen(5000)
console.log('Echo bot server running at port 5000.')