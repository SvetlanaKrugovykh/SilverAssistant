const axios = require('axios')
const FormData = require('form-data')
const fs = require('fs')
const path = require('path')
const { bot } = require('../globalBuffer')
require('dotenv').config()

module.exports.sendToPlatform = async function (platform, senderId, msg) {
  try {
    let content
    let fileUrl
    let downloadedFilePath
    let attachmentId

    if (msg.audio || msg.voice || msg.photo || msg.video || msg.document) {
      const fileId = msg.audio?.file_id || msg.voice?.file_id ||
        msg.photo?.[msg.photo.length - 1]?.file_id ||
        msg.video?.file_id ||
        msg.document?.file_id

      const file = await bot.getFile(fileId)
      fileUrl = `https://api.telegram.org/file/bot${process.env.TELEGRAM_BOT_TOKEN}/${file.file_path}`
      downloadedFilePath = await downloadTelegramFile(fileUrl)
      console.log('Downloaded file path:', downloadedFilePath)
      attachmentId = await uploadToFacebook(downloadedFilePath)

    }

    if (msg.text) {
      content = { text: msg.text }
    } else if (msg.audio || msg.voice) {
      content = { attachment: { type: 'audio', payload: { attachment_id: attachmentId } } };
    } else if (msg.photo) {
      content = { attachment: { type: 'image', payload: { attachment_id: attachmentId } } };
    } else if (msg.video) {
      content = { attachment: { type: 'video', payload: { attachment_id: attachmentId } } };
    } else if (msg.document) {
      content = { attachment: { type: 'file', payload: { attachment_id: attachmentId } } };
    }


    console.log('Content ready for Facebook:', content)


    switch (platform) {
      case 'Facebook':
        await sendToFacebook(senderId, content)
        await bot.sendMessage(msg.chat.id, `Message sent to Facebook\nreceiver_id: ${senderId}`)
        break
      case 'Instagram':
        await sendToInstagram(senderId, content)
        await bot.sendMessage(msg.chat.id, `Message sent to Instagram\nreceiver_id: ${senderId}`)
        break
      case 'WhatsApp':
        await sendToWhatsApp(senderId, content)
        await bot.sendMessage(msg.chat.id, `Message sent to WhatsApp\nreceiver_id: ${senderId}`)
        break
      default:
        console.log('Unknown platform:', platform)
    }
  } catch (error) {
    console.error('Error sending message to platform:', error)
  }
}

async function sendToFacebook(senderId, content) {
  const url = `https://graph.facebook.com/${process.env.API_VERSION}/me/messages?access_token=${process.env.FACEBOOK_PAGE_ACCESS_TOKEN}`
  const messageData = {
    recipient: { id: senderId },
    message: content
  }
  await axios.post(url, messageData)
}

async function sendToInstagram(senderId, content) {
  const url = `https://graph.facebook.com/${process.env.API_VERSION}/${senderId}/messages?access_token=${process.env.INSTAGRAM_ACCESS_TOKEN}`
  const messageData = {
    recipient: { id: senderId },
    message: content
  }
  await axios.post(url, messageData)
}

async function sendToWhatsApp(senderId, content) {
  const url = `https://graph.facebook.com/${process.env.API_VERSION}/${senderId}/messages?access_token=${process.env.WHATSAPP_ACCESS_TOKEN}`
  const messageData = {
    recipient: { id: senderId },
    message: content
  }
  await axios.post(url, messageData)
}

async function downloadTelegramFile(fileUrl) {
  try {
    const DOWNLOAD_APP_PATH = process.env.DOWNLOAD_APP_PATH
    const response = await axios.get(fileUrl, { responseType: 'stream' })
    const fileName = `${fileUrl.split('/').pop()}`
    const filePath = path.join(DOWNLOAD_APP_PATH, fileName)
    const writer = fs.createWriteStream(filePath)
    response.data.pipe(writer)

    return new Promise((resolve, reject) => {
      writer.on('finish', () => resolve(filePath))
      writer.on('error', reject)
    })
  } catch (error) {
    console.error('Error downloading file:', error)
  }
}

async function uploadToFacebook(filePath) {
  try {
    const url = `https://graph.facebook.com/${process.env.API_VERSION}/me/message_attachments?access_token=${process.env.FACEBOOK_PAGE_ACCESS_TOKEN}`
    console.log(`Uploading file: ${filePath} to ${url}`)

    const formData = new FormData()
    formData.append('message', 'Audio file upload')
    formData.append('filedata', fs.createReadStream(filePath))

    const response = await axios.post(url, formData, {
      headers: formData.getHeaders()
    })
    console.log('Upload response:', response.data)
    return response.data.attachment_id
  } catch (error) {
    console.error('Error uploading file to Facebook:', error)
  }
}


