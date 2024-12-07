const axios = require('axios')
require('dotenv').config()

module.exports.sendToPlatform = async function (platform, senderId, msg) {
  let content
  if (msg.text) {
    content = { text: msg.text }
  } else if (msg.photo) {
    const fileId = msg.photo[msg.photo.length - 1].file_id
    const file = await bot.getFile(fileId)
    content = { attachment: { type: 'image', payload: { url: `https://api.telegram.org/file/bot${process.env.TELEGRAM_BOT_TOKEN}/${file.file_path}` } } }
  } else if (msg.video) {
    const fileId = msg.video.file_id
    const file = await bot.getFile(fileId)
    content = { attachment: { type: 'video', payload: { url: `https://api.telegram.org/file/bot${process.env.TELEGRAM_BOT_TOKEN}/${file.file_path}` } } }
  } else if (msg.audio) {
    const fileId = msg.audio.file_id
    const file = await bot.getFile(fileId)
    content = { attachment: { type: 'audio', payload: { url: `https://api.telegram.org/file/bot${process.env.TELEGRAM_BOT_TOKEN}/${file.file_path}` } } }
  } else if (msg.document) {
    const fileId = msg.document.file_id
    const file = await bot.getFile(fileId)
    content = { attachment: { type: 'file', payload: { url: `https://api.telegram.org/file/bot${process.env.TELEGRAM_BOT_TOKEN}/${file.file_path}` } } }
  }

  switch (platform) {
    case 'Facebook':
      await sendToFacebook(senderId, content)
      break
    case 'Instagram':
      await sendToInstagram(senderId, content)
      break
    case 'WhatsApp':
      await sendToWhatsApp(senderId, content)
      break
    default:
      console.log('Unknown platform:', platform)
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

