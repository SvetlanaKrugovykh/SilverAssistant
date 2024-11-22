const axios = require('axios')
const { selectedByUser } = require('../globalBuffer')

module.exports.callTranslate = async function (bot, msg, data) {
  try {
    const text = selectedByUser[msg.chat.id]?.text
    const direction = `${selectedByUser[msg.chat.id]?.language}_${selectedByUser[msg.chat.id]?.direction}`

    if (!text || !direction || text.length < 7 || direction.length < 5) {
      console.log('Invalid text or direction:', { text, direction })
      return
    }

    const THROUGH_TOKEN = process.env.THROUGH_TOKEN
    let translatedText = text
    const directions = direction.includes('en') ? [direction] : [
      `${direction.split('_')[0]}_en`,
      `en_${direction.split('_')[1]}`
    ]

    for (const dir of directions) {
      const response = await axios.post(process.env.THROUGH_URL, {
        serviceId: "Translate-txt-to-txt",
        clientId: "Speech-to-TXT-Server",
        email: "support@silver-service.com.ua",
        direction: dir,
        text: translatedText,
        token: THROUGH_TOKEN
      }, {
        headers: {
          Authorization: `${THROUGH_TOKEN}`
        }
      })
      translatedText = response.data?.replyData?.translated_text?.[0] || 'Default value if not found'
    }

    console.log(translatedText)
    await bot.sendMessage(msg.chat.id, translatedText)

  } catch (error) {
    console.error('Error translating text:', error)
  }
}