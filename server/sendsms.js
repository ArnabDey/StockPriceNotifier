require('dotenv').config({path: __dirname + '/../.env'});


const client = require('twilio')(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
);

let sendMessage = (output) => {
    client.messages
      .create({
         body: output,
         from: process.env.Number1,
         to: process.env.Number2
       })
      .then(message => console.log(message.sid))
      .done();
};

module.exports = {
    sendMessage
};