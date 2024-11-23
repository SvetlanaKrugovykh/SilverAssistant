const fs = require('fs')
const axios = require('axios')
const FormData = require('form-data')

module.exports.callSpeechToTxt = async function (data) {
  try {
    const THROUGH_TOKEN = process.env.THROUGH_TOKEN_SPEECH_TO_TXT
    const THROUGH_URL = `${process.env.THROUGH_URL}mf`
    const EMAIL = process.env.EMAIL

    const formData = new FormData()
    formData.append('serviceId', 'Speech-to-TXT')
    formData.append('clientId', 'Speech-to-TXT-Server')
    formData.append('email', EMAIL)
    formData.append('token', THROUGH_TOKEN)
    formData.append('segment_number', '1')


    if (data.file) {
      const fileStream = fs.createReadStream(data.file.path);
      formData.append('file', fileStream, {
        filename: data.file.originalname,
        contentType: 'audio/ogg'
      })
    }

    console.log('File:', data.file.path)

    const startTime = Date.now()
    console.log(`${startTime}: Multipart request start`)
    const response = await axios.post(THROUGH_URL, formData, {
      headers: {
        ...formData.getHeaders(),
        Authorization: THROUGH_TOKEN,
        Accept: 'application/json',
      },
      timeout: 300000
    })

    const endTime = Date.now()
    console.log(`${endTime}: Multipart request duration: ${endTime - startTime}ms`)

    return response.data

  } catch (error) {
    console.error('Error converting speech to text:', error)
    if (error.response) {
      console.error('Response data:', error.response.data)
      console.error('Response status:', error.response.status)
      console.error('Response headers:', error.response.headers)
    }
    throw error
  }

}


