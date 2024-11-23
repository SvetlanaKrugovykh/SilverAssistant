const axios = require('axios')
const FormData = require('form-data')

module.exports.callSpeechToTxt = async function (bot, msg, data) {
  try {
    const THROUGH_TOKEN = process.env.THROUGH_TOKEN
    const THROUGH_URL = process.env.THROUGH_URL
    const EMAIL = process.env.EMAIL

    const formData = new FormData()

    if (data.file) {
      formData.append('file', data.file.buffer, data.file.originalname)
    }
    formData.append('serviceId', 'Speech-to-TXT')
    formData.append('clientId', 'Speech-to-TXT-Server')
    formData.append('email', EMAIL)
    formData.append('segment_number', 1)
    formData.append('token', THROUGH_TOKEN)

    const startTime = Date.now()
    console.log(`${startTime}: Multipart request start`)
    const response = await axios.post(`${THROUGH_URL}mf`, formData, {
      headers: {
        ...formData.getHeaders(),
        Authorization: `${THROUGH_TOKEN}`
      }
    })
    const endTime = Date.now()
    console.log(`${endTime}: Multipart request duration: ${endTime - startTime}ms`)

    return response.data

  } catch (error) {
    console.error('Error converting speech to text:', error)
  }

}


