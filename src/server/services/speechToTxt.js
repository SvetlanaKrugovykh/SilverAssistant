const axios = require('axios')

module.exports.callSpeechToTxt = async function (bot, msg, data) {
  try {
    const audio = data?.audio
    if (!audio) {
      console.log('Invalid audio:', audio)
      return
    }

  } catch (error) {
    console.error('Error converting speech to text:', error)
  }

}

